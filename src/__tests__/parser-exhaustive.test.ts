import { describe, it, expect } from "vitest";
import { parseFormula } from "../index";

describe("single element parsing", () => {
  it("parses H as { H: 1, charge: 0 }", () => {
    const result = parseFormula("H");
    expect(result.elements).toEqual({ H: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses He as { He: 1, charge: 0 }", () => {
    const result = parseFormula("He");
    expect(result.elements).toEqual({ He: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses Li as { Li: 1, charge: 0 }", () => {
    const result = parseFormula("Li");
    expect(result.elements).toEqual({ Li: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses Be as { Be: 1, charge: 0 }", () => {
    const result = parseFormula("Be");
    expect(result.elements).toEqual({ Be: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses B as { B: 1, charge: 0 }", () => {
    const result = parseFormula("B");
    expect(result.elements).toEqual({ B: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses C as { C: 1, charge: 0 }", () => {
    const result = parseFormula("C");
    expect(result.elements).toEqual({ C: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses N as { N: 1, charge: 0 }", () => {
    const result = parseFormula("N");
    expect(result.elements).toEqual({ N: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses O as { O: 1, charge: 0 }", () => {
    const result = parseFormula("O");
    expect(result.elements).toEqual({ O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses F as { F: 1, charge: 0 }", () => {
    const result = parseFormula("F");
    expect(result.elements).toEqual({ F: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses Ne as { Ne: 1, charge: 0 }", () => {
    const result = parseFormula("Ne");
    expect(result.elements).toEqual({ Ne: 1 });
    expect(result.charge).toBe(0);
  });
});

describe("element with subscript", () => {
  it("parses H2 as { H: 2, charge: 0 }", () => {
    const result = parseFormula("H2");
    expect(result.elements).toEqual({ H: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses O2 as { O: 2, charge: 0 }", () => {
    const result = parseFormula("O2");
    expect(result.elements).toEqual({ O: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses N2 as { N: 2, charge: 0 }", () => {
    const result = parseFormula("N2");
    expect(result.elements).toEqual({ N: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses Cl2 as { Cl: 2, charge: 0 }", () => {
    const result = parseFormula("Cl2");
    expect(result.elements).toEqual({ Cl: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses F2 as { F: 2, charge: 0 }", () => {
    const result = parseFormula("F2");
    expect(result.elements).toEqual({ F: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses Br2 as { Br: 2, charge: 0 }", () => {
    const result = parseFormula("Br2");
    expect(result.elements).toEqual({ Br: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses I2 as { I: 2, charge: 0 }", () => {
    const result = parseFormula("I2");
    expect(result.elements).toEqual({ I: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses H2O as { H: 2, O: 1, charge: 0 }", () => {
    const result = parseFormula("H2O");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses CO2 as { C: 1, O: 2, charge: 0 }", () => {
    const result = parseFormula("CO2");
    expect(result.elements).toEqual({ C: 1, O: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses NH3 as { N: 1, H: 3, charge: 0 }", () => {
    const result = parseFormula("NH3");
    expect(result.elements).toEqual({ N: 1, H: 3 });
    expect(result.charge).toBe(0);
  });
});

describe("polyatomic ion parsing", () => {
  it("parses OH- as { O: 1, H: 1, charge: -1 }", () => {
    const result = parseFormula("OH-");
    expect(result.elements).toEqual({ O: 1, H: 1 });
    expect(result.charge).toBe(-1);
  });

  it("parses NH4+ as { N: 1, H: 4, charge: 1 }", () => {
    const result = parseFormula("NH4+");
    expect(result.elements).toEqual({ N: 1, H: 4 });
    expect(result.charge).toBe(1);
  });

  it("parses NO3- as { N: 1, O: 3, charge: -1 }", () => {
    const result = parseFormula("NO3-");
    expect(result.elements).toEqual({ N: 1, O: 3 });
    expect(result.charge).toBe(-1);
  });

  it("parses SO4^2- as { S: 1, O: 4, charge: -2 }", () => {
    const result = parseFormula("SO4^2-");
    expect(result.elements).toEqual({ S: 1, O: 4 });
    expect(result.charge).toBe(-2);
  });

  it("parses CO3^2- as { C: 1, O: 3, charge: -2 }", () => {
    const result = parseFormula("CO3^2-");
    expect(result.elements).toEqual({ C: 1, O: 3 });
    expect(result.charge).toBe(-2);
  });

  it("parses PO4^3- as { P: 1, O: 4, charge: -3 }", () => {
    const result = parseFormula("PO4^3-");
    expect(result.elements).toEqual({ P: 1, O: 4 });
    expect(result.charge).toBe(-3);
  });

  it("parses ClO3- as { Cl: 1, O: 3, charge: -1 }", () => {
    const result = parseFormula("ClO3-");
    expect(result.elements).toEqual({ Cl: 1, O: 3 });
    expect(result.charge).toBe(-1);
  });

  it("parses ClO4- as { Cl: 1, O: 4, charge: -1 }", () => {
    const result = parseFormula("ClO4-");
    expect(result.elements).toEqual({ Cl: 1, O: 4 });
    expect(result.charge).toBe(-1);
  });

  it("parses MnO4- as { Mn: 1, O: 4, charge: -1 }", () => {
    const result = parseFormula("MnO4-");
    expect(result.elements).toEqual({ Mn: 1, O: 4 });
    expect(result.charge).toBe(-1);
  });

  it("parses Cr2O7^2- as { Cr: 2, O: 7, charge: -2 }", () => {
    const result = parseFormula("Cr2O7^2-");
    expect(result.elements).toEqual({ Cr: 2, O: 7 });
    expect(result.charge).toBe(-2);
  });
});

describe("nested group parsing", () => {
  it("parses Ca(OH)2 as { Ca: 1, O: 2, H: 2, charge: 0 }", () => {
    const result = parseFormula("Ca(OH)2");
    expect(result.elements).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses Al(OH)3 as { Al: 1, O: 3, H: 3, charge: 0 }", () => {
    const result = parseFormula("Al(OH)3");
    expect(result.elements).toEqual({ Al: 1, O: 3, H: 3 });
    expect(result.charge).toBe(0);
  });

  it("parses Fe(OH)3 as { Fe: 1, O: 3, H: 3, charge: 0 }", () => {
    const result = parseFormula("Fe(OH)3");
    expect(result.elements).toEqual({ Fe: 1, O: 3, H: 3 });
    expect(result.charge).toBe(0);
  });

  it("parses Mg(OH)2 as { Mg: 1, O: 2, H: 2, charge: 0 }", () => {
    const result = parseFormula("Mg(OH)2");
    expect(result.elements).toEqual({ Mg: 1, O: 2, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses (NH4)2SO4 as { N: 2, H: 8, S: 1, O: 4, charge: 0 }", () => {
    const result = parseFormula("(NH4)2SO4");
    expect(result.elements).toEqual({ N: 2, H: 8, S: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("parses (NH4)3PO4 as { N: 3, H: 12, P: 1, O: 4, charge: 0 }", () => {
    const result = parseFormula("(NH4)3PO4");
    expect(result.elements).toEqual({ N: 3, H: 12, P: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("parses Al2(SO4)3 as { Al: 2, S: 3, O: 12, charge: 0 }", () => {
    const result = parseFormula("Al2(SO4)3");
    expect(result.elements).toEqual({ Al: 2, S: 3, O: 12 });
    expect(result.charge).toBe(0);
  });

  it("parses Fe2(SO4)3 as { Fe: 2, S: 3, O: 12, charge: 0 }", () => {
    const result = parseFormula("Fe2(SO4)3");
    expect(result.elements).toEqual({ Fe: 2, S: 3, O: 12 });
    expect(result.charge).toBe(0);
  });
});

describe("bracket group parsing", () => {
  it("parses [Fe(CN)6]3- as { Fe: 1, C: 6, N: 6, charge: -3 }", () => {
    const result = parseFormula("[Fe(CN)6]3-");
    expect(result.elements).toEqual({ Fe: 1, C: 6, N: 6 });
    expect(result.charge).toBe(-3);
  });

  it("parses [Fe(CN)6]4- as { Fe: 1, C: 6, N: 6, charge: -4 }", () => {
    const result = parseFormula("[Fe(CN)6]4-");
    expect(result.elements).toEqual({ Fe: 1, C: 6, N: 6 });
    expect(result.charge).toBe(-4);
  });

  it("parses [Co(NH3)6]3+ as { Co: 1, N: 6, H: 18, charge: 3 }", () => {
    const result = parseFormula("[Co(NH3)6]3+");
    expect(result.elements).toEqual({ Co: 1, N: 6, H: 18 });
    expect(result.charge).toBe(3);
  });

  it("parses [Cu(NH3)4]2+ as { Cu: 1, N: 4, H: 12, charge: 2 }", () => {
    const result = parseFormula("[Cu(NH3)4]2+");
    expect(result.elements).toEqual({ Cu: 1, N: 4, H: 12 });
    expect(result.charge).toBe(2);
  });

  it("parses [Ag(NH3)2]+ as { Ag: 1, N: 2, H: 6, charge: 1 }", () => {
    const result = parseFormula("[Ag(NH3)2]+");
    expect(result.elements).toEqual({ Ag: 1, N: 2, H: 6 });
    expect(result.charge).toBe(1);
  });

  it("parses [Ni(CN)4]2- as { Ni: 1, C: 4, N: 4, charge: -2 }", () => {
    const result = parseFormula("[Ni(CN)4]2-");
    expect(result.elements).toEqual({ Ni: 1, C: 4, N: 4 });
    expect(result.charge).toBe(-2);
  });
});

describe("hydrate parsing", () => {
  it("parses CuSO4·5H2O as { Cu: 1, S: 1, O: 9, H: 10, charge: 0 }", () => {
    const result = parseFormula("CuSO4·5H2O");
    expect(result.elements).toEqual({ Cu: 1, S: 1, O: 9, H: 10 });
    expect(result.charge).toBe(0);
  });

  it("parses BaCl2·2H2O as { Ba: 1, Cl: 2, O: 2, H: 4, charge: 0 }", () => {
    const result = parseFormula("BaCl2·2H2O");
    expect(result.elements).toEqual({ Ba: 1, Cl: 2, O: 2, H: 4 });
    expect(result.charge).toBe(0);
  });

  it("parses Na2CO3·10H2O as { Na: 2, C: 1, O: 13, H: 20, charge: 0 }", () => {
    const result = parseFormula("Na2CO3·10H2O");
    expect(result.elements).toEqual({ Na: 2, C: 1, O: 13, H: 20 });
    expect(result.charge).toBe(0);
  });

  it("parses MgSO4·7H2O as { Mg: 1, S: 1, O: 11, H: 14, charge: 0 }", () => {
    const result = parseFormula("MgSO4·7H2O");
    expect(result.elements).toEqual({ Mg: 1, S: 1, O: 11, H: 14 });
    expect(result.charge).toBe(0);
  });

  it("parses FeSO4·7H2O as { Fe: 1, S: 1, O: 11, H: 14, charge: 0 }", () => {
    const result = parseFormula("FeSO4·7H2O");
    expect(result.elements).toEqual({ Fe: 1, S: 1, O: 11, H: 14 });
    expect(result.charge).toBe(0);
  });

  it("parses Na2S2O3·5H2O as { Na: 2, S: 2, O: 8, H: 10, charge: 0 }", () => {
    const result = parseFormula("Na2S2O3·5H2O");
    expect(result.elements).toEqual({ Na: 2, S: 2, O: 8, H: 10 });
    expect(result.charge).toBe(0);
  });

  it("parses CaCl2·2H2O as { Ca: 1, Cl: 2, O: 2, H: 4, charge: 0 }", () => {
    const result = parseFormula("CaCl2·2H2O");
    expect(result.elements).toEqual({ Ca: 1, Cl: 2, O: 2, H: 4 });
    expect(result.charge).toBe(0);
  });

  it("parses CoCl2·6H2O as { Co: 1, Cl: 2, O: 6, H: 12, charge: 0 }", () => {
    const result = parseFormula("CoCl2·6H2O");
    expect(result.elements).toEqual({ Co: 1, Cl: 2, O: 6, H: 12 });
    expect(result.charge).toBe(0);
  });
});

describe("state symbol stripping", () => {
  it("strips (s) from NaCl(s)", () => {
    const result = parseFormula("NaCl(s)");
    expect(result.elements).toEqual({ Na: 1, Cl: 1 });
    expect(result.charge).toBe(0);
  });

  it("strips (l) from H2O(l)", () => {
    const result = parseFormula("H2O(l)");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("strips (g) from CO2(g)", () => {
    const result = parseFormula("CO2(g)");
    expect(result.elements).toEqual({ C: 1, O: 2 });
    expect(result.charge).toBe(0);
  });

  it("strips (aq) from Na+(aq) preserving charge", () => {
    const result = parseFormula("Na+(aq)");
    expect(result.elements).toEqual({ Na: 1 });
    expect(result.charge).toBe(1);
  });

  it("strips (aq) from Fe2+(aq) preserving charge", () => {
    const result = parseFormula("Fe2+(aq)");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(2);
  });

  it("strips (aq) from Cl-(aq) preserving charge", () => {
    const result = parseFormula("Cl-(aq)");
    expect(result.elements).toEqual({ Cl: 1 });
    expect(result.charge).toBe(-1);
  });

  it("strips (s) from CaCO3(s)", () => {
    const result = parseFormula("CaCO3(s)");
    expect(result.elements).toEqual({ Ca: 1, C: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("strips (aq) from H2SO4(aq)", () => {
    const result = parseFormula("H2SO4(aq)");
    expect(result.elements).toEqual({ H: 2, S: 1, O: 4 });
    expect(result.charge).toBe(0);
  });
});

describe("charge notation variation", () => {
  it("parses Na+ as { Na: 1, charge: 1 }", () => {
    const result = parseFormula("Na+");
    expect(result.elements).toEqual({ Na: 1 });
    expect(result.charge).toBe(1);
  });

  it("parses K+ as { K: 1, charge: 1 }", () => {
    const result = parseFormula("K+");
    expect(result.elements).toEqual({ K: 1 });
    expect(result.charge).toBe(1);
  });

  it("parses Ca2+ as { Ca: 1, charge: 2 }", () => {
    const result = parseFormula("Ca2+");
    expect(result.elements).toEqual({ Ca: 1 });
    expect(result.charge).toBe(2);
  });

  it("parses Mg2+ as { Mg: 1, charge: 2 }", () => {
    const result = parseFormula("Mg2+");
    expect(result.elements).toEqual({ Mg: 1 });
    expect(result.charge).toBe(2);
  });

  it("parses Al3+ as { Al: 1, charge: 3 }", () => {
    const result = parseFormula("Al3+");
    expect(result.elements).toEqual({ Al: 1 });
    expect(result.charge).toBe(3);
  });

  it("parses Fe3+ as { Fe: 1, charge: 3 }", () => {
    const result = parseFormula("Fe3+");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(3);
  });

  it("parses Cl- as { Cl: 1, charge: -1 }", () => {
    const result = parseFormula("Cl-");
    expect(result.elements).toEqual({ Cl: 1 });
    expect(result.charge).toBe(-1);
  });

  it("parses O2- as { O: 1, charge: -2 }", () => {
    const result = parseFormula("O2-");
    expect(result.elements).toEqual({ O: 1 });
    expect(result.charge).toBe(-2);
  });
});

describe("electron parsing", () => {
  it("parses e- as { elements: {}, charge: -1 }", () => {
    const result = parseFormula("e-");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(-1);
  });

  it("parses e as { elements: {}, charge: -1 }", () => {
    const result = parseFormula("e");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(-1);
  });

  it("parses e+ (positron) as { elements: {}, charge: 1 }", () => {
    const result = parseFormula("e+");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(1);
  });

  it("parses e- within a hydrate-split part context", () => {
    const result = parseFormula("e-");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(-1);
  });

  it("parses multiple e- via hydrate multiplier 2e-", () => {
    const result = parseFormula("2e-");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(-2);
  });
});
