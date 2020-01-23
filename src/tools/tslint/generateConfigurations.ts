import { ConfigurationGenerator } from '../../lib/constants';
import { hasPrettier } from '../../lib/hasPrettier';
import { hasReact } from '../../lib/hasReact';
import { loadAndMergeConfig } from '../../lib/loadAndMergeConfig';
import { formatJson } from '../../utils/formatJson';

export const generateConfigurations: ConfigurationGenerator = mergeStrategy => [
  {
    filename: 'tslint.json',
    build: configuredTools =>
      loadAndMergeConfig(
        'tslint',
        mergeStrategy,
        {
          extends: [
            hasPrettier(configuredTools) ? 'tslint-config-prettier' : false,
            hasReact() ? 'tslint-react' : false,
          ].filter(Boolean),
        },
        { searchPlaces: ['tslint.json'] },
      ),
    format: config => formatJson(config),
  },
];
