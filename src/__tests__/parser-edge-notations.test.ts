import { describe, it, expect } from "vitest";
import { parseFormula } from "../index";

describe("unusual charge notations", () => {
  it("SO4^2- has charge=-2", () => {
    const r = parseFormula("SO4^2-");
    expect(r.elements.S).toBe(1);
    expect(r.elements.O).toBe(4);
    expect(r.charge).toBe(-2);
  });
  it("Fe^3+ has charge=+3", () => {
    const r = parseFormula("Fe^3+");
    expect(r.elements.Fe).toBe(1);
    expect(r.charge).toBe(3);
  });
  it("Al^3+ has charge=+3", () => {
    const r = parseFormula("Al^3+");
    expect(r.elements.Al).toBe(1);
    expect(r.charge).toBe(3);
  });
  it("PO4^3- has charge=-3", () => {
    const r = parseFormula("PO4^3-");
    expect(r.elements.P).toBe(1);
    expect(r.elements.O).toBe(4);
    expect(r.charge).toBe(-3);
  });
  it("Cr2O7^2- has charge=-2", () => {
    const r = parseFormula("Cr2O7^2-");
    expect(r.elements.Cr).toBe(2);
    expect(r.elements.O).toBe(7);
    expect(r.charge).toBe(-2);
  });
  it("MnO4^- has charge=-1", () => {
    const r = parseFormula("MnO4^-");
    expect(r.elements.Mn).toBe(1);
    expect(r.elements.O).toBe(4);
    expect(r.charge).toBe(-1);
  });
  it("NH4^+ has charge=+1", () => {
    const r = parseFormula("NH4^+");
    expect(r.elements.N).toBe(1);
    expect(r.elements.H).toBe(4);
    expect(r.charge).toBe(1);
  });
  it("OH^- has charge=-1", () => {
    const r = parseFormula("OH^-");
    expect(r.elements.O).toBe(1);
    expect(r.elements.H).toBe(1);
    expect(r.charge).toBe(-1);
  });
  it("Ca^2+ has charge=+2", () => {
    const r = parseFormula("Ca^2+");
    expect(r.elements.Ca).toBe(1);
    expect(r.charge).toBe(2);
  });
  it("S^2- has charge=-2", () => {
    const r = parseFormula("S^2-");
    expect(r.elements.S).toBe(1);
    expect(r.charge).toBe(-2);
  });
});

