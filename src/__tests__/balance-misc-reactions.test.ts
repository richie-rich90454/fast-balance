import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("silane and boron reaction tests", () => {
  it("balances SiH4 + O2 -> SiO2 + H2O", () => {
    const r = balance("SiH4 + O2 -> SiO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances B2H6 + O2 -> B2O3 + H2O", () => {
    const r = balance("B2H6 + O2 -> B2O3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
  it("balances SiH4 + H2O -> SiO2 + H2 (positive check)", () => {
    const r = balance("SiH4 + H2O -> SiO2 + H2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances B2H6 + H2O -> H3BO3 + H2 (positive check)", () => {
    const r = balance("B2H6 + H2O -> H3BO3 + H2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Si + H2 -> SiH4 (positive check)", () => {
    const r = balance("Si + H2 -> SiH4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("phosphorus compound tests", () => {
  it("balances P4 + O2 -> P2O5", () => {
    const r = balance("P4 + O2 -> P2O5");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 5]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances P + O2 -> P2O5", () => {
    const r = balance("P + O2 -> P2O5");
    expect(r.reactants.map(x => x.coefficient)).toEqual([4, 5]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances P2O5 + H2O -> H3PO4", () => {
    const r = balance("P2O5 + H2O -> H3PO4");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances PCl3 + H2O -> H3PO3 + HCl", () => {
    const r = balance("PCl3 + H2O -> H3PO3 + HCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
  it("balances PCl5 + H2O -> H3PO4 + HCl", () => {
    const r = balance("PCl5 + H2O -> H3PO4 + HCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 4]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 5]);
  });
  it("balances P + Cl2 -> PCl3", () => {
    const r = balance("P + Cl2 -> PCl3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});
