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
