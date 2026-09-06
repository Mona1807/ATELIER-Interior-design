const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * Protects a route: verifies the JWT (from the httpOnly cookie, or an
 * Authorization header for non-browser clients) and attaches the
 * authenticated user to req.user. Used by auth routes now, and by
 * project routes (Phase 3) to require a logged-in user.
 */
async function protect(req, res, next) {
  try {
    const cookieName = process.env.JWT_COOKIE_NAME || 'aidesign_token';
    let token = req.cookies?.[cookieName];

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated. Please log in.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User for this session no longer exists.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please log in again.',
    });
  }
}

module.exports = { protect };
