const { EOL } = require('os');

const cosmiconfigListLoader = require('../../utils/cosmiconfigListLoader');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');

module.exports = [
  {
    filename: '.prettierrc',
    get: () => loadAndMergeConfig('prettier'),
    format: config => JSON.stringify(config, null, '  '),
  },
  {
    filename: '.prettierignore',
    get: () =>
      loadAndMergeConfig('prettier', [], {
        searchPlaces: ['.prettierignore'],
        loaders: { noExt: cosmiconfigListLoader },
      }),
    format: config => config.join(EOL),
  },
];
