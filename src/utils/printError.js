const { EOL } = require('os');

function printError(message) {
  process.stderr.write(`${message}${EOL}`);
}

module.exports = { printError };
