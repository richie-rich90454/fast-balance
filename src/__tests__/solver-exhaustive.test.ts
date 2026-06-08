import { describe, it, expect } from "vitest";
import { gcd, lcm, stripStateSymbols, splitEquation, buildMatrix, Fraction } from "../index";

describe("gcd exhaustive", () => {
  it("returns gcd(12, 8) = 4", () => {
    expect(gcd(12, 8)).toBe(4);
  });

  it("returns gcd(0, 5) = 5", () => {
    expect(gcd(0, 5)).toBe(5);
  });

  it("returns gcd(5, 0) = 5", () => {
    expect(gcd(5, 0)).toBe(5);
  });

  it("returns gcd(0, 0) = 0", () => {
    expect(gcd(0, 0)).toBe(0);
  });

  it("returns gcd(1, 1) = 1", () => {
    expect(gcd(1, 1)).toBe(1);
  });

  it("returns gcd(100, 75) = 25", () => {
    expect(gcd(100, 75)).toBe(25);
  });

  it("returns gcd(17, 13) = 1 (coprime)", () => {
    expect(gcd(17, 13)).toBe(1);
  });

  it("returns gcd(-12, 8) = 4 (absolute value)", () => {
    expect(gcd(-12, 8)).toBe(4);
  });

  it("returns gcd(12, -8) = 4 (absolute value)", () => {
    expect(gcd(12, -8)).toBe(4);
  });

  it("returns gcd(7, 7) = 7", () => {
    expect(gcd(7, 7)).toBe(7);
  });
});

describe("lcm exhaustive", () => {
  it("returns lcm(4, 6) = 12", () => {
    expect(lcm(4, 6)).toBe(12);
  });

  it("returns lcm(3, 7) = 21", () => {
    expect(lcm(3, 7)).toBe(21);
  });

  it("returns lcm(1, 1) = 1", () => {
    expect(lcm(1, 1)).toBe(1);
  });

  it("returns lcm(0, 5) = 0", () => {
    expect(lcm(0, 5)).toBe(0);
  });

  it("returns lcm(5, 0) = 0", () => {
    expect(lcm(5, 0)).toBe(0);
  });

  it("returns lcm(12, 8) = 24", () => {
    expect(lcm(12, 8)).toBe(24);
  });

  it("returns lcm(100, 75) = 300", () => {
    expect(lcm(100, 75)).toBe(300);
  });

  it("returns lcm(1, 100) = 100", () => {
    expect(lcm(1, 100)).toBe(100);
  });
});

describe("stripStateSymbols exhaustive", () => {
  it("strips (s) from NaCl(s)", () => {
    expect(stripStateSymbols("NaCl(s)")).toBe("NaCl");
  });

  it("strips (l) from H2O(l)", () => {
    expect(stripStateSymbols("H2O(l)")).toBe("H2O");
  });

  it("strips (g) from CO2(g)", () => {
    expect(stripStateSymbols("CO2(g)")).toBe("CO2");
  });

  it("strips (aq) from Na+(aq)", () => {
    expect(stripStateSymbols("Na+(aq)")).toBe("Na+");
  });

  it("strips (aq) from Fe2+(aq)", () => {
    expect(stripStateSymbols("Fe2+(aq)")).toBe("Fe2+");
  });

  it("strips (aq) from Cl-(aq)", () => {
    expect(stripStateSymbols("Cl-(aq)")).toBe("Cl-");
  });

  it("strips (solid) from H2O(solid)", () => {
    expect(stripStateSymbols("H2O(solid)")).toBe("H2O");
  });

  it("strips (liquid) from H2O(liquid)", () => {
    expect(stripStateSymbols("H2O(liquid)")).toBe("H2O");
  });

  it("strips (gas) from H2O(gas)", () => {
    expect(stripStateSymbols("H2O(gas)")).toBe("H2O");
  });

  it("strips (cr) from NaCl(cr)", () => {
    expect(stripStateSymbols("NaCl(cr)")).toBe("NaCl");
  });

  it("strips (am) from NaCl(am)", () => {
    expect(stripStateSymbols("NaCl(am)")).toBe("NaCl");
  });

  it("strips (aqueous) from H2O(aqueous)", () => {
    expect(stripStateSymbols("H2O(aqueous)")).toBe("H2O");
  });
});

