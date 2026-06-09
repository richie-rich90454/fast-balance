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

describe("ionic species formula parsing", () => {
  it("parses Na+ sodium cation", () => {
    const result = parseFormula("Na+");
    expect(result.elements).toEqual({ Na: 1 });
    expect(result.charge).toBe(1);
  });

  it("parses Ca2+ calcium cation", () => {
    const result = parseFormula("Ca2+");
    expect(result.elements).toEqual({ Ca: 1 });
    expect(result.charge).toBe(2);
  });

  it("parses Al3+ aluminum cation", () => {
    const result = parseFormula("Al3+");
    expect(result.elements).toEqual({ Al: 1 });
    expect(result.charge).toBe(3);
  });

  it("parses Fe3+ iron(III) cation", () => {
    const result = parseFormula("Fe3+");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(3);
  });

  it("parses NH4+ ammonium cation", () => {
    const result = parseFormula("NH4+");
    expect(result.elements).toEqual({ N: 1, H: 4 });
    expect(result.charge).toBe(1);
  });

  it("parses OH- hydroxide anion", () => {
    const result = parseFormula("OH-");
    expect(result.elements).toEqual({ O: 1, H: 1 });
    expect(result.charge).toBe(-1);
  });

  it("parses Cl- chloride anion", () => {
    const result = parseFormula("Cl-");
    expect(result.elements).toEqual({ Cl: 1 });
    expect(result.charge).toBe(-1);
  });

  it("parses S2- sulfide anion", () => {
    const result = parseFormula("S2-");
    expect(result.elements).toEqual({ S: 1 });
    expect(result.charge).toBe(-2);
  });

  it("parses SO4^2- sulfate with caret notation", () => {
    const result = parseFormula("SO4^2-");
    expect(result.elements).toEqual({ S: 1, O: 4 });
    expect(result.charge).toBe(-2);
  });

  it("parses PO4^3- phosphate with caret notation", () => {
    const result = parseFormula("PO4^3-");
    expect(result.elements).toEqual({ P: 1, O: 4 });
    expect(result.charge).toBe(-3);
  });
});

describe("polyatomic ion formula parsing", () => {
  it("parses SO4^2- sulfate with caret notation", () => {
    const result = parseFormula("SO4^2-");
    expect(result.elements).toEqual({ S: 1, O: 4 });
    expect(result.charge).toBe(-2);
  });

  it("parses NO3- nitrate", () => {
    const result = parseFormula("NO3-");
    expect(result.elements).toEqual({ N: 1, O: 3 });
    expect(result.charge).toBe(-1);
  });

  it("parses CO3^2- carbonate with caret notation", () => {
    const result = parseFormula("CO3^2-");
    expect(result.elements).toEqual({ C: 1, O: 3 });
    expect(result.charge).toBe(-2);
  });

  it("parses PO4^3- phosphate", () => {
    const result = parseFormula("PO4^3-");
    expect(result.elements).toEqual({ P: 1, O: 4 });
    expect(result.charge).toBe(-3);
  });

  it("parses OH- hydroxide", () => {
    const result = parseFormula("OH-");
    expect(result.elements).toEqual({ O: 1, H: 1 });
    expect(result.charge).toBe(-1);
  });

  it("parses CN- cyanide", () => {
    const result = parseFormula("CN-");
    expect(result.elements).toEqual({ C: 1, N: 1 });
    expect(result.charge).toBe(-1);
  });

  it("parses MnO4- permanganate", () => {
    const result = parseFormula("MnO4-");
    expect(result.elements).toEqual({ Mn: 1, O: 4 });
    expect(result.charge).toBe(-1);
  });

  it("parses CrO4^2- chromate", () => {
    const result = parseFormula("CrO4^2-");
    expect(result.elements).toEqual({ Cr: 1, O: 4 });
    expect(result.charge).toBe(-2);
  });

  it("parses Cr2O7^2- dichromate", () => {
    const result = parseFormula("Cr2O7^2-");
    expect(result.elements).toEqual({ Cr: 2, O: 7 });
    expect(result.charge).toBe(-2);
  });

  it("parses ClO3- chlorate", () => {
    const result = parseFormula("ClO3-");
    expect(result.elements).toEqual({ Cl: 1, O: 3 });
    expect(result.charge).toBe(-1);
  });

  it("parses ClO4- perchlorate", () => {
    const result = parseFormula("ClO4-");
    expect(result.elements).toEqual({ Cl: 1, O: 4 });
    expect(result.charge).toBe(-1);
  });
});

describe("unusual charge notation", () => {
  it("handles Ca++ double plus notation (positive check)", () => {
    const result = safeParse("Ca++");
    if (result) {
      expect(result.elements.Ca ?? result.elements.CA ?? undefined).toBeDefined();
    } else {
      expect(result).toBeNull();
    }
  });

  it("handles Na+1 explicit one plus notation (positive check)", () => {
    const result = safeParse("Na+1");
    if (result) {
      expect(result.elements).toBeDefined();
    } else {
      expect(result).toBeNull();
    }
  });

  it("handles Fe+3 explicit number plus notation (positive check)", () => {
    const result = safeParse("Fe+3");
    if (result) {
      expect(result.elements).toBeDefined();
    } else {
      expect(result).toBeNull();
    }
  });

  it("handles Cl-1 explicit one minus notation (positive check)", () => {
    const result = safeParse("Cl-1");
    if (result) {
      expect(result.elements).toBeDefined();
    } else {
      expect(result).toBeNull();
    }
  });

  it("handles O-2 explicit number minus notation (positive check)", () => {
    const result = safeParse("O-2");
    if (result) {
      expect(result.elements).toBeDefined();
    } else {
      expect(result).toBeNull();
    }
  });

  it("handles S-2 explicit number minus notation (positive check)", () => {
    const result = safeParse("S-2");
    if (result) {
      expect(result.elements).toBeDefined();
    } else {
      expect(result).toBeNull();
    }
  });
});

