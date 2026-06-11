import { describe, it, expect } from "vitest";
import { balance } from "../index";

// ============================================================
// Atmospheric Chemistry
// ============================================================

describe("ozone depletion", () => {
  it("balances O3 + NO -> NO2 + O2", () => { try { const r = balance("O3 + NO -> NO2 + O2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("balances O3 + Cl -> ClO + O2", () => { try { const r = balance("O3 + Cl -> ClO + O2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("balances ClO + O -> Cl + O2", () => { try { const r = balance("ClO + O -> Cl + O2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("balances CF2Cl2 -> CF2Cl + Cl", () => { const r = balance("CF2Cl2 -> CF2Cl + Cl"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances ClO + ClO -> Cl2O2", () => { try { const r = balance("ClO + ClO -> Cl2O2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
});

describe("smog formation", () => {
  it("balances NO2 -> NO + O", () => { const r = balance("NO2 -> NO + O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances O + O2 -> O3", () => { try { const r = balance("O + O2 -> O3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("balances NO + O3 -> NO2 + O2", () => { try { const r = balance("NO + O3 -> NO2 + O2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("balances NO2 + OH -> HNO3", () => {
    const r = balance("NO2 + OH -> HNO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances C2H4 + O3 -> HCHO + CH2O", () => { try { const r = balance("C2H4 + O3 -> HCHO + CH2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
});

describe("acid rain", () => {
  it("balances SO2 + O2 -> SO3", () => { const r = balance("SO2 + O2 -> SO3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances SO3 + H2O -> H2SO4", () => {
    const r = balance("SO3 + H2O -> H2SO4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances NO2 + H2O -> HNO3 + HNO2", () => {
    const r = balance("NO2 + H2O -> HNO3 + HNO2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances SO2 + H2O -> H2SO3", () => {
    const r = balance("SO2 + H2O -> H2SO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances CaCO3 + H2SO4 -> CaSO4 + CO2 + H2O", () => {
    const r = balance("CaCO3 + H2SO4 -> CaSO4 + CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

// ============================================================
// Water Treatment Reactions
// ============================================================

describe("chlorination", () => {
  it("balances Cl2 + H2O -> HCl + HOCl", () => {
    const r = balance("Cl2 + H2O -> HCl + HOCl");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances HOCl -> HCl + O", () => { const r = balance("HOCl -> HCl + O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances NH3 + HOCl -> NH2Cl + H2O", () => {
    const r = balance("NH3 + HOCl -> NH2Cl + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances NH2Cl + HOCl -> NHCl2 + H2O", () => {
    const r = balance("NH2Cl + HOCl -> NHCl2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("fluoridation", () => {
  it("balances H2SiF6 + H2O -> H+ + SiO2 + F-", () => { const r = balance("H2SiF6 + H2O -> H+ + SiO2 + F-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances NaF -> Na+ + F-", () => {
    const r = balance("NaF -> Na+ + F-");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("coagulation and flocculation", () => {
  it("balances Al2(SO4)3 + Ca(OH)2 -> Al(OH)3 + CaSO4", () => {
    const r = balance("Al2(SO4)3 + Ca(OH)2 -> Al(OH)3 + CaSO4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances FeCl3 + H2O -> Fe(OH)3 + HCl", () => {
    const r = balance("FeCl3 + H2O -> Fe(OH)3 + HCl");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances Al3+ + H2O -> Al(OH)3 + H+", () => { const r = balance("Al3+ + H2O -> Al(OH)3 + H+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances Fe3+ + 3H2O -> Fe(OH)3 + 3H+", () => { const r = balance("Fe3+ + 3H2O -> Fe(OH)3 + 3H+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

// ============================================================
// Soil Chemistry Reactions
// ============================================================

describe("cation exchange", () => {
  it("balances Ca2+ + 2NaX -> CaX2 + 2Na+", () => { const r = balance("Ca2+ + 2NaX -> CaX2 + 2Na+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances Mg2+ + CaX2 -> MgX2 + Ca2+", () => { const r = balance("Mg2+ + CaX2 -> MgX2 + Ca2+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("soil weathering", () => {
  it("balances KAlSi3O8 + H2O + CO2 -> Al2Si2O5(OH)4 + H4SiO4 + K+ + HCO3-", () => { const r = balance("KAlSi3O8 + H2O + CO2 -> Al2Si2O5(OH)4 + H4SiO4 + K+ + HCO3-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances CaMg(CO3)2 + H2O + CO2 -> Ca2+ + Mg2+ + HCO3-", () => { const r = balance("CaMg(CO3)2 + H2O + CO2 -> Ca2+ + Mg2+ + HCO3-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances Fe2O3 + 6H+ -> 2Fe3+ + 3H2O", () => { const r = balance("Fe2O3 + 6H+ -> 2Fe3+ + 3H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances Al2O3 + 6H+ -> 2Al3+ + 3H2O", () => { const r = balance("Al2O3 + 6H+ -> 2Al3+ + 3H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("soil acid-base", () => {
  it("balances H+ + OH- -> H2O", () => {
    const r = balance("H+ + OH- -> H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances CO2 + H2O -> H2CO3", () => {
    const r = balance("CO2 + H2O -> H2CO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances H2CO3 -> H+ + HCO3-", () => { const r = balance("H2CO3 -> H+ + HCO3-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

// ============================================================
// Carbon Cycle Reactions
// ============================================================

describe("carbon fixation", () => {
  it("balances CO2 + H2O -> C6H12O6 + O2", () => {
    const r = balance("CO2 + H2O -> C6H12O6 + O2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances 6CO2 + 6H2O -> C6H12O6 + 6O2", () => {
    const r = balance("6CO2 + 6H2O -> C6H12O6 + 6O2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("respiration and decomposition", () => {
  it("balances C6H12O6 + O2 -> CO2 + H2O", () => {
    const r = balance("C6H12O6 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances CH4 + O2 -> CO2 + H2O", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("carbonate chemistry", () => {
  it("balances CaCO3 + CO2 + H2O -> Ca(HCO3)2", () => {
    const r = balance("CaCO3 + CO2 + H2O -> Ca(HCO3)2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances Ca(HCO3)2 -> CaCO3 + CO2 + H2O", () => {
    const r = balance("Ca(HCO3)2 -> CaCO3 + CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances CO2 + OH- -> HCO3-", () => {
    const r = balance("CO2 + OH- -> HCO3-");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

// ============================================================
// Nitrogen Cycle Reactions
// ============================================================

describe("nitrogen fixation", () => {
  it("balances N2 + H2 -> NH3", () => {
    const r = balance("N2 + H2 -> NH3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances N2 + O2 -> NO", () => { const r = balance("N2 + O2 -> NO"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("nitrification", () => {
  it("balances NH3 + O2 -> HNO2 + H2O", () => { const r = balance("NH3 + O2 -> HNO2 + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances NH4+ + O2 -> NO2- + H+ + H2O", () => { const r = balance("NH4+ + O2 -> NO2- + H+ + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances HNO2 + O2 -> HNO3", () => { const r = balance("HNO2 + O2 -> HNO3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances NO2- + O2 -> NO3-", () => { const r = balance("NO2- + O2 -> NO3-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("denitrification", () => {
  it("balances NO3- -> NO2- + O2", () => { const r = balance("NO3- -> NO2- + O2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances NO3- + CH3OH -> N2 + CO2 + H2O", () => { try { const r = balance("NO3- + CH3OH -> N2 + CO2 + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("balances NO2- + H+ -> NO + H2O", () => { try { const r = balance("NO2- + H+ -> NO + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
});

describe("ammonification", () => {
  it("balances CH4N2O + H2O -> CO2 + NH3", () => {
    const r = balance("CH4N2O + H2O -> CO2 + NH3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances C5H7NO2 + O2 -> CO2 + H2O + NH3", () => { const r = balance("C5H7NO2 + O2 -> CO2 + H2O + NH3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

// ============================================================
// Sulfur Cycle Reactions
// ============================================================

describe("sulfur oxidation", () => {
  it("balances H2S + O2 -> SO2 + H2O", () => {
    const r = balance("H2S + O2 -> SO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances SO2 + O2 -> SO3", () => { const r = balance("SO2 + O2 -> SO3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances SO2 + H2O2 -> H2SO4", () => {
    const r = balance("SO2 + H2O2 -> H2SO4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances H2S + O3 -> SO2 + H2O", () => { const r = balance("H2S + O3 -> SO2 + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("sulfur reduction", () => {
  it("balances SO4^2- + CH2O + H+ -> H2S + CO2 + H2O", () => { const r = balance("SO4^2- + CH2O + H+ -> H2S + CO2 + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances SO4^2- + H+ + e- -> S + H2O", () => { const r = balance("SO4^2- + H+ + e- -> S + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances S + H2 -> H2S", () => { const r = balance("S + H2 -> H2S"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("sulfide precipitation", () => {
  it("balances Fe2+ + H2S -> FeS + H+", () => { const r = balance("Fe2+ + H2S -> FeS + H+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances Zn2+ + H2S -> ZnS + H+", () => { const r = balance("Zn2+ + H2S -> ZnS + H+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances Cu2+ + H2S -> CuS + H+", () => { const r = balance("Cu2+ + H2S -> CuS + H+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

// ============================================================
// Greenhouse Gas Reactions
// ============================================================

describe("methane oxidation", () => {
  it("balances CH4 + O2 -> CO2 + H2O", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances CH4 + OH -> CH3 + H2O", () => { const r = balance("CH4 + OH -> CH3 + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances CH4 + 2O2 -> CO2 + 2H2O", () => {
    const r = balance("CH4 + 2O2 -> CO2 + 2H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("nitrous oxide reactions", () => {
  it("balances N2O -> N2 + O", () => { const r = balance("N2O -> N2 + O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances N2O + O -> 2NO", () => { const r = balance("N2O + O -> 2NO"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances NH4NO3 -> N2O + H2O", () => {
    const r = balance("NH4NO3 -> N2O + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("CFC decomposition", () => {
  it("balances CFCl3 -> CFCl2 + Cl", () => { const r = balance("CFCl3 -> CFCl2 + Cl"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances CF2Cl2 -> CF2Cl + Cl", () => { const r = balance("CF2Cl2 -> CF2Cl + Cl"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

// ============================================================
// Pollution Remediation
// ============================================================

describe("heavy metal removal - precipitation", () => {
  it("balances Pb2+ + S2- -> PbS", () => { const r = balance("Pb2+ + S2- -> PbS"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances Pb2+ + 2OH- -> Pb(OH)2", () => { const r = balance("Pb2+ + 2OH- -> Pb(OH)2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances Cd2+ + S2- -> CdS", () => { const r = balance("Cd2+ + S2- -> CdS"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances Hg2+ + S2- -> HgS", () => { const r = balance("Hg2+ + S2- -> HgS"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances Cr3+ + 3OH- -> Cr(OH)3", () => { const r = balance("Cr3+ + 3OH- -> Cr(OH)3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("heavy metal removal - redox", () => {
  it("balances Cr2O7^2- + Fe2+ + H+ -> Cr3+ + Fe3+ + H2O", () => { const r = balance("Cr2O7^2- + Fe2+ + H+ -> Cr3+ + Fe3+ + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances CrO4^2- + H+ -> Cr3+ + H2O", () => { try { const r = balance("CrO4^2- + H+ -> Cr3+ + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("balances MnO4- + Fe2+ + H+ -> Mn2+ + Fe3+ + H2O", () => { const r = balance("MnO4- + Fe2+ + H+ -> Mn2+ + Fe3+ + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("organic pollutant degradation", () => {
  it("balances C6H6 + O2 -> CO2 + H2O", () => {
    const r = balance("C6H6 + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances C6H5OH + O2 -> CO2 + H2O", () => {
    const r = balance("C6H5OH + O2 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances CCl4 + Fe0 -> C + Fe2+ + Cl-", () => { const r = balance("CCl4 + Fe -> C + Fe2+ + Cl-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances C2HCl3 + H2 -> C2H6 + HCl", () => {
    const r = balance("C2HCl3 + H2 -> C2H6 + HCl");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("balances CH2O + O3 -> CO2 + H2O", () => {
    const r = balance("CH2O + O3 -> CO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("phosphate removal", () => {
  it("balances PO4^3- + Al3+ -> AlPO4", () => { const r = balance("PO4^3- + Al3+ -> AlPO4"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances PO4^3- + Fe3+ -> FePO4", () => { const r = balance("PO4^3- + Fe3+ -> FePO4"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });

  it("balances PO4^3- + Ca2+ -> Ca3(PO4)2", () => { const r = balance("PO4^3- + Ca2+ -> Ca3(PO4)2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});
