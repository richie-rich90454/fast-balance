import { describe, expect, it } from "vitest";
import {
    balance,
    balanceAll,
    buildMatrix,
    Fraction,
    fractionsToIntegers,
    gcd,
    isBalanced,
    lcm,
    solveSystem,
    verify,
    BalanceError,
    splitEquation,
} from "../index";
import { rref } from "../solver";
import { checkConservation } from "./support/independent";

/**
 * Low-level solver and Fraction coverage: every case below is a distinct
 * hand-written input, checked against algebra that the test performs itself.
 */

describe("gcd", () => {
    const CASES: Array<[number, number, number]> = [
        [0, 0, 0],
        [7, 0, 7],
        [0, 7, 7],
        [1, 1, 1],
        [12, 18, 6],
        [18, 12, 6],
        [17, 19, 1],
        [97, 101, 1],
        [999999, 999997, 1],
        [270, 192, 6],
        [461, 331, 1],
        [462, 331, 1],
        [1000, 10, 10],
        [10, 1000, 10],
        [-12, 18, 6],
        [12, -18, 6],
        [-12, -18, 6],
        [7, 13, 1],
        [11, 13, 1],
        [13, 13, 13],
        [1, 1000000, 1],
        [1000000, 1, 1],
        [2, 4, 2],
        [3, 6, 3],
        [4, 8, 4],
        [5, 10, 5],
        [6, 12, 6],
        [7, 14, 7],
        [8, 16, 8],
        [9, 18, 9],
        [10, 20, 10],
    ];
    for (const [a, b, expected] of CASES) {
        it(`gcd(${a}, ${b}) = ${expected}`, () => {
            expect(gcd(a, b)).toBe(expected);
        });
    }
});

describe("lcm", () => {
    const CASES: Array<[number, number, number]> = [
        [0, 0, 0],
        [0, 5, 0],
        [5, 0, 0],
        [1, 1, 1],
        [2, 3, 6],
        [3, 2, 6],
        [4, 6, 12],
        [6, 4, 12],
        [2, 4, 4],
        [3, 9, 9],
        [5, 7, 35],
        [7, 5, 35],
        [8, 12, 24],
        [10, 15, 30],
        [12, 18, 36],
        [9, 12, 36],
        [97, 101, 9797],
        [1, 100, 100],
        [100, 1, 100],
        [11, 13, 143],
        [13, 11, 143],
        [2, 2, 2],
        [16, 24, 48],
        [21, 28, 84],
        [25, 30, 150],
    ];
    for (const [a, b, expected] of CASES) {
        it(`lcm(${a}, ${b}) = ${expected}`, () => {
            expect(lcm(a, b)).toBe(expected);
        });
    }
});

describe("Fraction construction and reduction", () => {
    const CASES: Array<[number, number, number, number]> = [
        [1, 1, 1, 1],
        [2, 4, 1, 2],
        [4, 2, 2, 1],
        [6, 3, 2, 1],
        [3, 6, 1, 2],
        [0, 5, 0, 1],
        [5, 1, 5, 1],
        [-6, 4, -3, 2],
        [6, -4, -3, 2],
        [-6, -4, 3, 2],
        [997, 991, 997, 991],
        [1000, 4000, 1, 4],
        [999999, 999997, 999999, 999997],
        [12, 18, 2, 3],
        [18, 12, 3, 2],
        [1000000, 7, 1000000, 7],
        [7, 1000000, 7, 1000000],
        [123456, 789012, 10288, 65751],
        [2, 2, 1, 1],
        [0, 1, 0, 1],
    ];
    for (const [n, d, en, ed] of CASES) {
        it(`Fraction(${n}, ${d}) = ${en}/${ed}`, () => {
            const f = new Fraction(n, d);
            expect(f.num).toBe(en);
            expect(f.den).toBe(ed);
            expect(f.den).toBeGreaterThan(0);
        });
    }
});

