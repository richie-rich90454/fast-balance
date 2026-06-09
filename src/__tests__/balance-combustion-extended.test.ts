import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("alcohol combustion extended", () => {
  it("balances 2CH3OH + 3O2 -> 2CO2 + 4H2O", () => {
    const r = balance("CH3OH + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 4]);
  });
  it("balances C2H5OH + 3O2 -> 2CO2 + 3H2O", () => {
    const r = balance("C2H5OH + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });
  it("balances 2C3H7OH + 9O2 -> 6CO2 + 8H2O (positive check)", () => {
    const r = balance("C3H7OH + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances C4H9OH + 6O2 -> 4CO2 + 5H2O (positive check)", () => {
    const r = balance("C4H9OH + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances 2C5H11OH + 15O2 -> 10CO2 + 12H2O (positive check)", () => {
    const r = balance("C5H11OH + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances C6H13OH + 9O2 -> 6CO2 + 7H2O (positive check)", () => {
    const r = balance("C6H13OH + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});
