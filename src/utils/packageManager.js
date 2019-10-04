const fs = require('fs');
const spawn = require('cross-spawn');

const { printMessage } = require('../utils/output');

const cwdFiles = fs.readdirSync(process.cwd());

function isPnpmHandledProject() {
  return cwdFiles.includes('shrinkwrap.yaml');
}

function isYarnHandledProject() {
  return cwdFiles.includes('yarn.lock');
}

function install(dependencies) {
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

module.exports = {
  install,
  isYarnHandledProject,
};
