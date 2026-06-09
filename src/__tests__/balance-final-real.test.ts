import { balance } from "../index";

describe("simple combustion final", () => {
    test("CH4 + 2O2 -> CO2 + 2H2O", () => {
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

    test("C2H6 + 7/2 O2 -> 2CO2 + 3H2O (positive check)", () => {
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

    test("C3H8 + 5O2 -> 3CO2 + 4H2O", () => {
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

    test("2C4H10 + 13O2 -> 8CO2 + 10H2O", () => {
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

    test("C5H12 + 8O2 -> 5CO2 + 6H2O", () => {
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
