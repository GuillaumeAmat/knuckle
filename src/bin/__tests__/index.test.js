const packageJson = require('../../../package.json');
const { binScriptPath } = require('../../helpers/tests/binScriptPath');
const cmd = require('../../helpers/tests/cmd');
const { setupPristineTestFolder } = require('../../helpers/tests/setupPristineTestFolder');

describe('Knuckle', () => {
  setupPristineTestFolder();

  it("should print Knuckle's version", async done => {
    let response = await cmd.run('node', [binScriptPath, '-v']);
    expect(response.trim()).toBe(packageJson.version);

    response = await cmd.run('node', [binScriptPath, '--version']);
    expect(response.trim()).toBe(packageJson.version);

    done();
  });
});

describe('Usage', () => {
  setupPristineTestFolder();

  it('should print the usage', async done => {
    let response = await cmd.run('node', [binScriptPath]);
    expect(response).toMatchSnapshot();

    response = await cmd.run('node', [binScriptPath, '-h']);
    expect(response).toMatchSnapshot();

    response = await cmd.run('node', [binScriptPath, '--help']);
    expect(response).toMatchSnapshot();

    done();
  });
});

describe('Error', () => {
  setupPristineTestFolder();

  it('should print an `unknown option` error', async done => {
    try {
      await cmd.run('node', [binScriptPath, '--bad-option']);
    } catch (err) {
      expect(err.trim()).toMatchSnapshot();
    }

    expect.hasAssertions();

    done();
  });
});
