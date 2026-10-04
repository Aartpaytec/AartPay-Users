import {
  refresh,
  setAuthTokenGetter,
} from "@workspace/api-client-react";

const STORAGE_KEY = "aartpay.auth-tokens.v1";
export const AUTH_CLEARED_EVENT = "aartpay:auth-cleared";
const TOKEN_REFRESH_BUFFER_SECONDS = 45;

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

let authRevision = 0;
let refreshPromise:
  | { revision: number; promise: Promise<string | null> }
  | null = null;

export function readAuthTokens(): AuthTokens | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed: unknown = JSON.parse(stored);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("accessToken" in parsed) ||
      !("refreshToken" in parsed) ||
      typeof parsed.accessToken !== "string" ||
      typeof parsed.refreshToken !== "string" ||
      !parsed.accessToken ||
      !parsed.refreshToken
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
    };
  } catch {
    return null;
  }
}

export function saveAuthTokens(tokens: AuthTokens): void {
  if (typeof window === "undefined") {
    throw new Error("Authentication can only be saved in a browser.");
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  authRevision += 1;
}

export function clearAuthTokens(): void {
  authRevision += 1;
  refreshPromise = null;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Still notify the current app so it stops showing authenticated data.
    } finally {
      window.dispatchEvent(new Event(AUTH_CLEARED_EVENT));
    }
  }
}

export function subscribeToAuthCleared(listener: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue === null) {
      listener();
    }
  };

  window.addEventListener(AUTH_CLEARED_EVENT, listener);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(AUTH_CLEARED_EVENT, listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function installAuthTokenGetter(): void {
  setAuthTokenGetter(getValidAccessToken);
}

async function getValidAccessToken(): Promise<string | null> {
  const tokens = readAuthTokens();
  if (!tokens) {
    return null;
  }

  if (hasAccessTokenLifetime(tokens.accessToken, TOKEN_REFRESH_BUFFER_SECONDS)) {
    return tokens.accessToken;
  }

  if (refreshPromise?.revision === authRevision) {
    return refreshPromise.promise;
  }

  const revision = authRevision;
  let pending: Promise<string | null>;
  pending = refresh(
    { refreshToken: tokens.refreshToken },
    { skipAuthToken: true },
  )
    .then((response) => {
      if (revision !== authRevision) {
        return null;
      }

      saveAuthTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      return response.accessToken;
    })
    .catch(() => {
      if (revision === authRevision) {
        clearAuthTokens();
      }
      return null;
    })
    .finally(() => {
      if (refreshPromise?.promise === pending) {
        refreshPromise = null;
      }
    });

  refreshPromise = { revision, promise: pending };
  return pending;
}

function hasAccessTokenLifetime(token: string, minimumSeconds: number): boolean {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) {
      return false;
    }

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const payload: unknown = JSON.parse(window.atob(padded));

    if (
      typeof payload !== "object" ||
      payload === null ||
      !("exp" in payload) ||
      typeof payload.exp !== "number"
    ) {
      return false;
    }

    return payload.exp > Date.now() / 1000 + minimumSeconds;
  } catch {
    return false;
  }
}