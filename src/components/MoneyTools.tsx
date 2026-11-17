import { afiliados, site } from "@/config/site";

/** Monetización: afiliados y canalización a contador (si está configurada). */
export function MoneyTools() {
  return (
    <section aria-labelledby="money-tools" className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
        <div>
          <h2 id="money-tools" className="text-2xl font-semibold tracking-tight">
            Dónde recibir tus dólares
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            El margen que cobra un banco al convertir puede ser mayor que tu ISR en RESICO.
          </p>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {afiliados.map((a) => (
            <li key={a.nombre}>
              <a
                href={a.url}
                target="_blank"
                rel={`noopener noreferrer${a.patrocinado ? " sponsored" : ""}`}
                className="group grid gap-1 py-5 sm:grid-cols-[14rem_1fr_auto] sm:items-center sm:gap-6"
              >
                <span className="font-medium group-hover:underline group-hover:underline-offset-4">{a.nombre}</span>
                <span className="leading-relaxed text-muted">
                  {a.descripcion}
                  {a.patrocinado && <span className="ml-1 text-xs">(enlace de afiliado)</span>}
                </span>
                <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className="hidden text-muted sm:block">
                  <path
                    d="M5 11L11 5M6 5h5v5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
          ))}
          {site.leadUrl && (
            <li className="flex flex-wrap items-center justify-between gap-4 py-5">
              <span>
                <span className="block font-medium">¿Prefieres que un contador lo haga por ti?</span>
                <span className="text-muted">Contadores que trabajan con freelancers que cobran en dólares.</span>
              </span>
              <a href={site.leadUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Hablar con un contador
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
