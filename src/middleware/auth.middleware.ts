import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET!;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token found" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = { userId: decoded.userId };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
