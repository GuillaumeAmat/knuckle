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

module.exports = { hasDependency };
