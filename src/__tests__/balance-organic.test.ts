import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("alkane combustion", () => {
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

describe("alkene and alkyne combustion", () => {
  it("balances C2H4 + 3O2 -> 2CO2 + 2H2O", () => {
    const r = balance("C2H4 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 2]);
  });
  it("balances 2C2H2 + 5O2 -> 4CO2 + 2H2O", () => {
    const r = balance("C2H2 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 5]);
    expect(r.products.map(x => x.coefficient)).toEqual([4, 2]);
  });
  it("balances C3H6 + 9/2 O2 -> 3CO2 + 3H2O (2C3H6 + 9O2 -> 6CO2 + 6H2O)", () => {
    const r = balance("C3H6 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 9]);
    expect(r.products.map(x => x.coefficient)).toEqual([6, 6]);
  });
  it("balances C4H8 + 6O2 -> 4CO2 + 4H2O", () => {
    const r = balance("C4H8 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([4, 4]);
  });
});
