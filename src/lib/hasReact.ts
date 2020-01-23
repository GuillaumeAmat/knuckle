import { hasDependency } from './hasDependency';

export function hasReact() {
  return hasDependency('react') || hasDependency('react-scripts');
}
