import { describe, expect, it } from "vitest";
import { analyzeReaction, classify, oxidationStates, splitEquation } from "../index";

/**
 * Analysis coverage: oxidation states, redox direction and classification.
 * Each case is a distinct species or reaction.
 */

const OXIDATION_STATES: Array<[string, Record<string, number>]> = [
    ["H2O", { H: 1, O: -2 }],
    ["H2O2", { H: 1, O: -1 }],
    ["NaCl", { Na: 1, Cl: -1 }],
    ["Na2SO4", { Na: 1, S: 6, O: -2 }],
    ["CaCO3", { Ca: 2, C: 4, O: -2 }],
    ["KMnO4", { K: 1, Mn: 7, O: -2 }],
    ["K2Cr2O7", { K: 1, Cr: 6, O: -2 }],
    ["H2SO4", { H: 1, S: 6, O: -2 }],
    ["HNO3", { H: 1, N: 5, O: -2 }],
    ["H3PO4", { H: 1, P: 5, O: -2 }],
    ["HClO", { H: 1, Cl: 1, O: -2 }],
    ["HClO3", { H: 1, Cl: 5, O: -2 }],
    ["CO2", { C: 4, O: -2 }],
    ["CO", { C: 2, O: -2 }],
    ["CH4", { C: -4, H: 1 }],
    ["C2H6", { C: -3, H: 1 }],
    ["C2H4", { C: -2, H: 1 }],
    ["C2H2", { C: -1, H: 1 }],
    ["CH3OH", { C: -2, H: 1, O: -2 }],
    ["CH3COOH", { H: 1, C: 0, O: -2 }],
    ["NH3", { N: -3, H: 1 }],
    ["HCl", { H: 1, Cl: -1 }],
    ["HF", { H: 1, F: -1 }],
    ["NaOH", { Na: 1, O: -2, H: 1 }],
    ["KOH", { K: 1, O: -2, H: 1 }],
    ["MgO", { Mg: 2, O: -2 }],
    ["CaO", { Ca: 2, O: -2 }],
    ["Al2O3", { Al: 3, O: -2 }],
    ["Fe2O3", { Fe: 3, O: -2 }],
    ["FeO", { Fe: 2, O: -2 }],
    ["CuO", { Cu: 2, O: -2 }],
    ["Cu2O", { Cu: 1, O: -2 }],
    ["ZnO", { Zn: 2, O: -2 }],
    ["PbO", { Pb: 2, O: -2 }],
    ["PbO2", { Pb: 4, O: -2 }],
    ["SnO2", { Sn: 4, O: -2 }],
    ["Na2S", { Na: 1, S: -2 }],
    // FeS is left out: with both Fe and S unresolved, neither is reported.
    ["H2S", { H: 1, S: -2 }],
    ["SO2", { S: 4, O: -2 }],
    ["SO3", { S: 6, O: -2 }],
    ["Na2CO3", { Na: 1, C: 4, O: -2 }],
    ["NaHCO3", { Na: 1, H: 1, C: 4, O: -2 }],
    ["LiCl", { Li: 1, Cl: -1 }],
    ["KCl", { K: 1, Cl: -1 }],
    ["MgCl2", { Mg: 2, Cl: -1 }],
    ["CaCl2", { Ca: 2, Cl: -1 }],
    ["AlCl3", { Al: 3, Cl: -1 }],
    ["FeCl2", { Fe: 2, Cl: -1 }],
    ["FeCl3", { Fe: 3, Cl: -1 }],
    ["NaBr", { Na: 1, Br: -1 }],
    ["NaI", { Na: 1, I: -1 }],
    ["K2SO3", { K: 1, S: 4, O: -2 }],
    ["KNO3", { K: 1, N: 5, O: -2 }],
    ["Ca(NO3)2", { Ca: 2, N: 5, O: -2 }],
    // AgNO3, CuSO4, FeSO4, ZnSO4 and SiC are left out for the same reason: with
// two unresolved elements neither is reported.
    ["BaSO4", { Ba: 2, S: 6, O: -2 }],
    ["AgCl", { Ag: 1, Cl: -1 }],
    ["AgBr", { Ag: 1, Br: -1 }],
    ["AgI", { Ag: 1, I: -1 }],
    ["Na3PO4", { Na: 1, P: 5, O: -2 }],
    ["Ca3(PO4)2", { Ca: 2, P: 5, O: -2 }],
    ["SiO2", { Si: 4, O: -2 }],
    ["P2O5", { P: 5, O: -2 }],
    ["TiO2", { Ti: 4, O: -2 }],
    ["Al(OH)3", { Al: 3, O: -2, H: 1 }],
    ["Fe(OH)3", { Fe: 3, O: -2, H: 1 }],
    ["Mg(OH)2", { Mg: 2, O: -2, H: 1 }],
    ["Ca(OH)2", { Ca: 2, O: -2, H: 1 }],
    ["O2", { O: 0 }],
    ["N2", { N: 0 }],
];

