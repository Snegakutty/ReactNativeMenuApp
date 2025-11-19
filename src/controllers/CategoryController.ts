import { Request, Response, NextFunction } from "express";
import { Category } from "../models/Category";
import logger from "../config/logger";
import { AppError } from "../utils/AppError";
import { errorMessages } from "../constants/errorMessages";

// --- THIS IS THE FIX ---
// The 'export' keyword was missing.
export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const cat = await Category.create({ name });
      logger.info(`Category created: ${cat.name} (ID: ${cat.id})`);
      return res.status(201).json(cat);
    } catch (err: any) {
      // Let the error handler catch the error
      if (err.name === "SequelizeUniqueConstraintError") {
        return next(AppError.conflict(errorMessages.CATEGORY_ALREADY_EXISTS));
      }
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const cats = await Category.findAll();
      return res.json(cats);
    } catch (err: any) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await Category.findByPk(Number(id));
      if (!category) {
        // Throw our custom error
        throw AppError.notFound(errorMessages.CATEGORY_NOT_FOUND);
      }

      const oldName = category.name;
      category.name = name;
      await category.save();
      logger.info(
        `Category updated: ID ${id} (from "${oldName}" to "${name}")`
      );
      return res.json(category);
    } catch (err: any) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(Number(id));
      if (!category) {
        // Throw our custom error
        throw AppError.notFound(errorMessages.CATEGORY_NOT_FOUND);
      }

      const name = category.name;
      await category.destroy();
      logger.info(`Category deleted: ${name} (ID: ${id})`);
      return res.status(204).send();
    } catch (err: any) {
      next(err);
    }
  }
}