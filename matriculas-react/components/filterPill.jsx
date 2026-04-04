export function FilterPill({ options, value, onChange }) {
    return (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              padding: "5px 14px",
              borderRadius: 20,
              border: "0.5px solid",
              borderColor: value === o.value ? "var(--color-border-info)" : "var(--color-border-secondary)",
              background: value === o.value ? "var(--color-background-info)" : "transparent",
              color: value === o.value ? "var(--color-text-info)" : "var(--color-text-secondary)",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: value === o.value ? 500 : 400,
              transition: "all .15s",
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
    );
  }