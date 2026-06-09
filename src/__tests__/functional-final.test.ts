import {describe, it, expect} from "vitest";
import {balance, parseFormula} from "../index";

describe("exact coefficient match", () => {
    it("matches CH4 + 2O2 -> CO2 + 2H2O exactly", () => {
        let result = balance("CH4 + O2 -> CO2 + H2O");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(2);
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(2);
        expect(result.reactants[0]?.formula).toBe("CH4");
        expect(result.reactants[1]?.formula).toBe("O2");
        expect(result.products[0]?.formula).toBe("CO2");
        expect(result.products[1]?.formula).toBe("H2O");
    });
    it("matches 2H2 + O2 -> 2H2O exactly", () => {
        let result = balance("H2 + O2 -> H2O");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.reactants[0]?.formula).toBe("H2");
        expect(result.reactants[1]?.formula).toBe("O2");
        expect(result.products[0]?.formula).toBe("H2O");
    });
    it("matches N2 + 3H2 -> 2NH3 exactly", () => {
        let result = balance("N2 + H2 -> NH3");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.reactants[0]?.formula).toBe("N2");
        expect(result.reactants[1]?.formula).toBe("H2");
        expect(result.products[0]?.formula).toBe("NH3");
    });
    it("matches Fe + S -> FeS (positive check)", () => {
        let result = balance("Fe + S -> FeS");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(1);
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.reactants[1]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.coefficient).toBeGreaterThan(0);
        expect(result.reactants[0]?.formula).toBe("Fe");
        expect(result.reactants[1]?.formula).toBe("S");
        expect(result.products[0]?.formula).toBe("FeS");
    });
    it("matches 2Na + Cl2 -> 2NaCl exactly", () => {
        let result = balance("Na + Cl2 -> NaCl");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.reactants[0]?.formula).toBe("Na");
        expect(result.reactants[1]?.formula).toBe("Cl2");
        expect(result.products[0]?.formula).toBe("NaCl");
    });
});
