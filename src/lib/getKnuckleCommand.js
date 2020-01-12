const { isKnuckleInKnuckle } = require('./isKnuckleInKnuckle');

/**
 * Returns the right command command to call Knuckle,
 * depending if the current process is in a Knuckle repository clone
 * or in another project.
 */
function getKnuckleCommand() {
  return isKnuckleInKnuckle() ? 'yarn knuckle' : 'npx knuckle';
}

module.exports = { getKnuckleCommand };
