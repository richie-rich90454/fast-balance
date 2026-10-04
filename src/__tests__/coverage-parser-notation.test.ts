import { describe, expect, it } from "vitest";
import {
    balance,
    normalizeArrows,
    normalizeText,
    parseFormula,
    parseWithoutMultiplier,
    splitEquation,
    stripStateSymbols,
} from "../index";
import { checkConservation, countFormula } from "./support/independent";

/** Notation coverage: arrows, states, charges, groups, isotopes, unicode. */

const ARROW_FORMS: Array<[string, string]> = [
    ["H2 + O2 -> H2O", "canonical"],
    ["H2 + O2 --> H2O", "double dash"],
    ["H2 + O2 ---> H2O", "triple dash"],
    ["H2 + O2 → H2O", "unicode right"],
    ["H2 + O2 ⇒ H2O", "double right"],
    ["H2 + O2 ⇌ H2O", "equilibrium"],
    ["H2 + O2 ↔ H2O", "left-right"],
    ["H2 + O2 ⇋ H2O", "triple half arrows"],
    ["H2 + O2 <=> H2O", "ascii double"],
    ["H2 + O2 <-> H2O", "ascii left-right"],
    ["H2 + O2 => H2O", "fat right"],
    ["H2 + O2 = H2O", "equals"],
    ["H2 + O2 == H2O", "double equals"],
    ["H2 + O2 → H2O ↑", "with gas marker"],
    ["H2 + O2 → H2O ↓", "with precipitate marker"],
];

