const { EOL } = require('os');

const cosmiconfigListLoader = require('../../utils/cosmiconfigListLoader');
const { formatJson } = require('../../utils/file');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');

module.exports = [
  {
    filename: '.prettierrc',
    get: () => loadAndMergeConfig('prettier'),
    format: config => formatJson(config),
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
