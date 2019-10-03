const packageJson = require('../../../package.json');
const binScriptPath = require('../../helpers/tests/binScriptPath');
const cmd = require('../../helpers/tests/cmd');

describe('Knuckle', () => {
  it("should print Knuckle's version", async () => {
    let response = await cmd.run('node', [binScriptPath, '-v']);
    expect(response.trim()).toBe(packageJson.version);

    response = await cmd.run('node', [binScriptPath, '--version']);
    expect(response.trim()).toBe(packageJson.version);
  });
});

describe('Usage', () => {
  it('should print the usage', async () => {
    let response = await cmd.run('node', [binScriptPath]);
    expect(response).toMatchSnapshot();

    response = await cmd.run('node', [binScriptPath, '-h']);
    expect(response).toMatchSnapshot();

    response = await cmd.run('node', [binScriptPath, '--help']);
    expect(response).toMatchSnapshot();
  });
});

describe('Error', () => {
  it('should print an `unknown option` error', async () => {
    try {
      await cmd.run('node', [binScriptPath, '--bad-option']);
    } catch (err) {
      expect(err.trim()).toMatchSnapshot();
    }
  });
});
