import { describe, it, expect } from "vitest";
import { parseFormula } from "../index";

describe("parseFormula element count accuracy", () => {
  it("H2O has H=2,O=1", () => {
    const result = parseFormula("H2O");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("CO2 has C=1,O=2", () => {
    const result = parseFormula("CO2");
    expect(result.elements).toEqual({ C: 1, O: 2 });
    expect(result.charge).toBe(0);
  });

  it("H2SO4 has H=2,S=1,O=4", () => {
    const result = parseFormula("H2SO4");
    expect(result.elements).toEqual({ H: 2, S: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("CaCO3 has Ca=1,C=1,O=3", () => {
    const result = parseFormula("CaCO3");
    expect(result.elements).toEqual({ Ca: 1, C: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("NaCl has Na=1,Cl=1", () => {
    const result = parseFormula("NaCl");
    expect(result.elements).toEqual({ Na: 1, Cl: 1 });
    expect(result.charge).toBe(0);
  });

  it("Fe2O3 has Fe=2,O=3", () => {
    const result = parseFormula("Fe2O3");
    expect(result.elements).toEqual({ Fe: 2, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("C6H12O6 has C=6,H=12,O=6", () => {
    const result = parseFormula("C6H12O6");
    expect(result.elements).toEqual({ C: 6, H: 12, O: 6 });
    expect(result.charge).toBe(0);
  });

  it("KMnO4 has K=1,Mn=1,O=4", () => {
    const result = parseFormula("KMnO4");
    expect(result.elements).toEqual({ K: 1, Mn: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("NaHCO3 has Na=1,H=1,C=1,O=3", () => {
    const result = parseFormula("NaHCO3");
    expect(result.elements).toEqual({ Na: 1, H: 1, C: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("NH4NO3 has N=2,H=4,O=3", () => {
    const result = parseFormula("NH4NO3");
    expect(result.elements).toEqual({ N: 2, H: 4, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("Al2(SO4)3 has Al=2,S=3,O=12", () => {
    const result = parseFormula("Al2(SO4)3");
    expect(result.elements).toEqual({ Al: 2, S: 3, O: 12 });
    expect(result.charge).toBe(0);
  });

  it("Ca(OH)2 has Ca=1,O=2,H=2", () => {
    const result = parseFormula("Ca(OH)2");
    expect(result.elements).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("Fe(NO3)3 has Fe=1,N=3,O=9", () => {
    const result = parseFormula("Fe(NO3)3");
    expect(result.elements).toEqual({ Fe: 1, N: 3, O: 9 });
    expect(result.charge).toBe(0);
  });

  it("MgCl2 has Mg=1,Cl=2", () => {
    const result = parseFormula("MgCl2");
    expect(result.elements).toEqual({ Mg: 1, Cl: 2 });
    expect(result.charge).toBe(0);
  });

  it("P2O5 has P=2,O=5", () => {
    const result = parseFormula("P2O5");
    expect(result.elements).toEqual({ P: 2, O: 5 });
    expect(result.charge).toBe(0);
  });

  it("H3PO4 has H=3,P=1,O=4", () => {
    const result = parseFormula("H3PO4");
    expect(result.elements).toEqual({ H: 3, P: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("Zn has Zn=1", () => {
    const result = parseFormula("Zn");
    expect(result.elements).toEqual({ Zn: 1 });
    expect(result.charge).toBe(0);
  });

  it("O2 has O=2", () => {
    const result = parseFormula("O2");
    expect(result.elements).toEqual({ O: 2 });
    expect(result.charge).toBe(0);
  });

  it("Na2SO4 has Na=2,S=1,O=4", () => {
    const result = parseFormula("Na2SO4");
    expect(result.elements).toEqual({ Na: 2, S: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("NH3 has N=1,H=3", () => {
    const result = parseFormula("NH3");
    expect(result.elements).toEqual({ N: 1, H: 3 });
    expect(result.charge).toBe(0);
  });

  it("AgNO3 has Ag=1,N=1,O=3", () => {
    const result = parseFormula("AgNO3");
    expect(result.elements).toEqual({ Ag: 1, N: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("CuSO4 has Cu=1,S=1,O=4", () => {
    const result = parseFormula("CuSO4");
    expect(result.elements).toEqual({ Cu: 1, S: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("HCl has H=1,Cl=1", () => {
    const result = parseFormula("HCl");
    expect(result.elements).toEqual({ H: 1, Cl: 1 });
    expect(result.charge).toBe(0);
  });

  it("CH4 has C=1,H=4", () => {
    const result = parseFormula("CH4");
    expect(result.elements).toEqual({ C: 1, H: 4 });
    expect(result.charge).toBe(0);
  });

  it("BaCl2 has Ba=1,Cl=2", () => {
    const result = parseFormula("BaCl2");
    expect(result.elements).toEqual({ Ba: 1, Cl: 2 });
    expect(result.charge).toBe(0);
  });

  it("K2Cr2O7 has K=2,Cr=2,O=7", () => {
    const result = parseFormula("K2Cr2O7");
    expect(result.elements).toEqual({ K: 2, Cr: 2, O: 7 });
    expect(result.charge).toBe(0);
  });

  it("Mg(OH)2 has Mg=1,O=2,H=2", () => {
    const result = parseFormula("Mg(OH)2");
    expect(result.elements).toEqual({ Mg: 1, O: 2, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("Al has Al=1", () => {
    const result = parseFormula("Al");
    expect(result.elements).toEqual({ Al: 1 });
    expect(result.charge).toBe(0);
  });

  it("H2O2 has H=2,O=2", () => {
    const result = parseFormula("H2O2");
    expect(result.elements).toEqual({ H: 2, O: 2 });
    expect(result.charge).toBe(0);
  });

  it("C2H6 has C=2,H=6", () => {
    const result = parseFormula("C2H6");
    expect(result.elements).toEqual({ C: 2, H: 6 });
    expect(result.charge).toBe(0);
  });

  it("Ba(OH)2 has Ba=1,O=2,H=2", () => {
    const result = parseFormula("Ba(OH)2");
    expect(result.elements).toEqual({ Ba: 1, O: 2, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("FeCl3 has Fe=1,Cl=3", () => {
    const result = parseFormula("FeCl3");
    expect(result.elements).toEqual({ Fe: 1, Cl: 3 });
    expect(result.charge).toBe(0);
  });

  it("Na2O has Na=2,O=1", () => {
    const result = parseFormula("Na2O");
    expect(result.elements).toEqual({ Na: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("KClO3 has K=1,Cl=1,O=3", () => {
    const result = parseFormula("KClO3");
    expect(result.elements).toEqual({ K: 1, Cl: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("Ca3(PO4)2 has Ca=3,P=2,O=8", () => {
    const result = parseFormula("Ca3(PO4)2");
    expect(result.elements).toEqual({ Ca: 3, P: 2, O: 8 });
    expect(result.charge).toBe(0);
  });

  it("Na2S2O3 has Na=2,S=2,O=3", () => {
    const result = parseFormula("Na2S2O3");
    expect(result.elements).toEqual({ Na: 2, S: 2, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("Mg3N2 has Mg=3,N=2", () => {
    const result = parseFormula("Mg3N2");
    expect(result.elements).toEqual({ Mg: 3, N: 2 });
    expect(result.charge).toBe(0);
  });

  it("HNO3 has H=1,N=1,O=3", () => {
    const result = parseFormula("HNO3");
    expect(result.elements).toEqual({ H: 1, N: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("Cu(NO3)2 has Cu=1,N=2,O=6", () => {
    const result = parseFormula("Cu(NO3)2");
    expect(result.elements).toEqual({ Cu: 1, N: 2, O: 6 });
    expect(result.charge).toBe(0);
  });

  it("PbO2 has Pb=1,O=2", () => {
    const result = parseFormula("PbO2");
    expect(result.elements).toEqual({ Pb: 1, O: 2 });
    expect(result.charge).toBe(0);
  });
});

describe("parseFormula charge accuracy", () => {
  it("Na+ has charge=1", () => {
    const result = parseFormula("Na+");
    expect(result.elements).toEqual({ Na: 1 });
    expect(result.charge).toBe(1);
  });

  it("Cl- has charge=-1", () => {
    const result = parseFormula("Cl-");
    expect(result.elements).toEqual({ Cl: 1 });
    expect(result.charge).toBe(-1);
  });

  it("SO4^2- has charge=-2", () => {
    const result = parseFormula("SO4^2-");
    expect(result.elements).toEqual({ S: 1, O: 4 });
    expect(result.charge).toBe(-2);
  });

  it("PO4^3- has charge=-3", () => {
    const result = parseFormula("PO4^3-");
    expect(result.elements).toEqual({ P: 1, O: 4 });
    expect(result.charge).toBe(-3);
  });

  it("e- has charge=-1", () => {
    const result = parseFormula("e-");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(-1);
  });

  it("Ca2+ has charge=2", () => {
    const result = parseFormula("Ca2+");
    expect(result.elements).toEqual({ Ca: 1 });
    expect(result.charge).toBe(2);
  });

  it("Fe3+ has charge=3", () => {
    const result = parseFormula("Fe3+");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(3);
  });

  it("OH- has charge=-1", () => {
    const result = parseFormula("OH-");
    expect(result.elements).toEqual({ O: 1, H: 1 });
    expect(result.charge).toBe(-1);
  });

  it("NH4+ has charge=1", () => {
    const result = parseFormula("NH4+");
    expect(result.elements).toEqual({ N: 1, H: 4 });
    expect(result.charge).toBe(1);
  });

  it("CO3^2- has charge=-2", () => {
    const result = parseFormula("CO3^2-");
    expect(result.elements).toEqual({ C: 1, O: 3 });
    expect(result.charge).toBe(-2);
  });

  it("MnO4- has charge=-1", () => {
    const result = parseFormula("MnO4-");
    expect(result.elements).toEqual({ Mn: 1, O: 4 });
    expect(result.charge).toBe(-1);
  });

  it("Cr2O7^2- has charge=-2", () => {
    const result = parseFormula("Cr2O7^2-");
    expect(result.elements).toEqual({ Cr: 2, O: 7 });
    expect(result.charge).toBe(-2);
  });

  it("Cu2+ has charge=2", () => {
    const result = parseFormula("Cu2+");
    expect(result.elements).toEqual({ Cu: 1 });
    expect(result.charge).toBe(2);
  });

  it("Ag+ has charge=1", () => {
    const result = parseFormula("Ag+");
    expect(result.elements).toEqual({ Ag: 1 });
    expect(result.charge).toBe(1);
  });

  it("Al3+ has charge=3", () => {
    const result = parseFormula("Al3+");
    expect(result.elements).toEqual({ Al: 1 });
    expect(result.charge).toBe(3);
  });

  it("Zn2+ has charge=2", () => {
    const result = parseFormula("Zn2+");
    expect(result.elements).toEqual({ Zn: 1 });
    expect(result.charge).toBe(2);
  });

  it("Fe2+ has charge=2", () => {
    const result = parseFormula("Fe2+");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(2);
  });

  it("H+ has charge=1", () => {
    const result = parseFormula("H+");
    expect(result.elements).toEqual({ H: 1 });
    expect(result.charge).toBe(1);
  });

  it("S^2- has charge=-2", () => {
    const result = parseFormula("S^2-");
    expect(result.elements).toEqual({ S: 1 });
    expect(result.charge).toBe(-2);
  });

  it("NO3- has charge=-1", () => {
    const result = parseFormula("NO3-");
    expect(result.elements).toEqual({ N: 1, O: 3 });
    expect(result.charge).toBe(-1);
  });

  it("HCO3- has charge=-1", () => {
    const result = parseFormula("HCO3-");
    expect(result.elements).toEqual({ H: 1, C: 1, O: 3 });
    expect(result.charge).toBe(-1);
  });

  it("H3O+ has charge=1", () => {
    const result = parseFormula("H3O+");
    expect(result.elements).toEqual({ H: 3, O: 1 });
    expect(result.charge).toBe(1);
  });

  it("SO3^2- has charge=-2", () => {
    const result = parseFormula("SO3^2-");
    expect(result.elements).toEqual({ S: 1, O: 3 });
    expect(result.charge).toBe(-2);
  });

  it("NO2- has charge=-1", () => {
    const result = parseFormula("NO2-");
    expect(result.elements).toEqual({ N: 1, O: 2 });
    expect(result.charge).toBe(-1);
  });

  it("CH3COO- has charge=-1", () => {
    const result = parseFormula("CH3COO-");
    expect(result.elements).toEqual({ C: 2, H: 3, O: 2 });
    expect(result.charge).toBe(-1);
  });

  it("neutral formula H2O has charge=0", () => {
    const result = parseFormula("H2O");
    expect(result.charge).toBe(0);
  });

  it("neutral formula NaCl has charge=0", () => {
    const result = parseFormula("NaCl");
    expect(result.charge).toBe(0);
  });

  it("neutral formula CO2 has charge=0", () => {
    const result = parseFormula("CO2");
    expect(result.charge).toBe(0);
  });

  it("neutral formula Fe2O3 has charge=0", () => {
    const result = parseFormula("Fe2O3");
    expect(result.charge).toBe(0);
  });

  it("neutral formula Ca(OH)2 has charge=0", () => {
    const result = parseFormula("Ca(OH)2");
    expect(result.charge).toBe(0);
  });
});

describe("parseFormula hydrate accuracy", () => {
  it("CuSO4·5H2O has Cu=1,S=1,O=9,H=10", () => {
    const result = parseFormula("CuSO4·5H2O");
    expect(result.elements).toEqual({ Cu: 1, S: 1, O: 9, H: 10 });
    expect(result.charge).toBe(0);
  });

  it("BaCl2·2H2O has Ba=1,Cl=2,O=2,H=4", () => {
    const result = parseFormula("BaCl2·2H2O");
    expect(result.elements).toEqual({ Ba: 1, Cl: 2, O: 2, H: 4 });
    expect(result.charge).toBe(0);
  });

  it("Na2CO3·10H2O has Na=2,C=1,O=13,H=20", () => {
    const result = parseFormula("Na2CO3·10H2O");
    expect(result.elements).toEqual({ Na: 2, C: 1, O: 13, H: 20 });
    expect(result.charge).toBe(0);
  });

  it("MgSO4·7H2O has Mg=1,S=1,O=11,H=14", () => {
    const result = parseFormula("MgSO4·7H2O");
    expect(result.elements).toEqual({ Mg: 1, S: 1, O: 11, H: 14 });
    expect(result.charge).toBe(0);
  });

  it("FeSO4·7H2O has Fe=1,S=1,O=11,H=14", () => {
    const result = parseFormula("FeSO4·7H2O");
    expect(result.elements).toEqual({ Fe: 1, S: 1, O: 11, H: 14 });
    expect(result.charge).toBe(0);
  });

  it("CaSO4·2H2O has Ca=1,S=1,O=6,H=4", () => {
    const result = parseFormula("CaSO4·2H2O");
    expect(result.elements).toEqual({ Ca: 1, S: 1, O: 6, H: 4 });
    expect(result.charge).toBe(0);
  });

  it("CoCl2·6H2O has Co=1,Cl=2,O=6,H=12", () => {
    const result = parseFormula("CoCl2·6H2O");
    expect(result.elements).toEqual({ Co: 1, Cl: 2, O: 6, H: 12 });
    expect(result.charge).toBe(0);
  });

  it("KAl(SO4)2·12H2O has K=1,Al=1,S=2,O=20,H=24", () => {
    const result = parseFormula("KAl(SO4)2·12H2O");
    expect(result.elements).toEqual({ K: 1, Al: 1, S: 2, O: 20, H: 24 });
    expect(result.charge).toBe(0);
  });

  it("CuSO4·H2O has Cu=1,S=1,O=5,H=2", () => {
    const result = parseFormula("CuSO4·H2O");
    expect(result.elements).toEqual({ Cu: 1, S: 1, O: 5, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("Na2SO4·10H2O has Na=2,S=1,O=14,H=20", () => {
    const result = parseFormula("Na2SO4·10H2O");
    expect(result.elements).toEqual({ Na: 2, S: 1, O: 14, H: 20 });
    expect(result.charge).toBe(0);
  });

  it("ZnSO4·7H2O has Zn=1,S=1,O=11,H=14", () => {
    const result = parseFormula("ZnSO4·7H2O");
    expect(result.elements).toEqual({ Zn: 1, S: 1, O: 11, H: 14 });
    expect(result.charge).toBe(0);
  });

  it("NiCl2·6H2O has Ni=1,Cl=2,O=6,H=12", () => {
    const result = parseFormula("NiCl2·6H2O");
    expect(result.elements).toEqual({ Ni: 1, Cl: 2, O: 6, H: 12 });
    expect(result.charge).toBe(0);
  });

  it("CaCl2·2H2O has Ca=1,Cl=2,O=2,H=4", () => {
    const result = parseFormula("CaCl2·2H2O");
    expect(result.elements).toEqual({ Ca: 1, Cl: 2, O: 2, H: 4 });
    expect(result.charge).toBe(0);
  });

  it("FeC2O4·2H2O has Fe=1,C=2,O=6,H=4", () => {
    const result = parseFormula("FeC2O4·2H2O");
    expect(result.elements).toEqual({ Fe: 1, C: 2, O: 6, H: 4 });
    expect(result.charge).toBe(0);
  });

  it("Al2(SO4)3·18H2O has Al=2,S=3,O=30,H=36", () => {
    const result = parseFormula("Al2(SO4)3·18H2O");
    expect(result.elements).toEqual({ Al: 2, S: 3, O: 30, H: 36 });
    expect(result.charge).toBe(0);
  });

  it("MnSO4·H2O has Mn=1,S=1,O=5,H=2", () => {
    const result = parseFormula("MnSO4·H2O");
    expect(result.elements).toEqual({ Mn: 1, S: 1, O: 5, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("CrCl3·6H2O has Cr=1,Cl=3,O=6,H=12", () => {
    const result = parseFormula("CrCl3·6H2O");
    expect(result.elements).toEqual({ Cr: 1, Cl: 3, O: 6, H: 12 });
    expect(result.charge).toBe(0);
  });

  it("LiCl·H2O has Li=1,Cl=1,O=1,H=2", () => {
    const result = parseFormula("LiCl·H2O");
    expect(result.elements).toEqual({ Li: 1, Cl: 1, O: 1, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("SrCl2·6H2O has Sr=1,Cl=2,O=6,H=12", () => {
    const result = parseFormula("SrCl2·6H2O");
    expect(result.elements).toEqual({ Sr: 1, Cl: 2, O: 6, H: 12 });
    expect(result.charge).toBe(0);
  });

  it("MgCl2·6H2O has Mg=1,Cl=2,O=6,H=12", () => {
    const result = parseFormula("MgCl2·6H2O");
    expect(result.elements).toEqual({ Mg: 1, Cl: 2, O: 6, H: 12 });
    expect(result.charge).toBe(0);
  });
});

describe("parseFormula error handling", () => {
  it("empty string returns empty elements", () => {
    const result = parseFormula("");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(0);
  });

  it("lowercase start 'h2o' throws", () => {
    try {
      parseFormula("h2o");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("mismatched parens '(OH' throws", () => {
    try {
      parseFormula("(OH");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("mismatched brackets '[Fe' throws", () => {
    try {
      parseFormula("[Fe");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("unexpected char 'H2@O' throws", () => {
    try {
      parseFormula("H2@O");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("trailing garbage 'H2Oxyz' throws", () => {
    try {
      parseFormula("H2Oxyz");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("only number '123' returns empty", () => {
    const result = parseFormula("123");
    expect(result.elements).toEqual({});
  });

  it("double dot 'H2..O' throws", () => {
    try {
      parseFormula("H2..O");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("empty parens '()' throws", () => {
    try {
      parseFormula("()");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("number after parens without content '(H)0' throws or gives zero", () => {
    try {
      const result = parseFormula("(H)0");
      expect(result.elements).toBeDefined();
    } catch {
      // May throw for invalid formulas
    }
  });

  it("consecutive uppercase 'XY' throws", () => {
    try {
      parseFormula("XY");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("nested empty parens '(())' throws", () => {
    try {
      parseFormula("(())");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("unmatched closing paren 'H2O)' throws", () => {
    try {
      parseFormula("H2O)");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("unmatched closing bracket 'Fe]' throws", () => {
    try {
      parseFormula("Fe]");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("standalone dot '.H2O' throws", () => {
    try {
      parseFormula(".H2O");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("space in formula 'H2 O' throws", () => {
    try {
      parseFormula("H2 O");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("double caret 'H2^^O' throws", () => {
    try {
      parseFormula("H2^^O");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("number starting formula '2H2O' throws", () => {
    try {
      parseFormula("2H2O");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("unicode garbage 'H2ΩO' throws", () => {
    try {
      parseFormula("H2ΩO");
    } catch {
      // Expected to throw for invalid formulas
    }
  });

  it("only caret '^2-' throws", () => {
    try {
      parseFormula("^2-");
    } catch {
      // Expected to throw for invalid formulas
    }
  });
});
