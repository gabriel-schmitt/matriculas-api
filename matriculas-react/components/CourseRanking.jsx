import { Skeleton } from "./skeleton";

export function CourseRanking({ data, loading }) {
    if (loading) return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} height={32} />)}
      </div>
    );
  
    const max = Math.max(...data.map((d) => d.alunos));
    const medals = ["🥇", "🥈", "🥉"];
  
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((d, i) => {
          const pct = (d.alunos / max) * 100;
          return (
            <div
              key={d.curso}
              style={{
                display: "grid",
                gridTemplateColumns: "28px 1fr auto",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: i < 3 ? 16 : 13, textAlign: "center", color: "var(--color-text-secondary)" }}>
                {i < 3 ? medals[i] : `${i + 1}º`}
              </span>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 500 }}>{d.curso}</p>
                <div style={{ background: "var(--color-background-secondary)", borderRadius: 4, height: 6 }}>
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      borderRadius: 4,
                      background: i === 0
                        ? "#EF9F27"
                        : i === 1
                        ? "#B4B2A9"
                        : i === 2
                        ? "#F09975"
                        : "var(--color-background-info)",
                      transition: "width .5s ease",
                    }}
                  />
                </div>
              </div>
              <span style={{ fontSize: 12, color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>
                {fmt(d.alunos)}
              </span>
            </div>
          );
        })}
      </div>
    );
  }