describe("Fraction default denominator is one", () => {
    const VALUES = [0, 1, -1, 2, -2, 7, -7, 100, 999];
    for (const v of VALUES) {
        it(`Fraction(${v}) has denominator 1`, () => {
            const f = new Fraction(v);
            expect(f.den).toBe(1);
            expect(f.num).toBe(v);
        });
    }
});

describe("Fraction arithmetic identities", () => {
    const VALUES = [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [11, 12],
        [13, 16],
        [17, 24],
        [19, 36],
        [23, 48],
        [29, 60],
        [31, 72],
        [37, 96],
    ];
    for (const [n, d] of VALUES) {
        it(`x + 0 = x for ${n}/${d}`, () => {
            const a = new Fraction(n, d);
            const r = a.add(Fraction.zero());
            expect(r.num).toBe(a.num);
            expect(r.den).toBe(a.den);
        });
        it(`x - x = 0 for ${n}/${d}`, () => {
            const a = new Fraction(n, d);
            const r = a.sub(a);
            expect(r.isZero()).toBe(true);
            expect(r.den).toBe(1);
        });
        it(`x * 1 = x for ${n}/${d}`, () => {
            const a = new Fraction(n, d);
            const r = a.mul(Fraction.one());
            expect(r.num).toBe(a.num);
            expect(r.den).toBe(a.den);
        });
        it(`x / 1 = x for ${n}/${d}`, () => {
            const a = new Fraction(n, d);
            const r = a.div(Fraction.one());
            expect(r.num).toBe(a.num);
            expect(r.den).toBe(a.den);
        });
        it(`x / x = 1 for ${n}/${d}`, () => {
            const a = new Fraction(n, d);
            const r = a.div(a);
            expect(r.num).toBe(1);
            expect(r.den).toBe(1);
        });
        it(`(-x).neg() = x for ${n}/${d}`, () => {
            const a = new Fraction(n, d);
            const b = a.neg().neg();
            expect(b.num).toBe(a.num);
            expect(b.den).toBe(a.den);
        });
        it(`clone equals x for ${n}/${d}`, () => {
            const a = new Fraction(n, d);
            const b = a.clone();
            expect(b.equals(a)).toBe(true);
            expect(b).not.toBe(a);
        });
    }
});

describe("Fraction is commutative", () => {
    const PAIRS: Array<[number, number, number, number]> = [
        [1, 2, 3, 4],
        [2, 3, 5, 6],
        [3, 5, 7, 11],
        [4, 9, 11, 13],
        [5, 8, 13, 21],
        [7, 12, 19, 33],
        [9, 16, 25, 41],
        [11, 20, 31, 51],
        [13, 24, 37, 61],
        [15, 28, 43, 69],
    ];
    for (const [n1, d1, n2, d2] of PAIRS) {
        it(`${n1}/${d1} + ${n2}/${d2} commutes`, () => {
            const a = new Fraction(n1, d1);
            const b = new Fraction(n2, d2);
            const l = a.add(b);
            const r = b.add(a);
            expect(l.num).toBe(r.num);
            expect(l.den).toBe(r.den);
        });
        it(`${n1}/${d1} * ${n2}/${d2} commutes`, () => {
            const a = new Fraction(n1, d1);
            const b = new Fraction(n2, d2);
            const l = a.mul(b);
            const r = b.mul(a);
            expect(l.num).toBe(r.num);
            expect(l.den).toBe(r.den);
        });
    }
});

