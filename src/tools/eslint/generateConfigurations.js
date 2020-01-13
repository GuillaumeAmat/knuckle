const { EOL } = require('os');

const { hasJest } = require('../../lib/hasJest');
const { hasPrettier } = require('../../lib/hasPrettier');
const { hasReact } = require('../../lib/hasReact');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');
const { cosmiconfigListLoader } = require('../../utils/cosmiconfigListLoader');
const { formatJson } = require('../../utils/formatJson');

/**
 * @param {"deep" | "spread" | "replace"} mergeStrategy
 */
function generateConfigurations(mergeStrategy) {
  return [
    {
      filename: '.eslintrc',
      build: configuredTools => {
        const hasPrettierCheck = hasPrettier(configuredTools);
        const hasJestCheck = hasJest(configuredTools);
        const hasReactCheck = hasReact(configuredTools);

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
      format: config => config.join(EOL),
    },
  ];
}

module.exports = { generateConfigurations };
