import spawn from "cross-spawn";
import path from "path";
import program from "commander";

import getClientWorkingDir from "./utils/getClientWorkingDir";
import getLocalConfigurationFile from "./utils/getLocalConfigurationFile";

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

    // @ TODO run dependency version of prettier - do not use npx
    const result = spawn.sync("npx", ["prettier", ...commandArgs], { stdio: "inherit" });

    process.exit(result.status);
  })
  .parse(process.argv);
