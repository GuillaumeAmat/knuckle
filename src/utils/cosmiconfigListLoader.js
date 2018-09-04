const { EOL } = require('os');

module.exports = (filename, content) => content.split(EOL);
