import { PrismaClient } from "../../../generated/prisma/client.js";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const getMe = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

export default {
  getMe,
};
