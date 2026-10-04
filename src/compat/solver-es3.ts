/** ES3-compatible solver backend (new file, additive only).
 *
 * Same exported contract as `solver.ts` (`buildMatrix`, `rref`,
 * `solveSystem`, `fractionsToIntegers`, `solvePositive`,
 * `solveAllPositive`, `verifyConservation`, plus `parseError` re-export).
 * `src/solver.ts` is never edited; the legacy build swaps this file in.
 *
 * Exactness without `BigInt`: base-1e7 limb integers with the same RREF +
 * smallest-positive search as `solver.ts`, so results are identical.
 * Avoids `Set`, `Array.from`, `??`, `?.` to minimize shim load.
 */
import { Fraction, gcd, lcm } from "../fraction";
import { parseError } from "../errors";
import type { ElementMap, Species } from "../parse";

export interface SpeciesInput {
    elements: ElementMap;
    charge: number;
}

export function buildMatrix(
    reactants: SpeciesInput[],
    products: SpeciesInput[],
): { matrix: Fraction[][]; cols: number } {
    const species: SpeciesInput[] = [];
    var i: number;
    var j: number;
    for (i = 0; i < reactants.length; i++) {
        species.push(reactants[i]!);
    }
    for (i = 0; i < products.length; i++) {
        species.push(products[i]!);
    }
    const seen: Record<string, boolean> = {};
    for (i = 0; i < species.length; i++) {
        const els = species[i]!.elements;
        for (const el in els) {
            seen[el] = true;
        }
    }
    const elements: string[] = [];
    for (const el in seen) {
        elements.push(el);
    }
    elements.sort();
    var hasCharge = false;
    for (i = 0; i < species.length; i++) {
        if (species[i]!.charge !== 0) {
            hasCharge = true;
            break;
        }
    }
    const rows = elements.length + (hasCharge ? 1 : 0);
    const cols = species.length;
    const M: Fraction[][] = [];
    for (i = 0; i < rows; i++) {
        const row: Fraction[] = [];
        for (j = 0; j < cols; j++) {
            row.push(Fraction.zero());
        }
        M.push(row);
    }
    for (j = 0; j < cols; j++) {
        const isReactant = j < reactants.length;
        const sign = isReactant ? 1 : -1;
        const sp = species[j]!;
        for (i = 0; i < elements.length; i++) {
            const el = elements[i]!;
            const v = sp.elements[el];
            const val = v === undefined ? 0 : v;
            M[i]![j] = new Fraction(sign * val);
        }
        if (hasCharge) {
            M[rows - 1]![j] = new Fraction(sign * sp.charge);
        }
    }
    if (rows === 0) {
        const single: Fraction[] = [];
        for (j = 0; j < cols; j++) {
            single.push(Fraction.zero());
        }
        return { matrix: [single], cols: cols };
    }
    return { matrix: M, cols: cols };
}

export interface Rref {
    matrix: Fraction[][];
    pivotCols: number[];
    freeCols: number[];
}

export function rref(input: Fraction[][]): Rref {
    const rows = input.length;
    const cols = rows > 0 ? input[0]!.length : 0;
    const M: Fraction[][] = [];
    for (var r = 0; r < rows; r++) {
        const row: Fraction[] = [];
        for (var c = 0; c < cols; c++) {
            row.push(input[r]![c]!.clone());
        }
        M.push(row);
    }
    const pivotCols: number[] = [];
    var lead = 0;
    for (var r2 = 0; r2 < rows; r2++) {
        if (lead >= cols) {
            break;
        }
        var i = r2;
        while (i < rows && M[i]![lead]!.isZero()) {
            i++;
        }
        if (i === rows) {
            lead++;
            r2--;
            continue;
        }
        const tmp = M[i]!;
        M[i] = M[r2]!;
        M[r2] = tmp;
        const pivot = M[r2]![lead]!;
        for (var j = 0; j < cols; j++) {
            M[r2]![j] = M[r2]![j]!.div(pivot);
        }
        for (var i2 = 0; i2 < rows; i2++) {
            if (i2 === r2) {
                continue;
            }
            const factor = M[i2]![lead]!;
            if (!factor.isZero()) {
                for (var j2 = 0; j2 < cols; j2++) {
                    M[i2]![j2] = M[i2]![j2]!.sub(factor.mul(M[r2]![j2]!));
                }
            }
        }
        pivotCols.push(lead);
        lead++;
    }
    const isPivot: Record<number, boolean> = {};
    for (var p = 0; p < pivotCols.length; p++) {
        isPivot[pivotCols[p]!] = true;
    }
    const freeCols: number[] = [];
    for (var j3 = 0; j3 < cols; j3++) {
        if (!isPivot[j3]) {
            freeCols.push(j3);
        }
    }
    return { matrix: M, pivotCols: pivotCols, freeCols: freeCols };
}

