const { hasDependency } = require('./hasDependency');

const hasTslint = configuredTools => hasDependency('tslint') || configuredTools.includes('tslint');

module.exports = { hasTslint };
