import mergeWith from 'lodash.mergewith';

/**
 * Customizer for the lodash `mergeWith` function.
 * It concatenates the arrays instead of overwriting them.
 */
function customizer(value: any, srcValue: any, key: string, object: any, source: any) {
  if (Array.isArray(value)) {
    return value.concat(srcValue);
  }
}

/**
 * Merge objects/arrays with the Lodash mergeWith function and a custom array handling.
 */
export function deepMerge(object: object, ...sources: object[]) {
  return mergeWith(object, ...sources, customizer);
}
