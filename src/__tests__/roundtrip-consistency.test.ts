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

describe("integer fraction consistency", ()=>{
    it("fractionsToIntegers result is integer for H2 + O2 -> H2O", ()=>{
        const eq = "H2 + O2 -> H2O";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        const nullVec = solveSystem(matrix, cols);
        const ints = fractionsToIntegers(nullVec);
        // All entries must be integers (Number.isInteger check)
        expect(ints.every(v=>Number.isInteger(v))).toBe(true);
        // All entries must be positive
        expect(ints.every(v=>v > 0)).toBe(true);
        // Known answer
        expect(ints).toEqual([2, 1, 2]);
    });

    it("fractionsToIntegers result is integer for Fe + Cl2 -> FeCl3", ()=>{
        const eq = "Fe + Cl2 -> FeCl3";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        const nullVec = solveSystem(matrix, cols);
        const ints = fractionsToIntegers(nullVec);
        expect(ints.every(v=>Number.isInteger(v))).toBe(true);
        expect(ints.every(v=>v > 0)).toBe(true);
        expect(ints).toEqual([2, 3, 2]);
    });

    it("fractionsToIntegers result is integer for N2 + H2 -> NH3", ()=>{
        const eq = "N2 + H2 -> NH3";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        const nullVec = solveSystem(matrix, cols);
        const ints = fractionsToIntegers(nullVec);
        expect(ints.every(v=>Number.isInteger(v))).toBe(true);
        expect(ints.every(v=>v > 0)).toBe(true);
        expect(ints).toEqual([1, 3, 2]);
    });

    it("fractionsToIntegers result is integer for CH4 + O2 -> CO2 + H2O", ()=>{
        const eq = "CH4 + O2 -> CO2 + H2O";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        const nullVec = solveSystem(matrix, cols);
        const ints = fractionsToIntegers(nullVec);
        expect(ints.every(v=>Number.isInteger(v))).toBe(true);
        expect(ints.every(v=>v > 0)).toBe(true);
        expect(ints).toEqual([1, 2, 1, 2]);
    });

    it("fractionsToIntegers result is integer for Na + Cl2 -> NaCl", ()=>{
        const eq = "Na + Cl2 -> NaCl";
        const split = splitEquation(eq);
        const {matrix, cols} = buildMatrix(split.reactants, split.products);
        const nullVec = solveSystem(matrix, cols);
        const ints = fractionsToIntegers(nullVec);
        expect(ints.every(v=>Number.isInteger(v))).toBe(true);
        expect(ints.every(v=>v > 0)).toBe(true);
        expect(ints).toEqual([2, 1, 2]);
    });
});

