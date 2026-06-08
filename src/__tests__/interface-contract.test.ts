import {describe, it, expect} from "vitest";
import {balance} from "../index";

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
