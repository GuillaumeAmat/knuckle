const program = require('commander');
const spawn = require('cross-spawn');

const { getPathToBin } = require('../../lib/getPathToBin');

program
  .command('eslint [path...]')
  .description('An AST-based pattern checker for JavaScript')
  .option('--fix', 'Automatically fix problems')
  .option(
    '--fix-dry-run',
    'Automatically fix problems without saving the changes to the file system',
  )
  .action((targetPath = [], command = undefined) => {
    const args = [...targetPath];

    if (command.fix) {
      args.push('--fix');
    }

    if (command.fixDryRun) {
      args.push('--fix-dry-run');
    }

    const bin = getPathToBin('eslint');

    const result = spawn.sync(bin, [...args], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    process.exit(result.status);
  });
