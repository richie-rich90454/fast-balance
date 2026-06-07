import { describe, it, expect } from "vitest";
import { gcd, lcm, stripStateSymbols } from "../index";

describe("gcd", () => {
    it("can be called", () => {
        expect(gcd(12, 8)).toBeDefined();
    });
});

describe("lcm", () => {
    it("can be called", () => {
        expect(lcm(4, 6)).toBeDefined();
    });
});

describe("stripStateSymbols", () => {
    it("can be called", () => {
        expect(stripStateSymbols("H2(g)")).toBeDefined();
    });
});
