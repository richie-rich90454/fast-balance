import { describe, it, expect } from "vitest";
import { balance, parseFormula, splitEquation, buildMatrix, solveSystem, fractionsToIntegers, gcd, lcm, stripStateSymbols, Fraction } from "../index";

/* ============================================================
 * 1. showOne option variations (15 tests)
 * ============================================================ */
describe("showOne option variations", () => {
  it("showOne=true shows '1 ' prefix for coefficient=1", () => {
    const r = balance("H2 + O2 -> H2O", { showOne: true });
    expect(r.equation).toBe("2 H2 + 1 O2 -> 2 H2O");
  });

  it("showOne=false omits '1 ' prefix for coefficient=1", () => {
    const r = balance("H2 + O2 -> H2O", { showOne: false });
    expect(r.equation).toBe("2 H2 + O2 -> 2 H2O");
  });

  it("showOne=true with all coefficients=1", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O", { showOne: true });
    expect(r.equation).toBe("1 HCl + 1 NaOH -> 1 NaCl + 1 H2O");
  });

  it("showOne=false with all coefficients=1", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O", { showOne: false });
    expect(r.equation).toBe("HCl + NaOH -> NaCl + H2O");
  });

  it("showOne=true mixed coefficients", () => {
    const r = balance("N2 + H2 -> NH3", { showOne: true });
    expect(r.equation).toBe("1 N2 + 3 H2 -> 2 NH3");
  });

  it("showOne=false mixed coefficients", () => {
    const r = balance("N2 + H2 -> NH3", { showOne: false });
    expect(r.equation).toBe("N2 + 3 H2 -> 2 NH3");
  });

  it("showOne=true with combustion reaction", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O", { showOne: true });
    expect(r.equation).toBe("1 CH4 + 2 O2 -> 1 CO2 + 2 H2O");
  });

  it("showOne=false with combustion reaction", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O", { showOne: false });
    expect(r.equation).toBe("CH4 + 2 O2 -> CO2 + 2 H2O");
  });

  it("showOne=true default value is true", () => {
    const r = balance("Fe + O2 -> Fe2O3");
    expect(r.equation).toBe("4 Fe + 3 O2 -> 2 Fe2O3");
  });

  it("showOne=false with redox half-reaction", () => {
    const r = balance("MnO4- + H+ + e- -> Mn2+ + H2O", { showOne: false });
    expect(r.equation).toBe("MnO4- + 8 H+ + 5 e- -> Mn2+ + 4 H2O");
  });

  it("showOne=true with redox half-reaction", () => {
    const r = balance("MnO4- + H+ + e- -> Mn2+ + H2O", { showOne: true });
    expect(r.equation).toBe("1 MnO4- + 8 H+ + 5 e- -> 1 Mn2+ + 4 H2O");
  });

  it("showOne=false with hydrate reaction", () => {
    const r = balance("CuSO4 + H2O -> CuSO4·5H2O", { showOne: false });
    expect(r.equation).toBe("CuSO4 + 5 H2O -> CuSO4·5H2O");
  });

  it("showOne=true with hydrate reaction", () => {
    const r = balance("CuSO4 + H2O -> CuSO4·5H2O", { showOne: true });
    expect(r.equation).toBe("1 CuSO4 + 5 H2O -> 1 CuSO4·5H2O");
  });

  it("showOne=false with ionic equation", () => {
    const r = balance("Fe2+ + Cl- -> FeCl2", { showOne: false });
    expect(r.equation).toBe("Fe2+ + 2 Cl- -> FeCl2");
  });

  it("showOne=true with ionic equation", () => {
    const r = balance("Fe2+ + Cl- -> FeCl2", { showOne: true });
    expect(r.equation).toBe("1 Fe2+ + 2 Cl- -> 1 FeCl2");
  });
});

/* ============================================================
 * 2. text format output (10 tests)
 * ============================================================ */
