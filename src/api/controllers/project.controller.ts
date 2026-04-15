import { Response, Request, NextFunction } from "express";
import projectService from "../services/project.service.js";

export const addProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const project = await projectService.addProject(
      {
        ...req.body,
      },
      req.user.userId,
    );

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

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

export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projectId = Number(req.params.projectId);
    const result = await projectService.getReport(projectId);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const exportPdf = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    const pdfBuffer = await projectService.exportPdf(
      projectId as string,
      token || "",
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=report-${projectId}.pdf`,
    );

    res.end(pdfBuffer);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
