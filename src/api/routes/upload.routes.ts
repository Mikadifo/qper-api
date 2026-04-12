import { Router } from "express";
import {
  deleteScreenshot,
  getImages,
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
 * /api/screenshots/get:
 *   get:
 *     tags: [Screenshots]
 *     summary: Sign issue screenshots and return urls
 *     parameters:
 *       - name: issueId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Images signed and fetched successfully
 *       400:
 *         description: Issue not found
 *       500:
 *         description: Unexpected error
 */
router.post("/get/:issueId", getImages);

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
 * /api/screenshots/delete/{issueId}:
 *   delete:
 *     tags: [Screenshots]
 *     summary: Delete a url from the project/issue folder
 *     parameters:
 *       - name: issueId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *       - name: imageUrl
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: uri
 *     responses:
 *       200:
 *         description: Images deleted successfully
 *       500:
 *         description: Unexpected error
 */
router.delete("/delete/:issueId", deleteScreenshot);

export default router;
