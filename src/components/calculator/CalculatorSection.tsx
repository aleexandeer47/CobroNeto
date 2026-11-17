import { plataformas } from "@/content/plataformas";
import { getTipoCambio } from "@/lib/tipo-cambio";
import { Calculator } from "./Calculator";

/** Server wrapper: obtiene el tipo de cambio (cacheado) y pasa solo lo necesario al cliente. */
export async function CalculatorSection({ plataformaInicial }: { plataformaInicial?: string }) {
  const tc = await getTipoCambio();
  return (
    <Calculator
      tipoCambio={tc.valor}
      tipoCambioFecha={tc.fecha}
      plataformaInicial={plataformaInicial}
      plataformas={plataformas.map(({ slug, etiqueta, comisionDefault }) => ({ slug, etiqueta, comisionDefault }))}
    />
  );
}
