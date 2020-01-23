#!/usr/bin/env node

import './add';
import './remove';
import './set-merge-strategy';
import './up';
import '../tools/commitlint/command';
import '../tools/eslint/command';
import '../tools/lint-staged/command';
import '../tools/prettier/command';
import '../tools/tslint/command';

import program from 'commander';

import { version as knuckleVersion } from '../../package.json';

program.version(knuckleVersion, '-v, --version').usage('<command> [options]');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
