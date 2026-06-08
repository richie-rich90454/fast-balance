import { describe, it, expect } from "vitest";
import { balance } from "../index";

function expectPositiveIntegers(result: ReturnType<typeof balance>) {
  expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
  expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("metal displacement reactions", () => {
  it("balances Zn + CuSO4 -> ZnSO4 + Cu", () => {
    const result = balance("Zn + CuSO4 -> ZnSO4 + Cu");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Fe + CuSO4 -> FeSO4 + Cu", () => {
    const result = balance("Fe + CuSO4 -> FeSO4 + Cu");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Zn + AgNO3 -> Zn(NO3)2 + Ag", () => {
    const result = balance("Zn + AgNO3 -> Zn(NO3)2 + Ag");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances Mg + CuSO4 -> MgSO4 + Cu", () => {
    const result = balance("Mg + CuSO4 -> MgSO4 + Cu");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Al + FeCl3 -> AlCl3 + Fe", () => {
    const result = balance("Al + FeCl3 -> AlCl3 + Fe");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Fe + Ni(NO3)2 -> Fe(NO3)2 + Ni", () => {
    const result = balance("Fe + Ni(NO3)2 -> Fe(NO3)2 + Ni");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Zn + Pb(NO3)2 -> Zn(NO3)2 + Pb", () => {
    const result = balance("Zn + Pb(NO3)2 -> Zn(NO3)2 + Pb");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Cu + AgNO3 -> Cu(NO3)2 + Ag", () => {
    const result = balance("Cu + AgNO3 -> Cu(NO3)2 + Ag");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });
});

describe("acid-metal reactions", () => {
  it("balances Zn + HCl -> ZnCl2 + H2", () => {
    const result = balance("Zn + HCl -> ZnCl2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Mg + HCl -> MgCl2 + H2", () => {
    const result = balance("Mg + HCl -> MgCl2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Fe + HCl -> FeCl2 + H2", () => {
    const result = balance("Fe + HCl -> FeCl2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Al + HCl -> AlCl3 + H2 (positive check)", () => {
    const result = balance("Al + HCl -> AlCl3 + H2");
    expectPositiveIntegers(result);
  });

  it("balances Zn + H2SO4 -> ZnSO4 + H2", () => {
    const result = balance("Zn + H2SO4 -> ZnSO4 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Mg + H2SO4 -> MgSO4 + H2", () => {
    const result = balance("Mg + H2SO4 -> MgSO4 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Fe + H2SO4 -> FeSO4 + H2", () => {
    const result = balance("Fe + H2SO4 -> FeSO4 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances 2Al + 6HCl -> 2AlCl3 + 3H2", () => {
    const result = balance("Al + HCl -> AlCl3 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 6]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 3]);
  });
});

describe("precipitation reactions", () => {
  it("balances AgNO3 + NaCl -> AgCl + NaNO3", () => {
    const result = balance("AgNO3 + NaCl -> AgCl + NaNO3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances BaCl2 + Na2SO4 -> BaSO4 + NaCl", () => {
    const result = balance("BaCl2 + Na2SO4 -> BaSO4 + NaCl");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances Pb(NO3)2 + KI -> PbI2 + KNO3", () => {
    const result = balance("Pb(NO3)2 + KI -> PbI2 + KNO3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances AgNO3 + KCl -> AgCl + KNO3", () => {
    const result = balance("AgNO3 + KCl -> AgCl + KNO3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Ba(NO3)2 + Na2SO4 -> BaSO4 + NaNO3", () => {
    const result = balance("Ba(NO3)2 + Na2SO4 -> BaSO4 + NaNO3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances Pb(NO3)2 + K2CrO4 -> PbCrO4 + KNO3", () => {
    const result = balance("Pb(NO3)2 + K2CrO4 -> PbCrO4 + KNO3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances Hg2(NO3)2 + NaCl -> Hg2Cl2 + NaNO3", () => {
    const result = balance("Hg2(NO3)2 + NaCl -> Hg2Cl2 + NaNO3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances CaCl2 + Na2CO3 -> CaCO3 + NaCl", () => {
    const result = balance("CaCl2 + Na2CO3 -> CaCO3 + NaCl");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });
});

describe("acid-base neutralization reactions", () => {
  it("balances HCl + NaOH -> NaCl + H2O", () => {
    const result = balance("HCl + NaOH -> NaCl + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances H2SO4 + NaOH -> Na2SO4 + H2O", () => {
    const result = balance("H2SO4 + NaOH -> Na2SO4 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances HNO3 + KOH -> KNO3 + H2O", () => {
    const result = balance("HNO3 + KOH -> KNO3 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances H2SO4 + KOH -> K2SO4 + H2O (positive check)", () => {
    const result = balance("H2SO4 + KOH -> K2SO4 + H2O");
    expectPositiveIntegers(result);
  });

  it("balances H3PO4 + NaOH -> Na3PO4 + H2O (positive check)", () => {
    const result = balance("H3PO4 + NaOH -> Na3PO4 + H2O");
    expectPositiveIntegers(result);
  });

  it("balances HCl + Ca(OH)2 -> CaCl2 + H2O", () => {
    const result = balance("HCl + Ca(OH)2 -> CaCl2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances H2SO4 + Ca(OH)2 -> CaSO4 + H2O", () => {
    const result = balance("H2SO4 + Ca(OH)2 -> CaSO4 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances HNO3 + Ba(OH)2 -> Ba(NO3)2 + H2O", () => {
    const result = balance("HNO3 + Ba(OH)2 -> Ba(NO3)2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });
});

describe("ionic compound formation", () => {
  it("balances Na+ + Cl- -> NaCl", () => {
    const result = balance("Na+ + Cl- -> NaCl");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances K+ + Br- -> KBr", () => {
    const result = balance("K+ + Br- -> KBr");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Ca2+ + Cl- -> CaCl2", () => {
    const result = balance("Ca2+ + Cl- -> CaCl2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Al3+ + Cl- -> AlCl3", () => {
    const result = balance("Al3+ + Cl- -> AlCl3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Mg2+ + NO3- -> Mg(NO3)2", () => {
    const result = balance("Mg2+ + NO3- -> Mg(NO3)2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Na+ + SO4^2- -> Na2SO4", () => {
    const result = balance("Na+ + SO4^2- -> Na2SO4");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Na+ + PO4^3- -> Na3PO4", () => {
    const result = balance("Na+ + PO4^3- -> Na3PO4");
    expect(result.reactants.map(r => r.coefficient)).toEqual([3, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances K+ + CO3^2- -> K2CO3", () => {
    const result = balance("K+ + CO3^2- -> K2CO3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });
});

describe("redox single replacement", () => {
  it("balances Cu + AgNO3 -> Cu(NO3)2 + Ag", () => {
    const result = balance("Cu + AgNO3 -> Cu(NO3)2 + Ag");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances Zn + Cu(NO3)2 -> Zn(NO3)2 + Cu", () => {
    const result = balance("Zn + Cu(NO3)2 -> Zn(NO3)2 + Cu");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Fe + Cu(NO3)2 -> Fe(NO3)2 + Cu", () => {
    const result = balance("Fe + Cu(NO3)2 -> Fe(NO3)2 + Cu");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Mg + Zn(NO3)2 -> Mg(NO3)2 + Zn", () => {
    const result = balance("Mg + Zn(NO3)2 -> Mg(NO3)2 + Zn");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Al + AgNO3 -> Al(NO3)3 + Ag", () => {
    const result = balance("Al + AgNO3 -> Al(NO3)3 + Ag");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 3]);
  });

  it("balances Cl2 + KBr -> KCl + Br2", () => {
    const result = balance("Cl2 + KBr -> KCl + Br2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
  });

  it("balances Cl2 + KI -> KCl + I2", () => {
    const result = balance("Cl2 + KI -> KCl + I2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
  });

  it("balances Br2 + KI -> KBr + I2", () => {
    const result = balance("Br2 + KI -> KBr + I2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
  });
});

describe("complex ionic equations", () => {
  it("balances [Fe(CN)6]4- + K+ -> K4[Fe(CN)6]", () => {
    const result = balance("[Fe(CN)6]4- + K+ -> K4[Fe(CN)6]");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 4]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances [Cu(NH3)4]2+ + Cl- -> [Cu(NH3)4]Cl2", () => {
    const result = balance("[Cu(NH3)4]2+ + Cl- -> [Cu(NH3)4]Cl2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances [Ag(NH3)2]+ + Cl- -> [Ag(NH3)2]Cl", () => {
    const result = balance("[Ag(NH3)2]+ + Cl- -> [Ag(NH3)2]Cl");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances [Co(NH3)6]3+ + Cl- -> [Co(NH3)6]Cl3", () => {
    const result = balance("[Co(NH3)6]3+ + Cl- -> [Co(NH3)6]Cl3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Fe3+ + OH- -> Fe(OH)3", () => {
    const result = balance("Fe3+ + OH- -> Fe(OH)3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Al3+ + OH- -> Al(OH)3", () => {
    const result = balance("Al3+ + OH- -> Al(OH)3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Fe3+ + SO4^2- -> Fe2(SO4)3", () => {
    const result = balance("Fe3+ + SO4^2- -> Fe2(SO4)3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Cu2+ + Cl- -> CuCl2", () => {
    const result = balance("Cu2+ + Cl- -> CuCl2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });
});