describe("multi-dot hydrate formulas", () => {
  it("CaCl2·2H2O parses correctly", () => {
    const r = parseFormula("CaCl2·2H2O");
    expect(r.elements.Ca).toBe(1);
    expect(r.elements.Cl).toBe(2);
    expect(r.elements.H).toBe(4);
    expect(r.elements.O).toBe(2);
  });
  it("CuSO4·5H2O parses correctly", () => {
    const r = parseFormula("CuSO4·5H2O");
    expect(r.elements.Cu).toBe(1);
    expect(r.elements.S).toBe(1);
    expect(r.elements.O).toBe(9);
    expect(r.elements.H).toBe(10);
  });
  it("MgSO4·7H2O (Epsom salt) parses correctly", () => {
    const r = parseFormula("MgSO4·7H2O");
    expect(r.elements.Mg).toBe(1);
    expect(r.elements.S).toBe(1);
    expect(r.elements.O).toBe(11);
    expect(r.elements.H).toBe(14);
  });
  it("Na2CO3·10H2O (washing soda) parses correctly", () => {
    const r = parseFormula("Na2CO3·10H2O");
    expect(r.elements.Na).toBe(2);
    expect(r.elements.C).toBe(1);
    expect(r.elements.O).toBe(13);
    expect(r.elements.H).toBe(20);
  });
  it("CaSO4·2H2O (gypsum) parses correctly", () => {
    const r = parseFormula("CaSO4·2H2O");
    expect(r.elements.Ca).toBe(1);
    expect(r.elements.S).toBe(1);
    expect(r.elements.O).toBe(6);
    expect(r.elements.H).toBe(4);
  });
  it("FeSO4·7H2O (green vitriol) parses correctly", () => {
    const r = parseFormula("FeSO4·7H2O");
    expect(r.elements.Fe).toBe(1);
    expect(r.elements.S).toBe(1);
    expect(r.elements.O).toBe(11);
    expect(r.elements.H).toBe(14);
  });
  it("KAl(SO4)2·12H2O (alum) parses correctly", () => {
    const r = parseFormula("KAl(SO4)2·12H2O");
    expect(r.elements.K).toBe(1);
    expect(r.elements.Al).toBe(1);
    expect(r.elements.S).toBe(2);
    expect(r.elements.O).toBe(20);
    expect(r.elements.H).toBe(24);
  });
  it("Na2S2O3·5H2O (hypo) parses correctly", () => {
    const r = parseFormula("Na2S2O3·5H2O");
    expect(r.elements.Na).toBe(2);
    expect(r.elements.S).toBe(2);
    expect(r.elements.O).toBe(8);
    expect(r.elements.H).toBe(10);
  });
  it("CoCl2·6H2O parses correctly", () => {
    const r = parseFormula("CoCl2·6H2O");
    expect(r.elements.Co).toBe(1);
    expect(r.elements.Cl).toBe(2);
    expect(r.elements.H).toBe(12);
    expect(r.elements.O).toBe(6);
  });
  it("ZnSO4·7H2O (white vitriol) parses correctly", () => {
    const r = parseFormula("ZnSO4·7H2O");
    expect(r.elements.Zn).toBe(1);
    expect(r.elements.S).toBe(1);
    expect(r.elements.O).toBe(11);
    expect(r.elements.H).toBe(14);
  });
});

describe("mixed bracket types", () => {
  it("[Cu(NH3)4]SO4 parses correctly", () => {
    const r = parseFormula("[Cu(NH3)4]SO4");
    expect(r.elements.Cu).toBe(1);
    expect(r.elements.N).toBe(4);
    expect(r.elements.H).toBe(12);
    expect(r.elements.S).toBe(1);
    expect(r.elements.O).toBe(4);
  });
  it("K3[Fe(CN)6] parses correctly", () => {
    const r = parseFormula("K3[Fe(CN)6]");
    expect(r.elements.K).toBe(3);
    expect(r.elements.Fe).toBe(1);
    expect(r.elements.C).toBe(6);
    expect(r.elements.N).toBe(6);
  });
  it("Na2[PtCl6] parses correctly", () => {
    const r = parseFormula("Na2[PtCl6]");
    expect(r.elements.Na).toBe(2);
    expect(r.elements.Pt).toBe(1);
    expect(r.elements.Cl).toBe(6);
  });
  it("[Co(NH3)6]Cl3 parses correctly", () => {
    const r = parseFormula("[Co(NH3)6]Cl3");
    expect(r.elements.Co).toBe(1);
    expect(r.elements.N).toBe(6);
    expect(r.elements.H).toBe(18);
    expect(r.elements.Cl).toBe(3);
  });
  it("[Ag(NH3)2]+ has charge=+1", () => {
    const r = parseFormula("[Ag(NH3)2]+");
    expect(r.elements.Ag).toBe(1);
    expect(r.elements.N).toBe(2);
    expect(r.elements.H).toBe(6);
    expect(r.charge).toBe(1);
  });
  it("[Fe(CN)6]4- has charge=-4", () => {
    const r = parseFormula("[Fe(CN)6]4-");
    expect(r.elements.Fe).toBe(1);
    expect(r.elements.C).toBe(6);
    expect(r.elements.N).toBe(6);
    expect(r.charge).toBe(-4);
  });
  it("[PtCl4]2- has charge=-2", () => {
    const r = parseFormula("[PtCl4]2-");
    expect(r.elements.Pt).toBe(1);
    expect(r.elements.Cl).toBe(4);
    expect(r.charge).toBe(-2);
  });
  it("Ca(OH)[Al2(OH)6] parses correctly", () => {
    const r = parseFormula("Ca(OH)[Al2(OH)6]");
    expect(r.elements.Ca).toBe(1);
    expect(r.elements.Al).toBe(2);
    expect(r.elements.O).toBe(7);
    expect(r.elements.H).toBe(7);
  });
});

