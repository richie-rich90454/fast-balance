/**
 * fast-balance — exact, fast chemical equation balancing.
 *
 * Public entry point. All historical exports are preserved; new capabilities
 * are additive and opt-in.
 */
import { Fraction, gcd, lcm } from "./fraction";
import {
    normalizeText,
    parseFormula,
    parseWithoutMultiplier,
    splitEquation,
    stripStateSymbols,
    normalizeArrows,
} from "./parse";
import type { ElementMap, Equation, ParsedUnit, Species } from "./parse";
import {
    buildMatrix,
    fractionsToIntegers,
    rref,
    solveAllPositive,
    solvePositive,
    solveSystem,
    verifyConservation,
} from "./solver";
import { BalanceError, parseError, unbalanceable, unknownElement } from "./errors";
import type { BalanceErrorCode } from "./errors";
import { analyzeReaction, classify, oxidationStates } from "./analysis";
import type { ReactionAnalysis } from "./analysis";
import { atomicNumberOf } from "./symbols";

export {
    Fraction,
    gcd,
    lcm,
    parseFormula,
    parseWithoutMultiplier,
    splitEquation,
    stripStateSymbols,
    normalizeText,
    normalizeArrows,
    buildMatrix,
    solveSystem,
    fractionsToIntegers,
    analyzeReaction,
    classify,
    oxidationStates,
    BalanceError,
};
export type { ElementMap, Equation, ParsedUnit, Species, BalanceErrorCode, ReactionAnalysis };

export interface BalancedSpecies {
    coefficient: number;
    formula: string;
}

export interface BalanceOptions {
    showOne?: boolean;
    format?: "text" | "html" | "latex";
    /** `chemical` (default) balances element identity; `nuclear` balances A and nuclear charge. */
    mode?: "chemical" | "nuclear";
    /** Opt-in: infer omitted H2O/H+/OH-/e- to make a redox system balance. */
    autoComplete?: boolean;
    /** Opt-in: classify the reaction and report redox changes. */
    analyze?: boolean;
}

export interface BalanceResult {
    reactants: BalancedSpecies[];
    products: BalancedSpecies[];
    equation: string;
    /** Present (true) only when more than one independent solution exists. */
    underdetermined?: boolean;
    /** Human-readable notes, present only when non-empty. */
    warnings?: string[];
    /** Present only when `analyze: true`. */
    analysis?: ReactionAnalysis;
}

function formatSpecies(side: BalancedSpecies[], showOne: boolean): string {
    return side
        .map((s) => (showOne || s.coefficient !== 1 ? s.coefficient + " " : "") + s.formula)
        .join(" + ");
}

function formatEquation(
    reactants: BalancedSpecies[],
    products: BalancedSpecies[],
    showOne: boolean,
    format: "text" | "html" | "latex",
): string {
    const left = formatSpecies(reactants, showOne);
    const right = formatSpecies(products, showOne);
    switch (format) {
        case "html":
            return left + " &rarr; " + right;
        case "latex":
            return left + " \\rightarrow " + right;
        default:
            return left + " -> " + right;
    }
}

function rankOf(matrix: Fraction[][]): number {
    return matrix.length === 0 ? 0 : rref(matrix).pivotCols.length;
}

function makeResult(
    reactants: Species[],
    products: Species[],
    coeffs: number[],
    showOne: boolean,
    format: "text" | "html" | "latex",
    nullity: number,
    options: BalanceOptions,
): BalanceResult {
    const n = reactants.length;
    const balancedReactants: BalancedSpecies[] = reactants.map((r, i) => ({
        coefficient: coeffs[i]!,
        formula: r.formula,
    }));
    const balancedProducts: BalancedSpecies[] = products.map((p, i) => ({
        coefficient: coeffs[n + i]!,
        formula: p.formula,
    }));
    const result: BalanceResult = {
        reactants: balancedReactants,
        products: balancedProducts,
        equation: formatEquation(balancedReactants, balancedProducts, showOne, format),
    };
    if (nullity > 1) result.underdetermined = true;
    const warnings: string[] = [];
    for (const s of [...reactants, ...products]) {
        if (s.variables && s.variables.length > 0) {
            warnings.push(
                "Symbolic subscript (" + s.variables.join(", ") + ") treated as 1 in " + s.formula,
            );
        }
    }
    if (warnings.length > 0) result.warnings = warnings;
    if (options.analyze) result.analysis = analyzeReaction(reactants, products);
    return result;
}

