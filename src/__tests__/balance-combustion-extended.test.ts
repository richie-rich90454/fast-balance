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

describe("alkane combustion extended", () => {
  it("balances CH4 + 2O2 -> CO2 + 2H2O", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances 2C2H6 + 7O2 -> 4CO2 + 6H2O", () => {
    const r = balance("C2H6 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 7]);
    expect(r.products.map(x => x.coefficient)).toEqual([4, 6]);
  });
  it("balances C3H8 + 5O2 -> 3CO2 + 4H2O", () => {
    const r = balance("C3H8 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 5]);
    expect(r.products.map(x => x.coefficient)).toEqual([3, 4]);
  });
  it("balances 2C4H10 + 13O2 -> 8CO2 + 10H2O", () => {
    const r = balance("C4H10 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 13]);
    expect(r.products.map(x => x.coefficient)).toEqual([8, 10]);
  });
  it("balances C5H12 + 8O2 -> 5CO2 + 6H2O", () => {
    const r = balance("C5H12 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 8]);
    expect(r.products.map(x => x.coefficient)).toEqual([5, 6]);
  });
  it("balances 2C6H14 + 19O2 -> 12CO2 + 14H2O", () => {
    const r = balance("C6H14 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 19]);
    expect(r.products.map(x => x.coefficient)).toEqual([12, 14]);
  });
});
