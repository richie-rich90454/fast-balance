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

function allCoefficients(result: BalanceResult): number[] {
  return [
    ...result.reactants.map((r) => r.coefficient),
    ...result.products.map((p) => p.coefficient),
  ];
}

function gcdOfList(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((acc, n) => gcd(acc, Math.abs(n)), arr[0]!);
}

describe("multiplication symmetry", () => {
  it("returns canonical 2/1/2 for H2 + O2 -> H2O coefficients", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(result.reactants.map((r) => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map((p) => p.coefficient)).toEqual([2]);
  });

  it("GCD of coefficients is 1 for H2 + O2 -> H2O (no spurious common factor)", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(gcdOfList(allCoefficients(result))).toBe(1);
  });

  it("GCD of coefficients is 1 for N2 + H2 -> NH3", () => {
    const result = balance("N2 + H2 -> NH3");
    expect(gcdOfList(allCoefficients(result))).toBe(1);
  });

  it("GCD of coefficients is 1 for Fe + Cl2 -> FeCl3", () => {
    const result = balance("Fe + Cl2 -> FeCl3");
    expect(gcdOfList(allCoefficients(result))).toBe(1);
  });

  it("GCD of coefficients is 1 for C2H6 + O2 -> CO2 + H2O", () => {
    const result = balance("C2H6 + O2 -> CO2 + H2O");
    expect(gcdOfList(allCoefficients(result))).toBe(1);
  });

  it("all coefficients are positive integers for various reactions", () => {
    const equations = [
      "H2 + O2 -> H2O",
      "N2 + H2 -> NH3",
      "Fe + Cl2 -> FeCl3",
      "CH4 + O2 -> CO2 + H2O",
      "Al + O2 -> Al2O3",
    ];
    for (const eq of equations) {
      const result = balance(eq);
      const coeffs = allCoefficients(result);
      expect(coeffs.every((c) => Number.isInteger(c) && c > 0)).toBe(true);
    }
  });

  it("balance gives deterministic output for the same equation", () => {
    const equations = [
      "H2 + O2 -> H2O",
      "N2 + H2 -> NH3",
      "CH4 + O2 -> CO2 + H2O",
    ];
    for (const eq of equations) {
      const a = balance(eq);
      const b = balance(eq);
      expect(allCoefficients(a)).toEqual(allCoefficients(b));
    }
  });
});

function canonicalizeElements(elements: Record<string, number>): Record<string, number> {
  return Object.fromEntries(
    Object.entries(elements).sort(([a], [b]) => a.localeCompare(b))
  );
}

describe("formula parsing symmetry", () => {
  it("H2O and OH2 produce the same element counts (different order, same map)", () => {
    const a = parseFormula("H2O");
    const b = parseFormula("OH2");
    expect(canonicalizeElements(a.elements)).toEqual(canonicalizeElements(b.elements));
    expect(a.elements["H"]).toBe(2);
    expect(a.elements["O"]).toBe(1);
  });

  it("NaCl parses to Na=1, Cl=1 regardless of input order", () => {
    const a = parseFormula("NaCl");
    const b = parseFormula("ClNa");
    expect(canonicalizeElements(a.elements)).toEqual(canonicalizeElements(b.elements));
    expect(a.elements["Na"]).toBe(1);
    expect(a.elements["Cl"]).toBe(1);
  });

  it("MgCl2 and Cl2Mg produce the same element counts", () => {
    const a = parseFormula("MgCl2");
    const b = parseFormula("Cl2Mg");
    expect(canonicalizeElements(a.elements)).toEqual(canonicalizeElements(b.elements));
    expect(a.elements["Mg"]).toBe(1);
    expect(a.elements["Cl"]).toBe(2);
  });

  it("CaCO3 parses to the same element counts as its element-reversed form O3CCa", () => {
    const a = parseFormula("CaCO3");
    const b = parseFormula("O3CCa");
    expect(canonicalizeElements(a.elements)).toEqual(canonicalizeElements(b.elements));
    expect(a.elements["Ca"]).toBe(1);
    expect(a.elements["C"]).toBe(1);
    expect(a.elements["O"]).toBe(3);
  });

  it("Fe2O3 and O3Fe2 produce the same element counts", () => {
    const a = parseFormula("Fe2O3");
    const b = parseFormula("O3Fe2");
    expect(canonicalizeElements(a.elements)).toEqual(canonicalizeElements(b.elements));
    expect(a.elements["Fe"]).toBe(2);
    expect(a.elements["O"]).toBe(3);
  });

  it("hydration notation ·, *, • all produce the same element counts for CuSO4·5H2O", () => {
    const base = parseFormula("CuSO4·5H2O");
    const star = parseFormula("CuSO4*5H2O");
    const bullet = parseFormula("CuSO4•5H2O");
    expect(canonicalizeElements(base.elements)).toEqual(canonicalizeElements(star.elements));
    expect(canonicalizeElements(base.elements)).toEqual(canonicalizeElements(bullet.elements));
    expect(base.elements["Cu"]).toBe(1);
    expect(base.elements["S"]).toBe(1);
    expect(base.elements["O"]).toBe(9);
    expect(base.elements["H"]).toBe(10);
  });
});

describe("balance with state symbols", () => {
  it("balances H2(g) + O2(g) -> H2O(l) with positive integer coefficients", () => {
    const result = balance("H2(g) + O2(g) -> H2O(l)");
    expectPositiveIntegers(result);
    verifyConservation(result);
    expect(result.reactants[0]?.coefficient).toBe(2);
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(2);
  });

  it("balances NaCl(s) -> Na+(aq) + Cl-(aq) with positive integer coefficients", () => {
    const result = balance("NaCl(s) -> Na+(aq) + Cl-(aq)");
    expectPositiveIntegers(result);
    verifyConservation(result);
    verifyChargeConservation(result);
  });

  it("balances CaCO3(s) -> CaO(s) + CO2(g) with positive integer coefficients", () => {
    const result = balance("CaCO3(s) -> CaO(s) + CO2(g)");
    expectPositiveIntegers(result);
    verifyConservation(result);
  });

  it("state symbols do not change the coefficients of a balanced equation", () => {
    const noState = balance("H2 + O2 -> H2O");
    const withState = balance("H2(g) + O2(g) -> H2O(l)");
    expect(allCoefficients(noState)).toEqual(allCoefficients(withState));
  });

  it("state symbols do not change the formula content (element counts match)", () => {
    const noState = balance("H2 + O2 -> H2O");
    const withState = balance("H2(g) + O2(g) -> H2O(l)");
    const a = getElementCounts(noState);
    const b = getElementCounts(withState);
    expect(a.reactants).toEqual(b.reactants);
    expect(a.products).toEqual(b.products);
  });

  it("state symbols are stripped before parsing (same reactant and product formulas)", () => {
    const withState = balance("NaCl(s) -> Na+(aq) + Cl-(aq)");
    expect(withState.reactants[0]?.formula).toBe("NaCl");
    expect(withState.products[0]?.formula).toBe("Na+");
    expect(withState.products[1]?.formula).toBe("Cl-");
  });
});
