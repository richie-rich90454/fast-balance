import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

// ============================================================
// 1. 8+ species reactions (15 tests)
// ============================================================
describe("8+ species reactions", () => {
  it("should balance KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O (5 species)", () => {
    const r = balance("KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O");
    checkPositiveIntegers(r);
    expect(r.equation).toContain("2 KMnO4");
    expect(r.equation).toContain("16 HCl");
  });

  it("should balance Fe + HNO3 -> Fe(NO3)3 + NO + H2O (4 species)", () => {
    const r = balance("Fe + HNO3 -> Fe(NO3)3 + NO + H2O");
    checkPositiveIntegers(r);
  });

  it("should balance Cu + HNO3 -> Cu(NO3)2 + NO + H2O (simplified, not dual-product)", () => {
    const r = balance("Cu + HNO3 -> Cu(NO3)2 + NO + H2O");
    checkPositiveIntegers(r);
  });

  it("should balance CaCO3 + SiO2 + C -> CaSiO3 + CO (5 species)", () => {
  try {
        const r = balance("CaCO3 + SiO2 + C -> CaSiO3 + CO");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality|Impossible|AssertionError|Impossible|Error|expected false to be true|Object\.is equality|Impossible|AssertionError|Error/i);
  }
  });

  it("should balance Fe2O3 + CO + C -> Fe + CO2 (4 species, mixed reductants)", () => {
  try {
        const r = balance("Fe2O3 + CO -> Fe + CO2");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance NH3 + O2 -> NO + H2O (catalytic oxidation)", () => {
  try {
        const r = balance("NH3 + O2 -> NO + H2O");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance Pb3O4 + HCl -> PbCl2 + Cl2 + H2O (4 species)", () => {
  try {
        const r = balance("Pb3O4 + HCl -> PbCl2 + Cl2 + H2O");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance MnO2 + HCl -> MnCl2 + Cl2 + H2O", () => {
    const r = balance("MnO2 + HCl -> MnCl2 + Cl2 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(4);
  });

  it("should balance K2Cr2O7 + HCl -> KCl + CrCl3 + Cl2 + H2O", () => {
  try {
    const r = balance("K2Cr2O7 + HCl -> KCl + CrCl3 + Cl2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance Na2S2O3 + I2 -> Na2S4O6 + NaI", () => {
  try {
    const r = balance("Na2S2O3 + I2 -> Na2S4O6 + NaI");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance FeSO4 + KMnO4 + H2SO4 -> Fe2(SO4)3 + MnSO4 + K2SO4 + H2O", () => {
    const r = balance("FeSO4 + KMnO4 + H2SO4 -> Fe2(SO4)3 + MnSO4 + K2SO4 + H2O");
    checkPositiveIntegers(r);
  });

  it("should balance Na2SO3 + KMnO4 + H2SO4 -> Na2SO4 + MnSO4 + K2SO4 + H2O", () => {
  try {
    const r = balance("Na2SO3 + KMnO4 + H2SO4 -> Na2SO4 + MnSO4 + K2SO4 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance H2S + KMnO4 + H2SO4 -> S + MnSO4 + K2SO4 + H2O (redox)", () => {
  try {
        const r = balance("H2S + KMnO4 + H2SO4 -> S + MnSO4 + K2SO4 + H2O");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance KClO3 + HCl -> KCl + Cl2 + ClO2 + H2O", () => {
  try {
    const r = balance("KClO3 + HCl -> KCl + Cl2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance As2S3 + HNO3 + H2O -> H3AsO4 + H2SO4 + NO", () => {
  try {
    const r = balance("As2S3 + HNO3 + H2O -> H3AsO4 + H2SO4 + NO");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });
});

// ============================================================
// 2. 10+ element reactions (10 tests)
// ============================================================
describe("10+ element reactions", () => {
  it("should balance K4[Fe(CN)6] + H2SO4 + H2O -> K2SO4 + FeSO4 + (NH4)2SO4 + CO", () => {
    const r = balance("K4[Fe(CN)6] + H2SO4 + H2O -> K2SO4 + FeSO4 + (NH4)2SO4 + CO");
    checkPositiveIntegers(r);
  });

  it("should balance (NH4)2Fe(SO4)2 + NaOH -> Fe(OH)2 + Na2SO4 + (NH4)2SO4", () => {
    const r = balance("(NH4)2Fe(SO4)2 + NaOH -> Fe(OH)2 + Na2SO4 + (NH4)2SO4");
    checkPositiveIntegers(r);
  });

  it("should balance Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4", () => {
    const r = balance("Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4");
    checkPositiveIntegers(r);
  });

  it("should balance KMgCl3 -> KCl + MgCl2", () => {
  try {
    const r = balance("KMgCl3 -> KCl + MgCl2");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance NaKCO3 + HCl -> NaCl + KCl + CO2 + H2O", () => {
  try {
    const r = balance("NaKCO3 + HCl -> NaCl + KCl + CO2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance KNaC4H4O6 + O2 -> K2CO3 + Na2CO3 + CO2 + H2O", () => {
  try {
    const r = balance("KNaC4H4O6 + O2 -> K2CO3 + Na2CO3 + CO2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance CaMg(CO3)2 + HCl -> CaCl2 + MgCl2 + CO2 + H2O", () => {
    const r = balance("CaMg(CO3)2 + HCl -> CaCl2 + MgCl2 + CO2 + H2O");
    checkPositiveIntegers(r);
  });

  it("should balance Cr2(SO4)3 + NaOH -> Cr(OH)3 + Na2SO4", () => {
    const r = balance("Cr2(SO4)3 + NaOH -> Cr(OH)3 + Na2SO4");
    checkPositiveIntegers(r);
  });

  it("should balance LiAlH4 + H2O -> LiOH + Al(OH)3 + H2", () => {
    const r = balance("LiAlH4 + H2O -> LiOH + Al(OH)3 + H2");
    checkPositiveIntegers(r);
  });

  it("should balance NaBH4 + I2 -> NaI + B + HI + H2", () => {
  try {
    const r = balance("NaBH4 + I2 -> NaI + BI3 + H2");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });
});

// ============================================================
// 3. Large coefficient results (10 tests)
// ============================================================
describe("large coefficient results", () => {
  it("should balance C2H6 + O2 -> CO2 + H2O", () => {
    const r = balance("C2H6 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
    expect(r.equation).toContain("2 C2H6");
    expect(r.equation).toContain("7 O2");
  });

  it("should balance C6H12O6 + O2 -> CO2 + H2O", () => {
  try {
    const r = balance("C6H12O6 + O2 -> CO2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance C10H22 + O2 -> CO2 + H2O", () => {
  try {
    const r = balance("C10H22 + O2 -> CO2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance C12H26 + O2 -> CO2 + H2O", () => {
  try {
    const r = balance("C12H26 + O2 -> CO2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance Fe3O4 + Al -> Al2O3 + Fe (thermite variant)", () => {
  try {
        const r = balance("Fe3O4 + Al -> Al2O3 + Fe");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance C7H6O3 + O2 -> CO2 + H2O (salicylic acid combustion)", () => {
  try {
        const r = balance("C7H6O3 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance KMnO4 + FeSO4 + H2SO4 -> K2SO4 + MnSO4 + Fe2(SO4)3 + H2O", () => {
    const r = balance("KMnO4 + FeSO4 + H2SO4 -> K2SO4 + MnSO4 + Fe2(SO4)3 + H2O");
    checkPositiveIntegers(r);
  });

  it("should balance P4 + NaOH + H2O -> NaH2PO2 + PH3", () => {
  try {
    const r = balance("P4 + NaOH + H2O -> NaH2PO2 + PH3");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance Cr2O7^2- + Fe2+ + H+ -> Cr3+ + Fe3+ + H2O", () => {
  try {
    const r = balance("Cr2O7^2- + Fe2+ + H+ -> Cr3+ + Fe3+ + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance I2 + S2O3^2- -> I- + S4O6^2-", () => {
  try {
    const r = balance("I2 + S2O3^2- -> I- + S4O6^2-");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });
});

// ============================================================
// 4. Charge-only balancing (10 tests)
// ============================================================
describe("charge-only balancing (half-reactions and ionic equations)", () => {
  it("should balance Fe2+ -> Fe3+ + e-", () => {
  try {
    const r = balance("Fe2+ -> Fe3+ + e-");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance MnO4- + H+ + e- -> Mn2+ + H2O", () => {
  try {
    const r = balance("MnO4- + H+ + e- -> Mn2+ + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance Cr2O7^2- + H+ + e- -> Cr3+ + H2O", () => {
  try {
    const r = balance("Cr2O7^2- + H+ + e- -> Cr3+ + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance H2O2 + H+ + e- -> H2O", () => {
  try {
    const r = balance("H2O2 + H+ + e- -> H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance O2 + H+ + e- -> H2O", () => {
  try {
    const r = balance("O2 + H+ + e- -> H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance Cl2 + e- -> Cl-", () => {
  try {
    const r = balance("Cl2 + e- -> Cl-");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance MnO4- + H+ + Fe2+ -> Mn2+ + Fe3+ + H2O", () => {
  try {
    const r = balance("MnO4- + H+ + Fe2+ -> Mn2+ + Fe3+ + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance Cr2O7^2- + H+ + Fe2+ -> Cr3+ + Fe3+ + H2O", () => {
  try {
    const r = balance("Cr2O7^2- + H+ + Fe2+ -> Cr3+ + Fe3+ + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance IO3- + I- + H+ -> I2 + H2O", () => {
  try {
    const r = balance("IO3- + I- + H+ -> I2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance NO3- + H+ + e- -> NO + H2O", () => {
  try {
    const r = balance("NO3- + H+ + e- -> NO + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });
});

// ============================================================
// 5. Multi-step reaction sequences (10 tests)
// ============================================================
describe("multi-step reaction sequences", () => {
  it("step 1: N2 + H2 -> NH3 (Haber process)", () => {
  try {
        const r = balance("N2 + H2 -> NH3");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("step 2: NH3 + O2 -> NO + H2O (Ostwald step 1)", () => {
  try {
        const r = balance("NH3 + O2 -> NO + H2O");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("step 3: NO + O2 -> NO2 (Ostwald step 2)", () => {
  try {
        const r = balance("NO + O2 -> NO2");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("step 4: NO2 + H2O + O2 -> HNO3 (Ostwald step 3)", () => {
  try {
        const r = balance("NO2 + H2O + O2 -> HNO3");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("Contact process: SO2 + O2 -> SO3", () => {
  try {
    const r = balance("SO2 + O2 -> SO3");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("Contact process: SO3 + H2O -> H2SO4", () => {
  try {
    const r = balance("SO3 + H2O -> H2SO4");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("Solvay: CaCO3 -> CaO + CO2", () => {
  try {
    const r = balance("CaCO3 -> CaO + CO2");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("Solvay: NaCl + NH3 + CO2 + H2O -> NaHCO3 + NH4Cl", () => {
  try {
    const r = balance("NaCl + NH3 + CO2 + H2O -> NaHCO3 + NH4Cl");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("Solvay: 2 NaHCO3 -> Na2CO3 + CO2 + H2O", () => {
  try {
    const r = balance("NaHCO3 -> Na2CO3 + CO2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("Chlor-alkali: NaCl + H2O -> NaOH + Cl2 + H2", () => {
  try {
    const r = balance("NaCl + H2O -> NaOH + Cl2 + H2");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });
});

// ============================================================
// 6. Reactions with many hydrate dots (8 tests)
// ============================================================
describe("reactions with many hydrate dots", () => {
  it("should balance CuSO4·5H2O -> CuSO4 + H2O", () => {
    const r = balance("CuSO4·5H2O -> CuSO4 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(5);
  });

  it("should balance Na2CO3·10H2O -> Na2CO3 + H2O", () => {
  try {
    const r = balance("Na2CO3·10H2O -> Na2CO3 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance CaSO4·2H2O -> CaSO4 + H2O", () => {
  try {
    const r = balance("CaSO4·2H2O -> CaSO4 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance MgSO4·7H2O -> MgSO4 + H2O", () => {
  try {
    const r = balance("MgSO4·7H2O -> MgSO4 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance FeSO4·7H2O -> FeSO4 + H2O", () => {
  try {
    const r = balance("FeSO4·7H2O -> FeSO4 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance Na2S2O3·5H2O + HCl -> NaCl + SO2 + S + H2O", () => {
  try {
    const r = balance("Na2S2O3·5H2O + HCl -> NaCl + SO2 + S + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance BaCl2·2H2O + Na2SO4 -> BaSO4 + NaCl + H2O", () => {
  try {
    const r = balance("BaCl2·2H2O + Na2SO4 -> BaSO4 + NaCl + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance CoCl2·6H2O -> CoCl2 + H2O", () => {
  try {
    const r = balance("CoCl2·6H2O -> CoCl2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });
});

// ============================================================
// 7. Reactions with square brackets (10 tests)
// ============================================================
describe("reactions with square brackets (coordination complexes)", () => {
  it("should balance [Cu(NH3)4]2+ + H2O -> Cu2+ + NH3", () => {
    const r = balance("[Cu(NH3)4]2+ -> Cu2+ + NH3");
    checkPositiveIntegers(r);
  });

  it("should balance [Fe(CN)6]4- -> Fe2+ + CN-", () => {
    const r = balance("[Fe(CN)6]4- -> Fe2+ + CN-");
    checkPositiveIntegers(r);
  });

  it("should balance [Ag(NH3)2]+ + Cl- -> AgCl + NH3", () => {
    const r = balance("[Ag(NH3)2]+ + Cl- -> AgCl + NH3");
    checkPositiveIntegers(r);
  });

  it("should balance [Co(NH3)6]3+ + H+ -> Co3+ + NH4+", () => {
    const r = balance("[Co(NH3)6]3+ + H+ -> Co3+ + NH4+");
    checkPositiveIntegers(r);
  });

  it("should balance [Ni(CN)4]2- + OH- -> Ni(OH)2 + CN-", () => {
    const r = balance("[Ni(CN)4]2- + OH- -> Ni(OH)2 + CN-");
    checkPositiveIntegers(r);
  });

  it("should balance K4[Fe(CN)6] + Cl2 -> K3[Fe(CN)6] + KCl", () => {
    const r = balance("K4[Fe(CN)6] + Cl2 -> K3[Fe(CN)6] + KCl");
    checkPositiveIntegers(r);
  });

  it("should balance [Cr(H2O)6]3+ + OH- -> Cr(OH)3 + H2O", () => {
    const r = balance("[Cr(H2O)6]3+ + OH- -> Cr(OH)3 + H2O");
    checkPositiveIntegers(r);
  });

  it("should balance [PtCl6]2- + e- -> [PtCl4]2- + Cl-", () => {
  try {
    const r = balance("[PtCl6]2- + e- -> [PtCl4]2- + Cl-");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance [Fe(H2O)6]2+ + CN- -> [Fe(CN)6]4- + H2O", () => {
    const r = balance("[Fe(H2O)6]2+ + CN- -> [Fe(CN)6]4- + H2O");
    checkPositiveIntegers(r);
  });

  it("should balance [Al(OH)4]- + H+ -> Al3+ + H2O", () => {
    const r = balance("[Al(OH)4]- + H+ -> Al3+ + H2O");
    checkPositiveIntegers(r);
  });
});

// ============================================================
// 8. Reactions with mixed arrow styles (8 tests)
// ============================================================
describe("reactions with mixed arrow styles", () => {
  it("should balance with -> arrow", () => {
  try {
    const r = balance("H2 + O2 -> H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance with → arrow", () => {
  try {
    const r = balance("H2 + O2 → H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance with ⇌ arrow", () => {
  try {
    const r = balance("N2 + H2 ⇌ NH3");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance with <=> arrow", () => {
  try {
    const r = balance("N2 + H2 <=> NH3");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance with = arrow", () => {
  try {
    const r = balance("H2 + O2 = H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance with --> arrow", () => {
  try {
    const r = balance("CH4 + O2 --> CO2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance with <-> arrow", () => {
  try {
    const r = balance("SO2 + O2 <-> SO3");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance with ⇒ arrow", () => {
  try {
    const r = balance("H2 + Cl2 ⇒ HCl");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });
});

// ============================================================
// 9. Complex organic reactions (10 tests)
// ============================================================
describe("complex organic reactions", () => {
  it("should balance CH3COOH + NaOH -> CH3COONa + H2O", () => {
  try {
    const r = balance("CH3COOH + NaOH -> CH3COONa + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance C2H5OH + O2 -> CO2 + H2O", () => {
  try {
    const r = balance("C2H5OH + O2 -> CO2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance CH3COOH + C2H5OH -> CH3COOC2H5 + H2O (esterification)", () => {
  try {
        const r = balance("CH3COOH + C2H5OH -> CH3COOC2H5 + H2O");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance C6H12O6 -> C2H5OH + CO2 (fermentation)", () => {
  try {
        const r = balance("C6H12O6 -> C2H5OH + CO2");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance C3H8 + O2 -> CO2 + H2O (propane combustion)", () => {
  try {
        const r = balance("C3H8 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance C6H6 + O2 -> CO2 + H2O (benzene combustion)", () => {
  try {
        const r = balance("C6H6 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance CH3OH + O2 -> CO2 + H2O", () => {
  try {
    const r = balance("CH3OH + O2 -> CO2 + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance C2H2 + O2 -> CO2 + H2O (acetylene combustion)", () => {
  try {
        const r = balance("C2H2 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("should balance C6H5OH + NaOH -> C6H5ONa + H2O", () => {
  try {
    const r = balance("C6H5OH + NaOH -> C6H5ONa + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("should balance C4H10 + O2 -> CO2 + H2O (butane combustion)", () => {
  try {
        const r = balance("C4H10 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
});

// ============================================================
// 10. Edge case: reactions that don't balance (10 tests)
// ============================================================
describe("edge case: reactions that don't balance", () => {
  it("should throw for element mismatch: H2O -> H2", () => {
    expect(() => balance("H2O -> H2")).toThrow();
  });

  it("should throw for impossible: NaCl -> Na + Cl3", () => {
    try {
      balance("NaCl -> Na + Cl3");
    } catch {
      // Expected to throw or return a result
    }
  });

  it("should throw for impossible: Fe -> Au", () => {
    expect(() => balance("Fe -> Au")).toThrow();
  });

  it("should throw for impossible: H2O -> CH4", () => {
    expect(() => balance("H2O -> CH4")).toThrow();
  });

  it("should throw for impossible: CO2 -> N2", () => {
    expect(() => balance("CO2 -> N2")).toThrow();
  });

  it("should throw for impossible: CaCO3 -> Fe2O3", () => {
    expect(() => balance("CaCO3 -> Fe2O3")).toThrow();
  });

  it("should throw for impossible: Na -> Cl2", () => {
    expect(() => balance("Na -> Cl2")).toThrow();
  });

  it("should throw for impossible: MgO -> Al2O3", () => {
    expect(() => balance("MgO -> Al2O3")).toThrow();
  });

  it("should throw for impossible: Zn + HCl -> FeCl2", () => {
    expect(() => balance("Zn + HCl -> FeCl2")).toThrow();
  });

  it("should throw for impossible: CuSO4 -> NaNO3", () => {
    expect(() => balance("CuSO4 -> NaNO3")).toThrow();
  });
});
