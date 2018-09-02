#!/usr/bin/env node

import path from 'path';
import program from 'commander';

import { version as knuckleVersion } from '../../package.json';
import { getModuleInfo } from '../utils/module';
import '../tools/eslint/command';
import '../tools/lint-staged/command';
import '../tools/prettier/command';

program.version(knuckleVersion, '-v, --version').usage('<command> [options]');

program
  .command('version [toolname]')
  .usage('version [toolname]')
  .description('Output the tool version')
  .action(toolName => {
    if (!toolName) {
      process.stdout.write(`${knuckleVersion}\n`);
      process.exit(0);
    }

    const cleanedName = path.basename(toolName);
    const { version } = getModuleInfo(cleanedName);
    process.stdout.write(`${version}\n`);
    process.exit(0);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
