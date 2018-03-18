import readPkgUp from "read-pkg-up";
import has from "lodash/has";
import getClientWorkingDir from "./getClientWorkingDir";

// Read this
// https://github.com/sindresorhus/read-pkg-up

// Get client package.json
const { pkg: packageJson } = readPkgUp.sync({
  cwd: getClientWorkingDir(),
});

// Check if exists in package.json
const hasPkgProp = dependency => has(packageJson, dependency);

// Forge path
const hasPeerDep = name => `peerDependencies.${name}`;
const hasDep = name => `dependencies.${name}`;
const hasDevDep = name => `devDependencies.${name}`;

// Apply all checks
const hasAnyDep = name => [hasDep, hasDevDep, hasPeerDep].some(fn => hasPkgProp(fn(name)));

export default name => hasAnyDep(name);
