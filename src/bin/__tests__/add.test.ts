import { binScriptPath } from '../../helpers/tests/binScriptPath';
import * as cmd from '../../helpers/tests/cmd';
import { getKnuckleConfig } from '../../helpers/tests/getKnuckleConfig';
import { setupPristineTestFolder } from '../../helpers/tests/setupPristineTestFolder';
import { getToolList } from '../../lib/getToolList';

describe('ADD', () => {
  setupPristineTestFolder();

  it('should not generate a config file', async done => {
    await cmd.run(
      'node',
      [binScriptPath, 'add'],

      // Validate no previous selection
      [cmd.ENTER],
    );

    const configFile = getKnuckleConfig();

    expect(configFile).toBeNull();

    done();
  });

  it('should add tools interactively', async done => {
    await cmd.run(
      'node',
      [binScriptPath, 'add'],

      // Selects the 3 first tools and validate
      [cmd.SPACE, cmd.DOWN, cmd.SPACE, cmd.DOWN, cmd.SPACE, cmd.DOWN, cmd.ENTER],
    );

    const config = getKnuckleConfig()?.config;

    expect(config.tools.length).toBe(3);

    done();
  });

  it('should add tools with one command', async done => {
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);

    const config = getKnuckleConfig()?.config;

    expect(config.tools.length).toBe(4);

    done();
  });

  it('should not duplicate tools', async done => {
    // First call
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);

    // Second consecutive call with the same tools
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);
    const config = getKnuckleConfig()?.config;
    expect(config.tools.length).toBe(4);

    // Third call with duplicate tools and new ones
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'commitlint']);
    const newConfig = getKnuckleConfig()?.config;
    expect(newConfig.tools.length).toBe(5);

    done();
  });

  it('should tell if all the tools are handled', async done => {
    await cmd.run('node', [binScriptPath, 'add', ...getToolList()]);

    // With a specified tool...
    let response = await cmd.run('node', [binScriptPath, 'add', 'prettier']);

    expect(response).toMatchSnapshot();

    // ... And without
    response = await cmd.run('node', [binScriptPath, 'add']);

    expect(response).toMatchSnapshot();

    done();
  });

  it('should complain if we ask for non-supported tool', async done => {
    try {
      await cmd.run('node', [binScriptPath, 'add', 'non-supported-tool']);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }

    expect.hasAssertions();

    done();
  });
});
