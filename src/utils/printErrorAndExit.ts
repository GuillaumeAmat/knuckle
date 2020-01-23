import { printError } from './printError';

export function printErrorAndExit(message: string) {
  printError(message);
  process.exit(1);
}
