import { EOL } from 'os';

export function printMessage(message: string) {
  process.stdout.write(`${message}${EOL}`);
}
