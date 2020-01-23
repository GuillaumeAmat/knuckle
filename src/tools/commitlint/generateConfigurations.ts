import { ConfigurationGenerator } from '../../lib/constants';
import { loadAndMergeConfig } from '../../lib/loadAndMergeConfig';
import { formatJson } from '../../utils/formatJson';

export const generateConfigurations: ConfigurationGenerator = (mergeStrategy) => [
  {
    filename: 'commitlint.config.js',
    build: () => {
      const config = loadAndMergeConfig(
        'commitlint',
        mergeStrategy,
        {},
        {
          searchPlaces: ['commitlint.config.js'],
        },
      );

      return `module.exports = ${formatJson(config)}`;
    },
    format: config => config,
  },
];
