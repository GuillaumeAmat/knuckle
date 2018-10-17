const program = require('commander');
const spawn = require('cross-spawn');

const { getPathToBin } = require('../../utils/tool');

program
  .command('tslint [path...]')
  .description('An extensible linter for the TypeScript language')
  .option('--fix', 'Fixes linting errors for select rules (this may overwrite linted files)')
  .action((targetPath = [], command = undefined) => {
    const args = [...targetPath];

    if (command.fix) {
      args.push('--fix');
    }

    const bin = getPathToBin('tslint');

    const result = spawn.sync(bin, [...args], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    process.exit(result.status);
  });
