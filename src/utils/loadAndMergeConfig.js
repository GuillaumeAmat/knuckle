const cosmiconfig = require('cosmiconfig');
const fs = require('fs');
const path = require('path');

module.exports = function(toolName, initialValue = {}, cosmiconfigOptions = {}) {
  const knuckleRootPath = fs.realpathSync(path.join(__dirname, '../..'));
  const configExplorer = cosmiconfig(toolName, cosmiconfigOptions);

  const defaultConfigSearch = configExplorer.searchSync(knuckleRootPath);
  const defaultConfig = defaultConfigSearch ? defaultConfigSearch.config : initialValue;

  const overwriteConfigSearch = configExplorer.searchSync();
  const overwriteConfig = overwriteConfigSearch ? overwriteConfigSearch.config : initialValue;

  if (Array.isArray(initialValue)) {
    return [...initialValue, ...defaultConfig, ...overwriteConfig];
  } else {
    return { ...initialValue, ...defaultConfig, ...overwriteConfig };
  }
};
