import { describe, it, expect } from "vitest";
import { balance } from "../index";

function expectPositiveCoefficients(result: ReturnType<typeof balance>) {
  expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
  expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  const all = [
    ...result.reactants.map(r => r.coefficient),
    ...result.products.map(p => p.coefficient),
  ];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("iron compound reactions", () => {
  it("balances 2Fe + 3Cl2 -> 2FeCl3", () => {
    const r = balance("Fe + Cl2 -> FeCl3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances Fe + S -> FeS", () => {
    const r = balance("Fe + S -> FeS");
    expectPositiveCoefficients(r);
  });

  it("balances Fe2O3 + 3CO -> 2Fe + 3CO2", () => {
    const r = balance("Fe2O3 + CO -> Fe + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });

  it("balances Fe + O2 -> Fe2O3", () => {
    const r = balance("Fe + O2 -> Fe2O3");
    expectPositiveCoefficients(r);
  });

  it("balances FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl", () => {
    const r = balance("FeCl3 + NaOH -> Fe(OH)3 + NaCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });

  it("balances Fe2O3 + 6HCl -> 2FeCl3 + 3H2O", () => {
    const r = balance("Fe2O3 + HCl -> FeCl3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });

  it("balances Fe + CuSO4 -> FeSO4 + Cu", () => {
    const r = balance("Fe + CuSO4 -> FeSO4 + Cu");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances FeS + O2 -> Fe2O3 + SO2", () => {
    const r = balance("FeS + O2 -> Fe2O3 + SO2");
    expectPositiveCoefficients(r);
  });
});
