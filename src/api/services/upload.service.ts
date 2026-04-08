import dotenv from "dotenv";
import { AppError } from "../../middleware/errorHandler.middleware.js";
import { UploadDto } from "../dtos/upload.dto.js";
import { randomUUID } from "node:crypto";
import { r2 } from "../../lib/r2.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const uploadImage = async ({ projectId, file }: UploadDto) => {
  try {
    if (!file) throw new AppError("No file provided", 404);

    const key = `project_${projectId}/${randomUUID()}-${file.originalname}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `${process.env.R2_PUBLIC_URL}/${key}`;
  } catch (err: any) {
    throw err;
  }
};

export default {
  uploadImage,
};
