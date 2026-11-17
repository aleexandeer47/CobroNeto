# CobroNeto

Calculadora de impuestos (ISR e IVA) para freelancers en México que cobran en dólares. Compara RESICO contra Actividad Empresarial y Profesional con tarifas SAT 2026.

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
| `src/lib/tax/tables2026.ts` | **Única fuente de tarifas.** Cuando el SAT publique cambios, se actualiza aquí. |
| `src/lib/tax/calculate.ts` | Motor de cálculo (funciones puras y probadas). |
| `src/lib/tax/input.ts` | Validación y acotado de entradas, y serialización en la URL. |
| `src/lib/tipo-cambio.ts` | Tipo de cambio de referencia (Frankfurter/BCE), cacheado por horas, con valor de respaldo. |
| `src/content/plataformas.ts` | Contenido SEO por plataforma. Para añadir una guía, agrega un objeto aquí. |
| `src/config/site.ts` | Nombre, dominio, afiliados y enlace para canalizar clientes a contadores (leads). |

Páginas: `/`, `/guias`, `/guias/[plataforma]`, `/resico-vs-actividad-empresarial`, `/tablas-isr-2026`, `/privacidad` y `/aviso-legal`, además de `sitemap.xml` y `robots.txt`.

## Monetización

1. **Afiliados.** Define `NEXT_PUBLIC_AFF_WISE` y `NEXT_PUBLIC_AFF_PAYONEER` en `.env.local` o en el hosting. Los enlaces reciben `rel="sponsored"` automáticamente.
2. **Leads a contadores.** Define `NEXT_PUBLIC_LEAD_URL`, por ejemplo un formulario de Tally o un enlace de WhatsApp. Ese enlace activa el bloque "Quiero asesoría".
3. **AdSense.** Cuando te aprueben:
   - Añade en `next.config.ts` (CSP) los dominios `https://pagead2.googlesyndication.com` y `https://*.googlesyndication.com` en `script-src`, `img-src`, `connect-src` y `frame-src`, más `https://*.doubleclick.net` y `https://*.google.com`.
   - Actualiza `/privacidad` e implementa un banner de consentimiento antes de mostrar anuncios.
4. **Premium (fase 2).** Cuentas, historial mensual, recordatorios de declaraciones, reporte para el contador y Stripe.

## Seguridad

- El cálculo ocurre en el navegador y los montos nunca se envían al servidor.
- El servidor hace una sola petición saliente, a una URL fija con timeout y validación de la respuesta, así que no hay riesgo de SSRF.
- Las entradas se limpian, se acotan por rango y se limitan en longitud. Los parámetros de la URL pasan por la misma validación.
- Cabeceras activas: CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` y COOP.
- El JSON-LD se escapa (`<` → `<`) y solo contiene texto propio.
- El sitio no usa cookies, sesiones, base de datos ni secretos.

## Precisión fiscal

- Tarifas ISR 2026: Anexo 8 RMF 2026 (DOF 28-12-2025). La prueba `calculate.test.ts` verifica que todas las cuotas fijas sean consistentes con sus tramos.
- RESICO PF: art. 113-E LISR, con tope de 3.5 millones en 2026.
- **Reforma 2027:** hay reportes de que el tope de RESICO sube a 5 millones a partir de 2027. Cuando se confirme en el DOF y salgan las reglas del SAT, conviene crear `tables2027.ts`.