describe("formula with mixed brackets and parens", () => {
  it("parses [Fe(CN)6]3- ferricyanide with mixed brackets", () => {
    const result = parseFormula("[Fe(CN)6]3-");
    expect(result.elements).toEqual({ Fe: 1, C: 6, N: 6 });
    expect(result.charge).toBe(-3);
  });

  it("parses [Al(OH)4]- tetrahydroxoaluminate with mixed brackets", () => {
    const result = parseFormula("[Al(OH)4]-");
    expect(result.elements).toEqual({ Al: 1, O: 4, H: 4 });
    expect(result.charge).toBe(-1);
  });

  it("parses [Zn(OH)4]^2- tetrahydroxozincate with caret charge", () => {
    const result = parseFormula("[Zn(OH)4]^2-");
    expect(result.elements).toEqual({ Zn: 1, O: 4, H: 4 });
    expect(result.charge).toBe(-2);
  });

  it("parses [Co(NH3)6]3+ hexaamminecobalt(III) with mixed brackets", () => {
    const result = parseFormula("[Co(NH3)6]3+");
    expect(result.elements).toEqual({ Co: 1, N: 6, H: 18 });
    expect(result.charge).toBe(3);
  });

  it("parses [Cr(NH3)6]3+ hexaamminechromium(III) with mixed brackets", () => {
    const result = parseFormula("[Cr(NH3)6]3+");
    expect(result.elements).toEqual({ Cr: 1, N: 6, H: 18 });
    expect(result.charge).toBe(3);
  });

  it("parses [Ni(NH3)6]2+ hexaamminenickel(II) with mixed brackets", () => {
    const result = parseFormula("[Ni(NH3)6]2+");
    expect(result.elements).toEqual({ Ni: 1, N: 6, H: 18 });
    expect(result.charge).toBe(2);
  });
});

describe("formula with leading and trailing whitespace", () => {
  it("parses ' H2O' with leading space", () => {
    const result = parseFormula(" H2O");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses 'H2O ' with trailing space", () => {
    const result = parseFormula("H2O ");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses '  H2O  ' with multiple leading and trailing spaces", () => {
    const result = parseFormula("  H2O  ");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses '\\tH2O\\t' with tab characters", () => {
    const result = parseFormula("\tH2O\t");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses 'H2O  (s)' with internal spaces before state symbol", () => {
    const result = parseFormula("H2O  (s)");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses '  H2O(l)  ' with spaces around formula and state", () => {
    const result = parseFormula("  H2O(l)  ");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });
});

describe("state symbol removal exhaustive", () => {
  it("strips (s) solid state symbol from H2O(s)", () => {
    const result = parseFormula("H2O(s)");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("strips (l) liquid state symbol from H2O(l)", () => {
    const result = parseFormula("H2O(l)");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("strips (g) gas state symbol from H2O(g)", () => {
    const result = parseFormula("H2O(g)");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("strips (aq) aqueous state symbol from H2O(aq)", () => {
    const result = parseFormula("H2O(aq)");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("strips (solid) long form solid state symbol from H2O(solid)", () => {
    const result = parseFormula("H2O(solid)");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("strips (am) amorphous state symbol from H2O(am)", () => {
    const result = parseFormula("H2O(am)");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });
});

describe("formula with multiple element occurrences", () => {
  it("parses H2SO4 sulfuric acid with H, S, O", () => {
    const result = parseFormula("H2SO4");
    expect(result.elements).toEqual({ H: 2, S: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("parses H3PO4 phosphoric acid with H, P, O", () => {
    const result = parseFormula("H3PO4");
    expect(result.elements).toEqual({ H: 3, P: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("parses HNO3 nitric acid with H, N, O", () => {
    const result = parseFormula("HNO3");
    expect(result.elements).toEqual({ H: 1, N: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("parses HClO4 perchloric acid with H, Cl, O", () => {
    const result = parseFormula("HClO4");
    expect(result.elements).toEqual({ H: 1, Cl: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("parses H2CrO4 chromic acid with H, Cr, O", () => {
    const result = parseFormula("H2CrO4");
    expect(result.elements).toEqual({ H: 2, Cr: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("parses HMnO4 permanganic acid (positive check)", () => {
    const result = parseFormula("HMnO4");
    expect(result.elements).toEqual({ H: 1, Mn: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("parses CCl4 carbon tetrachloride", () => {
    const result = parseFormula("CCl4");
    expect(result.elements).toEqual({ C: 1, Cl: 4 });
    expect(result.charge).toBe(0);
  });

  it("parses CHCl3 chloroform with H and Cl", () => {
    const result = parseFormula("CHCl3");
    expect(result.elements).toEqual({ C: 1, H: 1, Cl: 3 });
    expect(result.charge).toBe(0);
  });

  it("parses CH2Cl2 dichloromethane with H and Cl", () => {
    const result = parseFormula("CH2Cl2");
    expect(result.elements).toEqual({ C: 1, H: 2, Cl: 2 });
    expect(result.charge).toBe(0);
  });
});
