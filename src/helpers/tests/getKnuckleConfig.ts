import { cosmiconfigSync } from 'cosmiconfig';

/**
 * Find the Knuckle configuration file and return its parsed content.
 */
export function getKnuckleConfig() {
  const configExplorer = cosmiconfigSync('knuckle');
  return configExplorer.search();
}
