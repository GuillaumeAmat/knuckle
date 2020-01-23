import { EOL } from 'os';

import { ConfigurationGenerator } from '../../lib/constants';
import { loadAndMergeConfig } from '../../lib/loadAndMergeConfig';
import { cosmiconfigListLoader } from '../../utils/cosmiconfigListLoader';
import { formatJson } from '../../utils/formatJson';

export const generateConfigurations: ConfigurationGenerator = mergeStrategy => [
  {
    filename: '.prettierrc',
    build: () => loadAndMergeConfig('prettier', mergeStrategy),
    format: config => formatJson(config),
  },
  {
    filename: '.prettierignore',
    build: () =>
      loadAndMergeConfig('prettier', mergeStrategy, [], {
        searchPlaces: ['.prettierignore'],
        loaders: { noExt: cosmiconfigListLoader },
      }),
    format: (config: string[]) => config.join(EOL),
  },
];
