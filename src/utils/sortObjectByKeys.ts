interface Collection {
  [K: string]: any;
}

/**
 * Sort an object items by their key.
 */
export function sortObjectByKeys(object: Collection) {
  return Object.keys(object)
    .sort()
    .reduce<Collection>((newObject, key) => {
      newObject[key] = object[key];
      return newObject;
    }, {});
}
