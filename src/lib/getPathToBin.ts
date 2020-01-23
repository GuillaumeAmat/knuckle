import path from 'path';

/**
 * Given a module name, that function returns its binary path
 * Eg:
 * - getPathToBin('prettier')
 * - getPathToBin('@commitlint/cli', 'commitlint')
 */
export function getPathToBin(moduleName: string, commandName?: string) {
  const modPkgPath = require.resolve(`${moduleName}/package.json`);
  const modPkgDir = path.dirname(modPkgPath);
  const { bin } = require(modPkgPath);
  const binPath = typeof bin === 'string' ? bin : bin[commandName || moduleName];

  return path.join(modPkgDir, binPath);
}
