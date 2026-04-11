import { createApiMatriculasRepository } from "./apiMatriculasRepository";
import { createMockMatriculasRepository } from "./matriculasRepository";

export function createMatriculasRepository() {
  const base =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_MATRICULAS_API_URL
      : undefined;
  if (base && String(base).trim()) {
    return createApiMatriculasRepository(String(base).trim());
  }
  return createMockMatriculasRepository();
}
