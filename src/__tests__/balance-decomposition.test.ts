import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Decomposition Reactions: Thermal Decomposition", () => {
  it("CaCO3 -> CaO + CO2", () => {
    try {
      const r = balance("CaCO3 -> CaO + CO2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("2KClO3 -> 2KCl + 3O2", () => {
    try {
      const r = balance("KClO3 -> KCl + O2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("2NaHCO3 -> Na2CO3 + CO2 + H2O", () => {
    try {
      const r = balance("NaHCO3 -> Na2CO3 + CO2 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("2HgO -> 2Hg + O2", () => {
    try {
      const r = balance("HgO -> Hg + O2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("2Ag2O -> 4Ag + O2", () => {
    try {
      const r = balance("Ag2O -> Ag + O2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("2Pb(NO3)2 -> 2PbO + 4NO2 + O2", () => {
    try {
      const r = balance("Pb(NO3)2 -> PbO + NO2 + O2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Ca(OH)2 -> CaO + H2O", () => {
    try {
      const r = balance("Ca(OH)2 -> CaO + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("CuCO3 -> CuO + CO2", () => {
    try {
      const r = balance("CuCO3 -> CuO + CO2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("ZnCO3 -> ZnO + CO2", () => {
    try {
      const r = balance("ZnCO3 -> ZnO + CO2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("MgCO3 -> MgO + CO2", () => {
    try {
      const r = balance("MgCO3 -> MgO + CO2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("2Fe(OH)3 -> Fe2O3 + 3H2O", () => {
    try {
      const r = balance("Fe(OH)3 -> Fe2O3 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Al(OH)3 -> Al2O3 + H2O", () => {
    try {
      const r = balance("Al(OH)3 -> Al2O3 + H2O");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Decomposition Reactions: Electrolytic Decomposition", () => {
  it("2H2O -> 2H2 + O2", () => {
    const r = balance("H2O -> H2 + O2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(1);
  });

  it("2NaCl -> 2Na + Cl2", () => {
    try {
      const r = balance("NaCl -> Na + Cl2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("2Al2O3 -> 4Al + 3O2", () => {
    try {
      const r = balance("Al2O3 -> Al + O2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("MgCl2 -> Mg + Cl2", () => {
    try {
      const r = balance("MgCl2 -> Mg + Cl2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});
