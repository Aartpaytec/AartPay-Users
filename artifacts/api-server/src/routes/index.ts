import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { GetApiHomeResponse } from "@workspace/api-zod";
import usersRouter from "./users";
import authRouter from "./auth";

const router: IRouter = Router();

router.get("/", (_req, res) => {
  res.json(GetApiHomeResponse.parse({ message: "Welcome to AartPay Tech API" }));
});
router.use(healthRouter);
router.use(authRouter);
router.use(usersRouter);

export default router;
