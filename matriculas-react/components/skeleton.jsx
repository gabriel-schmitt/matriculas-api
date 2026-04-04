export function Skeleton({ height = 24, width = "100%", style }) {
    return (
      <div
        style={{
          height,
          width,
          borderRadius: 6,
          background: "var(--color-background-secondary)",
          animation: "pulse 1.4s ease-in-out infinite",
          ...style,
        }}
      />
    );
  }
  