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

describe("Fraction arithmetic associativity tests", () => {
  it("add is associative for 1/2, 1/3, 1/6", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const c = new Fraction(1, 6);
    const left = a.add(b.add(c));
    const right = a.add(b).add(c);
    expect(left.equals(right)).toBe(true);
  });

  it("add is associative for 2/5, -1/3, 4/7", () => {
    const a = new Fraction(2, 5);
    const b = new Fraction(-1, 3);
    const c = new Fraction(4, 7);
    const left = a.add(b.add(c));
    const right = a.add(b).add(c);
    expect(left.equals(right)).toBe(true);
  });

  it("add is associative with zero", () => {
    const a = new Fraction(3, 8);
    const b = Fraction.zero();
    const c = new Fraction(5, 8);
    const left = a.add(b.add(c));
    const right = a.add(b).add(c);
    expect(left.equals(right)).toBe(true);
  });

  it("mul is associative for 2/3, 3/4, 4/5", () => {
    const a = new Fraction(2, 3);
    const b = new Fraction(3, 4);
    const c = new Fraction(4, 5);
    const left = a.mul(b.mul(c));
    const right = a.mul(b).mul(c);
    expect(left.equals(right)).toBe(true);
  });

  it("mul is associative for -1/2, 2/3, -3/4", () => {
    const a = new Fraction(-1, 2);
    const b = new Fraction(2, 3);
    const c = new Fraction(-3, 4);
    const left = a.mul(b.mul(c));
    const right = a.mul(b).mul(c);
    expect(left.equals(right)).toBe(true);
  });

  it("mul is associative with one", () => {
    const a = new Fraction(5, 9);
    const b = Fraction.one();
    const c = new Fraction(9, 5);
    const left = a.mul(b.mul(c));
    const right = a.mul(b).mul(c);
    expect(left.equals(right)).toBe(true);
  });

  it("sub is NOT associative: (1/2 - 1/3) - 1/4 != 1/2 - (1/3 - 1/4)", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const c = new Fraction(1, 4);
    const left = a.sub(b).sub(c);
    const right = a.sub(b.sub(c));
    expect(left.equals(right)).toBe(false);
  });

  it("sub is NOT associative with larger values: (3/4 - 1/2) - 1/8 != 3/4 - (1/2 - 1/8)", () => {
    const a = new Fraction(3, 4);
    const b = new Fraction(1, 2);
    const c = new Fraction(1, 8);
    const left = a.sub(b).sub(c);
    const right = a.sub(b.sub(c));
    expect(left.equals(right)).toBe(false);
  });

  it("div is NOT associative: (1/2 / 1/3) / 1/4 != 1/2 / (1/3 / 1/4)", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const c = new Fraction(1, 4);
    const left = a.div(b).div(c);
    const right = a.div(b.div(c));
    expect(left.equals(right)).toBe(false);
  });

  it("div is NOT associative with different values: (2/3 / 4/5) / 1/2 != 2/3 / (4/5 / 1/2)", () => {
    const a = new Fraction(2, 3);
    const b = new Fraction(4, 5);
    const c = new Fraction(1, 2);
    const left = a.div(b).div(c);
    const right = a.div(b.div(c));
    expect(left.equals(right)).toBe(false);
  });
});

describe("Fraction distributive property tests", () => {
  it("a*(b+c) === a*b + a*c for 1/2, 1/3, 1/4", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const c = new Fraction(1, 4);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.equals(right)).toBe(true);
  });

  it("a*(b+c) === a*b + a*c for 2/3, 3/5, 1/7", () => {
    const a = new Fraction(2, 3);
    const b = new Fraction(3, 5);
    const c = new Fraction(1, 7);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.equals(right)).toBe(true);
  });

  it("distributive with negative a: (-1/2)*(3/4 + 1/6) === (-1/2)*(3/4) + (-1/2)*(1/6)", () => {
    const a = new Fraction(-1, 2);
    const b = new Fraction(3, 4);
    const c = new Fraction(1, 6);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.equals(right)).toBe(true);
  });

  it("distributive with negative b: 2/5*((-3/7) + 1/2) === 2/5*(-3/7) + 2/5*(1/2)", () => {
    const a = new Fraction(2, 5);
    const b = new Fraction(-3, 7);
    const c = new Fraction(1, 2);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.equals(right)).toBe(true);
  });

  it("distributive with all negatives: (-2/3)*((-1/4)+(-1/5)) === (-2/3)*(-1/4) + (-2/3)*(-1/5)", () => {
    const a = new Fraction(-2, 3);
    const b = new Fraction(-1, 4);
    const c = new Fraction(-1, 5);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.equals(right)).toBe(true);
  });

  it("distributive with zero: 0*(b+c) === 0*b + 0*c", () => {
    const a = Fraction.zero();
    const b = new Fraction(3, 7);
    const c = new Fraction(5, 11);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.equals(right)).toBe(true);
  });

  it("distributive with one: 1*(b+c) === 1*b + 1*c", () => {
    const a = Fraction.one();
    const b = new Fraction(4, 9);
    const c = new Fraction(2, 13);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.equals(right)).toBe(true);
  });
});

