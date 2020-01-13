const { formatJson } = require('../../utils/formatJson');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');
const { hasPrettier } = require('../../lib/hasPrettier');
const { hasReact } = require('../../lib/hasReact');

/**
 * @param {"deep" | "spread" | "replace"} mergeStrategy
 */
function generateConfigurations(mergeStrategy) {
  return [
    {
      filename: 'tslint.json',
      build: configuredTools =>
        loadAndMergeConfig(
          'tslint',
          mergeStrategy,
          {
            extends: [
              hasPrettier(configuredTools) ? 'tslint-config-prettier' : false,
              hasReact(configuredTools) ? 'tslint-react' : false,
            ].filter(Boolean),
          },
          { searchPlaces: ['tslint.json'] },
        ),
      format: config => formatJson(config),
    },
  ];
}

module.exports = { generateConfigurations };
