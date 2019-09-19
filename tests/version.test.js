const path = require('path');

const packageJson = require('../package.json');
const cmd = require('../helpers/cmd');

const binFile = path.join(__dirname, '../src/bin/index.js');

describe('Version', () => {
  it("Should print Knuckle's version", async () => {
    const command = cmd.create(process.env.npm_node_execpath);

    let response = await command.execute([binFile, '-v']);
    expect(response.trim()).toBe(packageJson.version);

    response = await command.execute([binFile, '--version']);
    expect(response.trim()).toBe(packageJson.version);
  });
});
