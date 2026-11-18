import type { CalcInput, CalcResult } from "@/lib/tax/calculate";
import { fmtDec, fmtPct, fmtUSD, fmtUSDCents } from "@/lib/format";
import { FISCAL_YEAR, ISR_ANNUAL_2026 } from "@/lib/tax/tables2026";

const SEGMENTOS = [
  { key: "neto", label: "Te queda", color: "var(--seg-neto)" },
  { key: "isr", label: "Renta (ISR)", color: "var(--seg-isr)" },
  { key: "iva", label: "IVA", color: "var(--seg-iva)" },
  { key: "com", label: "Comisión", color: "var(--seg-com)" },
  { key: "gastos", label: "Gastos", color: "var(--seg-gastos)" },
] as const;

const EXENTO_ANUAL = ISR_ANNUAL_2026[1].lower;

export function Result({ result, input }: { result: CalcResult; input: CalcInput }) {
  const hayCobro = result.bruto > 0;

  return (
    <section aria-labelledby="resultado" className="rounded-lg border border-line">
      <div aria-live="polite" className="px-4 py-5 sm:px-6">
        <h2 id="resultado" className="text-sm font-medium text-muted">
          Resultado estimado, por mes
        </h2>
        {hayCobro ? (
          <>
            <p className="mt-2 text-2xl font-semibold leading-snug tracking-tight sm:text-[1.75rem]">
              Te quedan <span className="num text-accent">{fmtUSD(result.netoMensual)}</span> al mes.
            </p>
            <p className="mt-2 text-muted">
              {result.apartarMensual > 0 ? (
                <>
                  Aparta <span className="num text-ink">{fmtUSD(result.apartarMensual)}</span> cada mes para impuestos:{" "}
                  <span className="num text-ink">{fmtUSD(result.apartarMensual * 12)}</span> al año.
                </>
              ) : (
                <>
                  Con esta renta no pagas impuesto sobre la renta: está exenta hasta {fmtUSD(EXENTO_ANUAL)} al año.
                </>
              )}
            </p>
          </>
        ) : (
          <p className="mt-2 text-2xl font-semibold tracking-tight">Escribe cuánto cobras para ver el cálculo.</p>
        )}
      </div>

      {hayCobro && (
        <div className="space-y-4 border-t border-line px-4 py-5 sm:px-6" aria-hidden>
          <Barra result={result} />
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            {SEGMENTOS.map((s) => (
              <li key={s.key} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: s.color }} />
                {s.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="overflow-x-auto border-t border-line">
        <table className="w-full min-w-[20rem] text-sm">
          <caption className="sr-only">Desglose del mes</caption>
          <thead>
            <tr className="border-b border-line bg-surface text-left">
              <th scope="col" className="px-4 py-2.5 font-medium sm:px-6">
                Concepto
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium sm:px-6">
                Al mes
              </th>
            </tr>
          </thead>
          <tbody className="num divide-y divide-line">
            <Tr label="Cobro" value={fmtUSDCents(result.bruto)} />
            <Tr label={`Comisión ${fmtDec(input.comisionPct)} %`} value={menos(result.comision)} />
            <Tr label={result.ivaCredito > 0 ? "Gastos con IVA" : "Gastos"} value={menos(result.gastosTotales)} />
            <Tr
              label={
                result.tasaMarginal > 0
                  ? `Renta (ISR), tramo del ${fmtPct(result.tasaMarginal)}`
                  : "Renta (ISR), tramo exento"
              }
              value={menos(result.isrMensual)}
            />
            <Tr label="IVA a pagar" value={menos(result.ivaPorPagar)} />
            <Tr label="Impuestos sobre lo cobrado" value={fmtPct(result.tasaEfectiva)} />
            <tr className="font-sans">
              <th scope="row" className="px-4 py-3 text-left font-semibold sm:px-6">
                Te queda
              </th>
              <td className="num bg-accent-tint px-4 py-3 text-right text-base font-semibold text-accent sm:px-6">
                {fmtUSDCents(result.netoMensual)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {hayCobro && (
        <p className="border-t border-line px-4 py-3 text-sm leading-relaxed text-muted sm:px-6">
          Renta neta anual estimada: <span className="num text-ink">{fmtUSDCents(result.rentaNetaAnual)}</span>. ISR del
          año: <span className="num text-ink">{fmtUSDCents(result.isrAnual)}</span>, que se liquida en la declaración
          anual.
        </p>
      )}

      {result.ivaSaldoAFavor > 0 && (
        <p className="border-t border-warn-line bg-warn-tint px-4 py-3 text-sm leading-relaxed sm:px-6">
          Tienes <span className="num font-medium">{fmtUSDCents(result.ivaSaldoAFavor)}</span> al mes de IVA a favor por
          tus gastos. Como exportador puedes solicitar su devolución; no lo sumamos a lo que te queda.
        </p>
      )}

      <p className="border-t border-line px-4 py-3 text-xs leading-relaxed text-muted sm:px-6">
        Tabla del art. 37 de la Ley de Impuesto sobre la Renta vigente en {FISCAL_YEAR}, ingresos iguales cada mes.
        Sin deducciones personales, retenciones ni impuestos de otros países. No es asesoría fiscal.
      </p>
    </section>
  );
}

const menos = (n: number) => (n > 0 ? `−${fmtUSDCents(n)}` : fmtUSDCents(0));

function Barra({ result }: { result: CalcResult }) {
  const total = result.bruto;
  const partes: Record<(typeof SEGMENTOS)[number]["key"], number> = {
    neto: Math.max(0, result.netoMensual),
    isr: result.isrMensual,
    iva: result.ivaPorPagar,
    com: result.comision,
    gastos: result.gastosTotales,
  };
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="font-medium">A dónde va cada dólar</span>
        <span className="text-muted">
          <span className="num">{fmtPct(partes.neto / total)}</span> para ti
        </span>
      </div>
      <div className="flex h-3 overflow-hidden rounded-[3px] bg-surface">
        {SEGMENTOS.map((s) =>
          partes[s.key] > 0 ? (
            <span
              key={s.key}
              className="h-full transition-[width] duration-200 ease-out"
              style={{ width: `${(partes[s.key] / total) * 100}%`, background: s.color }}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}

function Tr({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <th scope="row" className="px-4 py-2.5 text-left font-sans font-normal text-muted sm:px-6">
        {label}
      </th>
      <td className="px-4 py-2.5 text-right sm:px-6">{value}</td>
    </tr>
  );
}