describe("deterministic output", ()=>{
    it("multiple calls with same input produce same result (H2 + O2 -> H2O)", ()=>{
        const eq = "H2 + O2 -> H2O";
        const a = balance(eq);
        const b = balance(eq);
        const c = balance(eq);
        expect(a.equation).toBe(b.equation);
        expect(b.equation).toBe(c.equation);
        expect(a.reactants.map(r=>r.coefficient)).toEqual(b.reactants.map(r=>r.coefficient));
        expect(b.reactants.map(r=>r.coefficient)).toEqual(c.reactants.map(r=>r.coefficient));
    });

    it("no random behavior across many calls (CH4 + O2 -> CO2 + H2O)", ()=>{
        const eq = "CH4 + O2 -> CO2 + H2O";
        const reference = balance(eq);
        for (let i = 0; i < 25; i++){
            const result = balance(eq);
            expect(result.equation).toBe(reference.equation);
            expect(result.reactants.map(r=>r.coefficient))
                .toEqual(reference.reactants.map(r=>r.coefficient));
            expect(result.products.map(r=>r.coefficient))
                .toEqual(reference.products.map(r=>r.coefficient));
        }
    });

    it("same coefficients every time (Fe2O3 + CO -> Fe + CO2)", ()=>{
        const eq = "Fe2O3 + CO -> Fe + CO2";
        const first = balance(eq);
        for (let i = 0; i < 10; i++){
            const next = balance(eq);
            const flat1 = [
                ...first.reactants.map(r=>r.coefficient),
                ...first.products.map(r=>r.coefficient)
            ];
            const flat2 = [
                ...next.reactants.map(r=>r.coefficient),
                ...next.products.map(r=>r.coefficient)
            ];
            expect(flat2).toEqual(flat1);
        }
    });

    it("same string every time (N2 + H2 -> NH3)", ()=>{
        const eq = "N2 + H2 -> NH3";
        const reference = balance(eq).equation;
        for (let i = 0; i < 10; i++){
            expect(balance(eq).equation).toBe(reference);
        }
    });

    it("consistent across runs (Fe + Cl2 -> FeCl3)", ()=>{
        const eq = "Fe + Cl2 -> FeCl3";
        const r1 = balance(eq);
        const r2 = balance(eq);
        // Reactant coefficients must be identical arrays
        expect(r2.reactants.map(r=>r.coefficient))
            .toEqual(r1.reactants.map(r=>r.coefficient));
        // Product coefficients must be identical arrays
        expect(r2.products.map(r=>r.coefficient))
            .toEqual(r1.products.map(r=>r.coefficient));
        // Equation strings must be identical
        expect(r2.equation).toBe(r1.equation);
        // Formulas must be identical
        expect(r2.reactants.map(r=>r.formula))
            .toEqual(r1.reactants.map(r=>r.formula));
        expect(r2.products.map(r=>r.formula))
            .toEqual(r1.products.map(r=>r.formula));
    });
});

describe("format roundtrip", ()=>{
    it("text format gives the expected equation string (H2 + O2 -> H2O)", ()=>{
        const result = balance("H2 + O2 -> H2O", {format: "text", showOne: false});
        expect(result.equation).toBe("2 H2 + O2 -> 2 H2O");
    });

    it("html format gives the expected equation string (H2 + O2 -> H2O)", ()=>{
        const result = balance("H2 + O2 -> H2O", {format: "html", showOne: false});
        expect(result.equation).toBe("2 H2 + O2 &rarr; 2 H2O");
    });

    it("latex format gives the expected equation string (H2 + O2 -> H2O)", ()=>{
        const result = balance("H2 + O2 -> H2O", {format: "latex", showOne: false});
        expect(result.equation).toBe("2 H2 + O2 \\rightarrow 2 H2O");
    });

    it("all formats give same coefficients and array structure (CH4 + O2 -> CO2 + H2O)", ()=>{
        const text = balance("CH4 + O2 -> CO2 + H2O", {format: "text"});
        const html = balance("CH4 + O2 -> CO2 + H2O", {format: "html"});
        const latex = balance("CH4 + O2 -> CO2 + H2O", {format: "latex"});
        // Coefficients must be identical across formats
        expect(text.reactants.map(r=>r.coefficient))
            .toEqual(html.reactants.map(r=>r.coefficient));
        expect(text.reactants.map(r=>r.coefficient))
            .toEqual(latex.reactants.map(r=>r.coefficient));
        expect(text.products.map(r=>r.coefficient))
            .toEqual(html.products.map(r=>r.coefficient));
        expect(text.products.map(r=>r.coefficient))
            .toEqual(latex.products.map(r=>r.coefficient));
        // Formulas must be identical across formats
        expect(text.reactants.map(r=>r.formula))
            .toEqual(html.reactants.map(r=>r.formula));
        expect(text.reactants.map(r=>r.formula))
            .toEqual(latex.reactants.map(r=>r.formula));
        // The strings must be different (each format has its own arrow)
        expect(text.equation).not.toBe(html.equation);
        expect(text.equation).not.toBe(latex.equation);
        expect(html.equation).not.toBe(latex.equation);
    });

    it("format does not change array structure (Fe2O3 + CO -> Fe + CO2)", ()=>{
        const text = balance("Fe2O3 + CO -> Fe + CO2", {format: "text"});
        const html = balance("Fe2O3 + CO -> Fe + CO2", {format: "html"});
        const latex = balance("Fe2O3 + CO -> Fe + CO2", {format: "latex"});
        // Array lengths must match
        expect(text.reactants.length).toBe(html.reactants.length);
        expect(text.reactants.length).toBe(latex.reactants.length);
        expect(text.products.length).toBe(html.products.length);
        expect(text.products.length).toBe(latex.products.length);
        // Array entries must be plain objects with coefficient and formula
        for (const r of [...text.reactants, ...html.reactants, ...latex.reactants,
                          ...text.products, ...html.products, ...latex.products]){
            expect(typeof r.coefficient).toBe("number");
            expect(typeof r.formula).toBe("string");
        }
    });

    it("all formats are deterministic (N2 + H2 -> NH3)", ()=>{
        const eq = "N2 + H2 -> NH3";
        const t1 = balance(eq, {format: "text"}).equation;
        const t2 = balance(eq, {format: "text"}).equation;
        const h1 = balance(eq, {format: "html"}).equation;
        const h2 = balance(eq, {format: "html"}).equation;
        const l1 = balance(eq, {format: "latex"}).equation;
        const l2 = balance(eq, {format: "latex"}).equation;
        expect(t1).toBe(t2);
        expect(h1).toBe(h2);
        expect(l1).toBe(l2);
    });
});

