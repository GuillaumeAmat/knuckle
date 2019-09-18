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

      return `module.exports = ${JSON.stringify(config, null, '  ')}`;
    },
    format: config => config,
  },
];
