const fs = require('fs');
const { EOL } = require('os');

const EOF = EOL + EOL;

function formatJson(object) {
  return JSON.stringify(object, null, '  ');
}

function writeFile(path, content) {
  return fs.writeFileSync(path, `${content}${EOF}`);
}

function writeJson(path, object) {
  return writeFile(path, formatJson(object));
}

module.exports = {
  formatJson,
  writeFile,
  writeJson,
};
