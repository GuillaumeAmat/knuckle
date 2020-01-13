const { EOL } = require('os');

const { cosmiconfigListLoader } = require('../../utils/cosmiconfigListLoader');
const { formatJson } = require('../../utils/formatJson');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');

/**
 * @param {"deep" | "spread" | "replace"} mergeStrategy
 */
function generateConfigurations(mergeStrategy) {
  return [
    {
      filename: '.prettierrc',
      build: () => loadAndMergeConfig('prettier', mergeStrategy),
      format: config => formatJson(config),
    },
    {
      filename: '.prettierignore',
      build: () =>
        loadAndMergeConfig('prettier', mergeStrategy, [], {
          searchPlaces: ['.prettierignore'],
          loaders: { noExt: cosmiconfigListLoader },
        }),
      format: config => config.join(EOL),
    },
  ];
}

module.exports = { generateConfigurations };
