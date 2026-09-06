const validator = require('validator');

/**
 * Validates registration input.
 * Returns an array of human-readable error messages (empty array = valid).
 * This shape matches what middleware/validationHandler.js's `validate()`
 * factory expects, so it can be dropped straight into a route.
 */
function validateRegisterInput({ name, email, password }) {
  const errors = [];

  if (!name || !name.trim() || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters.');
  }

  if (!email || !validator.isEmail(email)) {
    errors.push('A valid email address is required.');
  }

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters.');
  } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one letter and one number.');
  }

  return errors;
}

function validateLoginInput({ email, password }) {
  const errors = [];

  if (!email || !validator.isEmail(email)) {
    errors.push('A valid email address is required.');
  }

  if (!password) {
    errors.push('Password is required.');
  }

  return errors;
}

const PROJECT_TYPES = ['Residential', 'Commercial', 'Apartment', 'Office', 'Other'];

/**
 * Validates create/update project input. `isUpdate` relaxes required-field
 * checks so a partial update (e.g. only changing the description) doesn't
 * fail just because other fields weren't resent.
 */
function validateProjectInput(
  { name, type, plotDimensions, numberOfFloors },
  { isUpdate = false } = {}
) {
  const errors = [];

  if (!isUpdate || name !== undefined) {
    if (!name || !name.trim() || name.trim().length < 2) {
      errors.push('Project name must be at least 2 characters.');
    }
  }

  if (!isUpdate || type !== undefined) {
    if (!type || !PROJECT_TYPES.includes(type)) {
      errors.push(`Project type must be one of: ${PROJECT_TYPES.join(', ')}.`);
    }
  }

  if (!isUpdate || plotDimensions !== undefined) {
    const width = plotDimensions?.width;
    const length = plotDimensions?.length;
    if (typeof width !== 'number' || width <= 0) {
      errors.push('Plot width must be a positive number.');
    }
    if (typeof length !== 'number' || length <= 0) {
      errors.push('Plot length must be a positive number.');
    }
  }

  if (!isUpdate || numberOfFloors !== undefined) {
    if (typeof numberOfFloors !== 'number' || numberOfFloors < 1) {
      errors.push('Number of floors must be at least 1.');
    }
  }

  return errors;
}

module.exports = { validateRegisterInput, validateLoginInput, validateProjectInput, PROJECT_TYPES };
