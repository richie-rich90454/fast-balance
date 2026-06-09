import {describe, it, expect} from "vitest";
import {balance, parseFormula} from "../index";

describe("balance return type contract", ()=>{
    it("result has reactants array", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result).toHaveProperty("reactants");
        expect(result.reactants).toBeDefined();
    });
    it("result has products array", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result).toHaveProperty("products");
        expect(result.products).toBeDefined();
    });
    it("result has equation string", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result).toHaveProperty("equation");
        expect(result.equation).toBeDefined();
    });
    it("result.reactants is array", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(Array.isArray(result.reactants)).toBe(true);
    });
    it("result.products is array", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(Array.isArray(result.products)).toBe(true);
    });
    it("result.equation is string", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(typeof result.equation).toBe("string");
    });
    it("reactants length matches input", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result.reactants).toHaveLength(2);
    });
    it("products length matches input", ()=>{
        let result=balance("CaCO3 -> CaO + CO2");
        expect(result.products).toHaveLength(2);
    });
});

describe("balance BalancedSpecies contract", ()=>{
    it("each reactant has coefficient (number)", ()=>{
        let result=balance("H2 + O2 -> H2O");
        for (let r of result.reactants){
            expect(typeof r.coefficient).toBe("number");
        }
    });
    it("each reactant has formula (string)", ()=>{
        let result=balance("H2 + O2 -> H2O");
        for (let r of result.reactants){
            expect(typeof r.formula).toBe("string");
        }
    });
    it("each product has coefficient (number)", ()=>{
        let result=balance("H2 + O2 -> H2O");
        for (let p of result.products){
            expect(typeof p.coefficient).toBe("number");
        }
    });
    it("each product has formula (string)", ()=>{
        let result=balance("H2 + O2 -> H2O");
        for (let p of result.products){
            expect(typeof p.formula).toBe("string");
        }
    });
    it("formula matches input", ()=>{
        let result=balance("H2 + O2 -> H2O");
        let formulas=result.reactants.map(r=>r.formula);
        expect(formulas).toEqual(["H2", "O2"]);
        let productFormulas=result.products.map(p=>p.formula);
        expect(productFormulas).toEqual(["H2O"]);
    });
    it("coefficient is integer", ()=>{
        let result=balance("H2 + O2 -> H2O");
        for (let r of result.reactants){
            expect(Number.isInteger(r.coefficient)).toBe(true);
        }
        for (let p of result.products){
            expect(Number.isInteger(p.coefficient)).toBe(true);
        }
    });
});

describe("balance option defaults", ()=>{
    it("no options uses showOne=true", ()=>{
        let result=balance("H2 + O2 -> H2O");
        // O2 has coefficient 1, so with showOne=true it should be present with "1 O2"
        expect(result.equation).toContain("1 O2");
    });
    it("no options uses format=text", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result.equation).toContain("->");
        expect(result.equation).not.toContain("&rarr;");
        expect(result.equation).not.toContain("\\rightarrow");
    });
    it("empty options {} uses defaults", ()=>{
        let result=balance("H2 + O2 -> H2O", {});
        expect(result.equation).toContain("1 O2");
        expect(result.equation).toContain("->");
    });
    it("options.showOne=true preserves", ()=>{
        let result=balance("H2 + O2 -> H2O", {showOne: true});
        expect(result.equation).toContain("1 O2");
    });
    it("options.showOne=false omits 1", ()=>{
        let result=balance("H2 + O2 -> H2O", {showOne: false});
        expect(result.equation).not.toContain("1 O2");
        expect(result.equation).toContain("O2");
    });
    it("options.format=text uses ->", ()=>{
        let result=balance("H2 + O2 -> H2O", {format: "text"});
        expect(result.equation).toContain("->");
    });
});

