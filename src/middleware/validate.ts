// src/middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import logger from "../config/logger";

export const validate =
  (schema: z.ZodObject<any, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next(); // Success: move to the controller
    } catch (error) {
      // Failure: pass the error to the global error handler
      next(error);
    }
  };