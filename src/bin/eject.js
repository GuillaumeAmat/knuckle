const program = require('commander');
const rimraf = require('rimraf');
const path = require('path');

const { uninstall } = require('../utils/packageManager');

program
  .command('eject')
  .description(
    'Remove Knuckle from the project (without removing the dev tools and their configurations)',
  )
  .action(() => {
    const knuckleFilesPath = path.join(process.cwd(), '.knuckle*');

    rimraf.sync(knuckleFilesPath);

    const result = uninstall('knuckle');

    process.exit(result.status);
  });
