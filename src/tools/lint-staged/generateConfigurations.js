const getSupportedExtensions = require('../prettier/getSupportedExtensions');
const { formatJson } = require('../../utils/formatJson');
const { hasEslint } = require('../../lib/hasEslint');
const { hasPrettier } = require('../../lib/hasPrettier');
const { hasTslint } = require('../../lib/hasTslint');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');
const { getKnuckleCommand } = require('../../lib/getKnuckleCommand');

/**
 * @param {"deep" | "spread" | "replace"} mergeStrategy
 */
function generateConfigurations(mergeStrategy) {
  return [
    {
      filename: '.lintstagedrc',
      build: configuredTools => {
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

        return loadAndMergeConfig(
          'lint-staged',
          mergeStrategy,
          {
            ...(hasPrettierCheck && prettierLinters),
            ...(hasEslintCheck && eslintLinters),
            ...(hasTslintCheck && tslintLinters),
          },
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
      },
      format: config => formatJson(config),
    },
  ];
}

module.exports = { generateConfigurations };
