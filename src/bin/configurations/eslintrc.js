/* eslint-env node */

"use strict";

import prettierConfig from "./prettierrc";
import hasDependency from "../utils/hasDependency";

// To Read
// https://github.com/babel/babel-eslint
// https://github.com/prettier/eslint-plugin-prettier
// https://github.com/prettier/eslint-config-prettier
// https://www.npmjs.com/package/eslint-plugin-react
// https://www.npmjs.com/package/eslint-plugin-jest

module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    hasDependency("react") ? "plugin:react/recommended" : false,
    hasDependency("jest") ? "plugin:jest/recommended" : false,
  ].filter(Boolean),
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: { global: true },
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module", // es6 import/export
  },
  parser: "babel-eslint", // class properties
  plugins: [
    "prettier",
    hasDependency("react") ? "react" : false,
    hasDependency("jest") ? "jest" : false,
  ].filter(Boolean),
  rules: {
    "prettier/prettier": ["error", { ...prettierConfig }],
  },
};
