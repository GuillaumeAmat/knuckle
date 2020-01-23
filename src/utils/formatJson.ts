import { Json } from '../lib/constants';

export function formatJson(object: Json) {
  return JSON.stringify(object, null, 2);
}
