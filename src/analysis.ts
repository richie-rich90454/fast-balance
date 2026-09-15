/**
 * Reaction analysis: oxidation states, redox detection and classification.
 *
 * Oxidation states are assigned with standard electronegativity-based rules.
 * This is diagnostic output only; it never influences balancing.
 */
import { canonicalSymbol, atomicNumberOf } from "./symbols";
import type { Species } from "./parse";

/** Pauling electronegativities for the elements most often encountered. */
const ELECTRONEGATIVITY: Readonly<Record<string, number>> = {
    H: 2.2, He: 0.0, Li: 0.98, Be: 1.57, B: 2.04, C: 2.55, N: 3.04, O: 3.44, F: 3.98, Ne: 0.0,
    Na: 0.93, Mg: 1.31, Al: 1.61, Si: 1.9, P: 2.19, S: 2.58, Cl: 3.16, Ar: 0.0,
    K: 0.82, Ca: 1.0, Sc: 1.36, Ti: 1.54, V: 1.63, Cr: 1.66, Mn: 1.55, Fe: 1.83, Co: 1.88,
    Ni: 1.91, Cu: 1.9, Zn: 1.65, Ga: 1.81, Ge: 2.01, As: 2.18, Se: 2.55, Br: 2.96, Kr: 0.0,
    Rb: 0.82, Sr: 0.95, Y: 1.22, Zr: 1.33, Nb: 1.6, Mo: 2.16, Tc: 1.9, Ru: 2.2, Rh: 2.28,
    Pd: 2.2, Ag: 1.93, Cd: 1.69, In: 1.78, Sn: 1.96, Sb: 2.05, Te: 2.1, I: 2.66, Xe: 2.6,
    Cs: 0.79, Ba: 0.89, La: 1.1, Ce: 1.12, W: 2.36, Pt: 2.28, Au: 2.54, Hg: 2.0, Tl: 1.62,
    Pb: 2.33, Bi: 2.02, Po: 2.0, At: 2.2, Rn: 0.0, Fr: 0.7, Ra: 0.9, Ac: 1.1, Th: 1.3,
    U: 1.38, Pu: 1.28, Am: 1.13, Np: 1.36,
};

function electronegativity(symbol: string): number {
    return ELECTRONEGATIVITY[symbol] ?? 1.5;
}

const GROUP1 = new Set(["Li", "Na", "K", "Rb", "Cs", "Fr"]);
const GROUP2 = new Set(["Be", "Mg", "Ca", "Sr", "Ba", "Ra"]);
const HALOGENS = ["F", "Cl", "Br", "I"];
const METALS = new Set([
    "Li", "Be", "Na", "Mg", "Al", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe",
    "Co", "Ni", "Cu", "Zn", "Ga", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru",
    "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Cs", "Ba", "La", "Ce", "Hf", "Ta", "W",
    "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Fr", "Ra", "Ac", "Th",
    "Pa", "U", "Np", "Pu",
]);

/**
 * Average oxidation state of each element in a species, for the elements that
 * can be determined unambiguously.
 *
 * O and H (and group 1/2, Al, F) are fixed by standard rules; if exactly one
 * element remains, the residual charge is placed on it. When two or more
 * elements remain (e.g. Fe2(SO4)3) their states are not reported rather than
 * guessed, so the values that are returned are reliable.
 */
export function oxidationStates(species: Species): Record<string, number> {
    const elements = species.elements;
    const symbols = Object.keys(elements);
    const fixed: Record<string, number | null> = {};
    for (const el of symbols) fixed[el] = null;

    const has = (el: string): boolean => (elements[el] ?? 0) > 0;
    const count = (el: string): number => elements[el] ?? 0;
    const others = symbols.filter((el) => el !== "O");
    const onlyO = symbols.length === 1 && symbols[0] === "O";
    const isPeroxide =
        has("O") &&
        count("O") >= 2 &&
        !onlyO &&
        (others.every((el) => el === "H") ||
            (others.every((el) => GROUP2.has(el)) && count("O") === 2));

    if (onlyO) {
        fixed["O"] = species.charge / count("O");
        const out: Record<string, number> = {};
        for (const el of symbols) out[el] = fixed[el]!;
        return out;
    }
    if (has("O")) fixed["O"] = isPeroxide ? -1 : -2;
    if (has("F")) fixed["F"] = -1;

    for (const el of symbols) {
        if (GROUP1.has(el)) fixed[el] = 1;
        else if (GROUP2.has(el)) fixed[el] = 2;
        else if (el === "Al") fixed[el] = 3;
    }

    if (has("H")) {
        const hydride =
            !has("O") &&
            !HALOGENS.some((h) => has(h)) &&
            symbols.some((el) => el !== "H" && METALS.has(el));
        fixed["H"] = hydride ? -1 : 1;
    }
    for (const hal of HALOGENS) {
        if (has(hal) && hal !== "F" && !has("O")) fixed[hal] = -1;
    }

    let assigned = 0;
    for (const el of symbols) if (fixed[el] !== null) assigned += fixed[el]! * count(el);
    const residual = species.charge - assigned;
    const unknown = symbols.filter((el) => fixed[el] === null);
    if (unknown.length === 1) {
        const el = unknown[0]!;
        fixed[el] = residual / count(el);
    }

    const result: Record<string, number> = {};
    for (const el of symbols) {
        if (fixed[el] !== null) result[el] = fixed[el]!;
    }
    return result;
}

