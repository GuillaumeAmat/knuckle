const { hasDependency } = require('./hasDependency');

const hasJest = configuredTools => hasDependency('jest') || configuredTools.includes('jest');

module.exports = { hasJest };
