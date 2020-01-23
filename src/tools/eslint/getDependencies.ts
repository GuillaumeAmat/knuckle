import { DependenciesGetter } from '../../lib/constants';
import { hasJest } from '../../lib/hasJest';
import { hasPrettier } from '../../lib/hasPrettier';
import { hasReact } from '../../lib/hasReact';

export const getDependencies: DependenciesGetter = configuredTools => {
  const dependencies = ['babel-eslint@10.0', 'eslint@6.8'];

  if (hasPrettier(configuredTools)) {
    dependencies.push('eslint-config-prettier@6.9', 'eslint-plugin-prettier@3.1');
  }

  if (hasReact()) {
    dependencies.push('eslint-plugin-react@7.17');
  }

  if (hasJest(configuredTools)) {
    dependencies.push('eslint-plugin-jest@23.6');
  }

  return dependencies;
}
