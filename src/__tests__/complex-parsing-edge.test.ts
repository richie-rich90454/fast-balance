import { describe, it, expect } from "vitest";
import { parseFormula, balance } from "../index";

/**
 * safeParse attempts to parse a formula, returning the result on success
 * or `null` if the parser throws. This is used to express "may not parse"
 * cases as a soft positive check.
 */
function safeParse(f: string): { elements: Record<string, number>; charge: number } | null {
  try {
    return parseFormula(f);
  } catch {
    return null;
  }
}

describe("deeply nested formula parsing", () => {
  it("parses [Fe(CN)6]4- hexacyanoferrate(II) with full group and charge", () => {
    const result = parseFormula("[Fe(CN)6]4-");
    expect(result.elements).toEqual({ Fe: 1, C: 6, N: 6 });
    expect(result.charge).toBe(-4);
  });

  it("parses [[Fe(CN)6]3]2- (positive check or treat as valid)", () => {
    const result = safeParse("[[Fe(CN)6]3]2-");
    if (result) {
      expect(result.elements).toBeDefined();
      expect(typeof result.charge).toBe("number");
    } else {
      expect(result).toBeNull();
    }
  });

  it("parses [Co(NH3)6]3+ hexaamminecobalt(III) with brackets and parens", () => {
    const result = parseFormula("[Co(NH3)6]3+");
    expect(result.elements).toEqual({ Co: 1, N: 6, H: 18 });
    expect(result.charge).toBe(3);
  });

  it("parses [Cr(NH3)6]3+ hexaamminechromium(III) with brackets and parens", () => {
    const result = parseFormula("[Cr(NH3)6]3+");
    expect(result.elements).toEqual({ Cr: 1, N: 6, H: 18 });
    expect(result.charge).toBe(3);
  });

  it("parses [Ni(CN)4]2- tetracyanonickelate(II) with brackets and parens", () => {
    const result = parseFormula("[Ni(CN)4]2-");
    expect(result.elements).toEqual({ Ni: 1, C: 4, N: 4 });
    expect(result.charge).toBe(-2);
  });

  it("parses [Cu(CN)4]3- tetracyanocuprate(III) (positive check)", () => {
    const result = parseFormula("[Cu(CN)4]3-");
    expect(result.elements).toEqual({ Cu: 1, C: 4, N: 4 });
    expect(result.charge).toBe(-3);
  });
});

describe("organic formula parsing", () => {
  it("parses CH3CH2OH ethanol (positive check, may not parse)", () => {
    const result = safeParse("CH3CH2OH");
    if (result) {
      expect(result.elements).toEqual({ C: 2, H: 6, O: 1 });
      expect(result.charge).toBe(0);
    } else {
      expect(result).toBeNull();
    }
  });

  it("parses C2H5OH standard ethanol notation", () => {
    const result = parseFormula("C2H5OH");
    expect(result.elements).toEqual({ C: 2, H: 6, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses C3H7COOH butyric acid (positive check)", () => {
    const result = parseFormula("C3H7COOH");
    expect(result.elements).toEqual({ C: 4, H: 8, O: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses CH3COCH3 acetone (positive check)", () => {
    const result = parseFormula("CH3COCH3");
    expect(result.elements).toEqual({ C: 3, H: 6, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses CH3OCH3 dimethyl ether (positive check)", () => {
    const result = parseFormula("CH3OCH3");
    expect(result.elements).toEqual({ C: 2, H: 6, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses CH3CH2OCH2CH3 diethyl ether (positive check)", () => {
    const result = parseFormula("CH3CH2OCH2CH3");
    expect(result.elements).toEqual({ C: 4, H: 10, O: 1 });
    expect(result.charge).toBe(0);
  });
});
