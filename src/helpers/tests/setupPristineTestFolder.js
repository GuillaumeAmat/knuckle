const fs = require('fs');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

const cmd = require('./cmd');

const repoFolder = process.cwd();
let testFolder;

/**
 * Knuckle's integration tests needs pristine folders to create fake projects and run its commands.
 * That helper set to callbacks:
 * - Before each test: it creates a temporary folder, places the current process in it and creates a `package.json` file.
 * - After each test: it goes back to the Knuckle clone folder and remove the temporary folder and its content.
 */
function setupPristineTestFolder() {
  beforeEach(async () => {
    testFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'knuckle-'));
    process.chdir(testFolder);
    await cmd.runWithoutNyc('npm', ['init', '-y']);
  });

  afterEach(() => {
    process.chdir(repoFolder);
    rimraf.sync(testFolder);
  });
}

module.exports = { setupPristineTestFolder };
