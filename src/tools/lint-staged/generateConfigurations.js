const getSupportedExtensions = require('../prettier/getSupportedExtensions');
const { formatJson } = require('../../utils/formatJson');
const { hasEslint } = require('../eslint/hasEslint');
const { hasPrettier } = require('../prettier/hasPrettier');
const { hasTslint } = require('../tslint/hasTslint');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');
const { getKnuckleCommand } = require('../../lib/getKnuckleCommand');

function generateConfigurations() {
  return [
    {
      filename: '.lintstagedrc',
      build: configuredTools => {
        const config = loadAndMergeConfig(
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
        );
        const hasPrettierCheck = hasPrettier(configuredTools);
        const hasEslintCheck = hasEslint(configuredTools);
        const hasTslintCheck = hasTslint(configuredTools);
        const prettierLinters = {
          [`**/*{${getSupportedExtensions().join(',')}}`]: [
            `${getKnuckleCommand()} prettier --write`,
            'git add',
          ],
          '**/.!(npm|yarn)*rc': [`${getKnuckleCommand()} prettier --write`, 'git add'],
        };
        const eslintLinters = {
          '**/*.{js,jsx}': [`${getKnuckleCommand()} eslint`],
        };
        const tslintLinters = {
          '**/*.{ts,tsx}': [`${getKnuckleCommand()} tslint`],
        };

        return {
          ...config,
          ...(hasPrettierCheck && prettierLinters),
          ...(hasEslintCheck && eslintLinters),
          ...(hasTslintCheck && tslintLinters),
        };
      },
      format: config => formatJson(config),
    },
  ];
}

module.exports = { generateConfigurations };
