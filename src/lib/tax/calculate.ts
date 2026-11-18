import { ISR_ANNUAL_2026, IVA_RATE, type TariffRow } from "./tables2026";

export interface CalcInput {
  /** Lo que cobras al mes, en USD, antes de comisiones. */
  ingresoUSD: number;
  /** Comisión de la plataforma, en porcentaje (10 = 10 %). */
  comisionPct: number;
  /** Costos y gastos deducibles mensuales con comprobante, en USD, sin IVA. */
  gastosUSD: number;
  /** Si tus gastos pagan IVA del 13 % (crédito fiscal). */
  gastosConIVA: boolean;
  /** Si el servicio califica como exportación (IVA 0 %). */
  exportacion: boolean;
}

export interface CalcResult {
  bruto: number;
  comision: number;
  /** Ingreso sin IVA. */
  ingresoGravable: number;
  /** Ingreso menos comisión y gastos, al mes. */
  rentaNetaMensual: number;
  rentaNetaAnual: number;
  isrAnual: number;
  isrMensual: number;
  /** Tasa del tramo en el que cae tu renta neta anual. */
  tasaMarginal: number;
  ivaDebito: number;
  ivaCredito: number;
  ivaPorPagar: number;
  /** IVA a favor que podrías pedir en devolución como exportador (no se suma al neto). */
  ivaSaldoAFavor: number;
  gastosTotales: number;
  /** Lo que te queda después de comisión, gastos e impuestos. */
  netoMensual: number;
  /** ISR + IVA por pagar, lo que conviene apartar cada mes. */
  apartarMensual: number;
  /** (ISR + IVA por pagar) / cobro bruto */
  tasaEfectiva: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Busca el tramo de una tabla progresiva: cada tramo empieza en lower + 0.01. */
function tramo(base: number, table: readonly TariffRow[]): TariffRow {
  let row = table[0];
  for (const r of table) {
    if (base > r.lower) row = r;
    else break;
  }
  return row;
}

/** Aplica una tabla progresiva del art. 37 LISR a una base. */
export function applyTariff(base: number, table: readonly TariffRow[]): number {
  if (!(base > 0)) return 0;
  const row = tramo(base, table);
  return row.fixed + (base - row.lower) * row.rate;
}

/** ISR anual de una persona natural sobre su renta neta anual. */
export function isrAnual(rentaNetaAnual: number): number {
  return applyTariff(rentaNetaAnual, ISR_ANNUAL_2026);
}

export function calculate(input: CalcInput): CalcResult {
  const bruto = input.ingresoUSD;
  const comision = bruto * (input.comisionPct / 100);

  // Si NO es exportación, asumimos que el precio que cobras ya incluye el IVA (escenario conservador).
  const ingresoGravable = input.exportacion ? bruto : bruto / (1 + IVA_RATE);
  const ivaDebito = bruto - ingresoGravable;
  const ivaCredito = input.gastosConIVA ? input.gastosUSD * IVA_RATE : 0;
  const ivaNeto = ivaDebito - ivaCredito;
  const ivaPorPagar = Math.max(0, ivaNeto);
  const ivaSaldoAFavor = Math.max(0, -ivaNeto);
  const gastosTotales = input.gastosUSD + ivaCredito;

  // ISR: tabla anual sobre la renta neta (ingresos − costos y gastos deducibles).
  // Estimamos con ingresos constantes y repartimos en 12 meses.
  const rentaNetaMensual = Math.max(0, ingresoGravable - comision - input.gastosUSD);
  const rentaNetaAnual = rentaNetaMensual * 12;
  const isrAnualTotal = isrAnual(rentaNetaAnual);
  const isrMensual = isrAnualTotal / 12;
  const tasaMarginal = rentaNetaAnual > 0 ? tramo(rentaNetaAnual, ISR_ANNUAL_2026).rate : 0;

  const neto = bruto - comision - gastosTotales - ivaPorPagar - isrMensual;

  return {
    bruto: round2(bruto),
    comision: round2(comision),
    ingresoGravable: round2(ingresoGravable),
    rentaNetaMensual: round2(rentaNetaMensual),
    rentaNetaAnual: round2(rentaNetaAnual),
    isrAnual: round2(isrAnualTotal),
    isrMensual: round2(isrMensual),
    tasaMarginal,
    ivaDebito: round2(ivaDebito),
    ivaCredito: round2(ivaCredito),
    ivaPorPagar: round2(ivaPorPagar),
    ivaSaldoAFavor: round2(ivaSaldoAFavor),
    gastosTotales: round2(gastosTotales),
    netoMensual: round2(neto),
    apartarMensual: round2(isrMensual + ivaPorPagar),
    tasaEfectiva: bruto > 0 ? (isrMensual + ivaPorPagar) / bruto : 0,
  };
}
