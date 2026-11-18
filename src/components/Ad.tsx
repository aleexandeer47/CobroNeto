import { adSlots, site } from "@/config/site";
import { AdSlot } from "./AdSlot";

/** Anuncio en una posición del sitio. No renderiza nada mientras AdSense no esté configurado. */
export function Ad({ posicion, className }: { posicion: keyof typeof adSlots; className?: string }) {
  const slot = adSlots[posicion];
  if (!site.adsenseClient || !slot) return null;
  return <AdSlot client={site.adsenseClient} slot={slot} className={className} />;
}
