/* eslint-env node */

"use strict";

import hasDependency from "../utils/hasDependency";

module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    hasDependency("react") ? "plugin:react/recommended" : false,
  ].filter(Boolean),
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module", // es6 import/export
  },
  parser: "babel-eslint", // class properties
  plugins: ["prettier", hasDependency("react") ? "react" : false].filter(Boolean),
  rules: {
    "prettier/prettier": [
      "error",
      {
        useTabs: false,
        printWidth: 100,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: "all",
        jsxBracketSameLine: true,
        semi: true,
      },
    ],
  },
};
