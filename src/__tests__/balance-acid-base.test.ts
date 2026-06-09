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
