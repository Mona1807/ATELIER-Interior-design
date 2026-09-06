const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Connects to MongoDB using MONGO_URI from environment variables.
 * The process exits on failure, since the API cannot serve data-backed
 * routes without a database connection.
 */
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    logger.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
