import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("weathering and erosion", () => {
  it("balances Fe2O3 + H2O -> Fe(OH)3", () => {
    const r = balance("Fe2O3 + H2O -> Fe(OH)3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances CaCO3 + H2O + CO2 -> Ca(HCO3)2", () => {
    const r = balance("CaCO3 + H2O + CO2 -> Ca(HCO3)2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances SiO2 + H2O -> H2SiO3", () => {
    const r = balance("SiO2 + H2O -> H2SiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances MgSiO3 + H2O -> Mg(OH)2 + H2SiO3", () => {
    const r = balance("MgSiO3 + H2O -> Mg(OH)2 + H2SiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances NaAlSi3O8 + H2O -> Al(OH)3 + H2SiO3 + NaOH", () => {
    const r = balance("NaAlSi3O8 + H2O -> Al(OH)3 + H2SiO3 + NaOH");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});
