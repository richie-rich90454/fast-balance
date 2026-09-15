/** Conservation matrix construction and exact nullspace solving.
 *
 * The public `solveSystem` and `Fraction` API is unchanged (number-backed, as
 * relied upon by the test-suite). The balancing path uses an independent
 * BigInt-backed solver so results are exact for arbitrarily large systems.
 */
import { Fraction, gcd, lcm } from "./fraction";
import { parseError } from "./errors";
import type { ElementMap, Species } from "./parse";

export interface SpeciesInput {
    elements: ElementMap;
    charge: number;
}

/**
 * Build the conservation matrix. One row per distinct element (lexicographic
 * order), plus a trailing charge row when any species carries a charge.
 * Reactant columns are positive, product columns negative. Every cell is a
 * `Fraction` (including zeros).
 */
export function buildMatrix(
    reactants: SpeciesInput[],
    products: SpeciesInput[]
): { matrix: Fraction[][]; cols: number } {
    const species: SpeciesInput[] = [...reactants, ...products];
    const elSet = new Set<string>();
    for (const s of species) for (const el in s.elements) elSet.add(el);
    const elements = Array.from(elSet).sort();
    const hasCharge = species.some((s) => s.charge !== 0);
    const rows = elements.length + (hasCharge ? 1 : 0);
    const cols = species.length;

    const M: Fraction[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Fraction.zero())
    );

    for (let j = 0; j < cols; j++) {
        const isReactant = j < reactants.length;
        const sign = isReactant ? 1 : -1;
        const sp = species[j]!;
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i]!;
            const val = sp.elements[el] ?? 0;
            M[i]![j] = new Fraction(sign * val);
        }
        if (hasCharge) M[rows - 1]![j] = new Fraction(sign * sp.charge);
    }

    if (rows === 0) {
        return { matrix: [Array.from({ length: cols }, () => Fraction.zero())], cols };
    }
    return { matrix: M, cols };
}

export interface Rref {
    matrix: Fraction[][];
    pivotCols: number[];
    freeCols: number[];
}

/** Reduced row echelon form over the rationals (number-backed). */
export function rref(input: Fraction[][]): Rref {
    const rows = input.length;
    const cols = rows > 0 ? input[0]!.length : 0;
    const M = input.map((row) => row.map((f) => f.clone()));
    const pivotCols: number[] = [];
    let lead = 0;
    for (let r = 0; r < rows; r++) {
        if (lead >= cols) break;
        let i = r;
        while (i < rows && M[i]![lead]!.isZero()) i++;
        if (i === rows) {
            lead++;
            r--;
            continue;
        }
        [M[i]!, M[r]!] = [M[r]!, M[i]!];
        const pivot = M[r]![lead]!;
        for (let j = 0; j < cols; j++) M[r]![j] = M[r]![j]!.div(pivot);
        for (let i2 = 0; i2 < rows; i2++) {
            if (i2 === r) continue;
            const factor = M[i2]![lead]!;
            if (!factor.isZero()) {
                for (let j = 0; j < cols; j++) {
                    M[i2]![j] = M[i2]![j]!.sub(factor.mul(M[r]![j]!));
                }
            }
        }
        pivotCols.push(lead);
        lead++;
    }
    const pivotSet = new Set(pivotCols);
    const freeCols: number[] = [];
    for (let j = 0; j < cols; j++) if (!pivotSet.has(j)) freeCols.push(j);
    return { matrix: M, pivotCols, freeCols };
}

/**
 * Solve the homogeneous system, returning a rational nullspace vector.
 *
 * Contract (relied on by the public tests): the first free column is set to
 * one, all other free columns to zero, then pivot values are back-substituted.
 * Throws `Unbalanceable equation` when the system has full column rank.
 */
