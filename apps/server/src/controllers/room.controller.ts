import { Request, Response } from "express";
import { CreateRoomSchema } from "@repo/types";
import { createRoom, getUserRooms, getRoomBySlug, deleteRoom } from "../services/room.service.js";

export async function postRoom(req: Request, res: Response) {
  const parsed = CreateRoomSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten() });
    return;
  }
  try {
    const room = await createRoom(parsed.data.name, req.userId);
    res.status(201).json({ roomId: room.id });
  } catch {
    res.status(409).json({ message: "Room name already taken" });
  }
}

export async function getRooms(req: Request, res: Response) {
  const rooms = await getUserRooms(req.userId);
  res.json({ rooms });
}

export async function getRoom(req: Request, res: Response) {
  const room = await getRoomBySlug(req.params.slug as string);
  if (!room) {
    res.status(404).json({ message: "Room not found" });
    return;
  }
  res.json({ room });
}

export async function removeRoom(req: Request, res: Response) {
  const slug = req.params.slug as string;
  const room = await getRoomBySlug(slug);
  if (!room) { res.status(404).json({ message: "Room not found" }); return; }
  if (room.adminId !== req.userId) { res.status(403).json({ message: "Only room admin can delete" }); return; }
  await deleteRoom(room.id);
  res.json({ deleted: true });
}
