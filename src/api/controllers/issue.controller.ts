import { Response, Request, NextFunction } from "express";
import issueService from "../services/issue.service.js";
import uploadService from "../services/upload.service.js";

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

export const getIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const issueId = Number(req.params.issueId);
    const issue = await issueService.getIssue(issueId);
    const urls = await uploadService.getImages(issueId);
    const result = { ...issue, screenshots: urls };

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const issueId = Number(req.params.id);

    const movie = await issueService.updateIssue(issueId, req.body);

    res.json(movie);
  } catch (err) {
    next(err);
  }
};

export const deleteIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    await issueService.deleteIssue(id);

    res.json("Issue deleted successfully");
  } catch (err) {
    next(err);
  }
};
