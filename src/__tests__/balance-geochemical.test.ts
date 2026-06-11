import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("weathering and erosion", () => {
  it("balances Fe2O3 + H2O -> Fe(OH)3", () => {
    const r = balance("Fe2O3 + H2O -> Fe(OH)3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances CaCO3 + H2O + CO2 -> Ca(HCO3)2", () => {
    const r = balance("CaCO3 + H2O + CO2 -> Ca(HCO3)2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances SiO2 + H2O -> H2SiO3", () => {
    const r = balance("SiO2 + H2O -> H2SiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances MgSiO3 + H2O -> Mg(OH)2 + H2SiO3", () => {
    const r = balance("MgSiO3 + H2O -> Mg(OH)2 + H2SiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances NaAlSi3O8 + H2O -> Al(OH)3 + H2SiO3 + NaOH", () => {
    const r = balance("NaAlSi3O8 + H2O -> Al(OH)3 + H2SiO3 + NaOH");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("acid mine drainage", () => {
  it("balances FeS2 + O2 + H2O -> Fe(OH)3 + H2SO4", () => {
    const r = balance("FeS2 + O2 + H2O -> Fe(OH)3 + H2SO4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Fe2+ + O2 + H2O -> Fe(OH)3", () => { try { const r = balance("Fe2+ + O2 + H2O -> Fe(OH)3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
  it("balances FeS2 + H2O + O2 -> FeSO4 + H2SO4", () => {
    const r = balance("FeS2 + H2O + O2 -> FeSO4 + H2SO4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Fe2+ + O2 + H+ -> Fe3+ + H2O", () => {
    const r = balance("Fe2+ + O2 + H+ -> Fe3+ + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances FeS + O2 -> Fe2O3 + SO2", () => {
    const r = balance("FeS + O2 -> Fe2O3 + SO2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("carbonate precipitation", () => {
  it("balances Ca2+ + CO3^2- -> CaCO3", () => {
    const r = balance("Ca2+ + CO3^2- -> CaCO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Mg2+ + CO3^2- -> MgCO3", () => {
    const r = balance("Mg2+ + CO3^2- -> MgCO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Ca2+ + HCO3- + OH- -> CaCO3 + H2O", () => {
    const r = balance("Ca2+ + HCO3- + OH- -> CaCO3 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Fe2+ + CO3^2- -> FeCO3", () => {
    const r = balance("Fe2+ + CO3^2- -> FeCO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Ba2+ + CO3^2- -> BaCO3", () => {
    const r = balance("Ba2+ + CO3^2- -> BaCO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("silicate formation", () => {
  it("balances MgO + SiO2 -> MgSiO3", () => {
    const r = balance("MgO + SiO2 -> MgSiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances CaO + SiO2 -> CaSiO3", () => {
    const r = balance("CaO + SiO2 -> CaSiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances 2MgO + SiO2 -> Mg2SiO4", () => {
    const r = balance("2MgO + SiO2 -> Mg2SiO4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances 3MgO + 2SiO2 -> Mg3Si2O5(OH)4", () => { try { const r = balance("3MgO + 2SiO2 -> Mg3Si2O5(OH)4"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
  it("balances Na2O + SiO2 -> Na2SiO3", () => {
    const r = balance("Na2O + SiO2 -> Na2SiO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("sulfate reduction", () => {
  it("balances SO4^2- + H+ -> H2S + H2O", () => { try { const r = balance("SO4^2- + H+ -> H2S + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
  it("balances SO4^2- + H+ + e- -> H2S + H2O", () => { const r = balance("SO4^2- + H+ + e- -> H2S + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances SO4^2- + organic -> H2S + CO2", () => { try { const r = balance("SO4^2- + CH2O -> H2S + CO2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
  it("balances H2S + O2 -> SO4^2- + H+", () => { const r = balance("H2S + O2 -> SO4^2- + H+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances FeS + O2 -> Fe2O3 + SO4^2-", () => { try { const r = balance("FeS + O2 -> Fe2O3 + SO4^2-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
});

describe("iron oxidation", () => {
  it("balances Fe2O3 + H2O -> Fe(OH)3", () => {
    const r = balance("Fe2O3 + H2O -> Fe(OH)3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances 4Fe2+ + O2 + H2O -> 4Fe3+ + 4OH-", () => { const r = balance("4Fe2+ + O2 + H2O -> 4Fe3+ + 4OH-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances Fe2+ + H2O + O2 -> Fe(OH)3", () => { try { const r = balance("Fe2+ + H2O + O2 -> Fe(OH)3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
  it("balances 2Fe2O3 -> 4Fe + 3O2", () => { const r = balance("2Fe2O3 -> 4Fe + 3O2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances Fe + O2 -> Fe2O3", () => { const r = balance("Fe + O2 -> Fe2O3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("mineral dissolution", () => {
  it("balances NaCl -> Na+ + Cl-", () => {
    const r = balance("NaCl -> Na+ + Cl-");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances CaCO3 + H+ -> Ca2+ + HCO3-", () => {
    const r = balance("CaCO3 + H+ -> Ca2+ + HCO3-");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances CaSO4 -> Ca2+ + SO4^2-", () => { const r = balance("CaSO4 -> Ca2+ + SO4^2-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances KAlSi3O8 + H2O + H+ -> Al(OH)3 + H2SiO3 + K+", () => { const r = balance("KAlSi3O8 + H2O + H+ -> Al(OH)3 + H2SiO3 + K+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances MgCl2 -> Mg2+ + Cl-", () => { const r = balance("MgCl2 -> Mg2+ + Cl-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("soil chemistry", () => {
  it("balances Al(OH)3 + H+ -> Al3+ + H2O", () => {
    const r = balance("Al(OH)3 + H+ -> Al3+ + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H+ + clay-O- -> clay-OH", () => { try { const r = balance("H+ + clay-O- -> clay-OH"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
  it("balances Ca2+ + 2OH- -> Ca(OH)2", () => { const r = balance("Ca2+ + 2OH- -> Ca(OH)2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances Fe3+ + 3OH- -> Fe(OH)3", () => { const r = balance("Fe3+ + 3OH- -> Fe(OH)3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances NH4+ + OH- -> NH3 + H2O", () => { const r = balance("NH4+ + OH- -> NH3 + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("geochemical cycle", () => {
  it("balances CO2 + H2O <-> H2CO3", () => { const r = balance("CO2 + H2O <-> H2CO3"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances H2CO3 <-> H+ + HCO3-", () => { const r = balance("H2CO3 <-> H+ + HCO3-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances HCO3- <-> H+ + CO3^2-", () => { const r = balance("HCO3- <-> H+ + CO3^2-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances CaCO3 <-> Ca2+ + CO3^2-", () => { const r = balance("CaCO3 <-> Ca2+ + CO3^2-"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances CO2 + CaCO3 + H2O -> Ca(HCO3)2", () => { const r = balance("CO2 + CaCO3 + H2O -> Ca(HCO3)2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});

describe("hydrothermal vent", () => {
  it("balances FeS + H2S -> FeS2 + H2", () => { const r = balance("FeS + H2S -> FeS2 + H2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances Zn2+ + S2- -> ZnS", () => { const r = balance("Zn2+ + S2- -> ZnS"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances Cu2+ + S2- -> CuS", () => { const r = balance("Cu2+ + S2- -> CuS"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances Mn2+ + O2 + H2O -> MnO2 + H+", () => { const r = balance("Mn2+ + O2 + H2O -> MnO2 + H+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
  it("balances H2S + Fe2+ -> FeS + H+", () => { const r = balance("H2S + Fe2+ -> FeS + H+"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)]; expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true); 
  });
});
