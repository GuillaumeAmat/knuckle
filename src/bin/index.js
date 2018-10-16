#!/usr/bin/env node

const program = require('commander');

const { version: knuckleVersion } = require('../../package.json');

require('./add');
require('./remove');
require('./up');

require('../tools/commitlint/command');
require('../tools/eslint/command');
require('../tools/lint-staged/command');
require('../tools/prettier/command');
require('../tools/tslint/command');

program.version(knuckleVersion, '-v, --version').usage('<command> [options]');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
