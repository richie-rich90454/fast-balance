/**
 * Hand-written expected-result builders.
 *
 * These compute the balanced equation from first principles (arithmetic on
 * hand-counted atoms), never by calling the library. A test that compares
 * `balance(eq).equation` against a value built here is therefore an
 * independent check of the solver and the renderer.
 */
import { countFormula } from "./independent";

/** Render one term the way the library does with `showOne: true`. */
function term(coefficient: number, formula: string): string {
    return coefficient + " " + formula;
}

/** Join left and right term lists around a single arrow. */
function arrow(left: string[], right: string[]): string {
    return left.join(" + ") + " -> " + right.join(" + ");
}

function gcd(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
        const t = x % y;
        x = y;
        y = t;
    }
    return x;
}

/**
 * Complete combustion of a C/H/O compound:
 * `CxHyOz + x2 O2 -> x CO2 + (y/2) H2O`.
 */
export function expectedCombustion(formula: string): string {
    const { elements } = countFormula(formula);
    for (const k of Object.keys(elements)) {
        if (k !== "C" && k !== "H" && k !== "O") {
            throw new Error("not a C/H/O compound: " + formula);
        }
    }
    const c = elements["C"] ?? 0;
    const h = elements["H"] ?? 0;
    const o = elements["O"] ?? 0;
    if (c === 0) throw new Error("no carbon: " + formula);
    if (h % 2 !== 0) throw new Error("odd hydrogen count: " + formula);
    const water = h / 2;
    const need = 2 * c + water - o;
    if (need < 0) throw new Error("too much oxygen already present: " + formula);
    // An odd oxygen demand is met by doubling the whole equation.
    const k = need % 2 === 0 ? 1 : 2;
    const left = [term(k, formula)];
    const o2 = (need * k) / 2;
    if (o2 > 0) left.push(term(o2, "O2"));
    return arrow(left, [term(c * k, "CO2"), term(water * k, "H2O")]);
}

/** Dehydration of a hydrate: `salt·nH2O -> salt + n H2O`. */
export function expectedHydrate(salt: string, waters: number): string {
    return arrow(
        [term(1, salt + "·" + waters + "H2O")],
        [term(1, salt), term(waters, "H2O")],
    );
}

/** Formation of a metal oxide from its elements, scaled to integers. */
export function expectedOxide(formula: string, metal: string): string {
    const { elements } = countFormula(formula);
    const m = elements[metal] ?? 0;
    const o = elements["O"] ?? 0;
    if (m === 0 || o === 0) throw new Error("not a metal oxide: " + formula);
    const g = gcd(m, 2 * o);
    const metalCoef = (2 * o) / g;
    const o2Coef = m / g;
    if (o2Coef === 0) return arrow([term(metalCoef, metal)], [term(1, formula)]);
    return arrow([term(metalCoef, metal), term(o2Coef, "O2")], [term(1, formula)]);
}

/** Reduction of a metal oxide by hydrogen, scaled to integers. */
export function expectedOxideByHydrogen(formula: string, metal: string): string {
    const { elements } = countFormula(formula);
    const m = elements[metal] ?? 0;
    const o = elements["O"] ?? 0;
    if (m === 0 || o === 0) throw new Error("not a metal oxide: " + formula);
    const g = gcd(m, o);
    return arrow(
        [term(o / g, formula), term(m / g, "H2")],
        [term(o / g, metal), term(m / g, "H2O")],
    );
}

/**
 * Hydride formation `a M + b H2 -> c MH_n`. Metal balance forces a = c, and
 * hydrogen forces b = n*c/2, so c = 1 when n is even and c = 2 when n is odd.
 */
export function expectedHydride(formula: string, metal: string): string {
    const { elements } = countFormula(formula);
    const h = elements["H"] ?? 0;
    if ((elements[metal] ?? 0) === 0 || h === 0) {
        throw new Error("not a metal hydride: " + formula);
    }
    const c = h % 2 === 0 ? 1 : 2;
    const b = (h * c) / 2;
    return arrow([term(c, metal), term(b, "H2")], [term(c, formula)]);
}

/**
 * Binary salt from its constituent elements, scaled to integers:
 * `a/g cation + b/g anion -> compound`.
 */
export function expectedBinaryFromElements(
    cation: string,
    anion: string,
    compound: string,
): string {
    const { elements } = countFormula(compound);
    const c = elements[cation] ?? 0;
    const a = elements[anion] ?? 0;
    if (c === 0 || a === 0) throw new Error("not a binary salt: " + compound);
    const g = gcd(c, a);
    return arrow([term(a / g, cation), term(c / g, anion)], [term(1, compound)]);
}

/** Dissociation `AB -> A + B` with unit coefficients. */
export function expectedDissociation(compound: string, parts: string[]): string {
    return arrow([term(1, compound)], parts.map((p) => term(1, p)));
}

/**
 * Hydride decomposition `c MH_n -> c M + (n*c/2) H2`, with c = 2 when n is odd.
 */
export function expectedHydrideDecomposition(formula: string, metal: string): string {
    const { elements } = countFormula(formula);
    const h = elements["H"] ?? 0;
    if ((elements[metal] ?? 0) === 0 || h === 0) {
        throw new Error("not a metal hydride: " + formula);
    }
    const c = h % 2 === 0 ? 1 : 2;
    const b = (h * c) / 2;
    return arrow([term(c, formula)], [term(c, metal), term(b, "H2")]);
}

/**
 * Oxidation of a lower oxide to a higher one by dioxygen, e.g.
 * `2 CO + O2 -> 2 CO2`. The oxygen delta is computed from the formulas.
 */
export function expectedOxidationByOxygen(lower: string, higher: string): string {
    const lo = countFormula(lower);
    const hi = countFormula(higher);
    const elems = Object.keys(lo.elements).filter((k) => (hi.elements[k] ?? 0) === lo.elements[k]);
    if (elems.length !== 1) throw new Error("elements do not match: " + lower + " -> " + higher);
    const [metal] = elems as [string];
    const lowerAtoms = lo.elements[metal]!;
    const higherAtoms = hi.elements[metal]!;
    if (lowerAtoms !== higherAtoms) throw new Error("atom counts differ: " + lower + " -> " + higher);
    const oDelta = (hi.elements["O"] ?? 0) - (lo.elements["O"] ?? 0);
    if (oDelta === 0) throw new Error("no oxygen change: " + lower + " -> " + higher);
    const g = gcd(lowerAtoms, oDelta);
    return arrow(
        [term(oDelta / g, lower), term(lowerAtoms / g, "O2")],
        [term(1, higher)],
    );
}