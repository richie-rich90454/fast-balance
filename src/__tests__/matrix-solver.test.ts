import { describe, it, expect } from "vitest";
import { solveSystem, fractionsToIntegers, Fraction } from "../index";

describe("solveSystem basic", () => {
  it("solves simple 2-variable system with one free variable", () => {
    const matrix = [
      [new Fraction(1), new Fraction(-1)],
    ];
    const result = solveSystem(matrix, 2);
    expect(result.length).toBe(2);
    expect(result[0]!.equals(new Fraction(1))).toBe(true);
    expect(result[1]!.equals(new Fraction(1))).toBe(true);
  });

  it("returns array of Fractions with correct length", () => {
    const matrix = [
      [new Fraction(1), new Fraction(1), new Fraction(1)],
    ];
    const result = solveSystem(matrix, 3);
    expect(result.length).toBe(3);
    for (const f of result) {
      expect(f).toBeInstanceOf(Fraction);
    }
  });

  it("solves system from H2 + O2 -> H2O equation", () => {
    const matrix = [
      [new Fraction(2), new Fraction(0), new Fraction(-2)],
      [new Fraction(0), new Fraction(2), new Fraction(-1)],
    ];
    const result = solveSystem(matrix, 3);
    expect(result[0]!.equals(new Fraction(1))).toBe(true);
    expect(result[1]!.equals(new Fraction(1, 2))).toBe(true);
    expect(result[2]!.equals(new Fraction(1))).toBe(true);
  });

  it("solves system with charge conservation row", () => {
    const matrix = [
      [new Fraction(1), new Fraction(0), new Fraction(0), new Fraction(-1), new Fraction(0)],
      [new Fraction(4), new Fraction(0), new Fraction(0), new Fraction(0), new Fraction(-1)],
      [new Fraction(0), new Fraction(1), new Fraction(0), new Fraction(0), new Fraction(-2)],
      [new Fraction(-1), new Fraction(1), new Fraction(-1), new Fraction(2), new Fraction(0)],
    ];
    const result = solveSystem(matrix, 5);
    expect(result.length).toBe(5);
    expect(result.every(f => !f.isZero())).toBe(true);
    for (const row of matrix) {
      let sum = new Fraction(0);
      for (let j = 0; j < 5; j++) sum = sum.add(row[j]!.mul(result[j]!));
      expect(sum.isZero()).toBe(true);
    }
  });
});

describe("solveSystem edge cases", () => {
  it("handles all-zero row correctly", () => {
    const matrix = [
      [new Fraction(1), new Fraction(-1)],
      [new Fraction(0), new Fraction(0)],
    ];
    const result = solveSystem(matrix, 2);
    expect(result[0]!.equals(new Fraction(1))).toBe(true);
    expect(result[1]!.equals(new Fraction(1))).toBe(true);
  });

  it("throws on system with no free variables (unbalanceable)", () => {
    const matrix = [
      [new Fraction(1), new Fraction(0)],
      [new Fraction(0), new Fraction(1)],
    ];
    expect(() => solveSystem(matrix, 2)).toThrow("Unbalanceable equation");
  });

  it("handles single column system", () => {
    const matrix = [
      [new Fraction(0)],
    ];
    const result = solveSystem(matrix, 1);
    expect(result.length).toBe(1);
    expect(result[0]!.equals(new Fraction(1))).toBe(true);
  });
});

describe("fractionsToIntegers basic", () => {
  it("converts [1/2, 1/2] to [1, 1]", () => {
    const result = fractionsToIntegers([new Fraction(1, 2), new Fraction(1, 2)]);
    expect(result).toEqual([1, 1]);
  });

  it("converts [2/3, 4/3] to [1, 2]", () => {
    const result = fractionsToIntegers([new Fraction(2, 3), new Fraction(4, 3)]);
    expect(result).toEqual([1, 2]);
  });

  it("converts [1/3, 2/3] to [1, 2]", () => {
    const result = fractionsToIntegers([new Fraction(1, 3), new Fraction(2, 3)]);
    expect(result).toEqual([1, 2]);
  });

  it("converts whole numbers unchanged", () => {
    const result = fractionsToIntegers([new Fraction(3), new Fraction(5)]);
    expect(result).toEqual([3, 5]);
  });
});

describe("fractionsToIntegers sign and edge cases", () => {
  it("flips sign when negatives predominate", () => {
    const result = fractionsToIntegers([new Fraction(-1), new Fraction(-2)]);
    expect(result).toEqual([1, 2]);
  });

  it("reduces by GCD after scaling", () => {
    const result = fractionsToIntegers([new Fraction(2, 3), new Fraction(4, 3)]);
    expect(result).toEqual([1, 2]);
  });

  it("handles all positive fractions", () => {
    const result = fractionsToIntegers([new Fraction(1, 4), new Fraction(3, 4)]);
    expect(result).toEqual([1, 3]);
  });

  it("handles single fraction", () => {
    const result = fractionsToIntegers([new Fraction(3, 4)]);
    expect(result).toEqual([1]);
  });
});