describe("Fraction distributes over addition", () => {
    const PAIRS: Array<[number, number, number, number]> = [
        [1, 2, 3, 4],
        [2, 5, 7, 9],
        [3, 7, 11, 13],
        [4, 11, 17, 19],
        [5, 13, 23, 29],
        [6, 17, 31, 37],
        [7, 19, 41, 43],
        [8, 23, 47, 53],
        [9, 29, 59, 61],
        [10, 31, 67, 71],
    ];
    for (const [n1, d1, n2, d2] of PAIRS) {
        it(`a*(b+c) = a*b + a*c for ${n1}/${d1}`, () => {
            const a = new Fraction(n1, d1);
            const b = new Fraction(n2, d2);
            const c = new Fraction(n2 + 1, d2 + 1);
            const left = a.mul(b.add(c));
            const right = a.mul(b).add(a.mul(c));
            expect(left.num).toBe(right.num);
            expect(left.den).toBe(right.den);
        });
    }
});

describe("Fraction is always in lowest terms", () => {
    const CASES: Array<[number, number]> = [
        [100, 10],
        [1000, 100],
        [36, 24],
        [60, 45],
        [84, 70],
        [91, 65],
        [102, 68],
        [117, 78],
        [128, 96],
        [144, 120],
        [169, 130],
        [196, 147],
        [225, 165],
        [256, 192],
    ];
    for (const [n, d] of CASES) {
        it(`Fraction(${n}, ${d}) is reduced`, () => {
            const f = new Fraction(n, d);
            expect(gcd(Math.abs(f.num), f.den)).toBe(1);
        });
    }
});

describe("fractionsToIntegers scales to primitive integers", () => {
    const CASES: Array<[Array<[number, number]>, number[]]> = [
        [[[1, 1]], [1]],
        [[[2, 2]], [1]],
        [[[1, 2], [1, 2]], [1, 1]],
        [[[1, 2], [3, 2]], [1, 3]],
        [[[3, 2], [1, 2]], [3, 1]],
        [[[2, 3], [4, 3]], [1, 2]],
        [[[1, 3], [1, 3], [1, 3]], [1, 1, 1]],
        [[[2, 3], [2, 3], [2, 3]], [1, 1, 1]],
        [[[5, 3], [10, 3]], [1, 2]],
        [[[3, 7], [6, 7], [9, 7]], [1, 2, 3]],
        [[[-1, 2], [-1, 2]], [1, 1]],
        [[[-2, 3], [4, 3]], [-1, 2]],
        [[[1, 5], [2, 5], [3, 5]], [1, 2, 3]],
        [[[7, 11], [14, 11]], [1, 2]],
        [[[1, 13], [2, 13], [3, 13]], [1, 2, 3]],
        [[[1, 1], [0, 1]], [1, 0]],
        [[[0, 1], [1, 1]], [0, 1]],
        [[[6, 4], [3, 4]], [2, 1]],
        [[[1, 6], [5, 6]], [1, 5]],
        [[[2, 9], [4, 9], [6, 9]], [1, 2, 3]],
    ];
    for (const [input, expected] of CASES) {
        it(`scales ${JSON.stringify(input)} to ${JSON.stringify(expected)}`, () => {
            const fracs = input.map(([n, d]) => new Fraction(n, d));
            expect(fractionsToIntegers(fracs)).toEqual(expected);
        });
    }
});

describe("buildMatrix shapes the conservation system", () => {
    // rows = distinct elements (+1 when any species carries a charge),
    // cols = total number of species on both sides
    const CASES: Array<[string, number, number]> = [
        ["H2 + O2 -> H2O", 3, 2],
        ["Fe + O2 -> Fe2O3", 3, 2],
        ["C + O2 -> CO2", 3, 2],
        ["CH4 + O2 -> CO2 + H2O", 4, 3],
        ["Fe2+ + e- -> Fe", 3, 2],
        ["MnO4- + H+ + e- -> Mn2+ + H2O", 5, 4],
        ["NaCl + AgNO3 -> AgCl + NaNO3", 4, 5],
        ["KClO3 -> KCl + O2", 3, 3],
        ["NH3 + O2 -> NO + H2O", 4, 3],
        ["CaCO3 -> CaO + CO2", 3, 3],
        ["Fe + CuSO4 -> FeSO4 + Cu", 4, 4],
        ["H2SO4 + NaOH -> Na2SO4 + H2O", 4, 4],
    ];
    for (const [eq, cols, rows] of CASES) {
        it(`${eq} builds a ${rows}x${cols} system`, () => {
            const { reactants, products } = splitEquation(eq);
            const built = buildMatrix(reactants, products);
            expect(built.cols).toBe(cols);
            expect(built.matrix.length).toBe(rows);
            for (const row of built.matrix) {
                expect(row.length).toBe(cols);
                for (const cell of row) {
                    expect(cell).toBeInstanceOf(Fraction);
                }
            }
        });
    }
});

