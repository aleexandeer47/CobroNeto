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
    q: `¿Tengo que pagar impuestos en México por lo que gano en ${nombre}?`,
    a: `Sí. Si eres residente fiscal en México, pagas ISR por tus ingresos de cualquier parte del mundo, incluidos los que recibes en dólares por ${nombre}. No importa que el dinero se quede en una cuenta del extranjero.`,
  },
  {
    q: `¿Cómo facturo lo que cobro por ${nombre}?`,
    a: "Emites un CFDI de ingreso al cliente o a la plataforma usando el RFC genérico para extranjeros (XEXX010101000) y el nombre y país del receptor. El monto se convierte a pesos con el tipo de cambio FIX que publica Banxico en el DOF el día anterior al cobro.",
  },
  {
    q: "¿Me conviene RESICO o Actividad Empresarial?",
    a: "Si tus gastos deducibles son bajos (lo normal en servicios digitales), RESICO casi siempre paga menos: entre 1 % y 2.5 % de lo que cobras. Actividad Empresarial puede convenir si tienes gastos altos con factura, porque ahí el ISR se calcula sobre la utilidad. La calculadora compara ambos con tus números.",
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
    keyword: "Impuestos por Upwork en México",
    intro:
      "Cobras en dólares por Upwork y no sabes cuánto apartar para el SAT. Calcula tu ISR e IVA con tarifas 2026 y compara RESICO contra Actividad Empresarial en segundos.",
    puntos: [
      {
        titulo: "Tu ingreso es el monto bruto",
        texto:
          "Para el SAT tu ingreso es lo que el cliente paga por tu trabajo. La comisión de Upwork es un gasto: en Actividad Empresarial puedes deducirla si tienes el comprobante; en RESICO no hay deducciones.",
      },
      {
        titulo: "IVA 0 % solo si califica como exportación",
        texto:
          "Los servicios a clientes en el extranjero pueden tributar a tasa 0 % de IVA, pero solo si están en los supuestos del art. 29 de la Ley del IVA y se aprovechan fuera de México. Si no calificas, el IVA de 16 % sale de lo que cobras.",
      },
      {
        titulo: "Convierte con el tipo de cambio correcto",
        texto:
          "Cada cobro se convierte a pesos con el tipo de cambio FIX publicado por Banxico el día anterior a que recibes el dinero, no con el de tu banco.",
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
    keyword: "Impuestos por Fiverr en México",
    intro:
      "Vendes gigs en Fiverr desde México. Descubre cuánto ISR e IVA te toca pagar y cuánto te queda limpio después de la comisión y los impuestos.",
    puntos: [
      {
        titulo: "La comisión de Fiverr pesa mucho",
        texto:
          "Con un 20 % de comisión, la diferencia entre RESICO (sin deducciones) y Actividad Empresarial (que sí la deduce) es mayor que en otras plataformas. Vale la pena comparar.",
      },
      {
        titulo: "Las propinas también son ingreso",
        texto: "Los tips que recibes de clientes forman parte de tus ingresos acumulables.",
      },
      {
        titulo: "Retiros y comisiones de transferencia",
        texto:
          "Las comisiones por retirar a Payoneer o a tu banco son gastos del negocio. Guarda los comprobantes si tributas en Actividad Empresarial.",
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
    keyword: "Impuestos por YouTube en México",
    intro:
      "Ganas dinero con AdSense, membresías o Super Chats en YouTube. Calcula el ISR que te toca en México y cuánto te queda en pesos.",
    puntos: [
      {
        titulo: "Retención de EE.UU. sobre vistas de EE.UU.",
        texto:
          "Google puede retener impuestos de EE.UU. sobre lo que ganas por audiencia de ese país. Llenar la información fiscal (formulario W-8BEN) y aplicar el tratado México–EE.UU. normalmente reduce esa retención. Lo retenido en el extranjero podría acreditarse en México: consúltalo con un contador.",
      },
      {
        titulo: "Patrocinios en especie también cuentan",
        texto:
          "Los productos que recibes a cambio de publicidad tienen valor fiscal. Para el SAT son ingresos aunque no hayas recibido dinero.",
      },
      {
        titulo: "Equipo deducible",
        texto:
          "Cámaras, micrófonos, iluminación y software pueden deducirse en Actividad Empresarial. Si tus gastos son altos, compara ambos regímenes.",
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
    keyword: "Impuestos si cobras por Deel en México",
    intro:
      "Trabajas como contractor para una empresa extranjera y cobras por Deel. Ese contrato no te convierte en empleado: tú pagas tus impuestos en México. Calcula cuánto.",
    puntos: [
      {
        titulo: "Contractor ≠ empleado",
        texto:
          "Como contractor nadie te retiene ISR en México. Tú te das de alta en el SAT, facturas y presentas tus declaraciones mensuales.",
      },
      {
        titulo: "Sueldo fijo en dólares",
        texto:
          "Un ingreso mensual estable facilita planear. RESICO suele ser muy competitivo para contractors con pocos gastos.",
      },
      {
        titulo: "Cuidado con el tipo de cambio",
        texto:
          "Si retiras a pesos en una fecha distinta a la del pago, el tipo de cambio fiscal y el de tu banco no coinciden. Para el SAT importa el FIX del día anterior al cobro.",
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
    keyword: "Impuestos por Twitch en México",
    intro:
      "Haces streaming y Twitch te paga en dólares. Calcula tu ISR e IVA en México con tarifas 2026 y descubre qué régimen te conviene.",
    puntos: [
      {
        titulo: "Subs, bits y anuncios son ingresos",
        texto: "Todo lo que te paga Twitch, más donaciones por plataformas externas, se acumula como ingreso.",
      },
      {
        titulo: "Retención de EE.UU.",
        texto:
          "Como con YouTube, Twitch puede retener impuestos de EE.UU. sobre ciertos ingresos. Llena tu información fiscal para aplicar el tratado.",
      },
      {
        titulo: "Tu setup puede deducirse",
        texto: "PC, cámara, micrófono e internet son deducibles en Actividad Empresarial si tienes factura.",
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
      "Si cobras por PayPal, Stripe o Wise, pon aquí el porcentaje aproximado que te cobran por recibir o convertir.",
    keyword: "Impuestos por clientes en el extranjero (PayPal, Stripe, Wise)",
    intro:
      "Le facturas directamente a clientes en EE.UU., Canadá o Europa y cobras por PayPal, Stripe o transferencia. Calcula tus impuestos en México y cuánto te queda.",
    puntos: [
      {
        titulo: "Exportación de servicios",
        texto:
          "Si el servicio está en los supuestos del art. 29, fracción IV de la Ley del IVA y se aprovecha en el extranjero, puedes facturar con IVA 0 % y pedir la devolución del IVA de tus gastos.",
      },
      {
        titulo: "Guarda la evidencia",
        texto:
          "Contrato, correos, facturas y el rastro del pago desde el extranjero ayudan a demostrar que el servicio se aprovechó fuera de México.",
      },
      {
        titulo: "Comisiones de cobro",
        texto:
          "PayPal y Stripe cobran por transacción y por conversión de moneda. Son gastos deducibles en Actividad Empresarial con su comprobante.",
      },
    ],
    faq: faqComunes("PayPal, Stripe o Wise"),
  },
];

export function getPlataforma(slug: string): Plataforma | undefined {
  return plataformas.find((p) => p.slug === slug);
}

export const faqGeneral: FaqItem[] = [
  {
    q: "¿Qué tan exacto es el cálculo?",
    a: "Es una estimación mensual con las tarifas 2026 del SAT, suponiendo ingresos constantes. No incluye deducciones personales, pagos provisionales ya hechos ni retenciones de otros países. Úsalo para planear y confirma tu caso con un contador.",
  },
  {
    q: "¿Mis datos se guardan en algún lado?",
    a: "No. El cálculo ocurre en tu navegador. No pedimos registro y no enviamos tus montos a ningún servidor. Si usas “Copiar enlace”, los números van solo en la URL que tú compartes.",
  },
  {
    q: "¿Por qué el tipo de cambio no coincide con mi banco?",
    a: "Mostramos una referencia de mercado para que la calculadora funcione sin configurar nada. Para efectos fiscales debes usar el tipo de cambio FIX que publica Banxico en el DOF el día anterior a cada cobro. Puedes editar el campo.",
  },
  {
    q: "¿Qué pasa si gano más de 3.5 millones al año?",
    a: "En 2026 ya no puedes tributar en RESICO como persona física y pasas a Actividad Empresarial y Profesional. La calculadora te lo marca automáticamente.",
  },
  {
    q: "¿Cuándo aplica el IVA 0 %?",
    a: "Cuando el servicio está en los supuestos de exportación del art. 29 de la Ley del IVA (por ejemplo, ciertos servicios de tecnologías de la información, asistencia técnica o publicidad) y se aprovecha en el extranjero. No todos los servicios a extranjeros califican; si tienes dudas, desactiva la opción para ver el escenario conservador.",
  },
];
