import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { fmtUSDCents } from "@/lib/format";
import { FISCAL_YEAR, IVA_UMBRAL_INSCRIPCION, RETENCION_SERVICIOS } from "@/lib/tax/tables2026";

export const metadata: Metadata = {
  title: `IVA 0 % por exportación de servicios en El Salvador (${FISCAL_YEAR})`,
  description:
    "Cuándo un freelancer en El Salvador puede facturar con IVA 0 % a clientes del extranjero, qué pasa con la renta y qué evidencia guardar.",
  alternates: { canonical: "/exportacion-de-servicios" },
};

const comparativa = [
  ["IVA que cobras", "0 %", "13 %"],
  ["Documento", "Factura de exportación (DTE)", "Factura o comprobante de crédito fiscal (DTE)"],
  ["IVA de tus gastos", "Puedes pedir su devolución", "Lo restas del IVA que cobras"],
  ["Retención de renta", "Nadie te retiene", `La empresa puede retenerte el ${RETENCION_SERVICIOS * 100} %`],
  ["Renta", "Pagas igual, con la tabla del art. 37", "Pagas igual, con la tabla del art. 37"],
];

export default function ExportacionDeServicios() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
        IVA 0 % por exportación de servicios
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Si trabajas desde El Salvador para clientes de afuera, es probable que tu servicio sea una exportación. Eso
        cambia el IVA, pero no la renta.
      </p>

      <div className="mt-10 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-surface">
            <tr>
              <th scope="col" className="p-3 font-semibold">
                <span className="sr-only">Concepto</span>
              </th>
              <th scope="col" className="p-3 font-semibold">
                Cliente en el extranjero
              </th>
              <th scope="col" className="p-3 font-semibold">
                Cliente en El Salvador
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {comparativa.map(([c, a, b]) => (
              <tr key={c}>
                <th scope="row" className="p-3 font-medium">
                  {c}
                </th>
                <td className="p-3 text-muted">{a}</td>
                <td className="p-3 text-muted">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-cn">
        <h2>Cuándo es exportación</h2>
        <p>
          La Ley de IVA grava con tasa 0 % los servicios prestados desde El Salvador a un usuario{" "}
          <strong>no domiciliado</strong> en el país, siempre que el servicio se utilice{" "}
          <strong>exclusivamente en el extranjero</strong> (arts. 74 y 75). Las dos condiciones van juntas: que el
          cliente sea extranjero no basta si el servicio se aprovecha aquí.
        </p>
        <p>
          Ejemplos que normalmente califican: programar una app para una empresa de EE.UU., diseñar la marca de un
          negocio en España, editar videos para un canal de un creador en México. Ejemplos dudosos: hacer publicidad
          dirigida al mercado salvadoreño para una empresa extranjera.
        </p>

        <h2>Qué evidencia guardar</h2>
        <ul>
          <li>Contrato u orden de trabajo donde aparezca el cliente y su país.</li>
          <li>Correos o mensajes que muestren dónde se usa el resultado de tu trabajo.</li>
          <li>Las facturas de exportación que emitiste.</li>
          <li>El rastro del pago desde el extranjero: estado de Payoneer, PayPal, Wise o transferencia.</li>
        </ul>

        <h2>Qué pasa con la renta</h2>
        <p>
          Nada cambia. Si trabajas desde El Salvador, el servicio se presta en el país y lo que cobras es renta de
          fuente salvadoreña, aunque el dinero llegue de afuera. Se suma a tu renta del año y pagas con la{" "}
          <Link href="/tabla-renta-2026">tabla del art. 37</Link>. La diferencia es que un cliente extranjero no te
          retiene nada, así que te toca apartar el dinero a ti.
        </p>
        <p>
          Según tu situación, Hacienda puede pedirte además anticipos mensuales a cuenta de la renta (pago a cuenta).
          Son adelantos del impuesto del año, no un impuesto extra; confirma con un contador si te aplican.
        </p>

        <h2>Inscripción en IVA</h2>
        <p>
          Si tus ventas de servicios del último año superan {fmtUSDCents(IVA_UMBRAL_INSCRIPCION)}, debes inscribirte
          como contribuyente de IVA, emitir documentos tributarios electrónicos (DTE) y presentar la declaración mensual
          de IVA, aunque todo lo que vendas vaya al 0 %. Como exportador puedes solicitar la devolución del IVA que
          pagaste en tus compras.
        </p>

        <h2>Haz la cuenta con tus números</h2>
        <p>
          La <Link href="/">calculadora</Link> te deja elegir entre IVA 0 % y 13 % y te dice cuánto apartar cada mes.
        </p>
      </div>

      <div className="mt-16 -mx-4 sm:-mx-6">
        <Faq
          items={[
            {
              q: "¿Necesito que el cliente tenga NIT?",
              a: "No. En la factura de exportación se identifica al cliente con su nombre, país y, si lo tiene, su número fiscal de su país.",
            },
            {
              q: "¿Las plataformas como Upwork o Fiverr cuentan como cliente extranjero?",
              a: "Generalmente sí: la plataforma y la mayoría de sus clientes están fuera de El Salvador. Si un cliente salvadoreño te contrata por la plataforma, ese trabajo no sería exportación.",
            },
            {
              q: "¿Y si cobro en bitcoin?",
              a: "El impuesto se calcula igual, por el valor en dólares de lo que cobras. La forma de pago no cambia si el servicio es exportación o no.",
            },
          ]}
        />
      </div>
    </article>
  );
}
