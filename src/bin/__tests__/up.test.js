const fs = require('fs');
const path = require('path');

const { binScriptPath } = require('../../helpers/tests/binScriptPath');
const cmd = require('../../helpers/tests/cmd');
const { getKnuckleConfig } = require('../../helpers/tests/getKnuckleConfig');
const { setupPristineTestFolder } = require('../../helpers/tests/setupPristineTestFolder');
const { writeJson } = require('../../utils/writeJson');

const {
  generateConfigurations: eslintGenerateConfigurations,
} = require('../../tools/eslint/generateConfigurations');
const {
  generateConfigurations: prettierGenerateConfigurations,
} = require('../../tools/prettier/generateConfigurations');

const eslintConfigurations = eslintGenerateConfigurations();
const prettierConfigurations = prettierGenerateConfigurations();

setupPristineTestFolder();

describe('UP', () => {
  it('should fail if there is no configuration file', async done => {
    try {
      await cmd.run('node', [binScriptPath, 'up']);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }

    expect.hasAssertions();

    done();
  });

  it('should fail if there is no `tools` attribute in the configuration file', async done => {
    const configFilePath = path.join(process.cwd(), '.knucklerc');
    const configContent = {};
    writeJson(configFilePath, configContent);

    try {
      await cmd.run('node', [binScriptPath, 'up']);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }

    expect.hasAssertions();

    done();
  });

  it('should fail if there is no configured tools', async done => {
    await cmd.run('node', [binScriptPath, 'add', 'prettier']);
    let config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(1);

    await cmd.run('node', [binScriptPath, 'remove', 'prettier']);
    config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(0);

    let hasThrown = false;

    try {
      await cmd.run('node', [binScriptPath, 'up']);
    } catch (err) {
      hasThrown = true;
      expect(err).toMatchSnapshot();
    }

    expect(hasThrown).toBe(true);

    done();
  });

  it('should create the tools configurations without installing the dependencies', async done => {
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint']);
    let config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(2);

    await cmd.run('node', [binScriptPath, 'up', '--no-install']);

    const cwdFiles = fs.readdirSync(process.cwd());
    const eslintConfigurationFiles = eslintConfigurations.map(config => config.filename);
    const prettierConfigurationFiles = prettierConfigurations.map(config => config.filename);
    const configFilesToFind = [...eslintConfigurationFiles, ...prettierConfigurationFiles];

    expect(cwdFiles).toEqual(expect.arrayContaining(configFilesToFind));
    expect(cwdFiles).toEqual(expect.not.arrayContaining(['node_modules']));

    done();
  });

  it('should create the tools configurations and install the dependencies with `npm` (by default)', async done => {
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint']);
    let config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(2);

    const output = await cmd.run('node', [binScriptPath, 'up']);

    expect(output).toMatchSnapshot();

    const cwdFiles = fs.readdirSync(process.cwd());
    const eslintConfigurationFiles = eslintConfigurations.map(config => config.filename);
    const prettierConfigurationFiles = prettierConfigurations.map(config => config.filename);
    const configFilesToFind = [...eslintConfigurationFiles, ...prettierConfigurationFiles];

    expect(cwdFiles).toEqual(expect.arrayContaining(configFilesToFind));

    done();
  });

  it('should create the tools configurations and install the dependencies with `yarn`', async done => {
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint']);
    let config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(2);

    // Knuckle detects the package manager by looking for the related lock files
    fs.writeFileSync(path.join(process.cwd(), 'yarn.lock'), '');

    const output = await cmd.run('node', [binScriptPath, 'up']);

    expect(output).toMatchSnapshot();

    const cwdFiles = fs.readdirSync(process.cwd());
    const eslintConfigurationFiles = eslintConfigurations.map(config => config.filename);
    const prettierConfigurationFiles = prettierConfigurations.map(config => config.filename);
    const configFilesToFind = [...eslintConfigurationFiles, ...prettierConfigurationFiles];

    expect(cwdFiles).toEqual(expect.arrayContaining(configFilesToFind));

    done();
  });

  it('should create the tools configurations and install the dependencies with `pnpm`', async done => {
    await cmd.run('node', [binScriptPath, 'add', 'prettier', 'eslint']);
    let config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(2);

    // Knuckle detects the package manager by looking for the related lock files
    fs.writeFileSync(path.join(process.cwd(), 'shrinkwrap.yaml'), '');

    const output = await cmd.run('node', [binScriptPath, 'up']);

    expect(output).toMatchSnapshot();

    const cwdFiles = fs.readdirSync(process.cwd());
    const eslintConfigurationFiles = eslintConfigurations.map(config => config.filename);
    const prettierConfigurationFiles = prettierConfigurations.map(config => config.filename);
    const configFilesToFind = [...eslintConfigurationFiles, ...prettierConfigurationFiles];

    expect(cwdFiles).toEqual(expect.arrayContaining(configFilesToFind));

    done();
  });
});
