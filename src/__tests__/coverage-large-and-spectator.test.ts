import { describe, expect, it } from "vitest";
import { audit, balance, isBalanced, splitEquation } from "../index";
import { checkConservation } from "./support/independent";

/**
 * Large systems, spectator species and stoichiometry-at-scale coverage.
 * Each case is a distinct input.
 */

/** Combustion of long hydrocarbons produces large coefficients. */
const LARGE_HYDROCARBONS = [
    "C10H22 + O2 -> CO2 + H2O",
    "C20H42 + O2 -> CO2 + H2O",
    "C30H62 + O2 -> CO2 + H2O",
    "C40H82 + O2 -> CO2 + H2O",
    "C50H102 + O2 -> CO2 + H2O",
    "C60H122 + O2 -> CO2 + H2O",
    "C70H142 + O2 -> CO2 + H2O",
    "C80H162 + O2 -> CO2 + H2O",
    "C90H182 + O2 -> CO2 + H2O",
    "C100H202 + O2 -> CO2 + H2O",
    "C150H302 + O2 -> CO2 + H2O",
    "C200H402 + O2 -> CO2 + H2O",
    "C300H602 + O2 -> CO2 + H2O",
    "C400H802 + O2 -> CO2 + H2O",
    "C500H1002 + O2 -> CO2 + H2O",
    "C1000H2002 + O2 -> CO2 + H2O",
];

describe("long hydrocarbons scale without losing exactness", () => {
    for (const eq of LARGE_HYDROCARBONS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
            for (const s of [...r.reactants, ...r.products]) {
                expect(Number.isInteger(s.coefficient)).toBe(true);
                expect(s.coefficient).toBeGreaterThan(0);
            }
        });
    }
});

/** Coeffnamed integer for the pinned large-combustion results. */
const PINNED_LARGE: Array<[string, string]> = [
    ["C10H22 + O2 -> CO2 + H2O", "2 C10H22 + 31 O2 -> 20 CO2 + 22 H2O"],
    ["C20H42 + O2 -> CO2 + H2O", "2 C20H42 + 61 O2 -> 40 CO2 + 42 H2O"],
    ["C30H62 + O2 -> CO2 + H2O", "2 C30H62 + 91 O2 -> 60 CO2 + 62 H2O"],
    ["C40H82 + O2 -> CO2 + H2O", "2 C40H82 + 121 O2 -> 80 CO2 + 82 H2O"],
    ["C50H102 + O2 -> CO2 + H2O", "2 C50H102 + 151 O2 -> 100 CO2 + 102 H2O"],
    ["C100H202 + O2 -> CO2 + H2O", "2 C100H202 + 301 O2 -> 200 CO2 + 202 H2O"],
    ["C1000H2002 + O2 -> CO2 + H2O", "2 C1000H2002 + 3001 O2 -> 2000 CO2 + 2002 H2O"],
    ["C200H402 + O2 -> CO2 + H2O", "2 C200H402 + 601 O2 -> 400 CO2 + 402 H2O"],
];

describe("pinned large-combustion results", () => {
    for (const [eq, expected] of PINNED_LARGE) {
        it(`balances ${eq}`, () => {
            expect(balance(eq).equation).toBe(expected);
        });
    }
});

/** Multi-product industrial systems with many species. */
const BIG_SYSTEMS = [
    "K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O",
    "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
    "Fe + CuSO4 + NaCl -> FeSO4 + Cu + NaCl",
    "BaCl2 + Na2SO4 + KCl -> BaSO4 + NaCl + KCl",
    "KMnO4 + Na2SO3 + H2SO4 -> MnSO4 + K2SO4 + Na2SO4 + H2O",
    "K2Cr2O7 + FeSO4 + H2SO4 -> Cr2(SO4)3 + K2SO4 + Fe2(SO4)3 + H2O",
    "KClO3 + HCl + FeCl2 -> KCl + Cl2 + FeCl3 + H2O",
    "Pb(NO3)2 + H2SO4 -> PbSO4 + HNO3",
    "AgNO3 + NaCl + HCl -> AgCl + NaNO3 + HCl",
    "NaCl + H2O + CO2 + NH3 + H2O -> NaHCO3 + NH4Cl",
    "Ca3(PO4)2 + H2SO4 -> CaSO4 + Ca(H2PO4)2",
    "Fe2O3 + 3 CO -> 2 Fe + 3 CO2",
    "CaCO3 + SiO2 -> CaSiO3 + CO2",
    "Na2CO3 + CaCl2 -> CaCO3 + NaCl",
    "KClO3 + 6 KI + 6 HCl -> KCl + 3 I2 + 3 H2O",
];

