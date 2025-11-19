import { Sequelize } from "sequelize";
import logger from "./logger";

let sequelize: Sequelize;

// Check if we are in the test environment
if (process.env.NODE_ENV === "test") {
  // Use in-memory SQLite database for testing
  sequelize = new Sequelize("sqlite::memory:", {
    dialect: "sqlite",
    storage: ":memory:",
    logging: false, // Turn off logging for tests
  });
} else {
  // Use environment variables for development/production
  const dbName = process.env.DB_NAME || "foodhub_v3";
  const dbUser = process.env.DB_USER || "root";
  const dbPassword = process.env.DB_PASSWORD; // Get password from .env
  const dbHost = process.env.DB_HOST || "localhost";

  // Check if password was loaded
  if (!dbPassword) {
    logger.error("DB_PASSWORD not found. Make sure .env file is set up.");
    process.exit(1);
  }

  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    logging: (msg) => logger.info(msg), // Use winston for SQL logging
  });
}

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    // Only log the connection if not in test mode
    if (process.env.NODE_ENV !== "test") {
      logger.info("Database connection established successfully.");
    }
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);
    process.exit(1);
  }
};

export default sequelize;