export function solveSystem(matrix: Fraction[][], cols: number): Fraction[] {
    const rows = matrix.length;
    if (rows === 0) {
        const out: Fraction[] = [];
        for (var i = 0; i < cols; i++) {
            out.push(Fraction.one());
        }
        return out;
    }
    const rr = rref(matrix);
    const M = rr.matrix;
    const pivotCols = rr.pivotCols;
    const freeCols = rr.freeCols;
    if (freeCols.length === 0) {
        throw new Error("Unbalanceable equation");
    }
    const result: Fraction[] = [];
    for (var k = 0; k < cols; k++) {
        result.push(Fraction.zero());
    }
    result[freeCols[0]!] = Fraction.one();
    for (var r = pivotCols.length - 1; r >= 0; r--) {
        const pivot = pivotCols[r]!;
        var sum = Fraction.zero();
        for (var j = 0; j < cols; j++) {
            if (j !== pivot && !M[r]![j]!.isZero()) {
                sum = sum.add(M[r]![j]!.mul(result[j]!));
            }
        }
        result[pivot] = sum.neg();
    }
    return result;
}

export function fractionsToIntegers(fracs: Fraction[]): number[] {
    var denLcm = 1;
    for (var i = 0; i < fracs.length; i++) {
        const f = fracs[i]!;
        if (!f.isZero()) {
            denLcm = lcm(denLcm, Math.abs(f.den));
        }
    }
    var ints: number[] = [];
    for (var k = 0; k < fracs.length; k++) {
        const f2 = fracs[k]!;
        const sign = f2.num < 0 ? -1 : 1;
        ints.push(sign * Math.abs(f2.num) * (denLcm / Math.abs(f2.den)));
    }
    var g = 0;
    for (var v = 0; v < ints.length; v++) {
        g = gcd(Math.abs(ints[v]!), g);
    }
    if (g > 1) {
        const out: number[] = [];
        for (var q = 0; q < ints.length; q++) {
            out.push(ints[q]! / g);
        }
        ints = out;
    }
    var negCount = 0;
    var posCount = 0;
    for (var s = 0; s < ints.length; s++) {
        if (ints[s]! < 0) {
            negCount++;
        }
        if (ints[s]! > 0) {
            posCount++;
        }
    }
    if (negCount > posCount) {
        const flipped: number[] = [];
        for (var f3 = 0; f3 < ints.length; f3++) {
            flipped.push(-ints[f3]!);
        }
        ints = flipped;
        g = 0;
        for (var v2 = 0; v2 < ints.length; v2++) {
            g = gcd(Math.abs(ints[v2]!), g);
        }
        if (g > 1) {
            const out2: number[] = [];
            for (var q2 = 0; q2 < ints.length; q2++) {
                out2.push(ints[q2]! / g);
            }
            ints = out2;
        }
    }
    return ints;
}

/* ------------------------------------------------------------------ */
/* Exact base-1e7 limb integers (no BigInt)                           */
/* ------------------------------------------------------------------ */

const LIMB_BASE = 10000000;
const MAX_SAFE = 9007199254740991;

interface Limb {
    neg: boolean;
    d: number[];
}

