import { describe, it, expect } from "vitest";
import { balance, parseFormula, gcd } from "../index";
import type { BalanceResult } from "../index";

function getElementCounts(result: BalanceResult): {
  reactants: Record<string, number>;
  products: Record<string, number>;
} {
  const reactantCounts: Record<string, number> = {};
  const productCounts: Record<string, number> = {};

  for (const r of result.reactants) {
    const parsed = parseFormula(r.formula);
    for (const [el, count] of Object.entries(parsed.elements)) {
      reactantCounts[el] = (reactantCounts[el] ?? 0) + r.coefficient * count;
    }
  }

  for (const p of result.products) {
    const parsed = parseFormula(p.formula);
    for (const [el, count] of Object.entries(parsed.elements)) {
      productCounts[el] = (productCounts[el] ?? 0) + p.coefficient * count;
    }
  }

  return { reactants: reactantCounts, products: productCounts };
}

function verifyConservation(result: BalanceResult): void {
  const { reactants, products } = getElementCounts(result);
  const allElements = new Set([
    ...Object.keys(reactants),
    ...Object.keys(products),
  ]);
  for (const el of allElements) {
    expect(reactants[el] ?? 0).toBe(products[el] ?? 0);
  }
}

function expectPositiveIntegers(result: BalanceResult): void {
  expect(result.reactants.every((r) => r.coefficient > 0)).toBe(true);
  expect(result.products.every((p) => p.coefficient > 0)).toBe(true);
  const all = [
    ...result.reactants.map((r) => r.coefficient),
    ...result.products.map((p) => p.coefficient),
  ];
  expect(all.every((c) => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("element conservation property", () => {
  it("conserves H and O in H2 + O2 -> H2O", () => {
    const result = balance("H2 + O2 -> H2O");
    verifyConservation(result);
    const { reactants, products } = getElementCounts(result);
    expect(reactants["H"]).toBe(products["H"]);
    expect(reactants["O"]).toBe(products["O"]);
  });

  it("conserves N and H in N2 + H2 -> NH3", () => {
    const result = balance("N2 + H2 -> NH3");
    verifyConservation(result);
    const { reactants, products } = getElementCounts(result);
    expect(reactants["N"]).toBe(products["N"]);
    expect(reactants["H"]).toBe(products["H"]);
  });

  it("conserves Fe and Cl in Fe + Cl2 -> FeCl3", () => {
    const result = balance("Fe + Cl2 -> FeCl3");
    verifyConservation(result);
    const { reactants, products } = getElementCounts(result);
    expect(reactants["Fe"]).toBe(products["Fe"]);
    expect(reactants["Cl"]).toBe(products["Cl"]);
  });

  it("conserves C, H, O in CH4 + O2 -> CO2 + H2O", () => {
    const result = balance("CH4 + O2 -> CO2 + H2O");
    verifyConservation(result);
    const { reactants, products } = getElementCounts(result);
    expect(reactants["C"]).toBe(products["C"]);
    expect(reactants["H"]).toBe(products["H"]);
    expect(reactants["O"]).toBe(products["O"]);
  });

  it("conserves Ca, C, O, H, Cl in CaCO3 + HCl -> CaCl2 + H2O + CO2", () => {
    const result = balance("CaCO3 + HCl -> CaCl2 + H2O + CO2");
    verifyConservation(result);
    const { reactants, products } = getElementCounts(result);
    for (const el of ["Ca", "C", "O", "H", "Cl"]) {
      expect(reactants[el]).toBe(products[el]);
    }
  });

  it("conserves Na, O, H, Cl in NaOH + HCl -> NaCl + H2O", () => {
    const result = balance("NaOH + HCl -> NaCl + H2O");
    verifyConservation(result);
    const { reactants, products } = getElementCounts(result);
    for (const el of ["Na", "O", "H", "Cl"]) {
      expect(reactants[el]).toBe(products[el]);
    }
  });

  it("conserves Al, O, H, Cl in Al2O3 + HCl -> AlCl3 + H2O", () => {
    const result = balance("Al2O3 + HCl -> AlCl3 + H2O");
    verifyConservation(result);
    const { reactants, products } = getElementCounts(result);
    for (const el of ["Al", "O", "H", "Cl"]) {
      expect(reactants[el]).toBe(products[el]);
    }
  });

  it("conserves Cu, H, N, O in Cu + HNO3 -> Cu(NO3)2 + NO + H2O", () => {
    const result = balance("Cu + HNO3 -> Cu(NO3)2 + NO + H2O");
    verifyConservation(result);
    const { reactants, products } = getElementCounts(result);
    for (const el of ["Cu", "H", "N", "O"]) {
      expect(reactants[el]).toBe(products[el]);
    }
  });
});
