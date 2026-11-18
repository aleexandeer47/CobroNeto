import type { Metadata } from "next";
import Link from "next/link";
import { Ad } from "@/components/Ad";
import { Faq } from "@/components/Faq";
import { fmtUSDCents } from "@/lib/format";
import { FISCAL_YEAR, IVA_UMBRAL_INSCRIPCION } from "@/lib/tax/tables2026";

export const metadata: Metadata = {
  title: `Facturación electrónica para freelancers en El Salvador (${FISCAL_YEAR})`,
  description:
    "Qué documento tributario electrónico (DTE) emite un freelancer en El Salvador, cuándo inscribirse en IVA, cómo facturar a clientes del extranjero y qué necesitas para empezar.",
  alternates: { canonical: "/facturacion-electronica-freelancer" },
};

const documentos = [
  ["Cliente o plataforma en el extranjero", "Factura de exportación", "0 %"],
  ["Empresa salvadoreña inscrita en IVA", "Comprobante de crédito fiscal", "13 %"],
  ["Persona o negocio local no inscrito", "Factura (consumidor final)", "13 % incluido"],
];

export default function FacturacionElectronica() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
        Facturación electrónica para freelancers
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        En El Salvador las facturas se emiten como documentos tributarios electrónicos (DTE) que se transmiten a
        Hacienda. Esto es lo que necesitas saber si trabajas por tu cuenta.
      </p>

      <div className="mt-10 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-surface">
            <tr>
              <th scope="col" className="p-3 font-semibold">
                A quién le cobras
              </th>
              <th scope="col" className="p-3 font-semibold">
                Documento
              </th>
              <th scope="col" className="p-3 text-right font-semibold">
                IVA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {documentos.map(([quien, doc, iva]) => (
              <tr key={quien}>
                <th scope="row" className="p-3 font-medium">
                  {quien}
                </th>
                <td className="p-3 text-muted">{doc}</td>
                <td className="num p-3 text-right text-muted">{iva}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-cn">
        <h2>¿Tengo que inscribirme en IVA?</h2>
        <p>
          Si en los últimos doce meses tus ventas de servicios superaron {fmtUSDCents(IVA_UMBRAL_INSCRIPCION)}, debes
          inscribirte como contribuyente de IVA y obtener tu número de registro (NRC). Por debajo de ese monto, y con
          pocos activos, puedes quedar como pequeño contribuyente. Cuentan también las exportaciones, aunque vayan al 0 %.
        </p>

        <h2>Qué necesitas para empezar</h2>
        <ul>
          <li>Tu DUI (que funciona como NIT) y acceso a los servicios en línea de Hacienda.</li>
          <li>Tu inscripción en el registro de contribuyentes de IVA, si te corresponde.</li>
          <li>
            Un sistema de facturación electrónica autorizado: Hacienda ofrece una herramienta gratuita para contribuyentes
            pequeños y también hay proveedores privados.
          </li>
          <li>Los datos de tu cliente: nombre, país y, si lo tiene, su número fiscal.</li>
        </ul>

        <h2>Cómo facturar a un cliente del extranjero</h2>
        <p>
          Emites una factura de exportación con IVA 0 %. Pon el monto en dólares, la descripción del servicio y los
          datos del cliente. Si cobras por una plataforma como Upwork o Fiverr, lo habitual es facturar a la plataforma
          o al cliente según cómo esté armado el contrato; un contador te puede decir cuál conviene en tu caso. Guarda la
          evidencia de que el servicio se usa afuera: lo explicamos en{" "}
          <Link href="/exportacion-de-servicios">IVA 0 % por exportación de servicios</Link>.
        </p>
      </div>

      <Ad posicion="articulo" className="mt-12" />

      <div className="prose-cn">
        <h2>Después de facturar</h2>
        <ul>
          <li>Si estás inscrito en IVA, presenta la declaración mensual (F-07), aunque todo sea exportación al 0 %.</li>
          <li>Lleva tus libros de IVA al día o pídele a tu sistema de facturación que los genere.</li>
          <li>
            Aparta lo de la renta cada mes: la <Link href="/">calculadora</Link> te dice cuánto, y la{" "}
            <Link href="/declarar-renta-freelancer">guía para declarar renta</Link> explica el cierre del año.
          </li>
        </ul>
      </div>

      <div className="mt-16 -mx-4 sm:-mx-6">
        <Faq
          items={[
            {
              q: "¿Puedo seguir usando facturas de papel?",
              a: "Hacienda ha hecho obligatoria la facturación electrónica por etapas y cada vez más contribuyentes deben usarla. Si te inscribes hoy, lo normal es empezar directamente con DTE.",
            },
            {
              q: "¿Cuánto cuesta un sistema de facturación?",
              a: "La herramienta de Hacienda para contribuyentes pequeños es gratuita. Los proveedores privados cobran según el número de documentos y suelen incluir libros y reportes.",
            },
            {
              q: "¿Necesito contador para facturar?",
              a: "No para emitir facturas, pero sí ayuda para inscribirte bien, elegir el documento correcto y llevar las declaraciones mensuales sin errores.",
            },
          ]}
        />
      </div>
    </article>
  );
}
