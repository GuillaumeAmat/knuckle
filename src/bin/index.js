#!/usr/bin/env node

// https://github.com/tj/commander.js
import program from "commander";

program
  .command("eslint [path]", "run eslint", { noHelp: true })
  .command("prettier [filename]", "run prettier", { noHelp: true })
  .parse(process.argv);
