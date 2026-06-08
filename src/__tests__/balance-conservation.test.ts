import { describe, it, expect } from "vitest";
import { balance, parseFormula } from "../index";
import type { BalanceResult } from "../index";

function getElementCounts(result: BalanceResult): { reactants: Record<string, number>; products: Record<string, number> } {
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
  const allElements = new Set([...Object.keys(reactants), ...Object.keys(products)]);
  for (const el of allElements) {
    expect(reactants[el] ?? 0).toBe(products[el] ?? 0);
  }
}

describe("element conservation for simple reactions", () => {
  it("conserves all elements in H2 + O2 -> H2O", () => {
    const result = balance("H2 + O2 -> H2O");
    verifyConservation(result);
  });

  it("conserves all elements in N2 + H2 -> NH3", () => {
    const result = balance("N2 + H2 -> NH3");
    verifyConservation(result);
  });

  it("conserves all elements in CH4 + O2 -> CO2 + H2O", () => {
    const result = balance("CH4 + O2 -> CO2 + H2O");
    verifyConservation(result);
  });

  it("conserves all elements in Fe + Cl2 -> FeCl3", () => {
    const result = balance("Fe + Cl2 -> FeCl3");
    verifyConservation(result);
  });

  it("conserves all elements in S + O2 -> SO2", () => {
    const result = balance("S + O2 -> SO2");
    verifyConservation(result);
  });

  it("conserves all elements in P + O2 -> P2O5", () => {
    const result = balance("P + O2 -> P2O5");
    verifyConservation(result);
  });

  it("conserves all elements in Na + Cl2 -> NaCl", () => {
    const result = balance("Na + Cl2 -> NaCl");
    verifyConservation(result);
  });

  it("conserves all elements in Mg + O2 -> MgO", () => {
    const result = balance("Mg + O2 -> MgO");
    verifyConservation(result);
  });
});
