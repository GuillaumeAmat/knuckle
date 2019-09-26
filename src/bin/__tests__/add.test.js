const fs = require('fs');

const binScriptPath = require('../../helpers/tests/binScriptPath');
const cmd = require('../../helpers/tests/cmd');
const setupPristineTestFolder = require('../../helpers/tests/setupPristineTestFolder');
const { getToolList } = require('../../utils/tool');

setupPristineTestFolder();

describe('Add', () => {
  it('Should not generate a `.knucklerc` file', async () => {
    await cmd.run(
      'node',
      [binScriptPath, 'add'],

      // Validate no previous selection
      [cmd.ENTER],
    );

    const knuckleRcExists = fs.existsSync('.knucklerc');

    expect(knuckleRcExists).toBe(false);
  });

  it('Should add tools interactively', async () => {
    await cmd.run(
      'node',
      [binScriptPath, 'add'],

      // Selects the 3 first tools and validate
      [cmd.SPACE, cmd.DOWN, cmd.SPACE, cmd.DOWN, cmd.SPACE, cmd.DOWN, cmd.ENTER],
    );

    const knuckleRcContent = fs.readFileSync('.knucklerc');
    const { tools } = JSON.parse(knuckleRcContent);

    expect(tools.length).toBe(3);
  });

  it('Should add tools with one command', async () => {
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);

    const knuckleRcContent = fs.readFileSync('.knucklerc');
    const { tools } = JSON.parse(knuckleRcContent);

    expect(tools.length).toBe(4);
  });

  it('Should not duplicate tools', async () => {
    // First call
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);

    // Second consecutive call with the same tools
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);

    const { tools } = JSON.parse(fs.readFileSync('.knucklerc'));

    expect(tools.length).toBe(4);

    // Third call with duplicate tools and new ones
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'commitlint']);

    const { tools: newTools } = JSON.parse(fs.readFileSync('.knucklerc'));

    expect(newTools.length).toBe(5);
  });

  it('Should tell if all the tools are handled', async () => {
    await cmd.run('node', [binScriptPath, 'add', ...getToolList()]);

    // With a specified tool...
    let response = await cmd.run('node', [binScriptPath, 'add', 'prettier']);

    expect(response).toMatch(/already handled/);

    // ... And without
    response = await cmd.run('node', [binScriptPath, 'add']);

    expect(response).toMatch(/already handled/);
  });

  it('Should complain if we ask for non-supported tool', async () => {
    try {
      await cmd.run('node', [binScriptPath, 'add', 'non-supported-tool']);
    } catch (err) {
      expect(err).toMatch(/is not a supported tool/);
    }
  });
});
