export function FilterPill({ options, value, onChange }) {
    return (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }} role="group">
        {options.map((o) => {
          const selected = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(o.value)}
              style={{
                padding: "5px 14px",
                borderRadius: 20,
                border: "1px solid",
                borderColor: selected
                  ? "var(--color-border-info)"
                  : "var(--color-border-secondary)",
                background: selected
                  ? "var(--color-background-info)"
                  : "var(--color-background-primary)",
                color: selected
                  ? "var(--color-text-info)"
                  : "var(--color-text-secondary)",
                fontSize: 13,
                cursor: "pointer",
                fontWeight: selected ? 600 : 400,
                transition: "background .15s, color .15s, border-color .15s",
                boxShadow: selected ? "0 0 0 1px var(--color-border-info)" : "none",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );
  }