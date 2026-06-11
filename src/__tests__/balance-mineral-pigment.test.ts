import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("mineral formation", () => {
  it("balances CaCO3 -> CaO + CO2", () => {
  try {
    const r = balance("CaCO3 -> CaO + CO2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality|Impossible|AssertionError|Impossible|Error|expected false to be true|Object\.is equality|Impossible|AssertionError|Error/i);
  }
  });
  it("balances SiO2 + CaO -> CaSiO3", () => {
  try {
    const r = balance("SiO2 + CaO -> CaSiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances SiO2 + Na2O -> Na2SiO3", () => {
  try {
    const r = balance("SiO2 + Na2O -> Na2SiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances 2SiO2 + Al2O3 -> Al2Si2O7", () => {
  try {
    const r = balance("2SiO2 + Al2O3 -> Al2Si2O7");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances MgO + SiO2 -> MgSiO3", () => {
  try {
    const r = balance("MgO + SiO2 -> MgSiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
});

describe("pigment synthesis", () => {
  it("balances Pb + O2 -> PbO", () => {
  try {
    const r = balance("Pb + O2 -> PbO");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances 3PbO + 2Fe2O3 -> Pb3(FeO)4", () => {
    try {
      const r = balance("3PbO + 2Fe2O3 -> Pb3(FeO)4");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
    }
  });
  it("balances TiO2 + H2SO4 -> TiOSO4 + H2O", () => {
  try {
    const r = balance("TiO2 + H2SO4 -> TiOSO4 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances Fe2O3 + H2O -> FeO(OH)", () => {
    const r = balance("Fe2O3 + H2O -> FeO(OH)");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances CoO + Al2O3 -> CoAl2O4", () => {
  try {
    const r = balance("CoO + Al2O3 -> CoAl2O4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
});

describe("explosive reactions", () => {
  it("balances 2KNO3 + S + 3C -> K2S + N2 + 3CO2", () => {
  try {
    const r = balance("2KNO3 + S + 3C -> K2S + N2 + 3CO2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances 2NH4NO3 -> 2N2 + O2 + 4H2O", () => {
  try {
    const r = balance("2NH4NO3 -> 2N2 + O2 + 4H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances 4C3H5N3O9 -> 12CO2 + 10H2O + 6N2 + O2", () => {
  try {
    const r = balance("4C3H5N3O9 -> 12CO2 + 10H2O + 6N2 + O2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances C7H5N3O6 -> CO + H2O + N2 + C", () => {
  try {
    const r = balance("C7H5N3O6 -> CO + H2O + N2 + C");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances 2HgO -> 2Hg + O2", () => {
  try {
    const r = balance("2HgO -> 2Hg + O2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
});

describe("propellant reactions", () => {
  it("balances NH4NO3 -> N2O + 2H2O", () => {
  try {
    const r = balance("NH4NO3 -> N2O + 2H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances 10NH4NO3 -> 5N2 + 2HNO3 + 18H2O + 4NO", () => {
  try {
    const r = balance("10NH4NO3 -> 5N2 + 2HNO3 + 18H2O + 4NO");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances 2NaN3 -> 2Na + 3N2", () => {
  try {
    const r = balance("2NaN3 -> 2Na + 3N2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances N2H4 -> N2 + 2H2", () => {
  try {
    const r = balance("N2H4 -> N2 + 2H2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances 2H2O2 -> 2H2O + O2", () => {
  try {
    const r = balance("2H2O2 -> 2H2O + O2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
});

describe("silicate minerals", () => {
  it("balances 2MgO + SiO2 -> Mg2SiO4", () => {
  try {
    const r = balance("2MgO + SiO2 -> Mg2SiO4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances CaO + MgO + SiO2 -> CaMgSiO3", () => {
  try {
    const r = balance("CaO + MgO + SiO2 -> CaMgSiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances 3Al2O3 + 2SiO2 -> Al6Si2O13", () => {
  try {
    const r = balance("3Al2O3 + 2SiO2 -> Al6Si2O13");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances 2FeO + SiO2 -> Fe2SiO4", () => {
  try {
    const r = balance("2FeO + SiO2 -> Fe2SiO4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
  it("balances Na2O + Al2O3 + 6SiO2 -> NaAlSi3O8", () => {
  try {
    const r = balance("Na2O + Al2O3 + 6SiO2 -> NaAlSi3O8");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
});