describe("text format output", () => {
  it("text format uses ' -> ' arrow", () => {
    const r = balance("H2 + O2 -> H2O", { format: "text" });
    expect(r.equation).toContain(" -> ");
  });

  it("text format default is text", () => {
    const r = balance("H2 + O2 -> H2O");
    expect(r.equation).toContain(" -> ");
  });

  it("text format with simple reaction", () => {
    const r = balance("Na + Cl2 -> NaCl", { format: "text", showOne: false });
    expect(r.equation).toBe("2 Na + Cl2 -> 2 NaCl");
  });

  it("text format with decomposition", () => {
    const r = balance("H2O2 -> H2O + O2", { format: "text", showOne: false });
    expect(r.equation).toBe("2 H2O2 -> 2 H2O + O2");
  });

  it("text format with multiple reactants", () => {
    const r = balance("CaCO3 + HCl -> CaCl2 + CO2 + H2O", { format: "text", showOne: false });
    expect(r.equation).toBe("CaCO3 + 2 HCl -> CaCl2 + CO2 + H2O");
  });

  it("text format with state symbols stripped", () => {
    const r = balance("H2(g) + O2(g) -> H2O(l)", { format: "text", showOne: false });
    expect(r.equation).toBe("2 H2 + O2 -> 2 H2O");
  });

  it("text format preserves original formula in result", () => {
    const r = balance("Fe + O2 -> Fe2O3", { format: "text" });
    expect(r.reactants[0].formula).toBe("Fe");
    expect(r.reactants[1].formula).toBe("O2");
    expect(r.products[0].formula).toBe("Fe2O3");
  });

  it("text format coefficient array correct", () => {
    const r = balance("Al + O2 -> Al2O3", { format: "text" });
    expect(r.reactants.map(s => s.coefficient)).toEqual([4, 3]);
    expect(r.products.map(s => s.coefficient)).toEqual([2]);
  });

  it("text format with arrow style input still outputs ' -> '", () => {
    const r = balance("H2 + O2 → H2O", { format: "text", showOne: false });
    expect(r.equation).toBe("2 H2 + O2 -> 2 H2O");
  });

  it("text format equation is string type", () => {
    const r = balance("C + O2 -> CO2", { format: "text" });
    expect(typeof r.equation).toBe("string");
  });
});

/* ============================================================
 * 3. html format output (10 tests)
 * ============================================================ */
describe("html format output", () => {
  it("html format uses ' &rarr; ' arrow", () => {
    const r = balance("H2 + O2 -> H2O", { format: "html" });
    expect(r.equation).toContain(" &rarr; ");
  });

  it("html format with simple reaction", () => {
    const r = balance("H2 + O2 -> H2O", { format: "html", showOne: false });
    expect(r.equation).toBe("2 H2 + O2 &rarr; 2 H2O");
  });

  it("html format with showOne=false", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O", { format: "html", showOne: false });
    expect(r.equation).toBe("HCl + NaOH &rarr; NaCl + H2O");
  });

  it("html format with showOne=true", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O", { format: "html", showOne: true });
    expect(r.equation).toBe("1 HCl + 1 NaOH &rarr; 1 NaCl + 1 H2O");
  });

  it("html format with combustion", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O", { format: "html", showOne: false });
    expect(r.equation).toBe("CH4 + 2 O2 &rarr; CO2 + 2 H2O");
  });

  it("html format with decomposition", () => {
    const r = balance("CaCO3 -> CaO + CO2", { format: "html", showOne: false });
    expect(r.equation).toBe("CaCO3 &rarr; CaO + CO2");
  });

  it("html format with synthesis", () => {
    const r = balance("Na + Cl2 -> NaCl", { format: "html", showOne: false });
    expect(r.equation).toBe("2 Na + Cl2 &rarr; 2 NaCl");
  });

  it("html format with displacement", () => {
    const r = balance("Zn + HCl -> ZnCl2 + H2", { format: "html", showOne: false });
    expect(r.equation).toBe("Zn + 2 HCl &rarr; ZnCl2 + H2");
  });

  it("html format with ionic species", () => {
    const r = balance("Fe3+ + OH- -> Fe(OH)3", { format: "html", showOne: false });
    expect(r.equation).toBe("Fe3+ + 3 OH- &rarr; Fe(OH)3");
  });

  it("html format does NOT contain ' -> ' or '\\rightarrow '", () => {
    const r = balance("N2 + H2 -> NH3", { format: "html" });
    expect(r.equation).not.toContain(" -> ");
    expect(r.equation).not.toContain("\\rightarrow");
  });
});

/* ============================================================
 * 4. latex format output (10 tests)
 * ============================================================ */
