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

describe("return value validation", ()=>{
    it("result.reactants is an array", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(Array.isArray(result.reactants)).toBe(true);
    });
    it("result.products is an array", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(Array.isArray(result.products)).toBe(true);
    });
    it("result.equation is a string", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(typeof result.equation).toBe("string");
        expect(result.equation.length).toBeGreaterThan(0);
    });
    it("result.reactants[0] has coefficient", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result.reactants[0]).toHaveProperty("coefficient");
        expect(typeof result.reactants[0]!.coefficient).toBe("number");
    });
    it("result.reactants[0] has formula", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result.reactants[0]).toHaveProperty("formula");
        expect(typeof result.reactants[0]!.formula).toBe("string");
    });
    it("result.products[0] has coefficient", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result.products[0]).toHaveProperty("coefficient");
        expect(typeof result.products[0]!.coefficient).toBe("number");
    });
    it("result.products[0] has formula", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result.products[0]).toHaveProperty("formula");
        expect(typeof result.products[0]!.formula).toBe("string");
    });
    it("all reactant entries have coefficient and formula", ()=>{
        let result=balance("H2 + O2 -> H2O");
        for (let r of result.reactants){
            expect(r).toHaveProperty("coefficient");
            expect(r).toHaveProperty("formula");
            expect(typeof r.coefficient).toBe("number");
            expect(typeof r.formula).toBe("string");
        }
    });
    it("all product entries have coefficient and formula", ()=>{
        let result=balance("H2 + O2 -> H2O");
        for (let p of result.products){
            expect(p).toHaveProperty("coefficient");
            expect(p).toHaveProperty("formula");
            expect(typeof p.coefficient).toBe("number");
            expect(typeof p.formula).toBe("string");
        }
    });
});

describe("parseFormula element type", ()=>{
    it("parseFormula('H2O').elements is an object", ()=>{
        let result=parseFormula("H2O");
        expect(typeof result.elements).toBe("object");
        expect(result.elements).not.toBeNull();
        expect(Array.isArray(result.elements)).toBe(false);
    });
    it("parseFormula('H2O').elements.H is 2", ()=>{
        let result=parseFormula("H2O");
        expect(result.elements.H).toBe(2);
    });
    it("parseFormula('H2O').elements.O is 1", ()=>{
        let result=parseFormula("H2O");
        expect(result.elements.O).toBe(1);
    });
    it("parseFormula('NaCl').elements.Na is 1", ()=>{
        let result=parseFormula("NaCl");
        expect(result.elements.Na).toBe(1);
    });
    it("parseFormula('NaCl').elements.Cl is 1", ()=>{
        let result=parseFormula("NaCl");
        expect(result.elements.Cl).toBe(1);
    });
    it("parseFormula('CO2').elements.C is 1", ()=>{
        let result=parseFormula("CO2");
        expect(result.elements.C).toBe(1);
        expect(result.elements.O).toBe(2);
    });
    it("parseFormula('C6H12O6') has all elements with correct counts", ()=>{
        let result=parseFormula("C6H12O6");
        expect(result.elements.C).toBe(6);
        expect(result.elements.H).toBe(12);
        expect(result.elements.O).toBe(6);
    });
    it("parseFormula('Ca(OH)2').elements values are correct", ()=>{
        let result=parseFormula("Ca(OH)2");
        expect(result.elements.Ca).toBe(1);
        expect(result.elements.O).toBe(2);
        expect(result.elements.H).toBe(2);
    });
    it("parseFormula('Fe2(SO4)3') has correct counts", ()=>{
        let result=parseFormula("Fe2(SO4)3");
        expect(result.elements.Fe).toBe(2);
        expect(result.elements.S).toBe(3);
        expect(result.elements.O).toBe(12);
    });
    it("parseFormula element values are numbers", ()=>{
        let result=parseFormula("H2SO4");
        for (let el in result.elements){
            expect(typeof result.elements[el]).toBe("number");
        }
    });
});

describe("parseFormula charge type", ()=>{
    it("parseFormula('Na+').charge is 1", ()=>{
        let result=parseFormula("Na+");
        expect(result.charge).toBe(1);
    });
    it("parseFormula('Cl-').charge is -1", ()=>{
        let result=parseFormula("Cl-");
        expect(result.charge).toBe(-1);
    });
    it("parseFormula('H2O').charge is 0", ()=>{
        let result=parseFormula("H2O");
        expect(result.charge).toBe(0);
    });
    it("parseFormula('e-').charge is -1", ()=>{
        let result=parseFormula("e-");
        expect(result.charge).toBe(-1);
    });
    it("parseFormula('SO4^2-').charge is -2", ()=>{
        let result=parseFormula("SO4^2-");
        expect(result.charge).toBe(-2);
    });
    it("parseFormula('Fe3+').charge is 3", ()=>{
        let result=parseFormula("Fe3+");
        expect(result.charge).toBe(3);
    });
    it("parseFormula('Ca2+').charge is 2", ()=>{
        let result=parseFormula("Ca2+");
        expect(result.charge).toBe(2);
    });
    it("parseFormula('OH-').charge is -1", ()=>{
        let result=parseFormula("OH-");
        expect(result.charge).toBe(-1);
    });
    it("parseFormula('Al3+').charge is 3", ()=>{
        let result=parseFormula("Al3+");
        expect(result.charge).toBe(3);
    });
    it("parseFormula('PO4^3-').charge is -3", ()=>{
        let result=parseFormula("PO4^3-");
        expect(result.charge).toBe(-3);
    });
});

describe("edge case balance inputs", ()=>{
    it("balance with leading whitespace", ()=>{
        let result=balance("   H2 + O2 -> H2O");
        expect(result.equation).toContain("H2");
        expect(result.equation).toContain("H2O");
    });
    it("balance with trailing whitespace", ()=>{
        let result=balance("H2 + O2 -> H2O   ");
        expect(result.equation).toContain("H2");
        expect(result.equation).toContain("H2O");
    });
    it("balance with extra spaces around operators", ()=>{
        let result=balance("H2   +   O2   ->   H2O");
        expect(result.equation).toContain("H2");
        expect(result.equation).toContain("H2O");
    });
    it("balance with tab characters works", ()=>{
        let result=balance("H2\t+\tO2\t->\tH2O");
        expect(result.equation).toContain("H2");
        expect(result.equation).toContain("H2O");
    });
    it("balance with no spaces around plus throws or parses (positive check)", ()=>{
        try{
            let result=balance("H2+O2->H2O");
            expect(result).toBeDefined();
        }
        catch (e){
            expect((e as Error).message).toBeDefined();
        }
    });
    it("balance with leading and trailing whitespace both", ()=>{
        let result=balance("  H2 + O2 -> H2O  ");
        expect(result.equation).toContain("H2");
        expect(result.equation).toContain("H2O");
    });
    it("balance with newlines works", ()=>{
        let result=balance("H2 + O2 ->\nH2O");
        expect(result.equation).toContain("H2");
    });
    it("balance trims input correctly", ()=>{
        let r1=balance("  H2 + O2 -> H2O  ");
        let r2=balance("H2 + O2 -> H2O");
        expect(r1.equation).toBe(r2.equation);
    });
    it("balance with mixed whitespace types", ()=>{
        let result=balance(" \t H2 \t + \t O2 \t -> \t H2O \t ");
        expect(result.equation).toContain("H2");
        expect(result.equation).toContain("H2O");
    });
});
