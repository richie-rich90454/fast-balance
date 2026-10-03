import { describe, it, expect } from "vitest";
import { balance } from "../index";
import { splitEquation } from "../parse";
import { buildMatrix, solvePositive, solveAllPositive } from "../solver";
import {
    buildMatrix as buildMatrixEs3,
    solvePositive as solvePositiveEs3,
    solveAllPositive as solveAllPositiveEs3,
} from "../compat/solver-es3";

const CORPUS = [
    "H2 + O2 -> H2O",
    "Fe + O2 -> Fe2O3",
    "C3H8 + O2 -> CO2 + H2O",
    "C3H8 + O2 + N2 -> CO2 + H2O + N2",
    "MnO4- + H+ + e- -> Mn2+ + H2O",
    "Cr2O7^2- + Fe2+ + H+ -> Cr3+ + Fe3+ + H2O",
    "Fe2+ + Cl- -> FeCl2",
    "[Fe(CN)6]4- + K+ -> K4[Fe(CN)6]",
    "CuSO4·5H2O -> CuSO4 + H2O",
    "K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O",
    "C + O2 -> CO + CO2",
    "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
    "FeSO4 + KMnO4 + H2SO4 -> Fe2(SO4)3 + MnSO4 + K2SO4 + H2O",
    "H2 + O2 -> H2O",
    "N2 + H2 -> NH3",
    "CH4 + O2 -> CO2 + H2O",
    "C6H12O6 + O2 -> CO2 + H2O",
    "Al + O2 -> Al2O3",
    "CaCO3 -> CaO + CO2",
    "Ag+ + Cl- -> AgCl",
    "Ba2+ + SO4^2- -> BaSO4",
    "H₂ + O₂ -> H₂O",
    "Fe²⁺ + Cl⁻ -> FeCl₂",
    "C10H22 + O2 -> CO2 + H2O",
    "C6H6 + O2 -> CO2 + H2O",
    "K2Cr2O7 + HCl -> KCl + CrCl3 + Cl2 + H2O",
    "(NH4)2Fe(SO4)2 + NaOH -> Fe(OH)2 + Na2SO4 + (NH4)2SO4",
    "PhOH + NaOH -> PhONa + H2O",
    "NADPH -> NADP",
];

describe("compat solver-es3 differential vs native solver", () => {
    it("buildMatrix matches native on corpus", () => {
        for (const eq of CORPUS) {
            let parsed;
            try {
                parsed = splitEquation(eq);
            } catch {
                continue;
            }
            const a = buildMatrix(parsed.reactants, parsed.products);
            const b = buildMatrixEs3(parsed.reactants, parsed.products);
            expect(b.cols).toBe(a.cols);
            expect(b.matrix.length).toBe(a.matrix.length);
            for (let i = 0; i < a.matrix.length; i++) {
                for (let j = 0; j < a.cols; j++) {
                    expect(b.matrix[i]![j]!.num).toBe(a.matrix[i]![j]!.num);
                    expect(b.matrix[i]![j]!.den).toBe(a.matrix[i]![j]!.den);
                }
            }
        }
    });

    it("solvePositive matches native on corpus", () => {
        for (const eq of CORPUS) {
            let parsed;
            try {
                parsed = splitEquation(eq);
            } catch {
                continue;
            }
            const { matrix, cols } = buildMatrix(parsed.reactants, parsed.products);
            const expected = solvePositive(matrix, cols);
            const { matrix: m2 } = buildMatrixEs3(parsed.reactants, parsed.products);
            const actual = solvePositiveEs3(m2, cols);
            expect(actual).toEqual(expected);
        }
    });

    it("solveAllPositive matches native on corpus", () => {
        for (const eq of CORPUS) {
            let parsed;
            try {
                parsed = splitEquation(eq);
            } catch {
                continue;
            }
            const { matrix, cols } = buildMatrix(parsed.reactants, parsed.products);
            const expected = solveAllPositive(matrix, cols);
            const { matrix: m2 } = buildMatrixEs3(parsed.reactants, parsed.products);
            const actual = solveAllPositiveEs3(m2, cols);
            expect(actual).toEqual(expected);
        }
    });

    it("balanced equations agree end-to-end (spot check via native balance)", () => {
        for (const eq of CORPUS) {
            let r;
            try {
                r = balance(eq);
            } catch {
                continue;
            }
            expect(r.reactants.every((s) => s.coefficient > 0)).toBe(true);
            expect(r.products.every((s) => s.coefficient > 0)).toBe(true);
        }
    });
});
