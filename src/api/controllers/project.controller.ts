import { Response, Request, NextFunction } from "express";
import projectService from "../services/project.service.js";

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await projectService.getProjects(req.user.userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
