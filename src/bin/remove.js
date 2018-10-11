const program = require('commander');
const cosmiconfig = require('cosmiconfig');
const difference = require('lodash/difference');
const sortedUniq = require('lodash/sortedUniq');

const { writeJson } = require('../utils/file');

require('../tools/eslint/command');
require('../tools/lint-staged/command');
require('../tools/prettier/command');
require('../tools/tslint/command');

program
  .command('remove <toolname> [toolname...]')
  .description('Tell to Knuckle to not handle those tools anymore')
  .action((toolName, toolNames = []) => {
    const configExplorer = cosmiconfig('knuckle');
    const configSearch = configExplorer.searchSync();

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
