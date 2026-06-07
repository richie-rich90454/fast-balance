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
