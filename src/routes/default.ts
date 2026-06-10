import { Router } from "express";
import { HttpError } from "middlewares/error";
import type { Request, Response } from "express";

const router = Router();

// WELCOME;
router.get("/", async (_: Request, res: Response) => {
  res.json({ message: "welcome to marvel api" });
});

// 404
router.all(/.*/, async () => {
  throw new HttpError("service not found", 404);
});

export default router;
