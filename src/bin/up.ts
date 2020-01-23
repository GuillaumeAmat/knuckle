import program from 'commander';
import { cosmiconfigSync } from 'cosmiconfig';
import path from 'path';

import { DEFAULT_MERGE_STRATEGY } from '../lib/constants';
import { installDependencies } from '../lib/installDependencies';
import { isValidMergeStrategy } from '../lib/isValidMergeStrategy';
import { printErrorAndExit } from '../utils/printErrorAndExit';
import { writeFile } from '../utils/writeFile';

program
  .command('up')
  .description('Create the configuration files')
  .option('--no-install', 'Do not install the tools dependencies')
  .action(command => {
    const configExplorer = cosmiconfigSync('knuckle');
    const configSearch = configExplorer.search();

    if (!configSearch) {
      return printErrorAndExit(
        'Unable to find the Knuckle configuration. Did you `knuckle add` some tools?',
      );
    }

    if (!configSearch.config.tools) {
      return printErrorAndExit(
        'Unable to find the `tools` section in the Knuckle configuration. Did you `knuckle add` some tools?',
      );
    }

    if (configSearch.config.tools.length === 0) {
      return printErrorAndExit(
        'The tools list is empty in the Knuckle configuration. Please `knuckle add` some tools.',
      );
    }

    const { mergeStrategies, tools } = configSearch.config;
    const dependencies = [];
    const defaultMergeStrategy =
      (mergeStrategies && mergeStrategies.default) || DEFAULT_MERGE_STRATEGY;

    for (const toolName of tools) {
      const { generateConfigurations } = require(path.join(
        __dirname,
        '../tools',
        toolName,
        'generateConfigurations',
      ));

      let mergeStrategy = (mergeStrategies && mergeStrategies[toolName]) || defaultMergeStrategy;

      if (!isValidMergeStrategy(mergeStrategy)) {
        mergeStrategy = defaultMergeStrategy;
      }

      const configurations = generateConfigurations(mergeStrategy);

      for (const configuration of configurations) {
        const configFilePath = path.join(process.cwd(), configuration.filename);
        const configContent = configuration.format(configuration.build(tools));

        writeFile(configFilePath, configContent);
      }

      if (command.install) {
        const { getDependencies } = require(path.join(
          __dirname,
          '../tools',
          toolName,
          'getDependencies',
        ));
        dependencies.push(...getDependencies(tools));
      }
    }

    if (command.install) {
      const output = installDependencies(dependencies);

      /* istanbul ignore else */
      if (process.env.NODE_ENV === 'test') {
        process.exit(0);
      } else {
        process.exit(output?.status === 0 ? 0 : 1);
      }
    } else {
      process.exit(0);
    }
  });
