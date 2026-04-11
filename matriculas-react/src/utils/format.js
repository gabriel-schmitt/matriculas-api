export const fmt = (n) =>
  new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

export const fmtFull = (n) => new Intl.NumberFormat("pt-BR").format(n);
