import { Request, Response } from "express";
import { JWT_SECRET } from "@repo/jwt";
import jwt from "jsonwebtoken";
import { CreateUserSchema, SignInSchema } from "@repo/types";
import { createUser, findUserByCredentials } from "../services/auth.service.js";

export async function signup(req: Request, res: Response) {
  const parsed = CreateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.json({ message: "Incorrect Credentials" });
    return;
  }
  try {
    const user = await createUser(parsed.data.username, parsed.data.password, parsed.data.name);
    res.json({ userId: user.id });
  } catch {
    res.status(411).json({ message: "User already exists with that username" });
  }
}

export async function signin(req: Request, res: Response) {
  const parsed = SignInSchema.safeParse(req.body);
  if (!parsed.success) {
    res.json({ message: "Incorrect Credentials" });
    return;
  }
  const user = await findUserByCredentials(parsed.data.username, parsed.data.password);
  if (!user) {
    res.status(403).json({ message: "Not authorized!" });
    return;
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token });
}
