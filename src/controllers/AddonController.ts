// src/controllers/AddonController.ts
import { Request, Response, NextFunction } from "express";
import { Item } from "../models/Item";
import { Addon } from "../models/Addon";
import { ItemAddon } from "../models/ItemAddon";
import sequelize from "../config/db";
import logger from "../config/logger";
import { AppError } from "../utils/AppError";
import { errorMessages } from "../constants/errorMessages";
import { Transaction } from "sequelize"; // Import Transaction type

export class AddonController {
  // --- Global Addon Methods ---

  /**
   * (MODIFIED) Uses findOrCreate.
   * Creates a new addon. If one with the same name exists, it returns a 409 Conflict.
   */
  static async createGlobal(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price } = req.body;

      // findOrCreate is safer and simpler.
      const [addon, created] = await Addon.findOrCreate({
        where: { name },
        defaults: { price },
      });

      if (created) {
        logger.info(`Global addon created: ${addon.name} (ID: ${addon.id})`);
        return res.status(201).json(addon);
      } else {
        // If it was not created, it means one already exists. This is a conflict.
        return next(AppError.conflict(errorMessages.ADDON_ALREADY_EXISTS));
      }
    } catch (err: any) {
      next(err);
    }
  }

  static async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const addons = await Addon.findAll();
      return res.json(addons);
    } catch (err: any) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { addonId } = req.params;
      const updateData = req.body;

      const addon = await Addon.findByPk(Number(addonId));
      if (!addon) {
        throw AppError.notFound(errorMessages.ADDON_NOT_FOUND);
      }

      // We still allow 'update' to update price or name via this specific route
      await addon.update(updateData);
      logger.info(`Global addon updated: ${addon.name} (ID: ${addon.id})`);
      return res.json(addon);
    } catch (err: any) {
      next(err);
    }
  }

  static async deleteGlobal(req: Request, res: Response, next: NextFunction) {
    const t = await sequelize.transaction();
    try {
      const { addonId } = req.params;

      const addon = await Addon.findByPk(Number(addonId));
      if (!addon) {
        throw AppError.notFound(errorMessages.ADDON_NOT_FOUND);
      }

      await ItemAddon.destroy({
        where: { addon_id: Number(addonId) },
        transaction: t,
      });

      await addon.destroy({ transaction: t });

      await t.commit();
      logger.info(`Global addon deleted: ${addon.name} (ID: ${addonId})`);
      return res.status(204).send();
    } catch (err: any) {
      await t.rollback();
      next(err);
    }
  }

  // --- Item-Specific Addon Methods ---

  /**
   * (MODIFIED) Uses findOrCreate.
   * Finds an addon by name (or creates it) and then links it to the item.
   * Note: This will NOT update the price of an existing addon.
   */
  static async add(req: Request, res: Response, next: NextFunction) {
    const t = await sequelize.transaction();
    try {
      const { itemId } = req.params;
      const { name, price } = req.body;

      const item = await Item.findByPk(Number(itemId), { transaction: t });
      if (!item) {
        throw AppError.notFound(errorMessages.ITEM_NOT_FOUND);
      }

      // 1. Find or Create the Addon
      const [addon, created] = await Addon.findOrCreate({
        where: { name },
        defaults: { price },
        transaction: t,
      });

      if (created) {
        logger.info(`New addon created via findOrCreate: ${name} (ID: ${addon.id})`);
      } else {
        logger.info(`Existing addon ${name} found. Linking.`);
      }

      // 2. Find or Create the Link
      const [link, linkCreated] = await ItemAddon.findOrCreate({
        where: { item_id: item.id, addon_id: addon.id },
        defaults: { item_id: item.id, addon_id: addon.id },
        transaction: t,
      });

      if (!linkCreated) {
        // If the link was not created, it already exists.
        throw AppError.conflict(errorMessages.ADDON_LINK_ALREADY_EXISTS);
      }

      await t.commit();
      logger.info(
        `Addon ${addon.name} linked to item ${item.name} (ID: ${item.id})`
      );
      return res.status(201).json({ addon, link });
    } catch (err: any) {
      await t.rollback();
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId } = req.params;

      const item = await Item.findByPk(Number(itemId), {
        include: [
          {
            model: Addon,
            as: "addons",
            through: { attributes: [] },
          },
        ],
      });

      if (!item) {
        throw AppError.notFound(errorMessages.ITEM_NOT_FOUND);
      }

      const addons = (item as any).addons ?? [];
      return res.json(addons);
    } catch (err: any) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId, addonId } = req.params;

      const item = await Item.findByPk(Number(itemId));
      if (!item) {
        throw AppError.notFound(errorMessages.ITEM_NOT_FOUND);
      }

      const deleted = await ItemAddon.destroy({
        where: { item_id: item.id, addon_id: Number(addonId) },
      });

      if (!deleted) {
        throw AppError.notFound(errorMessages.ADDON_LINK_NOT_FOUND);
      }

      logger.info(`Addon ${addonId} unlinked from item ${itemId}`);
      return res.status(204).send();
    } catch (err: any) {
      next(err);
    }
  }
}