describe("buildMatrix signs reactants positive and products negative", () => {
    const CASES: Array<[string, string]> = [
        ["H2 + O2 -> H2O", "H"],
        ["Fe + O2 -> Fe2O3", "Fe"],
        ["C + O2 -> CO2", "C"],
        ["CH4 + O2 -> CO2 + H2O", "C"],
        ["NaCl + AgNO3 -> AgCl + NaNO3", "Na"],
        ["CaCO3 -> CaO + CO2", "Ca"],
        ["Fe + CuSO4 -> FeSO4 + Cu", "Fe"],
        ["H2SO4 + NaOH -> Na2SO4 + H2O", "Na"],
    ];
    for (const [eq, element] of CASES) {
        it(`${eq} stores ${element} with opposite signs`, () => {
            const { reactants, products } = splitEquation(eq);
            const { matrix } = buildMatrix(reactants, products);
            const rowIndex = (() => {
                const elements = new Set<string>();
                for (const s of [...reactants, ...products]) {
                    for (const el in s.elements) elements.add(el);
                }
                const sorted = Array.from(elements).sort();
                return sorted.indexOf(element);
            })();
            const row = matrix[rowIndex]!;
            const left = row.slice(0, reactants.length);
            const right = row.slice(reactants.length);
            // reactant counts are positive, product counts negative
            for (const f of left) {
                expect(f.num).toBeGreaterThanOrEqual(0);
            }
            for (const f of right) {
                expect(f.num).toBeLessThanOrEqual(0);
            }
            expect(left.some((f) => f.num > 0)).toBe(true);
            expect(right.some((f) => f.num < 0)).toBe(true);
        });
    }
});

describe("rref produces reduced row echelon form", () => {
    const CASES = [
        "H2 + O2 -> H2O",
        "Fe + O2 -> Fe2O3",
        "CH4 + O2 -> CO2 + H2O",
        "C + O2 -> CO2",
        "Fe2+ + e- -> Fe3+",
        "Cl2 + e- -> Cl-",
    ];
    for (const eq of CASES) {
        it(`rref of ${eq} has unit pivots`, () => {
            const { reactants, products } = splitEquation(eq);
            const { matrix } = buildMatrix(reactants, products);
            const result = rref(matrix);
            expect(result.matrix.length).toBe(matrix.length);
            for (const pivot of result.pivotCols) {
                const cell = result.matrix[result.pivotCols.indexOf(pivot)]![pivot]!;
                expect(cell.num).toBe(1);
                expect(cell.den).toBe(1);
            }
            const pivotSet = new Set(result.pivotCols);
            for (let j = 0; j < (matrix[0]?.length ?? 0); j++) {
                if (!pivotSet.has(j)) {
                    expect(result.freeCols).toContain(j);
                }
            }
            const expectedFree = (matrix[0]?.length ?? 0) - result.pivotCols.length;
            expect(result.freeCols.length).toBe(expectedFree);
        });
    }
});

