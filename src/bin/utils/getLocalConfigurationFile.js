import path from "path";

const here = p => path.join(__dirname, p);
const hereRelative = p => here(p).replace(process.cwd(), ".");

export default filename => hereRelative(`../configurations/${filename}`);
