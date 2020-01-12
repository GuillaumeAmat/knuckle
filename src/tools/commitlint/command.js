const program = require('commander');
const spawn = require('cross-spawn');

const { getPathToBin } = require('../../lib/getPathToBin');

program
  .command('commitlint [path...]')
  .description('Lint your conventional commits')
  .option(
    '-e, --edit [path]',
    'Read last commit message from the specified file or fallbacks to ./.git/COMMIT_EDITMSG',
  )
  .option(
    '-E, --env [variable]',
    'Check message in the file at path given by environment variable value',
  )
  .action((targetPath = [], command = undefined) => {
    const args = [...targetPath];

    if (command.edit) {
      args.push('--edit', command.edit);
    }

    if (command.env) {
      args.push('--env', command.env);
    }

    const bin = getPathToBin('@commitlint/cli', 'commitlint');
    const result = spawn.sync(bin, [...args], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    process.exit(result.status);
  });
