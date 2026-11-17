import { cacheLife } from "next/cache";

export interface TipoCambio {
  valor: number;
  /** Fecha AAAA-MM-DD de la cotización, o null si es el valor de respaldo. */
  fecha: string | null;
}

/** Valor de respaldo si la API no responde. El usuario siempre puede editarlo. */
export const TIPO_CAMBIO_RESPALDO = 18.5;

// URL fija en código: el usuario nunca controla a dónde hace peticiones el servidor (sin SSRF).
const ENDPOINT = "https://api.frankfurter.dev/v1/latest?base=USD&symbols=MXN";

/**
 * Tipo de cambio USD→MXN de referencia (Banco Central Europeo vía Frankfurter).
 * Se cachea varias horas; ante cualquier fallo devuelve el respaldo.
 */
export async function getTipoCambio(): Promise<TipoCambio> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(ENDPOINT, {
      signal: AbortSignal.timeout(4000),
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: unknown = await res.json();

    const valor = (data as { rates?: { MXN?: unknown } })?.rates?.MXN;
    const fecha = (data as { date?: unknown })?.date;
    if (typeof valor !== "number" || !Number.isFinite(valor) || valor < 5 || valor > 60) {
      throw new Error("Respuesta inválida");
    }
    return {
      valor: Math.round(valor * 10_000) / 10_000,
      fecha: typeof fecha === "string" && /^\d{4}-\d{2}-\d{2}$/.test(fecha) ? fecha : null,
    };
  } catch {
    return { valor: TIPO_CAMBIO_RESPALDO, fecha: null };
  }
}