function limbZero(): Limb {
    return { neg: false, d: [] };
}

function limbOne(): Limb {
    return { neg: false, d: [1] };
}

function limbTrim(d: number[]): number[] {
    var n = d.length;
    while (n > 0 && d[n - 1] === 0) {
        n--;
    }
    return d.slice(0, n);
}

function limbFromNumber(n: number): Limb {
    if (n === 0) {
        return limbZero();
    }
    const neg = n < 0;
    var a = Math.floor(neg ? -n : n);
    const d: number[] = [];
    while (a > 0) {
        d.push(a % LIMB_BASE);
        a = Math.floor(a / LIMB_BASE);
    }
    return { neg: neg, d: d };
}

function limbIsZero(a: Limb): boolean {
    return a.d.length === 0;
}

function limbAbsCmp(a: Limb, b: Limb): number {
    if (a.d.length !== b.d.length) {
        return a.d.length < b.d.length ? -1 : 1;
    }
    for (var i = a.d.length - 1; i >= 0; i--) {
        if (a.d[i] !== b.d[i]) {
            return a.d[i]! < b.d[i]! ? -1 : 1;
        }
    }
    return 0;
}

function limbCmp(a: Limb, b: Limb): number {
    const az = limbIsZero(a);
    const bz = limbIsZero(b);
    if (az && bz) {
        return 0;
    }
    if (!a.neg && b.neg) {
        return 1;
    }
    if (a.neg && !b.neg) {
        return -1;
    }
    const c = limbAbsCmp(a, b);
    return a.neg ? -c : c;
}

function limbNeg(a: Limb): Limb {
    if (limbIsZero(a)) {
        return limbZero();
    }
    return { neg: !a.neg, d: a.d.slice(0) };
}

function limbAbsAdd(a: Limb, b: Limb): Limb {
    const n = Math.max(a.d.length, b.d.length);
    const out: number[] = [];
    var carry = 0;
    for (var i = 0; i < n; i++) {
        const av = i < a.d.length ? a.d[i]! : 0;
        const bv = i < b.d.length ? b.d[i]! : 0;
        const s = av + bv + carry;
        out.push(s % LIMB_BASE);
        carry = Math.floor(s / LIMB_BASE);
    }
    if (carry > 0) {
        out.push(carry);
    }
    return { neg: false, d: limbTrim(out) };
}

/* assumes |a| >= |b|, both non-negative */
function limbAbsSub(a: Limb, b: Limb): Limb {
    const out: number[] = [];
    var borrow = 0;
    for (var i = 0; i < a.d.length; i++) {
        const av = a.d[i]!;
        const bv = i < b.d.length ? b.d[i]! : 0;
        var cur = av - borrow - bv;
        if (cur < 0) {
            cur += LIMB_BASE;
            borrow = 1;
        } else {
            borrow = 0;
        }
        out.push(cur);
    }
    return { neg: false, d: limbTrim(out) };
}

function limbAdd(a: Limb, b: Limb): Limb {
    if (limbIsZero(a)) {
        return { neg: b.neg, d: b.d.slice(0) };
    }
    if (limbIsZero(b)) {
        return { neg: a.neg, d: a.d.slice(0) };
    }
    if (a.neg === b.neg) {
        const s = limbAbsAdd(a, b);
        s.neg = a.neg;
        return s;
    }
    const c = limbAbsCmp(a, b);
    if (c === 0) {
        return limbZero();
    }
    if (c > 0) {
        const s2 = limbAbsSub(a, b);
        s2.neg = a.neg;
        return s2;
    }
    const s3 = limbAbsSub(b, a);
    s3.neg = b.neg;
    return s3;
}

function limbSub(a: Limb, b: Limb): Limb {
    return limbAdd(a, limbNeg(b));
}

