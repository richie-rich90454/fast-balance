import { describe, it, expect } from "vitest";
import { splitEquation, buildMatrix } from "../index";

describe("splitEquation", () => {
    it("can be called", () => {
        expect(splitEquation("H2 + O2 -> H2O")).toBeDefined();
    });
});

describe("buildMatrix", () => {
    it("can be called", () => {
        const eq = splitEquation("H2 + O2 -> H2O");
        expect(buildMatrix(eq.reactants, eq.products)).toBeDefined();
    });
});
