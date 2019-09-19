const fs = require('fs');

const binScriptPath = require('../../helpers/tests/binScriptPath');
const cmd = require('../../helpers/tests/cmd');
const setupTestFolder = require('../../helpers/tests/setupTestFolder');
const { getToolList } = require('../../utils/tool');

setupTestFolder();

describe('Add', () => {
  it('Should not generate a `.knucklerc` file', async () => {
    await cmd.create('node').execute(
      [binScriptPath, 'add'],

      // Validate no previous selection
      [cmd.ENTER],
    );

    const knuckleRcExists = fs.existsSync('.knucklerc');

    expect(knuckleRcExists).toBe(false);
  });

  it('Should add tools interactively', async () => {
    await cmd.create('node').execute(
      [binScriptPath, 'add'],

      // Selects the 3 first tools and validate
      [cmd.SPACE, cmd.DOWN, cmd.SPACE, cmd.DOWN, cmd.SPACE, cmd.DOWN, cmd.ENTER],
    );

    const knuckleRcContent = fs.readFileSync('.knucklerc');
    const { tools } = JSON.parse(knuckleRcContent);

    expect(tools.length).toBe(3);
  });

  it('Should add tools with one command', async () => {
    await cmd
      .create('node')
      .execute([binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);

    const knuckleRcContent = fs.readFileSync('.knucklerc');
    const { tools } = JSON.parse(knuckleRcContent);

    expect(tools.length).toBe(4);
  });

  it('Should not duplicate tools', async () => {
    // First call
    await cmd
      .create('node')
      .execute([binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);

    // Second consecutive call with the same tools
    await cmd
      .create('node')
      .execute([binScriptPath, 'add', 'prettier', 'eslint', 'lint-staged', 'husky']);

    const { tools } = JSON.parse(fs.readFileSync('.knucklerc'));

    expect(tools.length).toBe(4);

    // Third call with duplicate tools and new ones
    await cmd.create('node').execute([binScriptPath, 'add', 'prettier', 'commitlint']);

    const { tools: newTools } = JSON.parse(fs.readFileSync('.knucklerc'));

    expect(newTools.length).toBe(5);
  });

  it('Should tell if all the tools are handled', async () => {
    await cmd.create('node').execute([binScriptPath, 'add', ...getToolList()]);

    // With a specified tool...
    let response = await cmd.create('node').execute([binScriptPath, 'add', 'prettier']);

    expect(response).toMatch(/already handled/);

    // ... And without
    response = await cmd.create('node').execute([binScriptPath, 'add']);

    expect(response).toMatch(/already handled/);
  });

  it('Should complain if we ask for non-supported tool', async () => {
    try {
      await cmd.create('node').execute([binScriptPath, 'add', 'non-supported-tool']);
    } catch (err) {
      expect(err).toMatch(/is not a supported tool/);
    }
  });
});
