const { hasDependency } = require('./hasDependency');

const hasPrettier = configuredTools =>
  hasDependency('prettier') || configuredTools.includes('prettier');

module.exports = { hasPrettier };
