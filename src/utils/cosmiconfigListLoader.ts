import { EOL } from 'os';

export const cosmiconfigListLoader = (filename: string, content: string) => content.split(EOL);
