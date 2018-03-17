#!/usr/bin/env node

import { REPOSITORY_URL } from "../constants";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

// TMP FORCE PRETTIER CMD
const script = "prettier";

switch (script) {
  case "prettier":
  case "eslint":
  case "test": {
    console.log("run", script);
    break;
  }
  default:
    console.log(`Unknown script ${script}.`);
    console.log("Perhaps you need to update knuckle?");
    console.log(`See: ${REPOSITORY_URL}`);
    break;
}
