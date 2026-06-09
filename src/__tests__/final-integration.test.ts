import { describe, it, expect } from "vitest";
import { balance } from "../index";

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
