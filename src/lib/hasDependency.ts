import has from 'lodash.has';
import readPkgUp from 'read-pkg-up';

const packageJson = readPkgUp.sync()?.packageJson ?? {};

const hasPkgProp = (propName: string) => has(packageJson, propName);

const hasPeerDep = (name: string) => `peerDependencies.${name}`;
const hasDep = (name: string) => `dependencies.${name}`;
const hasDevDep = (name: string) => `devDependencies.${name}`;

const hasAnyDep = (name: string) =>
  [hasDep, hasDevDep, hasPeerDep].some(fn => hasPkgProp(fn(name)));

export const hasDependency = (name: string) => hasAnyDep(name);
