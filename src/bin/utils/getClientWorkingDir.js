import fs from "fs";

export default () => fs.realpathSync(process.cwd());
