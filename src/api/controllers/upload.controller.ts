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
      return res.status(400).json({ error: "Missing files" });
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

export const deleteScreenshot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const issueId = req.body.issueId;
    const urls = req.body.urls;

    await Promise.all(
      urls.forEach((url: string) => uploadService.deleteImage(issueId, url)),
    );

    res.status(200);
  } catch (err) {
    next(err);
  }
};
