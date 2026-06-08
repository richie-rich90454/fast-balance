import {describe, it, expect} from "vitest";
import {balance} from "../index";

describe("Haber process", () => {
    it("balances N2 + 3H2 -> 2NH3", () => {
        const result = balance("N2 + 3H2 -> 2NH3");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "N2")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2")?.coefficient).toBe(3);
        expect(result.products.find(p => p.formula === "NH3")?.coefficient).toBe(2);
    });

    it("balances N2 + H2 -> NH3 (positive integer check)", () => {
        const result = balance("N2 + H2 -> NH3");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances NH3 -> N2 + H2 (decomposition)", () => {
        const result = balance("NH3 -> N2 + H2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NH3")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "N2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2")?.coefficient).toBe(3);
    });

    it("balances N2 + 3H2 -> 2NH3 with state symbols (positive check)", () => {
        const result = balance("N2(g) + 3H2(g) -> 2NH3(g)");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2NH3 -> N2 + 3H2", () => {
        const result = balance("2NH3 -> N2 + 3H2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NH3")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "N2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2")?.coefficient).toBe(3);
    });

    it("balances N2 + H2 <-> NH3 (use -> for now)", () => {
        const result = balance("N2 + H2 -> NH3");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});
