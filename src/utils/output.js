const { EOL } = require('os');

function printError(message) {
  process.stderr.write(`${message}${EOL}`);
}

function printMessage(message) {
  process.stdout.write(`${message}${EOL}`);
}

function printErrorAndExit(message) {
  printError(message);
  process.exit(1);
}

function printMessageAndExit(message) {
  printMessage(message);
  process.exit(0);
}

module.exports = {
  printError,
  printErrorAndExit,
  printMessage,
  printMessageAndExit,
};
