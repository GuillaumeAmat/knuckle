import spawn from "cross-spawn";
import path from "path";
import program from "commander";

import getClientWorkingDir from "./utils/getClientWorkingDir";
import getLocalConfigurationFile from "./utils/getLocalConfigurationFile";
import getPathToBin from "./utils/getPathToBin";

program
  .option("-w, --write", "write file")
  .option("-ip, --ignore-path", "path to ignore")
  .action(filename => {
    const workingDirectory = getClientWorkingDir();

    const prettierDefaultConfig = getLocalConfigurationFile("prettierrc.js");
    const prettierDefaultIngore = getLocalConfigurationFile("prettierignore");

    const targetPath = path.join(workingDirectory, filename);

    const commandArgs = [
      targetPath,
      "--config",
      prettierDefaultConfig,
      "--ignore-path",
      prettierDefaultIngore,
    ];

    if (program.write) {
      commandArgs.push("--write");
    }

    const prettier = getPathToBin("prettier");

    const result = spawn.sync(prettier, [...commandArgs], { stdio: "inherit" });

    process.exit(result.status);
  })
  .parse(process.argv);
