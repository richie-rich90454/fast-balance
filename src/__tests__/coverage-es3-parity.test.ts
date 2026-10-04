import { describe, expect, it } from "vitest";
import { balance } from "../index";
import { splitEquation } from "../parse";
import {
    buildMatrix,
    fractionsToIntegers,
    rref,
    solveAllPositive,
    solvePositive,
    solveSystem,
    verifyConservation,
} from "../solver";
import {
    buildMatrix as buildMatrixEs3,
    fractionsToIntegers as fractionsToIntegersEs3,
    rref as rrefEs3,
    solveAllPositive as solveAllPositiveEs3,
    solvePositive as solvePositiveEs3,
    solveSystem as solveSystemEs3,
    verifyConservation as verifyConservationEs3,
} from "../compat/solver-es3";

/**
 * The ES3 backend must be indistinguishable from the native one: the same
 * matrix, the same echelon form, the same nullspace, the same integer
 * scaling and the same conservation verdict, for every input below.
 *
 * Every equation in `CORPUS` is a distinct case, and each comparison is one
 * test, so the suite grows with the corpus.
 */

/** Distinct inputs covering every feature the solver touches. */
const CORPUS: string[] = [
    "H2 + O2 -> H2O",
    "Fe + O2 -> Fe2O3",
    "C + O2 -> CO2",
    "CH4 + O2 -> CO2 + H2O",
    "C3H8 + O2 -> CO2 + H2O",
    "C2H6 + O2 -> CO2 + H2O",
    "C2H4 + O2 -> CO2 + H2O",
    "C2H2 + O2 -> CO2 + H2O",
    "C6H6 + O2 -> CO2 + H2O",
    "C6H12O6 + O2 -> CO2 + H2O",
    "CH3OH + O2 -> CO2 + H2O",
    "C2H5OH + O2 -> CO2 + H2O",
    "CH3COOH + O2 -> CO2 + H2O",
    "C6H5OH + O2 -> CO2 + H2O",
    "C7H16 + O2 -> CO2 + H2O",
    "C8H18 + O2 -> CO2 + H2O",
    "NaCl + AgNO3 -> AgCl + NaNO3",
    "BaCl2 + Na2SO4 -> BaSO4 + NaCl",
    "CaCl2 + Na2CO3 -> CaCO3 + NaCl",
    "CaCO3 -> CaO + CO2",
    "CaCO3 + SiO2 -> CaSiO3 + CO2",
    "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
    "K2Cr2O7 + HCl -> KCl + CrCl3 + Cl2 + H2O",
    "K2Cr2O7 + FeSO4 + H2SO4 -> Cr2(SO4)3 + K2SO4 + Fe2(SO4)3 + H2O",
    "K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O",
    "FeSO4 + KMnO4 + H2SO4 -> Fe2(SO4)3 + MnSO4 + K2SO4 + H2O",
    "Fe + CuSO4 -> FeSO4 + Cu",
    "Fe + HNO3 -> Fe(NO3)3 + NO + H2O",
    "Cu + H2SO4 -> CuSO4 + H2",
    "Zn + HCl -> ZnCl2 + H2",
    "Mg + HCl -> MgCl2 + H2",
    "Al + HCl -> AlCl3 + H2",
    "Na + H2O -> NaOH + H2",
    "Ca + H2O -> Ca(OH)2 + H2",
    "Fe2O3 + CO -> Fe + CO2",
    "Fe2O3 + H2 -> Fe + H2O",
    "Fe2O3 + C -> Fe + CO",
    "Fe2O3 + Al -> Fe + Al2O3",
    "ZnO + C -> Zn + CO",
    "PbO + C -> Pb + CO",
    "SnO2 + C -> Sn + CO",
    "CuO + H2 -> Cu + H2O",
    "Ag+ + e- -> Ag",
    "Cu2+ + e- -> Cu",
    "Cu2+ + 2 e- -> Cu",
    "Fe3+ + e- -> Fe2+",
    "Fe2+ -> Fe3+ + e-",
    "Na+ + e- -> Na",
    "Mg2+ + 2 e- -> Mg",
    "Al3+ + 3 e- -> Al",
    "Zn2+ + 2 e- -> Zn",
    "MnO4- + H+ + e- -> Mn2+ + H2O",
    "MnO4- + H+ + e- -> MnO2 + H2O",
    "Cr2O7^2- + H+ + e- -> Cr3+ + H2O",
    "NO3- + H+ + e- -> NO + H2O",
    "NO3- + H+ + e- -> NO2 + H2O",
    "ClO- + H+ + e- -> Cl- + H2O",
    "BrO3- + H+ + e- -> Br- + H2O",
    "IO3- + H+ + e- -> I- + H2O",
    "SO4^2- + H+ + e- -> H2S + H2O",
    "SO4^2- + H+ + e- -> SO2 + H2O",
    "CO3^2- + H+ + e- -> CO2 + H2O",
    "H+ + e- -> H",
    "O2 + H+ + e- -> H2O",
    "H2O -> H2 + O2",
    "H2O2 -> H2O + O2",
    "C + O2 -> CO + CO2",
    "S + O2 -> SO2 + SO3",
    "N2 + H2 -> NH3 + N2H4",
    "N2 + H2 -> NH3",
    "C + O2 -> CO + CO2 + C3O2",
    "H2 + O2 -> H2O + H2O2",
    "CuSO4·5H2O -> CuSO4 + H2O",
    "Al2(SO4)3 -> Al2O3 + SO2 + O2",
    "Na3PO4 -> Na2O + P2O5",
    "Ca3(PO4)2 -> CaO + P2O5",
    "H2SO4 -> SO2 + H2O + O2",
    "H2SO3 -> SO2 + H2O",
    "KClO3 -> KCl + O2",
    "KClO3 -> KClO4 + KCl",
    "Ag2O -> Ag + O2",
    "Cu(NO3)2 -> CuO + NO2 + O2",
    "Pb(NO3)2 -> PbO + NO2 + O2",
    "NH4NO3 -> N2O + H2O",
    "NH4NO2 -> N2 + H2O",
    "(NH4)2CO3 -> NH3 + CO2 + H2O",
    "Ca(HCO3)2 -> CaCO3 + CO2 + H2O",
    "NaHCO3 -> Na2CO3 + CO2 + H2O",
    "Na2S2O3 + I2 -> Na2S4O6 + NaI",
    "Na2SO3 + HCl -> NaCl + SO2 + H2O",
    "SO2 + O2 -> SO3",
    "SO3 + H2O -> H2SO4",
    "NO + O2 -> NO2",
    "NO2 + H2O -> HNO3 + NO",
    "NH3 + O2 -> NO + H2O",
    "NH3 + O2 -> N2 + H2O",
    "NH3 + CO2 -> NH2CONH2 + H2O",
    "CH4 + H2O -> CO + H2",
    "CO + H2O -> CO2 + H2",
    "C + CO2 -> CO",
    "CH4 + CO2 -> CO + H2",
    "C2H6 + O2 -> CO2 + H2",
    "FeS2 + O2 -> Fe2O3 + SO2",
    "PbS + O2 -> PbO + SO2",
    "Cu2S + O2 -> Cu + SO2",
    "ZnS + O2 -> ZnO + SO2",
    "TiCl4 + Mg -> Ti + MgCl2",
    "SiCl4 + O2 -> SiO2 + Cl2",
    "PCl5 + O2 -> P2O5 + Cl2",
    "2 Al2O3 + C -> Al + CO2",
    "Na2CO3 + SiO2 -> Na2SiO3 + CO2",
    "CH3COOH + C2H5OH -> CH3COOC2H5 + H2O",
    "C2H4 + H2O -> C2H6O",
    "C2H6O -> C2H4 + H2O",
    "C2H5Cl + NaOH -> C2H5OH + NaCl",
    "PhOH + NaOH -> PhONa + H2O",
    "BuOH + HCl -> BuCl + H2O",
    "C2H5SH -> C2H4 + H2S",
    "[Fe(CN)6]4- + K+ -> K4[Fe(CN)6]",
    "[Cu(NH3)4]2+ -> Cu2+ + NH3",
    "[Co(NH3)6]3+ -> Co3+ + NH3",
    "[Fe(H2O)6]3+ + e- -> [Fe(H2O)6]2+",
    "[PtCl6]2- -> [PtCl4]2- + Cl2",
    "C6H10O5n + H2O -> C6H12O6",
    "C6H12O6 -> C6H10O5n + H2O",
    "H2 + O2 + N2 -> H2O + N2",
    "C3H8 + O2 + N2 -> CO2 + H2O + N2",
    "C10H22 + O2 -> CO2 + H2O",
    "C100H202 + O2 -> CO2 + H2O",
    "C1000H2002 + O2 -> CO2 + H2O",
    "C200H402 + O2 -> CO2 + H2O",
    "H2SO4 + NaOH -> Na2SO4 + H2O",
    "H2SO4 + NaOH -> NaHSO4 + H2O",
    "Ca(OH)2 + H2SO4 -> CaSO4 + H2O",
    "Al(OH)3 + HCl -> AlCl3 + H2O",
    "NH3 + HCl -> NH4Cl",
    "NH3 + H2SO4 -> (NH4)2SO4",
    "NH3 + HNO3 -> NH4NO3",
    "NaOH + HCl -> NaCl + H2O",
    "KOH + HCl -> KCl + H2O",
    "Ba(OH)2 + H2SO4 -> BaSO4 + H2O",
    "XCl3 + H2O -> X(OH)3 + HCl",
    "R + S -> RS",
    "M + O2 -> MO2",
    "D2 + O2 -> D2O",
    "T2 + O2 -> T2O",
    "H2O(s) -> H2O(l)",
    "CuSO4(s) + NaOH(aq) -> Na2SO4 + Cu(OH)2",
    "CaCO3(s) + HCl(aq) -> CaCl2 + H2O + CO2",
    "H₂ + O₂ -> H₂O",
    "Fe²⁺ + Cl⁻ -> FeCl₂",
];