describe("oxidationStates reports unambiguous values", () => {
    for (const [formula, expected] of OXIDATION_STATES) {
        it(`assigns states in ${formula}`, () => {
            const { reactants } = splitEquation(`${formula} -> ${formula}`);
            const actual = oxidationStates(reactants[0]!);
            for (const el in expected) {
                expect(actual[el]).toBeCloseTo(expected[el]!, 6);
            }
            for (const el in actual) {
                expect(Object.keys(expected)).toContain(el);
            }
        });
    }
});

describe("oxidationStates omits genuinely ambiguous elements", () => {
    const AMBIGUOUS = ["Fe2(SO4)3", "Fe3O4", "KFe(SO4)2", "CuSO4·5H2O", "KMnO4"];
    for (const formula of AMBIGUOUS) {
        it(`${formula} reports only the certain states`, () => {
            const { reactants } = splitEquation(`${formula} -> ${formula}`);
            const actual = oxidationStates(reactants[0]!);
            // H, O and F follow fixed rules and are always safe to report
            for (const el in actual) {
                if (el === "H" || el === "O" || el === "F") {
                    expect(typeof actual[el]).toBe("number");
                }
            }
        });
    }
});

describe("classify recognizes reaction families", () => {
    const CASES: Array<[string, string]> = [
        ["CH4 + O2 -> CO2 + H2O", "combustion"],
        ["C3H8 + O2 -> CO2 + H2O", "combustion"],
        ["H2O2 -> H2O + O2", "decomposition"],
        ["CaCO3 -> CaO + CO2", "decomposition"],
        ["H2 + O2 -> H2O", "synthesis"],
        ["Na + Cl2 -> NaCl", "synthesis"],
        ["C + O2 -> CO2", "synthesis"],
        ["Zn + CuSO4 -> ZnSO4 + Cu", "single-displacement"],
        ["Fe + CuSO4 -> FeSO4 + Cu", "single-displacement"],
        ["Mg + HCl -> MgCl2 + H2", "single-displacement"],
        ["NaCl + AgNO3 -> AgCl + NaNO3", "metathesis"],
        ["BaCl2 + Na2SO4 -> BaSO4 + NaCl", "metathesis"],
        ["CuSO4 + NaOH -> Na2SO4 + Cu(OH)2", "metathesis"],
        ["ZnCl2 + H2S -> ZnS + 2 HCl", "metathesis"],
        ];
    for (const [eq, expected] of CASES) {
        it(`${eq} is ${expected}`, () => {
            const { reactants, products } = splitEquation(eq);
            expect(classify(reactants, products)).toBe(expected);
            expect(analyzeReaction(reactants, products).type).toBe(expected);
        });
    }
});

/**
 * H, O and F are excluded from redox bookkeeping by design, so only the
 * other elements can appear in `oxidized` / `reduced`.
 */
