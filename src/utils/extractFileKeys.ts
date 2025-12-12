export function extractFileKeys(...keys: Array<string | null | undefined>): string[] {
  return keys.filter((k): k is string => Boolean(k));
}
