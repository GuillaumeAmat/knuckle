import { hasDependency }from './hasDependency';

export function hasJest(configuredTools: string[]) {
  return hasDependency('jest') || configuredTools.includes('jest');
}
