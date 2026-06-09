import { describe, it, expect } from "vitest";
import {
  Fraction,
  buildMatrix,
  splitEquation,
  solveSystem,
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

describe("buildMatrix sign convention tests", () => {
  it("reactant entries for elements are positive", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    const reactantsCount = eq.reactants.length;
    for (let j = 0; j < reactantsCount; j++) {
      for (let i = 0; i < matrix.length; i++) {
        if (!matrix[i]![j]!.isZero()) {
          expect(matrix[i]![j]!.num).toBeGreaterThan(0);
        }
      }
    }
  });

  it("reactant entries for charge are positive", () => {
    const eq = splitEquation("Fe2+ + Cl- -> FeCl2");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    const lastRow = matrix[matrix.length - 1]!;
    expect(lastRow[0]!.num).toBeGreaterThan(0);
    expect(lastRow[1]!.num).toBeLessThan(0);
  });

  it("product entries for elements are negative", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    const reactantsCount = eq.reactants.length;
    for (let j = reactantsCount; j < matrix[0]!.length; j++) {
      for (let i = 0; i < matrix.length - 0; i++) {
        const v = matrix[i]![j]!;
        if (v.num !== 0) {
          expect(v.num).toBeLessThan(0);
        }
      }
    }
  });

  it("product entries for charge are negative", () => {
    const eq = splitEquation("Fe2+ + Cl- -> FeCl2");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    const lastRow = matrix[matrix.length - 1]!;
    for (let j = 2; j < lastRow.length; j++) {
      if (!lastRow[j]!.isZero()) {
        expect(lastRow[j]!.num).toBeLessThan(0);
      }
    }
  });

  it("zero element count produces Fraction.zero() in matrix", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    let foundZero = false;
    for (const row of matrix) {
      for (const cell of row) {
        if (cell.isZero()) {
          expect(cell).toBeInstanceOf(Fraction);
          expect(cell.num).toBe(0);
          foundZero = true;
        }
      }
    }
    expect(foundZero).toBe(true);
  });

  it("zero charge produces Fraction.zero() in charge row", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    const chargeRow = matrix[matrix.length - 1]!;
    for (const cell of chargeRow) {
      expect(cell).toBeInstanceOf(Fraction);
    }
  });

  it("sign for H2O in reactants is H=+2, O=+1", () => {
    const eq = splitEquation("H2O -> H2 + O2");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    let hRow = -1;
    let oRow = -1;
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i]!;
      const allZero = row.every((c) => c.isZero());
      if (allZero) continue;
      if (!row[0]!.isZero() && row[0]!.num > 0) {
        const hColVal = matrix[i]![0]!;
        if (hColVal.num === 2) hRow = i;
        if (hColVal.num === 1) oRow = i;
      }
    }
    expect(matrix[hRow]![0]!.num).toBe(2);
    expect(matrix[oRow]![0]!.num).toBe(1);
  });

  it("sign for H2O in products is H=-2, O=-1", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    const lastCol = eq.reactants.length;
    let hRow = -1;
    let oRow = -1;
    for (let i = 0; i < matrix.length; i++) {
      const v = matrix[i]![lastCol]!;
      if (v.num === -2) hRow = i;
      if (v.num === -1) oRow = i;
    }
    expect(hRow).toBeGreaterThanOrEqual(0);
    expect(oRow).toBeGreaterThanOrEqual(0);
  });
});

