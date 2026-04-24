function categoriaToTipo(categoria) {
  const c = String(categoria ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  if (c.startsWith("publica")) return "publica";
  return "privada";
}

/** Rótulo da badge: valor do filtro ou modalidade vinda do banco (predominante). */
function formatModalidadeBadge(value) {
  if (value == null || value === "") return "—";
  const low = String(value)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  if (low === "ead" || low.includes("ead")) return "EAD";
  if (low === "presencial") return "Presencial";
  return String(value).trim();
}

export function createApiMatriculasRepository(baseUrl) {
  const configured = String(baseUrl ?? "").replace(/\/$/, "");

  function apiOrigin() {
    if (configured) return configured;
    if (typeof window !== "undefined") return window.location.origin;
    return "http://localhost:3000";
  }

  async function getJson(path, query) {
    const rel = path.startsWith("/") ? path : `/${path}`;
    const url = new URL(rel, `${apiOrigin()}/`);
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
    async getEnrollmentsByYear(modalidade) {
      const rows = await getJson("/api/matriculas/total-por-ano", {
        modalidade,
      });
      const mapped = (Array.isArray(rows) ? rows : []).map((r) => ({
        ano: r.ano,
        total: Number(r.total_matriculas ?? r.total ?? 0),
      }));
      mapped.sort((a, b) => a.ano - b.ano);
      return mapped;
    },

    async getCourseRanking(modalidade) {
      const rows = await getJson("/api/cursos/ranking", {
        modalidade,
        limit: 10,
      });
      return (Array.isArray(rows) ? rows : []).map((r) => ({
        curso: r.nome ?? r.nome_detalhado ?? "—",
        alunos: Number(r.total_matriculas ?? 0),
      }));
    },

    async getIESRanking(filters) {
      const query = { limit: 12 };
      if (filters.modalidade && filters.modalidade !== "todos") {
        query.modalidade = filters.modalidade;
      }
      if (filters.tipo && filters.tipo !== "todos") {
        query.categoria_administrativa = filters.tipo;
      }
      const rows = await getJson("/api/ies/ranking", query);
      return (Array.isArray(rows) ? rows : []).map((r, idx) => {
        const modSource =
          filters.modalidade && filters.modalidade !== "todos"
            ? filters.modalidade
            : r.modalidade_predominante;
        return {
          id: r.id != null ? Number(r.id) : idx,
          ies: r.nome || r.sigla || "—",
          tipo: categoriaToTipo(r.categoria_administrativa),
          modalidade: formatModalidadeBadge(modSource),
          alunos: Number(r.total_matriculas ?? 0),
        };
      });
    },
  };
}