describe("parse-side consistency", ()=>{
    it("splitEquation returns same species order as input (CH4 + O2 -> CO2 + H2O)", ()=>{
        const eq = "CH4 + O2 -> CO2 + H2O";
        const split = splitEquation(eq);
        // The order of species must match the textual order in the input.
        expect(split.reactants[0]!.formula).toBe("CH4");
        expect(split.reactants[1]!.formula).toBe("O2");
        expect(split.products[0]!.formula).toBe("CO2");
        expect(split.products[1]!.formula).toBe("H2O");
    });

    it("reactant order is preserved (Al + HCl -> AlCl3 + H2)", ()=>{
        const split = splitEquation("Al + HCl -> AlCl3 + H2");
        expect(split.reactants.map(s=>s.formula)).toEqual(["Al", "HCl"]);
    });

    it("product order is preserved (Fe2O3 + CO -> Fe + CO2)", ()=>{
        const split = splitEquation("Fe2O3 + CO -> Fe + CO2");
        expect(split.products.map(s=>s.formula)).toEqual(["Fe", "CO2"]);
    });

    it("formula text matches input (H2 + O2 -> H2O)", ()=>{
        const split = splitEquation("H2 + O2 -> H2O");
        // Formula text on each side should match the input exactly.
        expect(split.reactants[0]!.formula).toBe("H2");
        expect(split.reactants[1]!.formula).toBe("O2");
        expect(split.products[0]!.formula).toBe("H2O");
        // Length of the species array matches the number of '+' delimited tokens.
        expect(split.reactants.length).toBe(2);
        expect(split.products.length).toBe(1);
    });

    it("elements maps match expectations (Fe2O3 + CO -> Fe + CO2)", ()=>{
        const split = splitEquation("Fe2O3 + CO -> Fe + CO2");
        expect(split.reactants[0]!.elements).toEqual({Fe: 2, O: 3});
        expect(split.reactants[1]!.elements).toEqual({C: 1, O: 1});
        expect(split.products[0]!.elements).toEqual({Fe: 1});
        expect(split.products[1]!.elements).toEqual({C: 1, O: 2});
        // All charges should be zero for this neutral equation.
        for (const sp of [...split.reactants, ...split.products]){
            expect(sp.charge).toBe(0);
        }
    });
});

