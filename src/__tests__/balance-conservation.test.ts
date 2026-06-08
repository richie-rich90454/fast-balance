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

describe("element conservation for ionic reactions", () => {
  it("conserves all elements in Fe2+ + Cl- -> FeCl2", () => {
    const result = balance("Fe2+ + Cl- -> FeCl2");
    verifyConservation(result);
  });

  it("conserves all elements in Ag+ + Cl- -> AgCl", () => {
    const result = balance("Ag+ + Cl- -> AgCl");
    verifyConservation(result);
  });

  it("conserves all elements in Na+ + OH- -> NaOH", () => {
    const result = balance("Na+ + OH- -> NaOH");
    verifyConservation(result);
  });

  it("conserves all elements in Ca2+ + Cl- -> CaCl2", () => {
    const result = balance("Ca2+ + Cl- -> CaCl2");
    verifyConservation(result);
  });

  it("conserves all elements in Al3+ + O2- -> Al2O3", () => {
    const result = balance("Al3+ + O2- -> Al2O3");
    verifyConservation(result);
  });

  it("conserves all elements in K+ + Br- -> KBr", () => {
    const result = balance("K+ + Br- -> KBr");
    verifyConservation(result);
  });
});

describe("element conservation for decomposition reactions", () => {
  it("conserves all elements in H2O -> H2 + O2", () => {
    const result = balance("H2O -> H2 + O2");
    verifyConservation(result);
  });

  it("conserves all elements in KClO3 -> KCl + O2", () => {
    const result = balance("KClO3 -> KCl + O2");
    verifyConservation(result);
  });

  it("conserves all elements in CaCO3 -> CaO + CO2", () => {
    const result = balance("CaCO3 -> CaO + CO2");
    verifyConservation(result);
  });

  it("conserves all elements in NaHCO3 -> Na2CO3 + H2O + CO2", () => {
    const result = balance("NaHCO3 -> Na2CO3 + H2O + CO2");
    verifyConservation(result);
  });

  it("conserves all elements in H2O2 -> H2O + O2", () => {
    const result = balance("H2O2 -> H2O + O2");
    verifyConservation(result);
  });

  it("conserves all elements in HgO -> Hg + O2", () => {
    const result = balance("HgO -> Hg + O2");
    verifyConservation(result);
  });
});

describe("element conservation for redox reactions", () => {
  it("conserves all elements in Fe2O3 + CO -> Fe + CO2", () => {
    const result = balance("Fe2O3 + CO -> Fe + CO2");
    verifyConservation(result);
  });

  it("conserves all elements in Cu + HNO3 -> Cu(NO3)2 + NO + H2O", () => {
    const result = balance("Cu + HNO3 -> Cu(NO3)2 + NO + H2O");
    verifyConservation(result);
  });

  it("conserves all elements in MnO4- + H+ + e- -> Mn2+ + H2O", () => {
    const result = balance("MnO4- + H+ + e- -> Mn2+ + H2O");
    verifyConservation(result);
  });

  it("conserves all elements in Cr2O7^2- + H+ + e- -> Cr3+ + H2O", () => {
    const result = balance("Cr2O7^2- + H+ + e- -> Cr3+ + H2O");
    verifyConservation(result);
  });

  it("conserves all elements in Zn + HCl -> ZnCl2 + H2", () => {
    const result = balance("Zn + HCl -> ZnCl2 + H2");
    verifyConservation(result);
  });

  it("conserves all elements in Fe + CuSO4 -> FeSO4 + Cu", () => {
    const result = balance("Fe + CuSO4 -> FeSO4 + Cu");
    verifyConservation(result);
  });
});

describe("coefficient integer verification", () => {
  it("all coefficients are positive integers for C8H18 + O2 -> CO2 + H2O", () => {
    const result = balance("C8H18 + O2 -> CO2 + H2O");
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("all coefficients are positive integers for C6H12O6 + O2 -> CO2 + H2O", () => {
    const result = balance("C6H12O6 + O2 -> CO2 + H2O");
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("all coefficients are positive integers for Fe2O3 + CO -> Fe + CO2", () => {
    const result = balance("Fe2O3 + CO -> Fe + CO2");
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("all coefficients are positive integers for Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4", () => {
    const result = balance("Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4");
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("all coefficients are positive integers for Ca3(PO4)2 + H2SO4 -> CaSO4 + H3PO4", () => {
    const result = balance("Ca3(PO4)2 + H2SO4 -> CaSO4 + H3PO4");
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("all coefficients are positive integers for CuSO4·5H2O -> CuSO4 + H2O", () => {
    const result = balance("CuSO4·5H2O -> CuSO4 + H2O");
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("all coefficients are positive integers for CH3COOH + NaOH -> CH3COONa + H2O", () => {
    const result = balance("CH3COOH + NaOH -> CH3COONa + H2O");
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("all coefficients are positive integers for NH3 + HCl -> NH4Cl", () => {
    const result = balance("NH3 + HCl -> NH4Cl");
    const allCoeffs = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
    expect(allCoeffs.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});
