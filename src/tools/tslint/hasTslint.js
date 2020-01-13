const { hasDependency } = require('../../lib/hasDependency');

const hasTslint = configuredTools => hasDependency('tslint') || configuredTools.includes('tslint');

module.exports = { hasTslint };
