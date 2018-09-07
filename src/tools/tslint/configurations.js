const { formatJson } = require('../../utils/file');
const { hasPrettier, hasReact } = require('../../utils/hasDependency');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');

module.exports = [
  {
    filename: 'tslint.json',
    get: configuredTools => {
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
