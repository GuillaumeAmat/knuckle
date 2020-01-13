const mergeWith = require('lodash.mergewith');

/**
 * Customizer for the lodash `mergeWith` function.
 * It concatenates the arrays instead of overwriting them.
 *
 * @param {*} objValue
 * @param {*} srcValue
 */
function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

/**
 * Merge objects/arrays with the Lodash mergeWith function and a custom array handling.
 *
 * @param  {...any} objects
 */
function deepMerge(...objects) {
  return mergeWith(...objects, customizer);
}

module.exports = { deepMerge };
