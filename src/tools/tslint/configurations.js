const { formatJson } = require('../../utils/file');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');

module.exports = [
  {
    filename: 'tslint.json',
    get: () => loadAndMergeConfig('tslint', {}, { searchPlaces: ['tslint.json'] }),
    format: config => formatJson(config),
  },
];
