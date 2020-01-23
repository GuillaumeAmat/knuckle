import { hasDependency } from './hasDependency';

export function hasLintStaged(configuredTools: string[]) {
  return hasDependency('lint-staged') || configuredTools.includes('lint-staged');
}