function limbMul(a: Limb, b: Limb): Limb {
    if (limbIsZero(a) || limbIsZero(b)) {
        return limbZero();
    }
    const m = a.d.length;
    const n = b.d.length;
    const out: number[] = [];
    for (var i = 0; i < m + n; i++) {
        out.push(0);
    }
    for (var x = 0; x < m; x++) {
        var carry = 0;
        for (var y = 0; y < n; y++) {
            const total = out[x + y]! + a.d[x]! * b.d[y]! + carry;
            out[x + y] = total % LIMB_BASE;
            carry = Math.floor(total / LIMB_BASE);
        }
        out[x + n] = out[x + n]! + carry;
    }
    return { neg: a.neg !== b.neg, d: limbTrim(out) };
}

/*
 * Division with truncating semantics (like BigInt `/` and `%`).
 * Quotient accumulates by shifting: at each step the new quotient is
 * Q = Q * BASE + digit, so no position bookkeeping can drift.
 */
function limbDivMod(a: Limb, b: Limb): { q: Limb; r: Limb } {
    if (limbIsZero(b)) {
        throw new Error("Division by zero");
    }
    const aneg = a.neg;
    const bneg = b.neg;
    const aa: Limb = { neg: false, d: a.d.slice(0) };
    const bb: Limb = { neg: false, d: b.d.slice(0) };
    if (limbAbsCmp(aa, bb) < 0) {
        const rr: Limb = { neg: aneg, d: aa.d.slice(0) };
        if (limbIsZero(rr)) {
            rr.neg = false;
        }
        return { q: limbZero(), r: rr };
    }
    var q: Limb = limbZero();
    var rem: Limb = limbZero();
    var base = limbFromNumber(LIMB_BASE);
    void base;
    for (var j = aa.d.length - 1; j >= 0; j--) {
        rem = limbAdd(limbMul(rem, limbFromNumber(LIMB_BASE)), limbFromNumber(aa.d[j]!));
        if (limbAbsCmp(rem, bb) < 0) {
            q = limbMul(q, limbFromNumber(LIMB_BASE));
            continue;
        }
        var dhat = estimateQuotientDigit(rem, bb);
        var prod = limbMul(bb, limbFromNumber(dhat));
        while (limbAbsCmp(prod, rem) > 0) {
            dhat--;
            prod = limbMul(bb, limbFromNumber(dhat));
        }
        var diff = limbAbsSub(rem, prod);
        while (limbAbsCmp(diff, bb) >= 0) {
            dhat++;
            diff = limbAbsSub(diff, bb);
        }
        rem = diff;
        q = limbAdd(limbMul(q, limbFromNumber(LIMB_BASE)), limbFromNumber(dhat));
    }
    if (aneg !== bneg && !limbIsZero(q)) {
        q.neg = true;
    }
    if (aneg && !limbIsZero(rem)) {
        rem.neg = true;
    }
    return { q: q, r: rem };
}

/* Single base-digit estimate in [0, BASE-1] from leading limbs. */
function estimateQuotientDigit(rem: Limb, bb: Limb): number {
    const m = bb.d.length;
    const top: number = bb.d[m - 1]!;
    var est: number;
    if (rem.d.length === m) {
        var ru = rem.d[m - 1]!;
        if (m > 1) {
            ru = ru * LIMB_BASE + rem.d[m - 2]!;
            est = Math.floor(ru / top);
        } else {
            est = Math.floor(ru / top);
        }
    } else {
        /* rem.d.length === m + 1 (invariant rem < bb * BASE) */
        var hi = rem.d[m]!;
        var lo = rem.d[m - 1]!;
        est = Math.floor((hi * LIMB_BASE + lo) / top);
    }
    if (est >= LIMB_BASE) {
        est = LIMB_BASE - 1;
    }
    if (est < 0) {
        est = 0;
    }
    return est;
}

function limbMod(a: Limb, b: Limb): Limb {
    return limbDivMod(a, b).r;
}

function limbDivExact(a: Limb, b: Limb): Limb {
    return limbDivMod(a, b).q;
}

