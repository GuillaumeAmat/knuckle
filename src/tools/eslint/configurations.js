const { EOL } = require('os');

const cosmiconfigListLoader = require('../../utils/cosmiconfigListLoader');
const { formatJson } = require('../../utils/file');
const { hasJest, hasPrettier, hasReact } = require('../../utils/hasDependency');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');

const prettierConfig = loadAndMergeConfig('prettier');
delete prettierConfig.overrides;

module.exports = [
  {
    filename: '.eslintrc',
    get: configuredTools => {
      const config = loadAndMergeConfig('eslint');
      const hasPrettierCheck = hasPrettier(configuredTools);
      const hasJestCheck = hasJest(configuredTools);
      const hasReactCheck = hasReact(configuredTools);

      return {
        ...config,
        extends: [
          ...config.extends,
          hasPrettierCheck ? 'prettier' : false,
          hasReactCheck ? 'plugin:react/recommended' : false,
        ].filter(Boolean),
        env: {
          ...config.env,
          ...(hasJestCheck && { jest: { global: true } }),
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
    get: () =>
      loadAndMergeConfig('eslint', [], {
        searchPlaces: ['.eslintignore'],
        loaders: { noExt: cosmiconfigListLoader },
      }),
    format: config => config.join(EOL),
  },
];
