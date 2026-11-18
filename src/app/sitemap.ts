import type { MetadataRoute } from "next";
import { plataformas } from "@/content/plataformas";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/guias", priority: 0.8 },
    ...plataformas.map((p) => ({ path: `/guias/${p.slug}`, priority: 0.9 })),
    { path: "/declarar-renta-freelancer", priority: 0.9 },
    { path: "/facturacion-electronica-freelancer", priority: 0.8 },
    { path: "/exportacion-de-servicios", priority: 0.8 },
    { path: "/tabla-renta-2026", priority: 0.8 },
    { path: "/acerca", priority: 0.3 },
    { path: "/contacto", priority: 0.3 },
    { path: "/privacidad", priority: 0.2 },
    { path: "/aviso-legal", priority: 0.2 },
  ];
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
