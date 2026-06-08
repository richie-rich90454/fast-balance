import { describe, it, expect } from "vitest";
import { Fraction } from "../index";

describe("Fraction constructor normalization exhaustive tests", () => {
  it("Fraction(4,6) normalizes to 2/3", () => {
    const f = new Fraction(4, 6);
    expect(f.num).toBe(2);
    expect(f.den).toBe(3);
  });

  it("Fraction(-3,2) stays -3/2", () => {
    const f = new Fraction(-3, 2);
    expect(f.num).toBe(-3);
    expect(f.den).toBe(2);
  });

  it("Fraction(3,-2) normalizes to -3/2", () => {
    const f = new Fraction(3, -2);
    expect(f.num).toBe(-3);
    expect(f.den).toBe(2);
  });

  it("Fraction(-3,-2) normalizes to 3/2", () => {
    const f = new Fraction(-3, -2);
    expect(f.num).toBe(3);
    expect(f.den).toBe(2);
  });

  it("Fraction(0,5) is 0/1", () => {
    const f = new Fraction(0, 5);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("Fraction(0,-5) is 0/1", () => {
    const f = new Fraction(0, -5);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("Fraction(6,3) normalizes to 2/1", () => {
    const f = new Fraction(6, 3);
    expect(f.num).toBe(2);
    expect(f.den).toBe(1);
  });

  it("Fraction(100,25) normalizes to 4/1", () => {
    const f = new Fraction(100, 25);
    expect(f.num).toBe(4);
    expect(f.den).toBe(1);
  });

  it("Fraction(7,1) stays 7/1", () => {
    const f = new Fraction(7, 1);
    expect(f.num).toBe(7);
    expect(f.den).toBe(1);
  });

  it("Fraction(1,1) stays 1/1", () => {
    const f = new Fraction(1, 1);
    expect(f.num).toBe(1);
    expect(f.den).toBe(1);
  });
});

describe("Fraction arithmetic commutativity tests", () => {
  it("add is commutative for 1/2 and 1/3", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    expect(a.add(b).equals(b.add(a))).toBe(true);
  });

  it("add is commutative for 3/4 and -2/5", () => {
    const a = new Fraction(3, 4);
    const b = new Fraction(-2, 5);
    expect(a.add(b).equals(b.add(a))).toBe(true);
  });

  it("add is commutative for 0 and 5/7", () => {
    const a = Fraction.zero();
    const b = new Fraction(5, 7);
    expect(a.add(b).equals(b.add(a))).toBe(true);
  });

  it("mul is commutative for 2/3 and 3/4", () => {
    const a = new Fraction(2, 3);
    const b = new Fraction(3, 4);
    expect(a.mul(b).equals(b.mul(a))).toBe(true);
  });

  it("mul is commutative for -1/2 and 4/5", () => {
    const a = new Fraction(-1, 2);
    const b = new Fraction(4, 5);
    expect(a.mul(b).equals(b.mul(a))).toBe(true);
  });

  it("mul is commutative for 0 and 7/3", () => {
    const a = Fraction.zero();
    const b = new Fraction(7, 3);
    expect(a.mul(b).equals(b.mul(a))).toBe(true);
  });

  it("add with zero is identity: a + 0 === a", () => {
    const a = new Fraction(3, 7);
    const result = a.add(Fraction.zero());
    expect(result.equals(a)).toBe(true);
  });

  it("add with zero is identity for negative fraction", () => {
    const a = new Fraction(-5, 11);
    const result = a.add(Fraction.zero());
    expect(result.equals(a)).toBe(true);
  });

  it("mul with one is identity: a * 1 === a", () => {
    const a = new Fraction(5, 8);
    const result = a.mul(Fraction.one());
    expect(result.equals(a)).toBe(true);
  });

  it("mul with one is identity for negative fraction", () => {
    const a = new Fraction(-3, 10);
    const result = a.mul(Fraction.one());
    expect(result.equals(a)).toBe(true);
  });

  it("mul with zero gives zero", () => {
    const a = new Fraction(99, 100);
    const result = a.mul(Fraction.zero());
    expect(result.isZero()).toBe(true);
  });

  it("mul with zero gives zero for negative fraction", () => {
    const a = new Fraction(-7, 3);
    const result = a.mul(Fraction.zero());
    expect(result.isZero()).toBe(true);
  });
});
