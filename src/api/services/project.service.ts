import { PrismaClient } from "../../../generated/prisma/client.js";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const getProjects = async (userId: number) => {
  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
    });

    return projects;
  } catch (err) {
    throw err;
  }
};

export default {
  getProjects,
};
