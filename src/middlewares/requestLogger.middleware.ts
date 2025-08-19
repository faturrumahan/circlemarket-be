import morgan from 'morgan';
import logger from '../config/logger';

// Use the 'dev' format for development for colored, concise logs.
// Use the 'combined' format for production for Apache standard combined log output.
const morganFormat = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';

// Define a stream object that uses winston's logger.
const stream = {
  // Use the 'http' log level so the output is picked up by the 'http' transport
  write: (message: string) => logger.http(message.trim()),
};

// Options for morgan.
const morganMiddleware = morgan(morganFormat, {
  stream,
});

export default morganMiddleware;