export function solveSystem(matrix: Fraction[][], cols: number): Fraction[] {
    const rows = matrix.length;
    if (rows === 0) return Array.from({ length: cols }, () => Fraction.one());
    const { matrix: M, pivotCols, freeCols } = rref(matrix);
    if (freeCols.length === 0) throw new Error("Unbalanceable equation");

    const result: Fraction[] = Array.from({ length: cols }, () => Fraction.zero());
    result[freeCols[0]!] = Fraction.one();
    for (let r = pivotCols.length - 1; r >= 0; r--) {
        const pivot = pivotCols[r]!;
        let sum = Fraction.zero();
        for (let j = 0; j < cols; j++) {
            if (j !== pivot && !M[r]![j]!.isZero()) sum = sum.add(M[r]![j]!.mul(result[j]!));
        }
        result[pivot] = sum.neg();
    }
    return result;
}

/** Scale a rational vector to the smallest integer vector (sign-normalised). */
export function fractionsToIntegers(fracs: Fraction[]): number[] {
    let denLcm = 1;
    for (const f of fracs) if (!f.isZero()) denLcm = lcm(denLcm, Math.abs(f.den));
    let ints = fracs.map((f) => {
        const sign = f.num < 0 ? -1 : 1;
        return sign * Math.abs(f.num) * (denLcm / Math.abs(f.den));
    });
    let g = 0;
    for (const v of ints) g = gcd(Math.abs(v), g);
    if (g > 1) ints = ints.map((v) => v / g);
    let negCount = 0;
    let posCount = 0;
    for (const v of ints) {
        if (v < 0) negCount++;
        if (v > 0) posCount++;
    }
    if (negCount > posCount) {
        ints = ints.map((v) => -v);
        g = 0;
        for (const v of ints) g = gcd(Math.abs(v), g);
        if (g > 1) ints = ints.map((v) => v / g);
    }
    return ints;
}

/* ------------------------------------------------------------------ */
/* Exact BigInt rational arithmetic                                   */
/* ------------------------------------------------------------------ */

interface Bf {
    n: bigint;
    d: bigint;
}

const B0 = BigInt(0);
const B1 = BigInt(1);

