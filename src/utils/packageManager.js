const fs = require('fs');
const spawn = require('cross-spawn');

const cwdFiles = fs.readdirSync(process.cwd());

function isNpmHandledProject() {
  return cwdFiles.includes('package-lock.json');
}

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

  return spawn.sync(bin, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
}

module.exports = {
  install,
  isNpmHandledProject,
  isYarnHandledProject,
};
