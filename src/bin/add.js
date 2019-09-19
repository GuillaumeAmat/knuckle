const program = require('commander');
const cosmiconfig = require('cosmiconfig');
const inquirer = require('inquirer');
const sortedUniq = require('lodash/sortedUniq');
const path = require('path');

const { writeJson } = require('../utils/file');
const { getToolList, validateToolList } = require('../utils/tool');
const { printErrorAndExit, printMessageAndExit } = require('../utils/output');

program
  .command('add [toolname...]')
  .description('Ask Knuckle to handle new tools')
  .action(async (toolNames = []) => {
    const configExplorer = cosmiconfig('knuckle');
    const configSearch = configExplorer.searchSync() || {};
    const configFilePath = configSearch.filepath || path.join(process.cwd(), '.knucklerc');
    const currentConfig = configSearch.config || {};
    const currentTools = currentConfig.tools || [];
    const toolList = getToolList();
    let newTools = toolNames;

    if (currentTools.length === toolList.length) {
      printMessageAndExit('All the Knuckle tools are already handled');
    }

    if (newTools.length === 0) {
      const choices = toolList
        .filter(toolName => !currentTools.includes(toolName))
        .map(toolName => ({ name: toolName }));

      const { toolNames } = await inquirer.prompt([
        {
          type: 'checkbox',
          message: 'Select the tools that Knuckle must handle',
          name: 'toolNames',
          choices,
          validate: answer => {
            if (answer.length < 1) {
              return 'You must choose at least one tool.';
            }
            return true;
          },
        },
      ]);

      newTools = toolNames;
    }

    const newConfig = {
      ...currentConfig,
      tools: sortedUniq([...(currentTools || []), ...newTools].sort()),
    };

    try {
      validateToolList(newTools);
    } catch (e) {
      printErrorAndExit(`${e.message} You can't add it.`);
    }

    writeJson(configFilePath, newConfig);

    process.exit(0);
  });
