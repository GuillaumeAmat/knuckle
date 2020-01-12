const { formatJson } = require('../../utils/formatJson');
const { hasPrettier } = require('../prettier/hasPrettier');
const { hasReact } = require('../../lib/hasReact');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');

function generateConfigurations() {
  return [
    {
      filename: 'tslint.json',
      build: configuredTools => {
        const config = loadAndMergeConfig('tslint', {}, { searchPlaces: ['tslint.json'] });

        return {
          ...config,
          extends: [
            ...config.extends,
            hasPrettier(configuredTools) ? 'tslint-config-prettier' : false,
            hasReact(configuredTools) ? 'tslint-react' : false,
          ].filter(Boolean),
        };
      },
      format: config => formatJson(config),
    },
  ];
}

module.exports = { generateConfigurations };
