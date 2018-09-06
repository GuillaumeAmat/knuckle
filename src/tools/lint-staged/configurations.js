const { formatJson } = require('../../utils/file');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');

module.exports = [
  {
    filename: '.lintstagedrc',
    get: () =>
      loadAndMergeConfig(
        'lint-staged',
        {},
        {
          searchPlaces: [
            'package.json',
            '.lintstagedrc',
            '.lintstagedrc.json',
            '.lintstagedrc.yaml',
            '.lintstagedrc.yml',
            '.lintstagedrc.js',
            'lint-staged.config.js',
          ],
        },
      ),
    format: config => formatJson(config),
  },
];
