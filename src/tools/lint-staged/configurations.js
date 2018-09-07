const { formatJson } = require('../../utils/file');
const { hasEslint, hasPrettier, hasTslint } = require('../../utils/hasDependency');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');
const { knuckleCommand } = require('../../utils/module');

module.exports = [
  {
    filename: '.lintstagedrc',
    get: configuredTools => {
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
        '**/*.{js,jsx,ts,tsx,vue,json,yaml,css,scss,less,html,md,mdx,graphql}': [
          `${knuckleCommand} prettier --write`,
          'git add',
        ],
        '**/.*rc': [`${knuckleCommand} prettier --write`, 'git add'],
      };
      const eslintLinters = {
        '**/*.{js,jsx}': [`${knuckleCommand} eslint`],
      };
      const tslintLinters = {
        '**/*.{ts,tsx}': [`${knuckleCommand} tslint`],
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
