import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("silane and boron reaction tests", () => {
  it("balances SiH4 + O2 -> SiO2 + H2O", () => {
    const r = balance("SiH4 + O2 -> SiO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances B2H6 + O2 -> B2O3 + H2O", () => {
    const r = balance("B2H6 + O2 -> B2O3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
  it("balances SiH4 + H2O -> SiO2 + H2 (positive check)", () => {
    const r = balance("SiH4 + H2O -> SiO2 + H2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances B2H6 + H2O -> H3BO3 + H2 (positive check)", () => {
    const r = balance("B2H6 + H2O -> H3BO3 + H2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Si + H2 -> SiH4 (positive check)", () => {
    const r = balance("Si + H2 -> SiH4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("phosphorus compound tests", () => {
  it("balances P4 + O2 -> P2O5", () => {
    const r = balance("P4 + O2 -> P2O5");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 5]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances P + O2 -> P2O5", () => {
    const r = balance("P + O2 -> P2O5");
    expect(r.reactants.map(x => x.coefficient)).toEqual([4, 5]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances P2O5 + H2O -> H3PO4", () => {
    const r = balance("P2O5 + H2O -> H3PO4");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances PCl3 + H2O -> H3PO3 + HCl", () => {
    const r = balance("PCl3 + H2O -> H3PO3 + HCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
  it("balances PCl5 + H2O -> H3PO4 + HCl", () => {
    const r = balance("PCl5 + H2O -> H3PO4 + HCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 4]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 5]);
  });
  it("balances P + Cl2 -> PCl3", () => {
    const r = balance("P + Cl2 -> PCl3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("sulfur compound tests", () => {
  it("balances S + O2 -> SO2", () => {
    const r = balance("S + O2 -> SO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances SO2 + O2 -> SO3", () => {
    const r = balance("SO2 + O2 -> SO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances SO3 + H2O -> H2SO4", () => {
    const r = balance("SO3 + H2O -> H2SO4");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances H2S + O2 -> SO2 + H2O", () => {
    const r = balance("H2S + O2 -> SO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 2]);
  });
  it("balances FeS + O2 -> Fe2O3 + SO2 (positive check)", () => {
    const r = balance("FeS + O2 -> Fe2O3 + SO2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances CS2 + O2 -> CO2 + SO2 (positive check)", () => {
    const r = balance("CS2 + O2 -> CO2 + SO2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("halogen compound tests", () => {
  it("balances NaBr + Cl2 -> NaCl + Br2", () => {
    const r = balance("NaBr + Cl2 -> NaCl + Br2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances NaI + Cl2 -> NaCl + I2", () => {
    const r = balance("NaI + Cl2 -> NaCl + I2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances KBr + Cl2 -> KCl + Br2", () => {
    const r = balance("KBr + Cl2 -> KCl + Br2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances KI + Br2 -> KBr + I2 (positive check)", () => {
    const r = balance("KI + Br2 -> KBr + I2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances KClO3 -> KCl + O2", () => {
    const r = balance("KClO3 -> KCl + O2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });
});

describe("oxidation state transition tests", () => {
  it("balances MnO2 + HCl -> MnCl2 + Cl2 + H2O", () => {
    const r = balance("MnO2 + HCl -> MnCl2 + Cl2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 4]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 2]);
  });
  it("balances K2Cr2O7 + HCl -> KCl + CrCl3 + Cl2 + H2O (positive check)", () => {
    const r = balance("K2Cr2O7 + HCl -> KCl + CrCl3 + Cl2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances PbO2 + HCl -> PbCl2 + Cl2 + H2O (positive check)", () => {
    const r = balance("PbO2 + HCl -> PbCl2 + Cl2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Fe2O3 + CO -> Fe + CO2", () => {
    const r = balance("Fe2O3 + CO -> Fe + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });
  it("balances CuO + CO -> Cu + CO2", () => {
    const r = balance("CuO + CO -> Cu + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances SnO2 + C -> Sn + CO (positive check)", () => {
    const r = balance("SnO2 + C -> Sn + CO");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("double decomposition exchange tests", () => {
  it("balances Na2SO4 + BaCl2 -> BaSO4 + NaCl", () => {
    const r = balance("Na2SO4 + BaCl2 -> BaSO4 + NaCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances AgNO3 + NaCl -> AgCl + NaNO3", () => {
    const r = balance("AgNO3 + NaCl -> AgCl + NaNO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances BaCl2 + Na2CO3 -> BaCO3 + NaCl", () => {
    const r = balance("BaCl2 + Na2CO3 -> BaCO3 + NaCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances Pb(NO3)2 + Na2S -> PbS + NaNO3 (positive check)", () => {
    const r = balance("Pb(NO3)2 + Na2S -> PbS + NaNO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances CuSO4 + Na2S -> CuS + Na2SO4 (positive check)", () => {
    const r = balance("CuSO4 + Na2S -> CuS + Na2SO4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances AgNO3 + NaBr -> AgBr + NaNO3 (positive check)", () => {
    const r = balance("AgNO3 + NaBr -> AgBr + NaNO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("acid and metal oxide exchange tests", () => {
  it("balances CuO + H2SO4 -> CuSO4 + H2O", () => {
    const r = balance("CuO + H2SO4 -> CuSO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances MgO + H2SO4 -> MgSO4 + H2O", () => {
    const r = balance("MgO + H2SO4 -> MgSO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances ZnO + H2SO4 -> ZnSO4 + H2O", () => {
    const r = balance("ZnO + H2SO4 -> ZnSO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Fe2O3 + H2SO4 -> Fe2(SO4)3 + H2O", () => {
    const r = balance("Fe2O3 + H2SO4 -> Fe2(SO4)3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
  it("balances Al2O3 + H2SO4 -> Al2(SO4)3 + H2O", () => {
    const r = balance("Al2O3 + H2SO4 -> Al2(SO4)3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
  it("balances CaO + H2SO4 -> CaSO4 + H2O", () => {
    const r = balance("CaO + H2SO4 -> CaSO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("gas evolution reaction tests", () => {
  it("balances Na2CO3 + HCl -> NaCl + H2O + CO2", () => {
    const r = balance("Na2CO3 + HCl -> NaCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1, 1]);
  });
  it("balances Na2SO3 + HCl -> NaCl + H2O + SO2", () => {
    const r = balance("Na2SO3 + HCl -> NaCl + H2O + SO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1, 1]);
  });
  it("balances Na2S + HCl -> NaCl + H2S", () => {
    const r = balance("Na2S + HCl -> NaCl + H2S");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances NaHCO3 + HCl -> NaCl + H2O + CO2", () => {
    const r = balance("NaHCO3 + HCl -> NaCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances CaCO3 + HCl -> CaCl2 + H2O + CO2", () => {
    const r = balance("CaCO3 + HCl -> CaCl2 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances Mg + HCl -> MgCl2 + H2", () => {
    const r = balance("Mg + HCl -> MgCl2 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("water formation reaction tests", () => {
  it("balances NaOH + HCl -> NaCl + H2O", () => {
    const r = balance("NaOH + HCl -> NaCl + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances KOH + HNO3 -> KNO3 + H2O", () => {
    const r = balance("KOH + HNO3 -> KNO3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Ca(OH)2 + HCl -> CaCl2 + H2O", () => {
    const r = balance("Ca(OH)2 + HCl -> CaCl2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances Ba(OH)2 + HNO3 -> Ba(NO3)2 + H2O", () => {
    const r = balance("Ba(OH)2 + HNO3 -> Ba(NO3)2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances NH3 + HCl -> NH4Cl", () => {
    const r = balance("NH3 + HCl -> NH4Cl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances 2H2 + O2 -> 2H2O", () => {
    const r = balance("2H2 + O2 -> 2H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("precipitation detail tests", () => {
  it("balances AgNO3 + NaCl -> AgCl + NaNO3 (verify AgCl)", () => {
    const r = balance("AgNO3 + NaCl -> AgCl + NaNO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products[0]!.formula).toBe("AgCl");
  });
  it("balances BaCl2 + H2SO4 -> BaSO4 + HCl", () => {
    const r = balance("BaCl2 + H2SO4 -> BaSO4 + HCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances AgNO3 + KBr -> AgBr + KNO3", () => {
    const r = balance("AgNO3 + KBr -> AgBr + KNO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances AgNO3 + KI -> AgI + KNO3", () => {
    const r = balance("AgNO3 + KI -> AgI + KNO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Pb(NO3)2 + Na2CrO4 -> PbCrO4 + NaNO3 (positive check)", () => {
    const r = balance("Pb(NO3)2 + Na2CrO4 -> PbCrO4 + NaNO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});
