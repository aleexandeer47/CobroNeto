/**
 * Tarifas fiscales El Salvador 2026.
 *
 * ISR personas naturales: art. 37 de la Ley de Impuesto sobre la Renta, reformado por el
 * Decreto Legislativo No. 293 (D.O. 30-04-2025), que amplió la renta exenta a $6,600 al año.
 * Tablas de retención mensual: Decreto Ejecutivo No. 10 (30-04-2025).
 * IVA: 13 % (art. 54 Ley de IVA); exportación de servicios al 0 % (arts. 74 y 75).
 *
 * Si Hacienda publica cambios, este es el ÚNICO archivo que hay que actualizar.
 */

export interface TariffRow {
  /** Límite inferior del tramo (el tramo aplica desde lower + 0.01). */
  lower: number;
  /** Cuota fija del tramo */
  fixed: number;
  /** Tasa sobre el exceso del límite inferior (0.1 = 10 %) */
  rate: number;
}

export const FISCAL_YEAR = 2026;
export const IVA_RATE = 0.13;

/**
 * Tabla ANUAL del art. 37 LISR para personas naturales (límites superiores implícitos en la siguiente fila).
 * Ojo: la ley mantiene la cuota fija de $212.12 en el tramo II aunque la base exenta subió a $6,600,
 * por eso el impuesto "salta" al cruzar $6,600 y al cruzar $9,142.86. Es así en el texto legal.
 */
export const ISR_ANNUAL_2026: readonly TariffRow[] = [
  { lower: 0, fixed: 0, rate: 0 },
  { lower: 6_600, fixed: 212.12, rate: 0.1 },
  { lower: 9_142.86, fixed: 720, rate: 0.2 },
  { lower: 22_857.14, fixed: 3_462.86, rate: 0.3 },
];

/** Tabla de retención MENSUAL para salarios (Decreto Ejecutivo No. 10). Se publica como referencia. */
export const ISR_MONTHLY_2026: readonly TariffRow[] = [
  { lower: 0, fixed: 0, rate: 0 },
  { lower: 550, fixed: 17.67, rate: 0.1 },
  { lower: 895.24, fixed: 60, rate: 0.2 },
  { lower: 2_038.1, fixed: 288.57, rate: 0.3 },
];

/** Retención de ISR que hace un cliente salvadoreño (agente de retención) a una persona natural por servicios. */
export const RETENCION_SERVICIOS = 0.1;

/**
 * Por debajo de este monto anual de ventas/servicios no estás obligado a inscribirte como
 * contribuyente de IVA (pequeño contribuyente, art. 28 Ley de IVA; también hay un límite de activo).
 */
export const IVA_UMBRAL_INSCRIPCION = 5_714.29;

export const SOURCES = {
  isr: "Art. 37 de la Ley de Impuesto sobre la Renta, reformado por el D.L. No. 293 (D.O. 30-04-2025)",
  retencion: "Decreto Ejecutivo No. 10, Tablas de Retención del Impuesto sobre la Renta (30-04-2025)",
  iva: "Arts. 19, 74 y 75 de la Ley de IVA (exportación de servicios a tasa 0 %)",
} as const;
