import type { Metadata } from "next";
import Link from "next/link";
import { fmtMXNCents, fmtPct } from "@/lib/format";
import {
  FISCAL_YEAR,
  ISR_ANNUAL_2026,
  ISR_MONTHLY_2026,
  RESICO_PF_2026,
  SOURCES,
  type TariffRow,
} from "@/lib/tax/tables2026";

export const metadata: Metadata = {
  title: `Tablas ISR ${FISCAL_YEAR}: tarifa mensual, anual y RESICO`,
  description: `Tarifas de ISR ${FISCAL_YEAR} para personas físicas: tabla mensual (art. 96), anual (art. 152) y tasas RESICO, con límites, cuota fija y porcentaje. ${SOURCES.isr}.`,
  alternates: { canonical: "/tablas-isr-2026" },
};

function TariffTable({ rows, caption }: { rows: readonly TariffRow[]; caption: string }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-line">
      <table className="num w-full min-w-[620px] text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface font-sans">
          <tr>
            {["Límite inferior", "Límite superior", "Cuota fija", "% sobre excedente"].map((h) => (
              <th key={h} scope="col" className="p-3 text-right font-semibold first:text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r, i) => {
            const next = rows[i + 1];
            return (
              <tr key={r.lower}>
                <td className="p-3">{fmtMXNCents(r.lower)}</td>
                <td className="p-3 text-right">{next ? fmtMXNCents(next.lower - 0.01) : "En adelante"}</td>
                <td className="p-3 text-right">{fmtMXNCents(r.fixed)}</td>
                <td className="p-3 text-right">{fmtPct(r.rate)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function TablasIsr() {
  return (
    <article className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
        Tablas ISR {FISCAL_YEAR}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Tarifas para personas físicas vigentes en {FISCAL_YEAR}, actualizadas por inflación. Fuente: {SOURCES.isr}.
      </p>

      <nav aria-label="En esta página" className="mt-6 flex flex-wrap gap-2 text-sm">
        {[
          ["#mensual", "Tarifa mensual"],
          ["#anual", "Tarifa anual"],
          ["#resico", "Tasas RESICO"],
          ["#como-usar", "Cómo se usa"],
        ].map(([href, label]) => (
          <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-md border border-line px-3 hover:border-ink">
            {label}
          </a>
        ))}
      </nav>

      <section id="mensual" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-semibold tracking-tight">Tarifa mensual {FISCAL_YEAR} (art. 96 LISR)</h2>
        <p className="mt-2 text-muted">Para retenciones de salarios y pagos provisionales mensuales.</p>
        <TariffTable rows={ISR_MONTHLY_2026} caption={`Tarifa mensual ISR ${FISCAL_YEAR}`} />
      </section>

      <section id="anual" className="mt-14 scroll-mt-6">
        <h2 className="text-2xl font-semibold tracking-tight">Tarifa anual {FISCAL_YEAR} (art. 152 LISR)</h2>
        <p className="mt-2 text-muted">Para la declaración anual del ejercicio {FISCAL_YEAR}.</p>
        <TariffTable rows={ISR_ANNUAL_2026} caption={`Tarifa anual ISR ${FISCAL_YEAR}`} />
      </section>

      <section id="resico" className="mt-14 scroll-mt-6">
        <h2 className="text-2xl font-semibold tracking-tight">Tasas RESICO personas físicas</h2>
        <p className="mt-2 text-muted">{SOURCES.resico}. La tasa se aplica sobre el total cobrado en el periodo.</p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="num w-full min-w-[420px] text-sm">
            <thead className="bg-surface font-sans">
              <tr>
                <th scope="col" className="p-3 text-left font-semibold">
                  Ingresos mensuales hasta
                </th>
                <th scope="col" className="p-3 text-right font-semibold">
                  Ingresos anuales hasta
                </th>
                <th scope="col" className="p-3 text-right font-semibold">
                  Tasa
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {RESICO_PF_2026.map((r) => (
                <tr key={r.rate}>
                  <td className="p-3">{fmtMXNCents(r.monthlyUpTo)}</td>
                  <td className="p-3 text-right">{fmtMXNCents(r.annualUpTo)}</td>
                  <td className="p-3 text-right">{fmtPct(r.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="como-usar" className="prose-cn mt-6 scroll-mt-6">
        <h2>Cómo se usa la tarifa</h2>
        <p>
          1) Ubica tu base gravable entre el límite inferior y el superior. 2) Réstale el límite inferior. 3) Multiplica
          ese excedente por el porcentaje. 4) Súmale la cuota fija. El resultado es el ISR antes de subsidios o
          retenciones.
        </p>
        <p>
          <strong>Ejemplo:</strong> con una base anual de $100,000 caes en el tramo que empieza en $86,022.12. El
          excedente es $13,977.88; por 10.88 % da $1,520.79; más la cuota fija de $5,051.37, el ISR anual es{" "}
          <strong>$6,572.16</strong>.
        </p>
        <p>
          ¿Cobras en dólares? Deja que la <Link href="/">calculadora</Link> haga esto por ti y lo compare con RESICO.
        </p>
      </section>
    </article>
  );
}
