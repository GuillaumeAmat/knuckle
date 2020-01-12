const path = require('path');

/**
 * Given a module name, that function returns its binary path
 * Eg:
 * - getPathToBin('prettier')
 * - getPathToBin('@commitlint/cli', 'commitlint')
 *
 * @param {string} moduleName
 * @param {string} commandName
 */
function getPathToBin(moduleName, commandName) {
  const modPkgPath = require.resolve(`${moduleName}/package.json`);
  const modPkgDir = path.dirname(modPkgPath);
  const { bin } = require(modPkgPath);
  const binPath = typeof bin === 'string' ? bin : bin[commandName || moduleName];

  return path.join(modPkgDir, binPath);
}

module.exports = { getPathToBin };
