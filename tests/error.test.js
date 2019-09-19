const path = require('path');

const cmd = require('../helpers/cmd');

const binFile = path.join(__dirname, '../src/bin/index.js');

describe('Error', () => {
  it('Should print an `unknown option` error', async () => {
    const command = cmd.create(process.env.npm_node_execpath);

    try {
      await command.execute([binFile, '--bad-option']);
    } catch (err) {
      expect(err.trim()).toMatch(/^error: unknown option/);
    }
  });
});