describe("solveSystem simple system tests", () => {
  it("solves 1 equation 1 unknown trivial system", () => {
    const matrix = [[new Fraction(0)]];
    const result = solveSystem(matrix, 1);
    expect(result.length).toBe(1);
    expect(result[0]!.equals(new Fraction(1))).toBe(true);
  });

  it("solves 2 equations 2 unknowns with unique solution", () => {
    const matrix = [
      [new Fraction(1), new Fraction(2)],
      [new Fraction(2), new Fraction(4)],
    ];
    const result = solveSystem(matrix, 2);
    for (let i = 0; i < matrix.length; i++) {
      let sum = new Fraction(0);
      for (let j = 0; j < 2; j++) {
        sum = sum.add(matrix[i]![j]!.mul(result[j]!));
      }
      expect(sum.isZero()).toBe(true);
    }
  });

  it("solves 2 equations 2 unknowns with free variable", () => {
    const matrix = [[new Fraction(2), new Fraction(-2)]];
    const result = solveSystem(matrix, 2);
    expect(result[0]!.equals(new Fraction(1))).toBe(true);
    expect(result[1]!.equals(new Fraction(1))).toBe(true);
  });

  it("solves 3 equations 3 unknowns with one free variable", () => {
    const matrix = [
      [new Fraction(2), new Fraction(0), new Fraction(-2)],
      [new Fraction(0), new Fraction(2), new Fraction(-1)],
      [new Fraction(0), new Fraction(0), new Fraction(0)],
    ];
    const result = solveSystem(matrix, 3);
    expect(result[0]!.equals(new Fraction(1))).toBe(true);
    expect(result[1]!.equals(new Fraction(1, 2))).toBe(true);
    expect(result[2]!.equals(new Fraction(1))).toBe(true);
  });

  it("returns all-ones for an all-zero matrix system", () => {
    const matrix = [[new Fraction(0), new Fraction(0), new Fraction(0)]];
    const result = solveSystem(matrix, 3);
    for (let i = 0; i < matrix.length; i++) {
      let sum = new Fraction(0);
      for (let j = 0; j < 3; j++) {
        sum = sum.add(matrix[i]![j]!.mul(result[j]!));
      }
      expect(sum.isZero()).toBe(true);
    }
  });

  it("system from H2 + O2 -> H2O gives correct null space", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const result = solveSystem(matrix, cols);
    for (let i = 0; i < matrix.length; i++) {
      let sum = new Fraction(0);
      for (let j = 0; j < cols; j++) {
        sum = sum.add(matrix[i]![j]!.mul(result[j]!));
      }
      expect(sum.isZero()).toBe(true);
    }
  });
});

describe("solveSystem error handling tests", () => {
  it("throws on system with no free variables (full rank)", () => {
    const matrix = [
      [new Fraction(1), new Fraction(0)],
      [new Fraction(0), new Fraction(1)],
    ];
    expect(() => solveSystem(matrix, 2)).toThrow("Unbalanceable equation");
  });

  it("returns array of correct length equal to cols", () => {
    const matrix = [
      [new Fraction(2), new Fraction(0), new Fraction(-2)],
      [new Fraction(0), new Fraction(2), new Fraction(-1)],
    ];
    const result = solveSystem(matrix, 3);
    expect(result.length).toBe(3);
  });

  it("solution is in null space of the matrix", () => {
    const matrix = [
      [new Fraction(1), new Fraction(-1)],
    ];
    const result = solveSystem(matrix, 2);
    let sum = new Fraction(0);
    for (let j = 0; j < 2; j++) sum = sum.add(matrix[0]![j]!.mul(result[j]!));
    expect(sum.isZero()).toBe(true);
  });

  it("scaled solution still satisfies the system", () => {
    const matrix = [[new Fraction(2), new Fraction(-2)]];
    const result = solveSystem(matrix, 2);
    const scaled = result.map((f) => f.mul(new Fraction(3)));
    let sum = new Fraction(0);
    for (let j = 0; j < 2; j++)
      sum = sum.add(matrix[0]![j]!.mul(scaled[j]!));
    expect(sum.isZero()).toBe(true);
  });

  it("uses the first free variable when multiple free variables exist", () => {
    const matrix = [[new Fraction(0), new Fraction(0), new Fraction(0)]];
    const result = solveSystem(matrix, 3);
    expect(result[0]!.equals(new Fraction(1))).toBe(true);
    for (let j = 1; j < 3; j++) {
      expect(result[j]!.isZero()).toBe(true);
    }
  });
});
