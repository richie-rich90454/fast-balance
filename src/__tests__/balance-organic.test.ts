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

describe("oxygenated organic combustion", () => {
  it("balances C6H12O6 + 6O2 -> 6CO2 + 6H2O", () => {
    const r = balance("C6H12O6 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([6, 6]);
  });
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
  it("balances C3H8O + 9/2 O2 -> 3CO2 + 4H2O (2C3H8O + 9O2 -> 6CO2 + 8H2O)", () => {
    const r = balance("C3H8O + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 9]);
    expect(r.products.map(x => x.coefficient)).toEqual([6, 8]);
  });
});

describe("organic acid reactions", () => {
  it("balances CH3COOH + NaOH -> CH3COONa + H2O", () => {
    const r = balance("CH3COOH + NaOH -> CH3COONa + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances CH3COOH + KOH -> CH3COOK + H2O", () => {
    const r = balance("CH3COOH + KOH -> CH3COOK + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances 2CH3COOH + Ca(OH)2 -> (CH3COO)2Ca + 2H2O", () => {
    const r = balance("CH3COOH + Ca(OH)2 -> (CH3COO)2Ca + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances HCOOH + NaOH -> HCOONa + H2O", () => {
    const r = balance("HCOOH + NaOH -> HCOONa + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("ester reactions", () => {
  it("balances CH3COOH + C2H5OH -> CH3COOC2H5 + H2O", () => {
    const r = balance("CH3COOH + C2H5OH -> CH3COOC2H5 + H2O");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });
  it("balances HCOOH + CH3OH -> HCOOCH3 + H2O", () => {
    const r = balance("HCOOH + CH3OH -> HCOOCH3 + H2O");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });
});

describe("large hydrocarbon combustion", () => {
  it("balances 2C8H18 + 25O2 -> 16CO2 + 18H2O", () => {
    const r = balance("C8H18 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 25]);
    expect(r.products.map(x => x.coefficient)).toEqual([16, 18]);
  });
  it("balances 2C7H16 + 23O2 -> 14CO2 + 16H2O", () => {
    const r = balance("C7H16 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 23]);
    expect(r.products.map(x => x.coefficient)).toEqual([14, 16]);
  });
  it("balances C10H22 + 31/2 O2 -> 10CO2 + 11H2O (2C10H22 + 31O2 -> 20CO2 + 22H2O)", () => {
    const r = balance("C10H22 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 31]);
    expect(r.products.map(x => x.coefficient)).toEqual([20, 22]);
  });
});

describe("organic compounds with nitrogen", () => {
  it("balances C6H12O6 -> C2H5OH + CO2 (fermentation)", () => {
    const r = balance("C6H12O6 -> C2H5OH + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 2]);
  });
  it("balances C2H5OH + O2 -> CH3COOH + H2O (oxidation)", () => {
    const r = balance("C2H5OH + O2 -> CH3COOH + H2O");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });
});
