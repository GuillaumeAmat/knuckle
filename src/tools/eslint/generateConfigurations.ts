import { EOL } from 'os';

import { ConfigurationGenerator } from '../../lib/constants';
import { hasJest } from '../../lib/hasJest';
import { hasPrettier } from '../../lib/hasPrettier';
import { hasReact } from '../../lib/hasReact';
import { loadAndMergeConfig } from '../../lib/loadAndMergeConfig';
import { cosmiconfigListLoader } from '../../utils/cosmiconfigListLoader';
import { formatJson } from '../../utils/formatJson';

export const generateConfigurations: ConfigurationGenerator = mergeStrategy => [
  {
    filename: '.eslintrc',
    build: configuredTools => {
      const hasPrettierCheck = hasPrettier(configuredTools);
      const hasJestCheck = hasJest(configuredTools);
      const hasReactCheck = hasReact();

      return loadAndMergeConfig('eslint', mergeStrategy, {
        extends: [
          hasReactCheck ? 'plugin:react/recommended' : false,
          hasPrettierCheck ? 'prettier' : false,
          hasPrettierCheck && hasReactCheck ? 'prettier/react' : false,
        ].filter(Boolean),
        env: {
          ...(hasJestCheck && { jest: true }),
        },
        plugins: [hasReactCheck ? 'react' : false, hasJestCheck ? 'jest' : false].filter(Boolean),
      });
    },
    format: config => formatJson(config),
  },
  {
    filename: '.eslintignore',
    build: () =>
      loadAndMergeConfig('eslint', mergeStrategy, [], {
        searchPlaces: ['.eslintignore'],
        loaders: { noExt: cosmiconfigListLoader },
      }),
    format: (config: string[]) => config.join(EOL),
  },
];
