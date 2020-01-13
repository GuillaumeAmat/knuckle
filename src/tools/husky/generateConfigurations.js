const { formatJson } = require('../../utils/formatJson');
const { getKnuckleCommand } = require('../../lib/getKnuckleCommand');
const { hasCommitlint } = require('../../lib/hasCommitlint');
const { hasLintStaged } = require('../../lib/hasLintStaged');
const { loadAndMergeConfig } = require('../../lib/loadAndMergeConfig');

/**
 * @param {"deep" | "spread" | "replace"} mergeStrategy
 */
function generateConfigurations(mergeStrategy) {
  return [
    {
      filename: '.huskyrc',
      build: configuredTools => {
        let preCommitHook;
        let commitMsgHook;

        if (hasLintStaged(configuredTools)) {
          preCommitHook = { 'pre-commit': `${getKnuckleCommand()} lint-staged` };
        }

        if (hasCommitlint(configuredTools)) {
          commitMsgHook = { 'commit-msg': `${getKnuckleCommand()} commitlint -E HUSKY_GIT_PARAMS` };
        }

        return loadAndMergeConfig(
          'lint-staged',
          mergeStrategy,
          {
            hooks: {
              ...preCommitHook,
              ...commitMsgHook,
            },
          },
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
      },
      format: config => formatJson(config),
    },
  ];
}

module.exports = { generateConfigurations };
