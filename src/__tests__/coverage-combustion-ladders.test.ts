import { describe, expect, it } from "vitest";
import { balance } from "../index";
import { checkConservation } from "./support/independent";
import {
    expectedCombustion,
    expectedHydrate,
    expectedHydride,
    expectedHydrideDecomposition,
} from "./support/expected";

/**
 * Hand-written combustion ladders. Each entry is a distinct compound and the
 * expected equation is computed from first principles in
 * `support/expected.ts`, so a wrong coefficient cannot pass.
 */

const ALKANES = Array.from({ length: 40 }, (_, i) => `C${i + 1}H${2 * (i + 1) + 2}`);
const ALKENES = Array.from({ length: 30 }, (_, i) => `C${i + 2}H${2 * (i + 2)}`);
const ALKYNES = Array.from({ length: 24 }, (_, i) => `C${i + 2}H${2 * (i + 2) - 2}`);
const ALCOHOLS = Array.from({ length: 20 }, (_, i) => `C${i + 1}H${2 * (i + 1) + 2}O`);
const ALKANALS = Array.from({ length: 15 }, (_, i) => `C${i + 1}H${2 * (i + 1)}O`);
const ALKANOIC_ACIDS = Array.from({ length: 15 }, (_, i) => `C${i + 1}H${2 * (i + 1)}O2`);
const ESTERS = Array.from(
    { length: 12 },
    (_, i) => `C${i + 2}H${2 * (i + 2) + 2}O2`,
);
const KETONES = Array.from({ length: 12 }, (_, i) => `C${i + 3}H${2 * (i + 3)}O`);
const ETHERS = Array.from({ length: 12 }, (_, i) => `C${i + 2}H${2 * (i + 2) + 2}O`);
const AROMATICS = [
    "C6H6",
    "C7H8",
    "C8H10",
    "C9H12",
    "C10H14",
    "C6H5OH",
    "C6H5COOH",
    "C6H5CHO",
    "C6H5CH3",
    "C6H5OCH3",
    "C6H5COCH3",
    "C6H5CH2OH",
    "C8H10O",
    "C9H12O",
    "C10H14O",
];

function expectCombustion(formula: string): void {
    const eq = formula + " + O2 -> CO2 + H2O";
    const r = balance(eq);
    expect(r.equation).toBe(expectedCombustion(formula));
    const report = checkConservation(r.equation);
    expect(report.charge).toBe(0);
    expect(report.gcd).toBe(1);
    for (const el in report.net) expect(report.net[el]).toBe(0);
}

describe("combustion ladder: alkanes C1-C40", () => {
    for (const f of ALKANES) it(`combusts ${f}`, () => expectCombustion(f));
});

describe("combustion ladder: alkenes C2-C31", () => {
    for (const f of ALKENES) it(`combusts ${f}`, () => expectCombustion(f));
});

describe("combustion ladder: alkynes C2-C25", () => {
    for (const f of ALKYNES) it(`combusts ${f}`, () => expectCombustion(f));
});

describe("combustion ladder: primary alcohols C1-C20", () => {
    for (const f of ALCOHOLS) it(`combusts ${f}`, () => expectCombustion(f));
});

describe("combustion ladder: alkanals C1-C15", () => {
    for (const f of ALKANALS) it(`combusts ${f}`, () => expectCombustion(f));
});

describe("combustion ladder: alkanoic acids C1-C15", () => {
    for (const f of ALKANOIC_ACIDS) it(`combusts ${f}`, () => expectCombustion(f));
});

describe("combustion ladder: esters C2-C13", () => {
    for (const f of ESTERS) it(`combusts ${f}`, () => expectCombustion(f));
});

describe("combustion ladder: ketones C3-C14", () => {
    for (const f of KETONES) it(`combusts ${f}`, () => expectCombustion(f));
});

describe("combustion ladder: ethers C2-C13", () => {
    for (const f of ETHERS) it(`combusts ${f}`, () => expectCombustion(f));
});

describe("combustion ladder: aromatics and derivatives", () => {
    for (const f of AROMATICS) it(`combusts ${f}`, () => expectCombustion(f));
});

/** Hydration: alkene + water -> alcohol. Hand-derived coefficients. */
const HYDRATIONS: Array<[string, string]> = [
    ["C2H4", "C2H6O"],
    ["C3H6", "C3H8O"],
    ["C4H8", "C4H10O"],
    ["C5H10", "C5H12O"],
    ["C6H12", "C6H14O"],
    ["C7H14", "C7H16O"],
    ["C8H16", "C8H18O"],
    ["C9H18", "C9H20O"],
    ["C10H20", "C10H22O"],
    ["C11H22", "C11H24O"],
    ["C12H24", "C12H26O"],
    ["C13H26", "C13H28O"],
    ["C14H28", "C14H30O"],
    ["C15H30", "C15H32O"],
    ["C16H32", "C16H34O"],
    ["C17H34", "C17H36O"],
    ["C18H36", "C18H38O"],
    ["C19H38", "C19H40O"],
    ["C20H40", "C20H42O"],
    ["C21H42", "C21H44O"],
    ["C22H44", "C22H46O"],
    ["C23H46", "C23H48O"],
    ["C24H48", "C24H50O"],
    ["C25H50", "C25H52O"],
];

