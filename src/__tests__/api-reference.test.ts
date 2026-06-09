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
