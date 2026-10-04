import { describe, expect, it } from "vitest";
import { balance } from "../index";
import { checkConservation } from "./support/independent";

/**
 * Oxidation-state ladders: every metal from the fixed table paired with every
 * oxidation state it can reach. Each pair is a distinct half-reaction.
 */

const METALS = [
    "Li",
    "Na",
    "K",
    "Rb",
    "Cs",
    "Be",
    "Mg",
    "Ca",
    "Sr",
    "Ba",
    "Sc",
    "Ti",
    "V",
    "Cr",
    "Mn",
    "Fe",
    "Co",
    "Ni",
    "Cu",
    "Zn",
    "Y",
    "Zr",
    "Nb",
    "Mo",
    "Tc",
    "Ru",
    "Rh",
    "Pd",
    "Ag",
    "Cd",
    "Hf",
    "Ta",
    "W",
    "Re",
    "Os",
    "Ir",
    "Pt",
    "Au",
    "Hg",
    "Al",
    "Ga",
    "In",
    "Tl",
    "Sn",
    "Pb",
    "Bi",
    "Ce",
    "Gd",
    "Tb",
    "Dy",
    "Ho",
    "Er",
    "Tm",
    "Yb",
    "Lu",
    "La",
    "Pr",
    "Nd",
    "Sm",
    "Eu",
    "Ac",
    "Th",
    "Pa",
    "U",
    "Np",
    "Pu",
];

/**
 * Charge spellings the parser accepts, one per oxidation state. Each is
 * appended to the metal symbol, so `Fe3+` and `Fe^5+` both appear.
 */
const CHARGE_SPELLINGS: string[] = ["+", "2+", "3+", "^4+", "^5+", "^6+", "^7+"];

describe("oxidation ladder: metal oxidised to each ion", () => {
    for (const metal of METALS) {
        for (const suffix of CHARGE_SPELLINGS) {
            const ion = metal + suffix;
            it(`${metal} -> ${ion} + e-`, () => {
                const r = balance(`${metal} -> ${ion} + e-`);
                const report = checkConservation(r.equation);
                expect(report.charge).toBe(0);
                expect(report.gcd).toBe(1);
                for (const el in report.net) expect(report.net[el]).toBe(0);
            });
        }
    }
});

describe("oxidation ladder: each ion reduced to the metal", () => {
    for (const metal of METALS) {
        for (const suffix of CHARGE_SPELLINGS) {
            const ion = metal + suffix;
            it(`${ion} + e- -> ${metal}`, () => {
                const r = balance(`${ion} + e- -> ${metal}`);
                const report = checkConservation(r.equation);
                expect(report.charge).toBe(0);
                expect(report.gcd).toBe(1);
                for (const el in report.net) expect(report.net[el]).toBe(0);
            });
        }
    }
});

/**
 * Non-metal oxidation ladders, written as acidic half-reactions with the
 * water / proton / electron counts derived by hand for each step.
 */
const NON_METAL_LADDER: string[] = [
    "NO + H2O -> NO2 + 2 H+ + 2 e-",
    "NO + H2O -> N2O3 + 2 H+ + 2 e-",
    "NO2 + H2O -> HNO3 + H+ + e-",
    "N2O3 + H2O -> 2 HNO2",
    "N2O5 + H2O -> 2 HNO3",
    "SO + H2O -> SO2 + 2 H+ + 2 e-",
    "S2O3 + H2O -> 2 SO2 + 2 H+ + 4 e-",
    "SO2 + H2O -> SO3 + 2 H+ + 2 e-",
    "H2SO3 -> SO2 + H2O",
    "H2S + 2 H2O -> SO4^2- + 10 H+ + 8 e-",
    "H3PO2 + H2O -> H3PO3 + 2 H+ + 2 e-",
    "H3PO3 + H2O -> H3PO4 + 2 H+ + 2 e-",
    "P2O4 + H2O -> P2O5 + 2 H+ + 2 e-",
    "CO + H2O -> CO2 + 2 H+ + 2 e-",
    "C2O3 + H2O -> 2 CO2 + 2 H+ + 2 e-",
    "SiO + H2O -> SiO2 + 2 H+ + 2 e-",
    "SiO2 + H2O -> SiO3 + 2 H+ + 2 e-",
    "H3BO2 + H2O -> H3BO3 + 2 H+ + 2 e-",
    "HClO + H2O -> HClO2 + 2 H+ + 2 e-",
    "HClO2 -> ClO2 + H+ + e-",
    "ClO2 + H2O -> HClO3 + H+ + e-",
    "ClO3 + H2O -> HClO4 + H+ + e-",
    "HBrO + H2O -> HBrO2 + 2 H+ + 2 e-",
    "HBrO2 -> BrO2 + H+ + e-",
    "BrO2 + H2O -> HBrO3 + H+ + e-",
    "BrO3 + H2O -> HBrO4 + H+ + e-",
    "HIO + H2O -> HIO2 + 2 H+ + 2 e-",
    "HIO2 -> IO2 + H+ + e-",
    "IO2 + H2O -> HIO3 + H+ + e-",
    "IO3 + H2O -> HIO4 + H+ + e-",
    "SeO + H2O -> SeO2 + 2 H+ + 2 e-",
    "SeO2 + H2O -> SeO3 + 2 H+ + 2 e-",
    "TeO + H2O -> TeO2 + 2 H+ + 2 e-",
    "TeO2 + H2O -> TeO3 + 2 H+ + 2 e-",
    "AsH3 + 4 H2O -> H3AsO4 + 8 H+ + 8 e-",
    "As2O3 + 5 H2O -> 2 H3AsO4 + 4 H+ + 4 e-",
    "SbH3 + 4 H2O -> H3SbO4 + 8 H+ + 8 e-",
    "Sb2O3 + 5 H2O -> 2 H3SbO4 + 4 H+ + 4 e-",
];

