const path = require('path');

const cmd = require('../helpers/tests/cmd');

const binScriptPath = path.join(__dirname, '../src/bin/index.js');

describe('Error', () => {
  it('Should print an `unknown option` error', async () => {
    const command = cmd.create('node');

    try {
      await command.execute([binScriptPath, '--bad-option']);
    } catch (err) {
      expect(err.trim()).toMatch(/^error: unknown option/);
    }
  });
});
