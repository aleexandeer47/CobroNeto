export interface FaqItem {
  q: string;
  a: string;
}

export interface Plataforma {
  slug: string;
  /** Nombre dentro de una frase ("impuestos por clientes en el extranjero"). */
  nombre: string;
  /** Nombre suelto, en listas y menús. */
  etiqueta: string;
  /** Comisión sugerida para precargar la calculadora (editable). */
  comisionDefault: number;
  comisionNota: string;
  /** Frase para el <title> y H1. */
  keyword: string;
  intro: string;
  puntos: { titulo: string; texto: string }[];
  faq: FaqItem[];
}

const faqComunes = (nombre: string): FaqItem[] => [
  {
    q: `¿Tengo que pagar renta en El Salvador por lo que gano en ${nombre}?`,
    a: `Si trabajas desde El Salvador, sí. La Ley de Impuesto sobre la Renta considera de fuente salvadoreña los servicios prestados en el país, aunque el cliente esté afuera y el dinero llegue a una cuenta del extranjero. Lo que ganas por ${nombre} se suma a tu renta y lo liquidas en la declaración anual, que se presenta a más tardar el 30 de abril.`,
  },
  {
    q: `¿Cómo facturo lo que cobro por ${nombre}?`,
    a: "Con el sistema de facturación electrónica (DTE) del Ministerio de Hacienda. A un cliente o plataforma del extranjero se le emite una factura de exportación; a un cliente salvadoreño, factura o comprobante de crédito fiscal con IVA del 13 %. Para todo esto necesitas tu NIT (tu DUI) y, si superas el umbral, estar inscrito como contribuyente de IVA.",
  },
  {
    q: "¿Cuánto me van a cobrar de renta?",
    a: "Depende de tu renta neta del año (lo que cobras menos comisiones y gastos con comprobante). Hasta $6,600 al año está exenta; después, la tabla del art. 37 sube por tramos de 10 %, 20 % y 30 %. La calculadora hace la cuenta con tus números.",
  },
];

