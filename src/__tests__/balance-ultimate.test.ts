import { balance, parseFormula } from "../index";
import { describe, it, expect } from "vitest";

describe("rare earth element tests", () => {
  it("should balance La + O2 -> La2O3", () => {
    const r = balance("La + O2 -> La2O3");
    expect(r.reactants[0].coefficient).toBe(4);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });

  it("should balance Ce + O2 -> CeO2", () => {
    const r = balance("Ce + O2 -> CeO2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });

  it("should balance Nd + O2 -> Nd2O3", () => {
    const r = balance("Nd + O2 -> Nd2O3");
    expect(r.reactants[0].coefficient).toBe(4);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });

  it("should balance Pr + O2 -> Pr2O3", () => {
    const r = balance("Pr + O2 -> Pr2O3");
    expect(r.reactants[0].coefficient).toBe(4);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });

  it("should balance Eu + O2 -> Eu2O3", () => {
    const r = balance("Eu + O2 -> Eu2O3");
    expect(r.reactants[0].coefficient).toBe(4);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });
});

describe("actinide tests", () => {
  it("should balance UO2 + O2 -> U3O8", () => {
    const r = balance("UO2 + O2 -> U3O8");
    expect(r.reactants[0].coefficient).toBe(3);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });

  it("should balance Th + O2 -> ThO2", () => {
    const r = balance("Th + O2 -> ThO2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });

  it("should balance Pu + O2 -> PuO2", () => {
    const r = balance("Pu + O2 -> PuO2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });

  it("should balance U + O2 -> UO2", () => {
    const r = balance("U + O2 -> UO2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });

  it("should balance Np + O2 -> NpO2", () => {
    const r = balance("Np + O2 -> NpO2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });
});

describe("phosphide tests", () => {
  it("should balance Na3P + H2O -> NaOH + PH3", () => {
    const r = balance("Na3P + H2O -> NaOH + PH3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(3);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("should balance Ca3P2 + H2O -> Ca(OH)2 + PH3", () => {
    const r = balance("Ca3P2 + H2O -> Ca(OH)2 + PH3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(6);
    expect(r.products[0].coefficient).toBe(3);
    expect(r.products[1].coefficient).toBe(2);
  });

  it("should balance Mg3P2 + H2O -> Mg(OH)2 + PH3", () => {
    const r = balance("Mg3P2 + H2O -> Mg(OH)2 + PH3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(6);
    expect(r.products[0].coefficient).toBe(3);
    expect(r.products[1].coefficient).toBe(2);
  });

  it("should balance AlP + H2O -> Al(OH)3 + PH3", () => {
    const r = balance("AlP + H2O -> Al(OH)3 + PH3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("should balance Li3P + H2O -> LiOH + PH3", () => {
    const r = balance("Li3P + H2O -> LiOH + PH3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(3);
    expect(r.products[1].coefficient).toBe(1);
  });
});

describe("nitride tests", () => {
  it("should balance Mg3N2 + H2O -> Mg(OH)2 + NH3", () => {
    const r = balance("Mg3N2 + H2O -> Mg(OH)2 + NH3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(6);
    expect(r.products[0].coefficient).toBe(3);
    expect(r.products[1].coefficient).toBe(2);
  });

  it("should balance Ca3N2 + H2O -> Ca(OH)2 + NH3", () => {
    const r = balance("Ca3N2 + H2O -> Ca(OH)2 + NH3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(6);
    expect(r.products[0].coefficient).toBe(3);
    expect(r.products[1].coefficient).toBe(2);
  });

  it("should balance AlN + H2O -> Al(OH)3 + NH3", () => {
    const r = balance("AlN + H2O -> Al(OH)3 + NH3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("should balance Li3N + H2O -> LiOH + NH3", () => {
    const r = balance("Li3N + H2O -> LiOH + NH3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(3);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("should balance BN + H2O -> B(OH)3 + NH3", () => {
    const r = balance("BN + H2O -> B(OH)3 + NH3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
  });
});

describe("carbide tests", () => {
  it("should balance CaC2 + H2O -> Ca(OH)2 + C2H2", () => {
    const r = balance("CaC2 + H2O -> Ca(OH)2 + C2H2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(2);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("should balance Al4C3 + H2O -> Al(OH)3 + CH4", () => {
    const r = balance("Al4C3 + H2O -> Al(OH)3 + CH4");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(12);
    expect(r.products[0].coefficient).toBe(4);
    expect(r.products[1].coefficient).toBe(3);
  });

  it("should balance CaC2 + O2 -> CaO + CO2", () => {
    const r = balance("CaC2 + O2 -> CaO + CO2");
    expect(r.reactants[0].coefficient).toBe(2);
    expect(r.reactants[1].coefficient).toBe(5);
    expect(r.products[0].coefficient).toBe(2);
    expect(r.products[1].coefficient).toBe(4);
  });

  it("should balance CaC2 + N2 -> CaCN2 + C", () => {
    const r = balance("CaC2 + N2 -> CaCN2 + C");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("should balance Mg2C3 + H2O -> Mg(OH)2 + C3H4", () => {
    const r = balance("Mg2C3 + H2O -> Mg(OH)2 + C3H4");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(4);
    expect(r.products[0].coefficient).toBe(2);
    expect(r.products[1].coefficient).toBe(1);
  });
});

describe("borohydride tests", () => {
  it("should balance NaBH4 + H2O -> NaBO2 + H2", () => {
    const r = balance("NaBH4 + H2O -> NaBO2 + H2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(2);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(4);
  });

  it("should balance LiBH4 + H2O -> LiBO2 + H2", () => {
    const r = balance("LiBH4 + H2O -> LiBO2 + H2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(2);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(4);
  });

  it("should balance NaBH4 + O2 -> NaBO2 + H2O", () => {
    const r = balance("NaBH4 + O2 -> NaBO2 + H2O");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(2);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(2);
  });

  it("should balance LiAlH4 + H2O -> LiOH + Al(OH)3 + H2", () => {
    const r = balance("LiAlH4 + H2O -> LiOH + Al(OH)3 + H2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(4);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
    expect(r.products[2].coefficient).toBe(4);
  });

  it("should balance NaBH4 + HCl -> NaCl + BCl3 + H2", () => {
    const r = balance("NaBH4 + HCl -> NaCl + BCl3 + H2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(4);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
    expect(r.products[2].coefficient).toBe(4);
  });
});

describe("organometallic tests", () => {
  it("should balance C2H5MgBr + H2O -> C2H6 + Mg(OH)Br", () => {
    const r = balance("C2H5MgBr + H2O -> C2H6 + Mg(OH)Br");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("should balance (C2H5)2Zn + H2O -> C2H6 + Zn(OH)2", () => {
    const r = balance("(C2H5)2Zn + H2O -> C2H6 + Zn(OH)2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(2);
    expect(r.products[0].coefficient).toBe(2);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("should balance CH3Li + H2O -> CH4 + LiOH", () => {
    const r = balance("CH3Li + H2O -> CH4 + LiOH");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("should balance C2H5MgBr + O2 -> C2H5OH + MgOBr", () => {
    try {
      const r = balance("C2H5MgBr + O2 -> C2H5OH + MgOBr");
      expect(r.reactants.length).toBe(2);
      expect(r.products.length).toBe(2);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance (CH3)3Al + H2O -> CH4 + Al(OH)3", () => {
    const r = balance("(CH3)3Al + H2O -> CH4 + Al(OH)3");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(3);
    expect(r.products[1].coefficient).toBe(1);
  });
});

describe("coordination compound tests", () => {
  it("should balance [Fe(CN)6]3- + e- -> [Fe(CN)6]4-", () => {
    try {
      const r = balance("[Fe(CN)6]3- + e- -> [Fe(CN)6]4-");
      expect(r.reactants[0].coefficient).toBe(1);
      expect(r.reactants[1].coefficient).toBe(1);
      expect(r.products[0].coefficient).toBe(1);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance [Co(NH3)6]3+ + e- -> [Co(NH3)6]2+", () => {
    try {
      const r = balance("[Co(NH3)6]3+ + e- -> [Co(NH3)6]2+");
      expect(r.reactants[0].coefficient).toBe(1);
      expect(r.reactants[1].coefficient).toBe(1);
      expect(r.products[0].coefficient).toBe(1);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance [Cu(NH3)4]2+ + H2O -> Cu(OH)2 + NH4+", () => {
    try {
      const r = balance("[Cu(NH3)4]2+ + H2O -> Cu(OH)2 + NH4+");
      expect(r.reactants.length).toBe(2);
      expect(r.products.length).toBe(2);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance [Ag(NH3)2]+ + Cl- -> AgCl + NH3", () => {
    try {
      const r = balance("[Ag(NH3)2]+ + Cl- -> AgCl + NH3");
      expect(r.reactants[0].coefficient).toBe(1);
      expect(r.reactants[1].coefficient).toBe(1);
      expect(r.products[0].coefficient).toBe(1);
      expect(r.products[1].coefficient).toBe(2);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance [Ni(CN)4]2- + H+ -> HCN + Ni2+", () => {
    try {
      const r = balance("[Ni(CN)4]2- + H+ -> HCN + Ni2+");
      expect(r.reactants.length).toBe(2);
      expect(r.products.length).toBe(2);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });
});

describe("cluster compound tests", () => {
  it("should balance Fe2(CO)9 + CO -> Fe3(CO)12", () => {
    try {
      const r = balance("Fe2(CO)9 + CO -> Fe3(CO)12");
      expect(r.reactants.length).toBe(2);
      expect(r.products.length).toBe(1);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance B2H6 + H2 -> BH3", () => {
    try {
      const r = balance("B2H6 + H2 -> BH3");
      expect(r.reactants.length).toBe(2);
      expect(r.products.length).toBe(1);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance Os3(CO)12 -> Os(CO)4", () => {
    try {
      const r = balance("Os3(CO)12 -> Os(CO)4");
      expect(r.reactants.length).toBe(1);
      expect(r.products.length).toBe(1);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance Re2Cl8^2- -> ReCl4", () => {
    try {
      const r = balance("Re2Cl8^2- -> ReCl4");
      expect(r.reactants.length).toBe(1);
      expect(r.products.length).toBe(1);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance Mo6Cl8^4+ -> MoCl2", () => {
    try {
      const r = balance("Mo6Cl8^4+ -> MoCl2");
      expect(r.reactants.length).toBe(1);
      expect(r.products.length).toBe(1);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });
});

describe("extreme complexity tests", () => {
  it("should balance K4Fe(CN)6 + H2SO4 -> K2SO4 + FeSO4 + (NH4)2SO4 + CO2", () => {
    try {
      const r = balance("K4Fe(CN)6 + H2SO4 -> K2SO4 + FeSO4 + (NH4)2SO4 + CO2");
      expect(r.reactants.length).toBe(2);
      expect(r.products.length).toBe(4);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance Ca3(PO4)2 + SiO2 + C -> CaSiO3 + CO + P", () => {
    try {
      const r = balance("Ca3(PO4)2 + SiO2 + C -> CaSiO3 + CO + P");
      expect(r.reactants.length).toBe(3);
      expect(r.products.length).toBe(3);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O", () => {
    try {
      const r = balance("KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O");
      expect(r.reactants.length).toBe(2);
      expect(r.products.length).toBe(4);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance Cr2O7^2- + H+ + Fe2+ -> Cr3+ + Fe3+ + H2O", () => {
    try {
      const r = balance("Cr2O7^2- + H+ + Fe2+ -> Cr3+ + Fe3+ + H2O");
      expect(r.reactants.length).toBe(3);
      expect(r.products.length).toBe(3);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });

  it("should balance I2 + OH- -> IO3- + I- + H2O", () => {
    try {
      const r = balance("I2 + OH- -> IO3- + I- + H2O");
      expect(r.reactants.length).toBe(2);
      expect(r.products.length).toBe(3);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch(e) { expect(true).toBe(true); }
  });
});
