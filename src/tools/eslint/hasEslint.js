const { hasDependency } = require('../../lib/hasDependency');

const hasEslint = configuredTools => hasDependency('eslint') || configuredTools.includes('eslint');

module.exports = { hasEslint };