export const plataformas: Plataforma[] = [
  {
    slug: "upwork",
    nombre: "Upwork",
    etiqueta: "Upwork",
    comisionDefault: 10,
    comisionNota:
      "Upwork descuenta una comisión de servicio de cada pago y el porcentaje ha cambiado con los años. Revisa el desglose en tu historial de transacciones y ajusta el campo.",
    keyword: "Impuestos por Upwork en El Salvador",
    intro:
      "Cobras en dólares por Upwork desde El Salvador y no sabes cuánto apartar para Hacienda. Calcula tu renta e IVA con la tabla 2026 y descubre cuánto te queda limpio.",
    puntos: [
      {
        titulo: "Tu ingreso es el monto bruto",
        texto:
          "Para Hacienda tu ingreso es lo que el cliente paga por tu trabajo. La comisión de Upwork es un gasto que puedes restar si conservas el comprobante (el detalle de transacciones de la plataforma).",
      },
      {
        titulo: "IVA 0 % si es exportación",
        texto:
          "Un cliente no domiciliado en El Salvador que usa tu servicio solo afuera permite facturar como exportación, a tasa 0 %. Si no calificas, el IVA de 13 % sale de lo que cobras.",
      },
      {
        titulo: "Nadie te retiene renta",
        texto:
          "Como el cliente está afuera, nadie te hace la retención del 10 % que aplicaría una empresa salvadoreña. Aparta tú el dinero cada mes para no llevarte una sorpresa en abril.",
      },
    ],
    faq: faqComunes("Upwork"),
  },
  {
    slug: "fiverr",
    nombre: "Fiverr",
    etiqueta: "Fiverr",
    comisionDefault: 20,
    comisionNota: "Fiverr retiene alrededor del 20 % de cada pedido. Ajusta si tu caso es distinto.",
    keyword: "Impuestos por Fiverr en El Salvador",
    intro:
      "Vendes gigs en Fiverr desde El Salvador. Descubre cuánta renta e IVA te toca y cuánto te queda limpio después de la comisión y los impuestos.",
    puntos: [
      {
        titulo: "La comisión de Fiverr pesa mucho",
        texto:
          "Con un 20 % de comisión, restarla como gasto baja bastante tu renta neta. Descarga y guarda los reportes de ganancias de la plataforma.",
      },
      {
        titulo: "Las propinas también son ingreso",
        texto: "Los tips que te dejan los clientes forman parte de tus ingresos gravados.",
      },
      {
        titulo: "Retiros y comisiones de transferencia",
        texto:
          "Lo que pagas por retirar a Payoneer o a tu banco es un gasto de tu actividad. Guarda los comprobantes.",
      },
    ],
    faq: faqComunes("Fiverr"),
  },
  {
    slug: "youtube",
    nombre: "YouTube",
    etiqueta: "YouTube",
    comisionDefault: 0,
    comisionNota:
      "Google paga tu parte ya descontada, así que normalmente la comisión aquí es 0 %. Si tienes una MCN o representante, pon su porcentaje.",
    keyword: "Impuestos por YouTube en El Salvador",
    intro:
      "Ganas dinero con AdSense, membresías o Super Chats en YouTube. Calcula la renta que te toca en El Salvador y cuánto te queda en el bolsillo.",
    puntos: [
      {
        titulo: "Retención de EE.UU. sobre vistas de EE.UU.",
        texto:
          "Google retiene impuesto de EE.UU. sobre lo que ganas por audiencia de ese país. Como El Salvador no tiene tratado para evitar la doble tributación con EE.UU., esa retención suele ser del 30 %. Llena tu información fiscal en AdSense (formulario W-8BEN) para que no te retengan sobre todo lo demás.",
      },
      {
        titulo: "Patrocinios en especie también cuentan",
        texto:
          "Los productos que recibes a cambio de publicidad tienen valor y, para Hacienda, son ingreso aunque no hayas recibido dinero.",
      },
      {
        titulo: "Tu equipo es un gasto",
        texto:
          "Cámaras, micrófonos, iluminación y software son gastos de tu actividad si tienes el comprobante. Restarlos baja tu renta neta.",
      },
    ],
    faq: faqComunes("YouTube"),
  },
  {
    slug: "deel",
    nombre: "Deel",
    etiqueta: "Deel",
    comisionDefault: 0,
    comisionNota:
      "Con Deel normalmente la empresa paga la comisión. Si pagas costos por retirar o convertir, inclúyelos aquí.",
    keyword: "Impuestos si cobras por Deel en El Salvador",
    intro:
      "Trabajas como contractor para una empresa extranjera y cobras por Deel. Ese contrato no te convierte en empleado: tú declaras y pagas tu renta en El Salvador. Calcula cuánto.",
    puntos: [
      {
        titulo: "Contractor no es empleado",
        texto:
          "Como contractor no tienes patrono en El Salvador: nadie te retiene renta ni te descuenta ISSS o AFP. Tú facturas y presentas tu declaración anual.",
      },
      {
        titulo: "Sueldo fijo en dólares",
        texto:
          "Un ingreso mensual estable facilita planear. Aparta cada mes lo que te indica la calculadora y llegarás a abril sin apuros.",
      },
      {
        titulo: "Seguridad social por tu cuenta",
        texto:
          "Si quieres cobertura de salud o ahorro para el retiro, puedes cotizar como independiente al ISSS y a una AFP. La calculadora no incluye esas cotizaciones.",
      },
    ],
    faq: faqComunes("Deel"),
  },
  {
    slug: "twitch",
    nombre: "Twitch",
    etiqueta: "Twitch",
    comisionDefault: 0,
    comisionNota:
      "Twitch paga tu parte de suscripciones y bits ya descontada. Pon aquí otras comisiones que pagues (agencias, retiros).",
    keyword: "Impuestos por Twitch en El Salvador",
    intro:
      "Haces streaming y Twitch te paga en dólares. Calcula tu renta e IVA en El Salvador con la tabla 2026 y cuánto te queda cada mes.",
    puntos: [
      {
        titulo: "Subs, bits y anuncios son ingresos",
        texto: "Todo lo que te paga Twitch, más donaciones por plataformas externas, suma a tu renta.",
      },
      {
        titulo: "Retención de EE.UU.",
        texto:
          "Como con YouTube, Twitch puede retener impuesto de EE.UU. sobre ciertos ingresos. Llena tu información fiscal en la plataforma para que la retención sea la mínima que corresponde.",
      },
      {
        titulo: "Tu setup es un gasto",
        texto: "PC, cámara, micrófono e internet son gastos de tu actividad si tienes el comprobante.",
      },
    ],
    faq: faqComunes("Twitch"),
  },
  {
    slug: "clientes-directos",
    nombre: "clientes en el extranjero",
    etiqueta: "Clientes en el extranjero",
    comisionDefault: 0,
    comisionNota:
      "Si cobras por PayPal, Stripe o Payoneer, pon aquí el porcentaje aproximado que te cobran por recibir el pago.",
    keyword: "Impuestos por clientes en el extranjero (PayPal, Stripe, Payoneer)",
    intro:
      "Le facturas directamente a clientes en EE.UU., Canadá o Europa y cobras por PayPal, Stripe o transferencia. Calcula tus impuestos en El Salvador y cuánto te queda.",
    puntos: [
      {
        titulo: "Exportación de servicios",
        texto:
          "Si el cliente no está domiciliado en El Salvador y usa el servicio exclusivamente afuera, facturas con IVA 0 % y puedes pedir la devolución del IVA que pagaste en tus gastos.",
      },
      {
        titulo: "Guarda la evidencia",
        texto:
          "Contrato, correos, facturas y el rastro del pago desde el extranjero ayudan a demostrar que el servicio se usó fuera del país. Hacienda puede pedírtelos.",
      },
      {
        titulo: "Comisiones de cobro",
        texto:
          "PayPal y Stripe cobran por transacción y, a veces, por conversión de moneda. Son gastos de tu actividad si guardas el comprobante.",
      },
    ],
    faq: faqComunes("PayPal, Stripe o Payoneer"),
  },
];

