import { PrismaClient } from "../../../generated/prisma/client.js";
import dotenv from "dotenv";
import { UploadDto } from "../dtos/upload.dto.js";
import { randomUUID } from "node:crypto";
import { r2 } from "../../lib/r2.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();
const prisma = new PrismaClient();

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

    const url = `${process.env.R2_PUBLIC_URL}/${key}`;

    await prisma.bugReport.update({
      where: { id: +issueId },
      data: {
        screenshots: {
          push: url,
        },
      },
    });

    return url;
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
          (screenshot) => screenshot !== imageURL,
        ),
      },
    });

    return url;
  } catch (err: any) {
    throw err;
  }
};

export default {
  uploadImage,
  deleteImage,
};
