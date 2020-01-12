const fs = require('fs');
const { EOL } = require('os');

const EOF = EOL;

function formatJson(object) {
  return JSON.stringify(object, null, 2);
}

function writeFile(path, content) {
  return fs.writeFileSync(path, `${content.trim()}${EOF}`);
}

function writeJson(path, object) {
  return writeFile(path, formatJson(object));
}

module.exports = {
  formatJson,
  writeFile,
  writeJson,
};
