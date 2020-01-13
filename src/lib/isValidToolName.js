const { getToolList } = require('./getToolList');

/**
 * Tells if the given tool name is supported by Knuckle.
 *
 * @param {string} toolName
 */
function isValidToolName(toolName) {
  return getToolList().includes(toolName);
}

module.exports = { isValidToolName };
