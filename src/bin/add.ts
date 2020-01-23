import program from 'commander';
import { cosmiconfigSync } from 'cosmiconfig';
import inquirer from 'inquirer';
import sortedUniq from 'lodash.sorteduniq';
import path from 'path';

import { getToolList } from '../lib/getToolList';
import { validateToolList } from '../lib/validateToolList';
import { printErrorAndExit } from '../utils/printErrorAndExit';
import { printMessageAndExit } from '../utils/printMessageAndExit';
import { writeJson } from '../utils/writeJson';

program
  .command('add [toolname...]')
  .description('Ask Knuckle to handle new tools')
  .action(async (toolNames = []) => {
    const configExplorer = cosmiconfigSync('knuckle');
    const configSearch = configExplorer.search();
    const configFilePath = configSearch?.filepath || path.join(process.cwd(), '.knucklerc');
    const currentConfig = configSearch?.config || {};
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
