import { MERGE_STRATEGIES } from './constants';

/**
 * Tells if the given merge strategy is supported by Knuckle.
 */
export function isValidMergeStrategy(mergeStrategy: string) {
  return Object.values(MERGE_STRATEGIES).includes(mergeStrategy);
}
