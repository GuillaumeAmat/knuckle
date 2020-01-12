const fs = require('fs');
const path = require('path');

/**
 * Returns the complete list of Knuckle supported tools
 */
function getToolList() {
  return fs.readdirSync(path.join(__dirname, '../tools'));
}

module.exports = { getToolList };
