const { hasJest } = require('../../lib/hasJest');
const { hasPrettier } = require('../../lib/hasPrettier');
const { hasReact } = require('../../lib/hasReact');

function getDependencies(configuredTools) {
  const dependencies = ['babel-eslint@10.0', 'eslint@6.8'];

  if (hasPrettier(configuredTools)) {
    dependencies.push('eslint-config-prettier@6.9', 'eslint-plugin-prettier@3.1');
  }

  if (hasReact(configuredTools)) {
    dependencies.push('eslint-plugin-react@7.17');
  }

  if (hasJest(configuredTools)) {
    dependencies.push('eslint-plugin-jest@23.6');
  }

  return dependencies;
}

module.exports = { getDependencies };