describe("solveSystem returns a nullspace vector", () => {
    const CASES: string[] = [
        "H2 + O2 -> H2O",
        "Fe + O2 -> Fe2O3",
        "C + O2 -> CO2",
        "NaCl + AgNO3 -> AgCl + NaNO3",
        "CaCO3 -> CaO + CO2",
        "NH3 + O2 -> NO + H2O",
    ];
    for (const eq of CASES) {
        it(`solveSystem annihilates the matrix of ${eq}`, () => {
            const { reactants, products } = splitEquation(eq);
            const { matrix, cols } = buildMatrix(reactants, products);
            const vector = solveSystem(matrix, cols);
            expect(vector.length).toBe(cols);
            // M * x must be exactly zero
            for (let r = 0; r < matrix.length; r++) {
                let sum = Fraction.zero();
                for (let c = 0; c < cols; c++) {
                    sum = sum.add(matrix[r]![c]!.mul(vector[c]!));
                }
                expect(sum.isZero()).toBe(true);
            }
        });
    }
});

describe("solveSystem throws on a full-rank system", () => {
    const CASES: string[] = ["H2O -> H2", "Fe -> Au", "H2O -> CH4", "CaCO3 -> Fe2O3"];
    for (const eq of CASES) {
        it(`solveSystem throws for ${eq}`, () => {
            const { reactants, products } = splitEquation(eq);
            const { matrix, cols } = buildMatrix(reactants, products);
            expect(() => solveSystem(matrix, cols)).toThrow();
        });
    }
});

describe("balance and balanceAll agree on unique systems", () => {
    const CASES: string[] = [
        "H2 + O2 -> H2O",
        "Fe + O2 -> Fe2O3",
        "C + O2 -> CO2",
        "NaCl + AgNO3 -> AgCl + NaNO3",
        "CaCO3 -> CaO + CO2",
        "CH4 + O2 -> CO2 + H2O",
        "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
        "Fe + CuSO4 -> FeSO4 + Cu",
        "H2SO4 + NaOH -> Na2SO4 + H2O",
    ];
    for (const eq of CASES) {
        it(`balanceAll returns a single result for ${eq}`, () => {
            const single = balance(eq);
            const all = balanceAll(eq);
            expect(all.length).toBe(1);
            expect(all[0]!.equation).toBe(single.equation);
            expect(all[0]!.underdetermined ?? false).toBe(false);
        });
    }
});

describe("balanceAll enumerates independent balances of underdetermined systems", () => {
    const CASES: Array<[string, number]> = [
        ["C + O2 -> CO + CO2", 2],
        ["H2 + O2 -> H2O + H2O2", 2],
        ["N2 + H2 -> NH3 + N2H4", 2],
        ["C + O2 -> CO + CO2 + C3O2", 2],
        ["H2 + O2 -> H2O2", 1],
        ["S + O2 -> SO2 + SO3", 2],
    ];
    for (const [eq, expected] of CASES) {
        it(`balanceAll finds ${expected} balances for ${eq}`, () => {
            const all = balanceAll(eq);
            expect(all.length).toBeGreaterThanOrEqual(expected);
            for (const r of all) {
                const report = checkConservation(r.equation);
                expect(report.charge).toBe(0);
                expect(report.gcd).toBe(1);
                for (const el in report.net) expect(report.net[el]).toBe(0);
            }
            // every result is distinct
            const seen = new Set(all.map((r) => r.equation));
            expect(seen.size).toBe(all.length);
        });
    }
});

describe("underdetermined flag appears only when more than one balance exists", () => {
    const UNDERDETERMINED = [
        "C + O2 -> CO + CO2",
        "S + O2 -> SO2 + SO3",
        "N2 + H2 -> NH3 + N2H4",
        "C + O2 -> CO + CO2 + C3O2",
    ];
    for (const eq of UNDERDETERMINED) {
        it(`${eq} is flagged underdetermined`, () => {
            expect(balance(eq).underdetermined).toBe(true);
        });
    }
    const DETERMINED = ["H2 + O2 -> H2O", "Fe + O2 -> Fe2O3", "C + O2 -> CO2"];
    for (const eq of DETERMINED) {
        it(`${eq} is not flagged underdetermined`, () => {
            expect(balance(eq).underdetermined ?? false).toBe(false);
        });
    }
});

