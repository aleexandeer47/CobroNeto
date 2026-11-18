import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cómo contactar a CobroNeto para reportar un error, sugerir una mejora o proponer una colaboración.",
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  return (
    <article className="prose-cn mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.75rem]">Contacto</h1>
      <p>
        ¿Encontraste un error en el cálculo, cambió una ley o quieres proponer una colaboración? Nos encanta saberlo.
      </p>

      {site.contactEmail && (
        <>
          <h2>Correo</h2>
          <p>
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </>
      )}

      {site.leadUrl && (
        <>
          <h2>Ayuda con tus impuestos</h2>
          <p>
            Si quieres que un contador revise tu caso, inscribirte en Hacienda o presentar tu declaración,{" "}
            <a href={site.leadUrl} target="_blank" rel="noopener noreferrer">
              escríbenos aquí
            </a>
            .
          </p>
        </>
      )}

      {!site.contactEmail && !site.leadUrl && (
        <p>Muy pronto publicaremos un correo de contacto.</p>
      )}

      <h2>Antes de escribir</h2>
      <p>
        No podemos dar asesoría fiscal personalizada por correo. Para dudas sobre tu caso concreto, consulta a un
        contador. No nos envíes datos personales sensibles como tu NIT o contraseñas.
      </p>
    </article>
  );
}
