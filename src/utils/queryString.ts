/** Express pode entregar string ou array quando o parâmetro se repete na URL. */
export function firstQueryValue(value: unknown): string | undefined {
  if (value == null || value === "") return undefined;
  if (Array.isArray(value)) {
    const v = value[0];
    return v == null || v === "" ? undefined : String(v);
  }
  return String(value);
}
