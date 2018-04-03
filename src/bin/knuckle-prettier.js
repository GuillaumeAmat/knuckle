import spawn from "cross-spawn";
import program from "commander";

import getClientWorkingDir from "./utils/getClientWorkingDir";
import getLocalConfigurationFile from "./utils/getLocalConfigurationFile";
import getPathToBin from "./utils/getPathToBin";
import hasFile from "./utils/hasFile";

const PRETTIER_CONFIG_FILENAME = "prettier.config.js";
const PRETTIER_IGNORE_FILENAME = "prettierignore";

program
  .option("-w, --write", "write file")
  .option("-ip, --ignore-path", "path to ignore")
  .action(filename => {
    const clientWorkingDir = getClientWorkingDir();

    const prettierDefaultConfig = getLocalConfigurationFile("prettierrc.js");
    const prettierDefaultIgnore = getLocalConfigurationFile("prettierignore");

    const buildPathFromClientWorkingDir = (...path) => path.join(clientWorkingDir, ...path);
    const targetPath = buildPathFromClientWorkingDir(filename);

    const prettierClientConfigPath = buildPathFromClientWorkingDir(PRETTIER_CONFIG_FILENAME);
    const prettierClientIgnorePath = buildPathFromClientWorkingDir(PRETTIER_IGNORE_FILENAME);

    const prettierConfig = hasFile(PRETTIER_CONFIG_FILENAME)
      ? prettierClientConfigPath
      : prettierDefaultConfig;
    const prettierIgnore = hasFile(PRETTIER_IGNORE_FILENAME)
      ? prettierClientIgnorePath
      : prettierDefaultIgnore;

    const commandArgs = [targetPath, "--config", prettierConfig, "--ignore-path", prettierIgnore];

    if (program.write) {
      commandArgs.push("--write");
    }

    const prettier = getPathToBin("prettier");

    const result = spawn.sync(prettier, [...commandArgs], { stdio: "inherit" });

    process.exit(result.status);
  })
  .parse(process.argv);
