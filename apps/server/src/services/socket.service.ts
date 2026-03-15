import { prisma } from "@repo/db/client";

export async function getRoomElements(roomId: number) {
  return prisma.element.findMany({
    where: { roomId, isDeleted: false },
  });
}

export async function upsertElement(
  id: string,
  roomId: number,
  type: string,
  data: string,
  userId: string
) {
  return prisma.element.upsert({
    where: { id },
    create: { id, roomId, type, data, userId },
    update: { data },
  });
}

export async function softDeleteElements(elementIds: string[]) {
  return prisma.element.updateMany({
    where: { id: { in: elementIds } },
    data: { isDeleted: true },
  });
}

export async function clearRoomElements(roomId: number) {
  return prisma.element.updateMany({
    where: { roomId },
    data: { isDeleted: true },
  });
}
