import Link from "next/link";
import { plataformas } from "@/content/plataformas";
import { FISCAL_YEAR } from "@/lib/tax/tables2026";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-sm sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-sm leading-relaxed text-muted">
            Estimaciones para El Salvador con la tabla de renta {FISCAL_YEAR}. No es asesoría fiscal ni sustituye a un
            contador. Algunos enlaces pueden ser de afiliado.
          </p>
        </div>
        <nav aria-label="Guías">
          <h2 className="font-medium">Guías</h2>
          <ul className="mt-3 space-y-2">
            {plataformas.map((p) => (
              <li key={p.slug}>
                <Link href={`/guias/${p.slug}`} className="text-muted hover:text-ink">
                  {p.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Recursos">
          <h2 className="font-medium">Recursos</h2>
          <ul className="mt-3 space-y-2">
            {[
              ["/exportacion-de-servicios", "IVA 0 % por exportación"],
              ["/tabla-renta-2026", `Tabla de renta ${FISCAL_YEAR}`],
              ["/privacidad", "Privacidad"],
              ["/aviso-legal", "Aviso legal"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-muted hover:text-ink">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
