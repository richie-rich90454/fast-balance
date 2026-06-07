import { describe, it, expect } from "vitest";
import { Fraction } from "../index";

describe("constructor and normalization", () => {
  it("creates fraction with default denominator of 1", () => {
    const f = new Fraction(5);
    expect(f.num).toBe(5);
    expect(f.den).toBe(1);
  });

  it("reduces fraction by GCD (6/4 becomes 3/2)", () => {
    const f = new Fraction(6, 4);
    expect(f.num).toBe(3);
    expect(f.den).toBe(2);
  });

  it("normalizes negative denominator to positive (3/-4 becomes -3/4)", () => {
    const f = new Fraction(3, -4);
    expect(f.num).toBe(-3);
    expect(f.den).toBe(4);
  });

  it("normalizes double negative to positive (-3/-4 becomes 3/4)", () => {
    const f = new Fraction(-3, -4);
    expect(f.num).toBe(3);
    expect(f.den).toBe(4);
  });

  it("creates zero fraction (0/5 becomes 0/1)", () => {
    const f = new Fraction(0, 5);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });
});

describe("add and subtract", () => {
  it("adds two positive fractions (1/2 + 1/3 = 5/6)", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const result = a.add(b);
    expect(result.num).toBe(5);
    expect(result.den).toBe(6);
  });

  it("adds fraction to zero (1/2 + 0 = 1/2)", () => {
    const a = new Fraction(1, 2);
    const b = Fraction.zero();
    const result = a.add(b);
    expect(result.num).toBe(1);
    expect(result.den).toBe(2);
  });

  it("subtracts two fractions (3/4 - 1/4 = 1/2)", () => {
    const a = new Fraction(3, 4);
    const b = new Fraction(1, 4);
    const result = a.sub(b);
    expect(result.num).toBe(1);
    expect(result.den).toBe(2);
  });

  it("adds negative fraction (1/2 + (-1/3) = 1/6)", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(-1, 3);
    const result = a.add(b);
    expect(result.num).toBe(1);
    expect(result.den).toBe(6);
  });

  it("subtracts to get negative result (1/4 - 3/4 = -1/2)", () => {
    const a = new Fraction(1, 4);
    const b = new Fraction(3, 4);
    const result = a.sub(b);
    expect(result.num).toBe(-1);
    expect(result.den).toBe(2);
  });
});
