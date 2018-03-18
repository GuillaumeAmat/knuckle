/* eslint-env node */

"use strict";

module.exports = {
    extends: ["eslint:recommended", "prettier"],
    env: {
      browser: true,
      es6: true,
      node: true
    },
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: "module", // es6 import/export
    },
    parser: "babel-eslint", // class properties
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [
            "error"
        ],
    },
};
