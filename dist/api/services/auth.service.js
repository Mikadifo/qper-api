import { PrismaClient } from "../../../generated/prisma/client.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import errorCodes from "../../constants/errorCodes.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";
dotenv.config();
const { PRISMA_DUPLICATE } = errorCodes;
const secret = process.env.JWT_SECRET;
const prisma = new PrismaClient();
const register = async ({ username, email, password }) => {
    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, password: hashed },
            omit: { password: true },
        });
        return user;
    }
    catch (err) {
        if (err.code === PRISMA_DUPLICATE) {
            const error = new AppError("Username or email already exists", 409);
            throw error;
        }
        throw err;
    }
};
const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        const error = new AppError("Invalid username or password", 401);
        throw error;
    }
    const validCredentials = await bcrypt.compare(password, user.password);
    if (!validCredentials) {
        const error = new AppError("Invalid email or password", 401);
        throw error;
    }
    const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: "1h",
    });
    return { token };
};
export default {
    login,
    register,
};
