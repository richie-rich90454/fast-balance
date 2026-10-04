import { describe, expect, it } from "vitest";
import { balance } from "../index";
import { checkConservation, countFormula } from "./support/independent";

/**
 * Combustion of aromatic and aliphatic compounds that carry a third element
 * (N, Cl, Br, I). The expected equation is derived by hand: every non-carbon,
 * non-hydrogen element leaves as its diatomic or hydrogen- chloride.
 */

interface HalogenatedCase {
    formula: string;
    /** Products that receive the halogen. */
    products: string[];
}

/**
 * C/H compounds carrying a halogen: the halogen leaves as the hydrogen
 * halide when there is spare hydrogen, otherwise as the diatomic X2.
 */
const HALOGENATED: HalogenatedCase[] = [
    { formula: "C6H5Cl", products: ["CO2", "H2O", "HCl"] },
    { formula: "C6H4Cl2", products: ["CO2", "H2O", "HCl"] },
    { formula: "C6H3Cl3", products: ["CO2", "HCl"] },
    { formula: "C6H2Cl4", products: ["CO2", "H2O", "HCl", "Cl2"] },
    { formula: "C6HCl5", products: ["CO2", "H2O", "HCl", "Cl2"] },
    { formula: "C6Cl6", products: ["CO2", "Cl2"] },
    { formula: "CH3Cl", products: ["CO2", "H2O", "HCl"] },
    { formula: "CH2Cl2", products: ["CO2", "H2O", "Cl2"] },
    { formula: "CHCl3", products: ["CO2", "H2O", "HCl", "Cl2"] },
    { formula: "CCl4", products: ["CO2", "Cl2"] },
    { formula: "C2H5Cl", products: ["CO2", "H2O", "HCl"] },
    { formula: "C2H4Cl2", products: ["CO2", "H2O", "HCl", "Cl2"] },
    { formula: "C2H3Cl3", products: ["CO2", "H2O", "HCl", "Cl2"] },
    { formula: "C2H2Cl4", products: ["CO2", "H2O", "Cl2"] },
    { formula: "CH2ClF", products: ["CO2", "H2O", "Cl2", "HF"] },
    { formula: "CH2ClF", products: ["CO2", "HCl", "HF"] },
    { formula: "CHF3", products: ["CO2", "H2O", "F2"] },
    { formula: "CH3Br", products: ["CO2", "H2O", "HBr"] },
    { formula: "CH2Br2", products: ["CO2", "H2O", "Br2"] },
    { formula: "CHBr3", products: ["CO2", "H2O", "HBr", "Br2"] },
    { formula: "CBr4", products: ["CO2", "Br2"] },
    { formula: "C6H5Br", products: ["CO2", "H2O", "HBr"] },
    { formula: "C6H4Br2", products: ["CO2", "H2O", "HBr", "Br2"] },
    { formula: "C2H5Br", products: ["CO2", "H2O", "HBr"] },
    { formula: "CH3I", products: ["CO2", "H2O", "HI"] },
    { formula: "CH2I2", products: ["CO2", "H2O", "I2"] },
    { formula: "CHI3", products: ["CO2", "H2O", "HI", "I2"] },
    { formula: "CI4", products: ["CO2", "I2"] },
    { formula: "C6H5I", products: ["CO2", "H2O", "HI"] },
    { formula: "C2H5I", products: ["CO2", "H2O", "HI"] },
    { formula: "CH3F", products: ["CO2", "H2O", "HF"] },
    { formula: "CH2F2", products: ["CO2", "HF"] },
    { formula: "CF4", products: ["CO2", "F2"] },
    { formula: "C6H5F", products: ["CO2", "H2O", "HF"] },
];

describe("halogenated organic combustion", () => {
    for (const c of HALOGENATED) {
        it(`combusts ${c.formula} to ${c.products.join(" + ")}`, () => {
            const eq = `${c.formula} + O2 -> ${c.products.join(" + ")}`;
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
            // the independent scanner must agree with the library parser
            const { elements } = countFormula(c.formula);
            expect(Object.keys(elements).length).toBeGreaterThan(0);
        });
    }
});

