const fs = require('fs');
const path = require('path');

function getModuleInfo(name) {
  const modPkgPath = require.resolve(`${name}/package.json`);
  return require(modPkgPath);
}

function getPathToBin(name) {
  const modPkgPath = require.resolve(`${name}/package.json`);
  const modPkgDir = path.dirname(modPkgPath);
  const { bin } = require(modPkgPath);
  const binPath = typeof bin === 'string' ? bin : bin[name];
  return path.join(modPkgDir, binPath);
}

function validateModuleList(tools) {
  const toolsFolders = fs.readdirSync(path.join(__dirname, '../tools'));

  for (const toolName of tools) {
    if (!toolsFolders.includes(toolName)) {
      throw new Error(`\`${toolName}\` is not a supported tool.`);
    }
  }
}

module.exports = {
  getModuleInfo,
  getPathToBin,
  validateModuleList,
};
