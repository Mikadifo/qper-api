import { Response, Request, NextFunction } from "express";
import userService from "../services/user.service.js";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.getMe(req.user.userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
