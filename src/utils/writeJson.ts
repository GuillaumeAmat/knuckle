import { formatJson } from './formatJson';
import { writeFile } from './writeFile';

export function writeJson(path: string, object: object) {
  return writeFile(path, formatJson(object));
}
