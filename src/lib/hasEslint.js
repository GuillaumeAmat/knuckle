const { hasDependency } = require('./hasDependency');

const hasEslint = configuredTools => hasDependency('eslint') || configuredTools.includes('eslint');

module.exports = { hasEslint };
