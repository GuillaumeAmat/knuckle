const { getToolList } = require('./getToolList');

/**
 * Tells if a given list of tools contains non supported ones.
 *
 * @param {Array} tools
 */
function validateToolList(tools) {
  const toolsFolders = getToolList();

  for (const toolName of tools) {
    if (!toolsFolders.includes(toolName)) {
      throw new Error(`\`${toolName}\` is not a supported tool.`);
    }
  }
}

module.exports = { validateToolList };
