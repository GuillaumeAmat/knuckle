#!/usr/bin/env node

const program = require('commander');
const cosmiconfig = require('cosmiconfig');
const difference = require('lodash/difference');
const sortedUniq = require('lodash/sortedUniq');
const path = require('path');

const { version: knuckleVersion } = require('../../package.json');
const { writeFile, writeJson } = require('../utils/file');
const { getModuleInfo, validateModuleList } = require('../utils/module');
const { printErrorAndExit, printMessageAndExit } = require('../utils/output');

require('../tools/eslint/command');
require('../tools/lint-staged/command');
require('../tools/prettier/command');
require('../tools/tslint/command');

program.version(knuckleVersion, '-v, --version').usage('<command> [options]');

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

program
  .command('up')
  .description('Create the configuration files')
  .action(() => {
    const configExplorer = cosmiconfig('knuckle');
    const configSearch = configExplorer.searchSync();

    if (!configSearch || !configSearch.config.tools) {
      printErrorAndExit(
        'Unable to find the Knuckle configuration. Did you `knuckle add` some tools?',
      );
    }

    const { tools } = configSearch.config;

    for (const toolName of tools) {
      const configurations = require(path.join(__dirname, '../tools', toolName, 'configurations'));

      for (const configuration of configurations) {
        const configFilePath = path.join(process.cwd(), configuration.filename);
        const configContent = configuration.format(configuration.get(tools));

        writeFile(configFilePath, configContent);
      }
    }

    process.exit(0);
  });

program
  .command('version [toolname]')
  .description('Output the tool version')
  .action(toolName => {
    if (!toolName) {
      printMessageAndExit(knuckleVersion);
    }

    const cleanedName = path.basename(toolName);

    try {
      validateModuleList([toolName]);
    } catch (e) {
      printErrorAndExit(`${e.message} You can't ask for its version.`);
    }

    const { version } = getModuleInfo(cleanedName);
    printMessageAndExit(version);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
