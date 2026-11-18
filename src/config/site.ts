/** Acepta solo URLs https válidas (los valores vienen de variables de entorno). */
function safeHttpsUrl(value: string | undefined, fallback: string | null): string | null {
  if (!value) return fallback;
  try {
    const u = new URL(value);
    return u.protocol === "https:" ? u.toString() : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Dominio público: NEXT_PUBLIC_SITE_URL si está definido; si no, el dominio de producción que
 * Vercel expone automáticamente; y en local, localhost.
 */
function siteUrl(): string {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const fallback = vercel ? `https://${vercel}` : "http://localhost:3000";
  return (safeHttpsUrl(process.env.NEXT_PUBLIC_SITE_URL, null) ?? fallback).replace(/\/$/, "");
}

export const site = {
  name: "CobroNeto",
  tagline: "Calculadora de impuestos para freelancers en El Salvador que cobran a clientes del extranjero",
  url: siteUrl(),
  locale: "es_SV",
  lang: "es-SV",
  /** Formulario o WhatsApp para canalizar leads a contadores. Si no se define, el bloque no aparece. */
  leadUrl: safeHttpsUrl(process.env.NEXT_PUBLIC_LEAD_URL, null),
} as const;

export interface Afiliado {
  nombre: string;
  descripcion: string;
  url: string;
  /** true cuando la URL viene de un programa de afiliados (añade rel="sponsored"). */
  patrocinado: boolean;
}

function afiliado(nombre: string, descripcion: string, envUrl: string | undefined, publicUrl: string): Afiliado {
  const aff = safeHttpsUrl(envUrl, null);
  return { nombre, descripcion, url: aff ?? publicUrl, patrocinado: aff !== null };
}

export const afiliados: Afiliado[] = [
  afiliado(
    "Payoneer",
    "Recibe pagos de Upwork, Fiverr y clientes directos, y retira a tu cuenta en un banco salvadoreño.",
    process.env.NEXT_PUBLIC_AFF_PAYONEER,
    "https://www.payoneer.com/es/",
  ),
  afiliado(
    "Wise",
    "Datos bancarios de EE.UU. para que tus clientes te paguen como si fuera una transferencia local. Revisa que tu país esté habilitado.",
    process.env.NEXT_PUBLIC_AFF_WISE,
    "https://wise.com/es/",
  ),
];
