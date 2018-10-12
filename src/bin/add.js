const program = require('commander');
const cosmiconfig = require('cosmiconfig');
const sortedUniq = require('lodash/sortedUniq');
const path = require('path');

const { writeJson } = require('../utils/file');
const { validateModuleList } = require('../utils/module');
const { printErrorAndExit } = require('../utils/output');

program
  .command('add <toolname> [toolname...]')
  .description('Tell to Knuckle to handle new tools')
  .action((toolName, toolNames = []) => {
    const configExplorer = cosmiconfig('knuckle');
    const configSearch = configExplorer.searchSync() || {};
    const configFilePath = configSearch.filepath || path.join(process.cwd(), '.knucklerc');
    const currentConfig = configSearch.config || {};
    const newTools = [toolName, ...toolNames];
    const newConfig = {
      ...currentConfig,
      tools: sortedUniq([...(currentConfig.tools || []), ...newTools].sort()),
    };

    try {
      validateModuleList(newTools);
    } catch (e) {
      printErrorAndExit(`${e.message} You can't add it.`);
    }

    writeJson(configFilePath, newConfig);

    process.exit(0);
  });