describe("multi-species industrial systems balance exactly", () => {
    for (const eq of BIG_SYSTEMS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
            expect(isBalanced(eq)).toBe(true);
        });
    }
});

const PINNED_SYSTEMS: Array<[string, string]> = [
    [
        "K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O",
        "10 K4Fe(CN)6 + 122 KMnO4 + 299 H2SO4 -> 162 KHSO4 + 5 Fe2(SO4)3 + 122 MnSO4 + 60 HNO3 + 60 CO2 + 188 H2O",
    ],
    [
        "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
        "2 KMnO4 + 16 HCl -> 2 KCl + 2 MnCl2 + 5 Cl2 + 8 H2O",
    ],
    ["Fe + CuSO4 -> FeSO4 + Cu", "1 Fe + 1 CuSO4 -> 1 FeSO4 + 1 Cu"],
    [
        "Pb(NO3)2 + H2SO4 -> PbSO4 + HNO3",
        "1 Pb(NO3)2 + 1 H2SO4 -> 1 PbSO4 + 2 HNO3",
    ],
];

describe("pinned multi-species results", () => {
    for (const [eq, expected] of PINNED_SYSTEMS) {
        it(`balances ${eq}`, () => {
            expect(balance(eq).equation).toBe(expected);
        });
    }
});

/** A species appearing on both sides is a spectator, not an error. */
const SPECTATORS: string[] = [
    "H2 + O2 + N2 -> H2O + N2",
    "C3H8 + O2 + N2 -> CO2 + H2O + N2",
    "Fe + O2 + Ar -> Fe2O3 + Ar",
    "CH4 + O2 + He -> CO2 + H2O + He",
    "NaCl + AgNO3 + H2O -> AgCl + NaNO3 + H2O",
    "CaCO3 + HCl + NaCl -> CaCl2 + H2O + CO2 + NaCl",
    "Fe + CuSO4 + H2O -> FeSO4 + Cu + H2O",
    "Mg + HCl + KCl -> MgCl2 + H2 + KCl",
    "Zn + HCl + NaCl -> ZnCl2 + H2 + NaCl",
    "Cu + H2SO4 + H2O -> CuSO4 + H2 + H2O",
    "KMnO4 + HCl + H2O -> KCl + MnCl2 + Cl2 + H2O",
    "CaCO3 + CO2 + H2O -> Ca(HCO3)2",
    "SO2 + O2 + H2O -> H2SO4 + H2O",
    "NO + O2 + H2O -> HNO3 + H2O",
    "NH3 + O2 + H2O -> NO + H2O",
];

