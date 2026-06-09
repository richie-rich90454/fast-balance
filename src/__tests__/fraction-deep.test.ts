import { describe, it, expect } from "vitest";
import { Fraction } from "../index";

describe("fraction algebraic properties", () => {
  it("add commutativity: a+b = b+a (1/2+1/3 = 1/3+1/2)", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    expect(a.add(b).equals(b.add(a))).toBe(true);
  });

  it("add commutativity: a+b = b+a (3/4+2/5 = 2/5+3/4)", () => {
    const a = new Fraction(3, 4);
    const b = new Fraction(2, 5);
    expect(a.add(b).equals(b.add(a))).toBe(true);
  });

  it("add commutativity: a+b = b+a (-1/2+3/7 = 3/7+(-1/2))", () => {
    const a = new Fraction(-1, 2);
    const b = new Fraction(3, 7);
    expect(a.add(b).equals(b.add(a))).toBe(true);
  });

  it("add commutativity: a+b = b+a (0+5/6 = 5/6+0)", () => {
    const a = Fraction.zero();
    const b = new Fraction(5, 6);
    expect(a.add(b).equals(b.add(a))).toBe(true);
  });

  it("add associativity: (a+b)+c = a+(b+c) (1/2+1/3+1/4)", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const c = new Fraction(1, 4);
    expect(a.add(b).add(c).equals(a.add(b.add(c)))).toBe(true);
  });

  it("add associativity: (a+b)+c = a+(b+c) (2/5+3/7+1/2)", () => {
    const a = new Fraction(2, 5);
    const b = new Fraction(3, 7);
    const c = new Fraction(1, 2);
    expect(a.add(b).add(c).equals(a.add(b.add(c)))).toBe(true);
  });

  it("add associativity: (a+b)+c = a+(b+c) with negatives (-1/3+2/5+(-1/6))", () => {
    const a = new Fraction(-1, 3);
    const b = new Fraction(2, 5);
    const c = new Fraction(-1, 6);
    expect(a.add(b).add(c).equals(a.add(b.add(c)))).toBe(true);
  });

  it("mul commutativity: a*b = b*a (2/3*3/4 = 3/4*2/3)", () => {
    const a = new Fraction(2, 3);
    const b = new Fraction(3, 4);
    expect(a.mul(b).equals(b.mul(a))).toBe(true);
  });

  it("mul commutativity: a*b = b*a (-1/2*3/5 = 3/5*(-1/2))", () => {
    const a = new Fraction(-1, 2);
    const b = new Fraction(3, 5);
    expect(a.mul(b).equals(b.mul(a))).toBe(true);
  });

  it("mul commutativity: a*b = b*a (0*7/8 = 7/8*0)", () => {
    const a = Fraction.zero();
    const b = new Fraction(7, 8);
    expect(a.mul(b).equals(b.mul(a))).toBe(true);
  });

  it("mul associativity: (a*b)*c = a*(b*c) (1/2*2/3*3/4)", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(2, 3);
    const c = new Fraction(3, 4);
    expect(a.mul(b).mul(c).equals(a.mul(b.mul(c)))).toBe(true);
  });

  it("mul associativity: (a*b)*c = a*(b*c) (2/5*3/7*1/2)", () => {
    const a = new Fraction(2, 5);
    const b = new Fraction(3, 7);
    const c = new Fraction(1, 2);
    expect(a.mul(b).mul(c).equals(a.mul(b.mul(c)))).toBe(true);
  });

  it("mul associativity: (a*b)*c = a*(b*c) with negatives (-1/3*2/5*(-3/4))", () => {
    const a = new Fraction(-1, 3);
    const b = new Fraction(2, 5);
    const c = new Fraction(-3, 4);
    expect(a.mul(b).mul(c).equals(a.mul(b.mul(c)))).toBe(true);
  });

  it("distributive property: a*(b+c) = a*b+a*c (1/2*(1/3+1/4))", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const c = new Fraction(1, 4);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.equals(right)).toBe(true);
  });

  it("distributive property: a*(b+c) = a*b+a*c (2/3*(3/4+1/5))", () => {
    const a = new Fraction(2, 3);
    const b = new Fraction(3, 4);
    const c = new Fraction(1, 5);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.equals(right)).toBe(true);
  });

  it("distributive property: a*(b+c) = a*b+a*c with negatives (-1/3*(1/2+(-1/4)))", () => {
    const a = new Fraction(-1, 3);
    const b = new Fraction(1, 2);
    const c = new Fraction(-1, 4);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.equals(right)).toBe(true);
  });

  it("identity: a*1 = a for all a (3/4*1 = 3/4)", () => {
    const a = new Fraction(3, 4);
    expect(a.mul(Fraction.one()).equals(a)).toBe(true);
  });

  it("identity: a*1 = a for all a (-2/5*1 = -2/5)", () => {
    const a = new Fraction(-2, 5);
    expect(a.mul(Fraction.one()).equals(a)).toBe(true);
  });

  it("identity: a*1 = a for all a (0*1 = 0)", () => {
    const a = Fraction.zero();
    expect(a.mul(Fraction.one()).equals(a)).toBe(true);
  });

  it("identity: a*1 = a for all a (7/11*1 = 7/11)", () => {
    const a = new Fraction(7, 11);
    expect(a.mul(Fraction.one()).equals(a)).toBe(true);
  });

  it("identity: a+0 = a for all a (3/4+0 = 3/4)", () => {
    const a = new Fraction(3, 4);
    expect(a.add(Fraction.zero()).equals(a)).toBe(true);
  });

  it("identity: a+0 = a for all a (-2/5+0 = -2/5)", () => {
    const a = new Fraction(-2, 5);
    expect(a.add(Fraction.zero()).equals(a)).toBe(true);
  });

  it("identity: a+0 = a for all a (0+0 = 0)", () => {
    const a = Fraction.zero();
    expect(a.add(Fraction.zero()).equals(a)).toBe(true);
  });

  it("identity: a+0 = a for all a (7/11+0 = 7/11)", () => {
    const a = new Fraction(7, 11);
    expect(a.add(Fraction.zero()).equals(a)).toBe(true);
  });
});

