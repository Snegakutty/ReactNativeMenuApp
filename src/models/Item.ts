import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Category } from "./Category";

export class Item extends Model {
  declare id: number;
  declare name: string;
  declare veg_type: "veg" | "non-veg";
  declare price: number;
  declare is_bestseller: boolean;
  declare size?: string | null;
  declare prep_time_mins?: number | null;
  declare category_id: number;
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    veg_type: {
      type: DataTypes.ENUM("VEG", "NON-VEG"),
      allowNull: false,
      defaultValue: "VEG",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    is_bestseller: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    size: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    prep_time_mins: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "item",
    timestamps: true,
  }
);

// associations will be set in models/index.ts to avoid circular ordering
