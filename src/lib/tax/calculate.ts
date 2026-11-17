import {
  IVA_RATE,
  ISR_ANNUAL_2026,
  RESICO_ANNUAL_CAP,
  RESICO_PF_2026,
  type TariffRow,
} from "./tables2026";

export interface CalcInput {
  /** Lo que cobras al mes, en USD, antes de comisiones. */
  ingresoUSD: number;
  /** Comisión de la plataforma, en porcentaje (10 = 10 %). */
  comisionPct: number;
  /** Pesos por dólar. */
  tipoCambio: number;
  /** Gastos deducibles mensuales con factura, en MXN, sin IVA. */
  gastosMXN: number;
  /** Si tus gastos causan IVA del 16 % (acreditable). */
  gastosConIVA: boolean;
  /** Si el servicio califica como exportación (IVA 0 %). */
  exportacion: boolean;
}

export type RegimenId = "resico" | "actividad";

export interface RegimenResult {
  id: RegimenId;
  nombre: string;
  elegible: boolean;
  isrMensual: number;
  ivaPorPagar: number;
  /** Lo que te queda después de comisión, gastos e impuestos. */
  netoMensual: number;
  /** (ISR + IVA por pagar) / cobro bruto */
  tasaEfectiva: number;
  /** Tasa o tramo aplicado, para mostrar. */
  tasaAplicada: number;
}

export interface CalcResult {
  brutoMXN: number;
  comisionMXN: number;
  /** Ingreso para ISR (sin IVA). */
  ingresoGravable: number;
  ivaTrasladado: number;
  ivaAcreditable: number;
  /** IVA a favor que podrías solicitar en devolución (no se suma al neto). */
  ivaSaldoAFavor: number;
  gastosTotalesMXN: number;
  regimenes: [RegimenResult, RegimenResult];
  recomendado: RegimenId | null;
  /** Diferencia mensual entre el mejor y el otro régimen. */
  ahorroMensual: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Aplica una tarifa progresiva (art. 96 / 152 LISR) a una base. */
export function applyTariff(base: number, table: readonly TariffRow[]): number {
  if (!(base > 0)) return 0;
  let row = table[0];
  for (const r of table) {
    if (base >= r.lower) row = r;
    else break;
  }
  return row.fixed + (base - row.lower) * row.rate;
}

/** ISR anual de personas físicas con actividad empresarial/profesional sobre la utilidad anual. */
export function isrAnualActividad(utilidadAnual: number): number {
  return applyTariff(utilidadAnual, ISR_ANNUAL_2026);
}

/** Tasa RESICO correspondiente al ingreso mensual cobrado (sin IVA). */
export function resicoRate(ingresoMensual: number): number {
  if (!(ingresoMensual > 0)) return RESICO_PF_2026[0].rate;
  const row = RESICO_PF_2026.find((r) => ingresoMensual <= r.monthlyUpTo);
  return (row ?? RESICO_PF_2026[RESICO_PF_2026.length - 1]).rate;
}

export function calculate(input: CalcInput): CalcResult {
  const brutoMXN = input.ingresoUSD * input.tipoCambio;
  const comisionMXN = brutoMXN * (input.comisionPct / 100);

  // Si NO es exportación, asumimos que el precio que cobras ya incluye el IVA (escenario conservador).
  const ingresoGravable = input.exportacion ? brutoMXN : brutoMXN / (1 + IVA_RATE);
  const ivaTrasladado = brutoMXN - ingresoGravable;
  const ivaAcreditable = input.gastosConIVA ? input.gastosMXN * IVA_RATE : 0;
  const ivaNeto = ivaTrasladado - ivaAcreditable;
  const ivaPorPagar = Math.max(0, ivaNeto);
  const ivaSaldoAFavor = Math.max(0, -ivaNeto);
  const gastosTotalesMXN = input.gastosMXN + ivaAcreditable;

  const salidaComun = comisionMXN + gastosTotalesMXN + ivaPorPagar;

  // RESICO: tasa fija sobre ingresos cobrados, sin deducciones.
  const tasaResico = resicoRate(ingresoGravable);
  const isrResico = ingresoGravable * tasaResico;
  const elegibleResico = ingresoGravable * 12 <= RESICO_ANNUAL_CAP;

  // Actividad empresarial/profesional: tarifa progresiva sobre la utilidad (ingresos − deducciones).
  // Estimamos el ISR anual con ingresos constantes y lo repartimos en 12 meses.
  const utilidadMensual = Math.max(0, ingresoGravable - comisionMXN - input.gastosMXN);
  const isrActividad = isrAnualActividad(utilidadMensual * 12) / 12;
  const tasaActividad = utilidadMensual > 0 ? isrActividad / utilidadMensual : 0;

  const build = (
    id: RegimenId,
    nombre: string,
    elegible: boolean,
    isr: number,
    tasaAplicada: number,
  ): RegimenResult => ({
    id,
    nombre,
    elegible,
    isrMensual: round2(isr),
    ivaPorPagar: round2(ivaPorPagar),
    netoMensual: round2(brutoMXN - salidaComun - isr),
    tasaEfectiva: brutoMXN > 0 ? (isr + ivaPorPagar) / brutoMXN : 0,
    tasaAplicada,
  });

  const resico = build("resico", "RESICO", elegibleResico, isrResico, tasaResico);
  const actividad = build(
    "actividad",
    "Actividad Empresarial",
    true,
    isrActividad,
    tasaActividad,
  );

  let recomendado: RegimenId | null = null;
  let ahorroMensual = 0;
  if (brutoMXN > 0) {
    if (!resico.elegible) {
      recomendado = "actividad";
    } else {
      recomendado = resico.netoMensual >= actividad.netoMensual ? "resico" : "actividad";
      ahorroMensual = round2(Math.abs(resico.netoMensual - actividad.netoMensual));
    }
  }

  return {
    brutoMXN: round2(brutoMXN),
    comisionMXN: round2(comisionMXN),
    ingresoGravable: round2(ingresoGravable),
    ivaTrasladado: round2(ivaTrasladado),
    ivaAcreditable: round2(ivaAcreditable),
    ivaSaldoAFavor: round2(ivaSaldoAFavor),
    gastosTotalesMXN: round2(gastosTotalesMXN),
    regimenes: [resico, actividad],
    recomendado,
    ahorroMensual,
  };
}
