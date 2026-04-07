import { PrismaClient } from "../../../generated/prisma/client.js";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const getIssues = async (projectId: number) => {
  try {
    const issues = await prisma.bugReport.findMany({
      where: { projectId },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    return issues;
  } catch (err) {
    throw err;
  }
};

export default {
  getIssues,
};
