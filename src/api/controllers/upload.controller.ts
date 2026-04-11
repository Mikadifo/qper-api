import { Response, Request, NextFunction } from "express";
import uploadService from "../services/upload.service.js";

export const upload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectId = req.body.projectId;
    const issueId = req.body.issueId;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Missing files" });
    }

    const urls = await Promise.all(
      files.map((file) =>
        uploadService.uploadImage({ projectId, issueId, file }),
      ),
    );

    res.json({ urls });
  } catch (err) {
    next(err);
  }
};
