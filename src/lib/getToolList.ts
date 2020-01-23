import fs from 'fs';
import path from 'path';

/**
 * Returns the complete list of Knuckle supported tools
 */
export function getToolList() {
  return fs.readdirSync(path.join(__dirname, '../tools'));
}
