const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});
const mxnCents = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const usd = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
  maximumFractionDigits: 0,
});
const pct = new Intl.NumberFormat("es-MX", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});
const num = new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const dec = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 2 });

export const fmtMXN = (n: number) => mxn.format(n);
export const fmtMXNCents = (n: number) => mxnCents.format(n);
export const fmtUSD = (n: number) => usd.format(n);
export const fmtPct = (n: number) => pct.format(n);
export const fmtNum = (n: number) => num.format(n);
/** Hasta dos decimales, sin ceros sobrantes (10 → "10", 12.5 → "12.5"). */
export const fmtDec = (n: number) => dec.format(n);

export function fmtFecha(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
