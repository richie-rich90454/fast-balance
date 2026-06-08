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

describe("alcohol reactions", () => {
  it("balances CH3OH + O2 -> CO2 + H2O", () => {
    const r = balance("CH3OH + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 4]);
  });

  it("balances C2H5OH + O2 -> CO2 + H2O", () => {
    const r = balance("C2H5OH + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });

  it("balances C3H7OH + O2 -> CO2 + H2O (positive check)", () => {
    const r = balance("C3H7OH + O2 -> CO2 + H2O");
    expectPositiveCoefficients(r);
  });

  it("balances CH3OH + Na -> CH3ONa + H2 (positive check)", () => {
    const r = balance("CH3OH + Na -> CH3ONa + H2");
    expectPositiveCoefficients(r);
  });

  it("balances C2H5OH + Na -> C2H5ONa + H2 (positive check)", () => {
    const r = balance("C2H5OH + Na -> C2H5ONa + H2");
    expectPositiveCoefficients(r);
  });

  it("balances C2H5OH + O2 -> CH3COOH + H2O (positive check)", () => {
    const r = balance("C2H5OH + O2 -> CH3COOH + H2O");
    expectPositiveCoefficients(r);
  });

  it("balances C2H5OH + NaOH -> C2H5ONa + H2O (positive check)", () => {
    const r = balance("C2H5OH + NaOH -> C2H5ONa + H2O");
    expectPositiveCoefficients(r);
  });

  it("balances CH3OH + HCl -> CH3Cl + H2O (positive check)", () => {
    const r = balance("CH3OH + HCl -> CH3Cl + H2O");
    expectPositiveCoefficients(r);
  });
});
