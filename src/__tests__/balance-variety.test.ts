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

describe("Steam reforming", () => {
    it("balances CH4 + H2O -> CO + H2", () => {
        const result = balance("CH4 + H2O -> CO + H2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "CH4")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "CO")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2")?.coefficient).toBe(3);
    });

    it("balances C2H6 + H2O -> CO + H2", () => {
        const result = balance("C2H6 + H2O -> CO + H2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "C2H6")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "CO")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "H2")?.coefficient).toBe(5);
    });

    it("balances C3H8 + H2O -> CO + H2", () => {
        const result = balance("C3H8 + H2O -> CO + H2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "C3H8")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(3);
        expect(result.products.find(p => p.formula === "CO")?.coefficient).toBe(3);
        expect(result.products.find(p => p.formula === "H2")?.coefficient).toBe(7);
    });

    it("balances C + H2O -> CO + H2", () => {
        const result = balance("C + H2O -> CO + H2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "C")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "CO")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2")?.coefficient).toBe(1);
    });

    it("balances C8H18 + H2O -> CO + H2 (positive check)", () => {
        const result = balance("C8H18 + H2O -> CO + H2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Water-gas shift reaction", () => {
    it("balances CO + H2O -> CO2 + H2", () => {
        const result = balance("CO + H2O -> CO2 + H2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "CO")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "CO2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2")?.coefficient).toBe(1);
    });

    it("balances CO2 + H2 -> CO + H2O", () => {
        const result = balance("CO2 + H2 -> CO + H2O");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "CO2")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "CO")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "H2O")?.coefficient).toBe(1);
    });

    it("balances CO + H2O -> CO2 + H2 (forward, positive check)", () => {
        const result = balance("CO + H2O -> CO2 + H2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2CO + 2H2 -> CH4 + CO2 (positive check)", () => {
        const result = balance("2CO + 2H2 -> CH4 + CO2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 3CO + 7H2 -> C3H8 + 3H2O (positive check)", () => {
        const result = balance("3CO + 7H2 -> C3H8 + 3H2O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Deacon process", () => {
    it("balances 4HCl + O2 -> 2Cl2 + 2H2O", () => {
        const result = balance("4HCl + O2 -> 2Cl2 + 2H2O");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "HCl")?.coefficient).toBe(4);
        expect(result.reactants.find(r => r.formula === "O2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "Cl2")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "H2O")?.coefficient).toBe(2);
    });

    it("balances 4HCl + O2 -> 2Cl2 + 2H2O (positive check)", () => {
        const result = balance("4HCl + O2 -> 2Cl2 + 2H2O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 4HCl + O2 -> 2Cl2 + 2H2O (state symbols, positive check)", () => {
        const result = balance("4HCl(g) + O2(g) -> 2Cl2(g) + 2H2O(g)");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2HCl + O2 -> Cl2 + H2O2 (positive check)", () => {
        const result = balance("2HCl + O2 -> Cl2 + H2O2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2NaCl + 2H2O -> 2NaOH + H2 + Cl2", () => {
        const result = balance("2NaCl + 2H2O -> 2NaOH + H2 + Cl2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NaCl")?.coefficient).toBe(2);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "NaOH")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "H2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "Cl2")?.coefficient).toBe(1);
    });
});

describe("Nitrogen dioxide and lead chamber", () => {
    it("balances 3NO2 + H2O -> 2HNO3 + NO (positive check)", () => {
        const result = balance("3NO2 + H2O -> 2HNO3 + NO");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2NO2 + H2O -> HNO3 + HNO2", () => {
        const result = balance("2NO2 + H2O -> HNO3 + HNO2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NO2")?.coefficient).toBe(2);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "HNO3")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "HNO2")?.coefficient).toBe(1);
    });

    it("balances 4NO2 + O2 + 2H2O -> 4HNO3", () => {
        const result = balance("4NO2 + O2 + 2H2O -> 4HNO3");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "NO2")?.coefficient).toBe(4);
        expect(result.reactants.find(r => r.formula === "O2")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "H2O")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "HNO3")?.coefficient).toBe(4);
    });

    it("balances SO2 + NO2 -> SO3 + NO", () => {
        const result = balance("SO2 + NO2 -> SO3 + NO");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "SO2")?.coefficient).toBe(1);
        expect(result.reactants.find(r => r.formula === "NO2")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "SO3")?.coefficient).toBe(1);
        expect(result.products.find(p => p.formula === "NO")?.coefficient).toBe(1);
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
});

describe("Lead and mercury compounds", () => {
    it("balances 2Pb(NO3)2 -> 2PbO + 4NO2 + O2 (positive check)", () => {
        const result = balance("2Pb(NO3)2 -> 2PbO + 4NO2 + O2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances PbO + C -> Pb + CO (positive check)", () => {
        const result = balance("PbO + C -> Pb + CO");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Hg(OH)2 -> HgO + H2O (positive check)", () => {
        const result = balance("Hg(OH)2 -> HgO + H2O");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2HgO -> 2Hg + O2", () => {
        const result = balance("2HgO -> 2Hg + O2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "HgO")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "Hg")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "O2")?.coefficient).toBe(1);
    });

    it("balances HgS + O2 -> Hg + SO2 (positive check)", () => {
        const result = balance("HgS + O2 -> Hg + SO2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Additional processes", () => {
    it("balances 2N2O -> 2N2 + O2 (positive check)", () => {
        const result = balance("2N2O -> 2N2 + O2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2H2O2 -> 2H2O + O2", () => {
        const result = balance("2H2O2 -> 2H2O + O2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "H2O2")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "H2O")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "O2")?.coefficient).toBe(1);
    });

    it("balances 2KMnO4 -> K2MnO4 + MnO2 + O2 (positive check)", () => {
        const result = balance("2KMnO4 -> K2MnO4 + MnO2 + O2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 4KClO3 -> 3KClO4 + KCl (positive check)", () => {
        const result = balance("4KClO3 -> 3KClO4 + KCl");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2KClO3 -> 2KCl + 3O2", () => {
        const result = balance("2KClO3 -> 2KCl + 3O2");
        const all = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(result.reactants.find(r => r.formula === "KClO3")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "KCl")?.coefficient).toBe(2);
        expect(result.products.find(p => p.formula === "O2")?.coefficient).toBe(3);
    });
});
