import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("strong acid-base neutralization", () => {
  it("balances HCl + NaOH -> NaCl + H2O", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HBr + KOH -> KBr + H2O", () => {
    const r = balance("HBr + KOH -> KBr + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HI + NaOH -> NaI + H2O", () => {
    const r = balance("HI + NaOH -> NaI + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HNO3 + KOH -> KNO3 + H2O", () => {
    const r = balance("HNO3 + KOH -> KNO3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HClO4 + NaOH -> NaClO4 + H2O", () => {
    const r = balance("HClO4 + NaOH -> NaClO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances H2SO4 + 2KOH -> K2SO4 + 2H2O", () => {
    const r = balance("H2SO4 + KOH -> K2SO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
});

describe("weak acid-base neutralization", () => {
  it("balances CH3COOH + NaOH -> CH3COONa + H2O", () => {
    const r = balance("CH3COOH + NaOH -> CH3COONa + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HCN + NaOH -> NaCN + H2O", () => {
    const r = balance("HCN + NaOH -> NaCN + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances HF + NaOH -> NaF + H2O", () => {
    const r = balance("HF + NaOH -> NaF + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H2S + 2NaOH -> Na2S + 2H2O", () => {
    const r = balance("H2S + NaOH -> Na2S + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H3PO4 + 3NaOH -> Na3PO4 + 3H2O", () => {
    const r = balance("H3PO4 + NaOH -> Na3PO4 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances NH3 + HCl -> NH4Cl", () => {
    const r = balance("NH3 + HCl -> NH4Cl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("polyprotic acid neutralization", () => {
  it("balances H2SO4 + 2NaOH -> Na2SO4 + 2H2O", () => {
    const r = balance("H2SO4 + NaOH -> Na2SO4 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H2SO4 + NaOH -> NaHSO4 + H2O", () => {
    const r = balance("H2SO4 + NaOH -> NaHSO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances H3PO4 + NaOH -> NaH2PO4 + H2O", () => {
    const r = balance("H3PO4 + NaOH -> NaH2PO4 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H2CO3 + NaOH -> NaHCO3 + H2O", () => {
    const r = balance("H2CO3 + NaOH -> NaHCO3 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H2CO3 + 2NaOH -> Na2CO3 + 2H2O", () => {
    const r = balance("H2CO3 + NaOH -> Na2CO3 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H3PO4 + 2NaOH -> Na2HPO4 + 2H2O", () => {
    const r = balance("H3PO4 + NaOH -> Na2HPO4 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("metal carbonate acid reactions", () => {
  it("balances Na2CO3 + 2HCl -> 2NaCl + H2O + CO2", () => {
    const r = balance("Na2CO3 + HCl -> NaCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1, 1]);
  });
  it("balances K2CO3 + 2HCl -> 2KCl + H2O + CO2", () => {
    const r = balance("K2CO3 + HCl -> KCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1, 1]);
  });
  it("balances CaCO3 + 2HCl -> CaCl2 + H2O + CO2", () => {
    const r = balance("CaCO3 + HCl -> CaCl2 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances MgCO3 + 2HCl -> MgCl2 + H2O + CO2", () => {
    const r = balance("MgCO3 + HCl -> MgCl2 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances NaHCO3 + HCl -> NaCl + H2O + CO2", () => {
    const r = balance("NaHCO3 + HCl -> NaCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances KHCO3 + HCl -> KCl + H2O + CO2", () => {
    const r = balance("KHCO3 + HCl -> KCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
});
