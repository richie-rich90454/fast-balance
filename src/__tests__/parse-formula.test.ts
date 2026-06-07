import { describe, it, expect } from "vitest";
import { parseFormula, parseWithoutMultiplier } from "../index";

describe("parseFormula simple elements", () => {
  it("parses H2O correctly", () => {
    const result = parseFormula("H2O");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses O2 correctly", () => {
    const result = parseFormula("O2");
    expect(result.elements).toEqual({ O: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses Fe correctly", () => {
    const result = parseFormula("Fe");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses NaCl correctly", () => {
    const result = parseFormula("NaCl");
    expect(result.elements).toEqual({ Na: 1, Cl: 1 });
    expect(result.charge).toBe(0);
  });
});

describe("parseFormula subscripts and multipliers", () => {
  it("parses multi-digit subscript CaCO3", () => {
    const result = parseFormula("CaCO3");
    expect(result.elements).toEqual({ Ca: 1, C: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("parses hydrate multiplier 5H2O via parseFormula", () => {
    const result = parseFormula("5H2O");
    expect(result.elements).toEqual({ H: 10, O: 5 });
    expect(result.charge).toBe(0);
  });

  it("parses formula with subscript 12 (C12H22O11)", () => {
    const result = parseFormula("C12H22O11");
    expect(result.elements).toEqual({ C: 12, H: 22, O: 11 });
    expect(result.charge).toBe(0);
  });

  it("parses single element without subscript (Fe -> Fe:1)", () => {
    const result = parseFormula("Fe");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(0);
  });
});

describe("parseFormula parenthetical groups", () => {
  it("parses (OH)2 correctly", () => {
    const result = parseFormula("(OH)2");
    expect(result.elements).toEqual({ O: 2, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses (PO4)2 correctly", () => {
    const result = parseFormula("(PO4)2");
    expect(result.elements).toEqual({ P: 2, O: 8 });
    expect(result.charge).toBe(0);
  });

  it("parses (NH4)2 correctly", () => {
    const result = parseFormula("(NH4)2");
    expect(result.elements).toEqual({ N: 2, H: 8 });
    expect(result.charge).toBe(0);
  });

  it("parses Ca3(PO4)2 correctly", () => {
    const result = parseFormula("Ca3(PO4)2");
    expect(result.elements).toEqual({ Ca: 3, P: 2, O: 8 });
    expect(result.charge).toBe(0);
  });
});

describe("parseFormula square bracket groups", () => {
  it("parses [Fe(CN)6] correctly", () => {
    const result = parseFormula("[Fe(CN)6]");
    expect(result.elements).toEqual({ Fe: 1, C: 6, N: 6 });
    expect(result.charge).toBe(0);
  });

  it("parses [Co(NH3)6] correctly", () => {
    const result = parseFormula("[Co(NH3)6]");
    expect(result.elements).toEqual({ Co: 1, N: 6, H: 18 });
    expect(result.charge).toBe(0);
  });

  it("parses K4[Fe(CN)6] correctly", () => {
    const result = parseFormula("K4[Fe(CN)6]");
    expect(result.elements).toEqual({ K: 4, Fe: 1, C: 6, N: 6 });
    expect(result.charge).toBe(0);
  });
});

describe("parseFormula charge notation", () => {
  it("parses Fe2+ correctly", () => {
    const result = parseFormula("Fe2+");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(2);
  });

  it("parses Fe3+ correctly", () => {
    const result = parseFormula("Fe3+");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(3);
  });

  it("parses SO4^2- correctly", () => {
    const result = parseFormula("SO4^2-");
    expect(result.elements).toEqual({ S: 1, O: 4 });
    expect(result.charge).toBe(-2);
  });

  it("parses O2- correctly", () => {
    const result = parseFormula("O2-");
    expect(result.elements).toEqual({ O: 1 });
    expect(result.charge).toBe(-2);
  });
});

describe("parseFormula electron notation", () => {
  it("parses e- correctly", () => {
    const result = parseFormula("e-");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(-1);
  });

  it("parses e correctly", () => {
    const result = parseFormula("e");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(-1);
  });

  it("parses e+ correctly", () => {
    const result = parseFormula("e+");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(1);
  });

  it("parses MnO4- correctly", () => {
    const result = parseFormula("MnO4-");
    expect(result.elements).toEqual({ Mn: 1, O: 4 });
    expect(result.charge).toBe(-1);
  });
});
