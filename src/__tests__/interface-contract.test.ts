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
