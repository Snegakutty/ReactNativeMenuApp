import sequelize from "../config/db"; // adjust path if different

import { Category } from "./Category";
import { Item } from "./Item";
import { Addon } from "./Addon";
import { ItemAddon } from "./ItemAddon";

// Define Relationships
Category.hasMany(Item, { foreignKey: "category_id" });
Item.belongsTo(Category, { foreignKey: "category_id" });

Item.belongsToMany(Addon, { through: ItemAddon, as: "addons", foreignKey: "item_id" });
Addon.belongsToMany(Item, { through: ItemAddon, as: "items", foreignKey: "addon_id" });

export { sequelize, Category, Item, Addon, ItemAddon };
