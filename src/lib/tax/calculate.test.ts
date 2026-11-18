import { describe, expect, it } from "vitest";
import { applyTariff, calculate, isrAnual } from "./calculate";
import { fromSearchParams, parseAmount, toSearchParams, type FormState } from "./input";
import { ISR_ANNUAL_2026, ISR_MONTHLY_2026 } from "./tables2026";

describe("tabla ISR art. 37 (2026)", () => {
  it("está ordenada", () => {
    for (const table of [ISR_ANNUAL_2026, ISR_MONTHLY_2026]) {
      for (let i = 1; i < table.length; i++) expect(table[i].lower).toBeGreaterThan(table[i - 1].lower);
    }
  });

  it("del tramo III en adelante la cuota fija es el impuesto al tope del tramo anterior", () => {
    // Los tramos I y II se reformaron en 2025 sin ajustar la cuota fija; III y IV siguen siendo continuos.
    for (const table of [ISR_ANNUAL_2026, ISR_MONTHLY_2026]) {
      const prev = table[2];
      const cur = table[3];
      const atTop = prev.fixed + (cur.lower - prev.lower) * prev.rate;
      expect(Math.abs(atTop - cur.fixed)).toBeLessThan(0.01);
    }
  });

  it("exenta hasta $6,600 al año", () => {
    expect(isrAnual(6_000)).toBe(0);
    expect(isrAnual(6_600)).toBe(0);
    expect(isrAnual(6_600.01)).toBeCloseTo(212.12, 2);
  });

  it("calcula a mano los tramos II, III y IV", () => {
    // 212.12 + (9,000 − 6,600) × 10 %
    expect(isrAnual(9_000)).toBeCloseTo(452.12, 2);
    // 720 + (19,200 − 9,142.86) × 20 %
    expect(isrAnual(19_200)).toBeCloseTo(2_731.43, 2);
    // 3,462.86 + (30,000 − 22,857.14) × 30 %
    expect(isrAnual(30_000)).toBeCloseTo(5_605.72, 2);
  });

  it("devuelve 0 para bases no positivas", () => {
    expect(applyTariff(0, ISR_ANNUAL_2026)).toBe(0);
    expect(applyTariff(-50, ISR_ANNUAL_2026)).toBe(0);
    expect(applyTariff(Number.NaN, ISR_ANNUAL_2026)).toBe(0);
  });
});

describe("calculate", () => {
  const base = {
    ingresoUSD: 2_000,
    comisionPct: 10,
    gastosUSD: 200,
    gastosConIVA: true,
    exportacion: true,
  };

  it("exportación: IVA 0 %, ISR sobre la renta neta y crédito fiscal a favor", () => {
    const r = calculate(base);
    expect(r.comision).toBe(200);
    expect(r.ivaDebito).toBe(0);
    expect(r.ivaPorPagar).toBe(0);
    expect(r.ivaSaldoAFavor).toBe(26);
    expect(r.rentaNetaMensual).toBe(1_600);
    expect(r.rentaNetaAnual).toBe(19_200);
    expect(r.isrAnual).toBeCloseTo(2_731.43, 2);
    expect(r.isrMensual).toBeCloseTo(227.62, 2);
    expect(r.tasaMarginal).toBe(0.2);
    // neto = 2,000 − 200 − 226 − 227.62
    expect(r.netoMensual).toBeCloseTo(1_346.38, 2);
  });

  it("sin exportación: separa el IVA del 13 % del cobro", () => {
    const r = calculate({ ...base, ingresoUSD: 1_130, comisionPct: 0, gastosUSD: 0, exportacion: false });
    expect(r.ingresoGravable).toBe(1_000);
    expect(r.ivaDebito).toBe(130);
    expect(r.ivaPorPagar).toBe(130);
    expect(r.apartarMensual).toBeCloseTo(130 + r.isrMensual, 2);
  });

  it("ingresos bajos no pagan ISR", () => {
    const r = calculate({ ...base, ingresoUSD: 500, comisionPct: 0, gastosUSD: 0 });
    expect(r.isrMensual).toBe(0);
    expect(r.tasaMarginal).toBe(0);
  });

  it("sin ingresos todo es cero", () => {
    const r = calculate({ ...base, ingresoUSD: 0, gastosUSD: 0 });
    expect(r.netoMensual).toBe(0);
    expect(r.tasaEfectiva).toBe(0);
  });
});

describe("entrada del usuario", () => {
  it("limpia y acota números", () => {
    expect(parseAmount("1,250.50", "ingresoUSD")).toBe(1250.5);
    expect(parseAmount("$ 300", "ingresoUSD")).toBe(300);
    expect(parseAmount("-5", "ingresoUSD")).toBeNull();
    expect(parseAmount("1e9", "ingresoUSD")).toBeNull();
    expect(parseAmount("<script>", "ingresoUSD")).toBeNull();
    expect(parseAmount("999", "comisionPct")).toBe(60);
  });

  const form: FormState = {
    ingresoUSD: "2000",
    comisionPct: "10",
    gastosUSD: "150",
    gastosConIVA: false,
    exportacion: true,
  };

  it("ida y vuelta por la URL", () => {
    const qs = toSearchParams(form);
    expect(fromSearchParams("?" + qs, { ...form, ingresoUSD: "0" })).toEqual(form);
  });

  it("ignora parámetros basura", () => {
    expect(fromSearchParams("?utm_source=x", form)).toBeNull();
    const r = fromSearchParams("?usd=abc&exp=maybe&com=20", form);
    expect(r?.ingresoUSD).toBe("2000");
    expect(r?.exportacion).toBe(true);
    expect(r?.comisionPct).toBe("20");
  });
});
