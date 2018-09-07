const { formatJson } = require('../../utils/file');
const hasDependency = require('../../utils/hasDependency');
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
          hasDependency('prettier') ? 'tslint-config-prettier' : false,
          configuredTools.includes('prettier') ? 'tslint-config-prettier' : false,
          hasDependency('react') ? 'tslint-react' : false,
          hasDependency('react-scripts') ? 'tslint-react' : false,
        ].filter(Boolean),
      };
    },
    format: config => formatJson(config),
  },
];
