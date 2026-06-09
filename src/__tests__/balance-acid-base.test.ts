import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("strong acid-base neutralization", () => {
  it("balances HCl + NaOH -> NaCl + H2O", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HBr + KOH -> KBr + H2O", () => {
    const r = balance("HBr + KOH -> KBr + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HI + NaOH -> NaI + H2O", () => {
    const r = balance("HI + NaOH -> NaI + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HNO3 + KOH -> KNO3 + H2O", () => {
    const r = balance("HNO3 + KOH -> KNO3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HClO4 + NaOH -> NaClO4 + H2O", () => {
    const r = balance("HClO4 + NaOH -> NaClO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances H2SO4 + 2KOH -> K2SO4 + 2H2O", () => {
    const r = balance("H2SO4 + KOH -> K2SO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
});

describe("weak acid-base neutralization", () => {
  it("balances CH3COOH + NaOH -> CH3COONa + H2O", () => {
    const r = balance("CH3COOH + NaOH -> CH3COONa + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances HCN + NaOH -> NaCN + H2O", () => {
    const r = balance("HCN + NaOH -> NaCN + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances HF + NaOH -> NaF + H2O", () => {
    const r = balance("HF + NaOH -> NaF + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H2S + 2NaOH -> Na2S + 2H2O", () => {
    const r = balance("H2S + NaOH -> Na2S + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H3PO4 + 3NaOH -> Na3PO4 + 3H2O", () => {
    const r = balance("H3PO4 + NaOH -> Na3PO4 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances NH3 + HCl -> NH4Cl", () => {
    const r = balance("NH3 + HCl -> NH4Cl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("polyprotic acid neutralization", () => {
  it("balances H2SO4 + 2NaOH -> Na2SO4 + 2H2O", () => {
    const r = balance("H2SO4 + NaOH -> Na2SO4 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H2SO4 + NaOH -> NaHSO4 + H2O", () => {
    const r = balance("H2SO4 + NaOH -> NaHSO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances H3PO4 + NaOH -> NaH2PO4 + H2O", () => {
    const r = balance("H3PO4 + NaOH -> NaH2PO4 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H2CO3 + NaOH -> NaHCO3 + H2O", () => {
    const r = balance("H2CO3 + NaOH -> NaHCO3 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H2CO3 + 2NaOH -> Na2CO3 + 2H2O", () => {
    const r = balance("H2CO3 + NaOH -> Na2CO3 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances H3PO4 + 2NaOH -> Na2HPO4 + 2H2O", () => {
    const r = balance("H3PO4 + NaOH -> Na2HPO4 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("metal carbonate acid reactions", () => {
  it("balances Na2CO3 + 2HCl -> 2NaCl + H2O + CO2", () => {
    const r = balance("Na2CO3 + HCl -> NaCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1, 1]);
  });
  it("balances K2CO3 + 2HCl -> 2KCl + H2O + CO2", () => {
    const r = balance("K2CO3 + HCl -> KCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1, 1]);
  });
  it("balances CaCO3 + 2HCl -> CaCl2 + H2O + CO2", () => {
    const r = balance("CaCO3 + HCl -> CaCl2 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances MgCO3 + 2HCl -> MgCl2 + H2O + CO2", () => {
    const r = balance("MgCO3 + HCl -> MgCl2 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances NaHCO3 + HCl -> NaCl + H2O + CO2", () => {
    const r = balance("NaHCO3 + HCl -> NaCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances KHCO3 + HCl -> KCl + H2O + CO2", () => {
    const r = balance("KHCO3 + HCl -> KCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
});

describe("metal sulfide and sulfite acid reactions", () => {
  it("balances Na2S + 2HCl -> 2NaCl + H2S", () => {
    const r = balance("Na2S + HCl -> NaCl + H2S");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances K2S + 2HCl -> 2KCl + H2S", () => {
    const r = balance("K2S + HCl -> KCl + H2S");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances Na2SO3 + 2HCl -> 2NaCl + H2O + SO2", () => {
    const r = balance("Na2SO3 + HCl -> NaCl + H2O + SO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1, 1]);
  });
  it("balances FeS + 2HCl -> FeCl2 + H2S", () => {
    const r = balance("FeS + HCl -> FeCl2 + H2S");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances ZnS + 2HCl -> ZnCl2 + H2S", () => {
    const r = balance("ZnS + HCl -> ZnCl2 + H2S");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("amphoteric hydroxide reactions", () => {
  it("balances Al(OH)3 + 3HCl -> AlCl3 + 3H2O", () => {
    const r = balance("Al(OH)3 + HCl -> AlCl3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
  it("balances Al(OH)3 + NaOH -> NaAlO2 + 2H2O", () => {
    const r = balance("Al(OH)3 + NaOH -> NaAlO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Zn(OH)2 + 2HCl -> ZnCl2 + 2H2O", () => {
    const r = balance("Zn(OH)2 + HCl -> ZnCl2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances Zn(OH)2 + 2NaOH -> Na2ZnO2 + 2H2O", () => {
    const r = balance("Zn(OH)2 + NaOH -> Na2ZnO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Sn(OH)2 + 2HCl -> SnCl2 + 2H2O", () => {
    const r = balance("Sn(OH)2 + HCl -> SnCl2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Pb(OH)2 + 2NaOH -> Na2PbO2 + 2H2O", () => {
    const r = balance("Pb(OH)2 + NaOH -> Na2PbO2 + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("oxide acid-base reactions", () => {
  it("balances CaO + H2O -> Ca(OH)2", () => {
    const r = balance("CaO + H2O -> Ca(OH)2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Na2O + H2O -> 2NaOH", () => {
    const r = balance("Na2O + H2O -> NaOH");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances SO3 + H2O -> H2SO4", () => {
    const r = balance("SO3 + H2O -> H2SO4");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances CO2 + H2O -> H2CO3", () => {
    const r = balance("CO2 + H2O -> H2CO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances N2O5 + H2O -> 2HNO3", () => {
    const r = balance("N2O5 + H2O -> HNO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances P2O5 + 3H2O -> 2H3PO4", () => {
    const r = balance("P2O5 + H2O -> H3PO4");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("bicarbonate and carbonate decomposition", () => {
  it("balances 2NaHCO3 -> Na2CO3 + H2O + CO2", () => {
    const r = balance("NaHCO3 -> Na2CO3 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances Ca(HCO3)2 -> CaCO3 + H2O + CO2", () => {
    const r = balance("Ca(HCO3)2 -> CaCO3 + H2O + CO2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances Mg(HCO3)2 -> MgCO3 + H2O + CO2", () => {
    const r = balance("Mg(HCO3)2 -> MgCO3 + H2O + CO2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
  it("balances 2KHCO3 -> K2CO3 + H2O + CO2", () => {
    const r = balance("KHCO3 -> K2CO3 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances 2NaHCO3 + heat -> Na2CO3 + H2O + CO2", () => {
    const r = balance("NaHCO3 -> Na2CO3 + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
  it("balances NaHCO3 + HCl -> NaCl + H2O + CO2", () => {
    const r = balance("NaHCO3 + HCl -> NaCl + H2O + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
});