describe("latex format output", () => {
  it("latex format uses ' \\rightarrow ' arrow", () => {
    const r = balance("H2 + O2 -> H2O", { format: "latex" });
    expect(r.equation).toContain(" \\rightarrow ");
  });

  it("latex format with simple reaction", () => {
    const r = balance("H2 + O2 -> H2O", { format: "latex", showOne: false });
    expect(r.equation).toBe("2 H2 + O2 \\rightarrow 2 H2O");
  });

  it("latex format with showOne=false", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O", { format: "latex", showOne: false });
    expect(r.equation).toBe("HCl + NaOH \\rightarrow NaCl + H2O");
  });

  it("latex format with showOne=true", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O", { format: "latex", showOne: true });
    expect(r.equation).toBe("1 HCl + 1 NaOH \\rightarrow 1 NaCl + 1 H2O");
  });

  it("latex format with combustion", () => {
    const r = balance("C2H6 + O2 -> CO2 + H2O", { format: "latex" });
    expect(r.equation).toBe("2 C2H6 + 7 O2 \\rightarrow 4 CO2 + 6 H2O");
  });

  it("latex format with redox", () => {
    const r = balance("Fe + O2 -> Fe2O3", { format: "latex" });
    expect(r.equation).toBe("4 Fe + 3 O2 \\rightarrow 2 Fe2O3");
  });

  it("latex format with double displacement", () => {
    const r = balance("AgNO3 + NaCl -> AgCl + NaNO3", { format: "latex", showOne: false });
    expect(r.equation).toBe("AgNO3 + NaCl \\rightarrow AgCl + NaNO3");
  });

  it("latex format with acid-base", () => {
    const r = balance("H2SO4 + NaOH -> Na2SO4 + H2O", { format: "latex", showOne: false });
    expect(r.equation).toBe("H2SO4 + 2 NaOH \\rightarrow Na2SO4 + 2 H2O");
  });

  it("latex format with multiple products", () => {
    const r = balance("KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O", { format: "latex" });
    expect(r.equation).toBe("2 KMnO4 + 16 HCl \\rightarrow 2 KCl + 2 MnCl2 + 5 Cl2 + 8 H2O");
  });

  it("latex format does NOT contain ' -> ' or '&rarr;'", () => {
    const r = balance("N2 + H2 -> NH3", { format: "latex" });
    expect(r.equation).not.toContain(" -> ");
    expect(r.equation).not.toContain("&rarr;");
  });
});

/* ============================================================
 * 5. Arrow style consistency (10 tests)
 * ============================================================ */
