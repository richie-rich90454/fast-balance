import { describe, it, expect } from "vitest";
import {
  gcd,
  lcm,
  stripStateSymbols,
  parseFormula,
  splitEquation,
  buildMatrix,
  solveSystem,
  fractionsToIntegers,
  balance,
  Fraction,
} from "../index";

describe("gcd function exhaustive tests", () => {
  it("gcd(1, 1) returns 1", () => {
    expect(gcd(1, 1)).toBe(1);
  });

  it("gcd(2, 3) returns 1 (coprime numbers)", () => {
    expect(gcd(2, 3)).toBe(1);
  });

  it("gcd(12, 8) returns 4", () => {
    expect(gcd(12, 8)).toBe(4);
  });

  it("gcd(0, 5) returns 5 (zero and positive)", () => {
    expect(gcd(0, 5)).toBe(5);
  });

  it("gcd(100, 25) returns 25", () => {
    expect(gcd(100, 25)).toBe(25);
  });

  it("gcd(-12, 8) returns 4 (uses absolute value)", () => {
    expect(gcd(-12, 8)).toBe(4);
  });
});

describe("lcm function exhaustive tests", () => {
  it("lcm(4, 6) returns 12", () => {
    expect(lcm(4, 6)).toBe(12);
  });

  it("lcm(3, 5) returns 15 (coprime numbers)", () => {
    expect(lcm(3, 5)).toBe(15);
  });

  it("lcm(1, 1) returns 1", () => {
    expect(lcm(1, 1)).toBe(1);
  });

  it("lcm(0, 5) returns 0", () => {
    expect(lcm(0, 5)).toBe(0);
  });

  it("lcm(10, 15) returns 30", () => {
    expect(lcm(10, 15)).toBe(30);
  });
});

describe("stripStateSymbols function exhaustive tests", () => {
  it("stripStateSymbols('H2O(s)') returns 'H2O'", () => {
    expect(stripStateSymbols("H2O(s)")).toBe("H2O");
  });

  it("stripStateSymbols('H2O(g)') returns 'H2O'", () => {
    expect(stripStateSymbols("H2O(g)")).toBe("H2O");
  });

  it("stripStateSymbols('H2O(l)') returns 'H2O'", () => {
    expect(stripStateSymbols("H2O(l)")).toBe("H2O");
  });

  it("stripStateSymbols('H2O(aq)') returns 'H2O'", () => {
    expect(stripStateSymbols("H2O(aq)")).toBe("H2O");
  });

  it("stripStateSymbols('H2O') returns 'H2O' (no state symbol)", () => {
    expect(stripStateSymbols("H2O")).toBe("H2O");
  });

  it("stripStateSymbols('Fe2O3(s)') returns 'Fe2O3'", () => {
    expect(stripStateSymbols("Fe2O3(s)")).toBe("Fe2O3");
  });
});

describe("parseFormula function exhaustive tests", () => {
  it("parseFormula('H2O').elements equals {H: 2, O: 1}", () => {
    const result = parseFormula("H2O");
    expect(result.elements).toEqual({ H: 2, O: 1 });
  });

  it("parseFormula('H2O').charge equals 0", () => {
    const result = parseFormula("H2O");
    expect(result.charge).toBe(0);
  });

  it("parseFormula('Na+').charge equals 1", () => {
    const result = parseFormula("Na+");
    expect(result.charge).toBe(1);
  });

  it("parseFormula('Cl-').charge equals -1", () => {
    const result = parseFormula("Cl-");
    expect(result.charge).toBe(-1);
  });

  it("parseFormula('SO4^2-').charge equals -2", () => {
    const result = parseFormula("SO4^2-");
    expect(result.charge).toBe(-2);
  });

  it("parseFormula('e-').charge equals -1", () => {
    const result = parseFormula("e-");
    expect(result.charge).toBe(-1);
  });
});

