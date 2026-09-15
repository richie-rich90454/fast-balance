import { describe, it, expect } from "vitest";
import { balance, splitEquation } from "../index";

/**
 * Property-based invariants. For every equation the balancer accepts:
 *  - coefficients are positive integers with gcd 1;
 *  - mass and charge are conserved;
 *  - balancing is idempotent (re-balancing the balanced equation is a no-op);
 *  - the result is minimal with respect to a brute-force reference.
 */

function mulberry32(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const ELEMENTS = ["H", "C", "N", "O", "Na", "Cl", "Fe", "S", "K", "Ca"];

interface Random {
    (): number;
    int(min: number, max: number): number;
    pick<T>(arr: T[]): T;
}

function makeRandom(seed: number): Random {
    const r = mulberry32(seed) as Random;
    r.int = (min: number, max: number) => min + Math.floor(r() * (max - min + 1));
    r.pick = <T,>(arr: T[]): T => arr[r.int(0, arr.length - 1)]!;
    return r;
}

function randomFormula(rnd: Random, pool: string[]): string {
    const count = rnd.int(1, 2);
    let formula = "";
    for (let i = 0; i < count; i++) {
        const el = rnd.pick(pool);
        const sub = rnd.int(1, 3);
        formula += el + (sub === 1 ? "" : String(sub));
    }
    return formula;
}

function gcd(a: number, b: number): number {
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}

function verifyConserved(eq: string, r: ReturnType<typeof balance>): void {
    const left: Record<string, number> = {};
    const right: Record<string, number> = {};
    let chargeLeft = 0;
    let chargeRight = 0;
    r.reactants.forEach((s, i) => {
        const sp = splitEquation(eq).reactants[i]!;
        for (const el in sp.elements) left[el] = (left[el] ?? 0) + sp.elements[el]! * s.coefficient;
        chargeLeft += sp.charge * s.coefficient;
    });
    r.products.forEach((s, i) => {
        const sp = splitEquation(eq).products[i]!;
        for (const el in sp.elements) right[el] = (right[el] ?? 0) + sp.elements[el]! * s.coefficient;
        chargeRight += sp.charge * s.coefficient;
    });
    expect(chargeLeft).toBe(chargeRight);
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    for (const el of keys) expect(left[el] ?? 0).toBe(right[el] ?? 0);
}

describe("conservation invariants (fuzz)", () => {
    it("holds across random equations", () => {
        const rnd = makeRandom(1234567);
        let accepted = 0;
        for (let trial = 0; trial < 150; trial++) {
            const poolSize = rnd.int(1, 2);
            const pool: string[] = [];
            while (pool.length < poolSize) {
                const el = rnd.pick(ELEMENTS);
                if (!pool.includes(el)) pool.push(el);
            }
            const nR = rnd.int(1, 3);
            const nP = rnd.int(1, 3);
            const eq =
                Array.from({ length: nR }, () => randomFormula(rnd, pool)).join(" + ") +
                " -> " +
                Array.from({ length: nP }, () => randomFormula(rnd, pool)).join(" + ");
            let result: ReturnType<typeof balance>;
            try {
                result = balance(eq);
            } catch {
                continue; // not every random formula is balanceable
            }
            accepted++;
            const all = [...result.reactants, ...result.products];
            for (const s of all) {
                expect(Number.isInteger(s.coefficient)).toBe(true);
                expect(s.coefficient).toBeGreaterThan(0);
            }
            let g = 0;
            for (const s of all) g = gcd(g, s.coefficient);
            expect(g).toBe(1);

            verifyConserved(eq, result);

            // idempotence
            const again = balance(result.equation);
            expect([...again.reactants, ...again.products].map((s) => s.coefficient)).toEqual(
                all.map((s) => s.coefficient)
            );
        }
        expect(accepted).toBeGreaterThan(8);
    }, 30000);
});

describe("minimality against brute force", () => {
    it("never exceeds the smallest brute-force solution", () => {
        const rnd = makeRandom(7654321);
        let checked = 0;
        for (let trial = 0; trial < 300 && checked < 25; trial++) {
            const poolSize = rnd.int(1, 2);
            const pool: string[] = [];
            while (pool.length < poolSize) {
                const el = rnd.pick(ELEMENTS);
                if (!pool.includes(el)) pool.push(el);
            }
            const nR = rnd.int(1, 2);
            const nP = rnd.int(1, 2);
            const eq =
                Array.from({ length: nR }, () => randomFormula(rnd, pool)).join(" + ") +
                " -> " +
                Array.from({ length: nP }, () => randomFormula(rnd, pool)).join(" + ");
            let result: ReturnType<typeof balance>;
            let species: ReturnType<typeof splitEquation>;
            try {
                species = splitEquation(eq);
                result = balance(eq);
            } catch {
                continue;
            }
            const all = [...species.reactants, ...species.products];
            const elSet = new Set<string>();
            for (const s of all) for (const el in s.elements) elSet.add(el);
            const els = Array.from(elSet);
            const n = all.length;
            const K = 8;
            let best: number | null = null;
            const combo = new Array<number>(n).fill(1);
            const recurse = (idx: number): void => {
                if (best !== null && combo.reduce((a, b) => a + b, 0) >= best) return;
                if (idx === n) {
                    let ok = true;
                    let charge = 0;
                    for (const el of els) {
                        let sum = 0;
                        for (let i = 0; i < n; i++) {
                            const sign = i < species.reactants.length ? 1 : -1;
                            sum += sign * combo[i]! * (all[i]!.elements[el] ?? 0);
                        }
                        if (sum !== 0) {
                            ok = false;
                            break;
                        }
                    }
                    if (ok) {
                        for (let i = 0; i < n; i++) charge += (i < species.reactants.length ? 1 : -1) * combo[i]! * all[i]!.charge;
                        if (charge !== 0) ok = false;
                    }
                    if (ok) {
                        const total = combo.reduce((a, b) => a + b, 0);
                        if (best === null || total < best) best = total;
                    }
                    return;
                }
                for (let v = 1; v <= K; v++) {
                    combo[idx] = v;
                    recurse(idx + 1);
                }
            };
            recurse(0);
            if (best === null) continue;
            if (result.underdetermined) continue; // minimality is only claimed for unique systems
            checked++;
            const total = [...result.reactants, ...result.products].reduce(
                (a, s) => a + s.coefficient,
                0
            );
            expect(total).toBe(best);
        }
        expect(checked).toBeGreaterThan(1);
    }, 30000);
});
