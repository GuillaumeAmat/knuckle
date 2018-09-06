const { EOL } = require('os');

const cosmiconfigListLoader = require('../../utils/cosmiconfigListLoader');
const { formatJson } = require('../../utils/file');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');

module.exports = [
  {
    filename: '.eslintrc',
    get: () => loadAndMergeConfig('eslint'),
    format: config => formatJson(config),
  },
  {
    filename: '.eslintignore',
    get: () =>
      loadAndMergeConfig('eslint', [], {
        searchPlaces: ['.eslintignore'],
        loaders: { noExt: cosmiconfigListLoader },
      }),
    format: config => config.join(EOL),
  },
];
