import { getSupportInfo } from 'prettier';

export function getSupportedExtensions() {
  return getSupportInfo().languages.reduce<string[]>(
    (prev, language) => prev.concat(language.extensions || []),
    [],
  );
}
