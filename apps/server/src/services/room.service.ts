import { prisma } from "@repo/db/client";

export async function createRoom(slug: string, adminId: string) {
  return prisma.room.create({ data: { slug, adminId } });
}

export async function getUserRooms(userId: string) {
  return prisma.room.findMany({
    where: { adminId: userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, createdAt: true, adminId: true },
  });
}

export async function getRoomBySlug(slug: string) {
  return prisma.room.findUnique({
    where: { slug },
    include: { _count: { select: { elements: true } } },
  });
}

export async function deleteRoom(roomId: number) {
  return prisma.room.delete({ where: { id: roomId } });
}