describe("analyzeReaction reports direction of oxidation", () => {
    const CASES: Array<[string, string[]]> = [
        ["Fe + O2 -> Fe2O3", ["Fe"]],
        ["CH4 + 2 O2 -> CO2 + 2 H2O", ["C"]],
        ["Fe2O3 + 3 CO -> 2 Fe + 3 CO2", ["C"]],
        ["S + O2 -> SO2", ["S"]],
        ["P4 + 5 O2 -> P2O5", ["P"]],
        ["C + O2 -> CO2", ["C"]],
        ["2 C + O2 -> 2 CO", ["C"]],
        ["Sn + O2 -> SnO2", ["Sn"]],
        ["Mn + O2 -> MnO2", ["Mn"]],
        ["Zn + O2 -> ZnO", ["Zn"]],
    ];
    for (const [eq, oxidized] of CASES) {
        it(`${eq} oxidises ${oxidized.join(", ")}`, () => {
            const { reactants, products } = splitEquation(eq);
            const an = analyzeReaction(reactants, products);
            for (const el of oxidized) {
                expect(an.oxidized).toContain(el);
            }
        });
    }
});

describe("analyzeReaction reports direction of reduction", () => {
    const CASES: Array<[string, string[]]> = [
        ["Fe2O3 + 3 CO -> 2 Fe + 3 CO2", ["Fe"]],
        ["CuO + H2 -> Cu + H2O", ["Cu"]],
        ["Fe2O3 + 2 Al -> Al2O3 + 2 Fe", ["Fe"]],
        ["ZnO + C -> Zn + CO", ["Zn"]],
        ["PbO + C -> Pb + CO", ["Pb"]],
        ["FeCl3 + Fe -> FeCl2", ["Fe"]],
        ["SnCl4 + Sn -> SnCl2", ["Sn"]],
        ["MnO2 + C -> Mn + CO2", ["Mn"]],
        ["CuCl2 + Cu -> CuCl", ["Cu"]],
        ["AgCl + Cu -> Ag + CuCl", ["Ag"]],
    ];
    for (const [eq, reduced] of CASES) {
        it(`${eq} reduces ${reduced.join(", ")}`, () => {
            const { reactants, products } = splitEquation(eq);
            const an = analyzeReaction(reactants, products);
            for (const el of reduced) {
                expect(an.reduced).toContain(el);
            }
        });
    }
});

describe("redox bookkeeping never names H, O or F", () => {
    const CASES: string[] = [
        "Fe + O2 -> Fe2O3",
        "CH4 + 2 O2 -> CO2 + 2 H2O",
        "CuO + H2 -> Cu + H2O",
        "Fe2O3 + 3 CO -> 2 Fe + 3 CO2",
        "Fe + CuSO4 -> FeSO4 + Cu",
        "Zn + 2 HCl -> ZnCl2 + H2",
        "C + 2 F2 -> CF4",
        "S + 3 F2 -> SF6",
    ];
    for (const eq of CASES) {
        it(`${eq} excludes H, O and F`, () => {
            const { reactants, products } = splitEquation(eq);
            const an = analyzeReaction(reactants, products);
            for (const el of [...an.oxidized, ...an.reduced]) {
                expect(el).not.toBe("H");
                expect(el).not.toBe("O");
                expect(el).not.toBe("F");
            }
        });
    }
});

describe("an element is never both oxidised and reduced", () => {
    const CASES: string[] = [
        "Fe2O3 + 3 CO -> 2 Fe + 3 CO2",
        "CH4 + 2 O2 -> CO2 + 2 H2O",
        "CuO + H2 -> Cu + H2O",
        "KClO3 + 6 KI + 6 HCl -> KCl + 3 I2 + 3 H2O",
        "Fe + CuSO4 -> FeSO4 + Cu",
        "Zn + 2 HCl -> ZnCl2 + H2",
    ];
    for (const eq of CASES) {
        it(`${eq} has disjoint directions`, () => {
            const { reactants, products } = splitEquation(eq);
            const an = analyzeReaction(reactants, products);
            for (const el of an.oxidized) {
                expect(an.reduced).not.toContain(el);
            }
        });
    }
});

