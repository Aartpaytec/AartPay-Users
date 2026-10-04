import { and, eq, gt, isNull } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Router, type IRouter } from "express";
import {
  GetMeResponse,
  LoginUserBody,
  LoginUserResponse,
  RefreshBody,
  RefreshResponse,
} from "@workspace/api-zod";
import { db, refreshTokensTable, usersTable } from "@workspace/db";
import { hashRefreshToken, issueTokenPair, verifyToken } from "../lib/tokens";
import { toPublicUser } from "../lib/users";
import { requireAuth } from "../middlewares/auth";

const DUMMY_PASSWORD_HASH =
  "$2b$12$wOWrXPtk2NMWjigxCaVM2uMO5dTJqxuB71H3oV5rUtsm.PUXCcC36";

const router: IRouter = Router();

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const phone = parsed.data.phone.trim();
  const password = parsed.data.password;
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.phone, phone))
    .limit(1);
  const passwordMatches = await bcrypt.compare(
    password,
    user?.passwordHash ?? DUMMY_PASSWORD_HASH,
  );

  if (
    !user ||
    Buffer.byteLength(password, "utf8") > 72 ||
    !passwordMatches
  ) {
    res.status(401).json({ error: "Invalid phone number or password." });
    return;
  }

  const tokens = issueTokenPair(user.id);
  await db.insert(refreshTokensTable).values({
    userId: user.id,
    tokenHash: tokens.refreshTokenHash,
    expiresAt: tokens.refreshTokenExpiresAt,
  });

  res.json(
    LoginUserResponse.parse({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: toPublicUser(user),
    }),
  );
});

router.post("/refresh", async (req, res): Promise<void> => {
  const parsed = RefreshBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const refreshToken = parsed.data.refreshToken;
  const verified = verifyToken(refreshToken, "refresh");
  if (!verified) {
    res.status(401).json({ error: "Invalid or expired refresh token." });
    return;
  }

  const rotated = await db.transaction(async (transaction) => {
    const now = new Date();
    const [storedToken] = await transaction
      .update(refreshTokensTable)
      .set({ revokedAt: now })
      .where(
        and(
          eq(refreshTokensTable.userId, verified.userId),
          eq(refreshTokensTable.tokenHash, hashRefreshToken(refreshToken)),
          isNull(refreshTokensTable.revokedAt),
          gt(refreshTokensTable.expiresAt, now),
        ),
      )
      .returning({ userId: refreshTokensTable.userId });

    if (!storedToken) {
      return null;
    }

    const [user] = await transaction
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, storedToken.userId))
      .limit(1);

    if (!user) {
      return null;
    }

    const tokens = issueTokenPair(user.id);
    await transaction.insert(refreshTokensTable).values({
      userId: user.id,
      tokenHash: tokens.refreshTokenHash,
      expiresAt: tokens.refreshTokenExpiresAt,
    });

    return { user, tokens };
  });

  if (!rotated) {
    res.status(401).json({ error: "Invalid or expired refresh token." });
    return;
  }

  res.json(
    RefreshResponse.parse({
      accessToken: rotated.tokens.accessToken,
      refreshToken: rotated.tokens.refreshToken,
      user: toPublicUser(rotated.user),
    }),
  );
});

router.get("/me", requireAuth, async (req, res): Promise<void> => {
  const userId = req.auth?.userId;
  if (userId == null) {
    res.status(401).json({ error: "A valid access token is required." });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!user) {
    res.status(401).json({ error: "A valid access token is required." });
    return;
  }

  res.json(GetMeResponse.parse(toPublicUser(user)));
});

export default router;