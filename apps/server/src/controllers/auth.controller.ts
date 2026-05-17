import { Request, Response } from "express";
import { JWT_SECRET } from "@repo/jwt";
import jwt from "jsonwebtoken";
import { CreateUserSchema, SignInSchema } from "@repo/types";
import { createUser, findUserByCredentials } from "../services/auth.service.js";

function isUniqueConstraintError(err: unknown): boolean {
  return (
    typeof err === "object" && err !== null &&
    "code" in err && (err as { code: string }).code === "P2002"
  );
}

export async function signup(req: Request, res: Response) {
  const parsed = CreateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten() });
    return;
  }
  try {
    const user = await createUser(parsed.data.username, parsed.data.password, parsed.data.name);
    res.status(201).json({ userId: user.id });
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      res.status(409).json({ message: "Username already taken" });
    } else {
      console.error("[signup]", err);
      res.status(500).json({ message: "Failed to create account. Please try again." });
    }
  }
}

export async function signin(req: Request, res: Response) {
  const parsed = SignInSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten() });
    return;
  }
  try {
    const user = await findUserByCredentials(parsed.data.username, parsed.data.password);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "30d" });
    res.json({ token });
  } catch (err) {
    console.error("[signin]", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
}
