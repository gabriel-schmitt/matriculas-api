import { Skeleton } from "./skeleton";
import { fmt, fmtFull } from "../utils/format";

export function EnrollmentChart({ data, loading }) {
  if (loading)
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} height={36} />
        ))}
      </div>
    );

  const max =
    data.length > 0 ? Math.max(...data.map((d) => d.total)) : 0;
  const latest = data[data.length - 1];
  const prev = data[data.length - 2];
  const growth = prev
    ? (((latest.total - prev.total) / prev.total) * 100).toFixed(1)
    : null;

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: "1.25rem" }}>
        <div
          style={{
            flex: 1,
            background: "var(--color-background-secondary)",
            borderRadius: "var(--border-radius-md)",
            padding: "1rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "var(--color-text-secondary)",
              marginBottom: 4,
            }}
          >
            Total em {latest?.ano}
          </p>
          <p style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>
            {fmtFull(latest?.total)}
          </p>
        </div>
        {growth && (
          <div
            style={{
              flex: 1,
              background: "var(--color-background-secondary)",
              borderRadius: "var(--border-radius-md)",
              padding: "1rem",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "var(--color-text-secondary)",
                marginBottom: 4,
              }}
            >
              Crescimento anual
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 500,
                color:
                  growth >= 0
                    ? "var(--color-text-success)"
                    : "var(--color-text-danger)",
              }}
            >
              {growth >= 0 ? "+" : ""}
              {growth}%
            </p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((d) => {
          const pct = (d.total / max) * 100;
          return (
            <div
              key={d.ano}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "var(--color-text-secondary)",
                  minWidth: 36,
                }}
              >
                {d.ano}
              </span>
              <div
                style={{
                  flex: 1,
                  background: "var(--color-background-secondary)",
                  borderRadius: 6,
                  height: 28,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: "var(--color-background-info)",
                    borderRadius: 6,
                    transition: "width .5s ease",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--color-text-info)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {fmt(d.total)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
