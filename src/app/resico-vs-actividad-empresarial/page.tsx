import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { fmtMXN, fmtPct } from "@/lib/format";
import { FISCAL_YEAR, RESICO_PF_2026 } from "@/lib/tax/tables2026";

export const metadata: Metadata = {
  title: `RESICO vs Actividad Empresarial ${FISCAL_YEAR}: ¿cuál conviene a un freelancer?`,
  description:
    "Diferencias entre RESICO y Actividad Empresarial y Profesional para freelancers que cobran en dólares: tasas, deducciones, tope de ingresos y cuándo conviene cada uno.",
  alternates: { canonical: "/resico-vs-actividad-empresarial" },
};

const comparativa = [
  ["Cómo se calcula el ISR", "Tasa de 1 % a 2.5 % sobre lo cobrado", "Tarifa progresiva de 1.92 % a 35 % sobre la utilidad"],
  ["Deducciones", "No hay (salvo casos muy específicos)", "Sí: equipo, internet, software, comisiones…"],
  ["Tope de ingresos", "3.5 millones al año", "Sin tope"],
  ["IVA", "Igual en ambos: 16 % o 0 % si exportas", "Igual en ambos: 16 % o 0 % si exportas"],
  ["Ideal para", "Servicios con pocos gastos", "Negocios con gastos altos facturados"],
];

export default function ResicoVsActividad() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
        RESICO vs Actividad Empresarial
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Si eres freelancer y cobras en dólares, casi siempre vas a elegir entre estos dos regímenes. La diferencia puede
        ser de miles de pesos al mes.
      </p>

      <div className="mt-10 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-surface">
            <tr>
              <th scope="col" className="p-3 font-semibold">
                <span className="sr-only">Concepto</span>
              </th>
              <th scope="col" className="p-3 font-semibold">
                RESICO
              </th>
              <th scope="col" className="p-3 font-semibold">
                Actividad Empresarial
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
        <h2>Cómo funciona RESICO</h2>
        <p>
          En el Régimen Simplificado de Confianza pagas un porcentaje fijo de lo que <strong>efectivamente cobras</strong>{" "}
          cada mes, sin restar gastos. La tasa depende de cuánto cobras en el mes y se aplica sobre el total, no por
          escalones:
        </p>
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="num w-full text-sm">
          <thead className="bg-surface font-sans">
            <tr>
              <th scope="col" className="p-3 text-left font-semibold">
                Ingresos del mes hasta
              </th>
              <th scope="col" className="p-3 text-right font-semibold">
                Tasa
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {RESICO_PF_2026.map((r) => (
              <tr key={r.rate}>
                <td className="p-3">{fmtMXN(r.monthlyUpTo)}</td>
                <td className="p-3 text-right">{fmtPct(r.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-cn">
        <h2>Cómo funciona Actividad Empresarial y Profesional</h2>
        <p>
          Aquí el ISR se calcula sobre tu <strong>utilidad</strong>: ingresos menos deducciones autorizadas. Se aplica la
          tarifa progresiva del SAT, que va de 1.92 % a 35 %. Cada mes haces pagos provisionales y en abril presentas la
          declaración anual, donde también puedes aplicar deducciones personales.
        </p>

        <h2>¿Cuál conviene?</h2>
        <p>
          Para la mayoría de freelancers de servicios digitales, <strong>RESICO gana por mucho</strong>. Con una utilidad
          de $40,000 al mes, en Actividad Empresarial tu tasa efectiva puede pasar del 15 %, mientras que en RESICO pagarías
          1.1 % o 1.5 % sobre el ingreso.
        </p>
        <p>Actividad Empresarial empieza a convenir cuando:</p>
        <ul>
          <li>Tus gastos deducibles son una parte muy grande de lo que cobras (por ejemplo, subcontratas a otras personas).</li>
          <li>Pagas comisiones altas a la plataforma y tienes el comprobante para deducirlas.</li>
          <li>Superas el tope de 3.5 millones de pesos al año, y entonces no te queda otra opción.</li>
        </ul>

        <h3>Requisitos y restricciones de RESICO</h3>
        <p>
          Para tributar en RESICO como persona física, en general no puedes ser socio o accionista de una persona moral, y
          tus ingresos del año anterior no deben superar el tope. Si incumples obligaciones (por ejemplo, no presentas
          declaraciones), el SAT puede sacarte del régimen.
        </p>

        <h3>Lo que viene en 2027</h3>
        <p>
          Se ha reportado una reforma a RESICO para 2027 que elevaría el tope de ingresos de personas físicas a 5 millones
          y cambiaría algunas reglas de salida y reingreso. Actualizaremos la calculadora cuando el SAT publique las
          reglas definitivas. Por ahora, todo en este sitio usa las reglas vigentes en {FISCAL_YEAR}.
        </p>

        <h2>Haz la cuenta con tus números</h2>
        <p>
          La <Link href="/">calculadora</Link> compara los dos regímenes con tu ingreso, tu comisión y tus gastos, y te
          dice cuál te deja más dinero.
        </p>
      </div>

      <div className="mt-16 -mx-4 sm:-mx-6">
        <Faq
          items={[
            {
              q: "¿Puedo cambiarme de régimen a mitad de año?",
              a: "Por regla general, el cambio de régimen se hace al inicio del ejercicio, presentando el aviso de actualización ante el SAT dentro del plazo que marca la ley. Revisa las fechas con tu contador antes de enero.",
            },
            {
              q: "¿En RESICO tengo que presentar declaración anual?",
              a: "Sí. Además de los pagos mensuales, las personas físicas en RESICO presentan una declaración anual, aunque en la práctica es más sencilla que en Actividad Empresarial.",
            },
            {
              q: "¿Las comisiones de Upwork o Fiverr se restan en RESICO?",
              a: "No. En RESICO el impuesto se calcula sobre lo cobrado sin deducciones. Por eso, con comisiones muy altas, conviene comparar ambos regímenes.",
            },
          ]}
        />
      </div>
    </article>
  );
}
