const logger = require('../utils/logger');

/**
 * 404 handler for any route that doesn't match.
 */
function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
}

/**
 * Centralized error handler. Keeps every API error response in the same
 * shape: { success: false, message: string }.
 * Any controller can call next(error) to land here.
 */
function errorHandler(err, req, res, next) {
  logger.error(err.message, err.stack);

  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
}

module.exports = { notFound, errorHandler };
