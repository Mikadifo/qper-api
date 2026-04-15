import { PrismaClient } from "../../../generated/prisma/client.js";
import dotenv from "dotenv";
import { UploadDto } from "../dtos/upload.dto.js";
import { randomUUID } from "node:crypto";
import { r2 } from "../../lib/r2.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { generateSignedUrl } from "../../utils/upload.util.js";
import errorCodes from "../../constants/errorCodes.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";

const { PRISMA_NOT_FOUND } = errorCodes;

dotenv.config();
const prisma = new PrismaClient();

const getImages = async (issueId: number) => {
  try {
    const issue = await prisma.bugReport.findUniqueOrThrow({
      where: { id: issueId },
      select: { screenshots: true },
    });

    const urls = await Promise.all(
      issue.screenshots.map((key) => generateSignedUrl(key)),
    );

    return urls;
  } catch (err: any) {
    if (err.code === PRISMA_NOT_FOUND) {
      const error = new AppError("Issue not found", 404);

      throw error;
    }

    throw err;
  }
};

const getImage = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    return {
      buffer: Buffer.from(arrayBuffer),
      contentType: response.headers.get("content-type") || "image/png",
    };
  } catch (err: any) {
    if (err.code === PRISMA_NOT_FOUND) {
      const error = new AppError("Issue not found", 404);

      throw error;
    }

    throw err;
  }
};

const uploadImage = async ({ projectId, issueId, file }: UploadDto) => {
  try {
    const key = `${projectId}/${issueId}/${randomUUID()}-${file.originalname}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    await prisma.bugReport.update({
      where: { id: Number(issueId) },
      data: {
        screenshots: {
          push: key,
        },
      },
    });

    return key;
  } catch (err: any) {
    throw err;
  }
};

const deleteImage = async (issueId: number, imageURL: string) => {
  try {
    const url = new URL(imageURL);
    const key = decodeURIComponent(url.pathname.slice(1));

    await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      }),
    );

    const issue = await prisma.bugReport.findUnique({
      where: { id: issueId },
      select: { id: true, screenshots: true },
    });

    await prisma.bugReport.update({
      where: { id: issueId },
      data: {
        screenshots: issue?.screenshots.filter(
          (screenshot) => screenshot !== key,
        ),
      },
    });

    return url;
  } catch (err: any) {
    throw err;
  }
};

export default {
  getImages,
  getImage,
  uploadImage,
  deleteImage,
};
