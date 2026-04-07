import { Response, Request, NextFunction } from "express";
import issueService from "../services/issue.service.js";

export const addIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectId = Number(req.params.projectId);
    const project = await issueService.addIssue(
      {
        ...req.body,
      },
      projectId,
    );

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const getIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectId = Number(req.params.projectId);
    const result = await issueService.getIssues(projectId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
