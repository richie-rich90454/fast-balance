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

function getChargeTotal(result: BalanceResult, side: "reactants" | "products"): number {
  const species = side === "reactants" ? result.reactants : result.products;
  let total = 0;
  for (const s of species) {
    const parsed = parseFormula(s.formula);
    total += s.coefficient * parsed.charge;
  }
  return total;
}

function verifyChargeConservation(result: BalanceResult): void {
  const r = getChargeTotal(result, "reactants");
  const p = getChargeTotal(result, "products");
  expect(r).toBe(p);
}

describe("charge conservation property", () => {
  it("conserves charge in Na+ + Cl- -> NaCl", () => {
    const result = balance("Na+ + Cl- -> NaCl");
    verifyChargeConservation(result);
    expectPositiveIntegers(result);
  });

  it("conserves charge in Fe2+ + 2Cl- -> FeCl2", () => {
    const result = balance("Fe2+ + 2Cl- -> FeCl2");
    verifyChargeConservation(result);
    expectPositiveIntegers(result);
  });

  it("conserves charge in Ag+ + Cl- -> AgCl", () => {
    const result = balance("Ag+ + Cl- -> AgCl");
    verifyChargeConservation(result);
    expectPositiveIntegers(result);
  });

  it("conserves charge in Ba2+ + SO4^2- -> BaSO4", () => {
    const result = balance("Ba2+ + SO4^2- -> BaSO4");
    verifyChargeConservation(result);
    expectPositiveIntegers(result);
  });

  it("conserves charge in Al3+ + 3Cl- -> AlCl3", () => {
    const result = balance("Al3+ + 3Cl- -> AlCl3");
    verifyChargeConservation(result);
    expectPositiveIntegers(result);
  });

  it("conserves charge in Na+ + OH- -> NaOH", () => {
    const result = balance("Na+ + OH- -> NaOH");
    verifyChargeConservation(result);
    expectPositiveIntegers(result);
  });
});

function reverseEquation(eq: string): string {
  const arrow = "->";
  const parts = eq.split(arrow);
  if (parts.length !== 2) throw new Error("expected single '->' in input");
  const left = parts[0]!.trim();
  const right = parts[1]!.trim();
  const leftTerms = left.split("+").map((s) => s.trim());
  const rightTerms = right.split("+").map((s) => s.trim());
  return rightTerms.join(" + ") + " -> " + leftTerms.join(" + ");
}

describe("reverse equation property", () => {
  it("reverses H2 + O2 -> H2O as H2O -> H2 + O2 with positive integer coefficients", () => {
    const result = balance(reverseEquation("H2 + O2 -> H2O"));
    expectPositiveIntegers(result);
    verifyConservation(result);
  });

  it("reverses Fe + Cl2 -> FeCl3 as FeCl3 -> Fe + Cl2 with positive integer coefficients", () => {
    const result = balance(reverseEquation("Fe + Cl2 -> FeCl3"));
    expectPositiveIntegers(result);
    verifyConservation(result);
  });

  it("reverses N2 + H2 -> NH3 as NH3 -> N2 + H2 with positive integer coefficients", () => {
    const result = balance(reverseEquation("N2 + H2 -> NH3"));
    expectPositiveIntegers(result);
    verifyConservation(result);
  });

  it("reverses CO2 + H2O -> C6H12O6 + O2 with positive integer coefficients", () => {
    const result = balance(reverseEquation("CO2 + H2O -> C6H12O6 + O2"));
    expectPositiveIntegers(result);
    verifyConservation(result);
  });

  it("reverses Al2O3 -> Al + O2 with positive integer coefficients", () => {
    const result = balance(reverseEquation("Al2O3 -> Al + O2"));
    expectPositiveIntegers(result);
    verifyConservation(result);
  });

  it("reverses CaCO3 -> CaO + CO2 with positive integer coefficients", () => {
    const result = balance(reverseEquation("CaCO3 -> CaO + CO2"));
    expectPositiveIntegers(result);
    verifyConservation(result);
  });
});
