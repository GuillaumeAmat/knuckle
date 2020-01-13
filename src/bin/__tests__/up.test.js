const { cosmiconfigSync } = require('cosmiconfig');
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

describe('UP', () => {
  setupPristineTestFolder();

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

  it('should merge the overwriting configuration with the default merge strategy (`deep`)', async done => {
    await cmd.run('node', [binScriptPath, 'add', 'eslint']);
    let config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(1);

    await cmd.run('node', [binScriptPath, 'up', '--no-install']);

    const configExplorer = cosmiconfigSync('eslint');
    const defaultConfig = configExplorer.search().config;
    expect(defaultConfig).toBeDefined();

    const knuckleFolder = path.join(process.cwd(), '.knuckle');
    const overwriteConfigPath = path.join(knuckleFolder, '.eslintrc');
    const overwriteConfig = {
      extends: ['another_extend'],
      env: {
        ...Object.keys(defaultConfig.env).reduce((newEnv, key) => {
          if (typeof defaultConfig.env[key] === 'boolean') {
            newEnv[key] = !defaultConfig.env[key];
          } else {
            newEnv[key] = defaultConfig.env[key];
          }

          return newEnv;
        }, {}),
      },
      parserOptions: {
        another: {
          deep: {
            levels: true,
          },
        },
      },
    };

    fs.mkdirSync(knuckleFolder);
    fs.writeFileSync(overwriteConfigPath, JSON.stringify(overwriteConfig));

    await cmd.run('node', [binScriptPath, 'up', '--no-install']);

    configExplorer.clearCaches();

    const overwrittenConfig = configExplorer.search().config;
    expect(overwrittenConfig).toBeDefined();

    expect(overwrittenConfig.extends).toContain('another_extend');

    defaultConfig.extends.forEach(configName =>
      expect(overwrittenConfig.extends).toContain(configName),
    );

    Object.keys(overwriteConfig.env).forEach(envName =>
      expect(overwrittenConfig.env[envName]).toEqual(overwriteConfig.env[envName]),
    );

    Object.keys(defaultConfig.parserOptions).forEach(optionName =>
      expect(overwrittenConfig.parserOptions[optionName]).toEqual(
        defaultConfig.parserOptions[optionName],
      ),
    );

    Object.keys(overwriteConfig.parserOptions).forEach(optionName =>
      expect(overwrittenConfig.parserOptions[optionName]).toEqual(
        overwriteConfig.parserOptions[optionName],
      ),
    );

    done();
  });

  it('should merge the overwriting configuration with the `spread` merge strategy', async done => {
    await cmd.run('node', [binScriptPath, 'add', 'eslint']);
    let config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(1);

    await cmd.run('node', [binScriptPath, 'up', '--no-install']);

    const configExplorer = cosmiconfigSync('eslint');
    const defaultConfig = configExplorer.search().config;
    expect(defaultConfig).toBeDefined();

    const knuckleFolder = path.join(process.cwd(), '.knuckle');
    const overwriteConfigPath = path.join(knuckleFolder, '.eslintrc');
    const overwriteConfig = {
      extends: ['another_extend'],
      env: {
        ...Object.keys(defaultConfig.env).reduce((newEnv, key) => {
          if (typeof defaultConfig.env[key] === 'boolean') {
            newEnv[key] = !defaultConfig.env[key];
          } else {
            newEnv[key] = defaultConfig.env[key];
          }

          return newEnv;
        }, {}),
      },
      parserOptions: {
        another: {
          deep: {
            levels: true,
          },
        },
      },
    };

    fs.mkdirSync(knuckleFolder);
    fs.writeFileSync(overwriteConfigPath, JSON.stringify(overwriteConfig));

    await cmd.run('node', [binScriptPath, 'set-merge-strategy', 'eslint', 'spread']);
    await cmd.run('node', [binScriptPath, 'up', '--no-install']);

    configExplorer.clearCaches();

    const overwrittenConfig = configExplorer.search().config;
    expect(overwrittenConfig).toBeDefined();

    expect(overwrittenConfig.extends).toContain('another_extend');

    defaultConfig.extends.forEach(configName =>
      expect(overwrittenConfig.extends).not.toContain(configName),
    );

    Object.keys(overwriteConfig.env).forEach(envName =>
      expect(overwrittenConfig.env[envName]).toEqual(overwriteConfig.env[envName]),
    );

    Object.keys(defaultConfig.parserOptions).forEach(optionName =>
      expect(overwrittenConfig.parserOptions[optionName]).toBeUndefined(),
    );

    Object.keys(overwriteConfig.parserOptions).forEach(optionName =>
      expect(overwrittenConfig.parserOptions[optionName]).toEqual(
        overwriteConfig.parserOptions[optionName],
      ),
    );

    done();
  });

  it('should merge the overwriting configuration with the `replace` merge strategy', async done => {
    await cmd.run('node', [binScriptPath, 'add', 'eslint']);
    let config = getKnuckleConfig().config;
    expect(config.tools.length).toBe(1);

    await cmd.run('node', [binScriptPath, 'up', '--no-install']);

    const configExplorer = cosmiconfigSync('eslint');
    const defaultConfig = configExplorer.search().config;
    expect(defaultConfig).toBeDefined();

    const knuckleFolder = path.join(process.cwd(), '.knuckle');
    const overwriteConfigPath = path.join(knuckleFolder, '.eslintrc');
    const overwriteConfig = {
      extends: ['another_extend'],
    };

    fs.mkdirSync(knuckleFolder);
    fs.writeFileSync(overwriteConfigPath, JSON.stringify(overwriteConfig));

    await cmd.run('node', [binScriptPath, 'set-merge-strategy', 'eslint', 'replace']);
    await cmd.run('node', [binScriptPath, 'up', '--no-install']);

    configExplorer.clearCaches();

    const overwrittenConfig = configExplorer.search().config;
    expect(overwrittenConfig).toBeDefined();

    expect(overwrittenConfig.extends).toContain('another_extend');

    defaultConfig.extends.forEach(configName =>
      expect(overwrittenConfig.extends).not.toContain(configName),
    );

    expect(overwrittenConfig.env).toBeUndefined();
    expect(overwrittenConfig.parserOptions).toBeUndefined();

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
