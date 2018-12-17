const { hasJest, hasPrettier, hasReact } = require('../../utils/hasDependency');

function getDependencies(configuredTools) {
  const dependencies = ['babel-eslint@10.0', 'eslint@5.10'];

  if (hasPrettier(configuredTools)) {
    dependencies.push('eslint-config-prettier@3.3', 'eslint-plugin-prettier@3.0');
  }

  if (hasReact(configuredTools)) {
    dependencies.push('eslint-plugin-react@7.11');
  }

  if (hasJest(configuredTools)) {
    dependencies.push('eslint-plugin-jest@21.22');
  }

  return dependencies;
}

module.exports = {
  getDependencies,
};
