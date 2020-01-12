const { formatJson } = require('../../utils/formatJson');
const { hasCommitlint } = require('../commitlint/hasCommitlint');
const { hasLintStaged } = require('../lint-staged/hasLintStaged');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');
const { getKnuckleCommand } = require('../../lib/getKnuckleCommand');

function generateConfigurations() {
  return [
    {
      filename: '.huskyrc',
      build: configuredTools => {
        const config = loadAndMergeConfig(
          'lint-staged',
          {},
          {
            searchPlaces: [
              'package.json',
              '.huskyrc',
              '.huskyrc.json',
              '.huskyrc.yaml',
              '.huskyrc.yml',
              '.huskyrc.js',
              'husky.config.js',
            ],
          },
        );

        let preCommitHook;
        let commitMsgHook;

        if (hasLintStaged(configuredTools)) {
          preCommitHook = { 'pre-commit': `${getKnuckleCommand} lint-staged` };
        }

        if (hasCommitlint(configuredTools)) {
          commitMsgHook = { 'commit-msg': `${getKnuckleCommand} commitlint -E HUSKY_GIT_PARAMS` };
        }

        return {
          ...config,
          hooks: {
            ...config.hooks,
            ...preCommitHook,
            ...commitMsgHook,
          },
        };
      },
      format: config => formatJson(config),
    },
  ];
}

module.exports = { generateConfigurations };
