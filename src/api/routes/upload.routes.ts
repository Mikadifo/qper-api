import { Router } from "express";
import {
  deleteScreenshot,
  upload as uploadImg,
} from "../controllers/upload.controller.js";
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
 * /api/screenshots/upload:
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

/**
 * @swagger
 * /api/screenshots/delete:
 *   delete:
 *     tags: [Screenshots]
 *     summary: Delete a url from the project/issue folder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - issueId
 *               - urls
 *             properties:
 *               issueId:
 *                 type: number
 *               urls:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Images deleted successfully
 *       500:
 *         description: Unexpected error
 */
router.delete("/delete", deleteScreenshot);

export default router;
