const { getSupportInfo } = require('prettier');

function getSupportedExtensions() {
  return getSupportInfo().languages.reduce(
    (prev, language) => prev.concat(language.extensions || []),
    [],
  );
}

module.exports = getSupportedExtensions;