describe("arrow style consistency", () => {
  it("same reaction with '->' and '→' produces same coefficients", () => {
    const r1 = balance("H2 + O2 -> H2O");
    const r2 = balance("H2 + O2 → H2O");
    expect(r1.reactants.map(s => s.coefficient)).toEqual(r2.reactants.map(s => s.coefficient));
    expect(r1.products.map(s => s.coefficient)).toEqual(r2.products.map(s => s.coefficient));
  });

  it("same reaction with '->' and '⇌' produces same coefficients", () => {
    const r1 = balance("N2 + H2 -> NH3");
    const r2 = balance("N2 + H2 ⇌ NH3");
    expect(r1.reactants.map(s => s.coefficient)).toEqual(r2.reactants.map(s => s.coefficient));
    expect(r1.products.map(s => s.coefficient)).toEqual(r2.products.map(s => s.coefficient));
  });

  it("same reaction with '->' and '<=>' produces same coefficients", () => {
    const r1 = balance("CO + H2O -> CO2 + H2");
    const r2 = balance("CO + H2O <=> CO2 + H2");
    expect(r1.reactants.map(s => s.coefficient)).toEqual(r2.reactants.map(s => s.coefficient));
    expect(r1.products.map(s => s.coefficient)).toEqual(r2.products.map(s => s.coefficient));
  });

  it("same reaction with '->' and '<->' produces same coefficients", () => {
    const r1 = balance("SO2 + O2 -> SO3");
    const r2 = balance("SO2 + O2 <-> SO3");
    expect(r1.reactants.map(s => s.coefficient)).toEqual(r2.reactants.map(s => s.coefficient));
    expect(r1.products.map(s => s.coefficient)).toEqual(r2.products.map(s => s.coefficient));
  });

  it("same reaction with '->' and '⇒' produces same coefficients", () => {
    const r1 = balance("CH4 + O2 -> CO2 + H2O");
    const r2 = balance("CH4 + O2 ⇒ CO2 + H2O");
    expect(r1.reactants.map(s => s.coefficient)).toEqual(r2.reactants.map(s => s.coefficient));
    expect(r1.products.map(s => s.coefficient)).toEqual(r2.products.map(s => s.coefficient));
  });

  it("same reaction with '->' and '-->' produces same coefficients", () => {
    const r1 = balance("Fe + O2 -> Fe2O3");
    const r2 = balance("Fe + O2 --> Fe2O3");
    expect(r1.reactants.map(s => s.coefficient)).toEqual(r2.reactants.map(s => s.coefficient));
    expect(r1.products.map(s => s.coefficient)).toEqual(r2.products.map(s => s.coefficient));
  });

  it("same reaction with '->' and '=' produces same coefficients", () => {
    const r1 = balance("Al + HCl -> AlCl3 + H2");
    const r2 = balance("Al + HCl = AlCl3 + H2");
    expect(r1.reactants.map(s => s.coefficient)).toEqual(r2.reactants.map(s => s.coefficient));
    expect(r1.products.map(s => s.coefficient)).toEqual(r2.products.map(s => s.coefficient));
  });

  it("all arrow styles produce same coefficients for water electrolysis", () => {
    const arrows = ["->", "→", "⇌", "<=>", "<->", "-->", "="];
    const results = arrows.map(arrow => balance("H2O -> H2 + O2".replace("->", arrow)));
    const coeffs = results.map(r => [...r.reactants.map(s => s.coefficient), ...r.products.map(s => s.coefficient)]);
    for (let i = 1; i < coeffs.length; i++) {
      expect(coeffs[i]).toEqual(coeffs[0]);
    }
  });

  it("arrow style with state symbols produces same coefficients", () => {
    const r1 = balance("H2(g) + O2(g) -> H2O(l)");
    const r2 = balance("H2(g) + O2(g) → H2O(l)");
    expect(r1.reactants.map(s => s.coefficient)).toEqual(r2.reactants.map(s => s.coefficient));
  });

  it("arrow style with ionic charges produces same coefficients", () => {
    const r1 = balance("MnO4- + H+ + e- -> Mn2+ + H2O");
    const r2 = balance("MnO4- + H+ + e- → Mn2+ + H2O");
    expect(r1.reactants.map(s => s.coefficient)).toEqual(r2.reactants.map(s => s.coefficient));
  });
});

/* ============================================================
 * 6. Edge case formatting (10 tests)
 * ============================================================ */
describe("edge case formatting", () => {
  it("reaction with all coefficients=1 formatted correctly with showOne=false", () => {
    const r = balance("AgNO3 + NaCl -> AgCl + NaNO3", { showOne: false });
    expect(r.equation).toBe("AgNO3 + NaCl -> AgCl + NaNO3");
  });

  it("reaction with all coefficients=1 formatted correctly with showOne=true", () => {
    const r = balance("AgNO3 + NaCl -> AgCl + NaNO3", { showOne: true });
    expect(r.equation).toBe("1 AgNO3 + 1 NaCl -> 1 AgCl + 1 NaNO3");
  });

  it("reaction with large coefficients", () => {
    const r = balance("KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O", { showOne: false });
    expect(r.equation).toBe("2 KMnO4 + 16 HCl -> 2 KCl + 2 MnCl2 + 5 Cl2 + 8 H2O");
  });

  it("reaction with coefficient 1 on first reactant only", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O", { showOne: false });
    expect(r.equation).toBe("CH4 + 2 O2 -> CO2 + 2 H2O");
  });

  it("reaction with coefficient 1 on first product only", () => {
    const r = balance("CaCO3 -> CaO + CO2", { showOne: false });
    expect(r.equation).toBe("CaCO3 -> CaO + CO2");
  });

  it("reaction with large coefficient on single species", () => {
    const r = balance("C6H12O6 + O2 -> CO2 + H2O", { showOne: false });
    expect(r.equation).toBe("C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O");
  });

  it("reaction with nested parentheses and large coefficients", () => {
    const r = balance("Ca3(PO4)2 + SiO2 + C -> CaSiO3 + P4 + CO", { showOne: false });
    expect(r.equation).toBe("2 Ca3(PO4)2 + 6 SiO2 + 10 C -> 6 CaSiO3 + P4 + 10 CO");
  });

  it("reaction with very simple 1:1:1 ratio", () => {
    const r = balance("C + O2 -> CO2", { showOne: false });
    expect(r.equation).toBe("C + O2 -> CO2");
  });

  it("reaction with multiple coefficient=1 and some >1", () => {
    const r = balance("H2SO4 + NaOH -> Na2SO4 + H2O", { showOne: false });
    expect(r.equation).toBe("H2SO4 + 2 NaOH -> Na2SO4 + 2 H2O");
  });

  it("reaction with hydrate produces correct coefficients", () => {
    const r = balance("CuSO4·5H2O -> CuSO4 + H2O", { showOne: false });
    expect(r.equation).toBe("CuSO4·5H2O -> CuSO4 + 5 H2O");
  });
});

