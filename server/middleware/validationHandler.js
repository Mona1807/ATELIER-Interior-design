/**
 * Generic validation middleware factory. Not used by any route yet in
 * Phase 1 (there's nothing to validate), but scaffolded now so later
 * phases (e.g. register/login in Phase 2) can plug in validation without
 * adding new middleware wiring.
 *
 * `validatorFn` is a function that takes req.body and returns an array of
 * error message strings (empty array = valid). Keeping the interface this
 * simple means the underlying validation logic can later be swapped for a
 * library like express-validator, zod, or Joi without changing how routes
 * use this middleware.
 *
 * Example future usage:
 *   const { validate } = require('../middleware/validationHandler');
 *   const { validateRegisterInput } = require('../utils/validators');
 *   router.post('/register', validate(validateRegisterInput), register);
 */
function validate(validatorFn) {
  return (req, res, next) => {
    const errors = validatorFn(req.body || {});

    if (Array.isArray(errors) && errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(' '),
      });
    }

    next();
  };
}

module.exports = { validate };