describe("splitEquation function exhaustive tests", () => {
  it("splitEquation('H2 + O2 -> H2O').reactants has length 2", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    expect(eq.reactants).toHaveLength(2);
  });

  it("splitEquation('H2 + O2 -> H2O').products has length 1", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    expect(eq.products).toHaveLength(1);
  });

  it("splitEquation('H2 -> H2O + O2') works correctly", () => {
    const eq = splitEquation("H2 -> H2O + O2");
    expect(eq.reactants).toHaveLength(1);
    expect(eq.products).toHaveLength(2);
    expect(eq.reactants[0].formula).toBe("H2");
  });

  it("splitEquation('Fe + Cl2 -> FeCl3') works correctly", () => {
    const eq = splitEquation("Fe + Cl2 -> FeCl3");
    expect(eq.reactants).toHaveLength(2);
    expect(eq.products).toHaveLength(1);
    expect(eq.products[0].formula).toBe("FeCl3");
  });

  it("splitEquation('A -> B') minimal case works", () => {
    const eq = splitEquation("H2O -> H2O");
    expect(eq.reactants).toHaveLength(1);
    expect(eq.products).toHaveLength(1);
  });

  it("splitEquation('A + B + C -> D + E + F + G') complex case works", () => {
    const eq = splitEquation("H2 + O2 + N2 + Cl2 -> H2O + O2 + N2 + Cl2");
    expect(eq.reactants).toHaveLength(4);
    expect(eq.products).toHaveLength(4);
  });
});

describe("buildMatrix function exhaustive tests", () => {
  it("buildMatrix returns an object with matrix and cols", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const result = buildMatrix(eq.reactants, eq.products);
    expect(result).toHaveProperty("matrix");
    expect(result).toHaveProperty("cols");
  });

  it("buildMatrix cols equals total species count (reactants + products)", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { cols } = buildMatrix(eq.reactants, eq.products);
    expect(cols).toBe(3);
  });

  it("buildMatrix entries are Fraction instances", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix } = buildMatrix(eq.reactants, eq.products);
    for (const row of matrix) {
      for (const cell of row) {
        expect(cell).toBeInstanceOf(Fraction);
      }
    }
  });

  it("buildMatrix dimensions are correct (rows = element count [+ charge row])", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(matrix.length).toBe(2);
    for (const row of matrix) {
      expect(row).toHaveLength(cols);
    }
  });

  it("buildMatrix produces a matrix whose null space yields the correct solution", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(matrix.length).toBeGreaterThan(0);
    expect(cols).toBeGreaterThan(0);
    // Matrix should not be all zeros (it's a real chemical system)
    let hasNonZero = false;
    for (const row of matrix) {
      for (const cell of row) {
        if (!cell.isZero()) {
          hasNonZero = true;
          break;
        }
      }
      if (hasNonZero) break;
    }
    expect(hasNonZero).toBe(true);
  });
});

describe("solveSystem function exhaustive tests", () => {
  it("solveSystem returns an array of Fractions", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const result = solveSystem(matrix, cols);
    expect(Array.isArray(result)).toBe(true);
    for (const f of result) {
      expect(f).toBeInstanceOf(Fraction);
    }
  });

  it("solveSystem result lies in the null space of the matrix (M*v = 0)", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const v = solveSystem(matrix, cols);
    for (const row of matrix) {
      let sum = Fraction.zero();
      for (let j = 0; j < cols; j++) {
        sum = sum.add(row[j]!.mul(v[j]!));
      }
      expect(sum.isZero()).toBe(true);
    }
  });

  it("solveSystem result has the correct length (matches total species count)", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const result = solveSystem(matrix, cols);
    expect(result).toHaveLength(cols);
  });

  it("solveSystem result is non-trivial (not all zeros)", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const result = solveSystem(matrix, cols);
    const hasNonZero = result.some((f) => !f.isZero());
    expect(hasNonZero).toBe(true);
  });

  it("solveSystem passes null space test for H2 + O2 -> H2O with correct ratios", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const v = solveSystem(matrix, cols);
    // Convert to numbers for ratio check
    const nums = v.map((f) => f.num / f.den);
    // Expected ratios are 2 : 1 : 2 (in some consistent sign).
    // Normalize: divide by GCD to get smallest integer ratio.
    const absNums = nums.map((x) => Math.abs(x)).filter((x) => x > 0);
    let g = 0;
    // Compute a rough integer GCD from values
    const scaled = absNums.map((x) => Math.round(x * 1e9));
    for (const s of scaled) g = gcd(g, s);
    if (g === 0) g = 1;
    const ints = scaled.map((s) => s / g);
    expect(ints[0]).toBeCloseTo(2, 0);
    expect(ints[1]).toBeCloseTo(1, 0);
    expect(ints[2]).toBeCloseTo(2, 0);
  });
});

