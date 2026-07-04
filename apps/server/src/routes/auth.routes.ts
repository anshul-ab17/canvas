import { Router } from "express";
import rateLimit from "express-rate-limit";
import { signup, signin, getMe } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts — try again later" },
});

const router: ReturnType<typeof Router> = Router();

router.post("/signup", authLimiter, signup);
router.post("/signin", authLimiter, signin);
router.get("/me", authMiddleware, getMe);

export default router;
