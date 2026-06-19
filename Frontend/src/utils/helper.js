// utils/helper.js

/**
 * Validate Email Address
 *
 * Returns:
 * true  -> valid email
 * false -> invalid email
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};
