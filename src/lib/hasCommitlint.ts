import { hasDependency } from './hasDependency';

export function hasCommitlint(configuredTools: string[]) {
  return hasDependency('@commitlint/cli') || configuredTools.includes('commitlint');
}
