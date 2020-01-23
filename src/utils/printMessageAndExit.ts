import { printMessage } from './printMessage';

export function printMessageAndExit(message: string) {
  printMessage(message);
  process.exit(0);
}
