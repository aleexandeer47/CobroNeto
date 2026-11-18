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

Páginas: `/`, `/guias`, `/guias/[plataforma]`, `/declarar-renta-freelancer`, `/facturacion-electronica-freelancer`, `/exportacion-de-servicios`, `/tabla-renta-2026`, `/acerca`, `/contacto`, `/privacidad` y `/aviso-legal`, además de `sitemap.xml`, `robots.txt`, `ads.txt` y la imagen Open Graph. Las rutas de la versión para México redirigen a sus equivalentes (ver `next.config.ts`).

## Monetización

Todo se activa con variables de entorno (ver `.env.example`), sin tocar código. Después de cambiarlas en Vercel hay que hacer **Redeploy**.

1. **Leads a contadores.** `NEXT_PUBLIC_LEAD_URL` (formulario) o `NEXT_PUBLIC_WHATSAPP` (número). Activa el botón "Hablar con un contador" dentro del resultado de la calculadora, en el bloque de herramientas y en `/contacto`. Puedes cobrarle a uno o varios contadores por cada cliente que les mandes.
2. **AdSense.** `NEXT_PUBLIC_ADSENSE_CLIENT` carga el script, publica `/ads.txt`, añade la meta de verificación y abre la CSP solo a los dominios de Google. `NEXT_PUBLIC_ADSENSE_SLOT_CALCULADORA` y `NEXT_PUBLIC_ADSENSE_SLOT_ARTICULO` muestran los espacios (bajo la calculadora y dentro de los artículos). `/privacidad` ya incluye el texto sobre cookies de Google. Para tráfico de la UE/Reino Unido, Google exige una CMP certificada: actívala desde AdSense → Privacidad y mensajes.
3. **Afiliados.** `NEXT_PUBLIC_AFF_PAYONEER` y `NEXT_PUBLIC_AFF_WISE`. Los enlaces reciben `rel="sponsored"` automáticamente.
4. **Analítica.** Vercel Web Analytics viene integrado (sin cookies). Actívalo en Vercel → proyecto → Analytics.
5. **Premium (fase 2).** Cuentas, historial mensual, recordatorios de declaraciones, reporte para el contador y Stripe.

## Seguridad

- El cálculo ocurre en el navegador y los montos nunca se envían al servidor.
- El servidor no hace peticiones salientes. Los scripts de terceros (AdSense) solo se cargan si están configurados.
- Las entradas se limpian, se acotan por rango y se limitan en longitud. Los parámetros de la URL pasan por la misma validación.
- Cabeceras activas: CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` y COOP.
- El JSON-LD se escapa (`<` → `<`) y solo contiene texto propio.
- El sitio no usa cookies, sesiones, base de datos ni secretos.

## Precisión fiscal

- Renta: art. 37 LISR reformado por el D.L. No. 293 (D.O. 30-04-2025), con renta exenta hasta $6,600 al año. La reforma no ajustó la cuota fija del tramo II ($212.12), así que la tabla tiene saltos en $6,600 y en $9,142.86; las pruebas lo documentan.
- Retención mensual de salarios: Decreto Ejecutivo No. 10 (30-04-2025). Se publica solo como referencia.
- IVA: 13 %; exportación de servicios al 0 % (arts. 74 y 75 de la Ley de IVA). Umbral de inscripción: $5,714.29 anuales (art. 28).
- No se modelan el pago a cuenta, las retenciones del 10 %, las deducciones personales del art. 33 ni las exenciones de la Ley de Fomento a la Innovación.
