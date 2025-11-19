// src/config/logger.ts
import winston from "winston";

const { combine, timestamp, printf, colorize, align } = winston.format;

// This is the print format for all transports
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// This is the base format (used by the file transport)
const baseFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  align(),
  logFormat
);

const logger = winston.createLogger({
  level: "info",
  // Use the un-colorized baseFormat as the default
  format: baseFormat,
  transports: [
    // Console transport
    new winston.transports.Console({
      // Create a new format just for the console that adds color
      format: combine(
        colorize(),
        baseFormat // Re-use the base format
      ),
    }),
    
    // File transport (This is the new part)
    new winston.transports.File({
      filename: 'app.log',
      // This will use the logger's default format (baseFormat, no color)
    }),
  ],
});

export default logger;