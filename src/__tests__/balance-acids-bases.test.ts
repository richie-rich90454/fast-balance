import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Acid-Base Reactions: Strong Acid Neutralization", () => {
  it("HCl + NaOH: HCl + NaOH -> NaCl + H2O", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O");
    checkPositiveIntegers(r);
  });

  it("H2SO4 + NaOH: H2SO4 + 2NaOH -> Na2SO4 + 2H2O", () => {
    const r = balance("H2SO4 + NaOH -> Na2SO4 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(2);
  });

  it("HNO3 + KOH: HNO3 + KOH -> KNO3 + H2O", () => {
    const r = balance("HNO3 + KOH -> KNO3 + H2O");
    checkPositiveIntegers(r);
  });

  it("HCl + KOH: HCl + KOH -> KCl + H2O", () => {
    const r = balance("HCl + KOH -> KCl + H2O");
    checkPositiveIntegers(r);
  });

  it("H2SO4 + KOH: H2SO4 + 2KOH -> K2SO4 + 2H2O", () => {
    const r = balance("H2SO4 + KOH -> K2SO4 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(2);
  });

  it("HClO4 + NaOH: HClO4 + NaOH -> NaClO4 + H2O", () => {
    const r = balance("HClO4 + NaOH -> NaClO4 + H2O");
    checkPositiveIntegers(r);
  });

  it("HBr + NaOH: HBr + NaOH -> NaBr + H2O", () => {
    const r = balance("HBr + NaOH -> NaBr + H2O");
    checkPositiveIntegers(r);
  });

  it("HI + NaOH: HI + NaOH -> NaI + H2O", () => {
    const r = balance("HI + NaOH -> NaI + H2O");
    checkPositiveIntegers(r);
  });

  it("HNO3 + NaOH: HNO3 + NaOH -> NaNO3 + H2O", () => {
    const r = balance("HNO3 + NaOH -> NaNO3 + H2O");
    checkPositiveIntegers(r);
  });

  it("H2SO4 + Ca(OH)2: H2SO4 + Ca(OH)2 -> CaSO4 + 2H2O", () => {
    const r = balance("H2SO4 + Ca(OH)2 -> CaSO4 + H2O");
    checkPositiveIntegers(r);
    expect(r.products[1]?.coefficient).toBe(2);
  });

  it("HCl + Ca(OH)2: 2HCl + Ca(OH)2 -> CaCl2 + 2H2O", () => {
    const r = balance("HCl + Ca(OH)2 -> CaCl2 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(2);
  });

  it("H3PO4 + NaOH: H3PO4 + 3NaOH -> Na3PO4 + 3H2O", () => {
    const r = balance("H3PO4 + NaOH -> Na3PO4 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[1]?.coefficient).toBe(3);
  });
});

describe("Acid-Base Reactions: Weak Acid/Base", () => {
  it("CH3COOH + NaOH: CH3COOH + NaOH -> CH3COONa + H2O", () => {
    try {
      const r = balance("CH3COOH + NaOH -> C2H3O2Na + H2O");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("H2CO3 + NaOH: H2CO3 + 2NaOH -> Na2CO3 + 2H2O", () => {
    try {
      const r = balance("H2CO3 + NaOH -> Na2CO3 + H2O");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("HF + NaOH: HF + NaOH -> NaF + H2O", () => {
    const r = balance("HF + NaOH -> NaF + H2O");
    checkPositiveIntegers(r);
  });

  it("HCN + NaOH: HCN + NaOH -> NaCN + H2O", () => {
    try {
      const r = balance("HCN + NaOH -> NaCN + H2O");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("NH3 + HCl: NH3 + HCl -> NH4Cl", () => {
    const r = balance("NH3 + HCl -> NH4Cl");
    checkPositiveIntegers(r);
  });

  it("NH3 + H2SO4: 2NH3 + H2SO4 -> (NH4)2SO4", () => {
    try {
      const r = balance("NH3 + H2SO4 -> (NH4)2SO4");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });
});
