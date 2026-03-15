import { Router, IRouter } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { postRoom, getRooms, getRoom } from "../controllers/room.controller.js";

const router: IRouter = Router();

router.post("/room", authMiddleware, postRoom);
router.get("/rooms", authMiddleware, getRooms);
router.get("/room/:slug", authMiddleware, getRoom);

export default router;
