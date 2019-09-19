const fs = require('fs');

const binScriptPath = require('../../helpers/tests/binScriptPath');
const cmd = require('../../helpers/tests/cmd');
const setupTestFolder = require('../../helpers/tests/setupTestFolder');

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

    const knuckleRcContent = fs.readFileSync('.knucklerc');
    const { tools } = JSON.parse(knuckleRcContent);

    expect(tools.length).toBe(4);
  });
});