function limbGcd(a: Limb, b: Limb): Limb {
    var x: Limb = { neg: false, d: a.d.slice(0) };
    var y: Limb = { neg: false, d: b.d.slice(0) };
    while (!limbIsZero(y)) {
        const t = limbMod(x, y);
        x = y;
        y = t;
    }
    return x;
}

function limbToNumber(a: Limb): number | null {
    var v = 0;
    for (var i = a.d.length - 1; i >= 0; i--) {
        v = v * LIMB_BASE + a.d[i]!;
        if (v > MAX_SAFE) {
            return null;
        }
    }
    return a.neg ? -v : v;
}

/* ------------------------------------------------------------------ */
/* Rational layer over limbs                                          */
/* ------------------------------------------------------------------ */

interface LF {
    n: Limb;
    d: Limb;
}

function lf(nn: Limb, dd: Limb): LF {
    var n = nn;
    var d = dd;
    if (limbCmp(d, limbZero()) < 0) {
        n = limbNeg(n);
        d = limbNeg(d);
    }
    if (limbIsZero(d)) {
        return { n: limbZero(), d: limbOne() };
    }
    const g = limbGcd(n, d);
    if (!limbIsZero(g) && limbCmp(g, limbOne()) > 0) {
        n = limbDivExact(n, g);
        d = limbDivExact(d, g);
    }
    return { n: n, d: d };
}

function lzero(): LF {
    return { n: limbZero(), d: limbOne() };
}

function ladd(a: LF, b: LF): LF {
    return lf(limbAdd(limbMul(a.n, b.d), limbMul(b.n, a.d)), limbMul(a.d, b.d));
}

function lsub(a: LF, b: LF): LF {
    return lf(limbSub(limbMul(a.n, b.d), limbMul(b.n, a.d)), limbMul(a.d, b.d));
}

function lmul(a: LF, b: LF): LF {
    return lf(limbMul(a.n, b.n), limbMul(a.d, b.d));
}

function ldiv(a: LF, b: LF): LF {
    return lf(limbMul(a.n, b.d), limbMul(a.d, b.n));
}

function lneg(a: LF): LF {
    return { n: limbNeg(a.n), d: { neg: false, d: a.d.d.slice(0) } };
}

function lisZero(a: LF): boolean {
    return limbIsZero(a.n);
}

function llcm(a: Limb, b: Limb): Limb {
    if (limbIsZero(a) || limbIsZero(b)) {
        return limbZero();
    }
    const g = limbGcd(a, b);
    return limbMul(limbDivExact(a, g), b);
}

interface BigSolver {
    d: number;
    compute: (t: number[]) => LF[] | null;
    primitive: (x: LF[]) => number[] | null;
}

