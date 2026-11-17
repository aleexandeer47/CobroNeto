import { describe, expect, it } from "vitest";
import { applyTariff, calculate, isrAnualActividad, resicoRate } from "./calculate";
import { fromSearchParams, parseAmount, toSearchParams, type FormState } from "./input";
import { ISR_ANNUAL_2026, ISR_MONTHLY_2026 } from "./tables2026";

describe("tarifas ISR 2026", () => {
  it("están ordenadas y las cuotas fijas son consistentes con el tramo anterior", () => {
    for (const table of [ISR_ANNUAL_2026, ISR_MONTHLY_2026]) {
      for (let i = 1; i < table.length; i++) {
        const prev = table[i - 1];
        const cur = table[i];
        expect(cur.lower).toBeGreaterThan(prev.lower);
        // cuota fija del tramo = impuesto al tope del tramo anterior (tolerancia de redondeo SAT)
        const atTop = prev.fixed + (cur.lower - 0.01 - prev.lower) * prev.rate;
        expect(Math.abs(atTop - cur.fixed)).toBeLessThan(1);
      }
    }
  });

  it("calcula el ISR anual a mano para 100,000", () => {
    // 5,051.37 + (100,000 − 86,022.12) × 10.88 %
    expect(isrAnualActividad(100_000)).toBeCloseTo(6_572.16, 1);
  });

  it("devuelve 0 para bases no positivas", () => {
    expect(applyTariff(0, ISR_ANNUAL_2026)).toBe(0);
    expect(applyTariff(-50, ISR_ANNUAL_2026)).toBe(0);
    expect(applyTariff(Number.NaN, ISR_ANNUAL_2026)).toBe(0);
  });
});

describe("RESICO", () => {
  it("usa la tasa del tramo sobre el total", () => {
    expect(resicoRate(20_000)).toBe(0.01);
    expect(resicoRate(25_000)).toBe(0.01);
    expect(resicoRate(25_000.01)).toBe(0.011);
    expect(resicoRate(83_333.33)).toBe(0.015);
    expect(resicoRate(200_000)).toBe(0.02);
    expect(resicoRate(250_000)).toBe(0.025);
  });
});

describe("calculate", () => {
  const base = {
    ingresoUSD: 2_000,
    comisionPct: 10,
    tipoCambio: 18,
    gastosMXN: 3_000,
    gastosConIVA: true,
    exportacion: true,
  };

  it("exportación: IVA 0 % y saldo a favor por gastos", () => {
    const r = calculate(base);
    expect(r.brutoMXN).toBe(36_000);
    expect(r.comisionMXN).toBe(3_600);
    expect(r.ivaTrasladado).toBe(0);
    expect(r.ivaSaldoAFavor).toBe(480);
    const [resico, actividad] = r.regimenes;
    expect(resico.tasaAplicada).toBe(0.011);
    expect(resico.isrMensual).toBe(396);
    // neto = 36,000 − 3,600 − 3,480 − 396
    expect(resico.netoMensual).toBe(28_524);
    // utilidad anual = (36,000 − 3,600 − 3,000) × 12 = 352,800
    expect(actividad.isrMensual).toBeCloseTo(isrAnualActividad(352_800) / 12, 2);
    expect(r.recomendado).toBe("resico");
  });

  it("sin exportación: separa el IVA del cobro", () => {
    const r = calculate({ ...base, exportacion: false, gastosMXN: 0 });
    expect(r.ingresoGravable).toBeCloseTo(36_000 / 1.16, 1);
    expect(r.ivaTrasladado).toBeCloseTo(36_000 - 36_000 / 1.16, 1);
    expect(r.regimenes[0].ivaPorPagar).toBeCloseTo(r.ivaTrasladado, 2);
  });

  it("fuera del tope de RESICO recomienda Actividad Empresarial", () => {
    const r = calculate({ ...base, ingresoUSD: 20_000 }); // 360,000 MXN/mes → 4.32 M/año
    expect(r.regimenes[0].elegible).toBe(false);
    expect(r.recomendado).toBe("actividad");
  });

  it("con gastos muy altos Actividad Empresarial puede convenir", () => {
    const r = calculate({ ...base, gastosMXN: 30_000, comisionPct: 0 });
    expect(r.recomendado).toBe("actividad");
  });

  it("sin ingresos no recomienda nada", () => {
    const r = calculate({ ...base, ingresoUSD: 0 });
    expect(r.recomendado).toBeNull();
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
    expect(parseAmount("1", "tipoCambio")).toBe(5);
  });

  const form: FormState = {
    ingresoUSD: "2000",
    comisionPct: "10",
    tipoCambio: "18.2",
    gastosMXN: "1500",
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
