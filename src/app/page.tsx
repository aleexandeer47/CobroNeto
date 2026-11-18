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
          Calculadora de impuestos para freelancers en El Salvador
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Renta e IVA en El Salvador con la tabla {FISCAL_YEAR}, para Upwork, Fiverr, YouTube, Deel o clientes del
          extranjero. Descubre cuánto apartar cada mes y cuánto te queda. Gratis, sin registro y sin enviar tus montos a
          ningún servidor.
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
              titulo: "Todo en dólares",
              texto:
                "El Salvador usa el dólar, así que no hay tipo de cambio que aplicar: lo que cobras es lo que declaras.",
            },
            {
              titulo: "Renta neta",
              texto:
                "Lo que cobras menos la comisión de la plataforma y tus gastos con comprobante. Sobre eso se calcula el impuesto.",
            },
            {
              titulo: "Impuesto sobre la renta",
              texto: `Tabla anual del art. 37: exenta hasta $6,600 y luego tramos de 10 %, 20 % y 30 %. Calculamos el año completo y lo dividimos entre 12.`,
            },
            {
              titulo: "IVA",
              texto:
                "0 % si exportas el servicio. Si no, asumimos que el 13 % va incluido en lo que cobras. El IVA de tus gastos se descuenta como crédito fiscal.",
            },
          ]}
        >
          <p className="mt-4 text-sm text-muted">
            Más detalle en{" "}
            <Link href="/exportacion-de-servicios" className="text-accent underline underline-offset-4">
              IVA 0 % por exportación de servicios
            </Link>{" "}
            y en la{" "}
            <Link href="/tabla-renta-2026" className="text-accent underline underline-offset-4">
              tabla de renta {FISCAL_YEAR}
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
          inLanguage: site.lang,
          description: site.tagline,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </>
  );
}
