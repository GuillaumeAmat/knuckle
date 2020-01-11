const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');

const { packageJson } = readPkgUp.sync();
const isKnuckleInKnuckle = packageJson.name === 'knuckle';
const knuckleCommand = isKnuckleInKnuckle ? 'npm run knuckle --' : 'npx knuckle';

function getPathToBin(moduleName, commandName) {
  const modPkgPath = require.resolve(`${moduleName}/package.json`);
  const modPkgDir = path.dirname(modPkgPath);
  const { bin } = require(modPkgPath);
  const binPath = typeof bin === 'string' ? bin : bin[commandName || moduleName];

  return path.join(modPkgDir, binPath);
}

function getToolList() {
  return fs.readdirSync(path.join(__dirname, '../tools'));
}

function validateToolList(tools) {
  const toolsFolders = getToolList();

  for (const toolName of tools) {
    if (!toolsFolders.includes(toolName)) {
      throw new Error(`\`${toolName}\` is not a supported tool.`);
    }
  }
}

module.exports = {
  getPathToBin,
  getToolList,
  isKnuckleInKnuckle,
  knuckleCommand,
  validateToolList,
};
