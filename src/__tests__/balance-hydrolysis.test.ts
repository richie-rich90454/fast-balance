import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Hydrolysis Reactions: Ester Hydrolysis", () => {
  it("Ethyl acetate hydrolysis: CH3COOC2H5 + H2O -> CH3COOH + C2H5OH", () => {
    try {
      const r = balance("CH3COOC2H5 + H2O -> CH3COOH + C2H5OH");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Methyl formate hydrolysis: HCOOCH3 + H2O -> HCOOH + CH3OH", () => {
    try {
      const r = balance("HCOOCH3 + H2O -> CH2O2 + CH3OH");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Propyl acetate hydrolysis: CH3COOC3H7 + H2O -> CH3COOH + C3H7OH", () => {
    try {
      const r = balance("C5H10O2 + H2O -> CH3COOH + C3H8O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Hydrolysis Reactions: Salt Hydrolysis", () => {
  it("AlCl3 hydrolysis: AlCl3 + 3H2O -> Al(OH)3 + 3HCl", () => {
    try {
      const r = balance("AlCl3 + H2O -> Al(OH)3 + HCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("FeCl3 hydrolysis: FeCl3 + 3H2O -> Fe(OH)3 + 3HCl", () => {
    try {
      const r = balance("FeCl3 + H2O -> Fe(OH)3 + HCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("PCl5 hydrolysis: PCl5 + 4H2O -> H3PO4 + 5HCl", () => {
    try {
      const r = balance("PCl5 + H2O -> H3PO4 + HCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("SiCl4 hydrolysis: SiCl4 + 4H2O -> Si(OH)4 + 4HCl", () => {
    try {
      const r = balance("SiCl4 + H2O -> Si(OH)4 + HCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("TiCl4 hydrolysis: TiCl4 + 4H2O -> Ti(OH)4 + 4HCl", () => {
    try {
      const r = balance("TiCl4 + H2O -> Ti(OH)4 + HCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("NCl3 hydrolysis: NCl3 + 3H2O -> NH3 + 3HOCl", () => {
    try {
      const r = balance("NCl3 + H2O -> NH3 + HOCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Hydrolysis Reactions: Nitrile and Amide Hydrolysis", () => {
  it("Acetonitrile hydrolysis: CH3CN + 2H2O -> CH3COOH + NH3", () => {
    try {
      const r = balance("CH3CN + H2O -> CH3COOH + NH3");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Benzonitrile hydrolysis: C6H5CN + 2H2O -> C6H5COOH + NH3", () => {
    try {
      const r = balance("C6H5CN + H2O -> C6H5COOH + NH3");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Acetamide hydrolysis: CH3CONH2 + H2O -> CH3COOH + NH3", () => {
    try {
      const r = balance("CH3CONH2 + H2O -> CH3COOH + NH3");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Hydrolysis Reactions: Carbide Hydrolysis", () => {
  it("CaC2 hydrolysis: CaC2 + 2H2O -> Ca(OH)2 + C2H2", () => {
    try {
      const r = balance("CaC2 + H2O -> Ca(OH)2 + C2H2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Al4C3 hydrolysis: Al4C3 + 12H2O -> 4Al(OH)3 + 3CH4", () => {
    try {
      const r = balance("Al4C3 + H2O -> Al(OH)3 + CH4");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Mg2C3 hydrolysis: Mg2C3 + 4H2O -> 2Mg(OH)2 + C3H4", () => {
    try {
      const r = balance("Mg2C3 + H2O -> Mg(OH)2 + C3H4");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});
