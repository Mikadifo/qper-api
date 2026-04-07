import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { getIssues } from "../controllers/issue.controller.js";

/**
 * @swagger
 * tags:
 *   name: Issue
 *   description: Issue endpoints
 */
const router = Router();

/**
 * @swagger
 * /api/issues/all/{projectId}:
 *   get:
 *     tags: [Issue]
 *     summary: Get issues
 *     parameters:
 *       - in: path
 *         required: true
 *         name: projectId
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Issues fetched successfully
 *       500:
 *         description: Unexpected error
 */
router.get("/all/:projectId", authMiddleware, getIssues);

export default router;
