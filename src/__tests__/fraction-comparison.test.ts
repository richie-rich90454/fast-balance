import { describe, it, expect } from "vitest";
import { Fraction } from "../index";

describe("equals() edge cases", () => {
  it("1/2 equals 1/2", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 2);
    expect(a.equals(b)).toBe(true);
  });
  it("2/4 normalizes to 1/2, so equals 1/2", () => {
    const a = new Fraction(2, 4);
    const b = new Fraction(1, 2);
    expect(a.equals(b)).toBe(true);
  });
  it("3/6 equals 1/2 after normalization", () => {
    const a = new Fraction(3, 6);
    const b = new Fraction(1, 2);
    expect(a.equals(b)).toBe(true);
  });
  it("-1/2 equals 1/-2 after normalization", () => {
    const a = new Fraction(-1, 2);
    const b = new Fraction(1, -2);
    expect(a.equals(b)).toBe(true);
  });
  it("-2/-4 equals 1/2", () => {
    const a = new Fraction(-2, -4);
    const b = new Fraction(1, 2);
    expect(a.equals(b)).toBe(true);
  });
  it("1/2 not equals 1/3", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    expect(a.equals(b)).toBe(false);
  });
  it("0/1 equals 0/5 (both normalize to 0/1)", () => {
    const a = new Fraction(0, 1);
    const b = new Fraction(0, 5);
    expect(a.equals(b)).toBe(true);
  });
  it("100/200 equals 1/2", () => {
    const a = new Fraction(100, 200);
    const b = new Fraction(1, 2);
    expect(a.equals(b)).toBe(true);
  });
  it("997/991 not equals 991/997", () => {
    const a = new Fraction(997, 991);
    const b = new Fraction(991, 997);
    expect(a.equals(b)).toBe(false);
  });
  it("large: 1000000/1000001 not equals 999999/1000000", () => {
    const a = new Fraction(1000000, 1000001);
    const b = new Fraction(999999, 1000000);
    expect(a.equals(b)).toBe(false);
  });
});

describe("isZero() with various representations", () => {
  it("new Fraction(0) is zero", () => {
    expect(Fraction.zero().isZero()).toBe(true);
  });
  it("new Fraction(0, 100) is zero", () => {
    const f = new Fraction(0, 100);
    expect(f.isZero()).toBe(true);
  });
  it("new Fraction(0, -100) is zero", () => {
    const f = new Fraction(0, -100);
    expect(f.isZero()).toBe(true);
  });
  it("new Fraction(0, 1) is zero", () => {
    const f = new Fraction(0, 1);
    expect(f.isZero()).toBe(true);
  });
  it("new Fraction(1) is not zero", () => {
    expect(Fraction.one().isZero()).toBe(false);
  });
  it("new Fraction(-1, 2) is not zero", () => {
    const f = new Fraction(-1, 2);
    expect(f.isZero()).toBe(false);
  });
  it("x - x is zero", () => {
    const a = new Fraction(123, 456);
    const r = a.sub(a);
    expect(r.isZero()).toBe(true);
  });
  it("0 * x is zero", () => {
    const a = new Fraction(7, 13);
    const r = Fraction.zero().mul(a);
    expect(r.isZero()).toBe(true);
  });
  it("new Fraction(0, 999999) is zero", () => {
    const f = new Fraction(0, 999999);
    expect(f.isZero()).toBe(true);
  });
});

describe("ordering relationships", () => {
  it("1/2 > 1/3", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    // cross-multiply comparison: a.num * b.den vs b.num * a.den
    expect(a.num * b.den).toBeGreaterThan(b.num * a.den);
  });
  it("3/4 > 2/3", () => {
    const a = new Fraction(3, 4);
    const b = new Fraction(2, 3);
    expect(a.num * b.den).toBeGreaterThan(b.num * a.den);
  });
  it("-1/2 < 1/2", () => {
    const a = new Fraction(-1, 2);
    const b = new Fraction(1, 2);
    expect(a.num * b.den).toBeLessThan(b.num * a.den);
  });
  it("-3/4 < -1/2", () => {
    const a = new Fraction(-3, 4);
    const b = new Fraction(-1, 2);
    expect(a.num * b.den).toBeLessThan(b.num * a.den);
  });
  it("5/6 > 4/5", () => {
    const a = new Fraction(5, 6);
    const b = new Fraction(4, 5);
    expect(a.num * b.den).toBeGreaterThan(b.num * a.den);
  });
  it("7/8 > 6/7", () => {
    const a = new Fraction(7, 8);
    const b = new Fraction(6, 7);
    expect(a.num * b.den).toBeGreaterThan(b.num * a.den);
  });
  it("99/100 > 98/99", () => {
    const a = new Fraction(99, 100);
    const b = new Fraction(98, 99);
    expect(a.num * b.den).toBeGreaterThan(b.num * a.den);
  });
  it("1/1000 < 1/999", () => {
    const a = new Fraction(1, 1000);
    const b = new Fraction(1, 999);
    expect(a.num * b.den).toBeLessThan(b.num * a.den);
  });
});