describe("splitEquation exhaustive", () => {
  it("splits H2 + O2 -> H2O correctly", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
    expect(eq.reactants[0].formula).toBe("H2");
    expect(eq.reactants[1].formula).toBe("O2");
    expect(eq.products[0].formula).toBe("H2O");
  });

  it("splits Fe + Cl2 -> FeCl3 correctly", () => {
    const eq = splitEquation("Fe + Cl2 -> FeCl3");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
    expect(eq.reactants[0].elements).toEqual({ Fe: 1 });
    expect(eq.reactants[1].elements).toEqual({ Cl: 2 });
    expect(eq.products[0].elements).toEqual({ Fe: 1, Cl: 3 });
  });

  it("handles Unicode arrow →", () => {
    const eq = splitEquation("H2 + O2 → H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
  });

  it("handles equilibrium arrow ⇌", () => {
    const eq = splitEquation("H2 + O2 ⇌ H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
  });

  it("handles <=> arrow", () => {
    const eq = splitEquation("H2 + O2 <=> H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
  });

  it("handles <-> arrow", () => {
    const eq = splitEquation("H2 + O2 <-> H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
  });

  it("handles --> arrow", () => {
    const eq = splitEquation("H2 + O2 --> H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
  });

  it("handles = arrow", () => {
    const eq = splitEquation("H2 + O2 = H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
  });

  it("strips state symbols from formulas", () => {
    const eq = splitEquation("NaCl(s) + H2O(l) -> Na+(aq) + Cl-(aq)");
    expect(eq.reactants[0].formula).toBe("NaCl");
    expect(eq.reactants[1].formula).toBe("H2O");
    expect(eq.products[0].formula).toBe("Na+");
    expect(eq.products[1].formula).toBe("Cl-");
  });

  it("ignores leading coefficients in input", () => {
    const eq = splitEquation("2 H2 + O2 -> 2 H2O");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
    expect(eq.reactants[0].formula).toBe("H2");
    expect(eq.products[0].formula).toBe("H2O");
  });

  it("throws on missing arrow", () => {
    expect(() => splitEquation("H2 + O2 H2O")).toThrow();
  });

  it("throws on empty left side", () => {
    expect(() => splitEquation("-> H2O")).toThrow();
  });

  it("throws on empty right side", () => {
    expect(() => splitEquation("H2 + O2 ->")).toThrow();
  });
});

describe("buildMatrix exhaustive", () => {
  it("creates correct matrix dimensions for H2 + O2 -> H2O", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(matrix).toHaveLength(2); // H and O rows, no charge row
    expect(cols).toBe(3); // H2, O2, H2O
  });

  it("creates correct matrix for Fe + Cl2 -> FeCl3", () => {
    const eq = splitEquation("Fe + Cl2 -> FeCl3");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(matrix).toHaveLength(2); // Fe and Cl rows, no charge row
    expect(cols).toBe(3);
    // Fe row: [1, 0, -1]
    expect(matrix[0]![0]).toEqual(new Fraction(1));
    expect(matrix[0]![1]).toEqual(new Fraction(0));
    expect(matrix[0]![2]).toEqual(new Fraction(-1));
    // Cl row: [0, 2, -3]
    expect(matrix[1]![0]).toEqual(new Fraction(0));
    expect(matrix[1]![1]).toEqual(new Fraction(2));
    expect(matrix[1]![2]).toEqual(new Fraction(-3));
  });

  it("includes charge row for ionic equation with charges", () => {
    const eq = splitEquation("Fe2+ + Cl- -> FeCl2");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    // Fe row, Cl row, and charge row
    expect(matrix.length).toBeGreaterThanOrEqual(3);
    const chargeRow = matrix[matrix.length - 1]!;
    expect(chargeRow).toBeDefined();
  });

  it("reactant entries are positive (sign convention)", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    for (const row of matrix) {
      for (let j = 0; j < 2; j++) {
        if (!row[j]!.isZero()) {
          expect(row[j]!.num).toBeGreaterThan(0);
        }
      }
    }
  });

  it("product entries are negative (sign convention)", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    for (const row of matrix) {
      if (!row[2]!.isZero()) {
        expect(row[2]!.num).toBeLessThan(0);
      }
    }
  });

  it("omits charge row when no species has charge", () => {
    const eq = splitEquation("CaCO3 -> CaO + CO2");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    // Ca, C, O rows only — no charge row
    expect(matrix).toHaveLength(3);
  });

  it("handles single species on each side", () => {
    const eq = splitEquation("O2 -> O2");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(cols).toBe(2);
    expect(matrix).toHaveLength(1);
    expect(matrix[0]![0]).toEqual(new Fraction(2));
    expect(matrix[0]![1]).toEqual(new Fraction(-2));
  });

  it("charge row values follow sign convention", () => {
    const eq = splitEquation("Na+ + Cl- -> NaCl");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    const chargeRow = matrix[matrix.length - 1]!;
    // Na+ is reactant: +1, Cl- is reactant: -1, NaCl is product: 0 (negated)
    expect(chargeRow![0]).toEqual(new Fraction(1));
    expect(chargeRow![1]).toEqual(new Fraction(-1));
    expect(chargeRow![2]).toEqual(new Fraction(0));
  });
});
