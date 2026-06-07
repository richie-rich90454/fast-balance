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
