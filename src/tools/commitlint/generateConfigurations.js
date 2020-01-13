const { formatJson } = require('../../utils/formatJson');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');

/**
 * @param {"deep" | "spread" | "replace"} mergeStrategy
 */
function generateConfigurations(mergeStrategy) {
  return [
    {
      filename: 'commitlint.config.js',
      build: () => {
        const config = loadAndMergeConfig(
          'commitlint',
          mergeStrategy,
          {},
          {
            searchPlaces: ['commitlint.config.js'],
          },
        );

        return `module.exports = ${formatJson(config)}`;
      },
      format: config => config,
    },
  ];
}

module.exports = { generateConfigurations };
