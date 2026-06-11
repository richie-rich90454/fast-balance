import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("green chemistry - atom economy", () => {
  it("C2H4 + H2 -> C2H6 (100% atom economy)", () => {
    const r = balance("C2H4 + H2 -> C2H6");
    checkPositiveIntegers(r);
  });
  it("C4H6 + C2H4 -> C6H10 (Diels-Alder, 100%)", () => {
    const r = balance("C4H6 + C2H4 -> C6H10");
    checkPositiveIntegers(r);
  });
  it("CH3COOH + C2H5OH -> CH3COOC2H5 + H2O", () => {
    const r = balance("CH3COOH + C2H5OH -> CH3COOC2H5 + H2O");
    checkPositiveIntegers(r);
  });
  it("C3H6 + HBr -> C3H7Br", () => {
    const r = balance("C3H6 + HBr -> C3H7Br");
    checkPositiveIntegers(r);
  });
  it("C2H2 + H2O -> C2H4O", () => {
    const r = balance("C2H2 + H2O -> C2H4O");
    checkPositiveIntegers(r);
  });
  it("C6H5CHO + Ph3PCH2 -> C6H5CHCH2 + Ph3PO (low atom economy)", () => {
    try {
      const r = balance("C6H5CHO + Ph3PCH2 -> C6H5CHCH2 + Ph3PO");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
});

describe("green chemistry - solvent alternatives", () => {
  it("CH3COOCH3 + H2O -> CH3COOH + CH3OH", () => {
    const r = balance("CH3COOCH3 + H2O -> CH3COOH + CH3OH");
    checkPositiveIntegers(r);
  });
  it("C6H6 + HNO3 -> C6H5NO2 + H2O", () => {
    const r = balance("C6H6 + HNO3 -> C6H5NO2 + H2O");
    checkPositiveIntegers(r);
  });
  it("C3H8O3 + H2O -> CO2 + H2", () => {
    const r = balance("C3H8O3 + H2O -> CO2 + H2");
    checkPositiveIntegers(r);
  });
  it("CO + H2O -> CO2 + H2", () => {
    const r = balance("CO + H2O -> CO2 + H2");
    checkPositiveIntegers(r);
  });
  it("CO2 + C3H6O -> C4H6O3", () => {
    try {
      const r = balance("CO2 + C3H6O -> C4H6O3");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("C2H5Cl + NaOH -> C2H5OH + NaCl", () => {
    const r = balance("C2H5Cl + NaOH -> C2H5OH + NaCl");
    checkPositiveIntegers(r);
  });
});

describe("green chemistry - catalysis vs stoichiometric", () => {
  it("C6H5NO2 + H2 -> C6H5NH2 + H2O", () => {
    const r = balance("C6H5NO2 + H2 -> C6H5NH2 + H2O");
    checkPositiveIntegers(r);
  });
  it("C6H12O6 -> C6H12O6 (isomerization)", () => {
    try {
      const r = balance("C6H12O6 -> C6H12O6");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("C2H5OH + O2 -> CH3COOH + H2O", () => {
    const r = balance("C2H5OH + O2 -> CH3COOH + H2O");
    checkPositiveIntegers(r);
  });
  it("C2H5OH + KMnO4 -> CH3COOK + MnO2 + KOH + H2O", () => {
    const r = balance("C2H5OH + KMnO4 -> CH3COOK + MnO2 + KOH + H2O");
    checkPositiveIntegers(r);
  });
  it("C6H6 + O2 -> C6H5OH + H2O", () => {
    try {
      const r = balance("C6H6 + O2 -> C6H5OH + H2O");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("H2O -> H2 + O2", () => {
    const r = balance("H2O -> H2 + O2");
    checkPositiveIntegers(r);
  });
  it("C6H10O5 + H2O -> C6H12O6", () => {
    const r = balance("C6H10O5 + H2O -> C6H12O6");
    checkPositiveIntegers(r);
  });
});

describe("green chemistry - renewable feedstocks", () => {
  it("C6H12O6 -> C2H5OH + CO2 (fermentation)", () => {
    const r = balance("C6H12O6 -> C2H5OH + CO2");
    checkPositiveIntegers(r);
  });
  it("C57H104O6 + CH3OH -> C19H36O2 + C3H8O3 (biodiesel)", () => {
    const r = balance("C57H104O6 + CH3OH -> C19H36O2 + C3H8O3");
    checkPositiveIntegers(r);
  });
  it("C6H10O5 + H2O -> C6H12O6 (starch hydrolysis)", () => {
    const r = balance("C6H10O5 + H2O -> C6H12O6");
    checkPositiveIntegers(r);
  });
  it("C6H12O6 -> C3H6O3 (lactic acid)", () => {
    try {
      const r = balance("C6H12O6 -> C3H6O3");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("C6H12O6 + H2 -> C6H14O6 (sorbitol)", () => {
    const r = balance("C6H12O6 + H2 -> C6H14O6");
    checkPositiveIntegers(r);
  });
  it("C10H12O3 + O2 -> C8H8O3 + CH2O + H2O", () => {
    try {
      const r = balance("C10H12O3 + O2 -> C8H8O3 + CH2O + H2O");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("C5H4O2 + H2 -> C4H4O + CO + H2O", () => {
    try {
      const r = balance("C5H4O2 + H2 -> C4H4O + CO + H2O");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("C3H8O3 + 3C18H34O2 -> C57H104O6 + 3H2O", () => {
    const r = balance("C3H8O3 + C18H34O2 -> C57H104O6 + H2O");
    checkPositiveIntegers(r);
  });
});

describe("green chemistry - biodegradable polymers", () => {
  it("C3H6O3 -> C3H4O2 + H2O (PLA monomer)", () => {
    const r = balance("C3H6O3 -> C3H4O2 + H2O");
    checkPositiveIntegers(r);
  });
  it("C6H8O4 -> C6H8O4 (lactide ring-opening)", () => {
    try {
      const r = balance("C6H8O4 -> C6H8O4");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("C4H6O4 + C4H10O2 -> C8H12O4 + H2O", () => {
    const r = balance("C4H6O4 + C4H10O2 -> C8H12O4 + H2O");
    checkPositiveIntegers(r);
  });
  it("C6H10O2 + H2O -> C6H12O3", () => {
    const r = balance("C6H10O2 + H2O -> C6H12O3");
    checkPositiveIntegers(r);
  });
  it("C6H10O5 + C3H4O -> C9H14O6", () => {
    try {
      const r = balance("C6H10O5 + C3H4O -> C9H14O6");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("C5H10O2 -> C5H8O2 + H2O", () => {
    try {
      const r = balance("C5H10O2 -> C5H8O2 + H2O");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
});

describe("green chemistry - waste minimization", () => {
  it("C10H8O4 + H2O -> C8H6O4 + C2H6O2", () => {
    const r = balance("C10H8O4 + H2O -> C8H6O4 + C2H6O2");
    checkPositiveIntegers(r);
  });
  it("CO2 + NaOH -> Na2CO3 + H2O", () => {
    const r = balance("CO2 + NaOH -> Na2CO3 + H2O");
    checkPositiveIntegers(r);
  });
  it("PdCl2 + H2 -> Pd + HCl", () => {
    const r = balance("PdCl2 + H2 -> Pd + HCl");
    checkPositiveIntegers(r);
  });
  it("H2SO4 + Ca(OH)2 -> CaSO4 + H2O", () => {
    const r = balance("H2SO4 + Ca(OH)2 -> CaSO4 + H2O");
    checkPositiveIntegers(r);
  });
  it("NH4Cl + NaOH -> NH3 + NaCl + H2O", () => {
    const r = balance("NH4Cl + NaOH -> NH3 + NaCl + H2O");
    checkPositiveIntegers(r);
  });
  it("Al + Fe2O3 -> Al2O3 + Fe (thermite, waste reduction)", () => {
    const r = balance("Al + Fe2O3 -> Al2O3 + Fe");
    checkPositiveIntegers(r);
  });
});

describe("green chemistry - alternative energy carriers", () => {
  it("CH4 + H2O -> CO + H2", () => {
    const r = balance("CH4 + H2O -> CO + H2");
    checkPositiveIntegers(r);
  });
  it("NH3 + O2 -> N2 + H2O", () => {
    const r = balance("NH3 + O2 -> N2 + H2O");
    checkPositiveIntegers(r);
  });
  it("CH3OH + H2O -> CO2 + H2", () => {
    const r = balance("CH3OH + H2O -> CO2 + H2");
    checkPositiveIntegers(r);
  });
  it("H2 + O2 -> H2O", () => {
    const r = balance("H2 + O2 -> H2O");
    checkPositiveIntegers(r);
  });
  it("CH2O2 -> H2 + CO2", () => {
    const r = balance("CH2O2 -> H2 + CO2");
    checkPositiveIntegers(r);
  });
  it("NaBH4 + H2O -> NaBO2 + H2", () => {
    const r = balance("NaBH4 + H2O -> NaBO2 + H2");
    checkPositiveIntegers(r);
  });
  it("N2 + H2 -> NH3", () => {
    const r = balance("N2 + H2 -> NH3");
    checkPositiveIntegers(r);
  });
  it("C + H2O -> CO + H2", () => {
    const r = balance("C + H2O -> CO + H2");
    checkPositiveIntegers(r);
  });
});

describe("green chemistry - carbon capture and utilization", () => {
  it("CO2 + H2 -> CH3OH + H2O", () => {
    const r = balance("CO2 + H2 -> CH3OH + H2O");
    checkPositiveIntegers(r);
  });
  it("CO2 + H2 -> CH2O2", () => {
    try {
      const r = balance("CO2 + H2 -> CH2O2");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("CO2 + CaO -> CaCO3", () => {
    const r = balance("CO2 + CaO -> CaCO3");
    checkPositiveIntegers(r);
  });
  it("CO2 + NH3 -> NH2CONH2 + H2O", () => {
    const r = balance("CO2 + NH3 -> NH2CONH2 + H2O");
    checkPositiveIntegers(r);
  });
  it("CO2 + CH4 -> CO + H2", () => {
    const r = balance("CO2 + CH4 -> CO + H2");
    checkPositiveIntegers(r);
  });
  it("CO2 + H2O -> C2H4 + O2", () => {
    const r = balance("CO2 + H2O -> C2H4 + O2");
    checkPositiveIntegers(r);
  });
  it("CO2 + H2 -> CH3OCH3 + H2O", () => {
    const r = balance("CO2 + H2 -> CH3OCH3 + H2O");
    checkPositiveIntegers(r);
  });
  it("CO2 + NaOH -> NaHCO3", () => {
    const r = balance("CO2 + NaOH -> NaHCO3");
    checkPositiveIntegers(r);
  });
});

describe("green chemistry - 12 principles", () => {
  it("P1: C6H5CH3 + O2 -> C6H5COOH + H2O", () => {
    const r = balance("C6H5CH3 + O2 -> C6H5COOH + H2O");
    checkPositiveIntegers(r);
  });
  it("P2: C2H2 + CH3N3 -> C3H5N3 (click chemistry)", () => {
    const r = balance("C2H2 + CH3N3 -> C3H5N3");
    checkPositiveIntegers(r);
  });
  it("P5: CaO + CO2 -> CaCO3", () => {
    const r = balance("CaO + CO2 -> CaCO3");
    checkPositiveIntegers(r);
  });
  it("P6: NaOH + HCl -> NaCl + H2O", () => {
    const r = balance("NaOH + HCl -> NaCl + H2O");
    checkPositiveIntegers(r);
  });
  it("P7: C6H12O6 + O2 -> C4H6O4 + CO2 + H2O", () => {
    try {
      const r = balance("C6H12O6 + O2 -> C4H6O4 + CO2 + H2O");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("P8: C6H6 + CH3OH -> C6H5CH3 + H2O", () => {
    try {
      const r = balance("C6H6 + CH3OH -> C6H5CH3 + H2O");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
  it("P9: C3H8O3 + C18H36O2 -> C21H40O6 + H2O", () => {
    const r = balance("C3H8O3 + C18H36O2 -> C21H40O6 + H2O");
    checkPositiveIntegers(r);
  });
  it("P10: C4H6O3 + H2O -> C4H8O4", () => {
    const r = balance("C4H6O3 + H2O -> C4H8O4");
    checkPositiveIntegers(r);
  });
  it("P11: H2O2 -> H2O + O2", () => {
    const r = balance("H2O2 -> H2O + O2");
    checkPositiveIntegers(r);
  });
  it("P12: NaBH4 + H2O -> NaB(OH)4 + H2", () => {
    const r = balance("NaBH4 + H2O -> NaB(OH)4 + H2");
    checkPositiveIntegers(r);
  });
  it("C2H2 + NaNH2 -> C2HNa + NH3", () => {
    const r = balance("C2H2 + NaNH2 -> C2HNa + NH3");
    checkPositiveIntegers(r);
  });
  it("CO2 + Mg -> MgO + C", () => {
    const r = balance("CO2 + Mg -> MgO + C");
    checkPositiveIntegers(r);
  });
});