/** Balance a chemical equation. */
export function balance(input: string, options: BalanceOptions = {}): BalanceResult {
    const showOne = options.showOne ?? true;
    const format = options.format ?? "text";
    const { reactants, products } = splitEquation(input);
    const mode = options.mode ?? "chemical";

    const run = (): BalanceResult => {
        const { matrix, cols } =
            mode === "nuclear"
                ? buildNuclearMatrix(reactants, products)
                : buildMatrix(reactants, products);

        let coeffs = solvePositive(matrix, cols);
        if (coeffs === null) {
            let vec: Fraction[];
            try {
                vec = solveSystem(matrix, cols);
            } catch {
                throw unbalanceable();
            }
            coeffs = fractionsToIntegers(vec);
        }
        if (coeffs.some((c) => c <= 0 || !Number.isFinite(c) || !Number.isInteger(c))) {
            throw unbalanceable();
        }
        if (!verifyConservation(reactants, products, coeffs)) {
            if (mode === "chemical") throw unbalanceable();
        }
        const nullity = cols - rankOf(matrix);
        return makeResult(reactants, products, coeffs, showOne, format, nullity, options);
    };

    try {
        return run();
    } catch (e) {
        if (options.autoComplete && mode === "chemical") {
            return tryAutoComplete(reactants, products, showOne, format, options);
        }
        throw e;
    }
}

/**
 * Balance a nuclear equation. Conserves mass number A and nuclear charge Q
 * (proton number for nuclides; charge for leptons). Isotope labels are
 * required for nuclides.
 */
function buildNuclearMatrix(
    reactants: Species[],
    products: Species[],
): { matrix: Fraction[][]; cols: number } {
    const all = [...reactants, ...products];
    const cols = all.length;
    const matrix: Fraction[][] = [
        Array.from({ length: cols }, () => Fraction.zero()),
        Array.from({ length: cols }, () => Fraction.zero()),
    ];
    for (let j = 0; j < cols; j++) {
        const sign = j < reactants.length ? 1 : -1;
        const sp = all[j]!;
        const keys = Object.keys(sp.elements);
        let a = 0;
        let q = 0;
        if (keys.length === 0) {
            const f = sp.formula;
            if (f === "n") {
                a = 1;
                q = 0;
            } else if (f === "p") {
                a = 1;
                q = 1;
            } else {
                a = 0;
                q = sp.charge;
            }
        } else {
            for (const el of keys) {
                const z = atomicNumberOf(el);
                if (z === undefined) {
                    throw parseError('Nuclear mode expected element, got unknown "' + el + '"');
                }
                const mass = sp.isotopes?.[el];
                if (mass === undefined) {
                    throw parseError(
                        'Nuclear mode requires isotope labels (expected element mass number for "' +
                            el +
                            '")',
                    );
                }
                a += sp.elements[el]! * mass;
                q += sp.elements[el]! * z;
            }
        }
        matrix[0]![j] = new Fraction(sign * a);
        matrix[1]![j] = new Fraction(sign * q);
    }
    return { matrix, cols };
}

const AUTO_HELPERS = ["H2O", "H+", "OH-", "e-"];

function speciesFromFormula(formula: string): Species {
    const { elements, charge } = parseFormula(formula);
    return { formula, elements, charge };
}

/**
 * Opt-in inference of omitted H2O / H+ / OH- / e-. Tries each combination of
 * adding helpers to the left, the right, or not at all, and returns the
 * balance that adds the fewest helpers.
 */
