const fs = require('fs');
const { EOL } = require('os');

const EOF = EOL + EOL;

function formatJson(object) {
  JSON.stringify(object, null, '  ');
}

function writeFile(path, content) {
  fs.writeFileSync(path, `${content}${EOF}`);
}

function writeJson(path, object) {
  writeFile(path, formatJson(object));
}

module.exports = {
  formatJson,
  writeFile,
  writeJson,
};
