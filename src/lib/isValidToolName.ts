import { getToolList } from './getToolList';

/**
 * Tells if the given tool name is supported by Knuckle.
 */
export function isValidToolName(toolName: string) {
  return getToolList().includes(toolName);
}
