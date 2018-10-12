const program = require('commander');
const cosmiconfig = require('cosmiconfig');
const path = require('path');

const { writeFile } = require('../utils/file');
const { printErrorAndExit } = require('../utils/output');
const { install } = require('../utils/packageManager');

program
  .command('up')
  .description('Create the configuration files')
  .option('--no-install', 'Do not install the tools dependencies')
  .action(command => {
    const configExplorer = cosmiconfig('knuckle');
    const configSearch = configExplorer.searchSync();

    if (!configSearch || !configSearch.config.tools) {
      printErrorAndExit(
        'Unable to find the Knuckle configuration. Did you `knuckle add` some tools?',
      );
    }

    const { tools } = configSearch.config;
    const dependencies = [];

    for (const toolName of tools) {
      const configurations = require(path.join(__dirname, '../tools', toolName, 'configurations'));

      for (const configuration of configurations) {
        const configFilePath = path.join(process.cwd(), configuration.filename);
        const configContent = configuration.format(configuration.get(tools));

        writeFile(configFilePath, configContent);
      }

      if (command.install) {
        const toolDependencies = require(path.join(
          __dirname,
          '../tools',
          toolName,
          'dependencies',
        ));
        dependencies.push(...toolDependencies.getDependencies(tools));
      }
    }

    if (command.install) {
      const result = install(dependencies);

      process.exit(result.status);
    } else {
      process.exit(0);
    }
  });
