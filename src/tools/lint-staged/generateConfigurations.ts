import { ConfigurationGenerator } from '../../lib/constants';
import { getKnuckleCommand } from '../../lib/getKnuckleCommand';
import { hasEslint } from '../../lib/hasEslint';
import { hasPrettier } from '../../lib/hasPrettier';
import { hasTslint } from '../../lib/hasTslint';
import { loadAndMergeConfig } from '../../lib/loadAndMergeConfig';
import { formatJson } from '../../utils/formatJson';
import { getSupportedExtensions } from '../prettier/getSupportedExtensions';

export const generateConfigurations: ConfigurationGenerator = mergeStrategy => [
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
