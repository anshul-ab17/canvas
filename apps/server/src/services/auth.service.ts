import { prisma } from "@repo/db/client";

export async function createUser(username: string, password: string, name: string) {
  return prisma.user.create({
    data: { email: username, password, username },
  });
}

export async function findUserByCredentials(username: string, password: string) {
  return prisma.user.findFirst({
    where: { email: username, password },
  });
}
