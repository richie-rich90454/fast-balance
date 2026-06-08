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
