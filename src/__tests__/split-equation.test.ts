import { describe, it, expect } from "vitest";
import { splitEquation, buildMatrix, Fraction } from "../index";

describe("splitEquation basic splitting", () => {
  it("splits H2 + O2 -> H2O into 2 reactants and 1 product", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
  });

  it("splits CaCO3 -> CaO + CO2 into 1 reactant and 2 products", () => {
    const eq = splitEquation("CaCO3 -> CaO + CO2");
    expect(eq.reactants).toHaveLength(1);
    expect(eq.products).toHaveLength(2);
  });

  it("correctly parses element maps for each species", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    expect(eq.reactants[0].elements).toEqual({ H: 2 });
    expect(eq.reactants[1].elements).toEqual({ O: 2 });
    expect(eq.products[0].elements).toEqual({ H: 2, O: 1 });
  });

  it("strips state symbols from formula display", () => {
    const eq = splitEquation("H2(g) + O2(g) -> H2O(l)");
    expect(eq.reactants[0].formula).toBe("H2");
    expect(eq.reactants[1].formula).toBe("O2");
    expect(eq.products[0].formula).toBe("H2O");
  });
});

describe("splitEquation arrow variants", () => {
  it("normalizes Unicode arrow → correctly", () => {
    const eq = splitEquation("H2 + O2 → H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
    expect(eq.products[0].elements).toEqual({ H: 2, O: 1 });
  });

  it("normalizes = sign correctly", () => {
    const eq = splitEquation("H2 + O2 = H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
    expect(eq.products[0].elements).toEqual({ H: 2, O: 1 });
  });

  it("normalizes ⇌ correctly", () => {
    const eq = splitEquation("H2 + O2 ⇌ H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
    expect(eq.products[0].elements).toEqual({ H: 2, O: 1 });
  });

  it("normalizes --> correctly", () => {
    const eq = splitEquation("H2 + O2 --> H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
    expect(eq.products[0].elements).toEqual({ H: 2, O: 1 });
  });
});

describe("splitEquation error handling", () => {
  it("throws on missing arrow", () => {
    expect(() => splitEquation("H2 + O2 H2O")).toThrow();
  });

  it("throws on empty left side", () => {
    expect(() => splitEquation("-> H2O")).toThrow();
  });

  it("throws on empty right side", () => {
    expect(() => splitEquation("H2 + O2 ->")).toThrow();
  });

  it("throws on multiple arrows", () => {
    expect(() => splitEquation("H2 → O2 → H2O")).toThrow();
  });
});

describe("buildMatrix basic construction", () => {
  it("creates correct number of rows and columns for H2 + O2 -> H2O", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(matrix).toHaveLength(2);
    expect(cols).toBe(3);
  });

  it("reactant entries are positive", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    for (const row of matrix) {
      for (let j = 0; j < 2; j++) {
        if (!row[j].isZero()) {
          expect(row[j].num).toBeGreaterThan(0);
        }
      }
    }
  });

  it("product entries are negative", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    for (const row of matrix) {
      if (!row[2].isZero()) {
        expect(row[2].num).toBeLessThan(0);
      }
    }
  });

  it("element values are correct for each cell", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    expect(matrix[0][0]).toEqual(new Fraction(2));
    expect(matrix[0][1].isZero()).toBe(true);
    expect(matrix[0][2]).toEqual(new Fraction(-2));
    expect(matrix[1][0].isZero()).toBe(true);
    expect(matrix[1][1]).toEqual(new Fraction(2));
    expect(matrix[1][2]).toEqual(new Fraction(-1));
  });
});