function totalOxidation(species: Species): Record<string, number> {
    const avg = oxidationStates(species);
    const totals: Record<string, number> = {};
    for (const el in avg) {
        if (el === "H" || el === "O" || el === "F") continue;
        totals[el] = avg[el]! * (species.elements[el] ?? 0);
    }
    return totals;
}

export interface ReactionAnalysis {
    type: string;
    oxidized: string[];
    reduced: string[];
    electronsTransferred?: number;
}

/** Classify a reaction and report redox changes. */
export function analyzeReaction(reactants: Species[], products: Species[]): ReactionAnalysis {
    const type = classify(reactants, products);
    const left = countSide(reactants);
    const right = countSide(products);

    const oxidized: string[] = [];
    const reduced: string[] = [];
    const leftTotals = sumTotals(reactants.map(totalOxidation));
    const rightTotals = sumTotals(products.map(totalOxidation));

    for (const el in leftTotals) {
        const before = leftTotals[el];
        const after = rightTotals[el];
        if (before === undefined || after === undefined) continue;
        if (after > before) oxidized.push(el);
        else if (after < before) reduced.push(el);
    }

    const result: ReactionAnalysis = { type, oxidized, reduced };
    void left;
    void right;
    return result;
}

function sumTotals(list: Array<Record<string, number>>): Record<string, number> {
    const out: Record<string, number> = {};
    for (const m of list) for (const el in m) out[el] = (out[el] ?? 0) + m[el]!;
    return out;
}

function countSide(species: Species[]): Record<string, number> {
    const totals: Record<string, number> = {};
    for (const s of species) {
        for (const el in s.elements) totals[el] = (totals[el] ?? 0) + s.elements[el]!;
    }
    return totals;
}

/** Simple structural classification of a reaction. */
export function classify(reactants: Species[], products: Species[]): string {
    const leftCount = reactants.length;
    const rightCount = products.length;
    const combustion =
        reactants.some((s) => (s.elements["O"] ?? 0) === 2 && Object.keys(s.elements).length === 1) &&
        products.some((s) => s.elements["C"] === 1 && (s.elements["O"] ?? 0) === 2) &&
        products.some((s) => (s.elements["H"] ?? 0) === 2 && (s.elements["O"] ?? 0) === 1);

    const leftEls = countSide(reactants);
    const rightEls = countSide(products);

    if (combustion) return "combustion";
    if (leftCount === 1 && rightCount > 1) return "decomposition";
    if (leftCount > 1 && rightCount === 1) return "synthesis";

    // single displacement: element + compound -> element + compound
    const leftSingle = reactants.filter((s) => Object.keys(s.elements).length === 1).length;
    const rightSingle = products.filter((s) => Object.keys(s.elements).length === 1).length;
    if (leftSingle >= 1 && rightSingle >= 1) return "single-displacement";

    // acid-base: proton transfer (H+ plus a base)
    const hasProton = reactants.some((s) => s.charge > 0 && (s.elements["H"] ?? 0) > 0);
    const yieldsWater = products.some(
        (s) => s.elements["H"] === 2 && s.elements["O"] === 1 && Object.keys(s.elements).length === 2
    );
    if (hasProton && yieldsWater) return "acid-base";

    void leftEls;
    void rightEls;
    return "metathesis";
}

export { canonicalSymbol, atomicNumberOf };
