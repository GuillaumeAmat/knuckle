import { getToolList } from './getToolList';

/**
 * Tells if a given list of tools contains non supported ones.
 */
export function validateToolList(tools: string[]) {
  const toolsFolders = getToolList();

  for (const toolName of tools) {
    if (!toolsFolders.includes(toolName)) {
      throw new Error(`\`${toolName}\` is not a supported tool.`);
    }
  }
}
