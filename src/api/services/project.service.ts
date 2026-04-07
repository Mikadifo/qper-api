import { PrismaClient } from "../../../generated/prisma/client.js";
import dotenv from "dotenv";
import errorCodes from "../../constants/errorCodes.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";

const { PRISMA_DUPLICATE, PRISMA_NOT_FOUND } = errorCodes;

dotenv.config();

const prisma = new PrismaClient();

const getProjects = async (userId: number) => {
  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      select: {
        id: true,
        name: true,
      },
    });

    return projects;
  } catch (err) {
    throw err;
  }
};

const addProject = async (project: { name: string }, userId: number) => {
  try {
    return await prisma.project.create({
      data: { ...project, ownerId: userId },
      select: { id: true, name: true },
    });
  } catch (err: any) {
    if (err.code === PRISMA_DUPLICATE) {
      const error = new AppError("Project with that name already exists", 409);

      throw error;
    }

    throw err;
  }
};

export default {
  getProjects,
  addProject,
};
