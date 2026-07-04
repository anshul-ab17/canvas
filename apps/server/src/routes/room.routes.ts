import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { postRoom, getRooms, getRoom, removeRoom } from "../controllers/room.controller.js";

const router: ReturnType<typeof Router> = Router();

router.post("/room", authMiddleware, postRoom);
router.get("/rooms", authMiddleware, getRooms);
router.get("/room/:slug", authMiddleware, getRoom);
router.delete("/room/:slug", authMiddleware, removeRoom);

export default router;
