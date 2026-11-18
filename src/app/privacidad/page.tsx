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
        escribes, no pedimos registro y no usamos cookies propias. Si se muestran anuncios, Google puede usar las suyas
        (ver abajo).
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
      <h2>Analítica</h2>
      <p>
        Medimos visitas de forma agregada con Vercel Web Analytics: páginas vistas, país, tipo de dispositivo y de dónde
        llegaste. No usa cookies, no te identifica y no registra lo que escribes en la calculadora.
      </p>
      <h2>Publicidad</h2>
      <p>
        Podemos mostrar anuncios de Google AdSense. Google y sus socios pueden usar cookies para mostrarte anuncios
        basados en tus visitas a este y a otros sitios. Puedes desactivar la publicidad personalizada en la{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          configuración de anuncios de Google
        </a>{" "}
        y consultar{" "}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
          cómo usa Google los datos de publicidad
        </a>
        . Los anuncios nunca reciben los montos de tu cálculo.
      </p>
      <h2>Cambios</h2>
      <p>Si cambiamos cómo tratamos los datos, actualizaremos esta página.</p>
    </article>
  );
}
