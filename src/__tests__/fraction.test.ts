import { describe, it, expect } from "vitest";
import { Fraction } from "../index";

describe("Fraction", () => {
    it("can be constructed", () => {
        expect(new Fraction(1, 2)).toBeDefined();
    });
});
