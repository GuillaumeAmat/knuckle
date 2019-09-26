const { EOL } = require('os');

const packageJson = require('../../../package.json');
const binScriptPath = require('../../helpers/tests/binScriptPath');
const cmd = require('../../helpers/tests/cmd');

function expectUsage(response) {
  const splittedResponse = response.trim().split(EOL + EOL);

  expect(splittedResponse[0]).toMatch(/^Usage:/);
  expect(splittedResponse[1]).toMatch(/^Options:/);
  expect(splittedResponse[2]).toMatch(/^Commands:/);
}

describe('Version', () => {
  it("Should print Knuckle's version", async () => {
    let response = await cmd.run('node', [binScriptPath, '-v']);
    expect(response.trim()).toBe(packageJson.version);

    response = await cmd.run('node', [binScriptPath, '--version']);
    expect(response.trim()).toBe(packageJson.version);
  });
});

describe('Usage', () => {
  it('Should print the usage', async () => {
    let response = await cmd.run('node', [binScriptPath]);
    expectUsage(response);

    response = await cmd.run('node', [binScriptPath, '-h']);
    expectUsage(response);

    response = await cmd.run('node', [binScriptPath, '--help']);
    expectUsage(response);
  });
});

describe('Error', () => {
  it('Should print an `unknown option` error', async () => {
    try {
      await cmd.run('node', [binScriptPath, '--bad-option']);
    } catch (err) {
      expect(err.trim()).toMatch(/^error: unknown option/);
    }
  });
});