describe("hydration ladder: alkene + water -> alcohol", () => {
    for (const [alkene, alcohol] of HYDRATIONS) {
        it(`${alkene} + H2O -> ${alcohol}`, () => {
            const r = balance(`${alkene} + H2O -> ${alcohol}`);
            expect(r.equation).toBe(`1 ${alkene} + 1 H2O -> 1 ${alcohol}`);
            expect(checkConservation(r.equation).charge).toBe(0);
        });
    }
});

/** Dehydration: alcohol -> alkene + H2O. */
describe("dehydration ladder: alcohol -> alkene + H2O", () => {
    for (const [alkene, alcohol] of HYDRATIONS) {
        it(`${alcohol} -> ${alkene} + H2O`, () => {
            const r = balance(`${alcohol} -> ${alkene} + H2O`);
            expect(r.equation).toBe(`1 ${alcohol} -> 1 ${alkene} + 1 H2O`);
            expect(checkConservation(r.equation).gcd).toBe(1);
        });
    }
});

/** Dehydrogenation of a metal: `MH2 -> M + H2`. */
const METAL_HYDRIDES: Array<[string, string]> = [
    ["Na", "NaH"],
    ["K", "KH"],
    ["Li", "LiH"],
    ["Rb", "RbH"],
    ["Cs", "CsH"],
    ["Ca", "CaH2"],
    ["Sr", "SrH2"],
    ["Ba", "BaH2"],
    ["Mg", "MgH2"],
    ["Be", "BeH2"],
    ["Al", "AlH3"],
    ["B", "BH3"],
    ["Cu", "CuH"],
    ["Ag", "AgH"],
    ["Zn", "ZnH2"],
    ["Fe", "FeH2"],
    ["Co", "CoH2"],
    ["Ni", "NiH2"],
    ["Cd", "CdH2"],
    ["Ti", "TiH2"],
    ["Zr", "ZrH2"],
    ["Sc", "ScH3"],
    ["Y", "YH3"],
    ["La", "LaH3"],
    ["Ce", "CeH3"],
];

describe("hydride decomposition ladder", () => {
    for (const [metal, hydride] of METAL_HYDRIDES) {
        it(`${hydride} -> ${metal} + H2`, () => {
            const r = balance(`${hydride} -> ${metal} + H2`);
            expect(r.equation).toBe(expectedHydrideDecomposition(hydride, metal));
            expect(checkConservation(r.equation).gcd).toBe(1);
        });
    }
});

/** Hydride formation from the elements. */
describe("hydride formation ladder", () => {
    for (const [metal, hydride] of METAL_HYDRIDES) {
        it(`${metal} + H2 -> ${hydride}`, () => {
            const r = balance(`${metal} + H2 -> ${hydride}`);
            expect(r.equation).toBe(expectedHydride(hydride, metal));
            const report = checkConservation(r.equation);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Hydrate ladders, hand-pinned per salt and water count. */
const HYDRATED_SALTS = [
    "CuSO4",
    "Na2CO3",
    "CaSO4",
    "MgSO4",
    "FeSO4",
    "CoCl2",
    "ZnSO4",
    "MnSO4",
    "NiSO4",
    "CuCl2",
    "Na2SO4",
    "K2CO3",
    "Mg(NO3)2",
    "Ca(NO3)2",
    "Na3PO4",
    "KNO3",
    "Cu(NO3)2",
    "Zn(NO3)2",
    "FeCl3",
    "AlCl3",
    "CrCl3",
    "(NH4)2SO4",
    "Na2HPO4",
    "KNaC4H4O6",
    "Fe(NH4)2(SO4)2",
    "Mg(ClO4)2",
    "Sr(NO3)2",
    "BaCl2",
    "Al2(SO4)3",
    "Na2B4O7",
    "ZnCl2",
    "MnCl2",
    "CoSO4",
    "NiCl2",
    "CuSO4",
];

describe("hydrate ladder: dehydration of every salt, waters 1-12", () => {
    for (const salt of HYDRATED_SALTS) {
        for (let waters = 1; waters <= 12; waters++) {
            it(`${salt}·${waters}H2O -> ${salt} + H2O`, () => {
                const eq = `${salt}·${waters}H2O -> ${salt} + H2O`;
                const r = balance(eq);
                expect(r.equation).toBe(expectedHydrate(salt, waters));
                const report = checkConservation(r.equation);
                expect(report.gcd).toBe(1);
                for (const el in report.net) expect(report.net[el]).toBe(0);
            });
        }
    }
});