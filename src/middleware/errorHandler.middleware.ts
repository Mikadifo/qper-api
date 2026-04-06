import { NextFunction, Response, Request } from "express";

export class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
};

export default errorHandler;