function limbSolver(matrix: Fraction[][], cols: number): BigSolver {
    const M: LF[][] = [];
    for (var i = 0; i < matrix.length; i++) {
        const row: LF[] = [];
        for (var j = 0; j < matrix[i]!.length; j++) {
            const f = matrix[i]![j]!;
            row.push(lf(limbFromNumber(f.num), limbFromNumber(f.den)));
        }
        M.push(row);
    }
    const rr = rrefLimb(M);
    const R = rr.R;
    const pivotCols = rr.pivotCols;
    const freeCols = rr.freeCols;
    const d = freeCols.length;
    const pivotOfRow: Array<[number, number]> = [];
    for (var p = 0; p < pivotCols.length; p++) {
        pivotOfRow.push([pivotCols[p]!, p]);
    }
    const compute = function (t: number[]): LF[] | null {
        const x: LF[] = [];
        for (var i2 = 0; i2 < cols; i2++) {
            x.push(lzero());
        }
        for (var k = 0; k < d; k++) {
            x[freeCols[k]!] = lf(limbFromNumber(t[k]!), limbOne());
        }
        for (var pr = 0; pr < pivotOfRow.length; pr++) {
            const pivot = pivotOfRow[pr]![0];
            const r = pivotOfRow[pr]![1];
            var sum = lzero();
            for (var k2 = 0; k2 < d; k2++) {
                const f = freeCols[k2]!;
                const coef = R[r]![f]!;
                if (!lisZero(coef)) {
                    sum = ladd(sum, lmul(coef, x[f]!));
                }
            }
            x[pivot] = lneg(sum);
        }
        for (var v = 0; v < x.length; v++) {
            if (limbCmp(x[v]!.n, limbZero()) <= 0) {
                return null;
            }
        }
        return x;
    };
    const primitive = function (x: LF[]): number[] | null {
        var denLcm = limbOne();
        for (var i3 = 0; i3 < x.length; i3++) {
            denLcm = llcm(denLcm, x[i3]!.d);
        }
        const ints: Limb[] = [];
        for (var j2 = 0; j2 < x.length; j2++) {
            ints.push(limbDivExact(limbMul(x[j2]!.n, denLcm), x[j2]!.d));
        }
        var g = limbZero();
        for (var q = 0; q < ints.length; q++) {
            g = limbGcd(g, ints[q]!);
        }
        const out: number[] = [];
        for (var s = 0; s < ints.length; s++) {
            var reduced = ints[s]!;
            if (!limbIsZero(g) && limbCmp(g, limbOne()) > 0) {
                reduced = limbDivExact(ints[s]!, g);
            }
            if (limbCmp(reduced, limbZero()) <= 0) {
                return null;
            }
            const nv = limbToNumber(reduced);
            if (nv === null) {
                return null;
            }
            out.push(nv);
        }
        return out;
    };
    return { d: d, compute: compute, primitive: primitive };
}

function rrefLimb(input: LF[][]): { R: LF[][]; pivotCols: number[]; freeCols: number[] } {
    const rows = input.length;
    const cols = rows > 0 ? input[0]!.length : 0;
    const M: LF[][] = [];
    for (var i = 0; i < rows; i++) {
        const row: LF[] = [];
        for (var j = 0; j < cols; j++) {
            const v = input[i]![j]!;
            row.push({
                n: { neg: v.n.neg, d: v.n.d.slice(0) },
                d: { neg: false, d: v.d.d.slice(0) },
            });
        }
        M.push(row);
    }
    const pivotCols: number[] = [];
    var lead = 0;
    for (var r = 0; r < rows; r++) {
        if (lead >= cols) {
            break;
        }
        var x = r;
        while (x < rows && lisZero(M[x]![lead]!)) {
            x++;
        }
        if (x === rows) {
            lead++;
            r--;
            continue;
        }
        const tmp = M[x]!;
        M[x] = M[r]!;
        M[r] = tmp;
        const pivot = M[r]![lead]!;
        for (var j2 = 0; j2 < cols; j2++) {
            M[r]![j2] = ldiv(M[r]![j2]!, pivot);
        }
        for (var i2 = 0; i2 < rows; i2++) {
            if (i2 === r) {
                continue;
            }
            const factor = M[i2]![lead]!;
            if (!lisZero(factor)) {
                for (var j3 = 0; j3 < cols; j3++) {
                    M[i2]![j3] = lsub(M[i2]![j3]!, lmul(factor, M[r]![j3]!));
                }
            }
        }
        pivotCols.push(lead);
        lead++;
    }
    const isPivot: Record<number, boolean> = {};
    for (var p = 0; p < pivotCols.length; p++) {
        isPivot[pivotCols[p]!] = true;
    }
    const freeCols: number[] = [];
    for (var jf = 0; jf < cols; jf++) {
        if (!isPivot[jf]) {
            freeCols.push(jf);
        }
    }
    return { R: M, pivotCols: pivotCols, freeCols: freeCols };
}

