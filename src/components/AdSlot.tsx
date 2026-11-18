"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Bloque de AdSense adaptable. Solo se renderiza si el servidor le pasa client y slot
 * (ver adSlots en src/config/site.ts). Reserva altura para no mover el contenido al cargar.
 */
export function AdSlot({ client, slot, className = "" }: { client: string; slot: string; className?: string }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Bloqueador de anuncios o script aún no cargado: no rompemos la página.
    }
  }, []);

  return (
    <aside aria-label="Publicidad" className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>
      <p className="mb-1 text-[11px] uppercase tracking-wide text-muted">Publicidad</p>
      <ins
        className="adsbygoogle block min-h-[100px] overflow-hidden rounded-md bg-surface"
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
