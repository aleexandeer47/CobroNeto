"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { calculate } from "@/lib/tax/calculate";
import { fromSearchParams, toCalcInput, toSearchParams, type FormState } from "@/lib/tax/input";
import { Result } from "./Result";

export interface PlataformaOption {
  slug: string;
  etiqueta: string;
  comisionDefault: number;
}

interface Props {
  plataformas: PlataformaOption[];
  plataformaInicial?: string;
}

const OTRA = "otra";

export function Calculator({ plataformas, plataformaInicial }: Props) {
  const inicial = plataformas.find((p) => p.slug === plataformaInicial);
  const [plataforma, setPlataforma] = useState(inicial?.slug ?? plataformas[0]?.slug ?? OTRA);
  const [form, setForm] = useState<FormState>(() => ({
    ingresoUSD: "1500",
    comisionPct: String(inicial?.comisionDefault ?? plataformas[0]?.comisionDefault ?? 0),
    gastosUSD: "100",
    gastosConIVA: true,
    exportacion: true,
  }));
  const [copiado, setCopiado] = useState<"idle" | "ok" | "error">("idle");

  // Restaura un cálculo compartido por enlace (?usd=…). Solo números validados y acotados.
  useEffect(() => {
    const shared = fromSearchParams(window.location.search, form);
    if (shared) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza una vez con la URL (sistema externo)
      setForm(shared);
      setPlataforma(OTRA);
    }
    // Solo al montar: el estado inicial es la base para los valores que falten en la URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const input = useMemo(() => toCalcInput(form), [form]);
  const result = useMemo(() => calculate(input), [input]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setCopiado("idle");
  };

  const onPlataforma = (slug: string) => {
    setPlataforma(slug);
    const p = plataformas.find((x) => x.slug === slug);
    if (p) set("comisionPct", String(p.comisionDefault));
  };

  const copiarEnlace = async () => {
    const url = `${window.location.origin}${window.location.pathname}?${toSearchParams(form)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiado("ok");
    } catch {
      setCopiado("error");
    }
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-12">
      <form onSubmit={(e) => e.preventDefault()} aria-label="Tus datos" className="rounded-lg border border-line">
        <h2 className="border-b border-line bg-surface px-4 py-3 text-sm font-medium">Tus datos del mes</h2>

        <div className="divide-y divide-line">
          <Row
            label="Cobras"
            hint="Lo que paga el cliente, antes de comisiones."
            prefix="US$"
            value={form.ingresoUSD}
            onChange={(v) => set("ingresoUSD", v)}
            strong
          />

          <div className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_11rem] sm:items-center sm:gap-4">
            <label htmlFor="plataforma" className="text-sm font-medium">
              Plataforma
            </label>
            <select
              id="plataforma"
              value={plataforma}
              onChange={(e) => onPlataforma(e.target.value)}
              className="h-11 w-full rounded-md border border-line-strong bg-bg px-2 text-sm outline-none focus:border-ink"
            >
              {plataformas.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.etiqueta}
                </option>
              ))}
              <option value={OTRA}>Otra</option>
            </select>
          </div>

          <Row
            label="Comisión"
            hint="Ajústala a lo que ves en tus pagos."
            suffix="%"
            value={form.comisionPct}
            onChange={(v) => set("comisionPct", v)}
          />

          <Row
            label="Gastos con comprobante"
            hint="Internet, equipo, software, coworking. Al mes, sin IVA."
            prefix="US$"
            value={form.gastosUSD}
            onChange={(v) => set("gastosUSD", v)}
          />

          <label className="flex min-h-11 cursor-pointer items-start gap-3 px-4 py-3">
            <input
              type="checkbox"
              checked={form.gastosConIVA}
              onChange={(e) => set("gastosConIVA", e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
            />
            <span className="text-sm">Mis gastos pagan IVA del 13 % (con crédito fiscal)</span>
          </label>

          <fieldset className="px-4 py-3">
            <legend className="float-left mb-2 w-full text-sm font-medium">IVA de tu servicio</legend>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong text-sm">
              <Segment
                checked={form.exportacion}
                onChange={() => set("exportacion", true)}
                label="0 % (exportación)"
              />
              <Segment
                checked={!form.exportacion}
                onChange={() => set("exportacion", false)}
                label="13 % (no sé / no aplica)"
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              0 % solo si el cliente no está domiciliado en El Salvador y usa el servicio exclusivamente en el
              extranjero (arts. 74 y 75 de la Ley de IVA).
            </p>
          </fieldset>
        </div>
      </form>

      <div>
        <Result result={result} input={input} />
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" onClick={copiarEnlace} className="btn">
            Copiar enlace a este cálculo
          </button>
          <span role="status" aria-live="polite" className="text-sm text-muted">
            {copiado === "ok" && "Enlace copiado."}
            {copiado === "error" && "No se pudo copiar. Copia la URL de tu navegador."}
          </span>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  hint,
  prefix,
  suffix,
  value,
  onChange,
  strong = false,
}: {
  label: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
  value: string;
  onChange: (v: string) => void;
  strong?: boolean;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  return (
    <div className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_11rem] sm:items-center sm:gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint && (
          <p id={hintId} className="mt-0.5 text-xs leading-relaxed text-muted">
            {hint}
          </p>
        )}
      </div>
      <div className="flex h-11 items-center rounded-md border border-line-strong bg-bg focus-within:border-ink">
        {prefix && <span className="num pl-2.5 text-sm text-muted">{prefix}</span>}
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          maxLength={16}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hint ? hintId : undefined}
          className={`num w-full min-w-0 bg-transparent px-2 text-right outline-none ${
            strong ? "text-lg font-medium" : "text-base"
          }`}
        />
        {suffix && <span className="num pr-2.5 text-sm text-muted">{suffix}</span>}
      </div>
    </div>
  );
}

function Segment({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      className={`flex min-h-11 cursor-pointer items-center justify-center px-2 text-center transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-accent ${
        checked ? "bg-ink font-medium text-bg" : "bg-bg text-ink hover:bg-surface"
      }`}
    >
      <input type="radio" name="iva-servicio" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}
