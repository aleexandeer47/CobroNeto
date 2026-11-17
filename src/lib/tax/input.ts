import type { CalcInput } from "./calculate";

/** Límites duros: cualquier valor fuera de rango se recorta. Nada del usuario sale del navegador. */
export const LIMITS = {
  ingresoUSD: { min: 0, max: 1_000_000 },
  comisionPct: { min: 0, max: 60 },
  tipoCambio: { min: 5, max: 60 },
  gastosMXN: { min: 0, max: 20_000_000 },
} as const;

type NumericField = keyof typeof LIMITS;

/** Convierte texto del usuario ("1,250.50", "$ 300") en número acotado. */
export function parseAmount(raw: string | null | undefined, field: NumericField): number | null {
  if (raw == null) return null;
  const cleaned = String(raw).slice(0, 32).replace(/[\s,$]/g, "");
  if (cleaned === "" || !/^\d*\.?\d*$/.test(cleaned)) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  const { min, max } = LIMITS[field];
  return Math.min(max, Math.max(min, n));
}

export interface FormState {
  ingresoUSD: string;
  comisionPct: string;
  tipoCambio: string;
  gastosMXN: string;
  gastosConIVA: boolean;
  exportacion: boolean;
}

export function toCalcInput(s: FormState, fallbackTipoCambio: number): CalcInput {
  return {
    ingresoUSD: parseAmount(s.ingresoUSD, "ingresoUSD") ?? 0,
    comisionPct: parseAmount(s.comisionPct, "comisionPct") ?? 0,
    tipoCambio: parseAmount(s.tipoCambio, "tipoCambio") ?? fallbackTipoCambio,
    gastosMXN: parseAmount(s.gastosMXN, "gastosMXN") ?? 0,
    gastosConIVA: s.gastosConIVA,
    exportacion: s.exportacion,
  };
}

const PARAM = {
  ingresoUSD: "usd",
  comisionPct: "com",
  tipoCambio: "tc",
  gastosMXN: "gas",
  gastosConIVA: "giva",
  exportacion: "exp",
} as const;

/** Serializa el cálculo en la URL para compartirlo (solo números y banderas). */
export function toSearchParams(s: FormState): string {
  const p = new URLSearchParams();
  (["ingresoUSD", "comisionPct", "tipoCambio", "gastosMXN"] as const).forEach((k) => {
    const v = parseAmount(s[k], k);
    if (v != null) p.set(PARAM[k], String(v));
  });
  p.set(PARAM.gastosConIVA, s.gastosConIVA ? "1" : "0");
  p.set(PARAM.exportacion, s.exportacion ? "1" : "0");
  return p.toString();
}

/** Lee parámetros de la URL validándolos; ignora todo lo desconocido o inválido. */
export function fromSearchParams(search: string, base: FormState): FormState | null {
  const p = new URLSearchParams(search.slice(0, 512));
  if (![...Object.values(PARAM)].some((k) => p.has(k))) return null;
  const next = { ...base };
  (["ingresoUSD", "comisionPct", "tipoCambio", "gastosMXN"] as const).forEach((k) => {
    const v = parseAmount(p.get(PARAM[k]), k);
    if (v != null) next[k] = String(v);
  });
  const flag = (k: "gastosConIVA" | "exportacion") => {
    const v = p.get(PARAM[k]);
    if (v === "1" || v === "0") next[k] = v === "1";
  };
  flag("gastosConIVA");
  flag("exportacion");
  return next;
}
