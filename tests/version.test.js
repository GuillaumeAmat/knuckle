const path = require('path');

const packageJson = require('../package.json');
const cmd = require('../helpers/tests/cmd');

const binScriptPath = path.join(__dirname, '../src/bin/index.js');

describe('Version', () => {
  it("Should print Knuckle's version", async () => {
    const command = cmd.create('node');

    let response = await command.execute([binScriptPath, '-v']);
    expect(response.trim()).toBe(packageJson.version);

    response = await command.execute([binScriptPath, '--version']);
    expect(response.trim()).toBe(packageJson.version);
  });
});
