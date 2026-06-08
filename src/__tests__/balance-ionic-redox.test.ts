import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("ionic compound formation", () => {
  it("balances Na+ + Cl- -> NaCl", () => {
    const r = balance("Na+ + Cl- -> NaCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances K+ + Br- -> KBr", () => {
    const r = balance("K+ + Br- -> KBr");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Ca2+ + 2Cl- -> CaCl2", () => {
    const r = balance("Ca2+ + Cl- -> CaCl2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances 2Al3+ + 3O2- -> Al2O3", () => {
    const r = balance("Al3+ + O2- -> Al2O3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Mg2+ + 2NO3- -> Mg(NO3)2", () => {
    const r = balance("Mg2+ + NO3- -> Mg(NO3)2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Ca2+ + CO3^2- -> CaCO3", () => {
    const r = balance("Ca2+ + CO3^2- -> CaCO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});
