const { MERGE_STRATEGIES } = require('./constants');

/**
 * Tells if the given merge strategy is supported by Knuckle.
 *
 * @param {string} mergeStrategy
 */
function isValidMergeStrategy(mergeStrategy) {
  return Object.values(MERGE_STRATEGIES).includes(mergeStrategy);
}

module.exports = { isValidMergeStrategy };
