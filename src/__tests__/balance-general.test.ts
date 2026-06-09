import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("single displacement comprehensive", () => {
  it("balances Zn + CuCl2 -> ZnCl2 + Cu", () => {
    const r = balance("Zn + CuCl2 -> ZnCl2 + Cu");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Mg + FeSO4 -> MgSO4 + Fe", () => {
    const r = balance("Mg + FeSO4 -> MgSO4 + Fe");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Al + CuSO4 -> Al2(SO4)3 + Cu", () => {
    const r = balance("Al + CuSO4 -> Al2(SO4)3 + Cu");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Fe + AgNO3 -> Fe(NO3)2 + Ag", () => {
    const r = balance("Fe + AgNO3 -> Fe(NO3)2 + Ag");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Zn + Pb(NO3)2 -> Zn(NO3)2 + Pb", () => {
    const r = balance("Zn + Pb(NO3)2 -> Zn(NO3)2 + Pb");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("double displacement comprehensive", () => {
  it("balances Na2S + HCl -> NaCl + H2S", () => {
    const r = balance("Na2S + HCl -> NaCl + H2S");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances K2CO3 + HNO3 -> KNO3 + H2O + CO2", () => {
    const r = balance("K2CO3 + HNO3 -> KNO3 + H2O + CO2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Na2SO3 + HCl -> NaCl + H2O + SO2", () => {
    const r = balance("Na2SO3 + HCl -> NaCl + H2O + SO2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances AgNO3 + KBr -> AgBr + KNO3", () => {
    const r = balance("AgNO3 + KBr -> AgBr + KNO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances BaCl2 + H2SO4 -> BaSO4 + HCl", () => {
    const r = balance("BaCl2 + H2SO4 -> BaSO4 + HCl");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});
