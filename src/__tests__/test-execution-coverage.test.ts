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
