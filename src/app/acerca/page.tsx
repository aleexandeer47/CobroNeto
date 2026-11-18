import type { Metadata } from "next";
import Link from "next/link";
import { FISCAL_YEAR } from "@/lib/tax/tables2026";

export const metadata: Metadata = {
  title: "Acerca de CobroNeto",
  description:
    "Qué es CobroNeto, para quién es y cómo calculamos los impuestos de freelancers en El Salvador.",
  alternates: { canonical: "/acerca" },
};

export default function Acerca() {
  return (
    <article className="prose-cn mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.75rem]">Acerca de CobroNeto</h1>
      <p>
        CobroNeto es una calculadora gratuita para freelancers, creadores de contenido y contractors que viven en El
        Salvador y cobran a clientes del extranjero. Responde dos preguntas: <strong>cuánto me queda</strong> y{" "}
        <strong>cuánto tengo que apartar para Hacienda</strong>.
      </p>
      <h2>Por qué existe</h2>
      <p>
        Cuando cobras por Upwork, Fiverr, YouTube o Deel nadie te retiene impuestos. Es fácil gastar todo y descubrir en
        abril que debes una parte grande de lo que ganaste. Las reglas están repartidas entre la Ley de Impuesto sobre la
        Renta, la Ley de IVA y varios decretos; aquí las juntamos en una cuenta sencilla.
      </p>
      <h2>Cómo calculamos</h2>
      <ul>
        <li>Renta con la tabla del art. 37 vigente en {FISCAL_YEAR}, incluida la reforma de 2025.</li>
        <li>IVA del 13 % o 0 % por exportación de servicios, con crédito fiscal por tus gastos.</li>
        <li>Todo ocurre en tu navegador: no guardamos ni enviamos tus montos.</li>
      </ul>
      <p>
        Los supuestos y las fuentes están en el <Link href="/aviso-legal">aviso legal</Link>. Es una estimación para
        planear, no asesoría fiscal.
      </p>
      <h2>Cómo se financia</h2>
      <p>
        El sitio es gratis. Se sostiene con anuncios, con enlaces de afiliado a servicios para recibir pagos (siempre
        marcados) y con la canalización a contadores que trabajan con freelancers. Nada de eso cambia el resultado de la
        calculadora.
      </p>
      <p>
        ¿Encontraste un error o quieres sugerir algo? <Link href="/contacto">Escríbenos</Link>.
      </p>
    </article>
  );
}
