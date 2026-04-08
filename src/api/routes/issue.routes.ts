import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import {
  addIssue,
  getIssues,
  getIssue,
} from "../controllers/issue.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { newIssueSchema } from "../schemas/issue.schema.js";

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

/**
 * @swagger
 * /api/issues/{issueId}:
 *   get:
 *     tags: [Issue]
 *     summary: Get issue by id
 *     parameters:
 *       - in: path
 *         required: true
 *         name: issueId
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Issue fetched successfully
 *       500:
 *         description: Unexpected error
 */
router.get("/:issueId", authMiddleware, getIssue);

/**
 * @swagger
 * /api/issues/new/{projectId}:
 *   post:
 *     tags: [Issue]
 *     summary: Add new issue
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         required: true
 *         name: projectId
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - steps
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               steps:
 *                 type: string
 *     responses:
 *       201:
 *         description: Issue created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Unexpected error
 */
router.post(
  "/new/:projectId",
  authMiddleware,
  validate(newIssueSchema),
  addIssue,
);

export default router;
