import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

function checkCoefficients(r: ReturnType<typeof balance>, reactants: number[], products: number[]) {
  expect(r.reactants.map(s => s.coefficient)).toEqual(reactants);
  expect(r.products.map(s => s.coefficient)).toEqual(products);
}

// ============================================================
// Inorganic Synthesis Chemistry Tests
// ============================================================

describe("inorganic synthesis chemistry", () => {

  // ========================
  // 1. Acid-Base Neutralization Reactions
  // ========================
  describe("acid-base neutralization reactions", () => {
    it("HCl + NaOH -> NaCl + H2O", () => {
      const r = balance("HCl + NaOH -> NaCl + H2O");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 1]);
    });

    it("H2SO4 + NaOH -> Na2SO4 + H2O", () => {
      const r = balance("H2SO4 + NaOH -> Na2SO4 + H2O");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 2]);
    });

    it("H3PO4 + KOH -> K3PO4 + H2O", () => {
      const r = balance("H3PO4 + KOH -> K3PO4 + H2O");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 3], [1, 3]);
    });

    it("HNO3 + Ca(OH)2 -> Ca(NO3)2 + H2O", () => {
      const r = balance("HNO3 + Ca(OH)2 -> Ca(NO3)2 + H2O");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 1], [1, 2]);
    });

    it("H2CO3 + NaOH -> Na2CO3 + H2O", () => {
      const r = balance("H2CO3 + NaOH -> Na2CO3 + H2O");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 2]);
    });

    it("H3PO4 + Ca(OH)2 -> Ca3(PO4)2 + H2O", () => {
      const r = balance("H3PO4 + Ca(OH)2 -> Ca3(PO4)2 + H2O");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 3], [1, 6]);
    });

    it("HCl + NH3 -> NH4Cl", () => {
      const r = balance("HCl + NH3 -> NH4Cl");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1]);
    });

    it("H2SO4 + NH3 -> (NH4)2SO4", () => {
      const r = balance("H2SO4 + NH3 -> (NH4)2SO4");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1]);
    });
  });

  // ========================
  // 2. Precipitation Reactions
  // ========================
  describe("precipitation reactions", () => {
    it("AgNO3 + NaCl -> AgCl + NaNO3", () => {
      const r = balance("AgNO3 + NaCl -> AgCl + NaNO3");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 1]);
    });

    it("BaCl2 + Na2SO4 -> BaSO4 + NaCl", () => {
      const r = balance("BaCl2 + Na2SO4 -> BaSO4 + NaCl");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 2]);
    });

    it("Pb(NO3)2 + KI -> PbI2 + KNO3", () => {
      const r = balance("Pb(NO3)2 + KI -> PbI2 + KNO3");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 2]);
    });

    it("FeCl3 + NaOH -> Fe(OH)3 + NaCl", () => {
      const r = balance("FeCl3 + NaOH -> Fe(OH)3 + NaCl");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 3], [1, 3]);
    });

    it("CaCl2 + Na2CO3 -> CaCO3 + NaCl", () => {
      const r = balance("CaCl2 + Na2CO3 -> CaCO3 + NaCl");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 2]);
    });

    it("CuSO4 + NaOH -> Cu(OH)2 + Na2SO4", () => {
      const r = balance("CuSO4 + NaOH -> Cu(OH)2 + Na2SO4");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 1]);
    });

    it("AgNO3 + K2CrO4 -> Ag2CrO4 + KNO3", () => {
      const r = balance("AgNO3 + K2CrO4 -> Ag2CrO4 + KNO3");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 1], [1, 2]);
    });
  });

  // ========================
  // 3. Gas Evolution Reactions
  // ========================
  describe("gas evolution reactions", () => {
    it("Na2CO3 + HCl -> NaCl + H2O + CO2", () => {
      const r = balance("Na2CO3 + HCl -> NaCl + H2O + CO2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [2, 1, 1]);
    });

    it("Na2SO3 + HCl -> NaCl + H2O + SO2", () => {
      const r = balance("Na2SO3 + HCl -> NaCl + H2O + SO2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [2, 1, 1]);
    });

    it("FeS + HCl -> FeCl2 + H2S", () => {
      const r = balance("FeS + HCl -> FeCl2 + H2S");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 1]);
    });

    it("NH4Cl + NaOH -> NaCl + H2O + NH3", () => {
      const r = balance("NH4Cl + NaOH -> NaCl + H2O + NH3");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 1, 1]);
    });

    it("CaCO3 + HCl -> CaCl2 + H2O + CO2", () => {
      const r = balance("CaCO3 + HCl -> CaCl2 + H2O + CO2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 1, 1]);
    });

    it("ZnS + H2SO4 -> ZnSO4 + H2S", () => {
      const r = balance("ZnS + H2SO4 -> ZnSO4 + H2S");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 1]);
    });
  });

  // ========================
  // 4. Displacement Reactions
  // ========================
  describe("displacement reactions", () => {
    it("Zn + HCl -> ZnCl2 + H2", () => {
      const r = balance("Zn + HCl -> ZnCl2 + H2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 1]);
    });

    it("Fe + CuSO4 -> FeSO4 + Cu", () => {
      const r = balance("Fe + CuSO4 -> FeSO4 + Cu");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 1]);
    });

    it("Zn + CuSO4 -> ZnSO4 + Cu", () => {
      const r = balance("Zn + CuSO4 -> ZnSO4 + Cu");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 1]);
    });

    it("Mg + HCl -> MgCl2 + H2", () => {
      const r = balance("Mg + HCl -> MgCl2 + H2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 1]);
    });

    it("Al + HCl -> AlCl3 + H2", () => {
      const r = balance("Al + HCl -> AlCl3 + H2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 6], [2, 3]);
    });

    it("Fe + H2SO4 -> FeSO4 + H2", () => {
      const r = balance("Fe + H2SO4 -> FeSO4 + H2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 1]);
    });

    it("Cu + AgNO3 -> Cu(NO3)2 + Ag", () => {
      const r = balance("Cu + AgNO3 -> Cu(NO3)2 + Ag");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 2]);
    });
  });

  // ========================
  // 5. Synthesis Reactions (element + element -> compound)
  // ========================
  describe("synthesis reactions", () => {
    it("Na + Cl2 -> NaCl", () => {
      const r = balance("Na + Cl2 -> NaCl");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 1], [2]);
    });

    it("Mg + O2 -> MgO", () => {
      const r = balance("Mg + O2 -> MgO");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 1], [2]);
    });

    it("Al + O2 -> Al2O3", () => {
      const r = balance("Al + O2 -> Al2O3");
      checkPositiveIntegers(r);
      checkCoefficients(r, [4, 3], [2]);
    });

    it("Fe + O2 -> Fe2O3", () => {
      const r = balance("Fe + O2 -> Fe2O3");
      checkPositiveIntegers(r);
      checkCoefficients(r, [4, 3], [2]);
    });

    it("P4 + O2 -> P4O10", () => {
      const r = balance("P4 + O2 -> P4O10");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 5], [1]);
    });

    it("S8 + O2 -> SO2", () => {
      const r = balance("S8 + O2 -> SO2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 8], [8]);
    });

    it("N2 + H2 -> NH3", () => {
      const r = balance("N2 + H2 -> NH3");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 3], [2]);
    });

    it("Ca + O2 -> CaO", () => {
      const r = balance("Ca + O2 -> CaO");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 1], [2]);
    });

    it("K + Br2 -> KBr", () => {
      const r = balance("K + Br2 -> KBr");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 1], [2]);
    });

    it("Fe + Cl2 -> FeCl3", () => {
      const r = balance("Fe + Cl2 -> FeCl3");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 3], [2]);
    });

    it("H2 + Cl2 -> HCl", () => {
      const r = balance("H2 + Cl2 -> HCl");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [2]);
    });

    it("Ca + Cl2 -> CaCl2", () => {
      const r = balance("Ca + Cl2 -> CaCl2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1]);
    });
  });

  // ========================
  // 6. Decomposition Reactions
  // ========================
  describe("decomposition reactions", () => {
    it("CaCO3 -> CaO + CO2", () => {
      const r = balance("CaCO3 -> CaO + CO2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1], [1, 1]);
    });

    it("KClO3 -> KCl + O2", () => {
      const r = balance("KClO3 -> KCl + O2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2], [2, 3]);
    });

    it("NaHCO3 -> Na2CO3 + H2O + CO2", () => {
      const r = balance("NaHCO3 -> Na2CO3 + H2O + CO2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2], [1, 1, 1]);
    });

    it("HgO -> Hg + O2", () => {
      const r = balance("HgO -> Hg + O2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2], [2, 1]);
    });

    it("H2O2 -> H2O + O2", () => {
      const r = balance("H2O2 -> H2O + O2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2], [2, 1]);
    });

    it("NH4NO3 -> N2O + H2O", () => {
      const r = balance("NH4NO3 -> N2O + H2O");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1], [1, 2]);
    });

    it("KMnO4 -> K2MnO4 + MnO2 + O2", () => {
      const r = balance("KMnO4 -> K2MnO4 + MnO2 + O2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2], [1, 1, 1]);
    });

    it("Ag2O -> Ag + O2", () => {
      const r = balance("Ag2O -> Ag + O2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2], [4, 1]);
    });

    it("Pb(NO3)2 -> PbO + NO2 + O2", () => {
      const r = balance("Pb(NO3)2 -> PbO + NO2 + O2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2], [2, 4, 1]);
    });

    it("Cu(NO3)2 -> CuO + NO2 + O2", () => {
      const r = balance("Cu(NO3)2 -> CuO + NO2 + O2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2], [2, 4, 1]);
    });
  });

  // ========================
  // 7. Double Displacement Reactions
  // ========================
  describe("double displacement reactions", () => {
    it("Na2S + HCl -> NaCl + H2S", () => {
      const r = balance("Na2S + HCl -> NaCl + H2S");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [2, 1]);
    });

    it("NaOH + H2SO4 -> Na2SO4 + H2O", () => {
      const r = balance("NaOH + H2SO4 -> Na2SO4 + H2O");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 1], [1, 2]);
    });

    it("Na2CO3 + CaCl2 -> CaCO3 + NaCl", () => {
      const r = balance("Na2CO3 + CaCl2 -> CaCO3 + NaCl");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 2]);
    });

    it("K2SO4 + BaCl2 -> BaSO4 + KCl", () => {
      const r = balance("K2SO4 + BaCl2 -> BaSO4 + KCl");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 2]);
    });

    it("Na3PO4 + CaCl2 -> Ca3(PO4)2 + NaCl", () => {
      const r = balance("Na3PO4 + CaCl2 -> Ca3(PO4)2 + NaCl");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 3], [1, 6]);
    });

    it("AgNO3 + Na2S -> Ag2S + NaNO3", () => {
      const r = balance("AgNO3 + Na2S -> Ag2S + NaNO3");
      checkPositiveIntegers(r);
      checkCoefficients(r, [2, 1], [1, 2]);
    });

    it("FeCl3 + NaOH -> Fe(OH)3 + NaCl", () => {
      const r = balance("FeCl3 + NaOH -> Fe(OH)3 + NaCl");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 3], [1, 3]);
    });

    it("Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4", () => {
      const r = balance("Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 6], [2, 3]);
    });
  });

  // ========================
  // 8. Redox Displacement Reactions
  // ========================
  describe("redox displacement reactions", () => {
    it("Fe2O3 + CO -> Fe + CO2", () => {
      const r = balance("Fe2O3 + CO -> Fe + CO2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 3], [2, 3]);
    });

    it("CuO + H2 -> Cu + H2O", () => {
      const r = balance("CuO + H2 -> Cu + H2O");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 1]);
    });

    it("Fe2O3 + Al -> Al2O3 + Fe", () => {
      const r = balance("Fe2O3 + Al -> Al2O3 + Fe");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 2]);
    });

    it("WO3 + H2 -> W + H2O", () => {
      const r = balance("WO3 + H2 -> W + H2O");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 3], [1, 3]);
    });

    it("MnO2 + Al -> Mn + Al2O3", () => {
      const r = balance("MnO2 + Al -> Mn + Al2O3");
      checkPositiveIntegers(r);
      checkCoefficients(r, [3, 4], [3, 2]);
    });

    it("Cr2O3 + Al -> Al2O3 + Cr", () => {
      const r = balance("Cr2O3 + Al -> Al2O3 + Cr");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 2], [1, 2]);
    });

    it("Cu2O + C -> Cu + CO", () => {
      const r = balance("Cu2O + C -> Cu + CO");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [2, 1]);
    });

    it("SnO2 + C -> Sn + CO2", () => {
      const r = balance("SnO2 + C -> Sn + CO2");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 1]);
    });

    it("ZnO + C -> Zn + CO", () => {
      const r = balance("ZnO + C -> Zn + CO");
      checkPositiveIntegers(r);
      checkCoefficients(r, [1, 1], [1, 1]);
    });
  });

});