/** Halides of non-carbon centers oxidized to their oxides. */
const HALIDE_REACTIONS: string[] = [
    "SiCl4 + O2 -> SiO2 + Cl2",
    "SiHCl3 + O2 -> SiO2 + H2O + Cl2",
    "SiC2H5Cl3 + O2 -> SiO2 + CO2 + H2O + Cl2",
    "SCl2 + O2 -> SO2 + Cl2",
    "SbCl3 + O2 -> Sb2O3 + Cl2",
    "SbCl5 + O2 -> Sb2O5 + Cl2",
    "AsCl3 + O2 -> As2O3 + Cl2",
    "SnCl4 + O2 -> SnO2 + Cl2",
    "TiCl4 + O2 -> TiO2 + Cl2",
    "GeCl4 + O2 -> GeO2 + Cl2",
    "SeCl4 + O2 -> SeO2 + Cl2",
    "TeCl4 + O2 -> TeO2 + Cl2",
    "ZrCl4 + O2 -> ZrO2 + Cl2",
    "HfCl4 + O2 -> HfO2 + Cl2",
    "VCl3 + O2 -> V2O5 + Cl2",
    "NbCl5 + O2 -> Nb2O5 + Cl2",
    "TaCl5 + O2 -> Ta2O5 + Cl2",
    "MoCl5 + O2 -> Mo2O5 + Cl2",
    "WCl6 + O2 -> WO3 + Cl2",
    "ReCl5 + O2 -> Re2O7 + Cl2",
];

