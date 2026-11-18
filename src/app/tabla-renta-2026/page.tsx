import type { Metadata } from "next";
import Link from "next/link";
import { fmtPct, fmtUSDCents } from "@/lib/format";
import { FISCAL_YEAR, ISR_ANNUAL_2026, ISR_MONTHLY_2026, SOURCES, type TariffRow } from "@/lib/tax/tables2026";

export const metadata: Metadata = {
  title: `Tabla de renta ${FISCAL_YEAR} El Salvador: anual y de retención mensual`,
  description: `Tabla del impuesto sobre la renta ${FISCAL_YEAR} para personas naturales en El Salvador: tabla anual del art. 37 y tabla de retención mensual, con tramos, cuota fija y porcentaje.`,
  alternates: { canonical: "/tabla-renta-2026" },
};

function TariffTable({ rows, caption }: { rows: readonly TariffRow[]; caption: string }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-line">
      <table className="num w-full min-w-[640px] text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface font-sans">
          <tr>
            {["Tramo", "Desde", "Hasta", "%", "Sobre el exceso de", "Más cuota fija"].map((h) => (
              <th key={h} scope="col" className="p-3 text-right font-semibold first:text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r, i) => {
            const next = rows[i + 1];
            const exento = r.rate === 0;
            return (
              <tr key={r.lower}>
                <td className="p-3 font-sans">{["I", "II", "III", "IV"][i]}</td>
                <td className="p-3 text-right">{fmtUSDCents(r.lower + 0.01)}</td>
                <td className="p-3 text-right">{next ? fmtUSDCents(next.lower) : "En adelante"}</td>
                <td className="p-3 text-right">{exento ? "Exento" : fmtPct(r.rate)}</td>
                <td className="p-3 text-right">{exento ? "—" : fmtUSDCents(r.lower)}</td>
                <td className="p-3 text-right">{exento ? "—" : fmtUSDCents(r.fixed)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function TablaRenta() {
  return (
    <article className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
        Tabla de renta {FISCAL_YEAR}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Impuesto sobre la renta de personas naturales en El Salvador, vigente en {FISCAL_YEAR}. Fuente: {SOURCES.isr}.
      </p>

      <nav aria-label="En esta página" className="mt-6 flex flex-wrap gap-2 text-sm">
        {[
          ["#anual", "Tabla anual"],
          ["#mensual", "Retención mensual"],
          ["#como-usar", "Cómo se usa"],
        ].map(([href, label]) => (
          <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-md border border-line px-3 hover:border-ink">
            {label}
          </a>
        ))}
      </nav>

      <section id="anual" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-semibold tracking-tight">Tabla anual (art. 37 LISR)</h2>
        <p className="mt-2 text-muted">
          La que usas en tu declaración anual si trabajas por tu cuenta. Se aplica sobre la renta neta: ingresos menos
          costos y gastos deducibles.
        </p>
        <TariffTable rows={ISR_ANNUAL_2026} caption={`Tabla anual de renta ${FISCAL_YEAR}`} />
      </section>

      <section id="mensual" className="mt-14 scroll-mt-6">
        <h2 className="text-2xl font-semibold tracking-tight">Tabla de retención mensual (salarios)</h2>
        <p className="mt-2 text-muted">
          La que usa un patrono para retener renta de un salario mensual. {SOURCES.retencion}. Si trabajas como
          freelancer no te aplica, pero sirve de referencia.
        </p>
        <TariffTable rows={ISR_MONTHLY_2026} caption={`Tabla de retención mensual ${FISCAL_YEAR}`} />
      </section>

      <section id="como-usar" className="prose-cn mt-6 scroll-mt-6">
        <h2>Cómo se usa la tabla</h2>
        <p>
          1) Ubica tu renta neta del año entre el &ldquo;desde&rdquo; y el &ldquo;hasta&rdquo;. 2) Réstale el monto
          de &ldquo;sobre el exceso de&rdquo;. 3) Multiplica ese excedente por el porcentaje. 4) Súmale la cuota fija.
          El resultado es tu impuesto del año.
        </p>
        <p>
          <strong>Ejemplo:</strong> con una renta neta anual de $19,200 caes en el tramo III. El excedente sobre
          $9,142.86 es $10,057.14; por 20 % da $2,011.43; más la cuota fija de $720.00, el impuesto del año es{" "}
          <strong>$2,731.43</strong>.
        </p>
        <h3>Un detalle de la reforma de 2025</h3>
        <p>
          La reforma subió el monto exento de $4,064 a $6,600, pero dejó igual la cuota fija del tramo II ($212.12).
          Por eso, al pasar apenas de $6,600 el impuesto salta de $0 a unos $212, y hay otro salto al entrar al tramo
          III. Así está en la ley; la calculadora lo aplica tal cual.
        </p>
        <p>
          ¿No quieres hacer la cuenta a mano? La <Link href="/">calculadora</Link> lo hace con tu ingreso, tu comisión y
          tus gastos.
        </p>
      </section>
    </article>
  );
}
