import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "@repo/jwt";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? "";
  try {
    const decode = jwt.verify(token, JWT_SECRET) as any;
    if (decode?.userId) {
      (req as any).userId = decode.userId;
      next();
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch {
    res.status(403).json({ message: "Unauthorized" });
  }
}
