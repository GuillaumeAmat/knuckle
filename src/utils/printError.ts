import { EOL } from 'os';

export function printError(message: string) {
  process.stderr.write(`${message}${EOL}`);
}
