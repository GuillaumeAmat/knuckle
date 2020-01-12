const fs = require('fs');
const { EOL } = require('os');

const EOF = EOL;

function writeFile(path, content) {
  return fs.writeFileSync(path, `${content.trim()}${EOF}`);
}

module.exports = { writeFile };
