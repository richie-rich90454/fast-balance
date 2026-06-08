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

describe("Contact process", () => {
    it("balances 2SO2 + O2 -> 2SO3", () => {
        const result = balance("2SO2 + O2 -> 2SO3");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "SO2")?.coefficient).toBe(2);
        expect(result.reactants.find(r => r.formula === "O2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "SO3")?.coefficient).toBe(2);
    });

    it("balances SO2 + O2 -> SO3 (positive check)", () => {
        const result = balance("SO2 + O2 -> SO3");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances SO3 + H2O -> H2SO4", () => {
        const result = balance("SO3 + H2O -> H2SO4");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "SO3")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2SO4")?.coefficient).toBe(1);
    });

    it("balances 2S + 3O2 -> 2SO3", () => {
        const result = balance("2S + 3O2 -> 2SO3");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "S")?.coefficient).toBe(2);
        expect(result.reactants.find(r => r.formula === "O2")?.coefficient).toBe(3);
        expect(result.products.find(p => p.formula === "SO3")?.coefficient).toBe(2);
    });

    it("balances S + O2 -> SO2", () => {
        const result = balance("S + O2 -> SO2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "S")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "O2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "SO2")?.coefficient).toBe(1);
    });

    it("balances S + HNO3 -> H2SO4 + NO (positive check)", () => {
        const result = balance("S + HNO3 -> H2SO4 + NO");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Ostwald process", () => {
    it("balances 4NH3 + 5O2 -> 4NO + 6H2O", () => {
        const result = balance("4NH3 + 5O2 -> 4NO + 6H2O");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NH3")?.coefficient).toBe(4);
        expect(result.reactants.find(r => r.formula === "O2")?.coefficient).toBe(5);
        expect(result.products.find(p => p.formula === "NO")?.coefficient).toBe(4);
        expect(result.products.find(p => p.formula === "H2O")?.coefficient).toBe(6);
    });

    it("balances 2NO + O2 -> 2NO2", () => {
        const result = balance("2NO + O2 -> 2NO2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NO")?.coefficient).toBe(2);
        expect(result.reactants.find(r => r.formula === "O2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "NO2")?.coefficient).toBe(2);
    });

    it("balances 3NO2 + H2O -> 2HNO3 + NO", () => {
        const result = balance("3NO2 + H2O -> 2HNO3 + NO");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NO2")?.coefficient).toBe(3);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "HNO3")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "NO")?.coefficient).toBe(1);
    });

    it("balances NH3 + O2 -> NO + H2O (positive check)", () => {
        const result = balance("NH3 + O2 -> NO + H2O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances NH3 + O2 -> HNO3 + H2O (positive check)", () => {
        const result = balance("NH3 + O2 -> HNO3 + H2O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 4NH3 + 7O2 -> 4NO2 + 6H2O (positive check)", () => {
        const result = balance("4NH3 + 7O2 -> 4NO2 + 6H2O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});
