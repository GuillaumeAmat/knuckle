const program = require('commander');
const spawn = require('cross-spawn');

const { getPathToBin } = require('../../utils/module');

module.exports = program
  .command('lint-staged [path...]')
  .description('Lint files staged by git')
  .option('-d, --debug', 'Enable debug mode')
  .action((targetPath = [], command = undefined) => {
    const args = [...targetPath];

    if (command.debug) {
      args.push('--debug');
    }

    const bin = getPathToBin('lint-staged');

    const result = spawn.sync(bin, [...args], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    process.exit(result.status);
  });
