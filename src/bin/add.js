const program = require('commander');
const cosmiconfig = require('cosmiconfig');
const sortedUniq = require('lodash/sortedUniq');
const path = require('path');
const spawn = require('cross-spawn');

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

    const newDependencies = [];

    for (const newTool of newTools) {
      const dependencies = require(path.join(__dirname, '../tools', newTool, 'dependencies'));
      newDependencies.push(...dependencies.getDependencies(newConfig.tools));
    }

    const result = spawn.sync('npm', ['install', '-D', ...newDependencies], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    if (result.status > 0) {
      process.exit(result.status);
    }

    writeJson(configFilePath, newConfig);

    process.exit(0);
  });
