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
 *     summary: Upload a img to the project/issue folder
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *               - issueId
 *               - image
 *             properties:
 *               projectId:
 *                 type: number
 *               issueId:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Images uploaded successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Unexpected error
 */
router.post("/upload", upload.array("screenshots"), uploadImg);

export default router;
