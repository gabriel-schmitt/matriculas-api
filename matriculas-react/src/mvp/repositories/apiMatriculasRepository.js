export function createApiMatriculasRepository(baseUrl) {
  const root = String(baseUrl).replace(/\/$/, "");

  async function getJson(path, query) {
    const url = new URL(`${root}${path}`);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value != null && value !== "") {
          url.searchParams.set(key, String(value));
        }
      }
    }
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Matriculas API ${res.status}: ${body.slice(0, 200)}`);
    }
    return res.json();
  }

  return {
    getEnrollmentsByYear(modalidade) {
      return getJson("/api/matriculas/enrollments-by-year", { modalidade });
    },

    getCourseRanking(modalidade) {
      return getJson("/api/matriculas/course-ranking", { modalidade });
    },

    getIESRanking(filters) {
      return getJson("/api/matriculas/ies-ranking", {
        tipo: filters.tipo,
        modalidade: filters.modalidade,
      });
    },
  };
}
