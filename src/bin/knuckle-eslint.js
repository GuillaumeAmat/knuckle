import spawn from "cross-spawn";
import program from "commander";

import getClientWorkingDir from "./utils/getClientWorkingDir";

program
  .option("-f, --fix", "fix files")
  .action(() => {
    const workingDirectory = getClientWorkingDir();
    console.log("workingDirectory", workingDirectory);

    const result = spawn.sync("echo", "@TODO eslint");

    process.exit(result.status);
  })
  .parse(process.argv);
