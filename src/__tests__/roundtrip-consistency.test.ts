import {describe, it, expect} from "vitest";
import {
    balance,
    parseFormula,
    splitEquation,
    buildMatrix,
    solveSystem,
    fractionsToIntegers,
    Fraction
} from "../index";

describe("balance-parse-balance roundtrip", ()=>{
    it("balance -> parseFormula equivalence for H2 + O2 -> H2O", ()=>{
        const eq = "H2 + O2 -> H2O";
        const result = balance(eq);
        const split = splitEquation(eq);
        // Verify each species in the balanced result parses to the same elements
        // as the corresponding species from a fresh splitEquation of the input.
        for (let i = 0; i < result.reactants.length; i++){
            const species = result.reactants[i]!;
            const parsed = parseFormula(species.formula);
            expect(parsed.elements).toEqual(split.reactants[i]!.elements);
        }
        for (let i = 0; i < result.products.length; i++){
            const species = result.products[i]!;
            const parsed = parseFormula(species.formula);
            expect(parsed.elements).toEqual(split.products[i]!.elements);
        }
        // The known balanced coefficients for this reaction are 2,1,2
        expect(result.reactants[0]!.coefficient).toBe(2);
        expect(result.reactants[1]!.coefficient).toBe(1);
        expect(result.products[0]!.coefficient).toBe(2);
    });

    it("balance -> parseFormula equivalence for Fe + Cl2 -> FeCl3", ()=>{
        const eq = "Fe + Cl2 -> FeCl3";
        const result = balance(eq);
        const split = splitEquation(eq);
        for (let i = 0; i < result.reactants.length; i++){
            const species = result.reactants[i]!;
            const parsed = parseFormula(species.formula);
            expect(parsed.elements).toEqual(split.reactants[i]!.elements);
        }
        for (let i = 0; i < result.products.length; i++){
            const species = result.products[i]!;
            const parsed = parseFormula(species.formula);
            expect(parsed.elements).toEqual(split.products[i]!.elements);
        }
        // The known balanced coefficients for this reaction are 2,3,2
        expect(result.reactants[0]!.coefficient).toBe(2);
        expect(result.reactants[1]!.coefficient).toBe(3);
        expect(result.products[0]!.coefficient).toBe(2);
    });

    it("balance -> parseFormula equivalence for N2 + H2 -> NH3", ()=>{
        const eq = "N2 + H2 -> NH3";
        const result = balance(eq);
        const split = splitEquation(eq);
        for (let i = 0; i < result.reactants.length; i++){
            const species = result.reactants[i]!;
            const parsed = parseFormula(species.formula);
            expect(parsed.elements).toEqual(split.reactants[i]!.elements);
        }
        for (let i = 0; i < result.products.length; i++){
            const species = result.products[i]!;
            const parsed = parseFormula(species.formula);
            expect(parsed.elements).toEqual(split.products[i]!.elements);
        }
        // The known balanced coefficients for this reaction are 1,3,2
        expect(result.reactants[0]!.coefficient).toBe(1);
        expect(result.reactants[1]!.coefficient).toBe(3);
        expect(result.products[0]!.coefficient).toBe(2);
    });

    it("balance -> parseFormula equivalence for CH4 + O2 -> CO2 + H2O", ()=>{
        const eq = "CH4 + O2 -> CO2 + H2O";
        const result = balance(eq);
        const split = splitEquation(eq);
        for (let i = 0; i < result.reactants.length; i++){
            const species = result.reactants[i]!;
            const parsed = parseFormula(species.formula);
            expect(parsed.elements).toEqual(split.reactants[i]!.elements);
        }
        for (let i = 0; i < result.products.length; i++){
            const species = result.products[i]!;
            const parsed = parseFormula(species.formula);
            expect(parsed.elements).toEqual(split.products[i]!.elements);
        }
        // The known balanced coefficients for this reaction are 1,2,1,2
        expect(result.reactants[0]!.coefficient).toBe(1);
        expect(result.reactants[1]!.coefficient).toBe(2);
        expect(result.products[0]!.coefficient).toBe(1);
        expect(result.products[1]!.coefficient).toBe(2);
    });

    it("balance -> parseFormula equivalence for Fe2O3 + CO -> Fe + CO2", ()=>{
        const eq = "Fe2O3 + CO -> Fe + CO2";
        const result = balance(eq);
        const split = splitEquation(eq);
        for (let i = 0; i < result.reactants.length; i++){
            const species = result.reactants[i]!;
            const parsed = parseFormula(species.formula);
            expect(parsed.elements).toEqual(split.reactants[i]!.elements);
        }
        for (let i = 0; i < result.products.length; i++){
            const species = result.products[i]!;
            const parsed = parseFormula(species.formula);
            expect(parsed.elements).toEqual(split.products[i]!.elements);
        }
        // The known balanced coefficients for this reaction are 1,3,2,3
        expect(result.reactants[0]!.coefficient).toBe(1);
        expect(result.reactants[1]!.coefficient).toBe(3);
        expect(result.products[0]!.coefficient).toBe(2);
        expect(result.products[1]!.coefficient).toBe(3);
    });
});
