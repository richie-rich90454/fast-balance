import { describe, it, expect } from "vitest";
import { parseFormula, parseWithoutMultiplier } from "../index";

describe("transition metal formulas", () => {
  it("parses AgNO3 (silver nitrate)", () => {
    const r = parseFormula("AgNO3");
    expect(r.elements).toEqual({ Ag: 1, N: 1, O: 3 });
    expect(r.charge).toBe(0);
  });
  it("parses AuCl3 (gold chloride)", () => {
    const r = parseFormula("AuCl3");
    expect(r.elements).toEqual({ Au: 1, Cl: 3 });
    expect(r.charge).toBe(0);
  });
  it("parses PtCl4 (platinum chloride)", () => {
    const r = parseFormula("PtCl4");
    expect(r.elements).toEqual({ Pt: 1, Cl: 4 });
    expect(r.charge).toBe(0);
  });
  it("parses PdCl2 (palladium chloride)", () => {
    const r = parseFormula("PdCl2");
    expect(r.elements).toEqual({ Pd: 1, Cl: 2 });
    expect(r.charge).toBe(0);
  });
  it("parses Hg2Cl2 (calomel)", () => {
    const r = parseFormula("Hg2Cl2");
    expect(r.elements).toEqual({ Hg: 2, Cl: 2 });
    expect(r.charge).toBe(0);
  });
  it("parses Ni(OH)2 (nickel hydroxide)", () => {
    const r = parseFormula("Ni(OH)2");
    expect(r.elements).toEqual({ Ni: 1, O: 2, H: 2 });
    expect(r.charge).toBe(0);
  });
  it("parses CoCl2 (cobalt chloride)", () => {
    const r = parseFormula("CoCl2");
    expect(r.elements).toEqual({ Co: 1, Cl: 2 });
    expect(r.charge).toBe(0);
  });
  it("parses SnCl2 (tin chloride)", () => {
    const r = parseFormula("SnCl2");
    expect(r.elements).toEqual({ Sn: 1, Cl: 2 });
    expect(r.charge).toBe(0);
  });
});

describe("rare and special elements", () => {
  it("parses UO2 (uranium dioxide)", () => {
    const r = parseFormula("UO2");
    expect(r.elements).toEqual({ U: 1, O: 2 });
  });
  it("parses TiO2 (titanium dioxide)", () => {
    const r = parseFormula("TiO2");
    expect(r.elements).toEqual({ Ti: 1, O: 2 });
  });
  it("parses V2O5 (vanadium pentoxide)", () => {
    const r = parseFormula("V2O5");
    expect(r.elements).toEqual({ V: 2, O: 5 });
  });
  it("parses Cr2O3 (chromium oxide)", () => {
    const r = parseFormula("Cr2O3");
    expect(r.elements).toEqual({ Cr: 2, O: 3 });
  });
  it("parses MnO2 (manganese dioxide)", () => {
    const r = parseFormula("MnO2");
    expect(r.elements).toEqual({ Mn: 1, O: 2 });
  });
  it("parses MoO3 (molybdenum trioxide)", () => {
    const r = parseFormula("MoO3");
    expect(r.elements).toEqual({ Mo: 1, O: 3 });
  });
  it("parses WO3 (tungsten trioxide)", () => {
    const r = parseFormula("WO3");
    expect(r.elements).toEqual({ W: 1, O: 3 });
  });
});

describe("charge notation variations", () => {
  it("parses Na+ (single plus)", () => {
    const r = parseFormula("Na+");
    expect(r.elements).toEqual({ Na: 1 });
    expect(r.charge).toBe(1);
  });
  it("parses Ca2+ (number plus)", () => {
    const r = parseFormula("Ca2+");
    expect(r.elements).toEqual({ Ca: 1 });
    expect(r.charge).toBe(2);
  });
  it("parses Al3+ (number plus)", () => {
    const r = parseFormula("Al3+");
    expect(r.elements).toEqual({ Al: 1 });
    expect(r.charge).toBe(3);
  });
  it("parses Cl- (single minus)", () => {
    const r = parseFormula("Cl-");
    expect(r.elements).toEqual({ Cl: 1 });
    expect(r.charge).toBe(-1);
  });
  it("parses O2- (number minus)", () => {
    const r = parseFormula("O2-");
    expect(r.elements).toEqual({ O: 1 });
    expect(r.charge).toBe(-2);
  });
  it("parses N3- (number minus)", () => {
    const r = parseFormula("N3-");
    expect(r.elements).toEqual({ N: 1 });
    expect(r.charge).toBe(-3);
  });
  it("parses SO4^2- (caret notation)", () => {
    const r = parseFormula("SO4^2-");
    expect(r.elements).toEqual({ S: 1, O: 4 });
    expect(r.charge).toBe(-2);
  });
  it("parses PO4^3- (caret notation)", () => {
    const r = parseFormula("PO4^3-");
    expect(r.elements).toEqual({ P: 1, O: 4 });
    expect(r.charge).toBe(-3);
  });
});

