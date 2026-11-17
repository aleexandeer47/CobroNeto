/**
 * Inserta datos estructurados. Escapamos "<" para que ningún texto pueda cerrar el <script>.
 * El contenido proviene solo de nuestro código, nunca del usuario.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