/* ============================================================
 * 7. parseFormula direct API (10 tests)
 * ============================================================ */
describe("parseFormula direct API", () => {
  it("parses simple molecule H2O", () => {
    const result = parseFormula("H2O");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses simple molecule CO2", () => {
    const result = parseFormula("CO2");
    expect(result.elements).toEqual({ C: 1, O: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses ion with charge Fe2+", () => {
    const result = parseFormula("Fe2+");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(2);
  });

  it("parses ion with negative charge SO4^2-", () => {
    const result = parseFormula("SO4^2-");
    expect(result.elements).toEqual({ S: 1, O: 4 });
    expect(result.charge).toBe(-2);
  });

  it("parses electron e-", () => {
    const result = parseFormula("e-");
    expect(result.elements).toEqual({});
    expect(result.charge).toBe(-1);
  });

  it("parses hydrated compound CuSO4·5H2O", () => {
    const result = parseFormula("CuSO4·5H2O");
    expect(result.elements.Cu).toBe(1);
    expect(result.elements.S).toBe(1);
    expect(result.elements.O).toBe(9);
    expect(result.elements.H).toBe(10);
    expect(result.charge).toBe(0);
  });

  it("parses nested parentheses Ca3(PO4)2", () => {
    const result = parseFormula("Ca3(PO4)2");
    expect(result.elements.Ca).toBe(3);
    expect(result.elements.P).toBe(2);
    expect(result.elements.O).toBe(8);
    expect(result.charge).toBe(0);
  });

  it("parses formula with state symbols stripped", () => {
    const result = parseFormula("NaCl(aq)");
    expect(result.elements).toEqual({ Na: 1, Cl: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses formula with brackets [Fe(CN)6]", () => {
    const result = parseFormula("[Fe(CN)6]");
    expect(result.elements.Fe).toBe(1);
    expect(result.elements.C).toBe(6);
    expect(result.elements.N).toBe(6);
    expect(result.charge).toBe(0);
  });

  it("parses single element", () => {
    const result = parseFormula("Fe");
    expect(result.elements).toEqual({ Fe: 1 });
    expect(result.charge).toBe(0);
  });
});

/* ============================================================
 * 8. splitEquation direct API (10 tests)
 * ============================================================ */
describe("splitEquation direct API", () => {
  it("splits simple equation", () => {
    const result = splitEquation("H2 + O2 -> H2O");
    expect(result.reactants.length).toBe(2);
    expect(result.products.length).toBe(1);
  });

  it("splits equation with multiple products", () => {
    const result = splitEquation("CaCO3 -> CaO + CO2");
    expect(result.reactants.length).toBe(1);
    expect(result.products.length).toBe(2);
  });

  it("splits equation with unicode arrow", () => {
    const result = splitEquation("H2 + O2 → H2O");
    expect(result.reactants.length).toBe(2);
    expect(result.products.length).toBe(1);
  });

  it("splits equation with <=> arrow", () => {
    const result = splitEquation("N2 + H2 <=> NH3");
    expect(result.reactants.length).toBe(2);
    expect(result.products.length).toBe(1);
  });

  it("splits equation with = arrow", () => {
    const result = splitEquation("Fe + O2 = Fe2O3");
    expect(result.reactants.length).toBe(2);
    expect(result.products.length).toBe(1);
  });

  it("preserves original formula in species", () => {
    const result = splitEquation("H2 + O2 -> H2O");
    expect(result.reactants[0].formula).toBe("H2");
    expect(result.reactants[1].formula).toBe("O2");
    expect(result.products[0].formula).toBe("H2O");
  });

  it("parses elements correctly for each species", () => {
    const result = splitEquation("CH4 + O2 -> CO2 + H2O");
    expect(result.reactants[0].elements).toEqual({ C: 1, H: 4 });
    expect(result.reactants[1].elements).toEqual({ O: 2 });
  });

  it("splits equation with state symbols", () => {
    const result = splitEquation("H2(g) + O2(g) -> H2O(l)");
    expect(result.reactants.length).toBe(2);
    expect(result.products.length).toBe(1);
    expect(result.products[0].formula).toBe("H2O");
  });

  it("splits equation with ionic species", () => {
    const result = splitEquation("Fe2+ + Cl- -> FeCl2");
    expect(result.reactants[0].charge).toBe(2);
    expect(result.reactants[1].charge).toBe(-1);
  });

  it("splits equation with --> arrow", () => {
    const result = splitEquation("Na + Cl2 --> NaCl");
    expect(result.reactants.length).toBe(2);
    expect(result.products.length).toBe(1);
  });
});

/* ============================================================
 * 9. buildMatrix direct API (5 tests)
 * ============================================================ */
describe("buildMatrix direct API", () => {
  it("builds matrix for simple reaction", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(cols).toBe(3);
    expect(matrix.length).toBeGreaterThan(0);
  });

  it("builds matrix with charge row for ionic reaction", () => {
    const eq = splitEquation("Fe2+ + Cl- -> FeCl2");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    // Has elements + 1 charge row
    expect(matrix.length).toBeGreaterThan(0);
    expect(cols).toBe(3);
  });

  it("builds matrix with correct dimensions for combustion", () => {
    const eq = splitEquation("CH4 + O2 -> CO2 + H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(cols).toBe(4);
    // C, H, O = 3 rows (no charge)
    expect(matrix.length).toBe(3);
  });

  it("builds matrix with all Fraction values", () => {
    const eq = splitEquation("Na + Cl2 -> NaCl");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    for (const row of matrix) {
      for (const val of row) {
        expect(val).toBeInstanceOf(Fraction);
      }
    }
  });

  it("builds matrix with reactants having positive sign and products negative", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    // Reactants (cols 0,1) should have positive values, product (col 2) negative
    for (const row of matrix) {
      if (!row[0]!.isZero()) expect(row[0]!.num).toBeGreaterThan(0);
      if (!row[1]!.isZero()) expect(row[1]!.num).toBeGreaterThan(0);
      if (!row[2]!.isZero()) expect(row[2]!.num).toBeLessThan(0);
    }
  });
});

/* ============================================================
 * 10. fractionsToIntegers direct API (5 tests)
 * ============================================================ */
describe("fractionsToIntegers direct API", () => {
  it("converts simple fractions to integers", () => {
    const fracs = [new Fraction(1, 2), new Fraction(1), new Fraction(1, 2)];
    const ints = fractionsToIntegers(fracs);
    expect(ints).toEqual([1, 2, 1]);
  });

  it("converts whole number fractions", () => {
    const fracs = [new Fraction(2), new Fraction(3), new Fraction(4)];
    const ints = fractionsToIntegers(fracs);
    expect(ints).toEqual([2, 3, 4]);
  });

  it("reduces fractions with common denominator", () => {
    const fracs = [new Fraction(2, 4), new Fraction(4, 4), new Fraction(2, 4)];
    const ints = fractionsToIntegers(fracs);
    expect(ints).toEqual([1, 2, 1]);
  });

  it("handles zero fractions", () => {
    const fracs = [new Fraction(0), new Fraction(1, 2), new Fraction(1, 4)];
    const ints = fractionsToIntegers(fracs);
    expect(ints[0]).toBe(0);
  });

  it("converts thirds to integers", () => {
    const fracs = [new Fraction(1, 3), new Fraction(2, 3), new Fraction(1)];
    const ints = fractionsToIntegers(fracs);
    expect(ints).toEqual([1, 2, 3]);
  });
});

/* ============================================================
 * 11. gcd and lcm direct API (5 tests)
 * ============================================================ */
describe("gcd and lcm direct API", () => {
  it("gcd of coprime numbers is 1", () => {
    expect(gcd(7, 13)).toBe(1);
  });

  it("gcd of numbers with common factor", () => {
    expect(gcd(12, 18)).toBe(6);
  });

  it("gcd with zero returns the other number", () => {
    expect(gcd(0, 5)).toBe(5);
    expect(gcd(5, 0)).toBe(5);
  });

  it("lcm of coprime numbers is their product", () => {
    expect(lcm(3, 5)).toBe(15);
  });

  it("lcm with common factor", () => {
    expect(lcm(4, 6)).toBe(12);
  });
});
