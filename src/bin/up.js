const program = require('commander');
const cosmiconfig = require('cosmiconfig');
const path = require('path');
const spawn = require('cross-spawn');

const { writeFile } = require('../utils/file');
const { printErrorAndExit } = require('../utils/output');

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
    const dependencies = [];

    for (const toolName of tools) {
      const configurations = require(path.join(__dirname, '../tools', toolName, 'configurations'));

      for (const configuration of configurations) {
        const configFilePath = path.join(process.cwd(), configuration.filename);
        const configContent = configuration.format(configuration.get(tools));

        writeFile(configFilePath, configContent);
      }

      const toolDependencies = require(path.join(__dirname, '../tools', toolName, 'dependencies'));
      dependencies.push(...toolDependencies.getDependencies(tools));
    }

    const result = spawn.sync('npm', ['install', '-D', ...dependencies], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    process.exit(result.status);
  });
