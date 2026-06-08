import { describe, it, expect } from "vitest";
import { Fraction } from "../index";

describe("additive identity", () => {
  it("a + 0 = a for positive fraction", () => {
    const a = new Fraction(3, 7);
    expect(a.add(Fraction.zero()).equals(a)).toBe(true);
  });
  it("a + 0 = a for negative fraction", () => {
    const a = new Fraction(-5, 11);
    expect(a.add(Fraction.zero()).equals(a)).toBe(true);
  });
  it("0 + a = a for positive fraction", () => {
    const a = new Fraction(2, 9);
    expect(Fraction.zero().add(a).equals(a)).toBe(true);
  });
  it("a - 0 = a", () => {
    const a = new Fraction(7, 13);
    expect(a.sub(Fraction.zero()).equals(a)).toBe(true);
  });
  it("0 - a = -a", () => {
    const a = new Fraction(4, 15);
    expect(Fraction.zero().sub(a).equals(a.neg())).toBe(true);
  });
});

describe("additive annihilation", () => {
  it("a - a = 0", () => {
    const a = new Fraction(5, 8);
    expect(a.sub(a).isZero()).toBe(true);
  });
  it("a + (-a) = 0", () => {
    const a = new Fraction(3, 7);
    expect(a.add(a.neg()).isZero()).toBe(true);
  });
  it("0 - 0 = 0", () => {
    expect(Fraction.zero().sub(Fraction.zero()).isZero()).toBe(true);
  });
});

describe("multiplicative identity", () => {
  it("a * 1 = a for positive fraction", () => {
    const a = new Fraction(3, 7);
    expect(a.mul(Fraction.one()).equals(a)).toBe(true);
  });
  it("1 * a = a for negative fraction", () => {
    const a = new Fraction(-2, 5);
    expect(Fraction.one().mul(a).equals(a)).toBe(true);
  });
  it("a / 1 = a", () => {
    const a = new Fraction(7, 11);
    expect(a.div(Fraction.one()).equals(a)).toBe(true);
  });
  it("a * 1 = a for zero fraction", () => {
    expect(Fraction.zero().mul(Fraction.one()).isZero()).toBe(true);
  });
});

describe("multiplicative annihilation", () => {
  it("a * 0 = 0 for positive a", () => {
    const a = new Fraction(5, 9);
    expect(a.mul(Fraction.zero()).isZero()).toBe(true);
  });
  it("0 * a = 0 for negative a", () => {
    const a = new Fraction(-3, 4);
    expect(Fraction.zero().mul(a).isZero()).toBe(true);
  });
  it("0 * 0 = 0", () => {
    expect(Fraction.zero().mul(Fraction.zero()).isZero()).toBe(true);
  });
});

describe("commutativity", () => {
  it("a + b = b + a", () => {
    const a = new Fraction(2, 5);
    const b = new Fraction(3, 7);
    expect(a.add(b).equals(b.add(a))).toBe(true);
  });
  it("a * b = b * a", () => {
    const a = new Fraction(2, 5);
    const b = new Fraction(3, 7);
    expect(a.mul(b).equals(b.mul(a))).toBe(true);
  });
  it("commutativity with negative fractions", () => {
    const a = new Fraction(-1, 3);
    const b = new Fraction(2, 7);
    expect(a.add(b).equals(b.add(a))).toBe(true);
    expect(a.mul(b).equals(b.mul(a))).toBe(true);
  });
  it("commutativity with zero", () => {
    const a = new Fraction(4, 9);
    expect(a.add(Fraction.zero()).equals(Fraction.zero().add(a))).toBe(true);
    expect(a.mul(Fraction.zero()).equals(Fraction.zero().mul(a))).toBe(true);
  });
});
