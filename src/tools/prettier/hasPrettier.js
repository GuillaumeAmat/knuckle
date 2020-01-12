const { hasDependency } = require('../../lib/hasDependency');

const hasPrettier = configuredTools =>
  hasDependency('prettier') || configuredTools.includes('prettier');

module.exports = { hasPrettier };
