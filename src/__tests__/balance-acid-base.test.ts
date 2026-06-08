import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("strong acid strong base", () => {
  it("balances HCl + NaOH -> NaCl + H2O", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HCl + KOH -> KCl + H2O", () => {
    const r = balance("HCl + KOH -> KCl + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances 2HCl + Ca(OH)2 -> CaCl2 + 2H2O", () => {
    const r = balance("HCl + Ca(OH)2 -> CaCl2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances 2HCl + Ba(OH)2 -> BaCl2 + 2H2O", () => {
    const r = balance("HCl + Ba(OH)2 -> BaCl2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances HNO3 + NaOH -> NaNO3 + H2O", () => {
    const r = balance("HNO3 + NaOH -> NaNO3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HNO3 + KOH -> KNO3 + H2O", () => {
    const r = balance("HNO3 + KOH -> KNO3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances 2HNO3 + Ca(OH)2 -> Ca(NO3)2 + 2H2O", () => {
    const r = balance("HNO3 + Ca(OH)2 -> Ca(NO3)2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
});

describe("diprotic and triprotic acid neutralization", () => {
  it("balances H2SO4 + 2NaOH -> Na2SO4 + 2H2O", () => {
    const r = balance("H2SO4 + NaOH -> Na2SO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances H2SO4 + 2KOH -> K2SO4 + 2H2O", () => {
    const r = balance("H2SO4 + KOH -> K2SO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances H2SO4 + Ca(OH)2 -> CaSO4 + 2H2O", () => {
    const r = balance("H2SO4 + Ca(OH)2 -> CaSO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances H3PO4 + 3NaOH -> Na3PO4 + 3H2O", () => {
    const r = balance("H3PO4 + NaOH -> Na3PO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
  it("balances 2H3PO4 + 3Ca(OH)2 -> Ca3(PO4)2 + 6H2O", () => {
    const r = balance("H3PO4 + Ca(OH)2 -> Ca3(PO4)2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 6]);
  });
  it("balances H2CO3 + 2NaOH -> Na2CO3 + 2H2O", () => {
    const r = balance("H2CO3 + NaOH -> Na2CO3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
});

describe("acid + carbonate", () => {
  it("balances 2HCl + Na2CO3 -> 2NaCl + H2O + CO2", () => {
    const r = balance("HCl + Na2CO3 -> NaCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1, 1]);
  });
  it("balances 2HCl + CaCO3 -> CaCl2 + H2O + CO2", () => {
    const r = balance("HCl + CaCO3 -> CaCl2 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances H2SO4 + Na2CO3 -> Na2SO4 + H2O + CO2", () => {
    const r = balance("H2SO4 + Na2CO3 -> Na2SO4 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances H2SO4 + CaCO3 -> CaSO4 + H2O + CO2", () => {
    const r = balance("H2SO4 + CaCO3 -> CaSO4 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances 2HNO3 + Na2CO3 -> 2NaNO3 + H2O + CO2", () => {
    const r = balance("HNO3 + Na2CO3 -> NaNO3 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1, 1]);
  });
});

describe("acid + bicarbonate", () => {
  it("balances HCl + NaHCO3 -> NaCl + H2O + CO2", () => {
    const r = balance("HCl + NaHCO3 -> NaCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances H2SO4 + 2NaHCO3 -> Na2SO4 + 2H2O + 2CO2", () => {
    const r = balance("H2SO4 + NaHCO3 -> Na2SO4 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2, 2]);
  });
  it("balances CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2", () => {
    const r = balance("CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });
});