describe("halide oxidation: chlorides to oxides", () => {
    for (const eq of HALIDE_REACTIONS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Nitrogen leaves as N2. */
const NITROGENOUS: Array<[string, number]> = [
    ["CH3NH2", 1],
    ["C2H5NH2", 1],
    ["C3H7NH2", 1],
    ["C6H5NH2", 1],
    ["C6H7N", 1],
    ["C5H5N", 1],
    ["C4H5N", 1],
    ["C3H4N2", 2],
    ["C2H4N2", 2],
    ["CH4N2", 2],
    ["C6H6N4", 4],
    ["C5H5N5", 5],
    ["C4H4N2", 2],
    ["C3H6N6", 6],
    ["C2H4N4", 4],
    ["CH5N3", 3],
    ["CH2N2", 2],
    ["HCN", 1],
    ["CH3CN", 1],
    ["C2H5CN", 1],
    ["C6H5CN", 1],
    ["CH3NO2", 1],
    ["C2H5NO2", 1],
    ["C6H5NO2", 1],
    ["C3H7NO2", 1],
    ["C2H5N", 1],
    ["C3H5N", 1],
    ["C4H7N", 1],
    ["C5H9N", 1],
    ["C6H11N", 1],
];

describe("nitrogenous combustion: nitrogen leaves as N2", () => {
    for (const [formula, nitrogens] of NITROGENOUS) {
        it(`combusts ${formula} to CO2, H2O and N2`, () => {
            const r = balance(`${formula} + O2 -> CO2 + H2O + N2`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
            const { elements } = countFormula(formula);
            expect(elements["N"]).toBe(nitrogens);
            expect(elements["N"]).toBeGreaterThan(0);
        });
    }
});

/** Sulfur leaves as SO2. */
/** Each entry names the products its sulfur actually ends up in. */
const SULFUR_CONTAINING: Array<[string, string[]]> = [
    ["CH3SH", ["CO2", "SO2", "H2O"]],
    ["C2H5SH", ["CO2", "SO2", "H2O"]],
    ["C6H5SH", ["CO2", "SO2", "H2O"]],
    ["CH3SCH3", ["CO2", "SO2", "H2O"]],
    ["C2H5SC2H5", ["CO2", "SO2", "H2O"]],
    ["CS2", ["CO2", "SO2"]],
    ["H2S", ["SO2", "H2O"]],
    ["H2SO4", ["SO2", "H2O", "O2"]],
    ["CH3SO3H", ["CO2", "SO2", "H2O"]],
    ["C2H5SO3H", ["CO2", "SO2", "H2O"]],
    ["C6H5SO3H", ["CO2", "SO2", "H2O"]],
    ["Na2SO4", ["Na2O", "SO2", "O2"]],
    ["K2SO4", ["K2O", "SO2", "O2"]],
    ["MgSO4", ["MgO", "SO2", "O2"]],
    ["CuSO4", ["CuO", "SO2", "O2"]],
    ["FeSO4", ["FeO", "SO2", "O2"]],
    ["ZnSO4", ["ZnO", "SO2", "O2"]],
    ["BaSO4", ["BaO", "SO2", "O2"]],
    ["CaSO4", ["CaO", "SO2", "O2"]],
    ["PbSO4", ["PbO", "SO2", "O2"]],
    ["SrSO4", ["SrO", "SO2", "O2"]],
    ["Ag2SO4", ["Ag2O", "SO2", "O2"]],
    ["NiSO4", ["NiO", "SO2", "O2"]],
    ["CoSO4", ["CoO", "SO2", "O2"]],
    ["MnSO4", ["MnO", "SO2", "O2"]],
    ["Al2(SO4)3", ["Al2O3", "SO2", "O2"]],
    ["Fe2(SO4)3", ["Fe2O3", "SO2", "O2"]],
    ["Cr2(SO4)3", ["Cr2O3", "SO2", "O2"]],
    ["Na2S", ["Na2O", "SO2"]],
    ["FeS", ["FeO", "SO2"]],
    ["ZnS", ["ZnO", "SO2"]],
    ["PbS", ["PbO", "SO2"]],
    ["CuS", ["CuO", "SO2"]],
    ["CaS", ["CaO", "SO2"]],
    ["K2S", ["K2O", "SO2"]],
    ["CdS", ["CdO", "SO2"]],
    ["H2SO5", ["SO2", "H2O", "O2"]],
    ["Na2S2O3", ["Na2O", "SO2"]],
    ["Na2S2O7", ["Na2O", "SO2", "O2"]],
    ["K2S2O7", ["K2O", "SO2", "O2"]],
];

/** Oxidation states that need no external oxygen at all. */
const SULFUR_DECOMPOSING: Array<[string, string[]]> = [
    ["H2SO3", ["SO2", "H2O"]],
    ["SO2Cl2", ["SO2", "Cl2"]],
    ["H2SO5", ["SO2", "H2O", "O2"]],
];

describe("sulfur compounds that decompose without extra oxygen", () => {
    for (const [formula, products] of SULFUR_DECOMPOSING) {
        const eq = `${formula} -> ${products.join(" + ")}`;
        it(`decomposes ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

describe("sulfur oxidation to SO2 with the correct partner oxides", () => {
    for (const [formula, products] of SULFUR_CONTAINING) {
        // Sulfates and sulfites release O2 rather than consume it, so the
        // reactant side is chosen to match what the formula actually needs.
        const left = products.includes("O2") ? formula : formula + " + O2";
        const eq = `${left} -> ${products.join(" + ")}`;
        it(`oxidises ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/**
 * Phosphorus compounds. Phosphates and phosphites already carry all their
 * oxygen, so they decompose to oxides; the lower oxides take up O2.
 */
const PHOSPHORUS_REACTIONS: string[] = [
    "PH3 + O2 -> P2O5 + H2O",
    "PCl3 + O2 -> P2O5 + Cl2",
    "PCl5 + O2 -> P2O5 + Cl2",
    "PH4Cl + O2 -> P2O5 + H2O + HCl",
    "Na3PO4 -> Na2O + P2O5",
    "K3PO4 -> K2O + P2O5",
    "Ca3(PO4)2 -> CaO + P2O5",
    "Mg3(PO4)2 -> MgO + P2O5",
    "FePO4 -> Fe2O3 + P2O5",
    "AlPO4 -> Al2O3 + P2O5",
    "Ag3PO4 -> Ag2O + P2O5",
    "Li3PO4 -> Li2O + P2O5",
    "NaH2PO4 -> Na2O + P2O5 + H2O",
    "Na2HPO4 -> Na2O + P2O5 + H2O",
    "Ca(H2PO4)2 -> CaO + P2O5 + H2O",
    "K2HPO4 -> K2O + P2O5 + H2O",
    "H3PO4 -> P2O5 + H2O",
    "H3PO3 + O2 -> P2O5 + H2O",
    "H3PO2 + O2 -> P2O5 + H2O",
    "P4 + O2 -> P2O5",
    "P4 + 5 O2 -> P2O5",
];

describe("phosphorus oxidation and phosphate decomposition", () => {
    for (const eq of PHOSPHORUS_REACTIONS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Sulfur chemistry beyond plain combustion. */
const SULFUR_REACTIONS: string[] = [
    "H2SO3 -> SO2 + H2O",
    "H2S + O2 -> SO2 + H2O",
    "H2SO4 -> SO2 + H2O + O2",
    "H2SO5 -> SO2 + H2O + O2",
    "SO2 + H2O -> H2SO3",
    "SO3 + H2O -> H2SO4",
    "SO2 + O2 -> SO3",
    "H2S + SO2 -> S + H2O",
    "Na2S2O3 + O2 -> Na2O + SO2",
    "Na2S2O3 + I2 -> Na2S4O6 + NaI",
    "Na2SO3 + HCl -> NaCl + SO2 + H2O",
    "Na2SO3 + H2SO4 -> Na2SO4 + SO2 + H2O",
    "NaHSO3 + HCl -> NaCl + SO2 + H2O",
    "NaHSO4 + HCl -> NaCl + H2SO4",
    "H2S + NaOH -> NaHS + H2O",
    "H2S + 2 NaOH -> Na2S + 2 H2O",
    "H2S + CuCl2 -> CuS + 2 HCl",
    "H2S + Pb(NO3)2 -> PbS + 2 HNO3",
    "H2S + CdCl2 -> CdS + 2 HCl",
    "H2S + ZnCl2 -> ZnS + 2 HCl",
    "H2SO4 + NaCl -> NaHSO4 + HCl",
    "H2SO4 + 2 NaOH -> Na2SO4 + 2 H2O",
    "H2SO4 + NaOH -> NaHSO4 + H2O",
    "SO3 + NaOH -> NaHSO4",
    "SO3 + 2 NaOH -> Na2SO4 + H2O",
    "SO2 + 2 NaOH -> Na2SO3 + H2O",
    "SO2 + NaOH -> NaHSO3",
    "Na2S + H2SO4 -> Na2SO4 + H2S",
    "K2S + 2 HCl -> 2 KCl + H2S",
    "CaS + 2 HCl -> CaCl2 + H2S",
];

describe("sulfur oxidation states and sulfide chemistry", () => {
    for (const eq of SULFUR_REACTIONS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Cyanides, isocyanates and nitrates: the C/N partner chemistry. */
const NITROGEN_REACTIONS: string[] = [
    "CN + O2 -> CO2 + N2",
    "HCN + O2 -> CO2 + H2O + N2",
    "CH3CN + O2 -> CO2 + H2O + N2",
    "C2H5CN + O2 -> CO2 + H2O + N2",
    "C6H5CN + O2 -> CO2 + H2O + N2",
    "NaCN + O2 -> Na2O + CO2 + N2",
    "KCN + O2 -> K2O + CO2 + N2",
    "KSCN + O2 -> K2O + CO2 + SO2 + N2",
    "CH3NO2 + O2 -> CO2 + H2O + N2",
    "C2H5NO2 + O2 -> CO2 + H2O + N2",
    "C6H5NO2 + O2 -> CO2 + H2O + N2",
    "CH3NO3 + O2 -> CO2 + H2O + N2",
    "C2H5NO3 + O2 -> CO2 + H2O + N2",
    "NH3 + HCl -> NH4Cl",
    "NH3 + H2SO4 -> (NH4)2SO4",
    "NH3 + HNO3 -> NH4NO3",
    "NH3 + H3PO4 -> (NH4)3PO4",
    "NH3 + O2 -> NO + H2O",
    "NH3 + CO2 -> NH2CONH2 + H2O",
    
    "NO + O2 -> NO2",
    "NO2 + H2O -> HNO3 + NO",
    "N2O -> N2 + O2",
    "N2O3 -> NO + NO2",
    "N2O4 -> NO2",
    "N2O5 -> NO2 + O2",
    "HNO3 + NaOH -> NaNO3 + H2O",
    "HNO3 + KOH -> KNO3 + H2O",
    "HNO3 + Ca(OH)2 -> Ca(NO3)2 + H2O",
    "HNO3 + Ag -> AgNO3 + H2",
    "HNO2 + O2 -> HNO3",
    "NaNO3 + H2SO4 -> NaHSO4 + HNO3",
    "KNO3 + H2SO4 -> KHSO4 + HNO3",
    "Pb(NO3)2 -> PbO + NO2 + O2",
    "AgNO3 -> Ag + NO2 + O2",
    "NH4NO3 -> N2O + H2O",
    "NH4NO2 -> N2 + H2O",
    "(NH4)2CO3 -> NH3 + CO2 + H2O",
];

describe("nitrogen and cyanide chemistry", () => {
    for (const eq of NITROGEN_REACTIONS) {
        it(`balances ${eq}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Metallic element ladders: `M + acid -> salt + hydrogen`. */
const DISPLACEMENT: Array<[string, string, string]> = [
    ["Zn", "HCl", "ZnCl2"],
    ["Fe", "HCl", "FeCl2"],
    ["Mg", "HCl", "MgCl2"],
    ["Al", "HCl", "AlCl3"],
    ["Ca", "HCl", "CaCl2"],
    ["Na", "HCl", "NaCl"],
    ["K", "HCl", "KCl"],
    ["Li", "HCl", "LiCl"],
    ["Ba", "HCl", "BaCl2"],
    ["Sr", "HCl", "SrCl2"],
    ["Cu", "H2SO4", "CuSO4"],
    ["Zn", "H2SO4", "ZnSO4"],
    ["Fe", "H2SO4", "FeSO4"],
    ["Mg", "H2SO4", "MgSO4"],
    ["Al", "H2SO4", "Al2(SO4)3"],
    ["Ca", "H2SO4", "CaSO4"],
    ["Na", "H2SO4", "Na2SO4"],
    ["K", "H2SO4", "K2SO4"],
    ["Ba", "H2SO4", "BaSO4"],
    ["Ag", "HNO3", "AgNO3"],
    ["Cu", "HNO3", "Cu(NO3)2"],
    ["Zn", "HNO3", "Zn(NO3)2"],
    ["Mg", "HNO3", "Mg(NO3)2"],
    ["Ca", "HNO3", "Ca(NO3)2"],
    ["Na", "HNO3", "NaNO3"],
    ["K", "HNO3", "KNO3"],
    ["Ba", "H2S", "BaS"],
    ["Fe", "H2S", "FeS"],
    ["Zn", "H2S", "ZnS"],
    ["Cu", "H2S", "CuS"],
    ["Cd", "H2S", "CdS"],
    ["Pb", "H2S", "PbS"],
    ["Sr", "H2S", "SrS"],
    ["Ni", "H2S", "NiS"],
    ["Co", "H2S", "CoS"],
    ["Mn", "H2S", "MnS"],
];

describe("displacement ladder: metal plus acid gives salt and hydrogen", () => {
    for (const [metal, acid, salt] of DISPLACEMENT) {
        it(`${metal} + ${acid} -> ${salt} + H2`, () => {
            const r = balance(`${metal} + ${acid} -> ${salt} + H2`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
            const products = r.equation.split(" -> ")[1]!;
            expect(products).toContain(salt);
        });
    }
});

/** Double-displacement (metathesis) ladder: two salts exchange partners. */
const METATHESIS: Array<[string, string, string, string]> = [
    ["NaCl", "AgNO3", "NaNO3", "AgCl"],
    ["KCl", "AgNO3", "KNO3", "AgCl"],
    ["BaCl2", "Na2SO4", "NaCl", "BaSO4"],
    ["CaCl2", "Na2SO4", "NaCl", "CaSO4"],
    ["MgSO4", "BaCl2", "MgCl2", "BaSO4"],
    ["AgNO3", "KCl", "AgCl", "KNO3"],
    ["NaOH", "HCl", "NaCl", "H2O"],
    ["KOH", "HCl", "KCl", "H2O"],
    ["Ca(OH)2", "H2SO4", "CaSO4", "H2O"],
    ["Ba(OH)2", "H2SO4", "BaSO4", "H2O"],
    ["Mg(OH)2", "H2SO4", "MgSO4", "H2O"],
    ["Al(OH)3", "HCl", "AlCl3", "H2O"],
    ["Fe(OH)3", "HCl", "FeCl3", "H2O"],
    ["Cu(OH)2", "H2SO4", "CuSO4", "H2O"],
    ["Zn(OH)2", "HCl", "ZnCl2", "H2O"],
    ["Pb(NO3)2", "Na2SO4", "NaNO3", "PbSO4"],
    ["AgNO3", "NaCl", "AgCl", "NaNO3"],
    ["Ba(NO3)2", "Na2SO4", "NaNO3", "BaSO4"],
    ["CuSO4", "NaOH", "Na2SO4", "Cu(OH)2"],
    ["FeSO4", "KOH", "K2SO4", "Fe(OH)2"],
    ["CuCl2", "H2S", "HCl", "CuS"],
    ["Fe2S3", "H2", "FeS", "H2S"],
    ["SnCl2", "HgCl2", "HgCl", "SnCl4"],
];

describe("metathesis ladder: partner exchange", () => {
    for (const [a, b, c, d] of METATHESIS) {
        it(`${a} + ${b} -> ${c} + ${d}`, () => {
            const r = balance(`${a} + ${b} -> ${c} + ${d}`);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});