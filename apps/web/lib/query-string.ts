type QueryValue = string | number | boolean | undefined | null;

/** Builds a URL query string from a params object, filtering out empty values. */
export function buildQueryString(params: Readonly<Record<string, QueryValue>>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ""
  );
  if (entries.length === 0) return "";
  const search = new URLSearchParams();
  for (const [key, value] of entries) {
    search.set(key, String(value));
  }
  return `?${search.toString()}`;
}

/** Parses a URL query string into a plain object. */
export function parseQueryString(search: string): Readonly<Record<string, string>> {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => { result[key] = value; });
  return result;
}