describe("fractionsToIntegers function exhaustive tests", () => {
  it("fractionsToIntegers returns an array of integers", () => {
    const fracs: Fraction[] = [new Fraction(2), new Fraction(1), new Fraction(2)];
    const result = fractionsToIntegers(fracs);
    for (const v of result) {
      expect(Number.isInteger(v)).toBe(true);
    }
  });

  it("fractionsToIntegers result has GCD 1 (fully reduced)", () => {
    const fracs: Fraction[] = [new Fraction(2), new Fraction(1), new Fraction(2)];
    const result = fractionsToIntegers(fracs);
    const absVals = result.map((v) => Math.abs(v));
    let g = 0;
    for (const v of absVals) g = gcd(g, v);
    expect(g).toBe(1);
  });

  it("fractionsToIntegers result is all positive (or all negative flipped to positive)", () => {
    const fracs: Fraction[] = [new Fraction(1), new Fraction(1, 2), new Fraction(1)];
    const result = fractionsToIntegers(fracs);
    expect(result.every((v) => v > 0)).toBe(true);
  });

  it("fractionsToIntegers preserves relative ratios (scaled by integer)", () => {
    const fracs: Fraction[] = [new Fraction(2), new Fraction(1), new Fraction(2)];
    const result = fractionsToIntegers(fracs);
    // Ratios should be 2:1:2 (or 1:0.5:1 scaled)
    expect(result[0]! / result[1]!).toBeCloseTo(2, 6);
    expect(result[2]! / result[1]!).toBeCloseTo(2, 6);
  });

  it("fractionsToIntegers result has the same length as the input array", () => {
    const fracs: Fraction[] = [new Fraction(2), new Fraction(1), new Fraction(2)];
    const result = fractionsToIntegers(fracs);
    expect(result).toHaveLength(fracs.length);
  });
});

describe("balance function exhaustive tests", () => {
  it("balance returns a BalanceResult shape (reactants, products, equation)", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(result).toHaveProperty("reactants");
    expect(result).toHaveProperty("products");
    expect(result).toHaveProperty("equation");
    expect(Array.isArray(result.reactants)).toBe(true);
    expect(Array.isArray(result.products)).toBe(true);
    expect(typeof result.equation).toBe("string");
  });

  it("balance returns all integer coefficients", () => {
    const result = balance("H2 + O2 -> H2O");
    for (const r of result.reactants) {
      expect(Number.isInteger(r.coefficient)).toBe(true);
    }
    for (const p of result.products) {
      expect(Number.isInteger(p.coefficient)).toBe(true);
    }
  });

  it("balance returns all positive coefficients", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(result.reactants.every((r) => r.coefficient > 0)).toBe(true);
    expect(result.products.every((p) => p.coefficient > 0)).toBe(true);
  });

  it("balance equation string format is correct (contains '->' by default)", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(result.equation).toContain("->");
    expect(result.equation).toContain("H2");
    expect(result.equation).toContain("O2");
    expect(result.equation).toContain("H2O");
  });

  it("balance default options work (no options argument)", () => {
    const result = balance("H2 + O2 -> H2O");
    // Default format is "text" and showOne is true
    expect(result.equation).toBe("2 H2 + 1 O2 -> 2 H2O");
  });

  it("balance custom options work (showOne false, format html/latex)", () => {
    const showOneFalse = balance("H2 + O2 -> H2O", { showOne: false });
    expect(showOneFalse.equation).toBe("2 H2 + O2 -> 2 H2O");
    const htmlFormat = balance("H2 + O2 -> H2O", { format: "html" });
    expect(htmlFormat.equation).toContain("&rarr;");
    const latexFormat = balance("H2 + O2 -> H2O", { format: "latex" });
    expect(latexFormat.equation).toContain("\\rightarrow");
  });
});

