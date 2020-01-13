const { hasPrettier } = require('../../lib/hasPrettier');
const { hasReact } = require('../../lib/hasReact');

function getDependencies(configuredTools) {
  const dependencies = ['tslint@5.20'];

  if (hasPrettier(configuredTools)) {
    dependencies.push('tslint-config-prettier@1.18');
  }

  if (hasReact(configuredTools)) {
    dependencies.push('tslint-react@4.1');
  }

  return dependencies;
}

module.exports = { getDependencies };
