const { EOL } = require('os');

const cosmiconfigListLoader = require('../../utils/cosmiconfigListLoader');
const { formatJson } = require('../../utils/file');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');

module.exports = [
  {
    filename: '.prettierrc',
    build: () => loadAndMergeConfig('prettier'),
    format: config => formatJson(config),
  },
  {
    filename: '.prettierignore',
    build: () =>
      loadAndMergeConfig('prettier', [], {
        searchPlaces: ['.prettierignore'],
        loaders: { noExt: cosmiconfigListLoader },
      }),
    format: config => config.join(EOL),
  },
];
