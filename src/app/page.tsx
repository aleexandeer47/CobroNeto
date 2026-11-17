import Link from "next/link";
import { CalculatorSection } from "@/components/calculator/CalculatorSection";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { MoneyTools } from "@/components/MoneyTools";
import { Notes } from "@/components/Notes";
import { faqGeneral, plataformas } from "@/content/plataformas";
import { site } from "@/config/site";
import { FISCAL_YEAR } from "@/lib/tax/tables2026";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14">
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
          Calculadora de impuestos para freelancers que cobran en dólares
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          ISR e IVA en México con las tarifas SAT {FISCAL_YEAR}, para Upwork, Fiverr, YouTube, Deel o clientes del
          extranjero. Compara RESICO con Actividad Empresarial. Gratis, sin registro y sin enviar tus montos a ningún
          servidor.
        </p>
      </section>

      <section aria-label="Calculadora" className="mx-auto max-w-6xl px-4 sm:px-6">
        <CalculatorSection />
      </section>

      <div className="mt-20">
        <Notes
          id="como"
          title="Cómo hacemos la cuenta"
          items={[
            {
              titulo: "Conversión a pesos",
              texto:
                "Tu cobro en dólares por el tipo de cambio. Para el SAT vale el FIX que publica Banxico el día anterior a cada pago, así que puedes editar el campo.",
            },
            {
              titulo: "RESICO",
              texto:
                "Entre 1 % y 2.5 % de lo que cobras en el mes, según el monto, sin restar gastos. Tope de 3.5 millones al año.",
            },
            {
              titulo: "Actividad Empresarial",
              texto: `Tarifa progresiva ${FISCAL_YEAR} (de 1.92 % a 35 %) sobre tu utilidad: lo que cobras menos comisiones y gastos con factura.`,
            },
            {
              titulo: "IVA",
              texto:
                "0 % si exportas el servicio. Si no, asumimos que el 16 % va incluido en lo que cobras. El IVA de tus gastos se acredita.",
            },
          ]}
        >
          <p className="mt-4 text-sm text-muted">
            Más detalle en{" "}
            <Link href="/resico-vs-actividad-empresarial" className="text-accent underline underline-offset-4">
              RESICO vs Actividad Empresarial
            </Link>{" "}
            y en las{" "}
            <Link href="/tablas-isr-2026" className="text-accent underline underline-offset-4">
              tablas ISR {FISCAL_YEAR}
            </Link>
            .
          </p>
        </Notes>
      </div>

      <section aria-labelledby="guias" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
          <div>
            <h2 id="guias" className="text-2xl font-semibold tracking-tight">
              Guías por plataforma
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Cada una precarga la comisión de la plataforma y explica sus particularidades.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-muted">
                  <th scope="col" className="py-2.5 pr-4 font-normal">
                    Plataforma
                  </th>
                  <th scope="col" className="py-2.5 pr-4 text-right font-normal">
                    Comisión que usamos
                  </th>
                  <th scope="col" className="py-2.5 font-normal">
                    <span className="sr-only">Guía</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line border-b border-line">
                {plataformas.map((p) => (
                  <tr key={p.slug}>
                    <th scope="row" className="py-3 pr-4 text-left font-medium">
                      {p.etiqueta}
                    </th>
                    <td className="num py-3 pr-4 text-right text-muted">{p.comisionDefault} %</td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/guias/${p.slug}`}
                        className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline"
                      >
                        Ver guía de {p.etiqueta}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="mt-20">
        <MoneyTools />
      </div>

      <div className="mt-20">
        <Faq items={faqGeneral} />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: site.name,
          url: site.url,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          inLanguage: "es-MX",
          description: site.tagline,
          offers: { "@type": "Offer", price: "0", priceCurrency: "MXN" },
        }}
      />
    </>
  );
}
