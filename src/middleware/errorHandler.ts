// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import logger from "../config/logger";
import { errorMessages } from "../constants/errorMessages";

/**
 * Global error handling middleware.
 * This should be the last 'app.use()' in app.ts
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log every error
  logger.error(`${err.name}: ${err.message}`);

  // Handle our custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: errorMessages.VALIDATION_FAILED,
      errors: err.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Handle Sequelize unique constraint errors (e.g., name already exists)
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      // We'll let the controller specify the exact message for this
      message: err.message || "Item already exists",
    });
  }

  // Handle Sequelize validation errors (e.g., bad enum)
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Default to a 500 server error
  return res.status(500).json({
    message: errorMessages.INTERNAL_SERVER_ERROR,
  });
};