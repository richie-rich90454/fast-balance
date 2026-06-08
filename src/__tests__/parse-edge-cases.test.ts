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