describe("spectator species are balanced, not rejected", () => {
    for (const eq of SPECTATORS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

describe("spectator species appear on both sides with equal coefficients", () => {
    const CASES: Array<[string, string]> = [
        ["H2 + O2 + N2 -> H2O + N2", "N2"],
        ["C3H8 + O2 + N2 -> CO2 + H2O + N2", "N2"],
        ["Fe + O2 + Ar -> Fe2O3 + Ar", "Ar"],
        ["CH4 + O2 + He -> CO2 + H2O + He", "He"],
    ];
    for (const [eq, spectator] of CASES) {
        it(`${spectator} is untouched in ${eq}`, () => {
            const r = balance(eq);
            const left = r.reactants.find((s) => s.formula === spectator);
            const right = r.products.find((s) => s.formula === spectator);
            expect(left).toBeDefined();
            expect(right).toBeDefined();
            expect(right!.coefficient).toBe(left!.coefficient);
        });
    }
});

/** Widowed systems where one side has a single species. */
const SINGLE_SIDE: string[] = [
    "CaCO3 -> CaO + CO2",
    "H2O2 -> H2O + O2",
    "NH4NO2 -> N2 + H2O",
    "KClO3 -> KCl + O2",
    "Ag2O -> Ag + O2",
    "Cu(NO3)2 -> CuO + NO2 + O2",
    "Mg(OH)2 -> MgO + H2O",
    "CaSO4 -> CaO + SO3",
    "KClO3 -> KClO4 + KCl",
];

describe("single-reactant decompositions", () => {
    for (const eq of SINGLE_SIDE) {
        it(`balances ${eq}`, () => {
            const { reactants, products } = splitEquation(eq);
            expect(reactants.length).toBe(1);
            expect(products.length).toBeGreaterThanOrEqual(1);
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** audit totals on large inputs. */
const AUDIT_CASES: string[] = [
    "C100H202 + O2 -> CO2 + H2O",
    "K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O",
    "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
    "NaCl + AgNO3 -> AgCl + NaNO3",
    "Ca3(PO4)2 + H2SO4 + H2O -> CaSO4 + Ca(H2PO4)2",
    "C + O2 -> CO + CO2",
    "MnO4- + H+ + e- -> Mn2+ + H2O",
    "Cr2O7^2- + Fe2+ + H+ -> Cr3+ + Fe3+ + H2O",
];

describe("audit reports per-side totals without balancing", () => {
    for (const eq of AUDIT_CASES) {
        it(`audits ${eq}`, () => {
            const a = audit(eq);
            const { reactants, products } = splitEquation(eq);
            let left = 0;
            let right = 0;
            for (const s of reactants) left += s.charge;
            for (const s of products) right += s.charge;
            expect(a.charge.left).toBe(left);
            expect(a.charge.right).toBe(right);
            expect(Object.keys(a.elements)).toEqual(
                Object.keys(a.elements).filter((el) => a.elements[el]!.left !== 0 || a.elements[el]!.right !== 0),
            );
        });
    }
});

describe("audit totals the sides as written, before any coefficients exist", () => {
    // audit reports the raw per-side atom sums, so an equation whose sides
    // already match is the one it marks balanced.
    const MATCHING = ["C + O2 -> CO2", "NaCl -> NaCl", "H2O -> H2O"];
    for (const eq of MATCHING) {
        it(`marks ${eq} as balanced`, () => {
            const a = audit(eq);
            expect(a.charge.balanced).toBe(true);
            for (const el in a.elements) {
                expect(a.elements[el]!.balanced).toBe(true);
                expect(a.elements[el]!.left).toBe(a.elements[el]!.right);
            }
        });
    }
});

describe("audit flags sides that do not match as written", () => {
    const UNBALANCED = [
        "H2 + O2 -> H2O",
        "Fe + O2 -> Fe2O3",
        "C + O2 -> CO + CO2",
        "MnO4- + 8 H+ -> Mn2+",
        "H2O -> H2",
        "Fe -> Au",
    ];
    for (const eq of UNBALANCED) {
        it(`does not claim ${eq} is balanced`, () => {
            const a = audit(eq);
            const anyUnbalanced = Object.values(a.elements).some((e) => !e.balanced);
            expect(anyUnbalanced || !a.charge.balanced).toBe(true);
        });
    }
});

/** Very large coefficients from linear algebra rather than a ladder. */
const LINEAR_SYSTEMS = [
    "C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O",
    "2 C6H12O6 + 12 O2 -> 12 CO2 + 12 H2O",
    "12 CH4 + 24 O2 -> 12 CO2 + 24 H2O",
    "50 C + 100 O2 -> 50 CO2",
    "25 C2H4 + 75 O2 -> 50 CO2 + 50 H2O",
    "20 N2 + 60 H2 -> 40 NH3",
    "10 KClO3 -> 5 KClO4 + 5 KCl",
    "4 P + 10 O2 -> 2 P2O5",
    "6 Al + 3 O2 -> 2 Al2O3",
    "2 Al2O3 -> 4 Al + 3 O2",
    "5 H2 + 5 Cl2 -> 10 HCl",
    "100 H2O -> 100 H2 + 50 O2",
    "75 N2 -> 75 N2",
    "40 CH3OH -> 40 CO + 80 H2",
    "20 C2H6 -> 20 C + 60 H2",
];

describe("scaled systems keep their integer ratios", () => {
    for (const eq of LINEAR_SYSTEMS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

describe("many-species systems report every coefficient", () => {
    const CASES: Array<[string, number]> = [
        ["H2 + O2 + N2 + He + Ar -> H2O + N2 + He + Ar", 9],
        ["C + O2 + N2 + H2 -> CO2 + H2O + N2", 7],
        ["Fe + O2 + C + N2 -> Fe2O3 + CO2 + N2", 7],
        ["CH4 + O2 + N2 + Ar + H2O -> CO2 + H2O + N2 + Ar", 9],
    ];
    for (const [eq, species] of CASES) {
        it(`${eq} handles ${species} species`, () => {
            const { reactants, products } = splitEquation(eq);
            expect(reactants.length + products.length).toBe(species);
            const r = balance(eq);
            expect(r.reactants.length).toBe(reactants.length);
            expect(r.products.length).toBe(products.length);
            for (const s of [...r.reactants, ...r.products]) {
                expect(Number.isInteger(s.coefficient)).toBe(true);
                expect(s.coefficient).toBeGreaterThan(0);
            }
        });
    }
});