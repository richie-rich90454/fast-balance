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

describe("polyatomic ionic compounds", () => {
  it("balances 2Al3+ + 3SO4^2- -> Al2(SO4)3", () => {
    const r = balance("Al3+ + SO4^2- -> Al2(SO4)3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Ca2+ + 2NO3- -> Ca(NO3)2", () => {
    const r = balance("Ca2+ + NO3- -> Ca(NO3)2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances 2NH4+ + SO4^2- -> (NH4)2SO4", () => {
    const r = balance("NH4+ + SO4^2- -> (NH4)2SO4");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Fe3+ + 3OH- -> Fe(OH)3", () => {
    const r = balance("Fe3+ + OH- -> Fe(OH)3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Cu2+ + 2OH- -> Cu(OH)2", () => {
    const r = balance("Cu2+ + OH- -> Cu(OH)2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances 2Fe3+ + 3CO3^2- -> Fe2(CO3)3", () => {
    const r = balance("Fe3+ + CO3^2- -> Fe2(CO3)3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("redox half-reactions acidic", () => {
  it("balances MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O", () => {
    const r = balance("MnO4- + H+ + e- -> Mn2+ + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 8, 5]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 4]);
  });
  it("balances Cr2O7^2- + 14H+ + 6e- -> 2Cr3+ + 7H2O", () => {
    const r = balance("Cr2O7^2- + H+ + e- -> Cr3+ + H2O");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(14);
    expect(r.reactants[2].coefficient).toBe(6);
    expect(r.products[0].coefficient).toBe(2);
    expect(r.products[1].coefficient).toBe(7);
  });
  it("balances MnO4- + H+ + e -> Mn2+ + H2O (bare electron)", () => {
    const r = balance("MnO4- + H+ + e -> Mn2+ + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 8, 5]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 4]);
  });
});
