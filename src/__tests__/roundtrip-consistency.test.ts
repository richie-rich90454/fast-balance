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

describe("split-balance consistency", ()=>{
    it("splitEquation output can be balanced manually (H2 + O2 -> H2O)", ()=>{
        const eq = "H2 + O2 -> H2O";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        const nullVec = solveSystem(matrix, cols);
        const coeffs = fractionsToIntegers(nullVec);
        // The known solution: 2,1,2
        expect(coeffs).toEqual([2, 1, 2]);
    });

    it("splitEquation preserves formula content (CH4 + O2 -> CO2 + H2O)", ()=>{
        const eq = "CH4 + O2 -> CO2 + H2O";
        const split = splitEquation(eq);
        // Formula strings must match input (without leading coefficient stripping)
        expect(split.reactants.map(s=>s.formula)).toEqual(["CH4", "O2"]);
        expect(split.products.map(s=>s.formula)).toEqual(["CO2", "H2O"]);
    });

    it("splitEquation formulas are parseable (Fe2O3 + CO -> Fe + CO2)", ()=>{
        const eq = "Fe2O3 + CO -> Fe + CO2";
        const split = splitEquation(eq);
        // parseFormula on each species formula should not throw
        for (const sp of split.reactants){
            expect(()=>parseFormula(sp.formula)).not.toThrow();
        }
        for (const sp of split.products){
            expect(()=>parseFormula(sp.formula)).not.toThrow();
        }
        // Element maps match the expected composition
        expect(split.reactants[0]!.elements).toEqual({Fe: 2, O: 3});
        expect(split.reactants[1]!.elements).toEqual({C: 1, O: 1});
        expect(split.products[0]!.elements).toEqual({Fe: 1});
        expect(split.products[1]!.elements).toEqual({C: 1, O: 2});
    });

    it("splitEquation works with state symbols (NaCl(aq) + AgNO3(aq) -> AgCl(s) + NaNO3(aq))", ()=>{
        const eq = "NaCl(aq) + AgNO3(aq) -> AgCl(s) + NaNO3(aq)";
        const split = splitEquation(eq);
        // State symbols should be stripped from formula text
        expect(split.reactants[0]!.formula).toBe("NaCl");
        expect(split.reactants[1]!.formula).toBe("AgNO3");
        expect(split.products[0]!.formula).toBe("AgCl");
        expect(split.products[1]!.formula).toBe("NaNO3");
        // Elements should be correctly parsed
        expect(split.products[0]!.elements).toEqual({Ag: 1, Cl: 1});
    });

    it("splitEquation works with leading coefficients (3 H2 + N2 -> 2 NH3)", ()=>{
        const eq = "3 H2 + N2 -> 2 NH3";
        const split = splitEquation(eq);
        // Leading coefficients should be stripped from the formula text
        expect(split.reactants[0]!.formula).toBe("H2");
        expect(split.reactants[1]!.formula).toBe("N2");
        expect(split.products[0]!.formula).toBe("NH3");
        // The split output should be balanceable to (3,1,2) and the result
        // should be a positive integer multiple of the expected.
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        const nullVec = solveSystem(matrix, cols);
        const coeffs = fractionsToIntegers(nullVec);
        // Accept any positive integer multiple of (3,1,2)
        expect(coeffs[0]! % 3).toBe(0);
        expect(coeffs[1]!).toBe(coeffs[0]! / 3);
        expect(coeffs[2]!).toBe(2 * (coeffs[0]! / 3));
    });
});

describe("matrix solution consistency", ()=>{
    it("buildMatrix for split equation solves correctly for H2 + O2 -> H2O", ()=>{
        const eq = "H2 + O2 -> H2O";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        expect(cols).toBe(3);
        const nullVec = solveSystem(matrix, cols);
        const coeffs = fractionsToIntegers(nullVec);
        // Expected: 2, 1, 2
        expect(coeffs).toEqual([2, 1, 2]);
        // All coefficients must be positive
        expect(coeffs.every(c=>c > 0)).toBe(true);
    });

    it("buildMatrix for split equation solves correctly for Fe + Cl2 -> FeCl3", ()=>{
        const eq = "Fe + Cl2 -> FeCl3";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        expect(cols).toBe(3);
        const nullVec = solveSystem(matrix, cols);
        const coeffs = fractionsToIntegers(nullVec);
        // Expected: 2, 3, 2
        expect(coeffs).toEqual([2, 3, 2]);
        expect(coeffs.every(c=>c > 0)).toBe(true);
    });

    it("buildMatrix for split equation solves correctly for N2 + H2 -> NH3", ()=>{
        const eq = "N2 + H2 -> NH3";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        expect(cols).toBe(3);
        const nullVec = solveSystem(matrix, cols);
        const coeffs = fractionsToIntegers(nullVec);
        // Expected: 1, 3, 2
        expect(coeffs).toEqual([1, 3, 2]);
        expect(coeffs.every(c=>c > 0)).toBe(true);
    });

    it("buildMatrix for split equation solves correctly for CH4 + O2 -> CO2 + H2O", ()=>{
        const eq = "CH4 + O2 -> CO2 + H2O";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        expect(cols).toBe(4);
        const nullVec = solveSystem(matrix, cols);
        const coeffs = fractionsToIntegers(nullVec);
        // Expected: 1, 2, 1, 2
        expect(coeffs).toEqual([1, 2, 1, 2]);
        expect(coeffs.every(c=>c > 0)).toBe(true);
    });

    it("buildMatrix for split equation solves correctly for Al + HCl -> AlCl3 + H2", ()=>{
        const eq = "Al + HCl -> AlCl3 + H2";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        expect(cols).toBe(4);
        const nullVec = solveSystem(matrix, cols);
        const coeffs = fractionsToIntegers(nullVec);
        // Expected: 2, 6, 2, 3
        expect(coeffs).toEqual([2, 6, 2, 3]);
        expect(coeffs.every(c=>c > 0)).toBe(true);
    });
});

