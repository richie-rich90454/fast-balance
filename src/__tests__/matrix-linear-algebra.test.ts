import { describe, it, expect } from "vitest";
import {
  Fraction,
  buildMatrix,
  splitEquation,
  type Species,
} from "../index";

describe("buildMatrix dimension tests", () => {
  it("builds 1-element 1-row matrix for a single species", () => {
    const reactants: Species[] = [
      { formula: "H", elements: { H: 1 }, charge: 0 },
    ];
    const products: Species[] = [];
    const { matrix, cols } = buildMatrix(reactants, products);
    expect(matrix.length).toBe(1);
    expect(cols).toBe(1);
    expect(matrix[0]!.length).toBe(1);
  });

  it("builds 2x3 matrix for H2 + O2 -> H2O", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(matrix.length).toBe(2);
    expect(cols).toBe(3);
    for (const row of matrix) expect(row.length).toBe(3);
  });

  it("builds 3x4 matrix for Fe + S + O -> FeSO4 (positive check)", () => {
    const eq = splitEquation("Fe + S + O -> FeSO4");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(matrix.length).toBe(3);
    expect(cols).toBe(4);
    for (const row of matrix) expect(row.length).toBe(4);
  });

  it("builds 2x3 matrix for N2 + H2 -> NH3", () => {
    const eq = splitEquation("N2 + H2 -> NH3");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(matrix.length).toBe(2);
    expect(cols).toBe(3);
    for (const row of matrix) expect(row.length).toBe(3);
  });

  it("rows equal unique elements plus 1 if any species has charge", () => {
    const eq1 = splitEquation("H2 + O2 -> H2O");
    const r1 = buildMatrix(eq1.reactants, eq1.products);
    expect(r1.matrix.length).toBe(2);

    const eq2 = splitEquation("Fe2+ + Cl- -> FeCl2");
    const r2 = buildMatrix(eq2.reactants, eq2.products);
    expect(r2.matrix.length).toBe(3);
  });

  it("cols equals total number of species (reactants + products)", () => {
    const eq = splitEquation("CH4 + O2 -> CO2 + H2O");
    const { cols } = buildMatrix(eq.reactants, eq.products);
    expect(cols).toBe(eq.reactants.length + eq.products.length);
    expect(cols).toBe(4);
  });

  it("matrix is an array of arrays of Fractions", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    expect(Array.isArray(matrix)).toBe(true);
    for (const row of matrix) {
      expect(Array.isArray(row)).toBe(true);
      for (const cell of row) {
        expect(cell).toBeInstanceOf(Fraction);
      }
    }
  });

  it("all elements from all species appear as rows in the matrix", () => {
    const eq = splitEquation("Fe + S + O -> FeSO4");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    const elementRows: Record<string, number> = {};
    for (const sp of [...eq.reactants, ...eq.products]) {
      for (const el in sp.elements) elementRows[el] = 0;
    }
    expect(matrix.length).toBeGreaterThanOrEqual(
      Object.keys(elementRows).length
    );
  });
});
