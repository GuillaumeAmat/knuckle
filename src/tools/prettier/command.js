const program = require('commander');
const spawn = require('cross-spawn');

const { getPathToBin } = require('../../lib/getPathToBin');

module.exports = program
  .command('prettier [path...]')
  .description('Prettier is an opinionated code formatter')
  .option(
    '-l, --list-different',
    "Print the names of files that are different from Prettier's formatting",
  )
  .option('-w, --write', 'Edit files in-place. (Beware!)')
  .action((targetPath = [], command = undefined) => {
    const args = [...targetPath];

    if (command.listDifferent) {
      args.push('--list-different');
    }

    if (command.write) {
      args.push('--write');
    }

    const bin = getPathToBin('prettier');

    const result = spawn.sync(bin, [...args], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    process.exit(result.status);
  });
