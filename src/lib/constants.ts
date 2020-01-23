export const MERGE_STRATEGIES = {
  DEEP: 'deep',
  SPREAD: 'spread',
  REPLACE: 'replace',
};

export const DEFAULT_MERGE_STRATEGY = MERGE_STRATEGIES.DEEP;

export type Json = string | number | boolean | null | JsonObject | JsonArray;
export type JsonArray = Json[];
export type JsonObject = { [property: string]: Json };

export type ConfigurationGenerator = (
  mergeStrategy: string,
) => Array<{
  filename: string;
  build(configuredTools: string[]): string | Json | Array<any>;
  format(config: Json): Json | Array<any>;
}>;

export type DependenciesGetter = (configuredTools: string[]) => string[];
