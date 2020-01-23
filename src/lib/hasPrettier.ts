import { hasDependency } from './hasDependency';

export function hasPrettier(configuredTools: string[]) {
  return hasDependency('prettier') || configuredTools.includes('prettier');
}
