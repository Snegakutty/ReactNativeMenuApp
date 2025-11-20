// **** ADD THESE TWO LINES AT THE VERY TOP ****
import dotenv from "dotenv";
dotenv.config();
// ********************************************

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import sequelize, { testDbConnection } from "./config/db"; // This must be after dotenv.config()
import "./models/Index";
import path from "path";
import logger from "./config/logger";

import categoryRoutes from "./routes/categories";
import itemRoutes from "./routes/items";
import addonRoutes from "./routes/addons";
import menuRoutes from "./routes/menu";
// Import the new error handler
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("FoodHub API v3 Running (ID-based)"));
app.use(express.static(path.join(__dirname, "../public")));

// API Routes
app.use("/categories", categoryRoutes);
app.use("/items", itemRoutes);
app.use("/addons", addonRoutes);
app.use("/menu", menuRoutes);
// --- Global Error Handler ---
app.use(errorHandler);

// --- Server Startup ---
if (process.env.NODE_ENV !== "test") {
  (async () => {
    try {
      await testDbConnection(); // This will now have the env vars
      await sequelize.sync({ alter: true });
      logger.info("Tables Synced (alter)");

      app.listen(PORT, () =>
        logger.info(`Server running at http://localhost:${PORT}`)
      );
    } catch (err) {
      logger.error(`Startup error: ${err}`);
      process.exit(1);
    }
  })();
}

export default app;