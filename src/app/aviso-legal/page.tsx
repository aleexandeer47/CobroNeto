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
        CobroNeto ofrece <strong>estimaciones informativas</strong>. No sustituye la asesoría de un contador ni las
        disposiciones oficiales del Ministerio de Hacienda. Tu situación puede tener particularidades (otros ingresos,
        deducciones personales, retenciones, pagos a cuenta, beneficios fiscales) que cambian el resultado.
      </p>
      <h2>Supuestos del cálculo</h2>
      <ul>
        <li>Ingresos y gastos iguales cada mes del año {FISCAL_YEAR}.</li>
        <li>
          El impuesto sobre la renta se estima con la tabla anual del art. 37 sobre la renta neta (cobro menos comisión y
          gastos) y se divide entre 12. No incluye deducciones personales ni cotizaciones de ISSS o AFP.
        </li>
        <li>Si no hay exportación de servicios, se asume que el IVA del 13 % está incluido en lo que cobras.</li>
        <li>No se consideran retenciones de renta ya efectuadas, impuestos pagados en otros países ni exenciones especiales.</li>
      </ul>
      <h2>Fuentes</h2>
      <ul>
        <li>{SOURCES.isr}</li>
        <li>{SOURCES.retencion}</li>
        <li>{SOURCES.iva}</li>
      </ul>
      <p>Revisamos las tablas cuando Hacienda publica cambios. Si encuentras un error, avísanos.</p>
    </article>
  );
}
