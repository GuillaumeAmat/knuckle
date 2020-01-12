const { printMessage } = require('./printMessage');

function printMessageAndExit(message) {
  printMessage(message);
  process.exit(0);
}

module.exports = { printMessageAndExit };
