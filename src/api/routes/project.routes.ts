import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { getProjects } from "../controllers/project.controller.js";

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project endpoints
 */
const router = Router();

/**
 * @swagger
 * /api/project:
 *   get:
 *     tags: [Project]
 *     summary: Get projects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Projects fetched successfully
 *       500:
 *         description: Unexpected error
 */
router.get("/", authMiddleware, getProjects);

export default router;
