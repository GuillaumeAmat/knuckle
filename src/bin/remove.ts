import '../tools/eslint/command';
import '../tools/lint-staged/command';
import '../tools/prettier/command';
import '../tools/tslint/command';

import program from 'commander';
import { cosmiconfigSync } from 'cosmiconfig';
import difference from 'lodash.difference';
import sortedUniq from 'lodash.sorteduniq';

import { writeJson } from '../utils/writeJson';

program
  .command('remove <toolname> [toolname...]')
  .description('Tell to Knuckle to not handle those tools anymore')
  .action((toolName, toolNames = []) => {
    const configExplorer = cosmiconfigSync('knuckle');
    const configSearch = configExplorer.search();

    if (!configSearch || !configSearch.config.tools) {
      process.exit(0);
    }

    const configFilePath = configSearch.filepath;
    const currentConfig = configSearch.config;
    const newConfig = {
      ...currentConfig,
      tools: sortedUniq(difference(currentConfig.tools, [toolName, ...toolNames]).sort()),
    };

    writeJson(configFilePath, newConfig);

    process.exit(0);
  });
