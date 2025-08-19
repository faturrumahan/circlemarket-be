import winston from 'winston';
import 'winston-daily-rotate-file'; // This adds the DailyRotateFile transport to winston
import path from 'path';

const logDir = 'logs'; // Directory to store log files

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }), // Log stack trace for errors
  winston.format.splat(), // Interpolate variables
  winston.format.json() // Use JSON format for logs
);

// Define transports
const transports = [
  // Console transport for development
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.colorize(), // Add colors to console output
      winston.format.printf(
        (info) =>
          `${info.timestamp} ${info.level}: ${info.message}` +
          (info.stack ? `\n${info.stack}` : '')
      )
    ),
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info', // More verbose in dev
  }),

  // Daily rotate file transport for general logs (info, warn, error)
  new winston.transports.DailyRotateFile({
    filename: path.join(logDir, 'application-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m', // Max size of log file
    maxFiles: '14d', // Retain logs for 14 days
    level: 'http', // Log http and above to capture request logs
    format: logFormat,
  }),

  // Daily rotate file transport for error logs only
  new winston.transports.DailyRotateFile({
    filename: path.join(logDir, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error', // Log errors only
    format: logFormat,
  }),
];

// Create the logger instance
const logger = winston.createLogger({
  levels: winston.config.npm.levels, // Use npm standard log levels
  format: logFormat,
  transports: transports,
  exitOnError: false, // Do not exit on handled exceptions
});

export default logger;