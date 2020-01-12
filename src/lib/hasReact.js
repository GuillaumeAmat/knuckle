const { hasDependency } = require('./hasDependency');

const hasReact = () => hasDependency('react') || hasDependency('react-scripts');

module.exports = { hasReact };
