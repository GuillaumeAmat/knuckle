import fs from "fs";
import getClientWorkingDir from "./getClientWorkingDir";

const clientWorkingDir = getClientWorkingDir();

export default (...path) => fs.existsSync(path.join(clientWorkingDir, ...path));
