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

describe("unsaturated hydrocarbon combustion", () => {
  it("balances 2C2H2 + 5O2 -> 4CO2 + 2H2O", () => {
    const r = balance("C2H2 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 5]);
    expect(r.products.map(x => x.coefficient)).toEqual([4, 2]);
  });
  it("balances C2H4 + 3O2 -> 2CO2 + 2H2O", () => {
    const r = balance("C2H4 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 2]);
  });
  it("balances 2C3H6 + 9O2 -> 6CO2 + 6H2O", () => {
    const r = balance("C3H6 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 9]);
    expect(r.products.map(x => x.coefficient)).toEqual([6, 6]);
  });
  it("balances C4H8 + 6O2 -> 4CO2 + 4H2O", () => {
    const r = balance("C4H8 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([4, 4]);
  });
  it("balances C3H4 combustion (positive check)", () => {
    const r = balance("C3H4 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances C4H6 combustion (positive check)", () => {
    const r = balance("C4H6 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("aromatic combustion", () => {
  it("balances 2C6H6 + 15O2 -> 12CO2 + 6H2O", () => {
    const r = balance("C6H6 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 15]);
    expect(r.products.map(x => x.coefficient)).toEqual([12, 6]);
  });
  it("balances C7H8 + 9O2 -> 7CO2 + 4H2O", () => {
    const r = balance("C7H8 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 9]);
    expect(r.products.map(x => x.coefficient)).toEqual([7, 4]);
  });
  it("balances C8H10 combustion (positive check)", () => {
    const r = balance("C8H10 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances C9H12 combustion (positive check)", () => {
    const r = balance("C9H12 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances C10H8 combustion (positive check)", () => {
    const r = balance("C10H8 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances C6H5OH combustion (positive check)", () => {
    const r = balance("C6H5OH + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("large hydrocarbon combustion", () => {
  it("balances 2C8H18 + 25O2 -> 16CO2 + 18H2O", () => {
    const r = balance("C8H18 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 25]);
    expect(r.products.map(x => x.coefficient)).toEqual([16, 18]);
  });
  it("balances 2C10H22 + 31O2 -> 20CO2 + 22H2O (positive check)", () => {
    const r = balance("C10H22 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances C12H26 combustion (positive check)", () => {
    const r = balance("C12H26 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances C14H30 combustion (positive check)", () => {
    const r = balance("C14H30 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances C16H34 combustion (positive check)", () => {
    const r = balance("C16H34 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});
