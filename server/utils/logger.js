/**
 * Minimal, dependency-free logger. Kept intentionally simple for Phase 1 -
 * timestamps every line and tags it with a level, and can be swapped for
 * a library like winston or pino later without changing call sites
 * elsewhere in the app (they'd still just call logger.info/warn/error).
 */

function timestamp() {
  return new Date().toISOString();
}

function info(message, meta) {
  console.log(`[${timestamp()}] [INFO] ${message}`, meta ?? '');
}

function warn(message, meta) {
  console.warn(`[${timestamp()}] [WARN] ${message}`, meta ?? '');
}

function error(message, meta) {
  console.error(`[${timestamp()}] [ERROR] ${message}`, meta ?? '');
}

/**
 * Express middleware that logs every request once it finishes, including
 * the response status code and how long it took.
 */
function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - start;
    info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${durationMs}ms`);
  });

  next();
}

module.exports = { info, warn, error, requestLogger };
