import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Cómo trata CobroNeto tus datos: el cálculo ocurre en tu navegador y no guardamos tus montos.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <article className="prose-cn mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.75rem]">Aviso de privacidad</h1>
      <h2>Lo corto</h2>
      <p>
        La calculadora funciona por completo en tu navegador. <strong>No enviamos ni guardamos</strong> los montos que
        escribes, no pedimos registro y no usamos cookies propias.
      </p>
      <h2>Enlaces para compartir</h2>
      <p>
        Si usas “Copiar enlace a este cálculo”, los números se incluyen en la dirección (URL) que tú copias. Solo los verá
        quien reciba ese enlace. Si no quieres compartirlos, no compartas el enlace.
      </p>
      <h2>Enlaces a terceros</h2>
      <p>
        Algunos enlaces llevan a servicios de terceros (por ejemplo, cuentas para recibir pagos del extranjero). Al visitarlos aplican
        sus propias políticas de privacidad. Algunos pueden ser enlaces de afiliado.
      </p>
      <h2>Publicidad y analítica</h2>
      <p>
        Si en el futuro mostramos anuncios o medimos visitas, actualizaremos este aviso antes de hacerlo y te pediremos
        consentimiento cuando la ley lo requiera.
      </p>
    </article>
  );
}
