const { hasDependency } = require('../../lib/hasDependency');

const hasLintStaged = configuredTools =>
  hasDependency('lint-staged') || configuredTools.includes('lint-staged');

module.exports = { hasLintStaged };
