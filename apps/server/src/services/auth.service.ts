import { prisma } from "@repo/db/client";
import argon2 from "argon2";

export async function createUser(username: string, password: string, displayName: string) {
  const hash = await argon2.hash(password, { type: argon2.argon2id });
  return prisma.user.create({
    data: { password: hash, username, displayName: displayName || username },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true, displayName: true },
  });
}

export async function findUserByCredentials(username: string, password: string) {
  const user = await prisma.user.findFirst({ where: { username } });
  if (!user) return null;
  const valid = await argon2.verify(user.password, password);
  return valid ? user : null;
}
