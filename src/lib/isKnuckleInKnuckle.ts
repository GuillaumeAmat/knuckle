import readPkgUp from 'read-pkg-up';

/**
 * Tells if the current process is running inside a Knuckle repository clone
 * or as a dependency in another project.
 */
export function isKnuckleInKnuckle() {
  return readPkgUp.sync()?.packageJson?.name === 'knuckle';
}