export function solvePositive(matrix: Fraction[][], cols: number): number[] | null {
    if (matrix.length === 0) {
        const out: number[] = [];
        for (var i = 0; i < cols; i++) {
            out.push(1);
        }
        return out;
    }
    const solver = limbSolver(matrix, cols);
    const d = solver.d;
    if (d === 0) {
        return null;
    }
    if (d === 1) {
        const x = solver.compute([1]);
        return x === null ? null : solver.primitive(x);
    }
    const MAX_SUM = 64;
    const NODE_CAP = 2000000;
    var nodes = 0;
    var best: number[] | null = null;
    var bestSum = Infinity;
    const tryVector = function (t: number[]): void {
        const x = solver.compute(t);
        if (x === null) {
            return;
        }
        const prim = solver.primitive(x);
        if (prim === null) {
            return;
        }
        var sum = 0;
        for (var i2 = 0; i2 < prim.length; i2++) {
            sum += prim[i2]!;
        }
        if (sum < bestSum) {
            bestSum = sum;
            best = prim;
        }
    };
    const enumerate = function (idx: number, remaining: number, acc: number[]): boolean {
        if (nodes > NODE_CAP) {
            return true;
        }
        if (idx === d) {
            if (remaining !== 0) {
                return false;
            }
            nodes++;
            const cp: number[] = [];
            for (var i3 = 0; i3 < acc.length; i3++) {
                cp.push(acc[i3]!);
            }
            tryVector(cp);
            return nodes > NODE_CAP;
        }
        const slots = d - idx - 1;
        for (var v = 1; v <= remaining - slots; v++) {
            acc.push(v);
            const stop = enumerate(idx + 1, remaining - v, acc);
            acc.pop();
            if (stop) {
                return true;
            }
        }
        return false;
    };
    for (var sum = d; sum <= MAX_SUM && sum < bestSum; sum++) {
        const stop = enumerate(0, sum, []);
        if (stop) {
            break;
        }
    }
    return best;
}

export function solveAllPositive(matrix: Fraction[][], cols: number): number[][] {
    const results: number[][] = [];
    const minimal = solvePositive(matrix, cols);
    if (minimal !== null) {
        results.push(minimal);
    }
    if (matrix.length === 0) {
        return results;
    }
    const solver = limbSolver(matrix, cols);
    if (solver.d <= 1) {
        return results;
    }
    const push = function (p: number[] | null): void {
        if (p === null) {
            return;
        }
        for (var i = 0; i < results.length; i++) {
            const r = results[i]!;
            if (r.length === p.length) {
                var same = true;
                for (var k = 0; k < r.length; k++) {
                    if (r[k] !== p[k]) {
                        same = false;
                        break;
                    }
                }
                if (same) {
                    return;
                }
            }
        }
        results.push(p);
    };
    for (var k2 = 0; k2 < solver.d; k2++) {
        const t: number[] = [];
        for (var z = 0; z < solver.d; z++) {
            t.push(0);
        }
        t[k2] = 1;
        const x = solver.compute(t);
        if (x !== null) {
            push(solver.primitive(x));
        }
    }
    const all: number[] = [];
    for (var z2 = 0; z2 < solver.d; z2++) {
        all.push(1);
    }
    const xa = solver.compute(all);
    if (xa !== null) {
        push(solver.primitive(xa));
    }
    return results;
}

export function verifyConservation(
    reactants: SpeciesInput[],
    products: SpeciesInput[],
    coeffs: number[],
): boolean {
    const totals: Record<string, number> = {};
    var charge = 0;
    const n = reactants.length;
    const all: SpeciesInput[] = [];
    var i: number;
    for (i = 0; i < reactants.length; i++) {
        all.push(reactants[i]!);
    }
    for (i = 0; i < products.length; i++) {
        all.push(products[i]!);
    }
    for (i = 0; i < all.length; i++) {
        const c = coeffs[i]!;
        const sign = i < n ? 1 : -1;
        const sp = all[i]!;
        for (const el in sp.elements) {
            const cur = totals[el];
            totals[el] = (cur === undefined ? 0 : cur) + sign * c * sp.elements[el]!;
        }
        charge += sign * c * sp.charge;
    }
    if (charge !== 0) {
        return false;
    }
    for (const el2 in totals) {
        if (totals[el2] !== 0) {
            return false;
        }
    }
    return true;
}

export { parseError };
export type { Species };
