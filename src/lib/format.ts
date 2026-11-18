const LOCALE = "es-SV";

const usd = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});
const usdCents = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const pct = new Intl.NumberFormat(LOCALE, {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});
const dec = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 2 });

/** Dólares sin centavos ($1,250). */
export const fmtUSD = (n: number) => usd.format(n);
/** Dólares con centavos ($1,250.50). */
export const fmtUSDCents = (n: number) => usdCents.format(n);
export const fmtPct = (n: number) => pct.format(n);
/** Hasta dos decimales, sin ceros sobrantes (10 → "10", 12.5 → "12.5"). */
export const fmtDec = (n: number) => dec.format(n);
