import spawn from 'cross-spawn';
import fs from 'fs';

import { printMessage } from '../utils/printMessage';

const cwdFiles = fs.readdirSync(process.cwd());

function isPnpmHandledProject() {
  return cwdFiles.includes('shrinkwrap.yaml');
}

function isYarnHandledProject() {
  return cwdFiles.includes('yarn.lock');
}

/**
 * Install the given dependencies by using the project's package manager.
 */
export function installDependencies(dependencies: string[]) {
  let bin = 'npm';
  let args = ['install', '-D', ...dependencies];

  if (isYarnHandledProject()) {
    bin = 'yarn';
    args = ['add', '-D', ...dependencies];
  } else if (isPnpmHandledProject()) {
    bin = 'pnpm';
    args = ['install', '-D', ...dependencies];
  }

  /* istanbul ignore else */
  if (process.env.NODE_ENV === 'test') {
    printMessage('INSTALL COMMAND OUTPUT:');
    printMessage(bin);
    printMessage(JSON.stringify(args, null, 2));
    return;
  } else {
    return spawn.sync(bin, args, {
      cwd: process.cwd(),
      stdio: 'inherit',
    });
  }
}
