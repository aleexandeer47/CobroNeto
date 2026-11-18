import Link from "next/link";
import { Wordmark } from "./Wordmark";

const nav = [
  { href: "/guias", label: "Guías" },
  { href: "/declarar-renta-freelancer", label: "Cómo declarar" },
  { href: "/exportacion-de-servicios", label: "IVA 0 %" },
  { href: "/tabla-renta-2026", label: "Tabla de renta 2026" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="CobroNeto, inicio" className="flex min-h-11 items-center rounded">
          <Wordmark />
        </Link>
        <nav aria-label="Principal" className="-mx-2 flex max-w-full overflow-x-auto text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center whitespace-nowrap rounded px-2 text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
