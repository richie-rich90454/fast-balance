import { describe, it, expect } from "vitest";
import { Fraction } from "../index";

describe("fraction constructor edge cases", () => {
  it("new Fraction(0, 1) creates zero", () => {
    const f = new Fraction(0, 1);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("new Fraction(0, 2) normalizes to 0/1", () => {
    const f = new Fraction(0, 2);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("new Fraction(1, 2) creates one half", () => {
    const f = new Fraction(1, 2);
    expect(f.num).toBe(1);
    expect(f.den).toBe(2);
  });

  it("new Fraction(-1, 2) creates negative one half", () => {
    const f = new Fraction(-1, 2);
    expect(f.num).toBe(-1);
    expect(f.den).toBe(2);
  });

  it("new Fraction(1, -2) normalizes to -1/2", () => {
    const f = new Fraction(1, -2);
    expect(f.num).toBe(-1);
    expect(f.den).toBe(2);
  });
});