describe("format option behavior", ()=>{
    it("format=text uses '->'", ()=>{
        let result=balance("H2 + O2 -> H2O", {format: "text"});
        expect(result.equation).toContain(" -> ");
    });
    it("format=html uses '&rarr;'", ()=>{
        let result=balance("H2 + O2 -> H2O", {format: "html"});
        expect(result.equation).toContain("&rarr;");
        expect(result.equation).not.toContain(" -> ");
    });
    it("format=latex uses '\\\\rightarrow'", ()=>{
        let result=balance("H2 + O2 -> H2O", {format: "latex"});
        expect(result.equation).toContain("\\rightarrow");
        expect(result.equation).not.toContain(" -> ");
    });
    it("format=text default", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result.equation).toContain(" -> ");
    });
    it("all formats produce same coefficients", ()=>{
        let textResult=balance("H2 + O2 -> H2O", {format: "text"});
        let htmlResult=balance("H2 + O2 -> H2O", {format: "html"});
        let latexResult=balance("H2 + O2 -> H2O", {format: "latex"});
        expect(textResult.reactants).toEqual(htmlResult.reactants);
        expect(htmlResult.reactants).toEqual(latexResult.reactants);
        expect(textResult.products).toEqual(htmlResult.products);
        expect(htmlResult.products).toEqual(latexResult.products);
    });
    it("format option doesn't change coefficients", ()=>{
        let r1=balance("CH4 + O2 -> CO2 + H2O");
        let r2=balance("CH4 + O2 -> CO2 + H2O", {format: "html"});
        let r3=balance("CH4 + O2 -> CO2 + H2O", {format: "latex"});
        expect(r1.reactants).toEqual(r2.reactants);
        expect(r2.reactants).toEqual(r3.reactants);
        expect(r1.products).toEqual(r2.products);
        expect(r2.products).toEqual(r3.products);
    });
});

describe("showOne option behavior", ()=>{
    it("showOne=true shows '1 '", ()=>{
        let result=balance("H2 + O2 -> H2O", {showOne: true});
        // O2 coefficient is 1, so it should appear as "1 O2"
        expect(result.equation).toMatch(/1\s+O2/);
    });
    it("showOne=false omits '1 '", ()=>{
        let result=balance("H2 + O2 -> H2O", {showOne: false});
        // O2 coefficient is 1, so it should appear without the leading "1 "
        expect(result.equation).not.toMatch(/1\s+O2/);
        expect(result.equation).toContain("O2");
    });
    it("showOne=true default", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result.equation).toMatch(/1\s+O2/);
    });
    it("showOne=false explicit", ()=>{
        let result=balance("H2 + O2 -> H2O", {showOne: false});
        expect(result.equation).not.toMatch(/1\s+O2/);
    });
    it("showOne with multiple species", ()=>{
        let result=balance("CaCO3 -> CaO + CO2", {showOne: false});
        // All coefficients are 1, so none should be displayed
        expect(result.equation).not.toMatch(/1\s+CaCO3/);
        expect(result.equation).not.toMatch(/1\s+CaO/);
        expect(result.equation).not.toMatch(/1\s+CO2/);
        expect(result.equation).toContain("CaCO3");
        expect(result.equation).toContain("CaO");
        expect(result.equation).toContain("CO2");
    });
    it("showOne affects only coefficient=1 terms", ()=>{
        let result=balance("H2 + O2 -> H2O", {showOne: false});
        // H2 has coefficient 2 - it must still be displayed
        expect(result.equation).toContain("2 H2");
        // H2O has coefficient 2 - it must still be displayed
        expect(result.equation).toContain("2 H2O");
        // O2 has coefficient 1 - it should not have "1 " prefix
        expect(result.equation).not.toMatch(/1\s+O2/);
    });
});

describe("parseFormula return type", ()=>{
    it("returns object with elements", ()=>{
        let result=parseFormula("H2O");
        expect(result).toHaveProperty("elements");
        expect(result.elements).toBeDefined();
    });
    it("returns object with charge", ()=>{
        let result=parseFormula("H2O");
        expect(result).toHaveProperty("charge");
        expect(result.charge).toBeDefined();
    });
    it("elements is object", ()=>{
        let result=parseFormula("H2O");
        expect(typeof result.elements).toBe("object");
        expect(result.elements).not.toBeNull();
        expect(Array.isArray(result.elements)).toBe(false);
    });
    it("elements values are numbers", ()=>{
        let result=parseFormula("H2O");
        for (let el in result.elements){
            expect(typeof result.elements[el]).toBe("number");
        }
    });
    it("charge is number", ()=>{
        let result=parseFormula("H2O");
        expect(typeof result.charge).toBe("number");
    });
    it("charge defaults to 0", ()=>{
        let result=parseFormula("H2O");
        expect(result.charge).toBe(0);
    });
});
