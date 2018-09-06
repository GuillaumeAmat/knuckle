const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');

module.exports = [
  {
    filename: 'tslint.json',
    get: () => loadAndMergeConfig('eslint'),
    format: config => JSON.stringify(config, null, '  '),
  },
];
