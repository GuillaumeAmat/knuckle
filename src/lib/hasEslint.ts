import { hasDependency } from './hasDependency';

export function hasEslint(configuredTools: string[]) {
  return hasDependency('eslint') || configuredTools.includes('eslint');
}
