const program = require('commander');
const path = require('path');

const { version: knuckleVersion } = require('../../package.json');
const { getModuleInfo, validateModuleList } = require('../utils/module');
const { printErrorAndExit, printMessageAndExit } = require('../utils/output');

program.version(knuckleVersion, '-v, --version').usage('<command> [options]');

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
