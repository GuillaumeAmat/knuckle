/**
 * Sort an object items by their key.
 *
 * @param  {Object} object
 */
function sortObjectByKeys(object) {
  return Object.keys(object)
    .sort()
    .reduce((newObject, key) => {
      newObject[key] = object[key];
      return newObject;
    }, {});
}

module.exports = { sortObjectByKeys };