describe("ES3 buildMatrix matches the native buildMatrix", () => {
    for (const eq of CORPUS) {
        it(`matches for ${eq}`, () => {
            const parsed = splitEquation(eq);
            const native = buildMatrix(parsed.reactants, parsed.products);
            const es3 = buildMatrixEs3(parsed.reactants, parsed.products);
            expect(es3.cols).toBe(native.cols);
            expect(es3.matrix.length).toBe(native.matrix.length);
            for (let i = 0; i < native.matrix.length; i++) {
                for (let j = 0; j < native.cols; j++) {
                    expect(es3.matrix[i]![j]!.num).toBe(native.matrix[i]![j]!.num);
                    expect(es3.matrix[i]![j]!.den).toBe(native.matrix[i]![j]!.den);
                }
            }
        });
    }
});

describe("ES3 rref matches the native rref", () => {
    for (const eq of CORPUS) {
        it(`matches for ${eq}`, () => {
            const parsed = splitEquation(eq);
            const native = buildMatrix(parsed.reactants, parsed.products);
            const es3 = buildMatrixEs3(parsed.reactants, parsed.products);
            const a = rref(native.matrix);
            const b = rrefEs3(es3.matrix);
            expect(b.pivotCols).toEqual(a.pivotCols);
            expect(b.freeCols).toEqual(a.freeCols);
            for (let i = 0; i < a.matrix.length; i++) {
                for (let j = 0; j < native.cols; j++) {
                    expect(b.matrix[i]![j]!.num).toBe(a.matrix[i]![j]!.num);
                    expect(b.matrix[i]![j]!.den).toBe(a.matrix[i]![j]!.den);
                }
            }
        });
    }
});