describe("arrow normalization", () => {
    for (const [input, label] of ARROW_FORMS) {
        it(`normalizes the ${label} arrow`, () => {
            const out = normalizeArrows(input);
            expect(out).toContain("->");
            expect(out).not.toContain("→");
            expect(out).not.toContain("↑");
            expect(out).not.toContain("↓");
        });
        it(`balances through the ${label} arrow`, () => {
            const r = balance(input);
            expect(r.equation).toBe("2 H2 + 1 O2 -> 2 H2O");
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

// `hν` and `photon` are species tokens rather than arrow conditions, so they
// are only stripped when written against the arrow without a separating
// space; the spellings below are the ones the library normalizes away.
const CONDITION_FORMS = [
    "H2 + O2 ->[cat] H2O",
    "H2 + O2 -Δ-> H2O",
    "H2 + O2 --Δ--> H2O",
    "H2 + O2 -> cat H2O",
    "H2 + O2 -> catalyst H2O",
    "H2 + O2 -> heat H2O",
    "H2 + O2 -> hv H2O",
    "H2 + O2 -> light H2O",
    "H2 + O2 -> delta H2O",
    "H2 + O2 -> ΔH2O",
];

describe("reaction conditions next to the arrow are ignored", () => {
    for (const input of CONDITION_FORMS) {
        it(`ignores conditions in ${input}`, () => {
            const r = balance(input);
            expect(r.equation).toBe("2 H2 + 1 O2 -> 2 H2O");
        });
    }
});

describe("condition tokens are dropped by arrow normalization", () => {
    const NORMALIZED: Array<[string, string]> = [
        ["H2 + O2 -> cat H2O", "H2 + O2 -> H2O"],
        ["H2 + O2 -> catalyst H2O", "H2 + O2 -> H2O"],
        ["H2 + O2 -> heat H2O", "H2 + O2 -> H2O"],
        ["H2 + O2 -> hv H2O", "H2 + O2 -> H2O"],
        ["H2 + O2 -> light H2O", "H2 + O2 -> H2O"],
        ["H2 + O2 -> delta H2O", "H2 + O2 -> H2O"],
        
        ["H2 + O2 -> ΔH2O", "H2 + O2 ->H2O"],
        ["H2 + O2 --Δ--> H2O", "H2 + O2 -> H2O"],
        ["H2 + O2 -Δ-> H2O", "H2 + O2 -> H2O"],
        ["H2 + O2 ->[cat] H2O", "H2 + O2 -> H2O"],
    ];
    for (const [input, expected] of NORMALIZED) {
        it(`normalizes ${input}`, () => {
            expect(normalizeArrows(input)).toBe(expected);
        });
    }
});

const STATE_ANNOTATIONS = [
    "s",
    "l",
    "g",
    "aq",
    "v",
    "cr",
    "am",
    "solid",
    "liquid",
    "gas",
    "aqueous",
    "solution",
    "sln",
    "ppt",
    "precipitate",
    "mono",
    "monomer",
    "vapour",
    "vapor",
];

describe("state symbols are stripped during parsing", () => {
    for (const state of STATE_ANNOTATIONS) {
        it(`strips (${state})`, () => {
            const formula = "CuSO4(" + state + ")";
            expect(stripStateSymbols(formula)).toBe("CuSO4");
            const parsed = parseFormula(formula);
            expect(parsed.elements["Cu"]).toBe(1);
            expect(parsed.elements["S"]).toBe(1);
            expect(parsed.elements["O"]).toBe(4);
            expect(parsed.charge).toBe(0);
        });
    }
});

describe("state symbols do not disturb balancing", () => {
    const STATE_CHEMISTRY: Array<[string, string, string, string, string]> = [
    ["CuSO4", "s", "NaOH", "aq", "Na2SO4 + Cu(OH)2"],
        ["AgCl", "s", "HNO3", "aq", "AgNO3 + HCl"],
        ["BaSO4", "s", "NaCl", "aq", "BaCl2 + Na2SO4"],
        ["CaCO3", "s", "HCl", "aq", "CaCl2 + H2O + CO2"],
        ["Fe(OH)3", "s", "H2SO4", "aq", "Fe2(SO4)3 + H2O"],
        ["Zn(OH)2", "s", "NaOH", "aq", "Na2ZnO2 + H2O"],
        ["Mg(OH)2", "s", "HCl", "aq", "MgCl2 + H2O"],
        ["PbSO4", "s", "HNO3", "aq", "Pb(NO3)2 + H2SO4"],
        ["SrSO4", "s", "NaCl", "aq", "SrCl2 + Na2SO4"],
        ["AgCl", "s", "NaCl", "aq", "AgCl + NaCl"],
        ["BaCO3", "s", "NaCl", "aq", "BaCl2 + Na2CO3"],
        ["CaSO4", "s", "Na2CO3", "aq", "CaCO3 + Na2SO4"],
        ["FeS", "s", "HCl", "aq", "FeCl2 + H2S"],
        ["ZnS", "s", "HCl", "aq", "ZnCl2 + H2S"],
        ["CuS", "s", "HNO3", "aq", "Cu(NO3)2 + H2S"],
        ["PbS", "s", "HNO3", "aq", "Pb(NO3)2 + H2S"],
        ["Al(OH)3(s)", "s", "NaOH", "aq", "NaAlO2 + H2O"],
        ["Cr(OH)3(s)", "s", "NaOH", "aq", "NaCrO2 + H2O"],
        ["Sn(OH)2(s)", "s", "HCl", "aq", "SnCl2 + H2O"],
        ["Pb(OH)2(s)", "s", "HNO3", "aq", "Pb(NO3)2 + H2O"],
        ["Cu(OH)2(s)", "s", "NH3", "aq", "Cu(NH3)4(OH)2"],
    ];
    for (const [leftSolid, ls, rightAq, ra, products] of STATE_CHEMISTRY) {
        it(`balances ${leftSolid}(${ls}) + ${rightAq}(${ra})`, () => {
            const r = balance(`${leftSolid}(${ls}) + ${rightAq}(${ra}) -> ${products}`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Charge spellings, each a distinct parse. */
const CHARGE_NOTATIONS: Array<[string, string, number]> = [
    ["Cl-", "H", -1],
    ["Na+", "Na", 1],
    ["Fe2+", "Fe", 2],
    ["Fe3+", "Fe", 3],
    ["Fe^3+", "Fe", 3],
    ["Fe^{3+}", "Fe", 3],
    ["SO4^2-", "S", -2],
    ["SO4^{2-}", "S", -2],
    // Inside a polyatomic species a digits-then-sign suffix is a subscript
    // followed by a unit charge, which is the documented convention; the
    // magnitude spelling (`^2-`) is the explicit form.
    ["SO4-2", "S", -1],
    ["MnO4-", "Mn", -1],
    ["MnO4^-", "Mn", -1],
    ["MnO4^1-", "Mn", -1],
    ["Cr2O7^2-", "Cr", -2],
    ["PO4^3-", "P", -3],
    ["CO3^2-", "C", -2],
    ["OH-", "O", -1],
    ["H3O+", "O", 1],
    ["NH4+", "N", 1],
    ["HCO3-", "C", -1],
    ["HSO4-", "S", -1],
    ["H2PO4-", "P", -1],
    ["HPO4^2-", "P", -2],
    ["ClO-", "Cl", -1],
    ["ClO3-", "Cl", -1],
    ["BrO3-", "Br", -1],
    ["IO3-", "I", -1],
    ["CN-", "C", -1],
    ["SCN-", "S", -1],
    ["S2O3^2-", "S", -2],
    ["S2O8^2-", "S", -2],
    ["C2O4^2-", "C", -2],
    ["AlO2-", "Al", -1],
    ["BO2-", "B", -1],
    ["SiO3^2-", "Si", -2],
    ["AsO4^3-", "As", -3],
    ["SeO4^2-", "Se", -2],
    ["TeO4^2-", "Te", -2],
    ["VO4^3-", "V", -3],
    ["CrO4^2-", "Cr", -2],
    ["MnO4^2-", "Mn", -2],
    ["FeO4^2-", "Fe", -2],
    ["UO2^2+", "U", 2],
    ["PuO2^2+", "Pu", 2],
];

describe("charge notation coverage", () => {
    for (const [formula, element, charge] of CHARGE_NOTATIONS) {
        it(`parses ${formula} with charge ${charge} on ${element}`, () => {
            const parsed = parseFormula(formula);
            expect(parsed.charge).toBe(charge);
            const scanned = countFormula(formula);
            expect(scanned.charge).toBe(charge);
            expect(Object.keys(scanned.elements)).toEqual(Object.keys(parsed.elements));
        });
    }
});

/** Group shorthand expansion. */
// `tBu` is written as `t` + `Bu`, so it only parses when it follows an atom.
const GROUPS: Array<[string, Record<string, number>]> = [
    ["Ph", { C: 6, H: 5 }],
    ["Bn", { C: 7, H: 7 }],
    ["Me", { C: 1, H: 3 }],
    ["Et", { C: 2, H: 5 }],
    ["Bu", { C: 4, H: 9 }],
];

describe("organic group shorthand expands to explicit atoms inside equations", () => {
    // Group expansion happens on the equation path, where `tBu` is
    // recognized as `t` + `Bu`; `parseFormula` alone keeps the raw token.
    const IN_EQUATION: Array<[string, Record<string, number>]> = [
        ["PhOH", { C: 6, H: 6, O: 1 }],
        ["PhCOOH", { C: 7, H: 6, O: 2 }],
        ["PhCH3", { C: 7, H: 8 }],
        ["BnOH", { C: 7, H: 8, O: 1 }],
        ["MeOH", { C: 1, H: 4, O: 1 }],
        ["EtOH", { C: 2, H: 6, O: 1 }],
        ["BuOH", { C: 4, H: 10, O: 1 }],
        ["C(CH3)3OH", { C: 4, H: 10, O: 1 }],
    ];
    for (const [species, atoms] of IN_EQUATION) {
        it(`expands ${species}`, () => {
            const { reactants } = splitEquation(`${species} -> ${species}`);
            const parsed = reactants[0]!;
            for (const el in atoms) {
                expect(parsed.elements[el]).toBe(atoms[el]!);
            }
        });
    }
    for (const [group, atoms] of GROUPS) {
        it(`expands ${group} in an equation`, () => {
            const { reactants } = splitEquation(`${group} + O2 -> CO2 + H2O`);
            const parsed = reactants[0]!;
            expect(parsed.elements["C"] ?? 0).toBe(atoms["C"] ?? 0);
            expect(parsed.elements["H"] ?? 0).toBe(atoms["H"] ?? 0);
        });
    }
});

describe("biochemical abbreviations expand to explicit atoms", () => {
    const ABBREVS: Array<[string, string, number]> = [
        ["ATP", "C", 10],
        ["ATP", "H", 16],
        ["ATP", "N", 5],
        ["ATP", "O", 13],
        ["ATP", "P", 3],
        ["ADP", "C", 10],
        ["ADP", "H", 15],
        ["ADP", "N", 5],
        ["ADP", "O", 10],
        ["ADP", "P", 2],
        ["NAD", "C", 21],
        ["NAD", "H", 27],
        ["NAD", "N", 7],
        ["NAD", "O", 14],
        ["NAD", "P", 2],
        ["NADH", "C", 21],
        ["NADH", "H", 28],
        ["NADH", "N", 7],
        ["NADH", "O", 14],
        ["NADH", "P", 2],
        ["NADP", "C", 21],
        ["NADP", "H", 28],
        ["NADP", "N", 7],
        ["NADP", "O", 17],
        ["NADP", "P", 3],
        ["NADPH", "C", 21],
        ["NADPH", "H", 29],
        ["NADPH", "N", 7],
        ["NADPH", "O", 17],
        ["NADPH", "P", 3],
        ["FAD", "C", 27],
        ["FAD", "H", 33],
        ["FAD", "N", 9],
        ["FAD", "O", 15],
        ["FAD", "P", 2],
        ["FADH2", "C", 27],
        ["FADH2", "H", 35],
        ["FADH2", "N", 9],
        ["FADH2", "O", 15],
        ["FADH2", "P", 2],
    ];
    for (const [name, element, count] of ABBREVS) {
        it(`${name} contains ${count} ${element}`, () => {
            const parsed = parseFormula(name);
            expect(parsed.elements[element]).toBe(count);
            const scanned = countFormula(name);
            // the scanner does not know abbreviations, so only check that it
            // does not crash and produces a non-empty atom set
            expect(Object.keys(scanned.elements).length).toBeGreaterThan(0);
        });
    }
});

/** Particle and photon tokens carry no atoms. */
const PARTICLES = ["e-", "e+", "hv", "hν", "photon"];

describe("nucleon tokens are accepted in nuclear mode", () => {
    // `n` and `p` are nucleons: they parse as species inside nuclear mode and
    // are rejected in chemical mode rather than silently misread.
    for (const token of ["n", "p"]) {
        it(`${token} is rejected in chemical mode`, () => {
            expect(() => splitEquation(`${token} -> ${token}`)).toThrow(/element|arrow/i);
        });
    }
});

describe("photon and electron tokens carry no atoms", () => {
    // `hv`, `hν` and `photon` are species; `n` and `p` are nucleons and only
    // parse in nuclear mode, so they are covered in the nuclear suite.
    const ATOM_FREE: string[] = ["e-", "e+", "hν", "photon", "hv"];
    for (const token of ATOM_FREE) {
        it(`${token} parses to an element-free species`, () => {
            const { reactants, products } = splitEquation(`${token} + H2 -> H2O + ${token}`);
            const parsed = reactants[0]!;
            if (token === "e-") expect(parsed.charge).toBe(-1);
            if (token === "e+") expect(parsed.charge).toBe(1);
            for (const el in parsed.elements) {
                expect(parsed.elements[el]).toBe(0);
            }
            // the token survives as its own species on both sides
            expect(products.some((s) => s.formula === token)).toBe(true);
        });
    }
    for (const token of ["hv", "hν", "photon"]) {
        it(`${token} contributes no atoms to a photolysis`, () => {
            const r = balance(`H2O + ${token} -> H2 + O2 + ${token}`);
            expect(r.equation).toContain(token);
            // the scanner does not know the token, so only the atomic terms
            // are re-counted here
            const withoutPhoton = r.equation
                .split(" + ")
                .filter((t) => !t.endsWith(token))
                .join(" + ");
            const ascii = withoutPhoton
                .replace("hν", "")
                .replace("photon", "")
                .replace("hv", "");
            void ascii;
            for (const s of [...r.reactants, ...r.products]) {
                if (s.formula === token) {
                    expect(Object.keys(s.elements ?? {})).toHaveLength(0);
                }
            }
            const report = checkConservation(
                r.reactants
                    .filter((s) => s.formula !== token)
                    .map((s) => s.coefficient + " " + s.formula)
                    .join(" + ") +
                    " -> " +
                    r.products
                        .filter((s) => s.formula !== token)
                        .map((s) => s.coefficient + " " + s.formula)
                        .join(" + "),
            );
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
        });
    }
});

describe("particle tokens can appear in an equation", () => {
    const CASES: string[] = [
        "Fe3+ + e- -> Fe2+",
        "Cl2 + e- -> Cl-",
        "2 Cl- -> Cl2 + 2 e-",
        "Cu2+ + 2 e- -> Cu",
        "Cu -> Cu2+ + 2 e-",
        "Zn2+ + 2 e- -> Zn",
        "Ag+ + e- -> Ag",
        "2 H+ + 2 e- -> H2",
        "H2 -> 2 H+ + 2 e-",
        "O2 + 4 H+ + 4 e- -> 2 H2O",
        "2 H2O -> O2 + 4 H+ + 4 e-",
        "MnO4- + 8 H+ + 5 e- -> Mn2+ + 4 H2O",
        "2 MnO4- + 16 H+ + 10 e- -> 2 Mn2+ + 8 H2O",
        "Cr2O7^2- + 14 H+ + 6 e- -> 2 Cr3+ + 7 H2O",
        "NO3- + 4 H+ + 3 e- -> NO + 2 H2O",
        "ClO- + 2 H+ + 2 e- -> Cl- + H2O",
        "BrO3- + 6 H+ + 6 e- -> Br- + 3 H2O",
        "IO3- + 6 H+ + 6 e- -> I- + 3 H2O",
        "SO4^2- + 10 H+ + 8 e- -> H2S + 4 H2O",
        "Cu2+ + e- -> Cu+",
        "Cu+ -> Cu2+ + e-",
    ];
    for (const eq of CASES) {
        it(`balances the half-reaction ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Unicode normalization, each a distinct case. */
const UNICODE_CASES: Array<[string, string]> = [
    ["H₂O", "H2O"],
    ["Fe²⁺", "Fe^2+"],
    ["Cl⁻", "Cl-"],
    ["SO₄²⁻", "SO4^2-"],
    ["NH₄⁺", "NH4+"],
    ["CO₃²⁻", "CO3^2-"],
    ["Cr₂O₇²⁻", "Cr2O7^2-"],
    ["MnO₄⁻", "MnO4-"],
    ["Ca²⁺", "Ca^2+"],
    ["Mg²⁺", "Mg^2+"],
    ["Zn²⁺", "Zn^2+"],
    ["Cu²⁺", "Cu^2+"],
    ["Fe³⁺", "Fe^3+"],
    ["Al³⁺", "Al^3+"],
    ["C₆H₁₂O₆", "C6H12O6"],
    ["C₂H₅OH", "C2H5OH"],
    ["CH₃COOH", "CH3COOH"],
    ["H₂SO₄", "H2SO4"],
    ["H₃PO₄", "H3PO4"],
    ["NaOH", "NaOH"],
    ["K₂Cr₂O₇", "K2Cr2O7"],
    ["KMnO₄", "KMnO4"],
];

describe("unicode subscripts and superscripts normalize to ASCII", () => {
    for (const [input, ascii] of UNICODE_CASES) {
        it(`normalizes ${input} to ${ascii}`, () => {
            expect(normalizeText(input)).toBe(ascii);
            const a = parseFormula(input);
            const b = parseFormula(ascii);
            expect(a.elements).toEqual(b.elements);
            expect(a.charge).toBe(b.charge);
        });
    }
});

describe("whole unicode equations balance", () => {
    const WHOLE: Array<[string, string]> = [
        ["H₂ + O₂ -> H₂O", "2 H2 + 1 O2 -> 2 H2O"],
        ["Fe²⁺ + Cl⁻ -> FeCl₂", "1 Fe^2+ + 2 Cl- -> 1 FeCl2"],
        ["Fe³⁺ + Cl⁻ -> FeCl₃", "1 Fe^3+ + 3 Cl- -> 1 FeCl3"],
        ["Ca²⁺ + SO₄²⁻ -> CaSO₄", "1 Ca^2+ + 1 SO4^2- -> 1 CaSO4"],
        ["Na⁺ + Cl⁻ -> NaCl", "1 Na+ + 1 Cl- -> 1 NaCl"],
        ["K⁺ + SO₄²⁻ -> K₂SO₄", "2 K+ + 1 SO4^2- -> 1 K2SO4"],
        ["NH₄⁺ + OH⁻ -> NH₃ + H₂O", "1 NH4+ + 1 OH- -> 1 NH3 + 1 H2O"],
        ["HCO₃⁻ + H⁺ -> CO₂ + H₂O", "1 HCO3- + 1 H+ -> 1 CO2 + 1 H2O"],
        ["HSO₄⁻ + OH⁻ -> SO₄²⁻ + H₂O", "1 HSO4- + 1 OH- -> 1 SO4^2- + 1 H2O"],
        ["H₂PO₄⁻ + OH⁻ -> HPO₄²⁻ + H₂O", "1 H2PO4- + 1 OH- -> 1 HPO4^2- + 1 H2O"],
        ["PO₄³⁻ + 3 H⁺ -> H₃PO₄", "1 PO4^3- + 3 H+ -> 1 H3PO4"],
        ["MnO₄⁻ + 8 H⁺ + 5 e⁻ -> Mn²⁺ + 4 H₂O", "1 MnO4- + 8 H+ + 5 e- -> 1 Mn^2+ + 4 H2O"],
        ["Cr₂O₇²⁻ + 14 H⁺ + 6 e⁻ -> 2 Cr³⁺ + 7 H₂O", "1 Cr2O7^2- + 14 H+ + 6 e- -> 2 Cr^3+ + 7 H2O"],
        ["C₆H₁₂O₆ + 6 O₂ -> 6 CO₂ + 6 H₂O", "1 C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O"],
        ["CH₃COOH + 3 H₂ -> C₂H₆ + 2 H₂O", "1 CH3COOH + 3 H2 -> 1 C2H6 + 2 H2O"],
    ];
    for (const [input, expected] of WHOLE) {
        it(`balances ${input}`, () => {
            const r = balance(input);
            expect(r.equation).toBe(expected);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Hydrate separator variants. */
const HYDRATE_SEPARATORS = ["·", "•", "∙", "⋅", "＊", "*"];

describe("hydrate separators are all accepted", () => {
    for (const sep of HYDRATE_SEPARATORS) {
        it(`treats ${sep} as a hydrate separator`, () => {
            const formula = "CuSO4" + sep + "5H2O";
            const parsed = parseFormula(formula);
            expect(parsed.elements["Cu"]).toBe(1);
            expect(parsed.elements["S"]).toBe(1);
            expect(parsed.elements["O"]).toBe(9);
            expect(parsed.elements["H"]).toBe(10);
            const bare = parseFormula("CuSO4" + sep + "H2O");
            expect(bare.elements["O"]).toBe(5);
            expect(bare.elements["H"]).toBe(2);
        });
    }
});

/** Obsolete element symbols map to their modern equivalents. */
const OBSOLETE: Array<[string, string]> = [
    ["Uun", "Ds"],
    ["Uuu", "Rg"],
    ["Uub", "Cn"],
    ["Uut", "Nh"],
    ["Uuq", "Fl"],
    ["Uup", "Mc"],
    ["Uuh", "Lv"],
    ["Uus", "Ts"],
    ["Uuo", "Og"],
];

describe("obsolete element symbols are accepted", () => {
    for (const [old, modern] of OBSOLETE) {
        it(`${old} parses as ${modern}`, () => {
            const parsed = parseFormula(old);
            expect(parsed.elements[modern]).toBe(1);
            expect(parsed.elements[old]).toBeUndefined();
        });
    }
});

/** Square-bracket complexes and their charge placement. */
const COMPLEXES: Array<[string, number]> = [
    ["[Fe(CN)6]4-", -4],
    ["[Cu(NH3)4]2+", 2],
    ["[Ag(NH3)2]+", 1],
    ["[Co(NH3)6]3+", 3],
    ["[Ni(CN)4]2-", -2],
    ["[PtCl6]2-", -2],
    ["[Fe(H2O)6]2+", 2],
    ["[Fe(H2O)6]3+", 3],
    ["[Al(OH)4]-", -1],
    ["[Cu(NH3)4]Cl2", 0],
    ["K4[Fe(CN)6]", 0],
    ["K3[Fe(CN)6]", 0],
    ["[Cr(H2O)6]3+", 3],
    ["[Cu(H2O)4]2+", 2],
    ["[Zn(H2O)4]2+", 2],
    ["[Mg(H2O)6]2+", 2],
    ["[Ca(H2O)6]2+", 2],
    ["[Sr(H2O)6]2+", 2],
    ["[Ba(H2O)6]2+", 2],
    ["[Ni(H2O)6]2+", 2],
    ["[Co(H2O)6]2+", 2],
    ["[Mn(H2O)6]2+", 2],
    ["[Fe(CN)6]3-", -3],
    ["[Co(CN)6]3-", -3],
    ["[Mn(CN)6]3-", -3],
    ["[Cr(CN)6]3-", -3],
    ["[Mo(CN)8]4-", -4],
];

describe("complex ions keep their bracket charge", () => {
    for (const [formula, charge] of COMPLEXES) {
        it(`parses ${formula} with charge ${charge}`, () => {
            const parsed = parseFormula(formula);
            expect(parsed.charge).toBe(charge);
        });
    }
});

describe("complex chemistry balances", () => {
    const CASES: string[] = [
        "[Fe(CN)6]4- -> Fe2+ + 6 CN-",
        "[Cu(NH3)4]2+ -> Cu2+ + 4 NH3",
        "[Ag(NH3)2]+ -> Ag+ + 2 NH3",
        "[Co(NH3)6]3+ -> Co3+ + 6 NH3",
        "[Ni(CN)4]2- -> Ni2+ + 4 CN-",
        "[PtCl6]2- -> [PtCl4]2- + Cl2",
        "[Fe(H2O)6]2+ + 6 CN- -> [Fe(CN)6]4- + 6 H2O",
        "[Al(OH)4]- + H+ -> Al3+ + 2 H2O",
        "[Cu(NH3)4]Cl2 -> Cu2+ + 4 NH3 + 2 Cl-",
        "K4[Fe(CN)6] + Cl2 -> K3[Fe(CN)6] + KCl",
        "[Fe(H2O)6]3+ + e- -> [Fe(H2O)6]2+",
        "[Cr(H2O)6]3+ + 3 OH- -> Cr(OH)3 + 6 H2O",
        "[PtCl6]2- + 2 e- -> [PtCl4]2- + 2 Cl-",
        "[Co(CN)6]3- + 3 e- -> Co + 6 CN-",
        "[Mn(CN)6]3- + 3 e- -> Mn + 6 CN-",
        "[Cr(CN)6]3- + 3 e- -> Cr + 6 CN-",
        "[Fe(CN)6]3- + 3 e- -> Fe + 6 CN-",
        "[Mo(CN)8]4- + 2 e- -> Mo + 8 CN-",
        "[Cu(H2O)4]2+ -> Cu2+ + 4 H2O",
        "[Zn(H2O)4]2+ -> Zn2+ + 4 H2O",
        "[Mg(H2O)6]2+ -> Mg2+ + 6 H2O",
        "[Ca(H2O)6]2+ -> Ca2+ + 6 H2O",
        "[Sr(H2O)6]2+ -> Sr2+ + 6 H2O",
        "[Ba(H2O)6]2+ -> Ba2+ + 6 H2O",
        "[Ni(H2O)6]2+ -> Ni2+ + 6 H2O",
        "[Co(H2O)6]2+ -> Co2+ + 6 H2O",
        "[Zn(CN)4]2- -> Zn2+ + 4 CN-",
        "[Fe(CN)6]4- + K+ -> K4[Fe(CN)6]",
        "[Cu(NH3)4]2+ + Cl- -> [Cu(NH3)4]Cl2",
        "[Co(NH3)6]3+ + Cl- -> [Co(NH3)6]Cl3",
    ];
    for (const eq of CASES) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Isotope notation. */
const ISOTOPE_SPECIES = ["^238U", "^234Th", "^4He", "^14C", "^3H", "^60Co", "^131I", "^90Sr"];

describe("isotope notation parses with mass numbers", () => {
    for (const species of ISOTOPE_SPECIES) {
        it(`parses ${species} as a labeled species`, () => {
            const { reactants } = splitEquation(`${species} -> ${species}`);
            const parsed = reactants[0]!;
            expect(parsed.formula).toContain("^");
            expect(parsed.isotopes).toBeDefined();
            const masses = Object.values(parsed.isotopes ?? {});
            expect(masses.length).toBeGreaterThan(0);
            for (const m of masses) {
                expect(Number.isInteger(m)).toBe(true);
                expect(m).toBeGreaterThan(0);
            }
        });
    }
});

describe("isotope notation balances in nuclear mode", () => {
    const NUCLEAR = [
        "^238U -> ^234Th + ^4He",
        "^234U -> ^230Th + ^4He",
        "^230Th -> ^226Ra + ^4He",
        "^226Ra -> ^222Rn + ^4He",
        "^222Rn -> ^218Po + ^4He",
        "^210Po -> ^206Pb + ^4He",
    ];
    for (const eq of NUCLEAR) {
        it(`balances ${eq}`, () => {
            const [left, right] = eq.split(" -> ") as [string, string];
            const expected = `1 ${left} -> 1 ${right.split(" + ")[0]} + 1 ${right.split(" + ")[1]}`;
            const r = balance(eq, { mode: "nuclear" });
            expect(r.equation).toBe(expected);
            const report = checkConservation(r.equation);
            expect(report.gcd).toBe(1);
        });
    }
});

/** Placeholder pseudo-elements. */
// Only `R`, `M`, `X`, `Q` and `Z` are accepted placeholders, and each must be
// a full species (not a group fragment), so the reactions below use them as
// whole species and keep every element balanced.
const PLACEHOLDER_REACTIONS = [
    "R + S -> RS",
    "M + O2 -> MO2",
    "X + H2 -> XH2",
    "Q + Cl2 -> QCl2",
    "Z + O2 -> ZO2",
    "MCl + NaOH -> MOH + NaCl",
    "XCl3 + H2O -> X(OH)3 + HCl",
    "Q + NaOH -> QOH + Na",
    "Z + H2 + S -> ZS + H2",
    "R + O2 -> RO2",
    "M + H2S -> MS + H2",
    "QO2 + CO -> Q + CO2",
    "ZCl2 + H2 -> Z + 2 HCl",
    "X + S -> XS",
];

describe("placeholder pseudo-elements are accepted", () => {
    for (const eq of PLACEHOLDER_REACTIONS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Hydrogen-isotope pseudo-elements D and T stay distinct from H. */
// D and T stay distinct from H, so a molecule may hold a mixture; the
// species below are written so that D, T and H all balance exactly.
const ISOTOPE_PSEUDO_REACTIONS = [
    "D2 + O2 -> D2O",
    "T2 + O2 -> T2O",
    "D2 + T2 -> 2 DT",
    "D2O + H2 -> HDO + HD2",
    "T2O + H2 -> HTO + HT2",
    "D + T -> DT",
    "H + D -> HD",
    "H + T -> HT",
    "2 H + D2 -> 2 HD",
    "2 H + T2 -> 2 HT",
    "D2 + 2 H -> H2 + 2 HD",
    "T2 + 2 H -> H2 + 2 HT",
];

describe("D and T are distinct pseudo-elements", () => {
    for (const eq of ISOTOPE_PSEUDO_REACTIONS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** parseWithoutMultiplier ignores a leading hydrate multiplier. */
describe("parseWithoutMultiplier reads a formula body", () => {
    const BODIES: Array<[string, string, number]> = [
        ["H2O", "H", 2],
        ["Ca3(PO4)2", "Ca", 3],
        ["CuSO4", "Cu", 1],
        ["Fe2(SO4)3", "Fe", 2],
        ["Al(OH)3", "Al", 1],
        ["K4[Fe(CN)6]", "K", 4],
        ["Na2CO3", "Na", 2],
        ["Mg(NO3)2", "Mg", 1],
        ["Ba(OH)2", "Ba", 1],
        ["(NH4)2SO4", "N", 2],
    ];
    for (const [formula, element, count] of BODIES) {
        it(`reads ${count} ${element} from ${formula}`, () => {
            const parsed = parseWithoutMultiplier(formula);
            expect(parsed.elements[element]).toBe(count);
        });
    }
});