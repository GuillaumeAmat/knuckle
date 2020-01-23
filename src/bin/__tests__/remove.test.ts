import { binScriptPath } from '../../helpers/tests/binScriptPath';
import * as cmd from '../../helpers/tests/cmd';
import { getKnuckleConfig } from '../../helpers/tests/getKnuckleConfig';
import { setupPristineTestFolder } from '../../helpers/tests/setupPristineTestFolder';

describe('REMOVE', () => {
  setupPristineTestFolder();

  it('should fail if there are no tools in the input', async done => {
    try {
      await cmd.run('node', [binScriptPath, 'remove']);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }

    expect.hasAssertions();

    done();
  });

  it('should not fail if no tools are configured', async done => {
    let hasThrown = false;

    try {
      await cmd.run('node', [binScriptPath, 'remove', 'eslint']);
    } catch (err) {
      hasThrown = true;
    }

    expect(hasThrown).toBe(false);

    done();
  });

  it('should remove tools', async done => {
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);
    let config = getKnuckleConfig()?.config;
    expect(config.tools.length).toBe(4);

    await cmd.run('node', [binScriptPath, 'remove', 'eslint']);
    config = getKnuckleConfig()?.config;
    expect(config.tools.length).toBe(3);

    done();
  });
});
