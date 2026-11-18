import { site } from "@/config/site";

/**
 * /ads.txt para AdSense, generado a partir de NEXT_PUBLIC_ADSENSE_CLIENT.
 * Sin AdSense configurado responde 404 para no declarar vendedores inexistentes.
 */
export function GET() {
  if (!site.adsenseClient) return new Response("Not found", { status: 404 });
  const pub = site.adsenseClient.replace(/^ca-/, "");
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
