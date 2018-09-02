import program from 'commander';
import spawn from 'cross-spawn';

import createTmpFile from '../../utils/createTmpFile';
import { getPathToBin } from '../../utils/module';
import loadAndMergeConfig from '../../utils/loadAndMergeConfig';

export default program
  .command('lint-staged [path...]')
  .description('Lint files staged by git')
  .option('-d, --debug', 'Enable debug mode')
  .action((targetPath = [], command) => {
    const mainConfig = loadAndMergeConfig(
      'lint-staged',
      {},
      {
        searchPlaces: [
          'package.json',
          '.lintstagedrc',
          '.lintstagedrc.json',
          '.lintstagedrc.yaml',
          '.lintstagedrc.yml',
          '.lintstagedrc.js',
          'lint-staged.config.js',
        ],
      },
    );
    const tmpMainConfigFilePath = createTmpFile('lint-staged', JSON.stringify(mainConfig));

    const lintStagedArgs = ['--config', tmpMainConfigFilePath, ...targetPath];

    if (command.debug) {
      lintStagedArgs.push('--debug');
    }

    const lintStaged = getPathToBin('lint-staged');

    const result = spawn.sync(lintStaged, [...lintStagedArgs], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    process.exit(result.status);
  });