describe("state symbol edge cases", () => {
  it("H2O(g) strips (g)", () => {
    const r = parseFormula("H2O(g)");
    expect(r.elements.H).toBe(2);
    expect(r.elements.O).toBe(1);
    expect(Object.keys(r.elements).length).toBe(2);
  });
  it("NaCl(s) strips (s)", () => {
    const r = parseFormula("NaCl(s)");
    expect(r.elements.Na).toBe(1);
    expect(r.elements.Cl).toBe(1);
    expect(Object.keys(r.elements).length).toBe(2);
  });
  it("HCl(aq) strips (aq)", () => {
    const r = parseFormula("HCl(aq)");
    expect(r.elements.H).toBe(1);
    expect(r.elements.Cl).toBe(1);
  });
  it("Fe(s) strips (s)", () => {
    const r = parseFormula("Fe(s)");
    expect(r.elements.Fe).toBe(1);
    expect(Object.keys(r.elements).length).toBe(1);
  });
  it("CO2(g) strips (g)", () => {
    const r = parseFormula("CO2(g)");
    expect(r.elements.C).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("C6H12O6(aq) strips (aq)", () => {
    const r = parseFormula("C6H12O6(aq)");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(12);
    expect(r.elements.O).toBe(6);
  });
  it("NH3(g) strips (g)", () => {
    const r = parseFormula("NH3(g)");
    expect(r.elements.N).toBe(1);
    expect(r.elements.H).toBe(3);
  });
  it("CH3COOH(l) strips (l)", () => {
    const r = parseFormula("CH3COOH(l)");
    expect(r.elements.C).toBe(2);
    expect(r.elements.H).toBe(4);
    expect(r.elements.O).toBe(2);
  });
  it("CaCO3(cr) strips (cr) - crystalline", () => {
    const r = parseFormula("CaCO3(cr)");
    expect(r.elements.Ca).toBe(1);
    expect(r.elements.C).toBe(1);
    expect(r.elements.O).toBe(3);
    expect(Object.keys(r.elements).length).toBe(3);
  });
  it("Fe2O3(am) strips (am) - amorphous", () => {
    const r = parseFormula("Fe2O3(am)");
    expect(r.elements.Fe).toBe(2);
    expect(r.elements.O).toBe(3);
    expect(Object.keys(r.elements).length).toBe(2);
  });
});

describe("heavy element formulas (lanthanides, actinides)", () => {
  it("CeO2 (ceria) parses correctly", () => {
    const r = parseFormula("CeO2");
    expect(r.elements.Ce).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("La2O3 (lanthana) parses correctly", () => {
    const r = parseFormula("La2O3");
    expect(r.elements.La).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("Nd2O3 (neodymia) parses correctly", () => {
    const r = parseFormula("Nd2O3");
    expect(r.elements.Nd).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("UO2 (uranium dioxide) parses correctly", () => {
    const r = parseFormula("UO2");
    expect(r.elements.U).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("ThO2 (thoria) parses correctly", () => {
    const r = parseFormula("ThO2");
    expect(r.elements.Th).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("PuO2 (plutonia) parses correctly", () => {
    const r = parseFormula("PuO2");
    expect(r.elements.Pu).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("Y2O3 (yttria) parses correctly", () => {
    const r = parseFormula("Y2O3");
    expect(r.elements.Y).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("Sm2O3 (samarium oxide) parses correctly", () => {
    const r = parseFormula("Sm2O3");
    expect(r.elements.Sm).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("Eu2O3 (europia) parses correctly", () => {
    const r = parseFormula("Eu2O3");
    expect(r.elements.Eu).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("Gd2O3 (gadolinia) parses correctly", () => {
    const r = parseFormula("Gd2O3");
    expect(r.elements.Gd).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("Dy2O3 (dysprosia) parses correctly", () => {
    const r = parseFormula("Dy2O3");
    expect(r.elements.Dy).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("Er2O3 (erbia) parses correctly", () => {
    const r = parseFormula("Er2O3");
    expect(r.elements.Er).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("Yb2O3 (ytterbia) parses correctly", () => {
    const r = parseFormula("Yb2O3");
    expect(r.elements.Yb).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("Lu2O3 (lutetia) parses correctly", () => {
    const r = parseFormula("Lu2O3");
    expect(r.elements.Lu).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("AmO2 (americium dioxide) parses correctly", () => {
    const r = parseFormula("AmO2");
    expect(r.elements.Am).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("NpO2 (neptunium dioxide) parses correctly", () => {
    const r = parseFormula("NpO2");
    expect(r.elements.Np).toBe(1);
    expect(r.elements.O).toBe(2);
  });
});

describe("isotope-like notations (D, T as elements)", () => {
  it("D2O (heavy water) parses D as element", () => {
    const r = parseFormula("D2O");
    expect(r.elements.D).toBe(2);
    expect(r.elements.O).toBe(1);
  });
  it("CD3OD (deuterated methanol) parses correctly", () => {
    const r = parseFormula("CD3OD");
    expect(r.elements.C).toBe(1);
    expect(r.elements.D).toBe(4);  // CD3 + OD = 3+1
    expect(r.elements.O).toBe(1);
  });
  it("DCl (deuterium chloride) parses correctly", () => {
    const r = parseFormula("DCl");
    expect(r.elements.D).toBe(1);
    expect(r.elements.Cl).toBe(1);
  });
  it("T2O (tritiated water) parses T as element", () => {
    const r = parseFormula("T2O");
    expect(r.elements.T).toBe(2);
    expect(r.elements.O).toBe(1);
  });
  it("ND3 (deuterated ammonia) parses correctly", () => {
    const r = parseFormula("ND3");
    expect(r.elements.N).toBe(1);
    expect(r.elements.D).toBe(3);
  });
  it("C6D6 (deuterated benzene) parses correctly", () => {
    const r = parseFormula("C6D6");
    expect(r.elements.C).toBe(6);
    expect(r.elements.D).toBe(6);
  });
});

describe("very long formulas", () => {
  it("C60 (buckminsterfullerene) parses correctly", () => {
    const r = parseFormula("C60");
    expect(r.elements.C).toBe(60);
  });
  it("C70 (fullerene) parses correctly", () => {
    const r = parseFormula("C70");
    expect(r.elements.C).toBe(70);
  });
  it("P4O10 (phosphorus pentoxide) parses correctly", () => {
    const r = parseFormula("P4O10");
    expect(r.elements.P).toBe(4);
    expect(r.elements.O).toBe(10);
  });
  it("S8 (elemental sulfur) parses correctly", () => {
    const r = parseFormula("S8");
    expect(r.elements.S).toBe(8);
  });
  it("B10H14 (decaborane) parses correctly", () => {
    const r = parseFormula("B10H14");
    expect(r.elements.B).toBe(10);
    expect(r.elements.H).toBe(14);
  });
  it("P4S10 (phosphorus pentasulfide) parses correctly", () => {
    const r = parseFormula("P4S10");
    expect(r.elements.P).toBe(4);
    expect(r.elements.S).toBe(10);
  });
  it("C20H42 (eicosane) parses correctly", () => {
    const r = parseFormula("C20H42");
    expect(r.elements.C).toBe(20);
    expect(r.elements.H).toBe(42);
  });
  it("Al13Fe4 (intermetallic) parses correctly", () => {
    const r = parseFormula("Al13Fe4");
    expect(r.elements.Al).toBe(13);
    expect(r.elements.Fe).toBe(4);
  });
});

describe("polyatomic ion edge cases", () => {
  it("HCO3- has charge=-1", () => {
    const r = parseFormula("HCO3-");
    expect(r.elements.H).toBe(1);
    expect(r.elements.C).toBe(1);
    expect(r.elements.O).toBe(3);
    expect(r.charge).toBe(-1);
  });
  it("HSO4- has charge=-1", () => {
    const r = parseFormula("HSO4-");
    expect(r.elements.H).toBe(1);
    expect(r.elements.S).toBe(1);
    expect(r.elements.O).toBe(4);
    expect(r.charge).toBe(-1);
  });
  it("H2PO4- has charge=-1", () => {
    const r = parseFormula("H2PO4-");
    expect(r.elements.H).toBe(2);
    expect(r.elements.P).toBe(1);
    expect(r.elements.O).toBe(4);
    expect(r.charge).toBe(-1);
  });
  it("HPO4^2- has charge=-2", () => {
    const r = parseFormula("HPO4^2-");
    expect(r.elements.H).toBe(1);
    expect(r.elements.P).toBe(1);
    expect(r.elements.O).toBe(4);
    expect(r.charge).toBe(-2);
  });
  it("C2O4^2- (oxalate) has charge=-2", () => {
    const r = parseFormula("C2O4^2-");
    expect(r.elements.C).toBe(2);
    expect(r.elements.O).toBe(4);
    expect(r.charge).toBe(-2);
  });
  it("SCN- (thiocyanate) has charge=-1", () => {
    const r = parseFormula("SCN-");
    expect(r.elements.S).toBe(1);
    expect(r.elements.C).toBe(1);
    expect(r.elements.N).toBe(1);
    expect(r.charge).toBe(-1);
  });
  it("ClO4- (perchlorate) has charge=-1", () => {
    const r = parseFormula("ClO4-");
    expect(r.elements.Cl).toBe(1);
    expect(r.elements.O).toBe(4);
    expect(r.charge).toBe(-1);
  });
  it("ClO3- (chlorate) has charge=-1", () => {
    const r = parseFormula("ClO3-");
    expect(r.elements.Cl).toBe(1);
    expect(r.elements.O).toBe(3);
    expect(r.charge).toBe(-1);
  });
  it("ClO2- (chlorite) has charge=-1", () => {
    const r = parseFormula("ClO2-");
    expect(r.elements.Cl).toBe(1);
    expect(r.elements.O).toBe(2);
    expect(r.charge).toBe(-1);
  });
  it("ClO- (hypochlorite) has charge=-1", () => {
    const r = parseFormula("ClO-");
    expect(r.elements.Cl).toBe(1);
    expect(r.elements.O).toBe(1);
    expect(r.charge).toBe(-1);
  });
  it("IO3- (iodate) has charge=-1", () => {
    const r = parseFormula("IO3-");
    expect(r.elements.I).toBe(1);
    expect(r.elements.O).toBe(3);
    expect(r.charge).toBe(-1);
  });
  it("IO4- (periodate) has charge=-1", () => {
    const r = parseFormula("IO4-");
    expect(r.elements.I).toBe(1);
    expect(r.elements.O).toBe(4);
    expect(r.charge).toBe(-1);
  });
  it("BrO3- (bromate) has charge=-1", () => {
    const r = parseFormula("BrO3-");
    expect(r.elements.Br).toBe(1);
    expect(r.elements.O).toBe(3);
    expect(r.charge).toBe(-1);
  });
  it("MnO4^2- (manganate) has charge=-2", () => {
    const r = parseFormula("MnO4^2-");
    expect(r.elements.Mn).toBe(1);
    expect(r.elements.O).toBe(4);
    expect(r.charge).toBe(-2);
  });
  it("SiO3^2- (metasilicate) has charge=-2", () => {
    const r = parseFormula("SiO3^2-");
    expect(r.elements.Si).toBe(1);
    expect(r.elements.O).toBe(3);
    expect(r.charge).toBe(-2);
  });
  it("B4O7^2- (tetraborate) has charge=-2", () => {
    const r = parseFormula("B4O7^2-");
    expect(r.elements.B).toBe(4);
    expect(r.elements.O).toBe(7);
    expect(r.charge).toBe(-2);
  });
});
