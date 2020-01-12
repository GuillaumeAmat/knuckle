const { printError } = require('./printError');

function printErrorAndExit(message) {
  printError(message);
  process.exit(1);
}

module.exports = { printErrorAndExit };
