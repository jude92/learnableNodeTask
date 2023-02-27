import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    return res.status(400).json({ validation: result.error.details });
  }
  next();
};