describe("non-metal ladder: acidic half-reactions between oxidation states", () => {
    for (const eq of NON_METAL_LADDER) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

describe("non-metal ladder: the same steps written in reverse", () => {
    const REVERSED: string[] = [
        "NO2 + 2 H+ + 2 e- -> NO + H2O",
        "N2O3 + 2 H+ + 2 e- -> 2 NO + H2O",
        "HNO3 + H+ + e- -> NO2 + H2O",
        "2 HNO2 -> N2O3 + H2O",
        "SO2 + 2 H+ + 2 e- -> SO + H2O",
        "2 SO2 + 2 H+ + 4 e- -> S2O3 + H2O",
        "SO3 + 2 H+ + 2 e- -> SO2 + H2O",
        "H3PO3 + 2 H+ + 2 e- -> H3PO2 + H2O",
        "H3PO4 + 2 H+ + 2 e- -> H3PO3 + H2O",
        "P2O5 + 2 H+ + 2 e- -> P2O4 + H2O",
        "CO2 + 2 H+ + 2 e- -> CO + H2O",
        "SiO2 + 2 H+ + 2 e- -> SiO + H2O",
        "SiO3 + 2 H+ + 2 e- -> SiO2 + H2O",
        "H3BO3 + 2 H+ + 2 e- -> H3BO2 + H2O",
        "ClO2 + H+ + e- -> HClO2",
        "HClO3 + H+ + e- -> ClO2 + H2O",
        "BrO2 + H+ + e- -> HBrO2",
        "HBrO3 + H+ + e- -> BrO2 + H2O",
        "IO2 + H+ + e- -> HIO2",
        "HIO3 + H+ + e- -> IO2 + H2O",
        "SeO2 + 2 H+ + 2 e- -> SeO + H2O",
        "SeO3 + 2 H+ + 2 e- -> SeO2 + H2O",
        "TeO2 + 2 H+ + 2 e- -> TeO + H2O",
        "TeO3 + 2 H+ + 2 e- -> TeO2 + H2O",
        "H3AsO4 + 8 H+ + 8 e- -> AsH3 + 4 H2O",
        "2 H3AsO4 + 4 H+ + 4 e- -> As2O3 + 5 H2O",
        "H3SbO4 + 8 H+ + 8 e- -> SbH3 + 4 H2O",
        "2 H3SbO4 + 4 H+ + 4 e- -> Sb2O3 + 5 H2O",
        "SO4^2- + 10 H+ + 8 e- -> H2S + 2 H2O",
    ];
    for (const eq of REVERSED) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Metallic oxides in every accessible oxidation state. */
const METAL_OXIDES: Array<[string, string]> = [
    ["Sc", "Sc2O3"],
    ["Ti", "TiO"],
    ["Ti", "Ti2O3"],
    ["Ti", "TiO2"],
    ["Ti", "Ti2O5"],
    ["V", "VO"],
    ["V", "V2O3"],
    ["V", "VO2"],
    ["V", "V2O5"],
    ["Cr", "CrO"],
    ["Cr", "Cr2O3"],
    ["Cr", "CrO2"],
    ["Cr", "CrO3"],
    ["Cr", "Cr2O7"],
    ["Mn", "MnO"],
    ["Mn", "Mn2O3"],
    ["Mn", "MnO2"],
    ["Mn", "Mn2O7"],
    ["Fe", "FeO"],
    ["Fe", "Fe2O3"],
    ["Fe", "Fe3O4"],
    ["Co", "CoO"],
    ["Co", "Co2O3"],
    ["Co", "Co3O4"],
    ["Ni", "NiO"],
    ["Ni", "Ni2O3"],
    ["Cu", "CuO"],
    ["Cu", "Cu2O"],
    ["Zn", "ZnO"],
    ["Ag", "AgO"],
    ["Ag", "Ag2O"],
    ["Cd", "CdO"],
    ["Cd", "Cd2O3"],
    ["Hg", "HgO"],
    ["Hg", "Hg2O"],
    ["Sn", "SnO"],
    ["Sn", "SnO2"],
    ["Pb", "PbO"],
    ["Pb", "PbO2"],
    ["Pb", "Pb3O4"],
    ["Bi", "Bi2O3"],
    ["Bi", "Bi2O5"],
    ["Sb", "Sb2O3"],
    ["Sb", "Sb2O5"],
    ["As", "As2O3"],
    ["As", "As2O5"],
    ["Al", "Al2O3"],
    ["Ga", "Ga2O3"],
    ["In", "In2O3"],
    ["Tl", "Tl2O"],
    ["Tl", "Tl2O3"],
    ["La", "La2O3"],
    ["Ce", "CeO2"],
    ["Ce", "Ce2O3"],
    ["Pr", "Pr2O3"],
    ["Pr", "Pr6O11"],
    ["Nd", "Nd2O3"],
    ["Sm", "Sm2O3"],
    ["Eu", "Eu2O3"],
    ["Eu", "EuO"],
    ["Gd", "Gd2O3"],
    ["Tb", "Tb2O3"],
    ["Tb", "Tb4O7"],
    ["Dy", "Dy2O3"],
    ["Ho", "Ho2O3"],
    ["Er", "Er2O3"],
    ["Tm", "Tm2O3"],
    ["Yb", "Yb2O3"],
    ["Lu", "Lu2O3"],
    ["Th", "ThO2"],
    ["Pa", "Pa2O5"],
    ["U", "UO2"],
    ["U", "U3O8"],
    ["Np", "NpO2"],
    ["Pu", "PuO2"],
    ["Pu", "Pu2O3"],
];

describe("metal oxide ladder: formation from the metal and oxygen", () => {
    for (const [metal, oxide] of METAL_OXIDES) {
        it(`${metal} + O2 -> ${oxide}`, () => {
            const r = balance(`${metal} + O2 -> ${oxide}`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

describe("metal oxide ladder: reduction by hydrogen", () => {
    for (const [metal, oxide] of METAL_OXIDES) {
        it(`${oxide} + H2 -> ${metal} + H2O`, () => {
            const r = balance(`${oxide} + H2 -> ${metal} + H2O`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

describe("metal oxide ladder: reduction by carbon monoxide", () => {
    for (const [metal, oxide] of METAL_OXIDES) {
        it(`${oxide} + CO -> ${metal} + CO2`, () => {
            const r = balance(`${oxide} + CO -> ${metal} + CO2`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Halides of every metal, at several halogens. */
const METAL_HALIDE_FORMULAS: Array<[string, string]> = [
    ["Al", "AlCl3"],
    ["Fe", "FeCl2"],
    ["Fe", "FeCl3"],
    ["Cu", "CuCl"],
    ["Cu", "CuCl2"],
    ["Zn", "ZnCl2"],
    ["Cd", "CdCl2"],
    ["Hg", "HgCl2"],
    ["Ag", "AgCl"],
    ["Pb", "PbCl2"],
    ["Sn", "SnCl2"],
    ["Sn", "SnCl4"],
    ["Al", "AlF3"],
    ["Ca", "CaF2"],
    ["Na", "NaF"],
    ["K", "KF"],
    ["Mg", "MgF2"],
    ["Al", "AlBr3"],
    ["Fe", "FeBr2"],
    ["Fe", "FeBr3"],
    ["Ag", "AgBr"],
    ["Cu", "CuBr"],
    ["Cu", "CuBr2"],
    ["Al", "AlI3"],
    ["Ag", "AgI"],
    ["Hg", "HgI2"],
    ["Pb", "PbI2"],
    ["Cd", "CdI2"],
    ["K", "KCl"],
    ["Na", "NaCl"],
    ["Li", "LiCl"],
    ["Rb", "RbCl"],
    ["Cs", "CsCl"],
    ["Ca", "CaCl2"],
    ["Sr", "SrCl2"],
    ["Ba", "BaCl2"],
    ["Mn", "MnCl2"],
    ["Co", "CoCl2"],
];

describe("metal halide ladder: formation from metal plus halogen", () => {
    for (const [metal, halide] of METAL_HALIDE_FORMULAS) {
        const halogen = halide.replace(metal, "");
        it(`${metal} + ${halogen} -> ${halide}`, () => {
            const r = balance(`${metal} + ${halogen} -> ${halide}`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});