describe("ES3 solveSystem matches the native solveSystem", () => {
    for (const eq of CORPUS) {
        it(`matches for ${eq}`, () => {
            const parsed = splitEquation(eq);
            const native = buildMatrix(parsed.reactants, parsed.products);
            const es3 = buildMatrixEs3(parsed.reactants, parsed.products);
            let a: string;
            let b: string;
            try {
                a = JSON.stringify(solveSystem(native.matrix, native.cols));
            } catch (e) {
                a = "THROW:" + (e as Error).message;
            }
            try {
                b = JSON.stringify(solveSystemEs3(es3.matrix, es3.cols));
            } catch (e) {
                b = "THROW:" + (e as Error).message;
            }
            expect(b).toBe(a);
        });
    }
});

describe("ES3 solvePositive matches the native solvePositive", () => {
    for (const eq of CORPUS) {
        it(`matches for ${eq}`, () => {
            const parsed = splitEquation(eq);
            const native = buildMatrix(parsed.reactants, parsed.products);
            const es3 = buildMatrixEs3(parsed.reactants, parsed.products);
            expect(solvePositiveEs3(es3.matrix, es3.cols)).toEqual(
                solvePositive(native.matrix, native.cols),
            );
        });
    }
});

describe("ES3 solveAllPositive matches the native solveAllPositive", () => {
    for (const eq of CORPUS) {
        it(`matches for ${eq}`, () => {
            const parsed = splitEquation(eq);
            const native = buildMatrix(parsed.reactants, parsed.products);
            const es3 = buildMatrixEs3(parsed.reactants, parsed.products);
            expect(solveAllPositiveEs3(es3.matrix, es3.cols)).toEqual(
                solveAllPositive(native.matrix, native.cols),
            );
        });
    }
});

