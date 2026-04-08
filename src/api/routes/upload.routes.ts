import { Router } from "express";
import { upload as uploadImg } from "../controllers/upload.controller.js";
import upload from "../../middleware/upload.middleware.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */
const router = Router();

/**
 * @swagger
 * /api/screenshot/upload:
 *   post:
 *     tags: [Screenshots]
 *     summary: Upload a img to the project folder
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *               - image
 *             properties:
 *               projectId:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email or username already exists
 *       500:
 *         description: Unexpected error
 */
router.post("/upload", upload.single("image"), uploadImg);

export default router;