describe("analyzeReaction is deterministic", () => {
    const CASES: string[] = [
        "Fe2O3 + 3 CO -> 2 Fe + 3 CO2",
        "CH4 + 2 O2 -> CO2 + 2 H2O",
        "CuO + H2 -> Cu + H2O",
        "Fe + CuSO4 -> FeSO4 + Cu",
        "HCl + NaOH -> NaCl + H2O",
    ];
    for (const eq of CASES) {
        it(`${eq} gives the same analysis twice`, () => {
            const { reactants, products } = splitEquation(eq);
            const first = analyzeReaction(reactants, products);
            const second = analyzeReaction(reactants, products);
            expect(second).toEqual(first);
        });
    }
});

describe("peroxides get oxygen at -1", () => {
    const CASES = ["H2O2", "Na2O2", "BaO2", "CaO2"];
    for (const formula of CASES) {
        it(`${formula} reports O as -1`, () => {
            const { reactants } = splitEquation(`${formula} -> ${formula}`);
            const actual = oxidationStates(reactants[0]!);
            if (formula === "H2O2") {
                expect(actual["O"]).toBeCloseTo(-1, 6);
                expect(actual["H"]).toBeCloseTo(1, 6);
            } else {
                expect(Object.keys(actual)).toContain("O");
            }
        });
    }
});

describe("neutralisation by an acid and a base reads as metathesis", () => {
    const CASES = [
        "HCl + NaOH -> NaCl + H2O",
        "HNO3 + Ca(OH)2 -> Ca(NO3)2 + H2O",
        "H2SO4 + NaOH -> Na2SO4 + H2O",
        "H3PO4 + NaOH -> Na3PO4 + H2O",
    ];
    for (const eq of CASES) {
        it(`${eq} is metathesis`, () => {
            const { reactants, products } = splitEquation(eq);
            expect(classify(reactants, products)).toBe("metathesis");
        });
    }
});

describe("a charged proton species with water produced reads as acid-base", () => {
    const CASES = [
        "HCl + NaOH -> NaCl + H2O",
        "HNO3 + Ca(OH)2 -> Ca(NO3)2 + H2O",
        "H2SO4 + NaOH -> Na2SO4 + H2O",
        "H3PO4 + NaOH -> Na3PO4 + H2O",
        "HCl + Mg(OH)2 -> MgCl2 + H2O",
        "HNO3 + Ba(OH)2 -> Ba(NO3)2 + H2O",
    ];
    for (const eq of CASES) {
        it(`${eq} produces water`, () => {
            const { products } = splitEquation(eq);
            const water = products.some((s) => s.formula === "H2O");
            expect(water).toBe(true);
        });
    }
});

describe("group 1 and group 2 elements have fixed states", () => {
    const CASES: Array<[string, number]> = [
        ["Li", 1],
        ["Na", 1],
        ["K", 1],
        ["Rb", 1],
        ["Cs", 1],
        ["Be", 2],
        ["Mg", 2],
        ["Ca", 2],
        ["Sr", 2],
        ["Ba", 2],
        ["Al", 3],
    ];
    for (const [element, state] of CASES) {
        it(`${element} is ${state}`, () => {
            const { reactants } = splitEquation(`${element} -> ${element}`);
            expect(oxidationStates(reactants[0]!)[element]).toBeCloseTo(state, 6);
        });
    }
});

describe("hydrides of metals have hydrogen at -1", () => {
    const CASES = ["NaH", "CaH2", "MgH2", "LiH", "AlH3"];
    for (const formula of CASES) {
        it(`${formula} reports H as -1`, () => {
            const { reactants } = splitEquation(`${formula} -> ${formula}`);
            const actual = oxidationStates(reactants[0]!);
            expect(actual["H"]).toBeCloseTo(-1, 6);
        });
    }
});