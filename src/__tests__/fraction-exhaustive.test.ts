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
