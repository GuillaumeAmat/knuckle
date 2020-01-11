const program = require('commander');
const { cosmiconfigSync } = require('cosmiconfig');
const path = require('path');

const { writeFile } = require('../utils/file');
const { printErrorAndExit } = require('../utils/output');
const { install } = require('../utils/packageManager');

program
  .command('up')
  .description('Create the configuration files')
  .option('--no-install', 'Do not install the tools dependencies')
  .action(command => {
    const configExplorer = cosmiconfigSync('knuckle');
    const configSearch = configExplorer.search();

    if (!configSearch) {
      printErrorAndExit(
        'Unable to find the Knuckle configuration. Did you `knuckle add` some tools?',
      );
    }

    if (!configSearch.config.tools) {
      printErrorAndExit(
        'Unable to find the `tools` section in the Knuckle configuration. Did you `knuckle add` some tools?',
      );
    }

    if (configSearch.config.tools.length === 0) {
      printErrorAndExit(
        'The tools list is empty in the Knuckle configuration. Please `knuckle add` some tools.',
      );
    }

    const { tools } = configSearch.config;
    const dependencies = [];

    for (const toolName of tools) {
      const configurations = require(path.join(__dirname, '../tools', toolName, 'configurations'));

      for (const configuration of configurations) {
        const configFilePath = path.join(process.cwd(), configuration.filename);
        const configContent = configuration.format(configuration.build(tools));

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
      const output = install(dependencies);

      /* istanbul ignore else */
      if (process.env.NODE_ENV === 'test') {
        process.exit(0);
      } else {
        process.exit(output.status);
      }
    } else {
      process.exit(0);
    }
  });
