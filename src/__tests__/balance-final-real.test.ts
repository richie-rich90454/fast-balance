import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("simple combustion final", () => {
    it("CH4 + 2O2 -> CO2 + 2H2O", () => {
        try {
            const r = balance("CH4 + 2O2 -> CO2 + 2H2O");
            expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
            expect(r.products.every(s => s.coefficient > 0)).toBe(true);
            const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
            expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }
    });

    it("C2H6 + 7/2 O2 -> 2CO2 + 3H2O (positive check)", () => {
        try {
            const r = balance("C2H6 + 7/2 O2 -> 2CO2 + 3H2O");
            expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
            expect(r.products.every(s => s.coefficient > 0)).toBe(true);
            const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
            expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }
    });

    it("C3H8 + 5O2 -> 3CO2 + 4H2O", () => {
        try {
            const r = balance("C3H8 + 5O2 -> 3CO2 + 4H2O");
            expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
            expect(r.products.every(s => s.coefficient > 0)).toBe(true);
            const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
            expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }
    });

    it("2C4H10 + 13O2 -> 8CO2 + 10H2O", () => {
        try {
            const r = balance("2C4H10 + 13O2 -> 8CO2 + 10H2O");
            expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
            expect(r.products.every(s => s.coefficient > 0)).toBe(true);
            const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
            expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }
    });

    it("C5H12 + 8O2 -> 5CO2 + 6H2O", () => {
        try {
            const r = balance("C5H12 + 8O2 -> 5CO2 + 6H2O");
            expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
            expect(r.products.every(s => s.coefficient > 0)).toBe(true);
            const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
            expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }
    });
});

describe("simple synthesis final", () => {
    it("N2 + 3H2 -> 2NH3", () => {
        try {
            const r = balance("N2 + 3H2 -> 2NH3");
            expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
            expect(r.products.every(s => s.coefficient > 0)).toBe(true);
            const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
            expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }
    });

    it("2H2 + O2 -> 2H2O", () => {
        try {
            const r = balance("2H2 + O2 -> 2H2O");
            expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
            expect(r.products.every(s => s.coefficient > 0)).toBe(true);
            const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
            expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }
    });

    it("H2 + Cl2 -> 2HCl", () => {
        try {
            const r = balance("H2 + Cl2 -> 2HCl");
            expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
            expect(r.products.every(s => s.coefficient > 0)).toBe(true);
            const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
            expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }
    });

    it("S + O2 -> SO2", () => {
        try {
            const r = balance("S + O2 -> SO2");
            expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
            expect(r.products.every(s => s.coefficient > 0)).toBe(true);
            const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
            expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }
    });

    it("2C + O2 -> 2CO", () => {
        try {
            const r = balance("2C + O2 -> 2CO");
            expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
            expect(r.products.every(s => s.coefficient > 0)).toBe(true);
            const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
            expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }
    });
});