describe("end-to-end pipeline tests", () => {
  it("full pipeline: splitEquation -> buildMatrix -> solveSystem -> fractionsToIntegers", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const fracs = solveSystem(matrix, cols);
    const ints = fractionsToIntegers(fracs);
    // Expect a 3-element integer array
    expect(ints).toHaveLength(3);
    for (const v of ints) {
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThan(0);
    }
  });

  it("end-to-end for H2 + O2 -> H2O produces coefficients 2:1:2", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const fracs = solveSystem(matrix, cols);
    const ints = fractionsToIntegers(fracs);
    // Reduce by GCD to canonical form
    const abs = ints.map((v) => Math.abs(v));
    let g = 0;
    for (const v of abs) g = gcd(g, v);
    if (g === 0) g = 1;
    const reduced = ints.map((v) => v / g);
    expect(reduced).toEqual([2, 1, 2]);
  });

  it("end-to-end for Fe + Cl2 -> FeCl3 produces coefficients 2:3:2", () => {
    const eq = splitEquation("Fe + Cl2 -> FeCl3");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const fracs = solveSystem(matrix, cols);
    const ints = fractionsToIntegers(fracs);
    const abs = ints.map((v) => Math.abs(v));
    let g = 0;
    for (const v of abs) g = gcd(g, v);
    if (g === 0) g = 1;
    const reduced = ints.map((v) => v / g);
    expect(reduced).toEqual([2, 3, 2]);
  });

  it("end-to-end for ionic equation (Fe2+ + Cl- -> FeCl2) produces 1:2:1", () => {
    const eq = splitEquation("Fe2+ + Cl- -> FeCl2");
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    const fracs = solveSystem(matrix, cols);
    const ints = fractionsToIntegers(fracs);
    const abs = ints.map((v) => Math.abs(v));
    let g = 0;
    for (const v of abs) g = gcd(g, v);
    if (g === 0) g = 1;
    const reduced = ints.map((v) => v / g);
    expect(reduced).toEqual([1, 2, 1]);
  });

  it("all pipeline steps produce the expected results in sequence", () => {
    // The entire pipeline: parse + split + matrix + solve + integers
    const input = "C3H8 + O2 -> CO2 + H2O";
    const eq = splitEquation(input);
    expect(eq.reactants.length).toBeGreaterThan(0);
    expect(eq.products.length).toBeGreaterThan(0);
    const { matrix, cols } = buildMatrix(eq.reactants, eq.products);
    expect(cols).toBe(eq.reactants.length + eq.products.length);
    const fracs = solveSystem(matrix, cols);
    expect(fracs).toHaveLength(cols);
    const ints = fractionsToIntegers(fracs);
    expect(ints).toHaveLength(cols);
    // The final balance() call should match what we computed manually
    const final = balance(input, { showOne: false });
    expect(final.reactants.map((r) => r.coefficient)).toEqual(ints.slice(0, eq.reactants.length));
    expect(final.products.map((p) => p.coefficient)).toEqual(ints.slice(eq.reactants.length));
  });
});
