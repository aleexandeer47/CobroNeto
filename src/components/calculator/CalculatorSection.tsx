import { plataformas } from "@/content/plataformas";
import { Calculator } from "./Calculator";

/** Server wrapper: pasa al cliente solo los datos de plataforma que necesita. */
export function CalculatorSection({ plataformaInicial }: { plataformaInicial?: string }) {
  return (
    <Calculator
      plataformaInicial={plataformaInicial}
      plataformas={plataformas.map(({ slug, etiqueta, comisionDefault }) => ({ slug, etiqueta, comisionDefault }))}
    />
  );
}
