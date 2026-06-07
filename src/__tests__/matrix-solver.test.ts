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
