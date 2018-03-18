import spawn from "cross-spawn";
import path from "path";
import program from "commander";

import getClientWorkingDir from "./utils/getClientWorkingDir";
import getPathToBin from "./utils/getPathToBin";
import getLocalConfigurationFile from "./utils/getLocalConfigurationFile";

program
  .option("-f, --fix", "fix files")
  .action(filesPath => {
    const workingDirectory = getClientWorkingDir();

    const eslintDefaultConfig = getLocalConfigurationFile("eslintrc.js");
    const targetPath = path.join(workingDirectory, filesPath);

    const commandArgs = [targetPath, "--config", eslintDefaultConfig];

    if (program.fix) {
      commandArgs.push("--fix");
    }

    const eslint = getPathToBin("eslint");

    const result = spawn.sync(eslint, [...commandArgs], { stdio: "inherit" });

    process.exit(result.status);
  })
  .parse(process.argv);
