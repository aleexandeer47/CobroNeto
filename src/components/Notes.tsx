/** Sección de texto en dos columnas: título a la izquierda, puntos separados por líneas a la derecha. */
export function Notes({
  id,
  title,
  items,
  children,
}: {
  id: string;
  title: string;
  items: { titulo: string; texto: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
        <h2 id={id} className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <div>
          <dl className="divide-y divide-line border-y border-line">
            {items.map((it) => (
              <div key={it.titulo} className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="font-medium">{it.titulo}</dt>
                <dd className="leading-relaxed text-muted">{it.texto}</dd>
              </div>
            ))}
          </dl>
          {children}
        </div>
      </div>
    </section>
  );
}
