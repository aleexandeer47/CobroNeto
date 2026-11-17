import type { CalcInput, CalcResult, RegimenResult } from "@/lib/tax/calculate";
import { fmtDec, fmtMXN, fmtNum, fmtPct, fmtUSD } from "@/lib/format";
import { FISCAL_YEAR } from "@/lib/tax/tables2026";

const SEGMENTOS = [
  { key: "neto", label: "Te queda", color: "var(--seg-neto)" },
  { key: "isr", label: "ISR", color: "var(--seg-isr)" },
  { key: "iva", label: "IVA", color: "var(--seg-iva)" },
  { key: "com", label: "Comisión", color: "var(--seg-com)" },
  { key: "gastos", label: "Gastos", color: "var(--seg-gastos)" },
] as const;

export function Result({ result, input }: { result: CalcResult; input: CalcInput }) {
  const [resico, actividad] = result.regimenes;
  const mejor = result.recomendado ? result.regimenes.find((r) => r.id === result.recomendado)! : null;
  const otro = mejor ? result.regimenes.find((r) => r.id !== mejor.id)! : null;

  return (
    <section aria-labelledby="resultado" className="rounded-lg border border-line">
      <div aria-live="polite" className="px-4 py-5 sm:px-6">
        <h2 id="resultado" className="text-sm font-medium text-muted">
          Resultado estimado, por mes
        </h2>
        {mejor && otro ? (
          <>
            <p className="mt-2 text-2xl font-semibold leading-snug tracking-tight sm:text-[1.75rem]">
              En {nombreCorto(mejor)} te quedan <span className="num text-accent">{fmtMXN(mejor.netoMensual)}</span>{" "}
              al mes.
            </p>
            <p className="mt-2 text-muted">
              {result.ahorroMensual > 0 && otro.elegible ? (
                <>
                  Son <span className="num text-ink">{fmtMXN(result.ahorroMensual)}</span> más que en{" "}
                  {nombreCorto(otro)}: <span className="num text-ink">{fmtMXN(result.ahorroMensual * 12)}</span> al año.
                </>
              ) : !resico.elegible ? (
                <>Con este ingreso superas el tope de RESICO (3.5 millones al año), así que tributarías en Actividad Empresarial.</>
              ) : (
                <>Ambos regímenes te dejan lo mismo.</>
              )}
            </p>
          </>
        ) : (
          <p className="mt-2 text-2xl font-semibold tracking-tight">Escribe cuánto cobras para ver el cálculo.</p>
        )}
      </div>

      {result.brutoMXN > 0 && (
        <div className="space-y-4 border-t border-line px-4 py-5 sm:px-6" aria-hidden>
          {result.regimenes
            .filter((r) => r.elegible)
            .map((r) => (
              <Barra key={r.id} r={r} result={result} />
            ))}
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
        <table className="w-full min-w-[22rem] text-sm">
          <caption className="sr-only">Desglose por régimen</caption>
          <thead>
            <tr className="border-b border-line bg-surface text-left">
              <th scope="col" className="px-4 py-2.5 font-medium sm:px-6">
                Concepto
              </th>
              <Th mejor={result.recomendado === "resico"}>RESICO</Th>
              <Th mejor={result.recomendado === "actividad"}>Act. Empresarial</Th>
            </tr>
          </thead>
          <tbody className="num divide-y divide-line">
            <Tr
              label={`Cobro (${fmtUSD(input.ingresoUSD)} × ${fmtNum(input.tipoCambio)})`}
              a={fmtMXN(result.brutoMXN)}
              b={fmtMXN(result.brutoMXN)}
            />
            <Tr label={`Comisión ${fmtDec(input.comisionPct)} %`} a={menos(result.comisionMXN)} b={menos(result.comisionMXN)} />
            <Tr
              label={result.ivaAcreditable > 0 ? "Gastos con IVA" : "Gastos"}
              a={menos(result.gastosTotalesMXN)}
              b={menos(result.gastosTotalesMXN)}
            />
            <Tr
              label={`ISR${resico.elegible ? ` (RESICO ${fmtPct(resico.tasaAplicada)})` : ""}`}
              a={resico.elegible ? menos(resico.isrMensual) : "No aplica"}
              b={menos(actividad.isrMensual)}
            />
            <Tr
              label="IVA a pagar"
              a={resico.elegible ? menos(resico.ivaPorPagar) : "—"}
              b={menos(actividad.ivaPorPagar)}
            />
            <Tr
              label="Impuestos sobre lo cobrado"
              a={resico.elegible ? fmtPct(resico.tasaEfectiva) : "—"}
              b={fmtPct(actividad.tasaEfectiva)}
            />
            <tr className="font-sans">
              <th scope="row" className="px-4 py-3 text-left font-semibold sm:px-6">
                Te queda
              </th>
              <Td strong mejor={result.recomendado === "resico"}>
                {resico.elegible ? fmtMXN(resico.netoMensual) : "—"}
              </Td>
              <Td strong mejor={result.recomendado === "actividad"}>
                {fmtMXN(actividad.netoMensual)}
              </Td>
            </tr>
          </tbody>
        </table>
      </div>

      {result.ivaSaldoAFavor > 0 && (
        <p className="border-t border-warn-line bg-warn-tint px-4 py-3 text-sm leading-relaxed sm:px-6">
          Tienes <span className="num font-medium">{fmtMXN(result.ivaSaldoAFavor)}</span> al mes de IVA a favor por tus
          gastos. Al exportar a tasa 0 % puedes pedir su devolución; no lo sumamos a lo que te queda.
        </p>
      )}

      <p className="border-t border-line px-4 py-3 text-xs leading-relaxed text-muted sm:px-6">
        Tarifas SAT {FISCAL_YEAR}, ingresos iguales cada mes. Sin deducciones personales ni retenciones de otros
        países. No es asesoría fiscal.
      </p>
    </section>
  );
}

const nombreCorto = (r: RegimenResult) => (r.id === "resico" ? "RESICO" : "Actividad Empresarial");
const menos = (n: number) => (n > 0 ? `−${fmtMXN(n)}` : fmtMXN(0));

function Barra({ r, result }: { r: RegimenResult; result: CalcResult }) {
  const total = result.brutoMXN;
  const partes: Record<(typeof SEGMENTOS)[number]["key"], number> = {
    neto: Math.max(0, r.netoMensual),
    isr: r.isrMensual,
    iva: r.ivaPorPagar,
    com: result.comisionMXN,
    gastos: result.gastosTotalesMXN,
  };
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="font-medium">{nombreCorto(r)}</span>
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

function Th({ children, mejor }: { children: React.ReactNode; mejor: boolean }) {
  return (
    <th scope="col" className={`px-4 py-2.5 text-right font-medium sm:px-6 ${mejor ? "bg-accent-tint" : ""}`}>
      {children}
      {mejor && <span className="block text-xs font-normal text-accent">Mejor opción</span>}
    </th>
  );
}

function Tr({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <tr>
      <th scope="row" className="px-4 py-2.5 text-left font-sans font-normal text-muted sm:px-6">
        {label}
      </th>
      <td className="px-4 py-2.5 text-right sm:px-6">{a}</td>
      <td className="px-4 py-2.5 text-right sm:px-6">{b}</td>
    </tr>
  );
}

function Td({ children, mejor, strong }: { children: React.ReactNode; mejor: boolean; strong?: boolean }) {
  return (
    <td
      className={`num px-4 py-3 text-right sm:px-6 ${strong ? "text-base font-semibold" : ""} ${
        mejor ? "bg-accent-tint text-accent" : ""
      }`}
    >
      {children}
    </td>
  );
}
