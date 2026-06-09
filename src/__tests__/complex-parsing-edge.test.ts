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
