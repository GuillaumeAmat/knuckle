const { cosmiconfigSync } = require('cosmiconfig');
const fs = require('fs');
const path = require('path');

const { MERGE_STRATEGIES } = require('./constants');
const { deepMerge } = require('../utils/deepMerge');
const { printErrorAndExit } = require('../utils/printErrorAndExit');

/**
 * Loads the Knuckle default configuration for a given tool
 * and merge it with the `initialValue` from the end user.
 *
 * @param {string} toolName
 * @param {"deep" | "spread" | "replace"} mergeStrategy
 * @param {Object} initialValue
 * @param {Object} cosmiconfigOptions
 */
function loadAndMergeConfig(toolName, mergeStrategy, initialValue = {}, cosmiconfigOptions = {}) {
  const initialValuePrimitive = Array.isArray(initialValue) ? [] : {};
  const toolDirectory = fs.realpathSync(path.join(__dirname, '../../config', toolName));

  const defaultConfigExplorer = cosmiconfigSync(toolName, {
    ...cosmiconfigOptions,
    stopDir: toolDirectory,
  });
  const defaultConfigSearch = defaultConfigExplorer.search(toolDirectory);
  const defaultConfig = deepMerge(
    defaultConfigSearch ? defaultConfigSearch.config : initialValuePrimitive,
    initialValue,
  );

  const overwriteConfigDirectory = path.join(process.cwd(), '.knuckle');
  let overwriteConfig;

  try {
    fs.accessSync(overwriteConfigDirectory);

    const overwriteConfigExplorer = cosmiconfigSync(toolName, {
      ...cosmiconfigOptions,
      stopDir: overwriteConfigDirectory,
    });
    const overwriteConfigSearch = overwriteConfigExplorer.search(overwriteConfigDirectory);
    overwriteConfig = overwriteConfigSearch ? overwriteConfigSearch.config : initialValuePrimitive;
  } catch (e) {
    overwriteConfig = initialValuePrimitive;
  }

  switch (mergeStrategy) {
    case MERGE_STRATEGIES.REPLACE:
      return overwriteConfig;

    case MERGE_STRATEGIES.DEEP:
      return deepMerge(defaultConfig, overwriteConfig);

    case MERGE_STRATEGIES.SPREAD:
      if (Array.isArray(initialValue)) {
        return [...defaultConfig, ...overwriteConfig];
      } else {
        return { ...defaultConfig, ...overwriteConfig };
      }

    default:
      printErrorAndExit(`${toolName} ${mergeStrategy} is not a valid merge strategy.`);
      break;
  }
}

module.exports = { loadAndMergeConfig };
