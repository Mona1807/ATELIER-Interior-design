const jwt = require('jsonwebtoken');

/**
 * Signs a JWT for a given user id.
 */
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

/**
 * Sets the JWT as an httpOnly cookie on the response.
 * httpOnly + sameSite prevents the token from being read or exfiltrated by
 * client-side JS (XSS), which is safer than storing it in localStorage.
 */
function setTokenCookie(res, token) {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie(process.env.JWT_COOKIE_NAME || 'aidesign_token', token, {
    httpOnly: true,
    secure: isProduction, // requires HTTPS in production
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

function clearTokenCookie(res) {
  res.clearCookie(process.env.JWT_COOKIE_NAME || 'aidesign_token');
}

module.exports = { generateToken, setTokenCookie, clearTokenCookie };
