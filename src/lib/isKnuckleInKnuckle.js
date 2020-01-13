const readPkgUp = require('read-pkg-up');

/**
 * Tells if the current process is running inside a Knuckle repository clone
 * or as a dependency in another project.
 */
function isKnuckleInKnuckle() {
  const { packageJson } = readPkgUp.sync();
  return packageJson.name === 'knuckle';
}

module.exports = { isKnuckleInKnuckle };
