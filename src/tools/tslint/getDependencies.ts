import { DependenciesGetter } from '../../lib/constants';
import { hasPrettier } from '../../lib/hasPrettier';
import { hasReact } from '../../lib/hasReact';

export const getDependencies: DependenciesGetter = configuredTools => {
  const dependencies = ['tslint@5.20'];

  if (hasPrettier(configuredTools)) {
    dependencies.push('tslint-config-prettier@1.18');
  }

  if (hasReact()) {
    dependencies.push('tslint-react@4.1');
  }

  return dependencies;
};
