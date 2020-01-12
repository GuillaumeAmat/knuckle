const { formatJson } = require('../../utils/formatJson');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');

function generateConfigurations() {
  return [
    {
      filename: 'commitlint.config.js',
      build: () => {
        const config = loadAndMergeConfig(
          'commitlint',
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
