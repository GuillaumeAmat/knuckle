const { hasJest, hasPrettier, hasReact } = require('../../utils/hasDependency');

function getDependencies(configuredTools) {
  const dependencies = ['babel-eslint@9.0', 'eslint@5.6'];

  if (hasPrettier(configuredTools)) {
    dependencies.push('eslint-config-prettier@3.1', 'eslint-plugin-prettier@2.7');
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