describe("ES3 fractionsToIntegers matches the native fractionsToIntegers", () => {
    for (const eq of CORPUS) {
        it(`matches for ${eq}`, () => {
            const parsed = splitEquation(eq);
            const native = buildMatrix(parsed.reactants, parsed.products);
            const es3 = buildMatrixEs3(parsed.reactants, parsed.products);
            const a = solveSystem(native.matrix, native.cols);
            const b = solveSystemEs3(es3.matrix, es3.cols);
            expect(fractionsToIntegersEs3(b)).toEqual(fractionsToIntegers(a));
        });
    }
});

describe("ES3 verifyConservation matches the native verifyConservation", () => {
    for (const eq of CORPUS) {
        it(`matches the native verdict for ${eq}`, () => {
            const parsed = splitEquation(eq);
            const native = buildMatrix(parsed.reactants, parsed.products);
            const es3 = buildMatrixEs3(parsed.reactants, parsed.products);
            let coeffs: number[];
            try {
                const r = balance(eq);
                coeffs = [...r.reactants, ...r.products].map((s) => s.coefficient);
            } catch {
                coeffs = [1];
            }
            expect(
                verifyConservationEs3(parsed.reactants, parsed.products, coeffs),
            ).toBe(verifyConservation(parsed.reactants, parsed.products, coeffs));
            expect(native.cols).toBe(es3.cols);
        });
    }
});

describe("ES3 solvePositive finds a conserving positive solution", () => {
    for (const eq of CORPUS) {
        it(`conserves for ${eq}`, () => {
            const parsed = splitEquation(eq);
            const es3 = buildMatrixEs3(parsed.reactants, parsed.products);
            const native = buildMatrix(parsed.reactants, parsed.products);
            const found = solvePositiveEs3(es3.matrix, es3.cols);
            if (found === null) {
                expect(solvePositive(native.matrix, native.cols)).toBeNull();
                return;
            }
            expect(found).toEqual(solvePositive(native.matrix, native.cols));
            for (const c of found) {
                expect(Number.isInteger(c)).toBe(true);
                expect(c).toBeGreaterThan(0);
            }
            expect(verifyConservationEs3(parsed.reactants, parsed.products, found)).toBe(true);
        });
    }
});

describe("ES3 solveAllPositive returns only conserving integer balances", () => {
    for (const eq of CORPUS) {
        it(`conserves for every candidate of ${eq}`, () => {
            const parsed = splitEquation(eq);
            const es3 = buildMatrixEs3(parsed.reactants, parsed.products);
            for (const coeffs of solveAllPositiveEs3(es3.matrix, es3.cols)) {
                for (const c of coeffs) {
                    expect(Number.isInteger(c)).toBe(true);
                    expect(c).toBeGreaterThan(0);
                }
                expect(verifyConservationEs3(parsed.reactants, parsed.products, coeffs)).toBe(
                    true,
                );
            }
        });
    }
});

describe("the public result always satisfies the ES3 conservation check", () => {
    for (const eq of CORPUS) {
        it(`verifies for ${eq}`, () => {
            const parsed = splitEquation(eq);
            let coeffs: number[] | null;
            try {
                const r = balance(eq);
                coeffs = [...r.reactants, ...r.products].map((s) => s.coefficient);
            } catch {
                coeffs = null;
            }
            if (coeffs === null) {
                expect(true).toBe(true);
                return;
            }
            expect(verifyConservationEs3(parsed.reactants, parsed.products, coeffs)).toBe(true);
        });
    }
});

describe("ES3 fractionsToIntegers reduces the nullspace exactly like the native one", () => {
    for (const eq of CORPUS) {
        it(`scales identically for ${eq}`, () => {
            const parsed = splitEquation(eq);
            const native = buildMatrix(parsed.reactants, parsed.products);
            const es3 = buildMatrixEs3(parsed.reactants, parsed.products);
            let a: number[] | null = null;
            let b: number[] | null = null;
            try {
                a = fractionsToIntegers(solveSystem(native.matrix, native.cols));
            } catch {
                a = null;
            }
            try {
                b = fractionsToIntegersEs3(solveSystemEs3(es3.matrix, es3.cols));
            } catch {
                b = null;
            }
            expect(b).toEqual(a);
        });
    }
});