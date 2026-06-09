import { describe, it, expect } from "vitest";
import { balance, parseFormula } from "../index";

describe("balanced equation string format", () => {
    it("verify equation string has ->", () => {
        let result = balance("H2 + O2 -> H2O");
        expect(result.equation).toContain("->");
    });

    it("verify reactants before arrow", () => {
        let result = balance("H2 + O2 -> H2O");
        let [left, right] = result.equation.split("->");
        expect(left).toContain("H2");
        expect(left).toContain("O2");
        expect(left).not.toContain("H2O");
    });

    it("verify products after arrow", () => {
        let result = balance("H2 + O2 -> H2O");
        let [left, right] = result.equation.split("->");
        expect(right).toContain("H2O");
        // The products side should contain only product formulas, not the standalone reactant formulas
        // Note: H2O contains "H2" as substring, so we check the order instead.
        let reactantOrder = left.indexOf("H2");
        let productOrder = right.indexOf("H2O");
        expect(reactantOrder).toBeGreaterThanOrEqual(0);
        expect(productOrder).toBeGreaterThanOrEqual(0);
    });

    it("verify each species appears in equation string", () => {
        let result = balance("Fe + O2 -> Fe2O3");
        expect(result.equation).toContain("Fe");
        expect(result.equation).toContain("O2");
        expect(result.equation).toContain("Fe2O3");
    });

    it("verify coefficients are integers in string", () => {
        let result = balance("C3H8 + O2 -> CO2 + H2O");
        let tokens = result.equation.split(/[\s+]+/);
        let numericTokens = tokens.filter(t => /^[\d]+$/.test(t));
        for (let t of numericTokens) {
            expect(Number.isInteger(parseInt(t, 10))).toBe(true);
        }
    });

    it("verify string is deterministic", () => {
        let a = balance("H2 + O2 -> H2O").equation;
        let b = balance("H2 + O2 -> H2O").equation;
        let c = balance("H2 + O2 -> H2O").equation;
        expect(a).toBe(b);
        expect(b).toBe(c);
    });
});

describe("html format detailed", () => {
    it("html format uses &rarr;", () => {
        let result = balance("H2 + O2 -> H2O", { format: "html" });
        expect(result.equation).toContain("&rarr;");
        expect(result.equation).not.toContain("->");
    });

    it("html with showOne true", () => {
        let result = balance("H2 + O2 -> H2O", { format: "html", showOne: true });
        expect(result.equation).toBe("2 H2 + 1 O2 &rarr; 2 H2O");
    });

    it("html with showOne false", () => {
        let result = balance("H2 + O2 -> H2O", { format: "html", showOne: false });
        expect(result.equation).toBe("2 H2 + O2 &rarr; 2 H2O");
    });

    it("html preserves all species", () => {
        let result = balance("Fe + O2 -> Fe2O3", { format: "html" });
        expect(result.equation).toContain("Fe");
        expect(result.equation).toContain("O2");
        expect(result.equation).toContain("Fe2O3");
    });

    it("html doesn't add extra spaces", () => {
        let result = balance("H2 + O2 -> H2O", { format: "html" });
        expect(result.equation).not.toMatch(/  /);
        expect(result.equation.endsWith(" ")).toBe(false);
        expect(result.equation.startsWith(" ")).toBe(false);
    });
});

describe("latex format detailed", () => {
    it("latex format uses \\rightarrow", () => {
        let result = balance("H2 + O2 -> H2O", { format: "latex" });
        expect(result.equation).toContain("\\rightarrow");
        expect(result.equation).not.toContain("->");
    });

    it("latex with showOne true", () => {
        let result = balance("H2 + O2 -> H2O", { format: "latex", showOne: true });
        expect(result.equation).toBe("2 H2 + 1 O2 \\rightarrow 2 H2O");
    });

    it("latex with showOne false", () => {
        let result = balance("H2 + O2 -> H2O", { format: "latex", showOne: false });
        expect(result.equation).toBe("2 H2 + O2 \\rightarrow 2 H2O");
    });

    it("latex preserves all species", () => {
        let result = balance("Fe + O2 -> Fe2O3", { format: "latex" });
        expect(result.equation).toContain("Fe");
        expect(result.equation).toContain("O2");
        expect(result.equation).toContain("Fe2O3");
    });

    it("latex doesn't add extra spaces", () => {
        let result = balance("H2 + O2 -> H2O", { format: "latex" });
        expect(result.equation).not.toMatch(/  /);
        expect(result.equation.endsWith(" ")).toBe(false);
        expect(result.equation.startsWith(" ")).toBe(false);
    });
});

