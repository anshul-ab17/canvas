import { prisma } from "@repo/db/client";
import argon2 from "argon2";

export async function createUser(username: string, password: string, _name: string) {
  const hash = await argon2.hash(password, { type: argon2.argon2id });
  return prisma.user.create({
    data: { email: username, password: hash, username },
  });
}

export async function findUserByCredentials(username: string, password: string) {
  const user = await prisma.user.findFirst({ where: { username } });
  if (!user) return null;
  const valid = await argon2.verify(user.password, password);
  return valid ? user : null;
}
