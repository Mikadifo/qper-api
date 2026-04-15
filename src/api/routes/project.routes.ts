import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import {
  addProject,
  exportPdf,
  getProjects,
  getReport,
} from "../controllers/project.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { newProjectSchema } from "../schemas/project.schema.js";

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

/**
 * @swagger
 * /api/project:
 *   post:
 *     tags: [Project]
 *     summary: Add new project
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Project with that name already exists
 *       500:
 *         description: Unexpected error
 */
router.post("/", authMiddleware, validate(newProjectSchema), addProject);

/**
 * @swagger
 * /api/project/report/{projectId}:
 *   get:
 *     tags: [Project]
 *     summary: Get report for project id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         required: true
 *         name: projectId
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Report fetched successfully
 *       500:
 *         description: Unexpected error
 */
router.get("/report/:projectId", authMiddleware, getReport);

/**
 * @swagger
 * /api/project/export/{projectId}:
 *   post:
 *     tags: [Project]
 *     summary: Get PDF report for project
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         required: true
 *         name: projectId
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Report generated successfully
 *       500:
 *         description: Unexpected error
 */
router.post("/export/:projectId", authMiddleware, exportPdf);

export default router;
