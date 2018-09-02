import program from 'commander';
import spawn from 'cross-spawn';

import cosmiconfigListLoader from '../../utils/cosmiconfigListLoader';
import createTmpFile from '../../utils/createTmpFile';
import { getPathToBin } from '../../utils/module';
import loadAndMergeConfig from '../../utils/loadAndMergeConfig';

program
  .command('eslint [path...]')
  .description('An AST-based pattern checker for JavaScript')
  .option('--fix', 'Automatically fix problems')
  .option(
    '--fix-dry-run',
    'Automatically fix problems without saving the changes to the file system',
  )
  .action((targetPath = [], command) => {
    const mainConfig = loadAndMergeConfig('eslint');
    const tmpMainConfigFilePath = createTmpFile('eslint', JSON.stringify(mainConfig));

    const ignoreConfig = loadAndMergeConfig('eslint', [], {
      searchPlaces: ['.eslintignore'],
      loaders: { noExt: cosmiconfigListLoader },
    });

    const tmpIgnoreConfigFilePath = createTmpFile('eslint', ignoreConfig.join('\n'));

    const eslintArgs = [
      '--config',
      tmpMainConfigFilePath,
      '--ignore-path',
      tmpIgnoreConfigFilePath,
      ...targetPath,
    ];

    if (command.fix) {
      eslintArgs.push('--fix');
    }

    if (command.fixDryRun) {
      eslintArgs.push('--fix-dry-run');
    }

    const eslint = getPathToBin('eslint');

    const result = spawn.sync(eslint, [...eslintArgs], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    process.exit(result.status);
  });
