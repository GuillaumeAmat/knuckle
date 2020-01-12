const { EOL } = require('os');

const { hasPrettier } = require('../prettier/hasPrettier');
const { hasJest } = require('../../lib/hasJest');
const { hasReact } = require('../../lib/hasReact');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');
const { cosmiconfigListLoader } = require('../../utils/cosmiconfigListLoader');
const { formatJson } = require('../../utils/formatJson');

const prettierConfig = loadAndMergeConfig('prettier');
delete prettierConfig.overrides;

function generateConfigurations() {
  return [
    {
      filename: '.eslintrc',
      build: configuredTools => {
        const config = loadAndMergeConfig('eslint');
        const hasPrettierCheck = hasPrettier(configuredTools);
        const hasJestCheck = hasJest(configuredTools);
        const hasReactCheck = hasReact(configuredTools);

        return {
          ...config,
          extends: [
            ...config.extends,
            hasReactCheck ? 'plugin:react/recommended' : false,
            hasPrettierCheck ? 'prettier' : false,
            hasPrettierCheck && hasReactCheck ? 'prettier/react' : false,
          ].filter(Boolean),
          env: {
            ...config.env,
            ...(hasJestCheck && { jest: true }),
          },
          plugins: [
            ...config.plugins,
            hasReactCheck ? 'react' : false,
            hasJestCheck ? 'jest' : false,
          ].filter(Boolean),
          // Disabled for now as ESLint complaints about the unknown "prettier/prettier" rule
          // rules: {
          //   ...config.rules,
          //   ...(hasPrettierCheck && { 'prettier/prettier': ['error', { ...prettierConfig }] }),
          // },
        };
      },
      format: config => formatJson(config),
    },
    {
      filename: '.eslintignore',
      build: () =>
        loadAndMergeConfig('eslint', [], {
          searchPlaces: ['.eslintignore'],
          loaders: { noExt: cosmiconfigListLoader },
        }),
      format: config => config.join(EOL),
    },
  ];
}

module.exports = { generateConfigurations };
