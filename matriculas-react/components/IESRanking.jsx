import { Skeleton } from "./skeleton";

export function IESRanking({ data, loading }) {
    if (loading) return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} height={40} />)}
      </div>
    );
  
    if (data.length === 0)
      return (
        <p style={{ color: "var(--color-text-secondary)", fontSize: 14, textAlign: "center", padding: "2rem 0" }}>
          Nenhuma IES encontrada para os filtros selecionados.
        </p>
      );
  
    const sorted = [...data].sort((a, b) => b.alunos - a.alunos);
    const max = sorted[0]?.alunos ?? 1;
  
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map((d, i) => (
          <div
            key={d.ies}
            style={{
              display: "grid",
              gridTemplateColumns: "28px 1fr auto",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)", textAlign: "center" }}>
              {i + 1}º
            </span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>{d.ies}</p>
                <span
                  style={{
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 10,
                    background:
                      d.tipo === "publica"
                        ? "var(--color-background-success)"
                        : "var(--color-background-warning)",
                    color:
                      d.tipo === "publica"
                        ? "var(--color-text-success)"
                        : "var(--color-text-warning)",
                  }}
                >
                  {d.tipo === "publica" ? "pública" : "privada"}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 10,
                    background: "var(--color-background-info)",
                    color: "var(--color-text-info)",
                  }}
                >
                  {d.modalidade}
                </span>
              </div>
              <div style={{ background: "var(--color-background-secondary)", borderRadius: 4, height: 6 }}>
                <div
                  style={{
                    width: `${(d.alunos / max) * 100}%`,
                    height: "100%",
                    borderRadius: 4,
                    background:
                      d.tipo === "publica"
                        ? "var(--color-background-success)"
                        : "var(--color-background-warning)",
                    transition: "width .5s ease",
                  }}
                />
              </div>
            </div>
            <span style={{ fontSize: 12, color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>
              {fmt(d.alunos)}
            </span>
          </div>
        ))}
      </div>
    );
  }