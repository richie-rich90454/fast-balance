import { describe, it, expect } from "vitest";
import {
  balance,
  parseFormula,
  splitEquation,
  Fraction,
  gcd,
  lcm,
  stripStateSymbols,
  buildMatrix,
  solveSystem,
  fractionsToIntegers,
} from "../index";

describe("balance execution", () => {
  it("returns an object that looks like a BalanceResult", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect("reactants" in result).toBe(true);
    expect("products" in result).toBe(true);
    expect("equation" in result).toBe(true);
  });

  it("balance.reactants is an array of objects with coefficient and formula", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(Array.isArray(result.reactants)).toBe(true);
    expect(result.reactants.length).toBeGreaterThan(0);
    for (const r of result.reactants) {
      expect(typeof r.coefficient).toBe("number");
      expect(typeof r.formula).toBe("string");
    }
  });

  it("balance.products is an array of objects with coefficient and formula", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(Array.isArray(result.products)).toBe(true);
    expect(result.products.length).toBeGreaterThan(0);
    for (const p of result.products) {
      expect(typeof p.coefficient).toBe("number");
      expect(typeof p.formula).toBe("string");
    }
  });

  it("balance.equation is a string", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(typeof result.equation).toBe("string");
    expect(result.equation.length).toBeGreaterThan(0);
  });

  it("balance works with various equations", () => {
    const a = balance("Fe + O2 -> Fe2O3");
    expect(a.equation).toContain("->");
    const b = balance("Na + H2O -> NaOH + H2");
    expect(b.reactants.length).toBe(2);
    expect(b.products.length).toBe(2);
    const c = balance("C3H8 + O2 -> CO2 + H2O");
    expect(c.reactants.length).toBeGreaterThan(0);
    expect(c.products.length).toBeGreaterThan(0);
  });
});

describe("parseFormula execution", () => {
  it("returns a ParsedUnit-shaped object", () => {
    const parsed = parseFormula("H2O");
    expect(parsed).toBeDefined();
    expect(typeof parsed).toBe("object");
    expect("elements" in parsed).toBe(true);
    expect("charge" in parsed).toBe(true);
  });

  it("parseFormula.charge is a number", () => {
    const parsed = parseFormula("H2O");
    expect(typeof parsed.charge).toBe("number");
  });

  it("parseFormula.elements is a plain object", () => {
    const parsed = parseFormula("H2O");
    expect(typeof parsed.elements).toBe("object");
    expect(parsed.elements).not.toBeNull();
    expect(Array.isArray(parsed.elements)).toBe(false);
  });

  it("parseFormula.charge defaults to 0 for neutral species", () => {
    expect(parseFormula("H2O").charge).toBe(0);
    expect(parseFormula("NaCl").charge).toBe(0);
    expect(parseFormula("Ca3(PO4)2").charge).toBe(0);
  });

  it("parseFormula handles common formulas", () => {
    const water = parseFormula("H2O");
    expect(water.elements.H).toBe(2);
    expect(water.elements.O).toBe(1);

    const salt = parseFormula("NaCl");
    expect(salt.elements.Na).toBe(1);
    expect(salt.elements.Cl).toBe(1);

    const sulfate = parseFormula("SO4");
    expect(sulfate.elements.S).toBe(1);
    expect(sulfate.elements.O).toBe(4);

    const ion = parseFormula("Fe3+");
    expect(ion.charge).toBe(3);
    expect(ion.elements.Fe).toBe(1);

    const hydroxide = parseFormula("OH-");
    expect(hydroxide.charge).toBe(-1);
    expect(hydroxide.elements.O).toBe(1);
    expect(hydroxide.elements.H).toBe(1);
  });
});

describe("splitEquation execution", () => {
  it("returns an Equation object", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    expect(eq).toBeDefined();
    expect(typeof eq).toBe("object");
    expect("reactants" in eq).toBe(true);
    expect("products" in eq).toBe(true);
  });

  it("splitEquation.reactants is an array", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    expect(Array.isArray(eq.reactants)).toBe(true);
    expect(eq.reactants.length).toBe(2);
  });

  it("splitEquation.products is an array", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    expect(Array.isArray(eq.products)).toBe(true);
    expect(eq.products.length).toBe(1);
  });

  it("each species has formula, elements, and charge", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    for (const s of [...eq.reactants, ...eq.products]) {
      expect(typeof s.formula).toBe("string");
      expect(typeof s.elements).toBe("object");
      expect(typeof s.charge).toBe("number");
    }
  });

  it("empty side throws", () => {
    expect(() => splitEquation("-> H2O")).toThrow();
    expect(() => splitEquation("H2 + O2 ->")).toThrow();
  });
});
