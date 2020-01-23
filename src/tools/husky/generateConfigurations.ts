import { ConfigurationGenerator } from '../../lib/constants';
import { getKnuckleCommand } from '../../lib/getKnuckleCommand';
import { hasCommitlint } from '../../lib/hasCommitlint';
import { hasLintStaged } from '../../lib/hasLintStaged';
import { loadAndMergeConfig } from '../../lib/loadAndMergeConfig';
import { formatJson } from '../../utils/formatJson';

export const generateConfigurations: ConfigurationGenerator = mergeStrategy => [
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