describe("complex polyatomic ions", () => {
  it("parses Cr2O7^2- (dichromate)", () => {
    const r = parseFormula("Cr2O7^2-");
    expect(r.elements).toEqual({ Cr: 2, O: 7 });
    expect(r.charge).toBe(-2);
  });
  it("parses MnO4- (permanganate)", () => {
    const r = parseFormula("MnO4-");
    expect(r.elements).toEqual({ Mn: 1, O: 4 });
    expect(r.charge).toBe(-1);
  });
  it("parses C2O4^2- (oxalate)", () => {
    const r = parseFormula("C2O4^2-");
    expect(r.elements).toEqual({ C: 2, O: 4 });
    expect(r.charge).toBe(-2);
  });
  it("parses CH3COO- (acetate)", () => {
    const r = parseFormula("CH3COO-");
    expect(r.elements.C).toBe(2);
    expect(r.elements.H).toBe(3);
    expect(r.elements.O).toBe(2);
    expect(r.charge).toBe(-1);
  });
  it("parses HCO3- (bicarbonate)", () => {
    const r = parseFormula("HCO3-");
    expect(r.elements).toEqual({ H: 1, C: 1, O: 3 });
    expect(r.charge).toBe(-1);
  });
  it("parses HSO4- (bisulfate)", () => {
    const r = parseFormula("HSO4-");
    expect(r.elements).toEqual({ H: 1, S: 1, O: 4 });
    expect(r.charge).toBe(-1);
  });
});

describe("multiple group nesting", () => {
  it("parses Mg3(PO4)2 with subscript after group", () => {
    const r = parseFormula("Mg3(PO4)2");
    expect(r.elements).toEqual({ Mg: 3, P: 2, O: 8 });
  });
  it("parses (NH4)2SO4 with group before element", () => {
    const r = parseFormula("(NH4)2SO4");
    expect(r.elements).toEqual({ N: 2, H: 8, S: 1, O: 4 });
  });
  it("parses Al2(SO4)3 with multi-subscript group", () => {
    const r = parseFormula("Al2(SO4)3");
    expect(r.elements).toEqual({ Al: 2, S: 3, O: 12 });
  });
  it("parses Ba(NO3)2", () => {
    const r = parseFormula("Ba(NO3)2");
    expect(r.elements).toEqual({ Ba: 1, N: 2, O: 6 });
  });
  it("parses Fe4[Fe(CN)6]3 (Prussian blue)", () => {
    const r = parseFormula("Fe4[Fe(CN)6]3");
    expect(r.elements.Fe).toBe(7);
    expect(r.elements.C).toBe(18);
    expect(r.elements.N).toBe(18);
  });
  it("parses Na2CO3*10H2O (hydrate with asterisk)", () => {
    const r = parseFormula("Na2CO3*10H2O");
    expect(r.elements).toEqual({ Na: 2, C: 1, O: 13, H: 20 });
  });
});

describe("parseFormula error conditions", () => {
  it("throws on mismatched opening parenthesis", () => {
    expect(() => parseFormula("(OH")).toThrow();
  });
  it("throws on mismatched closing parenthesis", () => {
    expect(() => parseFormula("OH)")).toThrow();
  });
  it("throws on mismatched opening bracket", () => {
    expect(() => parseFormula("[Fe(CN)6")).toThrow();
  });
  it("throws on unexpected characters", () => {
    expect(() => parseFormula("H2@O")).toThrow();
  });
  it("throws on lowercase starting character", () => {
    expect(() => parseFormula("h2o")).toThrow();
  });
  it("throws on numbers at start without valid formula", () => {
    expect(() => parseFormula("123")).toThrow();
  });
});
