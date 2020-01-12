const { EOL } = require('os');

function printMessage(message) {
  process.stdout.write(`${message}${EOL}`);
}

module.exports = { printMessage };
