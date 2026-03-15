import { Request, Response } from "express";
import { CreateRoomSchema } from "@repo/types";
import { createRoom, getAllRooms, getRoomBySlug } from "../services/room.service.js";

export async function postRoom(req: Request, res: Response) {
  const parsed = CreateRoomSchema.safeParse(req.body);
  if (!parsed.success) {
    res.json({ message: "Incorrect Credentials" });
    return;
  }
  const userId = (req as any).userId;
  try {
    const room = await createRoom(parsed.data.name, userId);
    res.json({ roomId: room.id });
  } catch {
    res.status(411).json({ message: "Room already exists with that name" });
  }
}

export async function getRooms(_req: Request, res: Response) {
  const rooms = await getAllRooms();
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
