import { PrismaClient } from "../../../generated/prisma/client.js";
import errorCodes from "../../constants/errorCodes.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";
import { NewIssueDto } from "../dtos/issue.dto.js";
import dotenv from "dotenv";

dotenv.config();

const { PRISMA_NOT_FOUND } = errorCodes;

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

const getIssue = async (issueId: number) => {
  try {
    const issues = await prisma.bugReport.findUnique({
      where: { id: issueId },
      omit: { projectId: true },
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
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
  } catch (err: any) {
    throw err;
  }
};

const updateIssue = async (issueId: number, issue: NewIssueDto) => {
  try {
    const updatedIssue = await prisma.bugReport.update({
      where: { id: issueId },
      data: {
        ...issue,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        description: true,
        steps: true,
        actualResult: true,
        expectedResult: true,
      },
    });

    return updatedIssue;
  } catch (err: any) {
    if (err.code === PRISMA_NOT_FOUND) {
      const error = new AppError("Issue not found", 404);

      throw error;
    }

    throw err;
  }
};

const deleteIssue = async (issueId: number) => {
  try {
    await prisma.bugReport.delete({
      where: {
        id: issueId,
      },
    });
  } catch (err: any) {
    if (err.code === PRISMA_NOT_FOUND) {
      const error = new AppError("List not found", 404);

      throw error;
    }
  }
};

export default {
  getIssues,
  getIssue,
  addIssue,
  updateIssue,
  deleteIssue,
};
