import { Router, type IRouter } from "express";
import {
  ListUsersResponse,
  RegisterUserBody,
  RegisterUserResponse,
} from "@workspace/api-zod";

type User = {
  name: string;
  phone: string;
  balance: number;
};

const router: IRouter = Router();
const users: User[] = [];

router.post("/register", (req, res) => {
  const parsed = RegisterUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const name = parsed.data.name.trim();
  const phone = parsed.data.phone.trim();
  if (!name || !phone) {
    res.status(400).json({ error: "Name and phone are required." });
    return;
  }

  const user = { name, phone, balance: 0 };
  users.push(user);

  res.status(201).json(RegisterUserResponse.parse(user));
});

router.get("/users", (_req, res) => {
  res.json(ListUsersResponse.parse(users));
});

export default router;