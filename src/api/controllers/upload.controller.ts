import { Response, Request, NextFunction } from "express";
import uploadService from "../services/upload.service.js";

export const upload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectId = req.body.projectId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Missing file" });
    }

    const url = await uploadService.uploadImage({ projectId, file });
    res.json(url);
  } catch (err) {
    next(err);
  }
};
