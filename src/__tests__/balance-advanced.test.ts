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

describe("fraction arithmetic edge cases", () => {
  it("Fraction(1,2).add(Fraction(1,3)) = 5/6", () => {
    const result = new Fraction(1, 2).add(new Fraction(1, 3));
    expect(result.num).toBe(5);
    expect(result.den).toBe(6);
  });

  it("Fraction(1,2).sub(Fraction(1,3)) = 1/6", () => {
    const result = new Fraction(1, 2).sub(new Fraction(1, 3));
    expect(result.num).toBe(1);
    expect(result.den).toBe(6);
  });

  it("Fraction(1,2).mul(Fraction(2,3)) = 1/3", () => {
    const result = new Fraction(1, 2).mul(new Fraction(2, 3));
    expect(result.num).toBe(1);
    expect(result.den).toBe(3);
  });

  it("Fraction(1,2).div(Fraction(2,3)) = 3/4", () => {
    const result = new Fraction(1, 2).div(new Fraction(2, 3));
    expect(result.num).toBe(3);
    expect(result.den).toBe(4);
  });

  it("Fraction(0,1).add(Fraction(0,1)) = 0", () => {
    const result = new Fraction(0, 1).add(new Fraction(0, 1));
    expect(result.num).toBe(0);
    expect(result.den).toBe(1);
  });
});
