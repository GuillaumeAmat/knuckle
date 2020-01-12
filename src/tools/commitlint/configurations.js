const { formatJson } = require('../../utils/file');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');

module.exports = [
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
