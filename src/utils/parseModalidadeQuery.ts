/** Normaliza query `modalidade` do front (ead, presencial, todos) para valores do banco. */
export function parseModalidadeQuery(raw: unknown): string | undefined {
  if (raw == null || raw === "") return undefined;
  const s = String(raw).trim();
  if (!s || s.toLowerCase() === "todos") return undefined;
  const lower = s.toLowerCase();
  if (lower === "ead") return "EaD";
  if (lower === "presencial") return "Presencial";
  return s;
}
