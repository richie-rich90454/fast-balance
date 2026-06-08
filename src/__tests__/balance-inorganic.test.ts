import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("alkali metal reactions", () => {
  it("balances 2Na + Cl2 -> 2NaCl", () => {
    const result = balance("Na + Cl2 -> NaCl");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances 2Na + 2H2O -> 2NaOH + H2", () => {
    const result = balance("Na + H2O -> NaOH + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances 2K + 2H2O -> 2KOH + H2", () => {
    const result = balance("K + H2O -> KOH + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances 2Li + 2H2O -> 2LiOH + H2", () => {
    const result = balance("Li + H2O -> LiOH + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances 2Na + O2 -> Na2O2", () => {
    const result = balance("Na + O2 -> Na2O2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances 4Li + O2 -> 2Li2O", () => {
    const result = balance("Li + O2 -> Li2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([4, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances 2K + Br2 -> 2KBr", () => {
    const result = balance("K + Br2 -> KBr");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances 2Na + F2 -> 2NaF", () => {
    const result = balance("Na + F2 -> NaF");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("alkaline earth metal reactions", () => {
  it("balances Mg + 2HCl -> MgCl2 + H2", () => {
    const result = balance("Mg + HCl -> MgCl2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances Ca + 2H2O -> Ca(OH)2 + H2", () => {
    const result = balance("Ca + H2O -> Ca(OH)2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances Ba + 2HCl -> BaCl2 + H2", () => {
    const result = balance("Ba + HCl -> BaCl2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances 2Mg + O2 -> 2MgO", () => {
    const result = balance("Mg + O2 -> MgO");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances 2Ca + O2 -> 2CaO", () => {
    const result = balance("Ca + O2 -> CaO");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances Sr + 2HCl -> SrCl2 + H2", () => {
    const result = balance("Sr + HCl -> SrCl2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances Ca + 2HNO3 -> Ca(NO3)2 + H2", () => {
    const result = balance("Ca + HNO3 -> Ca(NO3)2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances Mg + H2SO4 -> MgSO4 + H2", () => {
    const result = balance("Mg + H2SO4 -> MgSO4 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("metal oxide reactions", () => {
  it("balances CaO + H2O -> Ca(OH)2", () => {
    const result = balance("CaO + H2O -> Ca(OH)2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances Na2O + H2O -> 2NaOH", () => {
    const result = balance("Na2O + H2O -> NaOH");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances MgO + 2HCl -> MgCl2 + H2O", () => {
    const result = balance("MgO + HCl -> MgCl2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances CaO + 2HCl -> CaCl2 + H2O", () => {
    const result = balance("CaO + HCl -> CaCl2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances Fe2O3 + 6HCl -> 2FeCl3 + 3H2O", () => {
    const result = balance("Fe2O3 + HCl -> FeCl3 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 6]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 3]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances Al2O3 + 6HCl -> 2AlCl3 + 3H2O", () => {
    const result = balance("Al2O3 + HCl -> AlCl3 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 6]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 3]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances CuO + 2HCl -> CuCl2 + H2O", () => {
    const result = balance("CuO + HCl -> CuCl2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances ZnO + 2HCl -> ZnCl2 + H2O", () => {
    const result = balance("ZnO + HCl -> ZnCl2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});
