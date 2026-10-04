import type { RequestHandler } from "express";
import { verifyToken } from "../lib/tokens";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: number;
      };
    }
  }
}

export const requireAuth: RequestHandler = (req, res, next) => {
  const authorization = req.get("authorization");
  const [scheme, token] = authorization?.trim().split(/\s+/, 2) ?? [];

  if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
    res.status(401).json({ error: "A valid access token is required." });
    return;
  }

  const verified = verifyToken(token, "access");
  if (!verified) {
    res.status(401).json({ error: "A valid access token is required." });
    return;
  }

  req.auth = { userId: verified.userId };
  next();
};