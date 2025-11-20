// src/controllers/MenuController.ts
import { Request, Response, NextFunction } from "express";
import { Category } from "../models/Category";
import { Item } from "../models/Item";
import { Addon } from "../models/Addon";

export class MenuController {
  static async getFullMenu(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await Category.findAll();

      const items = await Item.findAll({
        include: [
          {
            model: Addon,
            as: "addons",
            through: { attributes: [] },
          },
        ],
      });

      const addons = await Addon.findAll();

      res.json({
        categories,
        items,
        addons,
      });
    } catch (err) {
      console.error("Error loading full menu:", err);
      next(err);
    }
  }
}
