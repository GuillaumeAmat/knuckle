const { formatJson } = require('./formatJson');
const { writeFile } = require('./writeFile');

function writeJson(path, object) {
  return writeFile(path, formatJson(object));
}

module.exports = { writeJson };
