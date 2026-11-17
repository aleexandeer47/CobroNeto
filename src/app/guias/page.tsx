import type { Metadata } from "next";
import Link from "next/link";
import { plataformas } from "@/content/plataformas";
import { FISCAL_YEAR } from "@/lib/tax/tables2026";

export const metadata: Metadata = {
  title: `Guías de impuestos para freelancers por plataforma (${FISCAL_YEAR})`,
  description:
    "Cómo pagar impuestos en México si cobras por Upwork, Fiverr, YouTube, Deel, Twitch o clientes del extranjero. Guías con calculadora.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.75rem]">Guías por plataforma</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Cada plataforma cobra comisiones distintas y tiene sus particularidades fiscales. Elige la tuya y la calculadora
        se ajusta.
      </p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {plataformas.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/guias/${p.slug}`}
              className="group grid gap-1 py-5 sm:grid-cols-[14rem_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span className="text-lg font-medium group-hover:text-accent">{p.etiqueta}</span>
              <span className="leading-relaxed text-muted">{p.intro}</span>
              <span className="num text-sm text-muted">{p.comisionDefault} %</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
