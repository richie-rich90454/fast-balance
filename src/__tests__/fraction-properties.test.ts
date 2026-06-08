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
