import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Router, type IRouter } from "express";
import {
  ListUsersResponse,
  RegisterUserBody,
  RegisterUserResponse,
} from "@workspace/api-zod";
import { db, usersTable } from "@workspace/db";
import { toPublicUser } from "../lib/users";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

function isUniqueConstraintViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

router.post("/register", async (req, res): Promise<void> => {
  const parsed = RegisterUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const name = parsed.data.name.trim();
  const phone = parsed.data.phone.trim();
  const password = parsed.data.password;
  if (!name || !phone || Buffer.byteLength(password, "utf8") > 72) {
    res.status(400).json({
      error: "Name, phone, and a password of at most 72 UTF-8 bytes are required.",
    });
    return;
  }

  const [existingUser] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.phone, phone))
    .limit(1);

  if (existingUser) {
    res.status(409).json({
      error: "A user with this phone number already exists.",
    });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const [user] = await db
      .insert(usersTable)
      .values({ name, phone, passwordHash })
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        phone: usersTable.phone,
        balance: usersTable.balance,
      });

    if (!user) {
      res.status(500).json({ error: "Registration could not be completed." });
      return;
    }

    res.status(201).json(RegisterUserResponse.parse(toPublicUser(user)));
  } catch (error) {
    if (isUniqueConstraintViolation(error)) {
      res.status(409).json({
        error: "A user with this phone number already exists.",
      });
      return;
    }

    throw error;
  }
});

router.get("/users", requireAuth, async (_req, res): Promise<void> => {
  const users = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      phone: usersTable.phone,
      balance: usersTable.balance,
    })
    .from(usersTable)
    .orderBy(usersTable.id);

  res.json(ListUsersResponse.parse(users));
});

export default router;