describe("Fraction inverse and identity tests", () => {
  it("a + a.neg() equals zero for 3/4", () => {
    const a = new Fraction(3, 4);
    expect(a.add(a.neg()).equals(Fraction.zero())).toBe(true);
  });

  it("a + a.neg() equals zero for -5/7", () => {
    const a = new Fraction(-5, 7);
    expect(a.add(a.neg()).equals(Fraction.zero())).toBe(true);
  });

  it("a + a.neg() equals zero for 1/1", () => {
    const a = Fraction.one();
    expect(a.add(a.neg()).equals(Fraction.zero())).toBe(true);
  });

  it("a * a / a equals a for non-zero 2/3", () => {
    const a = new Fraction(2, 3);
    expect(a.mul(a).div(a).equals(a)).toBe(true);
  });

  it("a * a / a equals a for non-zero -4/5", () => {
    const a = new Fraction(-4, 5);
    expect(a.mul(a).div(a).equals(a)).toBe(true);
  });

  it("a * a / a equals a for non-zero 7/1", () => {
    const a = new Fraction(7, 1);
    expect(a.mul(a).div(a).equals(a)).toBe(true);
  });

  it("Fraction.zero().neg() equals zero", () => {
    const z = Fraction.zero();
    expect(z.neg().equals(Fraction.zero())).toBe(true);
  });

  it("Fraction.one().neg() equals new Fraction(-1)", () => {
    const one = Fraction.one();
    const negOne = one.neg();
    expect(negOne.equals(new Fraction(-1))).toBe(true);
  });

  it("div by self gives one for 3/7", () => {
    const a = new Fraction(3, 7);
    expect(a.div(a).equals(Fraction.one())).toBe(true);
  });

  it("div by self gives one for -2/9", () => {
    const a = new Fraction(-2, 9);
    expect(a.div(a).equals(Fraction.one())).toBe(true);
  });

  it("div by self gives one for 5/1", () => {
    const a = new Fraction(5, 1);
    expect(a.div(a).equals(Fraction.one())).toBe(true);
  });
});

describe("Fraction comparison and clone tests", () => {
  it("clone produces equal but distinct object", () => {
    const f = new Fraction(3, 7);
    const c = f.clone();
    expect(c.equals(f)).toBe(true);
    expect(c).not.toBe(f);
  });

  it("clone of negative fraction is equal but distinct", () => {
    const f = new Fraction(-5, 11);
    const c = f.clone();
    expect(c.equals(f)).toBe(true);
    expect(c).not.toBe(f);
  });

  it("clone of zero is equal but distinct", () => {
    const f = Fraction.zero();
    const c = f.clone();
    expect(c.equals(f)).toBe(true);
    expect(c).not.toBe(f);
  });

  it("equals returns true for same fraction", () => {
    const a = new Fraction(2, 5);
    const b = new Fraction(2, 5);
    expect(a.equals(b)).toBe(true);
  });

  it("equals returns false for different fractions", () => {
    const a = new Fraction(1, 3);
    const b = new Fraction(1, 4);
    expect(a.equals(b)).toBe(false);
  });

  it("equals returns false for fractions with same value but different sign", () => {
    const a = new Fraction(2, 5);
    const b = new Fraction(-2, 5);
    expect(a.equals(b)).toBe(false);
  });

  it("isZero returns true for zero fraction", () => {
    expect(new Fraction(0, 1).isZero()).toBe(true);
    expect(new Fraction(0, 999).isZero()).toBe(true);
    expect(Fraction.zero().isZero()).toBe(true);
  });

  it("isZero returns false for non-zero fraction", () => {
    expect(new Fraction(1, 1000).isZero()).toBe(false);
    expect(new Fraction(-1, 1000).isZero()).toBe(false);
    expect(Fraction.one().isZero()).toBe(false);
  });

  it("equals across equivalent constructions: 1/2 vs 2/4", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(2, 4);
    expect(a.equals(b)).toBe(true);
  });

  it("equals across equivalent constructions: 3/5 vs 9/15", () => {
    const a = new Fraction(3, 5);
    const b = new Fraction(9, 15);
    expect(a.equals(b)).toBe(true);
  });

  it("equals across equivalent constructions: -2/3 vs 2/-3", () => {
    const a = new Fraction(-2, 3);
    const b = new Fraction(2, -3);
    expect(a.equals(b)).toBe(true);
  });
});

describe("Fraction static factory tests", () => {
  it("Fraction.zero().isZero() is true", () => {
    expect(Fraction.zero().isZero()).toBe(true);
  });

  it("Fraction.zero().num === 0", () => {
    expect(Fraction.zero().num).toBe(0);
  });

  it("Fraction.one().num === 1", () => {
    expect(Fraction.one().num).toBe(1);
  });

  it("Fraction.one().den === 1", () => {
    expect(Fraction.one().den).toBe(1);
  });

  it("Fraction.zero().den === 1", () => {
    expect(Fraction.zero().den).toBe(1);
  });

  it("Fraction.one().equals(new Fraction(1))", () => {
    expect(Fraction.one().equals(new Fraction(1))).toBe(true);
  });
});
