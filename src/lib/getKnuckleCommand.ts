import { isKnuckleInKnuckle } from './isKnuckleInKnuckle';

/**
 * Returns the right command command to call Knuckle,
 * depending if the current process is in a Knuckle repository clone
 * or in another project.
 */
export function getKnuckleCommand() {
  return isKnuckleInKnuckle() ? 'yarn knuckle' : 'npx knuckle';
}