function bgcd(a: bigint, b: bigint): bigint {
    if (a < B0) a = -a;
    if (b < B0) b = -b;
    while (b !== B0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}

function blcm(a: bigint, b: bigint): bigint {
    if (a === B0 || b === B0) return B0;
    return (a / bgcd(a, b)) * b;
}

function bf(n: bigint, d: bigint): Bf {
    if (d < B0) {
        n = -n;
        d = -d;
    }
    if (d === B0) return { n: B0, d: B1 };
    const g = bgcd(n, d);
    if (g > B1) {
        n = n / g;
        d = d / g;
    }
    return { n, d };
}

const bzero = (): Bf => ({ n: B0, d: B1 });
const bone = (): Bf => ({ n: B1, d: B1 });
const badd = (a: Bf, b: Bf): Bf => bf(a.n * b.d + b.n * a.d, a.d * b.d);
const bsub = (a: Bf, b: Bf): Bf => bf(a.n * b.d - b.n * a.d, a.d * b.d);
const bmul = (a: Bf, b: Bf): Bf => bf(a.n * b.n, a.d * b.d);
const bdiv = (a: Bf, b: Bf): Bf => bf(a.n * b.d, a.d * b.n);
const bneg = (a: Bf): Bf => ({ n: -a.n, d: a.d });
const bisZero = (a: Bf): boolean => a.n === B0;

const BMAX_SAFE = BigInt(Number.MAX_SAFE_INTEGER);

function btoNumber(a: Bf): number | null {
    if (a.n > BMAX_SAFE || -a.n > BMAX_SAFE) return null;
    return Number(a.n) / Number(a.d);
}

function rrefBig(input: Bf[][]): { R: Bf[][]; pivotCols: number[]; freeCols: number[] } {
    const rows = input.length;
    const cols = rows > 0 ? input[0]!.length : 0;
    const M: Bf[][] = input.map((row) => row.map((v) => ({ n: v.n, d: v.d })));
    const pivotCols: number[] = [];
    let lead = 0;
    for (let r = 0; r < rows; r++) {
        if (lead >= cols) break;
        let i = r;
        while (i < rows && bisZero(M[i]![lead]!)) i++;
        if (i === rows) {
            lead++;
            r--;
            continue;
        }
        const tmp = M[i]!;
        M[i] = M[r]!;
        M[r] = tmp;
        const pivot = M[r]![lead]!;
        for (let j = 0; j < cols; j++) M[r]![j] = bdiv(M[r]![j]!, pivot);
        for (let i2 = 0; i2 < rows; i2++) {
            if (i2 === r) continue;
            const factor = M[i2]![lead]!;
            if (!bisZero(factor)) {
                for (let j = 0; j < cols; j++) {
                    M[i2]![j] = bsub(M[i2]![j]!, bmul(factor, M[r]![j]!));
                }
            }
        }
        pivotCols.push(lead);
        lead++;
    }
    const pivotSet = new Set(pivotCols);
    const freeCols: number[] = [];
    for (let j = 0; j < cols; j++) if (!pivotSet.has(j)) freeCols.push(j);
    return { R: M, pivotCols, freeCols };
}

/**
 * Find the smallest all-positive integer solution of the homogeneous system.
 *
 * The free coordinates of any all-positive solution are themselves positive
 * (they are species coefficients), so only positive integer free assignments
 * are explored. Candidates are ordered by free-coordinate sum; total sum is
 * always >= the free sum, so the search stops once the free sum reaches the
 * best total found. Returns null if no positive solution exists.
 */
export function solvePositive(matrix: Fraction[][], cols: number): number[] | null {
    const rows = matrix.length;
    if (rows === 0) return Array.from({ length: cols }, () => 1);

    const M: Bf[][] = matrix.map((row) =>
        row.map((f) => bf(BigInt(f.num), BigInt(f.den)))
    );
    const { R, pivotCols, freeCols } = rrefBig(M);
    if (freeCols.length === 0) return null;

    const d = freeCols.length;
    const pivotOfRow: Array<[number, number]> = pivotCols.map((p, r): [number, number] => [p, r]);

    const compute = (t: number[]): Bf[] | null => {
        const x: Bf[] = Array.from({ length: cols }, bzero);
        for (let k = 0; k < d; k++) x[freeCols[k]!] = bf(BigInt(t[k]!), B1);
        for (const [pivot, r] of pivotOfRow) {
            let sum = bzero();
            for (let k = 0; k < d; k++) {
                const f = freeCols[k]!;
                const coef = R[r]![f]!;
                if (!bisZero(coef)) sum = badd(sum, bmul(coef, x[f]!));
            }
            x[pivot] = bneg(sum);
        }
        for (const v of x) if (v.n <= B0) return null;
        return x;
    };

    const primitive = (x: Bf[]): number[] | null => {
        let denLcm = B1;
        for (const v of x) denLcm = blcm(denLcm, v.d);
        const ints: bigint[] = x.map((v) => (v.n * denLcm) / v.d);
        let g = B0;
        for (const v of ints) g = bgcd(g, v);
        const out: number[] = [];
        for (const v of ints) {
            const reduced = g > B1 ? v / g : v;
            if (reduced <= B0 || reduced > BMAX_SAFE) return null;
            out.push(Number(reduced));
        }
        return out;
    };

    if (d === 1) {
        const x = compute([1]);
        if (x === null) return null;
        return primitive(x);
    }

    const MAX_SUM = 64;
    const NODE_CAP = 2000000;
    let nodes = 0;
    let best: number[] | null = null;
    let bestSum = Infinity;

    const tryVector = (t: number[]): void => {
        const x = compute(t);
        if (x === null) return;
        const prim = primitive(x);
        if (prim === null) return;
        let sum = 0;
        for (const v of prim) sum += v;
        if (sum < bestSum) {
            bestSum = sum;
            best = prim;
        }
    };

    const enumerate = (idx: number, remaining: number, acc: number[]): boolean => {
        if (nodes > NODE_CAP) return true;
        if (idx === d) {
            if (remaining !== 0) return false;
            nodes++;
            tryVector(acc.slice());
            return nodes > NODE_CAP;
        }
        const slots = d - idx - 1;
        for (let v = 1; v <= remaining - slots; v++) {
            acc.push(v);
            const stop = enumerate(idx + 1, remaining - v, acc);
            acc.pop();
            if (stop) return true;
        }
        return false;
    };

    for (let sum = d; sum <= MAX_SUM && sum < bestSum; sum++) {
        const stop = enumerate(0, sum, []);
        if (stop) break;
    }

    if (best !== null) return best;
    return null;
}

/**
 * All independent positive solutions: one for each free direction that admits
 * a positive solution, plus the minimal solution. Useful for underdetermined
 * systems where more than one balance exists.
 */
export function solveAllPositive(matrix: Fraction[][], cols: number): number[][] {
    const results: number[][] = [];
    const minimal = solvePositive(matrix, cols);
    if (minimal !== null) results.push(minimal);

    const rows = matrix.length;
    if (rows === 0) return results;
    const M: Bf[][] = matrix.map((row) => row.map((f) => bf(BigInt(f.num), BigInt(f.den))));
    const { R, pivotCols, freeCols } = rrefBig(M);
    if (freeCols.length <= 1) return results;

    const d = freeCols.length;
    const pivotOfRow: Array<[number, number]> = pivotCols.map((p, r): [number, number] => [p, r]);
    const compute = (t: number[]): Bf[] | null => {
        const x: Bf[] = Array.from({ length: cols }, bzero);
        for (let k = 0; k < d; k++) x[freeCols[k]!] = bf(BigInt(t[k]!), B1);
        for (const [pivot, r] of pivotOfRow) {
            let sum = bzero();
            for (let k = 0; k < d; k++) {
                const f = freeCols[k]!;
                const coef = R[r]![f]!;
                if (!bisZero(coef)) sum = badd(sum, bmul(coef, x[f]!));
            }
            x[pivot] = bneg(sum);
        }
        for (const v of x) if (v.n <= B0) return null;
        return x;
    };
    const primitive = (x: Bf[]): number[] | null => {
        let denLcm = B1;
        for (const v of x) denLcm = blcm(denLcm, v.d);
        const ints: bigint[] = x.map((v) => (v.n * denLcm) / v.d);
        let g = B0;
        for (const v of ints) g = bgcd(g, v);
        const out: number[] = [];
        for (const v of ints) {
            const reduced = g > B1 ? v / g : v;
            if (reduced <= B0 || reduced > BMAX_SAFE) return null;
            out.push(Number(reduced));
        }
        return out;
    };
    const push = (p: number[] | null): void => {
        if (p === null) return;
        if (!results.some((r) => r.length === p.length && r.every((v, i) => v === p[i]))) {
            results.push(p);
        }
    };
    for (let k = 0; k < d; k++) {
        const t = new Array<number>(d).fill(0);
        t[k] = 1;
        const x = compute(t);
        if (x !== null) push(primitive(x));
    }
    const all = compute(new Array<number>(d).fill(1));
    if (all !== null) push(primitive(all));
    return results;
}

/** Verify conservation of every element and of charge for a solution. */
export function verifyConservation(
    reactants: SpeciesInput[],
    products: SpeciesInput[],
    coeffs: number[]
): boolean {
    const totals: Record<string, number> = {};
    let charge = 0;
    const n = reactants.length;
    const all = [...reactants, ...products];
    for (let i = 0; i < all.length; i++) {
        const c = coeffs[i]!;
        const sign = i < n ? 1 : -1;
        const sp = all[i]!;
        for (const el in sp.elements) totals[el] = (totals[el] ?? 0) + sign * c * sp.elements[el]!;
        charge += sign * c * sp.charge;
    }
    if (charge !== 0) return false;
    for (const el in totals) if (totals[el] !== 0) return false;
    return true;
}

export { parseError };
export type { Species };