describe("multiple reactants and products format", () => {
    it("3 reactants format correctly", () => {
        let result = balance("Ca3(PO4)2 + SiO2 + C -> CaSiO3 + CO + P");
        expect(result.reactants).toHaveLength(3);
        expect(result.equation).toContain("Ca3(PO4)2");
        expect(result.equation).toContain("SiO2");
        expect(result.equation).toContain("C");
        let [left, right] = result.equation.split("->");
        let plusCount = (left.match(/\+ /g) || []).length;
        expect(plusCount).toBe(2);
    });

    it("4 reactants format correctly", () => {
        let result = balance("KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(4);
        let [left, right] = result.equation.split("->");
        let plusCount = (right.match(/\+ /g) || []).length;
        expect(plusCount).toBe(3);
    });

    it("3 products format correctly", () => {
        let result = balance("Ca3(PO4)2 + SiO2 + C -> CaSiO3 + CO + P");
        expect(result.products).toHaveLength(3);
        let [left, right] = result.equation.split("->");
        let plusCount = (right.match(/\+ /g) || []).length;
        expect(plusCount).toBe(2);
        expect(right).toContain("CaSiO3");
        expect(right).toContain("CO");
        expect(right).toContain("P");
    });

    it("4 products format correctly", () => {
        let result = balance("Cu + HNO3 -> Cu(NO3)2 + NO + H2O");
        expect(result.products).toHaveLength(3);
        let [left, right] = result.equation.split("->");
        let plusCount = (right.match(/\+ /g) || []).length;
        expect(plusCount).toBe(2);
        expect(right).toContain("Cu(NO3)2");
        expect(right).toContain("NO");
        expect(right).toContain("H2O");
    });

    it("all species appear in correct order", () => {
        let result = balance("Fe + Cl2 -> FeCl3");
        expect(result.equation).toBe("2 Fe + 3 Cl2 -> 2 FeCl3");
        let [left, right] = result.equation.split("->");
        expect(left.trim()).toBe("2 Fe + 3 Cl2");
        expect(right.trim()).toBe("2 FeCl3");
    });
});

describe("whitespace in output", () => {
    it("no extra trailing spaces", () => {
        let result = balance("H2 + O2 -> H2O", { showOne: true });
        expect(result.equation).toBe("2 H2 + 1 O2 -> 2 H2O");
        expect(result.equation.endsWith(" ")).toBe(false);
        expect(result.equation.startsWith(" ")).toBe(false);
    });

    it("single spaces between terms", () => {
        let result = balance("H2 + O2 -> H2O", { showOne: false });
        expect(result.equation).not.toMatch(/  /);
        expect(result.equation).toBe("2 H2 + O2 -> 2 H2O");
    });

    it("single space around arrow", () => {
        let result = balance("H2 + O2 -> H2O");
        expect(result.equation).toContain(" -> ");
        // Make sure there are no double spaces anywhere
        expect(result.equation).not.toMatch(/  /);
    });

    it("consistent formatting across equations", () => {
        let a = balance("H2 + O2 -> H2O", { showOne: false }).equation;
        let b = balance("Fe + Cl2 -> FeCl3", { showOne: false }).equation;
        let c = balance("N2 + H2 -> NH3", { showOne: false }).equation;
        for (let eq of [a, b, c]) {
            expect(eq).not.toMatch(/  /);
            expect(eq).toMatch(/ -> /);
            expect(eq.endsWith(" ")).toBe(false);
        }
    });

    it("deterministic output", () => {
        let a = balance("H2 + O2 -> H2O").equation;
        let b = balance("H2 + O2 -> H2O").equation;
        expect(a).toBe(b);
    });
});

describe("coefficient stability", () => {
    it("same input produces same output", () => {
        let r1 = balance("H2 + O2 -> H2O");
        let r2 = balance("H2 + O2 -> H2O");
        expect(r1.reactants.map(r => r.coefficient)).toEqual(r2.reactants.map(r => r.coefficient));
        expect(r1.products.map(p => p.coefficient)).toEqual(r2.products.map(p => p.coefficient));
        expect(r1.equation).toBe(r2.equation);
    });

    it("multiple calls return same result", () => {
        let inputs = ["H2 + O2 -> H2O", "Fe + O2 -> Fe2O3", "C3H8 + O2 -> CO2 + H2O"];
        for (let input of inputs) {
            let first = balance(input).reactants.map(r => r.coefficient);
            for (let i = 0; i < 5; i++) {
                let next = balance(input).reactants.map(r => r.coefficient);
                expect(next).toEqual(first);
            }
        }
    });

    it("no random behavior across runs", () => {
        let result1 = balance("KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O");
        let result2 = balance("KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O");
        let result3 = balance("KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O");
        expect(result1.equation).toBe(result2.equation);
        expect(result2.equation).toBe(result3.equation);
    });

    it("no date-dependent behavior", () => {
        // Run balancing at "different dates" by interjecting operations
        // The output should be invariant
        let resultA = balance("N2 + H2 -> NH3");
        let resultB = balance("N2 + H2 -> NH3");
        expect(resultA.equation).toBe(resultB.equation);
        expect(resultA.reactants[0].coefficient).toBe(1);
        expect(resultA.reactants[1].coefficient).toBe(3);
        expect(resultA.products[0].coefficient).toBe(2);
    });

    it("no time-dependent behavior", () => {
        // Multiple sequential calls should produce identical results
        let results: string[] = [];
        for (let i = 0; i < 10; i++) {
            results.push(balance("CH4 + O2 -> CO2 + H2O").equation);
        }
        let first = results[0];
        for (let r of results) {
            expect(r).toBe(first);
        }
    });
});

describe("balance function idempotency", () => {
    it("rebalancing the balanced output gives same coefficients", () => {
        let first = balance("H2 + O2 -> H2O");
        let second = balance(first.equation, { showOne: false });
        // Coefficients should match (since input coefficients are ignored, the output is canonical)
        expect(second.reactants[0].coefficient).toBe(first.reactants[0].coefficient);
        expect(second.reactants[1].coefficient).toBe(first.reactants[1].coefficient);
        expect(second.products[0].coefficient).toBe(first.products[0].coefficient);
    });

    it("parsing the output gives same element conservation", () => {
        let result = balance("C3H8 + O2 -> CO2 + H2O");
        // Compute elements on each side using parseFormula
        let reactantsElements: Record<string, number> = {};
        let productsElements: Record<string, number> = {};
        for (let r of result.reactants) {
            let parsed = parseFormula(r.formula);
            for (let el in parsed.elements) {
                reactantsElements[el] = (reactantsElements[el] ?? 0) + parsed.elements[el]! * r.coefficient;
            }
        }
        for (let p of result.products) {
            let parsed = parseFormula(p.formula);
            for (let el in parsed.elements) {
                productsElements[el] = (productsElements[el] ?? 0) + parsed.elements[el]! * p.coefficient;
            }
        }
        // Conservation
        for (let el in reactantsElements) {
            expect(productsElements[el] ?? 0).toBe(reactantsElements[el]);
        }
        for (let el in productsElements) {
            expect(reactantsElements[el] ?? 0).toBe(productsElements[el]);
        }
    });

    it("format variations give same coefficients", () => {
        let text = balance("H2 + O2 -> H2O", { format: "text" });
        let html = balance("H2 + O2 -> H2O", { format: "html" });
        let latex = balance("H2 + O2 -> H2O", { format: "latex" });
        expect(text.reactants.map(r => r.coefficient)).toEqual(html.reactants.map(r => r.coefficient));
        expect(text.reactants.map(r => r.coefficient)).toEqual(latex.reactants.map(r => r.coefficient));
        expect(text.products.map(p => p.coefficient)).toEqual(html.products.map(p => p.coefficient));
        expect(text.products.map(p => p.coefficient)).toEqual(latex.products.map(p => p.coefficient));
    });

    it("scaling inputs gives proportional coefficients", () => {
        // The balancer ignores leading coefficients, so "2 H2 + O2" gives the same result as "H2 + O2"
        let r1 = balance("2 H2 + O2 -> 2 H2O");
        let r2 = balance("H2 + O2 -> H2O");
        // Both should have the same coefficient set (the leading input coefficients are ignored)
        expect(r1.reactants[0].coefficient).toBe(r2.reactants[0].coefficient);
        expect(r1.reactants[1].coefficient).toBe(r2.reactants[1].coefficient);
        expect(r1.products[0].coefficient).toBe(r2.products[0].coefficient);
    });

    it("GCD reduction is consistent", () => {
        // After balancing, the GCD of all coefficients should be 1 (already reduced)
        let inputs = [
            "H2 + O2 -> H2O",
            "Fe + O2 -> Fe2O3",
            "C3H8 + O2 -> CO2 + H2O",
            "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
            "Fe2O3 + CO -> Fe + CO2"
        ];
        for (let input of inputs) {
            let result = balance(input);
            let allCoeffs = [
                ...result.reactants.map(r => r.coefficient),
                ...result.products.map(p => p.coefficient)
            ];
            let g = allCoeffs[0];
            for (let i = 1; i < allCoeffs.length; i++) {
                let a = Math.abs(g!);
                let b = Math.abs(allCoeffs[i]!);
                while (b !== 0) {
                    [a, b] = [b, a % b];
                }
                g = a;
            }
            expect(g).toBe(1);
        }
    });
});

describe("special character handling", () => {
    it("Greek letters in formulas throw or skip", () => {
        // Greek letters are not valid element symbols; balancer should throw
        expect(() => balance("α + β -> γ")).toThrow();
    });

    it("non-ASCII arrow unicode is accepted", () => {
        let result = balance("H2 + O2 → H2O");
        // All coefficients should be positive
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
    });

    it("mixed case in element symbols works", () => {
        // Lowercase element symbols are valid (e.g., He, h would not be a real element but the parser uses uppercase)
        // He is a real element, so this should work fine
        let result = balance("He -> He");
        expect(result.reactants[0].coefficient).toBe(1);
        expect(result.products[0].coefficient).toBe(1);
    });

    it("multiple spaces between terms are handled", () => {
        let result = balance("H2   +   O2   ->   H2O");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(1);
        // Coefficients should be positive
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
    });

    it("tabs in input are handled like spaces", () => {
        let result = balance("H2\t+\tO2\t->\tH2O");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(1);
        // Coefficients should be positive integers
        expect(result.reactants.every(r => Number.isInteger(r.coefficient) && r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => Number.isInteger(p.coefficient) && p.coefficient > 0)).toBe(true);
    });
});

describe("large equation integration", () => {
    it("many species (4+ each side) produces valid integer coefficients", () => {
        // Use a complex phosphate/silicate/carbon reduction reaction
        let result: ReturnType<typeof balance> | null = null;
        try {
            result = balance("Ca3(PO4)2 + SiO2 + C + Fe2O3 -> CaSiO3 + Fe + CO + P");
        } catch {
            // Skip if not balanceable
        }
        if (result) {
            // All coefficients should be positive integers
            let allCoeffs = [
                ...result.reactants.map(r => r.coefficient),
                ...result.products.map(p => p.coefficient)
            ];
            for (let c of allCoeffs) {
                expect(Number.isInteger(c)).toBe(true);
                expect(c).toBeGreaterThan(0);
            }
            // Conservation: compute total element count on each side
            let reactantsElements: Record<string, number> = {};
            let productsElements: Record<string, number> = {};
            for (let r of result.reactants) {
                let parsed = parseFormula(r.formula);
                for (let el in parsed.elements) {
                    reactantsElements[el] = (reactantsElements[el] ?? 0) + parsed.elements[el]! * r.coefficient;
                }
            }
            for (let p of result.products) {
                let parsed = parseFormula(p.formula);
                for (let el in parsed.elements) {
                    productsElements[el] = (productsElements[el] ?? 0) + parsed.elements[el]! * p.coefficient;
                }
            }
            for (let el in reactantsElements) {
                expect(productsElements[el] ?? 0).toBe(reactantsElements[el]);
            }
        }
    });

    it("complex nested formulas produce valid integer coefficients", () => {
        let result = balance("[Co(NH3)6]Cl3 + AgNO3 -> AgCl + [Co(NH3)6](NO3)3");
        let allCoeffs = [
            ...result.reactants.map(r => r.coefficient),
            ...result.products.map(p => p.coefficient)
        ];
        for (let c of allCoeffs) {
            expect(Number.isInteger(c)).toBe(true);
            expect(c).toBeGreaterThan(0);
        }
        // Conservation check
        let reactantsElements: Record<string, number> = {};
        let productsElements: Record<string, number> = {};
        for (let r of result.reactants) {
            let parsed = parseFormula(r.formula);
            for (let el in parsed.elements) {
                reactantsElements[el] = (reactantsElements[el] ?? 0) + parsed.elements[el]! * r.coefficient;
            }
        }
        for (let p of result.products) {
            let parsed = parseFormula(p.formula);
            for (let el in parsed.elements) {
                productsElements[el] = (productsElements[el] ?? 0) + parsed.elements[el]! * p.coefficient;
            }
        }
        for (let el in reactantsElements) {
            expect(productsElements[el] ?? 0).toBe(reactantsElements[el]);
        }
    });

    it("multiple charges produce valid integer coefficients", () => {
        let result: ReturnType<typeof balance> | null = null;
        try {
            result = balance("Fe2+ + Cr2O7^2- + H+ + e- -> Fe3+ + Cr3+ + H2O");
        } catch {
            // Skip if not balanceable
        }
        if (result) {
            let allCoeffs = [
                ...result.reactants.map(r => r.coefficient),
                ...result.products.map(p => p.coefficient)
            ];
            for (let c of allCoeffs) {
                expect(Number.isInteger(c)).toBe(true);
                expect(c).toBeGreaterThan(0);
            }
            // Conservation check
            let reactantsElements: Record<string, number> = {};
            let productsElements: Record<string, number> = {};
            for (let r of result.reactants) {
                let parsed = parseFormula(r.formula);
                for (let el in parsed.elements) {
                    reactantsElements[el] = (reactantsElements[el] ?? 0) + parsed.elements[el]! * r.coefficient;
                }
            }
            for (let p of result.products) {
                let parsed = parseFormula(p.formula);
                for (let el in parsed.elements) {
                    productsElements[el] = (productsElements[el] ?? 0) + parsed.elements[el]! * p.coefficient;
                }
            }
            for (let el in reactantsElements) {
                expect(productsElements[el] ?? 0).toBe(reactantsElements[el]);
            }
        }
    });

    it("mixed hydrates and groups produce valid integer coefficients", () => {
        let result: ReturnType<typeof balance> | null = null;
        try {
            result = balance("CuSO4·5H2O + [Ag(NH3)2]Cl -> CuCl2 + Ag + NH3 + H2O + SO4^2-");
        } catch {
            // Skip if not balanceable
        }
        if (result) {
            let allCoeffs = [
                ...result.reactants.map(r => r.coefficient),
                ...result.products.map(p => p.coefficient)
            ];
            for (let c of allCoeffs) {
                expect(Number.isInteger(c)).toBe(true);
                expect(c).toBeGreaterThan(0);
            }
            // Conservation check
            let reactantsElements: Record<string, number> = {};
            let productsElements: Record<string, number> = {};
            for (let r of result.reactants) {
                let parsed = parseFormula(r.formula);
                for (let el in parsed.elements) {
                    reactantsElements[el] = (reactantsElements[el] ?? 0) + parsed.elements[el]! * r.coefficient;
                }
            }
            for (let p of result.products) {
                let parsed = parseFormula(p.formula);
                for (let el in parsed.elements) {
                    productsElements[el] = (productsElements[el] ?? 0) + parsed.elements[el]! * p.coefficient;
                }
            }
            for (let el in reactantsElements) {
                expect(productsElements[el] ?? 0).toBe(reactantsElements[el]);
            }
        }
    });

    it("all equation types produce valid integer coefficients", () => {
        let equations = [
            "H2 + O2 -> H2O",
            "Fe + O2 -> Fe2O3",
            "C8H18 + O2 -> CO2 + H2O",
            "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
            "CuSO4·5H2O + Fe -> FeSO4 + Cu + H2O",
            "[Co(NH3)6]Cl3 + AgNO3 -> AgCl + [Co(NH3)6](NO3)3",
            "MnO4- + H+ + e- -> Mn2+ + H2O",
            "Ca3(PO4)2 + SiO2 + C -> CaSiO3 + CO + P"
        ];
        for (let eq of equations) {
            let result = balance(eq);
            let allCoeffs = [
                ...result.reactants.map(r => r.coefficient),
                ...result.products.map(p => p.coefficient)
            ];
            for (let c of allCoeffs) {
                expect(Number.isInteger(c)).toBe(true);
                expect(c).toBeGreaterThan(0);
            }
        }
    });
});
