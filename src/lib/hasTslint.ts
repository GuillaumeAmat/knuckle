import { hasDependency } from './hasDependency';

export function hasTslint(configuredTools: string[]) {
  return hasDependency('tslint') || configuredTools.includes('tslint');
}
