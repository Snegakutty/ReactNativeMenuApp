import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Item } from "./Item";
import { Addon } from "./Addon";

export class ItemAddon extends Model {
  declare id: number;
  declare item_id: number;
  declare addon_id: number;
}

ItemAddon.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    item_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    addon_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "item_addons",
    timestamps: true,
  }
);

// note: associations are established in models/Index.ts
