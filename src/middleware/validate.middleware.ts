import { NextFunction, Request, Response } from "express";

const validate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const casted = schema.cast(req.body);
      await schema.validate(casted, { abortEarly: false });

      req.body = casted;

      next();
    } catch (error: any) {
      res.status(400).json({ errors: error.errors });
    }
  };

export default validate;
