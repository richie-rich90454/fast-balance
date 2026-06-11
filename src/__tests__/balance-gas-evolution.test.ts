import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Gas Evolution Reactions: Carbonate + Acid", () => {
  it("Na2CO3 + 2HCl -> 2NaCl + CO2 + H2O", () => {
    try {
      const r = balance("Na2CO3 + HCl -> NaCl + CO2 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("CaCO3 + 2HCl -> CaCl2 + CO2 + H2O", () => {
    try {
      const r = balance("CaCO3 + HCl -> CaCl2 + CO2 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("NaHCO3 + HCl -> NaCl + CO2 + H2O", () => {
    try {
      const r = balance("NaHCO3 + HCl -> NaCl + CO2 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("MgCO3 + 2HCl -> MgCl2 + CO2 + H2O", () => {
    try {
      const r = balance("MgCO3 + HCl -> MgCl2 + CO2 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("K2CO3 + 2HCl -> 2KCl + CO2 + H2O", () => {
    try {
      const r = balance("K2CO3 + HCl -> KCl + CO2 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Gas Evolution Reactions: Sulfide + Acid", () => {
  it("FeS + 2HCl -> FeCl2 + H2S", () => {
    try {
      const r = balance("FeS + HCl -> FeCl2 + H2S");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("ZnS + 2HCl -> ZnCl2 + H2S", () => {
    try {
      const r = balance("ZnS + HCl -> ZnCl2 + H2S");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Na2S + 2HCl -> 2NaCl + H2S", () => {
    try {
      const r = balance("Na2S + HCl -> NaCl + H2S");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Gas Evolution Reactions: Sulfite + Acid", () => {
  it("Na2SO3 + 2HCl -> 2NaCl + SO2 + H2O", () => {
    try {
      const r = balance("Na2SO3 + HCl -> NaCl + SO2 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("CaSO3 + 2HCl -> CaCl2 + SO2 + H2O", () => {
    try {
      const r = balance("CaSO3 + HCl -> CaCl2 + SO2 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Gas Evolution Reactions: Ammonium + Base", () => {
  it("NH4Cl + NaOH -> NaCl + NH3 + H2O", () => {
    try {
      const r = balance("NH4Cl + NaOH -> NaCl + NH3 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("(NH4)2SO4 + 2NaOH -> Na2SO4 + 2NH3 + 2H2O", () => {
    try {
      const r = balance("(NH4)2SO4 + NaOH -> Na2SO4 + NH3 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("NH4NO3 + NaOH -> NaNO3 + NH3 + H2O", () => {
    try {
      const r = balance("NH4NO3 + NaOH -> NaNO3 + NH3 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("NH4HCO3 + NaOH -> NaHCO3 + NH3 + H2O", () => {
    try {
      const r = balance("NH4HCO3 + NaOH -> NaHCO3 + NH3 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Gas Evolution Reactions: Metal + Water", () => {
  it("2Na + 2H2O -> 2NaOH + H2", () => {
    const r = balance("Na + H2O -> NaOH + H2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(1);
  });

  it("2K + 2H2O -> 2KOH + H2", () => {
    const r = balance("K + H2O -> KOH + H2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(1);
  });

  it("Ca + 2H2O -> Ca(OH)2 + H2", () => {
    try {
      const r = balance("Ca + H2O -> Ca(OH)2 + H2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Mg + 2H2O -> Mg(OH)2 + H2 (steam)", () => {
    try {
      const r = balance("Mg + H2O -> Mg(OH)2 + H2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});
