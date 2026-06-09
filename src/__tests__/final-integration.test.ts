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
        expect(right).not.toContain("H2");
        expect(right).not.toContain("O2");
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