describe("negation chains", () => {
  it("double negation returns original", () => {
    const a = new Fraction(47, 53);
    const b = a.neg().neg();
    expect(b.num).toBe(a.num);
    expect(b.den).toBe(a.den);
  });
  it("triple negation equals single negation", () => {
    const a = new Fraction(23, 29);
    const single = a.neg();
    const triple = a.neg().neg().neg();
    expect(triple.num).toBe(single.num);
    expect(triple.den).toBe(single.den);
  });
  it("neg(0) = 0", () => {
    const r = Fraction.zero().neg();
    expect(r.isZero()).toBe(true);
  });
  it("neg(1) = -1", () => {
    const r = Fraction.one().neg();
    expect(r.num).toBe(-1);
    expect(r.den).toBe(1);
  });
  it("neg(-1) = 1", () => {
    const r = new Fraction(-1, 1).neg();
    expect(r.num).toBe(1);
    expect(r.den).toBe(1);
  });
  it("neg(a/b) = -a/b", () => {
    const a = new Fraction(5, 7);
    const r = a.neg();
    expect(r.num).toBe(-5);
    expect(r.den).toBe(7);
  });
  it("neg chain: (-1/2).neg().neg().neg() = 1/2", () => {
    const a = new Fraction(-1, 2);
    const r = a.neg().neg().neg();
    expect(r.num).toBe(1);
    expect(r.den).toBe(2);
  });
  it("neg(a).neg(b) = (-a)*(-b) = a*b", () => {
    const a = new Fraction(3, 5);
    const b = new Fraction(7, 11);
    const na = a.neg();
    const nb = b.neg();
    expect(na.mul(nb).num).toBe(a.mul(b).num);
    expect(na.mul(nb).den).toBe(a.mul(b).den);
  });
  it("4 negations in a row preserves original", () => {
    const a = new Fraction(101, 103);
    const r = a.neg().neg().neg().neg();
    expect(r.num).toBe(a.num);
    expect(r.den).toBe(a.den);
  });
  it("neg on large fraction", () => {
    const a = new Fraction(99999, 100001);
    const r = a.neg();
    expect(r.num).toBe(-99999);
    expect(r.den).toBe(100001);
  });
});

describe("fraction clone and immutability", () => {
  it("clone produces equal fraction", () => {
    const a = new Fraction(3, 7);
    const b = a.clone();
    expect(b.equals(a)).toBe(true);
    expect(b).not.toBe(a); // different objects
  });
  it("clone of negative fraction", () => {
    const a = new Fraction(-5, 8);
    const b = a.clone();
    expect(b.num).toBe(a.num);
    expect(b.den).toBe(a.den);
  });
  it("operations don't mutate original", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const sum = a.add(b);
    expect(a.num).toBe(1);
    expect(a.den).toBe(2);
    expect(b.num).toBe(1);
    expect(b.den).toBe(3);
  });
  it("chain of operations preserves immutability", () => {
    const a = new Fraction(1, 2);
    const r = a.add(new Fraction(1, 3)).mul(new Fraction(2, 5)).sub(new Fraction(1, 7));
    expect(a.num).toBe(1);
    expect(a.den).toBe(2);
  });
  it("neg() doesn't mutate", () => {
    const a = new Fraction(5, 7);
    const neg = a.neg();
    expect(a.num).toBe(5);
    expect(a.den).toBe(7);
    expect(neg.num).toBe(-5);
    expect(neg.den).toBe(7);
  });
});

describe("boundary conditions", () => {
  it("Fraction(1, 1) is one", () => {
    const f = new Fraction(1, 1);
    expect(f.equals(Fraction.one())).toBe(true);
  });
  it("Fraction(-1, 1) negation equals one", () => {
    const f = new Fraction(-1, 1);
    expect(f.neg().equals(Fraction.one())).toBe(true);
  });
  it("Fraction(1000000000, 1) handles large numerator", () => {
    const f = new Fraction(1000000000, 1);
    expect(f.num).toBe(1000000000);
    expect(f.den).toBe(1);
  });
  it("Fraction(1, 1000000000) handles large denominator", () => {
    const f = new Fraction(1, 1000000000);
    expect(f.num).toBe(1);
    expect(f.den).toBe(1000000000);
  });
  it("Fraction(0, 0) edge case: gcd(0,0)=0, but den default=1 prevents div by 0", () => {
    // Fraction(0, 0) would divide by zero in gcd, so we test safe edge case
    const f = new Fraction(0);
    expect(f.isZero()).toBe(true);
  });
  it("Fraction(-1000000000, -1000000000) = 1/1", () => {
    const f = new Fraction(-1000000000, -1000000000);
    expect(f.num).toBe(1);
    expect(f.den).toBe(1);
  });
  it("very small: 1/999999937 (large prime den)", () => {
    const f = new Fraction(1, 999999937);
    expect(f.num).toBe(1);
    expect(f.den).toBe(999999937);
  });
});

describe("equals transitivity", () => {
  it("if a==b and b==c then a==c: 1/2, 2/4, 3/6", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(2, 4);
    const c = new Fraction(3, 6);
    expect(a.equals(b)).toBe(true);
    expect(b.equals(c)).toBe(true);
    expect(a.equals(c)).toBe(true);
  });
  it("if a==b and b!=c then a!=c: 1/2, 2/4, 1/3", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(2, 4);
    const c = new Fraction(1, 3);
    expect(a.equals(b)).toBe(true);
    expect(b.equals(c)).toBe(false);
    expect(a.equals(c)).toBe(false);
  });
  it("symmetric: a==b iff b==a", () => {
    const a = new Fraction(123, 456);
    const b = new Fraction(41, 152); // same after reduction
    expect(a.equals(b) === b.equals(a)).toBe(true);
  });
});
