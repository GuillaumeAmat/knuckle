const { EOL } = require('os');

const cosmiconfigListLoader = (filename, content) => content.split(EOL);

module.exports = { cosmiconfigListLoader };
