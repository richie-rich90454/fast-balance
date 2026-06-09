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

describe("Monsanto process", () => {
    it("balances CH3OH + CO -> CH3COOH (positive check)", () => {
        const result = balance("CH3OH + CO -> CH3COOH");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances CH3I + CO + H2O -> CH3COOH + HI (positive check)", () => {
        const result = balance("CH3I + CO + H2O -> CH3COOH + HI");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances CH3OH + CO -> CH3COOH", () => {
        const result = balance("CH3OH + CO -> CH3COOH");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "CH3OH")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "CO")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "CH3COOH")?.coefficient).toBe(1);
    });

    it("balances 2CH3OH + CO -> CH3COOCH3 + H2O (positive check)", () => {
        const result = balance("2CH3OH + CO -> CH3COOCH3 + H2O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances CH3I + CO -> CH3COI (positive check)", () => {
        const result = balance("CH3I + CO -> CH3COI");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Bosch-Meiser urea process", () => {
    it("balances 2NH3 + CO2 -> NH2CONH2 + H2O", () => {
        const result = balance("2NH3 + CO2 -> NH2CONH2 + H2O");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NH3")?.coefficient).toBe(2);
        expect(result.reactants.find(r => r.formula === "CO2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "NH2CONH2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2O")?.coefficient).toBe(1);
    });

    it("balances NH2CONH2 + H2O -> 2NH3 + CO2", () => {
        const result = balance("NH2CONH2 + H2O -> 2NH3 + CO2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NH2CONH2")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "NH3")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "CO2")?.coefficient).toBe(1);
    });

    it("balances 2NH3 + CO2 -> NH2COONH4", () => {
        const result = balance("2NH3 + CO2 -> NH2COONH4");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NH3")?.coefficient).toBe(2);
        expect(result.reactants.find(r => r.formula === "CO2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "NH2COONH4")?.coefficient).toBe(1);
    });

    it("balances NH2COONH4 -> NH2CONH2 + H2O", () => {
        const result = balance("NH2COONH4 -> NH2CONH2 + H2O");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NH2COONH4")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "NH2CONH2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2O")?.coefficient).toBe(1);
    });

    it("balances NH2CONH2 -> NH3 + HNCO (positive check)", () => {
        const result = balance("NH2CONH2 -> NH3 + HNCO");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Fischer-Tropsch process", () => {
    it("balances CO + H2 -> CH4 + H2O", () => {
        const result = balance("CO + H2 -> CH4 + H2O");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "CO")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2")?.coefficient).toBe(3);
        expect(result.products.find(p => p.formula === "CH4")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2O")?.coefficient).toBe(1);
    });

    it("balances CO + H2 -> C2H4 + H2O", () => {
        const result = balance("CO + H2 -> C2H4 + H2O");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "CO")?.coefficient).toBe(2);
        expect(result.reactants.find(r => r.formula === "H2")?.coefficient).toBe(4);
        expect(result.products.find(p => p.formula === "C2H4")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2O")?.coefficient).toBe(2);
    });

    it("balances CO + H2 -> C3H8 + H2O (positive check)", () => {
        const result = balance("CO + H2 -> C3H8 + H2O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances CO + H2 -> C4H10 + H2O (positive check)", () => {
        const result = balance("CO + H2 -> C4H10 + H2O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances CO + H2 -> C8H18 + H2O (positive check)", () => {
        const result = balance("CO + H2 -> C8H18 + H2O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});
