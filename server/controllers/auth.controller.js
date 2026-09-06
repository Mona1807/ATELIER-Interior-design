const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');
const { generateToken, setTokenCookie, clearTokenCookie } = require('../utils/generateToken');

const SALT_ROUNDS = 10;

/**
 * POST /api/auth/register
 */
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const errors = validateRegisterInput({ name, email, password });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(' ') });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    });

    const token = generateToken(user._id);
    setTokenCookie(res, token);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: { user: user.toJSON() },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/login
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const errors = validateLoginInput({ email, password });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(' ') });
    }

    const normalizedEmail = email.trim().toLowerCase();
    // passwordHash has `select: false` on the schema, so it must be requested explicitly
    const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');

    // Same generic message whether the email or password is wrong, so we
    // don't leak which emails are registered.
    const genericError = { success: false, message: 'Invalid email or password.' };

    if (!user) {
      return res.status(401).json(genericError);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json(genericError);
    }

    const token = generateToken(user._id);
    setTokenCookie(res, token);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      data: { user: user.toJSON() },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/logout
 */
function logout(req, res) {
  clearTokenCookie(res);
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
}

/**
 * GET /api/auth/me
 * Requires the `protect` middleware to have run first (req.user is set).
 */
function getCurrentUser(req, res) {
  return res.status(200).json({
    success: true,
    data: { user: req.user.toJSON() },
  });
}

module.exports = { register, login, logout, getCurrentUser };
