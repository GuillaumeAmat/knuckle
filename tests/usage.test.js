const path = require('path');
const { EOL } = require('os');

const cmd = require('../helpers/tests/cmd');

const binScriptPath = path.join(__dirname, '../src/bin/index.js');

describe('Usage', () => {
  it('Should print the usage', async () => {
    const command = cmd.create('node');

    const response = await command.execute([binScriptPath]);
    const splittedResponse = response.trim().split(EOL + EOL);

    expect(splittedResponse[0]).toMatch(/^Usage:/);
    expect(splittedResponse[1]).toMatch(/^Options:/);
    expect(splittedResponse[2]).toMatch(/^Commands:/);
  });
});
