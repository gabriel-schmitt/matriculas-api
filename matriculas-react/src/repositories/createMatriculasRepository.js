import { createApiMatriculasRepository } from "./apiMatriculasRepository";

export function createMatriculasRepository() {
  const base =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_MATRICULAS_API_URL
      : undefined;
  const trimmed = base != null ? String(base).trim() : "";
  return createApiMatriculasRepository(trimmed);
}
