// src/models/Addon.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Addon extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
}

Addon.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, 
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "addons",
    timestamps: true,
  }
);