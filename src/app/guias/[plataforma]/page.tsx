import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorSection } from "@/components/calculator/CalculatorSection";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { MoneyTools } from "@/components/MoneyTools";
import { Notes } from "@/components/Notes";
import { getPlataforma, plataformas } from "@/content/plataformas";
import { site } from "@/config/site";
import { FISCAL_YEAR } from "@/lib/tax/tables2026";

export function generateStaticParams() {
  return plataformas.map((p) => ({ plataforma: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guias/[plataforma]">): Promise<Metadata> {
  const p = getPlataforma((await params).plataforma);
  if (!p) return {};
  return {
    title: `${p.keyword} ${FISCAL_YEAR}: calculadora de renta e IVA`,
    description: p.intro,
    alternates: { canonical: `/guias/${p.slug}` },
    openGraph: { url: `/guias/${p.slug}`, title: `${p.keyword} ${FISCAL_YEAR}` },
  };
}

/**
 * Las guías se prerenderizan completas con generateStaticParams. Preferimos que el HTML traiga la
 * página final (mejor para SEO) a envolverla en <Suspense>, que serviría un esqueleto y luego el
 * contenido por streaming. La navegación entre guías espera al servidor unos milisegundos.
 */
export const instant = false;

export default async function GuiaPage({ params }: PageProps<"/guias/[plataforma]">) {
  const p = getPlataforma((await params).plataforma);
  if (!p) notFound();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="Migas de pan" className="text-sm text-muted">
          <ol className="flex flex-wrap gap-1.5">
            <li>
              <Link href="/" className="hover:text-ink">
                Inicio
              </Link>{" "}
              /
            </li>
            <li>
              <Link href="/guias" className="hover:text-ink">
                Guías
              </Link>{" "}
              /
            </li>
            <li aria-current="page" className="text-ink">
              {p.etiqueta}
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
          {p.keyword} ({FISCAL_YEAR})
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{p.intro}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          <span className="font-medium text-ink">Comisión:</span> {p.comisionNota}
        </p>
      </section>

      <section aria-label="Calculadora" className="mx-auto max-w-6xl px-4 sm:px-6">
        <CalculatorSection plataformaInicial={p.slug} />
      </section>

      <div className="mt-20">
        <Notes id="claves" title={`Lo que cambia con ${p.etiqueta}`} items={p.puntos} />
      </div>

      <div className="mt-20">
        <MoneyTools />
      </div>

      <div className="mt-20">
        <Faq items={p.faq} title={`Preguntas sobre ${p.nombre}`} />
      </div>

      <nav aria-label="Otras guías" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12">
          <h2 className="font-medium">Otras guías</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {plataformas
              .filter((o) => o.slug !== p.slug)
              .map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/guias/${o.slug}`}
                    className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline"
                  >
                    {o.etiqueta}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </nav>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
            { "@type": "ListItem", position: 2, name: "Guías", item: `${site.url}/guias` },
            { "@type": "ListItem", position: 3, name: p.etiqueta, item: `${site.url}/guias/${p.slug}` },
          ],
        }}
      />
    </>
  );
}
