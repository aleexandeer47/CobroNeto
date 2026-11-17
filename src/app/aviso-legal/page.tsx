import type { Metadata } from "next";
import { FISCAL_YEAR, SOURCES } from "@/lib/tax/tables2026";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Alcance y limitaciones de las estimaciones fiscales de CobroNeto.",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegal() {
  return (
    <article className="prose-cn mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.75rem]">Aviso legal</h1>
      <h2>No es asesoría fiscal</h2>
      <p>
        CobroNeto ofrece <strong>estimaciones informativas</strong>. No sustituye la asesoría de un contador público ni
        las disposiciones oficiales del SAT. Tu situación puede tener particularidades (otros ingresos, deducciones
        personales, retenciones en el extranjero, pagos provisionales previos) que cambian el resultado.
      </p>
      <h2>Supuestos del cálculo</h2>
      <ul>
        <li>Ingresos y gastos iguales cada mes del año {FISCAL_YEAR}.</li>
        <li>Actividad Empresarial: el ISR anual se estima con la tarifa anual y se divide entre 12. No incluye deducciones personales.</li>
        <li>RESICO: tasa sobre el ingreso mensual cobrado, sin deducciones.</li>
        <li>Si no hay exportación de servicios, se asume que el IVA del 16 % está incluido en lo que cobras.</li>
        <li>No se consideran retenciones de impuestos en otros países ni su acreditamiento.</li>
      </ul>
      <h2>Fuentes</h2>
      <ul>
        <li>{SOURCES.isr}</li>
        <li>{SOURCES.resico}</li>
        <li>{SOURCES.iva}</li>
      </ul>
      <p>Revisamos las tarifas cuando el SAT publica cambios. Si encuentras un error, avísanos.</p>
    </article>
  );
}
