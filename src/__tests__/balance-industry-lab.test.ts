import {describe, it, expect} from "vitest";
import {balance} from "../index";

describe("Organic lab reactions", () => {
    it("balances CH3COOH + C2H5OH -> CH3COOC2H5 + H2O", () => {
        const r = balance("CH3COOH + C2H5OH -> CH3COOC2H5 + H2O");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "CH3COOH")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "C2H5OH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "CH3COOC2H5")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "H2O")?.coefficient).toBe(1);
    });

    it("balances C6H5OH + NaOH -> C6H5ONa + H2O (positive check)", () => {
        const r = balance("C6H5OH + NaOH -> C6H5ONa + H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances C2H5Br + NaOH -> C2H5OH + NaBr", () => {
        const r = balance("C2H5Br + NaOH -> C2H5OH + NaBr");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "C2H5Br")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "NaOH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "C2H5OH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "NaBr")?.coefficient).toBe(1);
    });

    it("balances CH3Cl + NaOH -> CH3OH + NaCl", () => {
        const r = balance("CH3Cl + NaOH -> CH3OH + NaCl");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "CH3Cl")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "NaOH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "CH3OH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "NaCl")?.coefficient).toBe(1);
    });

    it("balances C2H5Cl + KOH -> C2H5OH + KCl", () => {
        const r = balance("C2H5Cl + KOH -> C2H5OH + KCl");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "C2H5Cl")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "KOH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "C2H5OH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "KCl")?.coefficient).toBe(1);
    });
});

describe("Oxidation and reduction lab reactions", () => {
    it("balances CH3CH2OH + K2Cr2O7 + H2SO4 -> CH3COOH + K2SO4 + Cr2(SO4)3 + H2O (positive check)", () => {
        const r = balance("CH3CH2OH + K2Cr2O7 + H2SO4 -> CH3COOH + K2SO4 + Cr2(SO4)3 + H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2KMnO4 + 3H2SO4 + 5H2S -> K2SO4 + 2MnSO4 + 5S + 8H2O (positive check)", () => {
        const r = balance("2KMnO4 + 3H2SO4 + 5H2S -> K2SO4 + 2MnSO4 + 5S + 8H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Fe2+ + MnO4- -> Fe3+ + Mn2+ (positive check)", () => {
        const r = balance("Fe2+ + MnO4- -> Fe3+ + Mn2+");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Sn2+ + Fe3+ -> Sn4+ + Fe2+ (positive check)", () => {
        const r = balance("Sn2+ + Fe3+ -> Sn4+ + Fe2+");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Cu + Ag+ -> Cu2+ + Ag (positive check)", () => {
        const r = balance("Cu + Ag+ -> Cu2+ + Ag");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Combustion lab reactions", () => {
    it("balances C2H6O + O2 -> CO2 + H2O", () => {
        const r = balance("C2H6O + O2 -> CO2 + H2O");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "C2H6O")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "CO2")?.coefficient).toBe(2);
        expect(r.products.find(x => x.formula === "H2O")?.coefficient).toBe(3);
    });

    it("balances C3H8O + O2 -> CO2 + H2O", () => {
        const r = balance("C3H8O + O2 -> CO2 + H2O");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "C3H8O")?.coefficient).toBe(2);
        expect(r.products.find(x => x.formula === "CO2")?.coefficient).toBe(6);
        expect(r.products.find(x => x.formula === "H2O")?.coefficient).toBe(8);
    });

    it("balances C4H10O + O2 -> CO2 + H2O (positive check)", () => {
        const r = balance("C4H10O + O2 -> CO2 + H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances C7H8 + O2 -> CO2 + H2O", () => {
        const r = balance("C7H8 + O2 -> CO2 + H2O");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "C7H8")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "CO2")?.coefficient).toBe(7);
        expect(r.products.find(x => x.formula === "H2O")?.coefficient).toBe(4);
    });

    it("balances C10H8 + O2 -> CO2 + H2O (positive check)", () => {
        const r = balance("C10H8 + O2 -> CO2 + H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});
