const { hasPrettier, hasReact } = require('../../utils/hasDependency');

function getDependencies(configuredTools) {
  const dependencies = ['tslint@5.11'];

  if (hasPrettier(configuredTools)) {
    dependencies.push('tslint-config-prettier@1.15');
  }

  if (hasReact(configuredTools)) {
    dependencies.push('tslint-react@3.6');
  }

  return dependencies;
}

module.exports = {
  getDependencies,
};
