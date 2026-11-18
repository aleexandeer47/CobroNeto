import { ImageResponse } from "next/og";

export const alt = "CobroNeto: calculadora de impuestos para freelancers en El Salvador";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen para compartir en WhatsApp, Facebook, X y LinkedIn (se genera en el build). */
export default function Image() {
  const segmentos = [
    { w: 62, c: "#136243" },
    { w: 11, c: "#2b2b28" },
    { w: 10, c: "#8f8e86" },
    { w: 17, c: "#cfcec5" },
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#141413",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 600 }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "5px solid #136243",
              borderRadius: 8,
              display: "flex",
            }}
          />
          CobroNeto
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>
            ¿Cuánto te queda de lo que cobras?
          </div>
          <div style={{ fontSize: 34, color: "#5e5d57", lineHeight: 1.35 }}>
            Renta e IVA para freelancers en El Salvador. Upwork, Fiverr, YouTube, Deel y clientes del extranjero.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", height: 22, borderRadius: 6, overflow: "hidden" }}>
            {segmentos.map((s) => (
              <div key={s.c} style={{ width: `${s.w}%`, background: s.c, display: "flex" }} />
            ))}
          </div>
          <div style={{ fontSize: 26, color: "#136243", fontWeight: 600 }}>Gratis · Sin registro · Tabla 2026</div>
        </div>
      </div>
    ),
    size,
  );
}
