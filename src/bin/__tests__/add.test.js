const binScriptPath = require('../../helpers/tests/binScriptPath');
const cmd = require('../../helpers/tests/cmd');
const getKnuckleConfig = require('../../helpers/tests/getKnuckleConfig');
const setupPristineTestFolder = require('../../helpers/tests/setupPristineTestFolder');
const { getToolList } = require('../../utils/tool');

setupPristineTestFolder();

describe('ADD', () => {
  it('should not generate a config file', async () => {
    await cmd.run(
      'node',
      [binScriptPath, 'add'],

      // Validate no previous selection
      [cmd.ENTER],
    );

    const configFile = getKnuckleConfig();

    expect(configFile).toBeNull();
  });

  it('should add tools interactively', async () => {
    await cmd.run(
      'node',
      [binScriptPath, 'add'],

      // Selects the 3 first tools and validate
      [cmd.SPACE, cmd.DOWN, cmd.SPACE, cmd.DOWN, cmd.SPACE, cmd.DOWN, cmd.ENTER],
    );

    const { config } = getKnuckleConfig();

    expect(config.tools.length).toBe(3);
  });

  it('should add tools with one command', async () => {
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);

    const { config } = getKnuckleConfig();

    expect(config.tools.length).toBe(4);
  });

  it('should not duplicate tools', async () => {
    // First call
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);

    // Second consecutive call with the same tools
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);
    const { config } = getKnuckleConfig();
    expect(config.tools.length).toBe(4);

    // Third call with duplicate tools and new ones
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'commitlint']);
    const { config: newConfig } = getKnuckleConfig();
    expect(newConfig.tools.length).toBe(5);
  });

  it('should tell if all the tools are handled', async () => {
    await cmd.run('node', [binScriptPath, 'add', ...getToolList()]);

    // With a specified tool...
    let response = await cmd.run('node', [binScriptPath, 'add', 'prettier']);

    expect(response).toMatchSnapshot();

    // ... And without
    response = await cmd.run('node', [binScriptPath, 'add']);

    expect(response).toMatchSnapshot();
  });

  it('should complain if we ask for non-supported tool', async () => {
    try {
      await cmd.run('node', [binScriptPath, 'add', 'non-supported-tool']);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }

    expect.hasAssertions();
  });
});
