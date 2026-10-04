import {
  createHash,
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";

const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_SECONDS = 30 * 24 * 60 * 60;
const TOKEN_ISSUER = "aartpay-api";
const TOKEN_AUDIENCE = "aartpay-users";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret || Buffer.byteLength(sessionSecret, "utf8") < 32) {
  throw new Error(
    "SESSION_SECRET must be configured with at least 32 bytes before authentication can be used.",
  );
}

const signingKey = createHmac("sha256", sessionSecret)
  .update("aartpay-users:jwt:v1")
  .digest();

export type TokenUse = "access" | "refresh";

export type VerifiedToken = {
  userId: number;
  expiresAt: Date;
  tokenId?: string;
};

type TokenPayload = {
  iss: string;
  aud: string;
  sub: string;
  iat: number;
  exp: number;
  tokenUse: TokenUse;
  jti?: string;
};

function signToken(payload: TokenPayload): string {
  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
  ).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  const signingInput = `${header}.${encodedPayload}`;
  const signature = createHmac("sha256", signingKey)
    .update(signingInput)
    .digest("base64url");

  return `${signingInput}.${signature}`;
}

export function issueTokenPair(userId: number): {
  accessToken: string;
  refreshToken: string;
  refreshTokenHash: string;
  refreshTokenExpiresAt: Date;
} {
  const issuedAt = Math.floor(Date.now() / 1000);
  const refreshExpiresAtSeconds = issuedAt + REFRESH_TOKEN_TTL_SECONDS;
  const accessToken = signToken({
    iss: TOKEN_ISSUER,
    aud: TOKEN_AUDIENCE,
    sub: String(userId),
    iat: issuedAt,
    exp: issuedAt + ACCESS_TOKEN_TTL_SECONDS,
    tokenUse: "access",
  });
  const refreshToken = signToken({
    iss: TOKEN_ISSUER,
    aud: TOKEN_AUDIENCE,
    sub: String(userId),
    iat: issuedAt,
    exp: refreshExpiresAtSeconds,
    tokenUse: "refresh",
    jti: randomUUID(),
  });

  return {
    accessToken,
    refreshToken,
    refreshTokenHash: hashRefreshToken(refreshToken),
    refreshTokenExpiresAt: new Date(refreshExpiresAtSeconds * 1000),
  };
}

export function hashRefreshToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function verifyToken(
  token: string,
  expectedUse: TokenUse,
): VerifiedToken | null {
  if (token.length === 0 || token.length > 8192) {
    return null;
  }

  const parts = token.split(".");
  if (
    parts.length !== 3 ||
    parts.some((part) => !/^[A-Za-z0-9_-]+$/.test(part))
  ) {
    return null;
  }

  try {
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const header = JSON.parse(
      Buffer.from(encodedHeader, "base64url").toString("utf8"),
    ) as Record<string, unknown>;
    if (header.alg !== "HS256" || header.typ !== "JWT") {
      return null;
    }

    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = createHmac("sha256", signingKey)
      .update(signingInput)
      .digest();
    const suppliedSignature = Buffer.from(encodedSignature, "base64url");
    if (
      suppliedSignature.length !== expectedSignature.length ||
      !timingSafeEqual(suppliedSignature, expectedSignature)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as Partial<TokenPayload>;
    const now = Math.floor(Date.now() / 1000);
    const userId = Number(payload.sub);

    if (
      payload.iss !== TOKEN_ISSUER ||
      payload.aud !== TOKEN_AUDIENCE ||
      payload.tokenUse !== expectedUse ||
      !Number.isSafeInteger(userId) ||
      userId <= 0 ||
      !Number.isInteger(payload.iat) ||
      !Number.isInteger(payload.exp) ||
      payload.iat! > now + 60 ||
      payload.exp! <= now ||
      payload.exp! <= payload.iat!
    ) {
      return null;
    }

    if (expectedUse === "refresh" && typeof payload.jti !== "string") {
      return null;
    }

    return {
      userId,
      expiresAt: new Date(payload.exp! * 1000),
      ...(typeof payload.jti === "string" ? { tokenId: payload.jti } : {}),
    };
  } catch {
    return null;
  }
}