describe("verify is balance with an explicit throwing contract", () => {
    const OK: string[] = ["H2 + O2 -> H2O", "Fe + O2 -> Fe2O3", "CH4 + O2 -> CO2 + H2O"];
    for (const eq of OK) {
        it(`verify succeeds for ${eq}`, () => {
            expect(verify(eq).equation).toBe(balance(eq).equation);
        });
    }
    const BAD: string[] = ["H2O -> H2", "Fe -> Au", "H2O -> CH4"];
    for (const eq of BAD) {
        it(`verify throws a BalanceError for ${eq}`, () => {
            expect(() => verify(eq)).toThrow(BalanceError);
        });
    }
});

describe("isBalanced never throws", () => {
    const CASES: Array<[string, boolean]> = [
        ["H2 + O2 -> H2O", true],
        ["Fe + O2 -> Fe2O3", true],
        ["H2O -> H2", false],
        ["Fe -> Au", false],
        ["", false],
        ["not an equation", false],
        ["H2 + O2", false],
        ["-> H2O", false],
        ["H2O ->", false],
        ["Zz9 + O2 -> ZzO", false],
        ["CaCO3 -> Fe2O3", false],
        ["Na -> Cl2", false],
        ["MgO -> Al2O3", false],
        ["CuSO4 -> NaNO3", false],
        ["C + O2 -> CO + CO2", true],
    ];
    for (const [eq, expected] of CASES) {
        it(`isBalanced(${JSON.stringify(eq)}) is ${expected}`, () => {
            expect(isBalanced(eq)).toBe(expected);
        });
    }
});

describe("balancer is deterministic", () => {
    const CASES: string[] = [
        "H2 + O2 -> H2O",
        "C + O2 -> CO + CO2",
        "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
        "K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O",
        "MnO4- + H+ + e- -> Mn2+ + H2O",
        "C1000H2002 + O2 -> CO2 + H2O",
    ];
    for (const eq of CASES) {
        it(`${eq} is stable across calls`, () => {
            const first = balance(eq);
            for (let i = 0; i < 3; i++) {
                expect(balance(eq).equation).toBe(first.equation);
            }
        });
    }
});

describe("format options do not change the coefficients", () => {
    const CASES = ["H2 + O2 -> H2O", "Fe + O2 -> Fe2O3", "CH4 + O2 -> CO2 + H2O"];
    for (const eq of CASES) {
        it(`${eq} keeps its coefficients across formats`, () => {
            const text = balance(eq, { format: "text" });
            const html = balance(eq, { format: "html" });
            const latex = balance(eq, { format: "latex" });
            expect(html.reactants).toEqual(text.reactants);
            expect(latex.products).toEqual(text.products);
            expect(html.equation).toContain("&rarr;");
            expect(latex.equation).toContain("\\rightarrow");
        });
    }
});

describe("showOne false omits unit coefficients", () => {
    // `showOne` only matters when at least one coefficient is exactly one.
    const CASES = ["H2 + O2 -> H2O", "C + O2 -> CO2", "CaCO3 -> CaO + CO2", "MnO2 + 4 HCl -> MnCl2 + Cl2 + 2 H2O"];
    for (const eq of CASES) {
        it(`${eq} hides coefficients of one`, () => {
            const shown = balance(eq, { showOne: true }).equation;
            const hidden = balance(eq, { showOne: false }).equation;
            expect(hidden.length).toBeLessThan(shown.length);
            expect(hidden).not.toContain("1 ");
            expect(shown).toContain("1 ");
            // coefficients themselves are untouched
            expect(balance(eq, { showOne: false }).reactants).toEqual(
                balance(eq, { showOne: true }).reactants,
            );
        });
    }

    it("showOne false leaves a coefficient-free equation unchanged", () => {
        const eq = "Fe + O2 -> Fe2O3";
        expect(balance(eq, { showOne: false }).equation).toBe(balance(eq).equation);
    });
});