describe("charge conservation consistency", ()=>{
    // Helper: sum coefficient*charge on each side from a balanced result.
    const totalCharge=(side: {coefficient: number; formula: string}[],
                       charges: number[]): number=>{
        let s = 0;
        for (let i = 0; i < side.length; i++){
            s += side[i]!.coefficient * charges[i]!;
        }
        return s;
    };

    it("Fe2+ + Cl- -> FeCl2 conserves charge", ()=>{
        const result = balance("Fe2+ + Cl- -> FeCl2");
        const split = splitEquation("Fe2+ + Cl- -> FeCl2");
        const left = totalCharge(result.reactants, split.reactants.map(s=>s.charge));
        const right = totalCharge(result.products, split.products.map(s=>s.charge));
        expect(left).toBe(right);
        // Both sides should sum to 0 for this neutral product
        expect(left).toBe(0);
        expect(right).toBe(0);
        // The balanced result should be 1, 2, 1
        expect(result.reactants[0]!.coefficient).toBe(1);
        expect(result.reactants[1]!.coefficient).toBe(2);
        expect(result.products[0]!.coefficient).toBe(1);
    });

    it("Ag+ + Cl- -> AgCl conserves charge", ()=>{
        const result = balance("Ag+ + Cl- -> AgCl");
        const split = splitEquation("Ag+ + Cl- -> AgCl");
        const left = totalCharge(result.reactants, split.reactants.map(s=>s.charge));
        const right = totalCharge(result.products, split.products.map(s=>s.charge));
        expect(left).toBe(right);
        expect(left).toBe(0);
        expect(right).toBe(0);
        expect(result.reactants[0]!.coefficient).toBe(1);
        expect(result.reactants[1]!.coefficient).toBe(1);
        expect(result.products[0]!.coefficient).toBe(1);
    });

    it("Na+ + OH- -> NaOH conserves charge", ()=>{
        const result = balance("Na+ + OH- -> NaOH");
        const split = splitEquation("Na+ + OH- -> NaOH");
        const left = totalCharge(result.reactants, split.reactants.map(s=>s.charge));
        const right = totalCharge(result.products, split.products.map(s=>s.charge));
        expect(left).toBe(right);
        expect(left).toBe(0);
        expect(right).toBe(0);
        expect(result.reactants[0]!.coefficient).toBe(1);
        expect(result.reactants[1]!.coefficient).toBe(1);
        expect(result.products[0]!.coefficient).toBe(1);
    });

    it("Ca2+ + Cl- -> CaCl2 conserves charge", ()=>{
        const result = balance("Ca2+ + Cl- -> CaCl2");
        const split = splitEquation("Ca2+ + Cl- -> CaCl2");
        const left = totalCharge(result.reactants, split.reactants.map(s=>s.charge));
        const right = totalCharge(result.products, split.products.map(s=>s.charge));
        expect(left).toBe(right);
        expect(left).toBe(0);
        expect(right).toBe(0);
        // Expected: 1, 2, 1
        expect(result.reactants[0]!.coefficient).toBe(1);
        expect(result.reactants[1]!.coefficient).toBe(2);
        expect(result.products[0]!.coefficient).toBe(1);
    });

    it("Al3+ + OH- -> Al(OH)3 conserves charge", ()=>{
        const result = balance("Al3+ + OH- -> Al(OH)3");
        const split = splitEquation("Al3+ + OH- -> Al(OH)3");
        const left = totalCharge(result.reactants, split.reactants.map(s=>s.charge));
        const right = totalCharge(result.products, split.products.map(s=>s.charge));
        expect(left).toBe(right);
        expect(left).toBe(0);
        expect(right).toBe(0);
        // Expected: 1, 3, 1
        expect(result.reactants[0]!.coefficient).toBe(1);
        expect(result.reactants[1]!.coefficient).toBe(3);
        expect(result.products[0]!.coefficient).toBe(1);
    });
});