function tryAutoComplete(
    reactants: Species[],
    products: Species[],
    showOne: boolean,
    format: "text" | "html" | "latex",
    options: BalanceOptions,
): BalanceResult {
    const helperSpecies = AUTO_HELPERS.map((h) => speciesFromFormula(h));
    let best: BalanceResult | null = null;
    let bestAdded = Infinity;
    const total = Math.pow(3, AUTO_HELPERS.length);

    for (let mask = 0; mask < total; mask++) {
        let m = mask;
        const left: Species[] = [...reactants];
        const right: Species[] = [...products];
        let added = 0;
        for (let k = 0; k < AUTO_HELPERS.length; k++) {
            const choice = m % 3;
            m = Math.floor(m / 3);
            if (choice === 1) {
                left.push(helperSpecies[k]!);
                added++;
            } else if (choice === 2) {
                right.push(helperSpecies[k]!);
                added++;
            }
        }
        if (added === 0 || added >= bestAdded) continue;
        const { matrix, cols } = buildMatrix(left, right);
        const coeffs = solvePositive(matrix, cols);
        if (coeffs === null) continue;
        if (!verifyConservation(left, right, coeffs)) continue;
        const nullity = cols - rankOf(matrix);
        best = makeResult(left, right, coeffs, showOne, format, nullity, options);
        bestAdded = added;
    }

    if (best === null) throw unbalanceable();
    if (!best.warnings) best.warnings = [];
    best.warnings.push("autoComplete inferred omitted species");
    return best;
}

/**
 * All independent balances of an equation. For a unique reaction this is a
 * single result; for underdetermined systems it includes the minimal balance
 * and one solution per independent free direction.
 */
export function balanceAll(input: string, options: BalanceOptions = {}): BalanceResult[] {
    const showOne = options.showOne ?? true;
    const format = options.format ?? "text";
    const { reactants, products } = splitEquation(input);
    const { matrix, cols } = buildMatrix(reactants, products);
    const sols = solveAllPositive(matrix, cols);
    if (sols.length === 0) throw unbalanceable();
    const nullity = cols - rankOf(matrix);
    return sols.map((coeffs) =>
        makeResult(reactants, products, coeffs, showOne, format, nullity, options),
    );
}

/** True when the equation balances exactly (mass and charge). */
export function isBalanced(input: string, options: BalanceOptions = {}): boolean {
    try {
        balance(input, options);
        return true;
    } catch {
        return false;
    }
}

/** Alias for {@link balance} that makes the throwing contract explicit. */
export function verify(input: string, options: BalanceOptions = {}): BalanceResult {
    return balance(input, options);
}

/**
 * Report left/right element and charge totals for an equation, without
 * requiring it to balance.
 */
export function audit(input: string): {
    elements: Record<string, { left: number; right: number; balanced: boolean }>;
    charge: { left: number; right: number; balanced: boolean };
} {
    const { reactants, products } = splitEquation(input);
    const totals: Record<string, { left: number; right: number }> = {};
    let chargeLeft = 0;
    let chargeRight = 0;
    for (const s of reactants) {
        for (const el in s.elements) {
            const t = (totals[el] ??= { left: 0, right: 0 });
            t.left += s.elements[el]!;
        }
        chargeLeft += s.charge;
    }
    for (const s of products) {
        for (const el in s.elements) {
            const t = (totals[el] ??= { left: 0, right: 0 });
            t.right += s.elements[el]!;
        }
        chargeRight += s.charge;
    }
    const elements: Record<string, { left: number; right: number; balanced: boolean }> = {};
    for (const el in totals) {
        const t = totals[el]!;
        elements[el] = { left: t.left, right: t.right, balanced: t.left === t.right };
    }
    return {
        elements,
        charge: { left: chargeLeft, right: chargeRight, balanced: chargeLeft === chargeRight },
    };
}

export { parseError, unbalanceable, unknownElement, atomicNumberOf };
