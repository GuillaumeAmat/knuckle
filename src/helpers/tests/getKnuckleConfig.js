const { cosmiconfigSync } = require('cosmiconfig');

/**
 * Find the Knuckle configuration file and return its parsed content.
 *
 * @return Object
 */
function getKnuckleConfig() {
  const configExplorer = cosmiconfigSync('knuckle');
  return configExplorer.search();
}

module.exports = { getKnuckleConfig };
