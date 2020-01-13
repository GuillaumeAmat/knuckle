const program = require('commander');
const { cosmiconfigSync } = require('cosmiconfig');
const path = require('path');

const { writeJson } = require('../utils/writeJson');
const { MERGE_STRATEGIES } = require('../lib/constants');
const { getToolList } = require('../lib/getToolList');
const { isValidMergeStrategy } = require('../lib/isValidMergeStrategy');
const { isValidToolName } = require('../lib/isValidToolName');
const { printErrorAndExit } = require('../utils/printErrorAndExit');
const { sortObjectByKeys } = require('../utils/sortObjectByKeys');

program
  .command('set-merge-strategy <toolname> <strategy>')
  .description('Set a new merge strategy for a tool (use `*` to set the default strategy)')
  .action(async (toolName, mergeStrategy) => {
    const configExplorer = cosmiconfigSync('knuckle');
    const configSearch = configExplorer.search() || {};
    const configFilePath = configSearch.filepath || path.join(process.cwd(), '.knucklerc');
    const currentConfig = configSearch.config || {};
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
