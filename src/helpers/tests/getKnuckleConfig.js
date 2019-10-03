const cosmiconfig = require('cosmiconfig');

/**
 * Find the Knuckle configuration file and return its parsed content.
 * @return Object
 */
function getKnuckleConfig() {
  const configExplorer = cosmiconfig('knuckle');
  return configExplorer.searchSync();
}

module.exports = getKnuckleConfig;
