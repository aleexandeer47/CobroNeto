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

export const site = {
  name: "CobroNeto",
  tagline: "Calculadora de impuestos para freelancers que cobran en dólares",
  url: safeHttpsUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://cobroneto.mx")!.replace(/\/$/, ""),
  locale: "es_MX",
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
    "Wise",
    "Cuenta en dólares con datos bancarios de EE.UU. y conversión a pesos con tipo de cambio de mercado.",
    process.env.NEXT_PUBLIC_AFF_WISE,
    "https://wise.com/mx/",
  ),
  afiliado(
    "Payoneer",
    "Recibe pagos de Upwork, Fiverr y clientes directos y retira a tu banco en México.",
    process.env.NEXT_PUBLIC_AFF_PAYONEER,
    "https://www.payoneer.com/es/",
  ),
];
