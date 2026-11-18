import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/** Los dominios de AdSense solo se permiten si está configurado el ID de editor. */
const ads = /^ca-pub-\d{10,20}$/.test(process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "");
const adScript = ads
  ? " https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.gstatic.com https://*.adtrafficquality.google"
  : "";
const adFrame = ads
  ? "https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.adtrafficquality.google"
  : "'none'";

/**
 * CSP sin nonces para conservar el prerenderizado estático (los nonces fuerzan render dinámico).
 * 'unsafe-inline' en scripts es necesario para los scripts de hidratación de Next en páginas estáticas.
 * Vercel Analytics se sirve desde el mismo dominio (/_vercel/insights), así que entra en 'self'.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${adScript}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${ads ? " https:" : ""}`,
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}${adScript}`,
  `frame-src ${adFrame}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Rutas de la versión anterior (México).
    return [
      { source: "/resico-vs-actividad-empresarial", destination: "/exportacion-de-servicios", permanent: true },
      { source: "/tablas-isr-2026", destination: "/tabla-renta-2026", permanent: true },
    ];
  },
  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
