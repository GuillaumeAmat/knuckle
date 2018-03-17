import path from "path";

export default name => {
  const modPkgPath = require.resolve(`${name}/package.json`);
  const modPkgDir = path.dirname(modPkgPath);
  const { bin } = require(modPkgPath);
  const binPath = typeof bin === "string" ? bin : bin[name];
  return path.join(modPkgDir, binPath);
};
