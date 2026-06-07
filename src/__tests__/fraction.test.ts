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

describe("multiply and divide", () => {
  it("multiplies two fractions (2/3 * 3/4 = 1/2)", () => {
    const a = new Fraction(2, 3);
    const b = new Fraction(3, 4);
    const result = a.mul(b);
    expect(result.num).toBe(1);
    expect(result.den).toBe(2);
  });

  it("multiplies by zero (1/2 * 0 = 0)", () => {
    const a = new Fraction(1, 2);
    const b = Fraction.zero();
    const result = a.mul(b);
    expect(result.num).toBe(0);
    expect(result.den).toBe(1);
  });

  it("multiplies by one (3/4 * 1 = 3/4)", () => {
    const a = new Fraction(3, 4);
    const b = Fraction.one();
    const result = a.mul(b);
    expect(result.num).toBe(3);
    expect(result.den).toBe(4);
  });

  it("divides two fractions (2/3 / 4/3 = 1/2)", () => {
    const a = new Fraction(2, 3);
    const b = new Fraction(4, 3);
    const result = a.div(b);
    expect(result.num).toBe(1);
    expect(result.den).toBe(2);
  });

  it("divides by one (3/4 / 1 = 3/4)", () => {
    const a = new Fraction(3, 4);
    const b = Fraction.one();
    const result = a.div(b);
    expect(result.num).toBe(3);
    expect(result.den).toBe(4);
  });
});

describe("neg, equals, clone, isZero", () => {
  it("neg returns negated fraction", () => {
    const f = new Fraction(3, 4);
    const result = f.neg();
    expect(result.num).toBe(-3);
    expect(result.den).toBe(4);
  });

  it("neg of negative returns positive", () => {
    const f = new Fraction(-3, 4);
    const result = f.neg();
    expect(result.num).toBe(3);
    expect(result.den).toBe(4);
  });

  it("equals returns true for equivalent fractions", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(2, 4);
    expect(a.equals(b)).toBe(true);
  });

  it("equals returns false for different fractions", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    expect(a.equals(b)).toBe(false);
  });

  it("clone returns independent copy", () => {
    const f = new Fraction(3, 4);
    const c = f.clone();
    expect(c.num).toBe(3);
    expect(c.den).toBe(4);
    expect(c).not.toBe(f);
  });

  it("isZero returns true only for zero fraction", () => {
    expect(new Fraction(0, 1).isZero()).toBe(true);
    expect(new Fraction(0, 5).isZero()).toBe(true);
    expect(new Fraction(1, 2).isZero()).toBe(false);
  });
});

describe("static factory methods", () => {
  it("zero() returns fraction with num=0 den=1", () => {
    const f = Fraction.zero();
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("one() returns fraction with num=1 den=1", () => {
    const f = Fraction.one();
    expect(f.num).toBe(1);
    expect(f.den).toBe(1);
  });

  it("zero().isZero() is true", () => {
    expect(Fraction.zero().isZero()).toBe(true);
  });

  it("one().isZero() is false", () => {
    expect(Fraction.one().isZero()).toBe(false);
  });
});
