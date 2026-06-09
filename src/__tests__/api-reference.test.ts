import {describe, it, expect} from "vitest";
import {
    balance,
    parseFormula,
    splitEquation,
    Fraction,
    gcd,
    lcm,
    stripStateSymbols,
    buildMatrix,
    solveSystem,
    fractionsToIntegers
} from "../index";

describe("API export verification", ()=>{
    it("balance is a function", ()=>{
        expect(typeof balance).toBe("function");
    });
    it("parseFormula is a function", ()=>{
        expect(typeof parseFormula).toBe("function");
    });
    it("splitEquation is a function", ()=>{
        expect(typeof splitEquation).toBe("function");
    });
    it("Fraction is a class", ()=>{
        expect(typeof Fraction).toBe("function");
        let f=new Fraction(1, 2);
        expect(f).toBeInstanceOf(Fraction);
    });
    it("gcd is a function", ()=>{
        expect(typeof gcd).toBe("function");
    });
    it("lcm is a function", ()=>{
        expect(typeof lcm).toBe("function");
    });
    it("stripStateSymbols is a function", ()=>{
        expect(typeof stripStateSymbols).toBe("function");
    });
    it("buildMatrix is a function", ()=>{
        expect(typeof buildMatrix).toBe("function");
    });
    it("solveSystem is a function", ()=>{
        expect(typeof solveSystem).toBe("function");
    });
    it("fractionsToIntegers is a function", ()=>{
        expect(typeof fractionsToIntegers).toBe("function");
    });
});

describe("function call signature", ()=>{
    it("balance takes a string input", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result).toBeDefined();
    });
    it("balance accepts an optional options argument", ()=>{
        let r1=balance("H2 + O2 -> H2O");
        let r2=balance("H2 + O2 -> H2O", {showOne: false});
        expect(r1).toBeDefined();
        expect(r2).toBeDefined();
    });
    it("balance returns object with reactants and products", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result).toHaveProperty("reactants");
        expect(result).toHaveProperty("products");
    });
    it("parseFormula takes a string", ()=>{
        let result=parseFormula("H2O");
        expect(result).toBeDefined();
    });
    it("parseFormula returns object with elements and charge", ()=>{
        let result=parseFormula("H2O");
        expect(result).toHaveProperty("elements");
        expect(result).toHaveProperty("charge");
    });
    it("splitEquation takes a string", ()=>{
        let result=splitEquation("H2 + O2 -> H2O");
        expect(result).toBeDefined();
    });
    it("splitEquation returns object with reactants and products", ()=>{
        let result=splitEquation("H2 + O2 -> H2O");
        expect(result).toHaveProperty("reactants");
        expect(result).toHaveProperty("products");
    });
    it("Fraction constructor accepts num and optional den", ()=>{
        let f1=new Fraction(3);
        let f2=new Fraction(3, 4);
        expect(f1.num).toBe(3);
        expect(f1.den).toBe(1);
        expect(f2.num).toBe(3);
        expect(f2.den).toBe(4);
    });
    it("gcd takes two numbers", ()=>{
        let result=gcd(12, 8);
        expect(result).toBe(4);
    });
    it("lcm takes two numbers", ()=>{
        let result=lcm(4, 6);
        expect(result).toBe(12);
    });
});

describe("options object validation", ()=>{
    it("options can be undefined (omitted)", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result).toBeDefined();
        expect(result.equation).toContain("->");
    });
    it("options can be an empty object", ()=>{
        let result=balance("H2 + O2 -> H2O", {});
        expect(result).toBeDefined();
        expect(result.equation).toContain("->");
    });
    it("options.showOne is a boolean or undefined", ()=>{
        // True case
        let r1=balance("H2 + O2 -> H2O", {showOne: true});
        expect(typeof r1.equation).toBe("string");
        // False case
        let r2=balance("H2 + O2 -> H2O", {showOne: false});
        expect(typeof r2.equation).toBe("string");
        // Undefined case
        let r3=balance("H2 + O2 -> H2O", {showOne: undefined});
        expect(typeof r3.equation).toBe("string");
    });
    it("options.format is a string or undefined", ()=>{
        let r1=balance("H2 + O2 -> H2O", {format: "text"});
        expect(typeof r1.equation).toBe("string");
        let r2=balance("H2 + O2 -> H2O", {format: "html"});
        expect(typeof r2.equation).toBe("string");
        let r3=balance("H2 + O2 -> H2O", {format: "latex"});
        expect(typeof r3.equation).toBe("string");
        let r4=balance("H2 + O2 -> H2O", {format: undefined});
        expect(typeof r4.equation).toBe("string");
    });
    it("options.format values are restricted to text/html/latex", ()=>{
        // text
        let textRes=balance("H2 + O2 -> H2O", {format: "text"});
        expect(textRes.equation).toContain(" -> ");
        // html
        let htmlRes=balance("H2 + O2 -> H2O", {format: "html"});
        expect(htmlRes.equation).toContain("&rarr;");
        // latex
        let latexRes=balance("H2 + O2 -> H2O", {format: "latex"});
        expect(latexRes.equation).toContain("\\rightarrow");
    });
    it("options with showOne and format together work", ()=>{
        let r=balance("H2 + O2 -> H2O", {showOne: false, format: "html"});
        expect(r.equation).toContain("&rarr;");
        expect(r.equation).not.toContain("1 O2");
    });
});
