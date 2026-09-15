import { describe, it, expect } from "vitest";
import { balance, balanceAll } from "../index";

/**
 * Strict known-answer conformance tests.
 *
 * These assert EXACT coefficient vectors. They deliberately do not wrap calls
 * in try/catch: a valid equation that throws, or an invalid one that silently
 * "balances", must fail the suite.
 */

function coeffs(result: ReturnType<typeof balance>): number[] {
    return [...result.reactants, ...result.products].map((s) => s.coefficient);
}

describe("strict known-answer conformance", () => {
    const cases: Array<{ eq: string; expected: number[] }> = [
        { eq: "H2 + O2 -> H2O", expected: [2, 1, 2] },
        { eq: "CH4 + O2 -> CO2 + H2O", expected: [1, 2, 1, 2] },
        { eq: "Fe + O2 -> Fe2O3", expected: [4, 3, 2] },
        { eq: "Al + HCl -> AlCl3 + H2", expected: [2, 6, 2, 3] },
        { eq: "N2 + H2 -> NH3", expected: [1, 3, 2] },
        { eq: "Fe2O3 + CO -> Fe + CO2", expected: [1, 3, 2, 3] },
        { eq: "MnO4- + H+ + e- -> Mn2+ + H2O", expected: [1, 8, 5, 1, 4] },
        { eq: "Cr2O7^2- + Fe2+ + H+ -> Cr3+ + Fe3+ + H2O", expected: [1, 6, 14, 2, 6, 7] },
        { eq: "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O", expected: [2, 16, 2, 2, 5, 8] },
        { eq: "Cu + HNO3 -> Cu(NO3)2 + NO + H2O", expected: [3, 8, 3, 2, 4] },
        { eq: "Ca3(PO4)2 + SiO2 + C -> CaSiO3 + P4 + CO", expected: [2, 6, 10, 6, 1, 10] },
    ];

    for (const { eq, expected } of cases) {
        it(`balances ${eq}`, () => {
            expect(coeffs(balance(eq))).toEqual(expected);
        });
    }
});

describe("strict spectator / underdetermined conformance", () => {
    it("balances an N2 spectator in air combustion", () => {
        expect(coeffs(balance("C3H8 + O2 + N2 -> CO2 + H2O + N2"))).toEqual([1, 5, 1, 3, 4, 1]);
    });

    it("balances an Na spectator", () => {
        expect(coeffs(balance("Na + Cl2 -> NaCl + Na"))).toEqual([3, 1, 2, 1]);
    });

    it("balances an O2 spectator", () => {
        expect(coeffs(balance("H2 + O2 -> H2O + O2"))).toEqual([2, 2, 2, 1]);
    });

    it("returns the minimal positive solution for an underdetermined system", () => {
        const r = balance("C + O2 -> CO + CO2");
        expect(r.underdetermined).toBe(true);
        expect(coeffs(r)).toEqual([3, 2, 2, 1]);
    });

    it("balanceAll returns independent balances", () => {
        const all = balanceAll("C + O2 -> CO + CO2");
        expect(all.length).toBeGreaterThan(1);
        expect(coeffs(all[0]!)).toEqual([3, 2, 2, 1]);
    });
});

describe("strict notation conformance", () => {
    it("normalises unicode subscripts", () => {
        expect(coeffs(balance("H₂ + O₂ -> H₂O"))).toEqual([2, 1, 2]);
    });

    it("normalises unicode superscript charges", () => {
        expect(coeffs(balance("Fe²⁺ + Cl⁻ -> FeCl₂"))).toEqual([1, 2, 1]);
    });

    it("accepts braced charges", () => {
        expect(coeffs(balance("Fe^{3+} + Cl- -> FeCl3"))).toEqual([1, 3, 1]);
    });

    it("accepts sign-first charges", () => {
        expect(coeffs(balance("Fe+3 + Cl- -> FeCl3"))).toEqual([1, 3, 1]);
    });

    it("treats digits after ] as a complex charge", () => {
        expect(coeffs(balance("[Fe(CN)6]4- + K+ -> K4[Fe(CN)6]"))).toEqual([1, 4, 1]);
    });

    it("treats digits after ) as a subscript", () => {
        expect(coeffs(balance("Al + OH- + H2O -> Al(OH)4- + H2"))).toEqual([2, 2, 6, 2, 3]);
    });

    it("handles hydrates", () => {
        expect(coeffs(balance("CuSO4 + H2O -> CuSO4·5H2O"))).toEqual([1, 5, 1]);
    });

    it("ignores arrow conditions", () => {
        expect(coeffs(balance("H2 + O2 --Δ--> H2O"))).toEqual([2, 1, 2]);
        expect(coeffs(balance("H2 + O2 ->[cat] H2O"))).toEqual([2, 1, 2]);
    });

    it("expands functional groups", () => {
        expect(coeffs(balance("Ph + H2 -> C6H6"))).toEqual([2, 1, 2]);
    });

    it("expands biochemical abbreviations", () => {
        const r = balance("NADP+ + H2 -> NADPH + H+");
        expect(r.reactants.every((s) => s.coefficient > 0)).toBe(true);
    });
});

describe("strict nuclear / autoComplete conformance", () => {
    it("balances alpha decay in nuclear mode", () => {
        expect(coeffs(balance("^238U -> ^234Th + ^4He", { mode: "nuclear" }))).toEqual([1, 1, 1]);
    });

    it("requires isotope labels in nuclear mode", () => {
        expect(() => balance("U -> Th + He", { mode: "nuclear" })).toThrowError(/isotope/i);
    });

    it("infers an electron when autoComplete is enabled", () => {
        expect(coeffs(balance("Fe2+ -> Fe3+", { autoComplete: true }))).toEqual([1, 1, 1]);
    });
});

describe("strict error conformance", () => {
    it("rejects unknown elements with a typed code", () => {
        try {
            balance("Xx2 + O2 -> Xx2O");
            throw new Error("should have thrown");
        } catch (e) {
            expect((e as { code?: string }).code).toBe("UNKNOWN_ELEMENT");
        }
    });

    it("rejects a missing arrow", () => {
        expect(() => balance("H2 + O2 H2O")).toThrow();
    });

    it("rejects an unbalanceable element mismatch", () => {
        expect(() => balance("H2O -> Fe")).toThrow();
    });

    it("rejects input without spaces around a plus separator", () => {
        expect(() => balance("H2+O2->H2O")).toThrow();
    });
});
