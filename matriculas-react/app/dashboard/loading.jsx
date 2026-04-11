import { Skeleton } from "../../src/components/skeleton";

export default function DashboardLoading() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "1.5rem 1rem",
        fontFamily: "var(--font-sans)",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div style={{ marginBottom: "2rem" }}>
        <Skeleton height={28} width="70%" style={{ marginBottom: 8 }} />
        <Skeleton height={16} width="90%" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
          gap: "1rem",
        }}
      >
        <div
          style={{
            gridColumn: "1 / -1",
            background: "var(--color-background-secondary)",
            borderRadius: "var(--border-radius-md)",
            padding: "1rem",
          }}
        >
          <Skeleton height={20} width={160} style={{ marginBottom: 12 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} height={36} />
            ))}
          </div>
        </div>
        <div
          style={{
            background: "var(--color-background-secondary)",
            borderRadius: "var(--border-radius-md)",
            padding: "1rem",
          }}
        >
          <Skeleton height={20} width={140} style={{ marginBottom: 12 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} height={32} />
            ))}
          </div>
        </div>
        <div
          style={{
            background: "var(--color-background-secondary)",
            borderRadius: "var(--border-radius-md)",
            padding: "1rem",
          }}
        >
          <Skeleton height={20} width={120} style={{ marginBottom: 12 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} height={40} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
