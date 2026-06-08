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

describe("element conservation for double displacement reactions", () => {
  it("conserves all elements in NaOH + HCl -> NaCl + H2O", () => {
    const result = balance("NaOH + HCl -> NaCl + H2O");
    verifyConservation(result);
  });

  it("conserves all elements in BaCl2 + Na2SO4 -> BaSO4 + NaCl", () => {
    const result = balance("BaCl2 + Na2SO4 -> BaSO4 + NaCl");
    verifyConservation(result);
  });

  it("conserves all elements in AgNO3 + NaCl -> AgCl + NaNO3", () => {
    const result = balance("AgNO3 + NaCl -> AgCl + NaNO3");
    verifyConservation(result);
  });

  it("conserves all elements in Pb(NO3)2 + KI -> PbI2 + KNO3", () => {
    const result = balance("Pb(NO3)2 + KI -> PbI2 + KNO3");
    verifyConservation(result);
  });

  it("conserves all elements in CaCO3 + HCl -> CaCl2 + H2O + CO2", () => {
    const result = balance("CaCO3 + HCl -> CaCl2 + H2O + CO2");
    verifyConservation(result);
  });

  it("conserves all elements in Na2CO3 + HCl -> NaCl + H2O + CO2", () => {
    const result = balance("Na2CO3 + HCl -> NaCl + H2O + CO2");
    verifyConservation(result);
  });

  it("conserves all elements in KOH + H2SO4 -> K2SO4 + H2O", () => {
    const result = balance("KOH + H2SO4 -> K2SO4 + H2O");
    verifyConservation(result);
  });

  it("conserves all elements in Al(OH)3 + HCl -> AlCl3 + H2O", () => {
    const result = balance("Al(OH)3 + HCl -> AlCl3 + H2O");
    verifyConservation(result);
  });
});
