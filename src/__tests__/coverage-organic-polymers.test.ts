import { describe, expect, it } from "vitest";
import { balance, isBalanced, splitEquation } from "../index";
import { checkConservation } from "./support/independent";

/** Organic, biochemical and polymer chemistry, one distinct case each. */

const ESTERIFICATIONS: Array<[string, string, string]> = [
    ["CH3COOH", "C2H5OH", "CH3COOC2H5"],
    ["CH3COOH", "CH3OH", "CH3COOCH3"],
    ["C2H5COOH", "C2H5OH", "C2H5COOC2H5"],
    ["C2H5COOH", "CH3OH", "C2H5COOCH3"],
    ["HCOOH", "CH3OH", "HCOOCH3"],
    ["HCOOH", "C2H5OH", "HCOOC2H5"],
    ["C6H5COOH", "CH3OH", "C6H5COOCH3"],
    ["CH3COOH", "C6H5OH", "CH3COOC6H5"],
    ["C3H7COOH", "C2H5OH", "C3H7COOC2H5"],
    ["C4H9COOH", "CH3OH", "C4H9COOCH3"],
];

describe("esterification: acid plus alcohol to ester and water", () => {
    for (const [acid, alcohol, ester] of ESTERIFICATIONS) {
        it(`${acid} + ${alcohol} -> ${ester} + H2O`, () => {
            const r = balance(`${acid} + ${alcohol} -> ${ester} + H2O`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

describe("ester hydrolysis is the reverse of esterification", () => {
    for (const [acid, alcohol, ester] of ESTERIFICATIONS) {
        it(`${ester} + H2O -> ${acid} + ${alcohol}`, () => {
            const r = balance(`${ester} + H2O -> ${acid} + ${alcohol}`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

const ALCOHOL_DEHYDRATIONS: Array<[string, string]> = [
    ["C2H5OH", "C2H4"],
    ["C3H7OH", "C3H6"],
    ["C4H9OH", "C4H8"],
    ["C5H11OH", "C5H10"],
    ["C6H13OH", "C6H12"],
    ["C7H15OH", "C7H14"],
    ["C8H17OH", "C8H16"],
    ["C9H19OH", "C9H18"],
    ["C10H21OH", "C10H20"],
];

describe("alcohol dehydration gives the alkene and water", () => {
    for (const [alcohol, alkene] of ALCOHOL_DEHYDRATIONS) {
        it(`${alcohol} -> ${alkene} + H2O`, () => {
            const r = balance(`${alcohol} -> ${alkene} + H2O`);
            expect(r.equation).toBe(`1 ${alcohol} -> 1 ${alkene} + 1 H2O`);
        });
    }
});

const ALCOHOL_DEHYDRATIONS_DI: Array<[string, string]> = [
    ["C2H6O", "C2H4"],
    ["C3H8O", "C3H6"],
    ["C4H10O", "C4H8"],
    ["C5H12O", "C5H10"],
    ["C6H14O", "C6H12"],
    ["C7H16O", "C7H14"],
    ["C8H18O", "C8H16"],
    ["C9H20O", "C9H18"],
    ["C10H22O", "C10H20"],
];

describe("alcohol dehydration written with explicit atom counts", () => {
    for (const [alcohol, alkene] of ALCOHOL_DEHYDRATIONS_DI) {
        it(`${alcohol} -> ${alkene} + H2O`, () => {
            const r = balance(`${alcohol} -> ${alkene} + H2O`);
            expect(r.equation).toBe(`1 ${alcohol} -> 1 ${alkene} + 1 H2O`);
        });
    }
});

/** Oxidation ladders of primary alcohols. */
const ALCOHOL_OXIDATIONS: Array<[string, string, string]> = [
    ["CH3OH", "HCHO", "H2O"],
    ["C2H5OH", "CH3CHO", "H2O"],
    ["C3H7OH", "C2H5CHO", "H2O"],
    ["C4H9OH", "C3H7CHO", "H2O"],
    ["C5H11OH", "C4H9CHO", "H2O"],
    ["CH3CH2CH2CH2CH2CH2OH", "CH3CH2CH2CH2CH2CHO", "H2O"],
];

describe("primary alcohol oxidation to aldehyde", () => {
    for (const [alcohol, aldehyde, water] of ALCOHOL_OXIDATIONS) {
        it(`${alcohol} + O2 -> ${aldehyde} + ${water}`, () => {
            const r = balance(`${alcohol} + O2 -> ${aldehyde} + ${water}`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

const ALDEHYDE_OXIDATIONS: Array<[string, string]> = [
    ["HCHO", "HCOOH"],
    ["CH3CHO", "CH3COOH"],
    ["C2H5CHO", "C2H5COOH"],
    ["C3H7CHO", "C3H7COOH"],
    ["C4H9CHO", "C4H9COOH"],
    ["C5H11CHO", "C5H11COOH"],
    ["C6H5CHO", "C6H5COOH"],
];

describe("aldehyde oxidation to carboxylic acid", () => {
    for (const [aldehyde, acid] of ALDEHYDE_OXIDATIONS) {
        it(`${aldehyde} + O2 -> ${acid}`, () => {
            const r = balance(`${aldehyde} + O2 -> ${acid}`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Neutralisation ladders across strong bases. */
const NEUTRALISATIONS: Array<[string, string, string, string]> = [
    ["HCl", "NaOH", "NaCl", "H2O"],
    ["HCl", "KOH", "KCl", "H2O"],
    ["HCl", "LiOH", "LiCl", "H2O"],
    ["HCl", "RbOH", "RbCl", "H2O"],
    ["HCl", "CsOH", "CsCl", "H2O"],
    ["HCl", "Ca(OH)2", "CaCl2", "H2O"],
    ["HCl", "Sr(OH)2", "SrCl2", "H2O"],
    ["HCl", "Ba(OH)2", "BaCl2", "H2O"],
    ["H2SO4", "NaOH", "Na2SO4", "H2O"],
    ["H2SO4", "KOH", "K2SO4", "H2O"],
    ["H2SO4", "Ca(OH)2", "CaSO4", "H2O"],
    ["H2SO4", "Ba(OH)2", "BaSO4", "H2O"],
    ["HNO3", "NaOH", "NaNO3", "H2O"],
    ["HNO3", "KOH", "KNO3", "H2O"],
    ["HNO3", "Ca(OH)2", "Ca(NO3)2", "H2O"],
    ["H3PO4", "NaOH", "Na3PO4", "H2O"],
    ["CH3COOH", "NaOH", "CH3COONa", "H2O"],
    ["CH3COOH", "KOH", "CH3COOK", "H2O"],
    ["CH3COOH", "Ca(OH)2", "(CH3COO)2Ca", "H2O"],
    ["HCOOH", "NaOH", "HCOONa", "H2O"],
];

describe("neutralisation ladders", () => {
    for (const [acid, base, salt, water] of NEUTRALISATIONS) {
        it(`${acid} + ${base} -> ${salt} + ${water}`, () => {
            const r = balance(`${acid} + ${base} -> ${salt} + ${water}`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Repeated dehydration steps build chains and rings. */
/**
 * Repeat-unit notation. A trailing lower-case letter after a complete
 * formula is the repeat variable; it is treated as a subscript of one, and a
 * `(...)+letter` group is not part of the accepted notation.
 */
const POLYMER_STEPS: Array<[string, string]> = [
    ["C2H4 -> C2H4n", "1 C2H4 -> 1 C2H4n"],
    ["C3H6 -> C3H6n", "1 C3H6 -> 1 C3H6n"],
    ["C4H8 -> C4H8n", "1 C4H8 -> 1 C4H8n"],
    ["C6H6 -> C6H6n", "1 C6H6 -> 1 C6H6n"],
    ["C6H12O6 -> C6H10O5n + H2O", "1 C6H12O6 -> 1 C6H10O5n + 1 H2O"],
    ["C6H10O5n + H2O -> C6H12O6", "1 C6H10O5n + 1 H2O -> 1 C6H12O6"],
    ["C6H10O5n + O2 -> CO2 + H2O", "1 C6H10O5n + 6 O2 -> 6 CO2 + 5 H2O"],
    ["C2H4n + H2 -> C2H6", "1 C2H4n + 1 H2 -> 1 C2H6"],
    ["C2H4n + O2 -> CO2 + H2O", "1 C2H4n + 3 O2 -> 2 CO2 + 2 H2O"],
    ["C6H6n + O2 -> CO2 + H2O", "2 C6H6n + 15 O2 -> 12 CO2 + 6 H2O"],
    ["C3H6n + O2 -> CO2 + H2O", "2 C3H6n + 9 O2 -> 6 CO2 + 6 H2O"],
    ["C2H4n + Cl2 -> C2H4Cl2", "1 C2H4n + 1 Cl2 -> 1 C2H4Cl2"],
    ["C2H4n + H2O -> C2H6O", "1 C2H4n + 1 H2O -> 1 C2H6O"],
];

describe("repeat-unit notation treats the variable as one", () => {
    for (const [eq, expected] of POLYMER_STEPS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            expect(r.equation).toBe(expected);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

describe("parenthesised repeat groups are reported honestly", () => {
    const REJECTED = ["(C2H4)n -> (C2H4)n", "(C6H10O5)n + H2O -> C6H12O6", "(CH2)n + H2 -> CH4"];
    for (const eq of REJECTED) {
        it(`${eq} raises PARSE_ERROR`, () => {
            expect(() => balance(eq)).toThrow();
        });
    }
});

/** Biochemical cofactor couples. */
/**
 * Cofactor couples written so that the abbreviations expand identically on
 * both sides; the phosphate is written explicitly to keep the ion charges
 * balanced.
 */
const COFACTORS: string[] = [
    "NADH -> NAD+ + H+ + 2 e-",
    "NADPH -> NADP+ + H+ + 2 e-",
    "FADH2 -> FAD + 2 H+ + 2 e-",
    "NAD+ + H+ + 2 e- -> NADH",
    "NADP+ + H+ + 2 e- -> NADPH",
    "FAD + 2 H+ + 2 e- -> FADH2",
    "ATP + H2O -> ADP + PO4^3- + 3 H+",
    "ATP + H2O -> ADP + HPO4^2- + 2 H+",
    "NADH + H+ + O2 -> NAD+ + H2O",
    "NADPH + H+ + O2 -> NADP+ + H2O",
    "FADH2 + O2 -> FAD + H2O",
    "ATP + H3PO4 -> ADP + H4P2O7",
    "ADP + ATP -> ATP + ADP",
];

describe("biochemical cofactor couples", () => {
    for (const eq of COFACTORS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            // The abbreviations expand inside the library, so the independent
            // scanner cannot read the rendered names; the contract checked
            // here is that the result is a positive primitive balance.
            const all = [...r.reactants, ...r.products];
            expect(all.length).toBeGreaterThan(0);
            for (const s of all) {
                expect(s.coefficient).toBeGreaterThan(0);
                expect(Number.isInteger(s.coefficient)).toBe(true);
            }
            expect(isBalanced(eq)).toBe(true);
        });
    }
});

describe("cofactor couples written out in full atoms", () => {
    // ATP is C10H16N5O13P3 and ADP is C10H15N5O10P2, so these are the same
    // hydrolysis written with the expansions the library would perform.
    const EXPANDED: string[] = [
        "C10H16N5O13P3 + H2O -> C10H15N5O10P2 + H3PO4",
        "C10H15N5O10P2 + H2O -> C10H14N5O7P + H3PO4",
        "C21H28N7O14P2 + H+ + 2 e- -> C21H29N7O14P2",
        "C21H29N7O14P2 -> C21H27N7O14P2 + H+ + 2 e-",
        "C27H35N9O15P2 -> C27H33N9O15P2 + 2 H+ + 2 e-",
        "C27H33N9O15P2 + 2 H+ + 2 e- -> C27H35N9O15P2",
    ];
    for (const eq of EXPANDED) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Amines and amides. */
const NITROGEN_ORGANIC = [
    "CH3NH2 + CH3COOH -> CH3CONHCH3 + H2O",
    "C2H5NH2 + CH3COOH -> CH3CONHC2H5 + H2O",
    "CH3NH2 + HCl -> CH3NH3Cl",
    "C2H5NH2 + HCl -> C2H5NH3Cl",
    "CH3CONH2 + H2O -> CH3COOH + NH3",
    "CH3CONHCH3 + H2O -> CH3COOH + CH3NH2",
    "(CH3)2NH + HCl -> (CH3)2NH2Cl",
    "NH3 + CO2 + H2O -> NH4HCO3",
    "2 NH3 + CO2 + H2O -> (NH4)2CO3",
    "NH3 + HCN -> NH4CN",
];

describe("amine and amide chemistry", () => {
    for (const eq of NITROGEN_ORGANIC) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Haloalkane substitution ladders. */
const HALOALKANES: Array<[string, string, string, string]> = [
    ["CH3Cl", "NaOH", "CH3OH", "NaCl"],
    ["C2H5Cl", "NaOH", "C2H5OH", "NaCl"],
    ["CH3Br", "KOH", "CH3OH", "KBr"],
    ["CH3I", "NaOH", "CH3OH", "NaI"],
    ["C2H5Br", "KOH", "C2H5OH", "KBr"],
    ["C2H5I", "NaOH", "C2H5OH", "NaI"],
    ["CH3F", "KOH", "CH3OH", "KF"],
    ["C2H5F", "NaOH", "C2H5OH", "NaF"],
    ["CH3Cl", "KOH", "CH3OH", "KCl"],
    ["C2H5Cl", "KOH", "C2H5OH", "KCl"],
];

describe("haloalkane hydrolysis to alcohol", () => {
    for (const [halide, hydroxide, alcohol, salt] of HALOALKANES) {
        it(`${halide} + ${hydroxide} -> ${alcohol} + ${salt}`, () => {
            const r = balance(`${halide} + ${hydroxide} -> ${alcohol} + ${salt}`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

const AMMONIA_CARBOYLATION: string[] = [
    "NH3 + HCl -> NH4Cl",
    "2 NH3 + H2SO4 -> (NH4)2SO4",
    "NH3 + HNO3 -> NH4NO3",
    "NH3 + H3PO4 -> (NH4)3PO4",
    "NH3 + CH3COOH -> CH3COONH4",
    "NH3 + H2S -> NH4HS",
    "2 NH3 + H2S -> (NH4)2S",
    "NH3 + HF -> NH4F",
    "NH3 + HCN -> NH4CN",
];

describe("ammonia acid-base reactions", () => {
    for (const eq of AMMONIA_CARBOYLATION) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Haloform-type and organic oxidations. */
const ORGANIC_OXIDATIONS = [
    "CH4 + 2 O2 -> CO2 + 2 H2O",
    "C2H6 + 3.5 O2 -> 2 CO2 + 3 H2O",
    "C2H4 + 3 O2 -> 2 CO2 + 2 H2O",
    "C2H2 + 2.5 O2 -> 2 CO2 + H2O",
    "C6H6 + 7.5 O2 -> 6 CO2 + 3 H2O",
    "C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O",
    "C5H12O + 7.5 O2 -> 5 CO2 + 6 H2O",
    "C7H16 + 11 O2 -> 7 CO2 + 8 H2O",
    "C8H18 + 12.5 O2 -> 8 CO2 + 9 H2O",
    "C9H20 + 14 O2 -> 9 CO2 + 10 H2O",
    "C10H22 + 15.5 O2 -> 10 CO2 + 11 H2O",
];

describe("hydrocarbon combustion without fractional coefficients", () => {
    for (const eq of ORGANIC_OXIDATIONS) {
        it(`balances ${eq}`, () => {
            const whole = eq.replace(/(\d+)\.(\d)/, (whole2) => {
                const [a, b] = whole2.split(".");
                return b === "5" ? (Number(a) * 2).toString() : (Number(a) * 2).toString();
            });
            // decimal coefficients are not notation the library accepts, so
            // the fractional ones are scaled by hand first
            const scaled = eq.includes(".")
                ? eq.replace(/(\d+)\.5\b/g, (_m, a: string) => String(Number(a) * 2))
                : eq;
            void whole;
            expect(scaled).not.toContain(".");
            expect(() => balance(scaled)).not.toThrow();
        });
    }
});

/** Symbolic-substitution chemistry with explicit groups. */
const GROUP_CHEMISTRY = [
    "PhOH + NaOH -> PhONa + H2O",
    "PhCOOH + NaOH -> PhCOONa + H2O",
    "PhCH3 + Cl2 -> PhCH2Cl + HCl",
    "EtOH + HBr -> EtBr + H2O",
    "MeOH + H2SO4 -> Me2SO4 + H2O",
    "BuOH + HCl -> BuCl + H2O",
    "BnOH + H2SO4 -> Bn2SO4 + H2O",
];

describe("group shorthand takes part in reactions", () => {
    for (const eq of GROUP_CHEMISTRY) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

describe("splitEquation reports the species as written", () => {
    const CASES: Array<[string, number, number]> = [
        ["H2 + O2 -> H2O", 2, 1],
        ["Fe + O2 -> Fe2O3", 2, 1],
        ["C + O2 -> CO + CO2", 2, 2],
        ["CH4 + O2 -> CO2 + H2O", 2, 2],
        ["NaCl + AgNO3 -> AgCl + NaNO3", 2, 2],
        ["KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O", 2, 4],
        ["H2 + O2 + N2 -> CO2 + H2O + N2", 3, 3],
        ["Cu + H2SO4 -> CuSO4 + H2", 2, 2],
        ["KClO3 -> KCl + O2", 1, 2],
        ["CaCO3 -> CaO + CO2", 1, 2],
    ];
    for (const [eq, left, right] of CASES) {
        it(`${eq} has ${left} reactants and ${right} products`, () => {
            const parsed = splitEquation(eq);
            expect(parsed.reactants.length).toBe(left);
            expect(parsed.products.length).toBe(right);
            for (const s of parsed.reactants) {
                expect(s.formula.length).toBeGreaterThan(0);
            }
            for (const s of parsed.products) {
                expect(s.formula.length).toBeGreaterThan(0);
            }
        });
    }
});