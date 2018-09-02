import program from 'commander';
import spawn from 'cross-spawn';

import cosmiconfigListLoader from '../../utils/cosmiconfigListLoader';
import createTmpFile from '../../utils/createTmpFile';
import { getPathToBin } from '../../utils/module';
import loadAndMergeConfig from '../../utils/loadAndMergeConfig';

export default program
  .command('prettier [path...]')
  .description('Prettier is an opinionated code formatter')
  .option(
    '-l, --list-different',
    "Print the names of files that are different from Prettier's formatting",
  )
  .option('-w, --write', 'Edit files in-place. (Beware!)')
  .action((targetPath = [], command) => {
    const mainConfig = loadAndMergeConfig('prettier');
    const tmpMainConfigFilePath = createTmpFile('prettier', JSON.stringify(mainConfig));

    const ignoreConfig = loadAndMergeConfig('prettier', [], {
      searchPlaces: ['.prettierignore'],
      loaders: { noExt: cosmiconfigListLoader },
    });

    const tmpIgnoreConfigFilePath = createTmpFile('prettier', ignoreConfig.join('\n'));

    const prettierArgs = [
      '--config',
      tmpMainConfigFilePath,
      '--ignore-path',
      tmpIgnoreConfigFilePath,
      ...targetPath,
    ];

    if (command.listDifferent) {
      prettierArgs.push('--list-different');
    }

    if (command.write) {
      prettierArgs.push('--write');
    }

    const prettier = getPathToBin('prettier');

    const result = spawn.sync(prettier, [...prettierArgs], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    process.exit(result.status);
  });
