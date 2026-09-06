const mongoose = require('mongoose');

/**
 * GET /api/health
 * Reports whether the API process is up and, separately, whether it
 * currently has a live MongoDB connection - useful for verifying the full
 * stack is wired together correctly during setup.
 */
function getHealth(req, res) {
  const mongoStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const mongoState = mongoStates[mongoose.connection.readyState] || 'unknown';

  res.status(200).json({
    success: true,
    message: 'API is running.',
    data: {
      server: 'ok',
      database: mongoState,
      timestamp: new Date().toISOString(),
    },
  });
}

module.exports = { getHealth };
