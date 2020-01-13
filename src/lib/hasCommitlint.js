const { hasDependency } = require('./hasDependency');

const hasCommitlint = configuredTools =>
  hasDependency('@commitlint/cli') || configuredTools.includes('commitlint');

module.exports = { hasCommitlint };