export function getPlataforma(slug: string): Plataforma | undefined {
  return plataformas.find((p) => p.slug === slug);
}

export const faqGeneral: FaqItem[] = [
  {
    q: "¿Qué tan exacto es el cálculo?",
    a: "Es una estimación mensual con la tabla de renta vigente en 2026, suponiendo ingresos iguales todo el año. No incluye deducciones personales, retenciones que ya te hayan hecho ni impuestos de otros países. Úsalo para planear y confirma tu caso con un contador.",
  },
  {
    q: "¿Mis datos se guardan en algún lado?",
    a: "No. El cálculo ocurre en tu navegador. No pedimos registro y no enviamos tus montos a ningún servidor. Si usas “Copiar enlace”, los números van solo en la URL que tú compartes.",
  },
  {
    q: "¿Cuánto puedo ganar sin pagar renta?",
    a: "Desde la reforma de abril de 2025, la renta neta de hasta $6,600 al año ($550 al mes) está exenta. Si la superas, pagas según los tramos del art. 37: el primero ya incluye una cuota fija de $212.12 más el 10 % de lo que pase de $6,600.",
  },
  {
    q: "¿Cuándo aplica el IVA 0 %?",
    a: "Cuando exportas el servicio: el cliente no está domiciliado en El Salvador y el servicio se usa exclusivamente en el extranjero. Que el cliente sea extranjero no basta por sí solo; si el servicio se aprovecha en el país, lleva 13 %. Si tienes dudas, elige 13 % para ver el escenario conservador.",
  },
  {
    q: "¿Tengo que inscribirme como contribuyente de IVA?",
    a: "Si tus ventas de servicios del último año superan $5,714.29, sí. Por debajo de ese monto (y con pocos activos) puedes quedar como pequeño contribuyente, sin obligación de IVA. Las exportaciones también cuentan: aunque vayan al 0 %, se declaran.",
  },
  {
    q: "¿Y si programo software?",
    a: "La Ley de Fomento a la Innovación y Manufactura de Tecnologías (2023) contempla exenciones de renta para ciertas actividades tecnológicas, como el desarrollo de software, si obtienes la calificación correspondiente. No es automática y la calculadora no la aplica; consúltalo con un contador.",
  },
];
