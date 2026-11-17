/**
 * Tarifas fiscales México 2026.
 *
 * ISR personas físicas: Anexo 8 de la Resolución Miscelánea Fiscal 2026
 * (DOF 28-12-2025), actualizadas por inflación conforme al art. 152 LISR.
 * RESICO personas físicas: art. 113-E LISR (sin cambios para 2026).
 *
 * Si el SAT publica cambios, este es el ÚNICO archivo que hay que actualizar.
 */

export interface TariffRow {
  /** Límite inferior del tramo */
  lower: number;
  /** Cuota fija del tramo */
  fixed: number;
  /** Tasa sobre el excedente del límite inferior (0.0192 = 1.92 %) */
  rate: number;
}

export const FISCAL_YEAR = 2026;
export const IVA_RATE = 0.16;

/** Tarifa ANUAL art. 152 LISR 2026 (límites superiores implícitos en la siguiente fila). */
export const ISR_ANNUAL_2026: readonly TariffRow[] = [
  { lower: 0.01, fixed: 0, rate: 0.0192 },
  { lower: 10_135.12, fixed: 194.59, rate: 0.064 },
  { lower: 86_022.12, fixed: 5_051.37, rate: 0.1088 },
  { lower: 151_176.2, fixed: 12_140.13, rate: 0.16 },
  { lower: 175_735.67, fixed: 16_069.64, rate: 0.1792 },
  { lower: 210_403.7, fixed: 22_282.14, rate: 0.2136 },
  { lower: 424_353.98, fixed: 67_981.92, rate: 0.2352 },
  { lower: 668_840.15, fixed: 125_485.07, rate: 0.3 },
  { lower: 1_276_925.99, fixed: 307_910.81, rate: 0.32 },
  { lower: 1_702_567.98, fixed: 444_116.23, rate: 0.34 },
  { lower: 5_107_703.93, fixed: 1_601_862.46, rate: 0.35 },
];

/** Tarifa MENSUAL art. 96 LISR 2026 (se publica como referencia en /tablas-isr-2026). */
export const ISR_MONTHLY_2026: readonly TariffRow[] = [
  { lower: 0.01, fixed: 0, rate: 0.0192 },
  { lower: 844.6, fixed: 16.22, rate: 0.064 },
  { lower: 7_168.52, fixed: 420.95, rate: 0.1088 },
  { lower: 12_598.03, fixed: 1_011.68, rate: 0.16 },
  { lower: 14_644.65, fixed: 1_339.14, rate: 0.1792 },
  { lower: 17_533.65, fixed: 1_856.84, rate: 0.2136 },
  { lower: 35_362.84, fixed: 5_665.16, rate: 0.2352 },
  { lower: 55_736.69, fixed: 10_457.09, rate: 0.3 },
  { lower: 106_410.51, fixed: 25_659.23, rate: 0.32 },
  { lower: 141_880.67, fixed: 37_009.69, rate: 0.34 },
  { lower: 425_642, fixed: 133_488.54, rate: 0.35 },
];

export interface ResicoRow {
  monthlyUpTo: number;
  annualUpTo: number;
  rate: number;
}

/** RESICO personas físicas, art. 113-E LISR. La tasa aplica sobre el TOTAL cobrado (no es marginal). */
export const RESICO_PF_2026: readonly ResicoRow[] = [
  { monthlyUpTo: 25_000, annualUpTo: 300_000, rate: 0.01 },
  { monthlyUpTo: 50_000, annualUpTo: 600_000, rate: 0.011 },
  { monthlyUpTo: 83_333.33, annualUpTo: 1_000_000, rate: 0.015 },
  { monthlyUpTo: 208_333.33, annualUpTo: 2_500_000, rate: 0.02 },
  { monthlyUpTo: 3_500_000, annualUpTo: 3_500_000, rate: 0.025 },
];

/** Tope anual de ingresos para tributar en RESICO personas físicas en 2026. */
export const RESICO_ANNUAL_CAP = 3_500_000;

export const SOURCES = {
  isr: "Anexo 8 de la Resolución Miscelánea Fiscal 2026 (DOF 28-12-2025)",
  resico: "Artículo 113-E de la Ley del ISR",
  iva: "Artículo 29, fracción IV de la Ley del IVA (exportación de servicios)",
} as const;
