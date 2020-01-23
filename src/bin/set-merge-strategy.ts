import program from 'commander';
import { cosmiconfigSync } from 'cosmiconfig';
import path from 'path';

import { MERGE_STRATEGIES } from '../lib/constants';
import { getToolList } from '../lib/getToolList';
import { isValidMergeStrategy } from '../lib/isValidMergeStrategy';
import { isValidToolName } from '../lib/isValidToolName';
import { printErrorAndExit } from '../utils/printErrorAndExit';
import { sortObjectByKeys } from '../utils/sortObjectByKeys';
import { writeJson } from '../utils/writeJson';

program
  .command('set-merge-strategy <toolname> <strategy>')
  .description('Set a new merge strategy for a tool (use `*` to set the default strategy)')
  .action(async (toolName, mergeStrategy) => {
    const configExplorer = cosmiconfigSync('knuckle');
    const configSearch = configExplorer.search();
    const configFilePath = configSearch?.filepath || path.join(process.cwd(), '.knucklerc');
    const currentConfig = configSearch?.config || {};
    const currentMergeStrategies = currentConfig.mergeStrategies || {};

    if (toolName !== 'default' && !isValidToolName(toolName)) {
      printErrorAndExit(
        `${toolName} is not a valid tool name. The available options are: default, ${getToolList().join(
          ', ',
        )}.`,
      );
    }

    if (!isValidMergeStrategy(mergeStrategy)) {
      printErrorAndExit(
        `${mergeStrategy} is not a valid merge strategy. The available strategies are: ${Object.values(
          MERGE_STRATEGIES,
        ).join(', ')}.`,
      );
    }

    const newConfig = {
      ...currentConfig,
      ...{
        mergeStrategies: sortObjectByKeys({
          ...currentMergeStrategies,
          [toolName]: mergeStrategy,
        }),
      },
    };

    writeJson(configFilePath, newConfig);

    process.exit(0);
  });
