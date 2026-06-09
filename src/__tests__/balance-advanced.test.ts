import { describe, it, expect } from "vitest";
import { Fraction, balance, splitEquation, parseFormula, gcd } from "../index";

describe("fraction constructor edge cases", () => {
  it("new Fraction(0, 1) creates zero", () => {
    const f = new Fraction(0, 1);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("new Fraction(0, 2) normalizes to 0/1", () => {
    const f = new Fraction(0, 2);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("new Fraction(1, 2) creates one half", () => {
    const f = new Fraction(1, 2);
    expect(f.num).toBe(1);
    expect(f.den).toBe(2);
  });

  it("new Fraction(-1, 2) creates negative one half", () => {
    const f = new Fraction(-1, 2);
    expect(f.num).toBe(-1);
    expect(f.den).toBe(2);
  });

  it("new Fraction(1, -2) normalizes to -1/2", () => {
    const f = new Fraction(1, -2);
    expect(f.num).toBe(-1);
    expect(f.den).toBe(2);
  });
});

describe("fraction arithmetic edge cases", () => {
  it("Fraction(1,2).add(Fraction(1,3)) = 5/6", () => {
    const result = new Fraction(1, 2).add(new Fraction(1, 3));
    expect(result.num).toBe(5);
    expect(result.den).toBe(6);
  });

  it("Fraction(1,2).sub(Fraction(1,3)) = 1/6", () => {
    const result = new Fraction(1, 2).sub(new Fraction(1, 3));
    expect(result.num).toBe(1);
    expect(result.den).toBe(6);
  });

  it("Fraction(1,2).mul(Fraction(2,3)) = 1/3", () => {
    const result = new Fraction(1, 2).mul(new Fraction(2, 3));
    expect(result.num).toBe(1);
    expect(result.den).toBe(3);
  });

  it("Fraction(1,2).div(Fraction(2,3)) = 3/4", () => {
    const result = new Fraction(1, 2).div(new Fraction(2, 3));
    expect(result.num).toBe(3);
    expect(result.den).toBe(4);
  });

  it("Fraction(0,1).add(Fraction(0,1)) = 0", () => {
    const result = new Fraction(0, 1).add(new Fraction(0, 1));
    expect(result.num).toBe(0);
    expect(result.den).toBe(1);
  });
});

describe("fraction identity and inverse", () => {
  it("Fraction.zero().add(x) = x", () => {
    const x = new Fraction(3, 7);
    const result = Fraction.zero().add(x);
    expect(result.equals(x)).toBe(true);
  });

  it("Fraction.one().mul(x) = x", () => {
    const x = new Fraction(5, 8);
    const result = Fraction.one().mul(x);
    expect(result.equals(x)).toBe(true);
  });

  it("x.add(x.neg()).isZero() = true", () => {
    const x = new Fraction(4, 9);
    expect(x.add(x.neg()).isZero()).toBe(true);
  });

  it("Fraction.zero().isZero() = true", () => {
    expect(Fraction.zero().isZero()).toBe(true);
  });

  it("Fraction.zero().equals(new Fraction(0)) = true", () => {
    expect(Fraction.zero().equals(new Fraction(0))).toBe(true);
  });
});

describe("balance with all output options", () => {
  it("balance with showOne: true shows coefficient 1", () => {
    const result = balance("H2 + O2 -> H2O", { showOne: true });
    expect(result.equation).toContain("1 H2");
    expect(result.reactants[0]?.coefficient).toBe(2);
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(2);
  });

  it("balance with showOne: false omits coefficient 1", () => {
    const result = balance("H2 + O2 -> H2O", { showOne: false });
    expect(result.equation).not.toContain("1 ");
    expect(result.equation).toBe("2 H2 + O2 -> 2 H2O");
  });

  it("balance with format: text uses -> arrow", () => {
    const result = balance("H2 + O2 -> H2O", { format: "text" });
    expect(result.equation).toContain(" -> ");
  });

  it("balance with format: html uses &rarr; arrow", () => {
    const result = balance("H2 + O2 -> H2O", { format: "html" });
    expect(result.equation).toContain(" &rarr; ");
  });

  it("balance with format: latex uses \\rightarrow arrow", () => {
    const result = balance("H2 + O2 -> H2O", { format: "latex" });
    expect(result.equation).toContain(" \\rightarrow ");
  });
});

describe("balance coefficient properties", () => {
  const result = balance("H2 + O2 -> H2O");
  const allCoeffs = [...result.reactants, ...result.products].map(s => s.coefficient);

  it("all coefficients > 0 for H2+O2->H2O", () => {
    expect(allCoeffs.every(c => c > 0)).toBe(true);
  });

  it("all coefficients are integers for H2+O2->H2O", () => {
    expect(allCoeffs.every(c => Number.isInteger(c))).toBe(true);
  });

  it("GCD of coefficients = 1 for H2+O2->H2O", () => {
    const g = allCoeffs.reduce((acc, v) => gcd(Math.abs(v), acc), 0);
    expect(g).toBe(1);
  });

  it("sum of coefficients > 0 for H2+O2->H2O", () => {
    const sum = allCoeffs.reduce((a, b) => a + b, 0);
    expect(sum).toBeGreaterThan(0);
  });

  it("min coefficient >= 1 for H2+O2->H2O", () => {
    expect(Math.min(...allCoeffs)).toBeGreaterThanOrEqual(1);
  });
});

