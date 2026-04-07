import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { getMe } from "../controllers/user.controller.js";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User endpoints
 */
const router = Router();

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     tags: [User]
 *     summary: Get username
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       500:
 *         description: Unexpected error
 */
router.get("/me", authMiddleware, getMe);

export default router;
