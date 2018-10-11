#!/usr/bin/env node

const program = require('commander');

require('./add');
require('./remove');
require('./up');
require('./version');

require('../tools/eslint/command');
require('../tools/lint-staged/command');
require('../tools/prettier/command');
require('../tools/tslint/command');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
