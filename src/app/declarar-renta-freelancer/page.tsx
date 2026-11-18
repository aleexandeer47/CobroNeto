import type { Metadata } from "next";
import Link from "next/link";
import { Ad } from "@/components/Ad";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { FISCAL_YEAR } from "@/lib/tax/tables2026";

const DECLARA = FISCAL_YEAR + 1;

export const metadata: Metadata = {
  title: `Cómo declarar renta siendo freelancer en El Salvador (${FISCAL_YEAR})`,
  description:
    "Paso a paso para que un freelancer o trabajador independiente en El Salvador declare su impuesto sobre la renta: quién debe declarar, qué ingresos y gastos van, fechas y errores comunes.",
  alternates: { canonical: "/declarar-renta-freelancer" },
};

const pasos = [
  {
    titulo: "Ten tu NIT y tu acceso a Servicios en Línea",
    texto:
      "Tu DUI funciona como NIT. Con él te registras en los servicios en línea del Ministerio de Hacienda, donde se presenta la declaración. Si es tu primera vez, hazlo con tiempo: la activación puede tardar.",
  },
  {
    titulo: "Junta tus ingresos del año",
    texto:
      "Descarga los reportes anuales de cada plataforma (Upwork, Fiverr, Payoneer, PayPal, Deel, AdSense) y tus facturas de exportación. Suma lo que te pagaron los clientes antes de comisiones: ese es tu ingreso.",
  },
  {
    titulo: "Junta tus costos y gastos",
    texto:
      "Comisiones de plataformas, internet, equipo, software, coworking. Solo cuentan los que son necesarios para tu actividad y tienen comprobante válido. Sepáralos de tus gastos personales.",
  },
  {
    titulo: "Calcula tu renta neta y tu impuesto",
    texto:
      "Renta neta = ingresos − costos y gastos deducibles. Sobre eso aplicas la tabla del art. 37: exenta hasta $6,600 y luego tramos de 10 %, 20 % y 30 %. La calculadora de CobroNeto te da la cifra en un minuto.",
  },
  {
    titulo: "Resta lo que ya pagaste",
    texto:
      "Si un cliente salvadoreño te retuvo el 10 % o hiciste pagos a cuenta durante el año, se descuentan del impuesto. Si te retuvieron más de lo que te toca, puedes pedir devolución.",
  },
  {
    titulo: "Presenta y paga antes del 30 de abril",
    texto: `La declaración del año ${FISCAL_YEAR} se presenta en línea entre enero y el 30 de abril de ${DECLARA}. Si resulta impuesto a pagar, genera el mandamiento y págalo en el banco o en línea dentro del mismo plazo.`,
  },
];

const errores = [
  "Declarar solo lo que retiraste al banco y no lo que cobraste (el dinero que se queda en Payoneer o PayPal también es ingreso).",
  "Restar la comisión de la plataforma dos veces: si declaras el monto neto que recibiste, ya no la restes como gasto.",
  "Mezclar gastos personales con gastos del trabajo.",
  "Dejar todo para la última semana de abril, cuando el portal está saturado.",
  "No apartar dinero durante el año: como nadie te retiene, el impuesto llega de golpe.",
];

export default function DeclararRentaFreelancer() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
        Cómo declarar renta siendo freelancer en El Salvador
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Si trabajas por tu cuenta para clientes de afuera, nadie te retiene renta: te toca a ti declarar y pagar una vez
        al año. Así se hace, paso a paso.
      </p>

      <div className="prose-cn">
        <h2>¿Tienes que declarar?</h2>
        <p>
          Si vives y trabajas en El Salvador, lo que cobras por servicios prestados desde aquí es renta de fuente
          salvadoreña, aunque el cliente y el pago estén en el extranjero. Como trabajador independiente debes presentar
          la declaración anual de renta. Si tu renta neta no pasa de $6,600 en el año, no pagas impuesto, pero conviene
          declarar igual para tener tu historial en orden y poder pedir devoluciones si te retuvieron.
        </p>
      </div>

      <ol className="mt-8 space-y-6">
        {pasos.map((p, i) => (
          <li key={p.titulo} className="grid grid-cols-[2rem_1fr] gap-3">
            <span className="num flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-sm font-medium">
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold">{p.titulo}</h3>
              <p className="mt-1 leading-relaxed text-muted">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-lg border border-line bg-surface px-5 py-4">
        <p className="font-medium">¿Cuánto te va a tocar pagar?</p>
        <p className="mt-1 text-muted">
          Pon tu cobro mensual, tu comisión y tus gastos en la <Link href="/" className="text-accent underline underline-offset-4">calculadora</Link>{" "}
          y verás el impuesto del año y cuánto apartar cada mes.
        </p>
      </div>

      <Ad posicion="articulo" className="mt-12" />

      <div className="prose-cn">
        <h2>Errores comunes</h2>
        <ul>
          {errores.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>

        <h2>¿Y el IVA?</h2>
        <p>
          El IVA es aparte y se declara cada mes si estás inscrito como contribuyente. Si exportas tus servicios, tus
          ventas van al 0 %, pero igual se declaran. Lo explicamos en{" "}
          <Link href="/exportacion-de-servicios">IVA 0 % por exportación de servicios</Link> y en{" "}
          <Link href="/facturacion-electronica-freelancer">facturación electrónica para freelancers</Link>.
        </p>
      </div>

      <div className="mt-16 -mx-4 sm:-mx-6">
        <Faq
          items={[
            {
              q: "¿Qué pasa si no declaro?",
              a: "Hacienda puede cobrarte el impuesto con multas e intereses. Como los pagos de plataformas dejan rastro bancario, es cada vez más fácil que detecte ingresos no declarados.",
            },
            {
              q: "¿Puedo declarar sin contador?",
              a: "Sí, el formulario se llena en línea. Si tienes varios tipos de ingreso, retenciones o dudas sobre qué gastos deducir, un contador te puede ahorrar más de lo que cobra.",
            },
            {
              q: "Además de freelancer tengo un empleo. ¿Cambia algo?",
              a: "Sí: sumas tu salario y lo que cobras como freelancer, y aplicas la tabla a todo. Tu patrono ya te retuvo sobre el salario, así que lo más probable es que te toque pagar una diferencia.",
            },
          ]}
        />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Cómo declarar renta siendo freelancer en El Salvador",
          inLanguage: site.lang,
          step: pasos.map((p, i) => ({ "@type": "HowToStep", position: i + 1, name: p.titulo, text: p.texto })),
        }}
      />
    </article>
  );
}
