import { describe, it, expect } from "vitest";
import { solveSystem, fractionsToIntegers } from "../index";
import { Fraction } from "../index";

describe("solveSystem", () => {
    it("can be called", () => {
        const matrix = [[new Fraction(2), new Fraction(-1)], [new Fraction(0), new Fraction(0)]];
        expect(solveSystem(matrix, 2)).toBeDefined();
    });
});

describe("fractionsToIntegers", () => {
    it("can be called", () => {
        expect(fractionsToIntegers([new Fraction(1, 2)])).toBeDefined();
    });
});
