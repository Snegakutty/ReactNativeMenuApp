// src/controllers/ItemController.ts
import { Request, Response, NextFunction } from "express";
import { Category } from "../models/Category";
import { Item } from "../models/Item";
import { Addon } from "../models/Addon";
import logger from "../config/logger";
import { AppError } from "../utils/AppError";
import { errorMessages } from "../constants/errorMessages";

export class ItemController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;

      const category = await Category.findByPk(Number(categoryId));
      if (!category) {
        throw AppError.notFound(errorMessages.CATEGORY_NOT_FOUND);
      }

      const { name, veg_type, price, is_bestseller, size, prep_time_mins } =
        req.body;

      const db_veg_type = (veg_type ?? "veg").toUpperCase() as "VEG" | "NON-VEG";

      const item = await Item.create({
        name,
        veg_type: db_veg_type,
        price,
        is_bestseller: !!is_bestseller,
        size: size ?? null,
        prep_time_mins: prep_time_mins ?? null,
        category_id: category.id,
      });

      logger.info(
        `Item created: ${item.name} (ID: ${item.id}) in category ${category.name}`
      );
      return res.status(201).json(item);
    } catch (err: any) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findByPk(Number(categoryId));
      if (!category) {
        throw AppError.notFound(errorMessages.CATEGORY_NOT_FOUND);
      }

      const items = await Item.findAll({
        where: { category_id: category.id },
        include: [
          {
            model: Addon,
            as: "addons",
            through: { attributes: [] },
          },
        ],
      });

      return res.json(items);
    } catch (err: any) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId } = req.params;
      const updateData = req.body;

      const item = await Item.findByPk(Number(itemId));
      if (!item) {
        throw AppError.notFound(errorMessages.ITEM_NOT_FOUND);
      }

      if (updateData.veg_type) {
        updateData.veg_type = updateData.veg_type.toUpperCase() as "VEG" | "NON-VEG";
      }

      await item.update(updateData);
      logger.info(`Item updated: ${item.name} (ID: ${item.id})`);
      return res.json(item);
    } catch (err: any) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId } = req.params;

      const item = await Item.findByPk(Number(itemId));
      if (!item) {
        throw AppError.notFound(errorMessages.ITEM_NOT_FOUND);
      }

      const name = item.name;
      await item.destroy();
      logger.info(`Item deleted: ${name} (ID: ${itemId})`);
      return res.status(204).send();
    } catch (err: any) {
      next(err);
    }
  }
}

//TODO: use primary key that is id for all actions instead of name to avoid duplicates.
//TODO:validation (data schema)
//TODO: log errors using winston or another logger.
//TODO: try to use upsert here .
//USE ERROR CODES AND MESSAGES IN SEPARATE FILES