const program = require('commander');
const { cosmiconfigSync } = require('cosmiconfig');
const difference = require('lodash.difference');
const sortedUniq = require('lodash.sorteduniq');

const { writeJson } = require('../utils/writeJson');

require('../tools/eslint/command');
require('../tools/lint-staged/command');
require('../tools/prettier/command');
require('../tools/tslint/command');

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
