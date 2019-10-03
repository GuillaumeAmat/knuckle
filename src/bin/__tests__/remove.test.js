const binScriptPath = require('../../helpers/tests/binScriptPath');
const cmd = require('../../helpers/tests/cmd');
const getKnuckleConfig = require('../../helpers/tests/getKnuckleConfig');
const setupPristineTestFolder = require('../../helpers/tests/setupPristineTestFolder');

setupPristineTestFolder();

describe('REMOVE', () => {
  it('should fail if there are no tools in the input', async () => {
    try {
      await cmd.run('node', [binScriptPath, 'remove']);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }

    expect.hasAssertions();
  });

  it('should not fail if no tools are configured', async () => {
    let hasThrown = false;

    try {
      await cmd.run('node', [binScriptPath, 'remove', 'eslint']);
    } catch (err) {
      hasThrown = true;
    }

    expect(hasThrown).toBe(false);
  });

  it('should remove tools', async () => {
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);
    let config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(4);

    await cmd.run('node', [binScriptPath, 'remove', 'eslint']);
    config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(3);
  });
});
