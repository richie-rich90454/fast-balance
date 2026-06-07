import { describe, it, expect } from "vitest";
import { parseFormula, parseWithoutMultiplier } from "../index";

describe("parseFormula", () => {
    it("can be called", () => {
        expect(parseFormula("H2O")).toBeDefined();
    });
});

describe("parseWithoutMultiplier", () => {
    it("can be called", () => {
        expect(parseWithoutMultiplier("H2O")).toBeDefined();
    });
});
