import fs from 'fs';
import { EOL } from 'os';

export function writeFile(path: string, content: string) {
  return fs.writeFileSync(path, `${content.trim()}${EOL}`);
}
