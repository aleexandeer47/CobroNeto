# CobroNeto

Calculadora de impuestos (renta e IVA) para freelancers en El Salvador que cobran a clientes del extranjero. Estima cuánto apartar cada mes con la tabla del art. 37 de la Ley de Impuesto sobre la Renta vigente en 2026.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # pruebas del motor fiscal
npm run build      # build de producción
```

## Estructura

| Ruta | Qué es |
|---|---|
| `src/lib/tax/tables2026.ts` | **Única fuente de tablas y tasas.** Cuando Hacienda publique cambios, se actualiza aquí. |
| `src/lib/tax/calculate.ts` | Motor de cálculo (funciones puras y probadas). |
| `src/lib/tax/input.ts` | Validación y acotado de entradas, y serialización en la URL. |
| `src/content/plataformas.ts` | Contenido SEO por plataforma. Para añadir una guía, agrega un objeto aquí. |
| `src/config/site.ts` | Nombre, dominio, afiliados y enlace para canalizar clientes a contadores (leads). |

Páginas: `/`, `/guias`, `/guias/[plataforma]`, `/exportacion-de-servicios`, `/tabla-renta-2026`, `/privacidad` y `/aviso-legal`, además de `sitemap.xml` y `robots.txt`. Las rutas de la versión para México redirigen a sus equivalentes (ver `next.config.ts`).

## Monetización

1. **Afiliados.** Define `NEXT_PUBLIC_AFF_PAYONEER` y `NEXT_PUBLIC_AFF_WISE` en `.env.local` o en el hosting. Los enlaces reciben `rel="sponsored"` automáticamente.
2. **Leads a contadores.** Define `NEXT_PUBLIC_LEAD_URL`, por ejemplo un formulario de Tally o un enlace de WhatsApp. Ese enlace activa el bloque "Hablar con un contador".
3. **AdSense.** Cuando te aprueben:
   - Añade en `next.config.ts` (CSP) los dominios `https://pagead2.googlesyndication.com` y `https://*.googlesyndication.com` en `script-src`, `img-src`, `connect-src` y `frame-src`, más `https://*.doubleclick.net` y `https://*.google.com`.
   - Actualiza `/privacidad` e implementa un banner de consentimiento antes de mostrar anuncios.
4. **Premium (fase 2).** Cuentas, historial mensual, recordatorios de declaraciones, reporte para el contador y Stripe.

## Seguridad

- El cálculo ocurre en el navegador y los montos nunca se envían al servidor.
- El servidor no hace peticiones salientes.
- Las entradas se limpian, se acotan por rango y se limitan en longitud. Los parámetros de la URL pasan por la misma validación.
- Cabeceras activas: CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` y COOP.
- El JSON-LD se escapa (`<` → `<`) y solo contiene texto propio.
- El sitio no usa cookies, sesiones, base de datos ni secretos.

## Precisión fiscal

- Renta: art. 37 LISR reformado por el D.L. No. 293 (D.O. 30-04-2025), con renta exenta hasta $6,600 al año. La reforma no ajustó la cuota fija del tramo II ($212.12), así que la tabla tiene saltos en $6,600 y en $9,142.86; las pruebas lo documentan.
- Retención mensual de salarios: Decreto Ejecutivo No. 10 (30-04-2025). Se publica solo como referencia.
- IVA: 13 %; exportación de servicios al 0 % (arts. 74 y 75 de la Ley de IVA). Umbral de inscripción: $5,714.29 anuales (art. 28).
- No se modelan el pago a cuenta, las retenciones del 10 %, las deducciones personales del art. 33 ni las exenciones de la Ley de Fomento a la Innovación.
