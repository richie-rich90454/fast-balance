import {describe, it, expect} from "vitest";
import {balance} from "../index";

describe("Wacker process", () => {
    it("balances C2H4 + PdCl2 + H2O -> CH3CHO + Pd + 2HCl", () => {
        const result = balance("C2H4 + PdCl2 + H2O -> CH3CHO + Pd + 2HCl");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "C2H4")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "PdCl2")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "CH3CHO")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "Pd")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "HCl")?.coefficient).toBe(2);
    });

    it("balances C2H4 + O2 -> CH3CHO (positive check)", () => {
        const result = balance("C2H4 + O2 -> CH3CHO");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances C2H4 + H2O -> CH3CH2OH (positive check)", () => {
        const result = balance("C2H4 + H2O -> CH3CH2OH");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances C2H4 + H2O -> C2H5OH", () => {
        const result = balance("C2H4 + H2O -> C2H5OH");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "C2H4")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "C2H5OH")?.coefficient).toBe(1);
    });

    it("balances C3H6 + O2 -> C3H6O (positive check)", () => {
        const result = balance("C3H6 + O2 -> C3H6O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});
