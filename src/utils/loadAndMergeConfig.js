const cosmiconfig = require('cosmiconfig');
const fs = require('fs');
const path = require('path');

module.exports = function(toolName, initialValue = {}, cosmiconfigOptions = {}) {
  const toolDirectory = fs.realpathSync(path.join(__dirname, '../../config', toolName));

  const defaultConfigExplorer = cosmiconfig(toolName, {
    ...cosmiconfigOptions,
    stopDir: toolDirectory,
  });
  const defaultConfigSearch = defaultConfigExplorer.searchSync(toolDirectory);
  const defaultConfig = defaultConfigSearch ? defaultConfigSearch.config : initialValue;

  const overwriteConfigDirectory = path.join(process.cwd(), '.knuckle');
  let overwriteConfig;

  try {
    fs.accessSync(overwriteConfigDirectory);

    const overwriteConfigExplorer = cosmiconfig(toolName, {
      ...cosmiconfigOptions,
      stopDir: overwriteConfigDirectory,
    });
    const overwriteConfigSearch = overwriteConfigExplorer.searchSync(overwriteConfigDirectory);
    overwriteConfig = overwriteConfigSearch ? overwriteConfigSearch.config : initialValue;
  } catch (e) {
    overwriteConfig = Array.isArray(initialValue) ? [] : {};
  }

  if (Array.isArray(initialValue)) {
    return [...initialValue, ...defaultConfig, ...overwriteConfig];
  } else {
    return { ...initialValue, ...defaultConfig, ...overwriteConfig };
  }
};