describe("fraction boundary conditions", () => {
  it("Fraction(0,1) is zero", () => {
    const f = new Fraction(0, 1);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
    expect(f.isZero()).toBe(true);
  });

  it("Fraction(1,1) is one", () => {
    const f = new Fraction(1, 1);
    expect(f.num).toBe(1);
    expect(f.den).toBe(1);
    expect(f.equals(Fraction.one())).toBe(true);
  });

  it("Fraction(-1,1) is negative one", () => {
    const f = new Fraction(-1, 1);
    expect(f.num).toBe(-1);
    expect(f.den).toBe(1);
    expect(f.add(Fraction.one()).isZero()).toBe(true);
  });

  it("Fraction(0,5) normalizes to 0/1", () => {
    const f = new Fraction(0, 5);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("Fraction(0,-5) normalizes to 0/1", () => {
    const f = new Fraction(0, -5);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("Fraction(1000000,1) handles large numerator", () => {
    const f = new Fraction(1000000, 1);
    expect(f.num).toBe(1000000);
    expect(f.den).toBe(1);
  });

  it("Fraction(1,1000000) handles large denominator", () => {
    const f = new Fraction(1, 1000000);
    expect(f.num).toBe(1);
    expect(f.den).toBe(1000000);
  });

  it("Fraction(-0,1) is zero", () => {
    const f = new Fraction(-0, 1);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
    expect(f.isZero()).toBe(true);
  });

  it("Fraction(0,1).equals(Fraction(0,5)) is true", () => {
    const a = new Fraction(0, 1);
    const b = new Fraction(0, 5);
    expect(a.equals(b)).toBe(true);
  });

  it("Fraction(1,1).add(Fraction.zero()) equals Fraction(1,1)", () => {
    const a = new Fraction(1, 1);
    expect(a.add(Fraction.zero()).equals(a)).toBe(true);
  });

  it("Fraction(-1,1).add(Fraction(1,1)) is zero", () => {
    const a = new Fraction(-1, 1);
    const b = new Fraction(1, 1);
    expect(a.add(b).isZero()).toBe(true);
  });

  it("Fraction(0,1).mul(Fraction(1000000,1)) is zero", () => {
    const a = new Fraction(0, 1);
    const b = new Fraction(1000000, 1);
    expect(a.mul(b).isZero()).toBe(true);
  });

  it("Fraction(1,1000000).mul(Fraction(1000000,1)) is one", () => {
    const a = new Fraction(1, 1000000);
    const b = new Fraction(1000000, 1);
    expect(a.mul(b).equals(Fraction.one())).toBe(true);
  });

  it("Fraction(-1,1).neg() equals Fraction(1,1)", () => {
    const a = new Fraction(-1, 1);
    expect(a.neg().equals(new Fraction(1, 1))).toBe(true);
  });

  it("Fraction(0,-1) normalizes to 0/1", () => {
    const f = new Fraction(0, -1);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("Fraction(1000000,1000000) normalizes to 1/1", () => {
    const f = new Fraction(1000000, 1000000);
    expect(f.num).toBe(1);
    expect(f.den).toBe(1);
    expect(f.equals(Fraction.one())).toBe(true);
  });

  it("Fraction(-1000000,1) negated equals Fraction(1000000,1)", () => {
    const a = new Fraction(-1000000, 1);
    expect(a.neg().equals(new Fraction(1000000, 1))).toBe(true);
  });

  it("Fraction(1,1000000) + Fraction(1,1000000) = 1/500000", () => {
    const a = new Fraction(1, 1000000);
    const result = a.add(a);
    expect(result.num).toBe(1);
    expect(result.den).toBe(500000);
  });

  it("Fraction(-1,-1) normalizes to 1/1", () => {
    const f = new Fraction(-1, -1);
    expect(f.num).toBe(1);
    expect(f.den).toBe(1);
    expect(f.equals(Fraction.one())).toBe(true);
  });

  it("Fraction(0,1000000) normalizes to 0/1", () => {
    const f = new Fraction(0, 1000000);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });
});
