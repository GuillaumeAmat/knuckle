const readPkgUp = require('read-pkg-up');
const has = require('lodash/has');

// Read this
// https://github.com/sindresorhus/read-pkg-up

// Get client package.json
const { packageJson } = readPkgUp.sync();

// Check if exists in package.json
const hasPkgProp = propName => has(packageJson, propName);

// Forge path
const hasPeerDep = name => `peerDependencies.${name}`;
const hasDep = name => `dependencies.${name}`;
const hasDevDep = name => `devDependencies.${name}`;

// Apply all checks
const hasAnyDep = name => [hasDep, hasDevDep, hasPeerDep].some(fn => hasPkgProp(fn(name)));

const hasDependency = name => hasAnyDep(name);

const hasPrettier = configuredTools =>
  hasDependency('prettier') || configuredTools.includes('prettier');
const hasReact = () => hasDependency('react') || hasDependency('react-scripts');
const hasJest = configuredTools => hasDependency('jest') || configuredTools.includes('jest');
const hasEslint = configuredTools => hasDependency('eslint') || configuredTools.includes('eslint');
const hasTslint = configuredTools => hasDependency('tslint') || configuredTools.includes('tslint');
const hasLintStaged = configuredTools =>
  hasDependency('lint-staged') || configuredTools.includes('lint-staged');
const hasCommitlint = configuredTools =>
  hasDependency('@commitlint/cli') || configuredTools.includes('commitlint');

module.exports = {
  hasCommitlint,
  hasDependency,
  hasEslint,
  hasJest,
  hasLintStaged,
  hasPrettier,
  hasReact,
  hasTslint,
};
