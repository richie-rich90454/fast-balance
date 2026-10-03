import { describe, it, expect } from "vitest";
import { Fraction } from "../index";
import { buildMatrix, solvePositive, solveAllPositive } from "../solver";
import {
    buildMatrix as buildMatrixEs3,
    solvePositive as solvePositiveEs3,
    solveAllPositive as solveAllPositiveEs3,
} from "../compat/solver-es3";
import { splitEquation } from "../parse";

function mulberry(seed) {
    let a = seed >>> 0;
    return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const POOL = ["H2", "O2", "H2O", "CO2", "CO", "CH4", "Fe", "Fe2O3", "HCl", "NaCl", "Na+", "Cl-", "Fe2+", "Fe3+", "e-", "H+", "OH-", "CaCO3", "CaO", "NH3", "N2", "H2SO4", "NaOH", "K+", "MnO4-", "Mn2+", "SO4^2-", "Ba2+", "Ag+", "C6H12O6", "C2H5OH", "O+", "X", "R"];

describe("compat fuzz: limb solver vs native on random equations", () => {
    it("500 random equations agree (solvePositive + solveAllPositive)", () => {
        const rnd = mulberry(1234567);
        let compared = 0;
        for (let iter = 0; iter < 500; iter++) {
            const nl = 1 + Math.floor(rnd() * 3);
            const nr = 1 + Math.floor(rnd() * 3);
            const left = [];
            const right = [];
            for (let i = 0; i < nl; i++) {
                left.push(POOL[Math.floor(rnd() * POOL.length)]);
            }
            for (let i = 0; i < nr; i++) {
                right.push(POOL[Math.floor(rnd() * POOL.length)]);
            }
            const eq = left.join(" + ") + " -> " + right.join(" + ");
            let parsed;
            try {
                parsed = splitEquation(eq);
            } catch {
                continue;
            }
            const a = buildMatrix(parsed.reactants, parsed.products);
            const b = buildMatrixEs3(parsed.reactants, parsed.products);
            const e1 = solvePositive(a.matrix, a.cols);
            const e2 = solvePositiveEs3(b.matrix, b.cols);
            expect(e2).toEqual(e1);
            const f1 = solveAllPositive(a.matrix, a.cols);
            const f2 = solveAllPositiveEs3(b.matrix, b.cols);
            expect(f2).toEqual(f1);
            compared++;
        }
        expect(compared).toBeGreaterThan(200);
    });

    it("large-coefficient systems agree", () => {
        const eqs = [
            "C20H42 + O2 -> CO2 + H2O",
            "C30H62 + O2 -> CO2 + H2O",
            "C50H102 + O2 -> CO2 + H2O",
            "C100H202 + O2 -> CO2 + H2O",
            "C200H402 + O2 -> CO2 + H2O",
            "C1000H2002 + O2 -> CO2 + H2O",
            "Fe + HNO3 -> Fe(NO3)3 + NO + H2O",
            "K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O",
            "Cu + HNO3 -> Cu(NO3)2 + NO + H2O",
            "P4 + NaOH + H2O -> NaH2PO2 + PH3",
        ];
        for (const eq of eqs) {
            let parsed;
            try {
                parsed = splitEquation(eq);
            } catch {
                continue;
            }
            const a = buildMatrix(parsed.reactants, parsed.products);
            const b = buildMatrixEs3(parsed.reactants, parsed.products);
            expect(solvePositiveEs3(b.matrix, b.cols)).toEqual(solvePositive(a.matrix, a.cols));
            expect(solveAllPositiveEs3(b.matrix, b.cols)).toEqual(solveAllPositive(a.matrix, a.cols));
        }
    });

    it("limb division sanity via fractions: (999999/1)+(1/999999)", () => {
        const r = new Fraction(999999, 1).add(new Fraction(1, 999999));
        expect(r.num).toBe(999998000002);
        expect(r.den).toBe(999999);
    });
});
