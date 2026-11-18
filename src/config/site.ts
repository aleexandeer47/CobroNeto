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

/** Número de WhatsApp en formato internacional, solo dígitos (50370000000). */
function whatsappNumber(value: string | undefined): string | null {
  const digits = (value ?? "").replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

/** Correo de contacto; validación básica para no imprimir basura en la página. */
function email(value: string | undefined): string | null {
  const v = (value ?? "").trim();
  return /^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i.test(v) ? v : null;
}

/** ID de editor de AdSense: "ca-pub-" + 16 dígitos. */
function adsenseClient(value: string | undefined): string | null {
  const v = (value ?? "").trim();
  return /^ca-pub-\d{10,20}$/.test(v) ? v : null;
}

const whatsapp = whatsappNumber(process.env.NEXT_PUBLIC_WHATSAPP);
const MENSAJE_WHATSAPP = "Hola, vengo de CobroNeto. Soy freelancer y quiero ayuda con mis impuestos en El Salvador.";

export const site = {
  name: "CobroNeto",
  tagline: "Calculadora de impuestos para freelancers en El Salvador que cobran a clientes del extranjero",
  url: siteUrl(),
  locale: "es_SV",
  lang: "es-SV",
  /**
   * A dónde mandar a quien quiere un contador: un formulario (NEXT_PUBLIC_LEAD_URL) o, si no hay,
   * WhatsApp (NEXT_PUBLIC_WHATSAPP) con un mensaje precargado. Si no hay ninguno, el bloque no aparece.
   */
  leadUrl:
    safeHttpsUrl(process.env.NEXT_PUBLIC_LEAD_URL, null) ??
    (whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(MENSAJE_WHATSAPP)}` : null),
  /** Correo público de contacto (página /contacto). La variable de entorno tiene prioridad. */
  contactEmail: email(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "jsantosmorales16@gmail.com",
  /** AdSense: si no está definido, no se carga ningún script de anuncios. */
  adsenseClient: adsenseClient(process.env.NEXT_PUBLIC_ADSENSE_CLIENT),
} as const;

/** Bloques de anuncio de AdSense (IDs numéricos de "unidad de anuncio"). Vacíos = no se muestra. */
export const adSlots = {
  calculadora: /^\d{6,20}$/.test(process.env.NEXT_PUBLIC_ADSENSE_SLOT_CALCULADORA ?? "")
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_CALCULADORA!
    : null,
  articulo: /^\d{6,20}$/.test(process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICULO ?? "")
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICULO!
    : null,
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
