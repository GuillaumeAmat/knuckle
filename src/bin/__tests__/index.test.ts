import packageJson from '../../../package.json';
import { binScriptPath } from '../../helpers/tests/binScriptPath';
import * as cmd from '../../helpers/tests/cmd';
import { setupPristineTestFolder } from '../../helpers/tests/setupPristineTestFolder';

describe('Knuckle', () => {
  setupPristineTestFolder();

  it("should print Knuckle's version", async done => {
    let response = await cmd.run('node', [binScriptPath, '-v']) || undefined;
    expect(response?.trim()).toBe(packageJson.version);

    response = await cmd.run('node', [binScriptPath, '--version']) || undefined;
    expect(response?.trim()).toBe(packageJson.version);

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
