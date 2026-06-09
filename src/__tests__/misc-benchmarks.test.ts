import { describe, it, expect } from "vitest";
import { balance, parseFormula } from "../index";

describe("performance benchmarks", () => {
    it("balances H2 + O2 -> H2O in under 100ms", () => {
        let start = performance.now();
        let result = balance("H2 + O2 -> H2O");
        let duration = performance.now() - start;
        expect(duration).toBeLessThan(100);
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(2);
    });

    it("balances Fe + Cl2 -> FeCl3 in under 100ms", () => {
        let start = performance.now();
        let result = balance("Fe + Cl2 -> FeCl3");
        let duration = performance.now() - start;
        expect(duration).toBeLessThan(100);
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(2);
    });

    it("balances CH4 + O2 -> CO2 + H2O in under 100ms", () => {
        let start = performance.now();
        let result = balance("CH4 + O2 -> CO2 + H2O");
        let duration = performance.now() - start;
        expect(duration).toBeLessThan(100);
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(2);
    });

    it("balances 100 simple equations in under 1s", () => {
        let equations = [
            "H2 + O2 -> H2O",
            "N2 + H2 -> NH3",
            "Fe + O2 -> Fe2O3",
            "C + O2 -> CO2",
            "C + O2 -> CO",
            "KClO3 -> KCl + O2",
            "H2O -> H2 + O2",
            "Al + O2 -> Al2O3",
            "Zn + HCl -> ZnCl2 + H2",
            "Mg + HCl -> MgCl2 + H2"
        ];
        let start = performance.now();
        for (let i = 0; i < 100; i++) {
            let eq = equations[i % equations.length]!;
            let result = balance(eq);
            expect(result.reactants.length).toBeGreaterThan(0);
            expect(result.products.length).toBeGreaterThan(0);
        }
        let duration = performance.now() - start;
        expect(duration).toBeLessThan(1000);
    });

    it("balances C8H18 + O2 -> CO2 + H2O in under 100ms", () => {
        let start = performance.now();
        let result = balance("C8H18 + O2 -> CO2 + H2O");
        let duration = performance.now() - start;
        expect(duration).toBeLessThan(100);
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(25);
        expect(result.products[0]?.coefficient).toBe(16);
        expect(result.products[1]?.coefficient).toBe(18);
    });
});
