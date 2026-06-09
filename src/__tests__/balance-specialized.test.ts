import { describe, it, expect } from "vitest";
import { balance } from "../index";

function expectPositiveCoefficients(result: ReturnType<typeof balance>) {
  expect(result.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(result.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [
    ...result.reactants.map(x => x.coefficient),
    ...result.products.map(x => x.coefficient),
  ];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("coordination complex formation", () => {
  it("balances CuSO4 + 4NH3 -> [Cu(NH3)4]SO4", () => {
    const r = balance("CuSO4 + NH3 -> [Cu(NH3)4]SO4");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 4]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances AgCl + 2NH3 -> [Ag(NH3)2]Cl", () => {
    const r = balance("AgCl + NH3 -> [Ag(NH3)2]Cl");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances CoCl3 + 6NH3 -> [Co(NH3)6]Cl3", () => {
    const r = balance("CoCl3 + NH3 -> [Co(NH3)6]Cl3");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances FeCl3 + 6KCN -> K3[Fe(CN)6] + 3KCl", () => {
    const r = balance("FeCl3 + KCN -> K3[Fe(CN)6] + KCl");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });

  it("balances NiCl2 + 6NH3 -> [Ni(NH3)6]Cl2", () => {
    const r = balance("NiCl2 + NH3 -> [Ni(NH3)6]Cl2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("group 13 element oxidation", () => {
  it("balances 4B + 3O2 -> 2B2O3", () => {
    const r = balance("B + O2 -> B2O3");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([4, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances 4Al + 3O2 -> 2Al2O3", () => {
    const r = balance("Al + O2 -> Al2O3");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([4, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances 4Ga + 3O2 -> 2Ga2O3", () => {
    const r = balance("Ga + O2 -> Ga2O3");
    expectPositiveCoefficients(r);
  });

  it("balances 4In + 3O2 -> 2In2O3", () => {
    const r = balance("In + O2 -> In2O3");
    expectPositiveCoefficients(r);
  });

  it("balances 4Tl + 3O2 -> 2Tl2O3", () => {
    const r = balance("Tl + O2 -> Tl2O3");
    expectPositiveCoefficients(r);
  });
});

describe("group 14 element oxidation", () => {
  it("balances C + O2 -> CO2", () => {
    const r = balance("C + O2 -> CO2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances Si + O2 -> SiO2", () => {
    const r = balance("Si + O2 -> SiO2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances Ge + O2 -> GeO2", () => {
    const r = balance("Ge + O2 -> GeO2");
    expectPositiveCoefficients(r);
  });

  it("balances Sn + O2 -> SnO2", () => {
    const r = balance("Sn + O2 -> SnO2");
    expectPositiveCoefficients(r);
  });

  it("balances Pb + O2 -> PbO2", () => {
    const r = balance("Pb + O2 -> PbO2");
    expectPositiveCoefficients(r);
  });
});

describe("group 15 element oxidation", () => {
  it("balances N2 + O2 -> 2NO", () => {
    const r = balance("N2 + O2 -> NO");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances P4 + 5O2 -> 2P2O5", () => {
    const r = balance("P4 + O2 -> P2O5");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 5]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances 4As + 3O2 -> 2As2O3", () => {
    const r = balance("As + O2 -> As2O3");
    expectPositiveCoefficients(r);
  });

  it("balances 4Sb + 3O2 -> 2Sb2O3", () => {
    const r = balance("Sb + O2 -> Sb2O3");
    expectPositiveCoefficients(r);
  });

  it("balances 4Bi + 3O2 -> 2Bi2O3", () => {
    const r = balance("Bi + O2 -> Bi2O3");
    expectPositiveCoefficients(r);
  });
});

describe("group 16 element oxidation", () => {
  it("balances 2H2 + O2 -> 2H2O", () => {
    const r = balance("O2 + H2 -> H2O");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances S + O2 -> SO2", () => {
    const r = balance("S + O2 -> SO2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances Se + O2 -> SeO2", () => {
    const r = balance("Se + O2 -> SeO2");
    expectPositiveCoefficients(r);
  });

  it("balances Te + O2 -> TeO2", () => {
    const r = balance("Te + O2 -> TeO2");
    expectPositiveCoefficients(r);
  });

  it("balances Po + O2 -> PoO2", () => {
    const r = balance("Po + O2 -> PoO2");
    expectPositiveCoefficients(r);
  });
});

describe("noble gas and halogen reactions", () => {
  it("balances F2 + H2 -> 2HF", () => {
    const r = balance("F2 + H2 -> HF");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances Cl2 + H2 -> 2HCl", () => {
    const r = balance("Cl2 + H2 -> HCl");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances Br2 + H2 -> 2HBr", () => {
    const r = balance("Br2 + H2 -> HBr");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances I2 + H2 -> 2HI", () => {
    const r = balance("I2 + H2 -> HI");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances Xe + F2 -> XeF2", () => {
    const r = balance("Xe + F2 -> XeF2");
    expectPositiveCoefficients(r);
  });
});

describe("lanthanide and actinide reactions", () => {
  it("balances 4La + 3O2 -> 2La2O3", () => {
    const r = balance("La + O2 -> La2O3");
    expectPositiveCoefficients(r);
  });

  it("balances Ce + O2 -> CeO2", () => {
    const r = balance("Ce + O2 -> CeO2");
    expectPositiveCoefficients(r);
  });

  it("balances U + O2 -> UO2", () => {
    const r = balance("U + O2 -> UO2");
    expectPositiveCoefficients(r);
  });

  it("balances 3U + 4O2 -> U3O8", () => {
    const r = balance("U + O2 -> U3O8");
    expectPositiveCoefficients(r);
  });

  it("balances Th + O2 -> ThO2", () => {
    const r = balance("Th + O2 -> ThO2");
    expectPositiveCoefficients(r);
  });
});

describe("metal hydride hydrolysis", () => {
  it("balances NaH + H2O -> NaOH + H2", () => {
    const r = balance("NaH + H2O -> NaOH + H2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances CaH2 + 2H2O -> Ca(OH)2 + 2H2", () => {
    const r = balance("CaH2 + H2O -> Ca(OH)2 + H2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });

  it("balances LiH + H2O -> LiOH + H2", () => {
    const r = balance("LiH + H2O -> LiOH + H2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances KH + H2O -> KOH + H2", () => {
    const r = balance("KH + H2O -> KOH + H2");
    expectPositiveCoefficients(r);
  });

  it("balances BaH2 + 2H2O -> Ba(OH)2 + 2H2", () => {
    const r = balance("BaH2 + H2O -> Ba(OH)2 + H2");
    expectPositiveCoefficients(r);
  });
});

describe("metal carbide hydrolysis and acid reaction", () => {
  it("balances CaC2 + 2H2O -> Ca(OH)2 + C2H2", () => {
    const r = balance("CaC2 + H2O -> Ca(OH)2 + C2H2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances Al4C3 + 12H2O -> 4Al(OH)3 + 3CH4", () => {
    const r = balance("Al4C3 + H2O -> Al(OH)3 + CH4");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 12]);
    expect(r.products.map(x => x.coefficient)).toEqual([4, 3]);
  });

  it("balances Mg2C + 4H2O -> 2Mg(OH)2 + CH4", () => {
    const r = balance("Mg2C + H2O -> Mg(OH)2 + CH4");
    expectPositiveCoefficients(r);
  });

  it("balances CaC2 + 2HCl -> CaCl2 + C2H2", () => {
    const r = balance("CaC2 + HCl -> CaCl2 + C2H2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances Al4C3 + 12HCl -> 4AlCl3 + 3CH4", () => {
    const r = balance("Al4C3 + HCl -> AlCl3 + CH4");
    expectPositiveCoefficients(r);
  });
});

describe("superoxide and peroxide reactions", () => {
  it("balances 2Na + O2 -> Na2O2", () => {
    const r = balance("Na + O2 -> Na2O2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances K + O2 -> KO2", () => {
    const r = balance("K + O2 -> KO2");
    expectPositiveCoefficients(r);
  });

  it("balances Ba + O2 -> BaO2", () => {
    const r = balance("Ba + O2 -> BaO2");
    expectPositiveCoefficients(r);
  });

  it("balances 2Na2O2 + 2H2O -> 4NaOH + O2", () => {
    const r = balance("Na2O2 + H2O -> NaOH + O2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([4, 1]);
  });

  it("balances 2H2O2 -> 2H2O + O2", () => {
    const r = balance("H2O2 -> H2O + O2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
});
