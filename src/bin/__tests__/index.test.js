const { EOL } = require('os');

const packageJson = require('../../../package.json');
const binScriptPath = require('../../helpers/tests/binScriptPath');
const cmd = require('../../helpers/tests/cmd');

describe('Version', () => {
  it("Should print Knuckle's version", async () => {
    const command = cmd.create('node');

    let response = await command.execute([binScriptPath, '-v']);
    expect(response.trim()).toBe(packageJson.version);

    response = await command.execute([binScriptPath, '--version']);
    expect(response.trim()).toBe(packageJson.version);
  });
});

describe('Usage', () => {
  it('Should print the usage', async () => {
    const command = cmd.create('node');

    const response = await command.execute([binScriptPath]);
    const splittedResponse = response.trim().split(EOL + EOL);

    expect(splittedResponse[0]).toMatch(/^Usage:/);
    expect(splittedResponse[1]).toMatch(/^Options:/);
    expect(splittedResponse[2]).toMatch(/^Commands:/);
  });
});

describe('Error', () => {
  it('Should print an `unknown option` error', async () => {
    const command = cmd.create('node');

    try {
      await command.execute([binScriptPath, '--bad-option']);
    } catch (err) {
      expect(err.trim()).toMatch(/^error: unknown option/);
    }
  });
});
