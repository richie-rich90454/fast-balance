import { describe, it, expect } from "vitest";
import { solveSystem, fractionsToIntegers, Fraction, splitEquation, buildMatrix } from "../index";

describe("solveSystem with known equations", () => {
  it("solves H2 + O2 -> H2O matrix correctly", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const result = solveSystem(matrix, cols);
    const ints = fractionsToIntegers(result);
    expect(ints).toEqual([2, 1, 2]);
  });
  it("solves N2 + H2 -> NH3 matrix correctly", () => {
    const eq = splitEquation("N2 + H2 -> NH3");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const result = solveSystem(matrix, cols);
    const ints = fractionsToIntegers(result);
    expect(ints).toEqual([1, 3, 2]);
  });
  it("solves CH4 + O2 -> CO2 + H2O matrix correctly", () => {
    const eq = splitEquation("CH4 + O2 -> CO2 + H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const result = solveSystem(matrix, cols);
    const ints = fractionsToIntegers(result);
    expect(ints).toEqual([1, 2, 1, 2]);
  });
  it("solves Fe2O3 + CO -> Fe + CO2 matrix correctly", () => {
    const eq = splitEquation("Fe2O3 + CO -> Fe + CO2");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const result = solveSystem(matrix, cols);
    const ints = fractionsToIntegers(result);
    expect(ints).toEqual([1, 3, 2, 3]);
  });
});
