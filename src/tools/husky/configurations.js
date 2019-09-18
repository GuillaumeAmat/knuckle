const { formatJson } = require('../../utils/file');
const { hasCommitlint, hasLintStaged } = require('../../utils/hasDependency');
const loadAndMergeConfig = require('../../utils/loadAndMergeConfig');
const { knuckleCommand } = require('../../utils/tool');

module.exports = [
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
        preCommitHook = { 'pre-commit': `${knuckleCommand} lint-staged` };
      }

      if (hasCommitlint(configuredTools)) {
        commitMsgHook = { 'commit-msg': `${knuckleCommand} commitlint -E HUSKY_GIT_PARAMS` };
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
