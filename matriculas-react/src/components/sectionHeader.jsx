export function SectionHeader({ title, children }) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{title}</h2>
        {children}
      </div>
    );
  }