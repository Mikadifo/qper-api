import { Response, Request, NextFunction } from "express";
import uploadService from "../services/upload.service.js";

export const getImages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { issueId } = req.params;

    res.status(200).json(uploadService.getImages(Number(issueId)));
  } catch (err) {
    next(err);
  }
};

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
    const { issueId } = req.params;
    const imageUrl = req.query.imageUrl as string;

    if (!imageUrl) {
      return res.status(400).json({ error: "Missing image url" });
    }

    uploadService.deleteImage(Number(issueId), imageUrl);

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
