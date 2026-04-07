import { PrismaClient } from "../../../generated/prisma/client.js";
import { NewIssueDto } from "../dtos/issue.dto.js";
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

const addIssue = async (issue: NewIssueDto, projectId: number) => {
  try {
    return await prisma.bugReport.create({
      data: { ...issue, projectId: projectId },
      select: { id: true, title: true, createdAt: true },
    });
  } catch (err: any) {
    throw err;
  }
};

export default {
  getIssues,
  addIssue,
};
