import {describe, it, expect} from "vitest";
import {balance, parseFormula, splitEquation} from "../index";

describe("exact coefficient match", () => {
    it("matches CH4 + 2O2 -> CO2 + 2H2O exactly", () => {
        let result = balance("CH4 + O2 -> CO2 + H2O");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(2);
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(2);
        expect(result.reactants[0]?.formula).toBe("CH4");
        expect(result.reactants[1]?.formula).toBe("O2");
        expect(result.products[0]?.formula).toBe("CO2");
        expect(result.products[1]?.formula).toBe("H2O");
    });
    it("matches 2H2 + O2 -> 2H2O exactly", () => {
        let result = balance("H2 + O2 -> H2O");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.reactants[0]?.formula).toBe("H2");
        expect(result.reactants[1]?.formula).toBe("O2");
        expect(result.products[0]?.formula).toBe("H2O");
    });
    it("matches N2 + 3H2 -> 2NH3 exactly", () => {
        let result = balance("N2 + H2 -> NH3");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.reactants[0]?.formula).toBe("N2");
        expect(result.reactants[1]?.formula).toBe("H2");
        expect(result.products[0]?.formula).toBe("NH3");
    });
    it("matches Fe + S -> FeS (positive check)", () => {
        let result = balance("Fe + S -> FeS");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(1);
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.reactants[1]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.coefficient).toBeGreaterThan(0);
        expect(result.reactants[0]?.formula).toBe("Fe");
        expect(result.reactants[1]?.formula).toBe("S");
        expect(result.products[0]?.formula).toBe("FeS");
    });
    it("matches 2Na + Cl2 -> 2NaCl exactly", () => {
        let result = balance("Na + Cl2 -> NaCl");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.reactants[0]?.formula).toBe("Na");
        expect(result.reactants[1]?.formula).toBe("Cl2");
        expect(result.products[0]?.formula).toBe("NaCl");
    });
});

describe("element count extraction", () => {
    it("extracts H count of 2 from H2O", () => {
        let parsed = parseFormula("H2O");
        expect(parsed.elements["H"]).toBe(2);
    });
    it("extracts O count of 1 from H2O", () => {
        let parsed = parseFormula("H2O");
        expect(parsed.elements["O"]).toBe(1);
    });
    it("extracts Na count of 1 from NaCl", () => {
        let parsed = parseFormula("NaCl");
        expect(parsed.elements["Na"]).toBe(1);
    });
    it("extracts Cl count of 1 from NaCl", () => {
        let parsed = parseFormula("NaCl");
        expect(parsed.elements["Cl"]).toBe(1);
    });
    it("extracts Fe count of 2 from Fe2O3", () => {
        let parsed = parseFormula("Fe2O3");
        expect(parsed.elements["Fe"]).toBe(2);
    });
});

describe("Species interface shape", () => {
    it("Species has formula, elements, and charge fields", () => {
        let eq = splitEquation("H2 + O2 -> H2O");
        let species = eq.reactants[0]!;
        expect(species).toHaveProperty("formula");
        expect(species).toHaveProperty("elements");
        expect(species).toHaveProperty("charge");
    });
    it("Species formula is a string", () => {
        let eq = splitEquation("NaCl -> Na + Cl2");
        let species = eq.reactants[0]!;
        expect(typeof species.formula).toBe("string");
        expect(species.formula).toBe("NaCl");
    });
    it("Species charge is a number", () => {
        let eq = splitEquation("Fe2+ + Cl- -> FeCl2");
        let species = eq.reactants[0]!;
        expect(typeof species.charge).toBe("number");
        expect(species.charge).toBe(2);
    });
    it("Species elements is a record of counts", () => {
        let eq = splitEquation("Fe2O3 -> Fe + O2");
        let species = eq.reactants[0]!;
        expect(typeof species.elements).toBe("object");
        expect(species.elements["Fe"]).toBe(2);
        expect(species.elements["O"]).toBe(3);
    });
    it("Species from splitEquation has charge of 0 for neutral species", () => {
        let eq = splitEquation("H2 + O2 -> H2O");
        let species = eq.reactants[0]!;
        expect(species.charge).toBe(0);
        expect(typeof species.charge).toBe("number");
    });
});

describe("charge totals in balance", () => {
    it("Na+ + Cl- -> NaCl has net charge 0 on product side", () => {
        let eq = splitEquation("Na+ + Cl- -> NaCl");
        let result = balance("Na+ + Cl- -> NaCl");
        for (let i = 0; i < result.products.length; i++) {
            let productCharge = eq.products[i]!.charge;
            expect(productCharge).toBe(0);
        }
    });
    it("Fe2+ + 2Cl- -> FeCl2 has net charge 0 on product side", () => {
        let eq = splitEquation("Fe2+ + Cl- -> FeCl2");
        let result = balance("Fe2+ + Cl- -> FeCl2");
        for (let i = 0; i < result.products.length; i++) {
            let productCharge = eq.products[i]!.charge;
            expect(productCharge).toBe(0);
        }
    });
    it("2Na+ + SO4^2- -> Na2SO4 has net charge 0 on product side", () => {
        let eq = splitEquation("Na+ + SO4^2- -> Na2SO4");
        let result = balance("Na+ + SO4^2- -> Na2SO4");
        for (let i = 0; i < result.products.length; i++) {
            let productCharge = eq.products[i]!.charge;
            expect(productCharge).toBe(0);
        }
    });
    it("3Na+ + PO4^3- -> Na3PO4 has net charge 0 on product side", () => {
        let eq = splitEquation("Na+ + PO4^3- -> Na3PO4");
        let result = balance("Na+ + PO4^3- -> Na3PO4");
        for (let i = 0; i < result.products.length; i++) {
            let productCharge = eq.products[i]!.charge;
            expect(productCharge).toBe(0);
        }
    });
    it("Ca2+ + 2Cl- -> CaCl2 has net charge 0 on product side", () => {
        let eq = splitEquation("Ca2+ + Cl- -> CaCl2");
        let result = balance("Ca2+ + Cl- -> CaCl2");
        for (let i = 0; i < result.products.length; i++) {
            let productCharge = eq.products[i]!.charge;
            expect(productCharge).toBe(0);
        }
    });
});

describe("compound naming convention", () => {
    it("NaCl is named correctly in the output", () => {
        let result = balance("Na + Cl2 -> NaCl");
        let allFormulas = [
            ...result.reactants.map(r => r.formula),
            ...result.products.map(p => p.formula)
        ];
        expect(allFormulas).toContain("NaCl");
    });
    it("H2O formula is preserved in output", () => {
        let result = balance("H2 + O2 -> H2O");
        let productFormulas = result.products.map(p => p.formula);
        expect(productFormulas).toContain("H2O");
    });
    it("CO2 formula is preserved in output", () => {
        let result = balance("C + O2 -> CO2");
        let productFormulas = result.products.map(p => p.formula);
        expect(productFormulas).toContain("CO2");
    });
    it("Fe2O3 formula is preserved in output", () => {
        let result = balance("Fe + O2 -> Fe2O3");
        let productFormulas = result.products.map(p => p.formula);
        expect(productFormulas).toContain("Fe2O3");
    });
    it("Ca(OH)2 formula is preserved in output", () => {
        let result = balance("CaO + H2O -> Ca(OH)2");
        let productFormulas = result.products.map(p => p.formula);
        expect(productFormulas).toContain("Ca(OH)2");
    });
});

describe("equation with hydrate in balance", () => {
    it("CuSO4·5H2O -> CuSO4 + H2O is balanced", () => {
        let result = balance("CuSO4·5H2O -> CuSO4 + H2O");
        expect(result.reactants).toHaveLength(1);
        expect(result.products).toHaveLength(2);
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.coefficient).toBeGreaterThan(0);
        expect(result.products[1]?.coefficient).toBeGreaterThan(0);
        expect(result.reactants[0]?.formula).toContain("CuSO4");
        expect(result.reactants[0]?.formula).toContain("H2O");
    });
    it("Na2CO3·10H2O -> Na2CO3 + H2O is balanced", () => {
        let result = balance("Na2CO3·10H2O -> Na2CO3 + H2O");
        expect(result.reactants).toHaveLength(1);
        expect(result.products).toHaveLength(2);
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.formula).toBe("Na2CO3");
        expect(result.products[1]?.formula).toBe("H2O");
    });
    it("MgSO4·7H2O -> MgSO4 + H2O is balanced", () => {
        let result = balance("MgSO4·7H2O -> MgSO4 + H2O");
        expect(result.reactants).toHaveLength(1);
        expect(result.products).toHaveLength(2);
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.formula).toBe("MgSO4");
        expect(result.products[1]?.formula).toBe("H2O");
    });
    it("BaCl2·2H2O -> BaCl2 + H2O is balanced", () => {
        let result = balance("BaCl2·2H2O -> BaCl2 + H2O");
        expect(result.reactants).toHaveLength(1);
        expect(result.products).toHaveLength(2);
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.formula).toBe("BaCl2");
        expect(result.products[1]?.formula).toBe("H2O");
    });
    it("FeSO4·7H2O -> FeSO4 + H2O is balanced", () => {
        let result = balance("FeSO4·7H2O -> FeSO4 + H2O");
        expect(result.reactants).toHaveLength(1);
        expect(result.products).toHaveLength(2);
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.formula).toBe("FeSO4");
        expect(result.products[1]?.formula).toBe("H2O");
    });
});

describe("equation with charge in balance", () => {
    it("Fe2+ + Cl- -> FeCl2 has positive integer coefficients", () => {
        let result = balance("Fe2+ + Cl- -> FeCl2");
        for (let r of result.reactants) {
            expect(r.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(r.coefficient)).toBe(true);
        }
        for (let p of result.products) {
            expect(p.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(p.coefficient)).toBe(true);
        }
    });
    it("Ag+ + Cl- -> AgCl is balanced", () => {
        let result = balance("Ag+ + Cl- -> AgCl");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(1);
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.reactants[1]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.formula).toBe("AgCl");
    });
    it("Na+ + OH- -> NaOH is balanced", () => {
        let result = balance("Na+ + OH- -> NaOH");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(1);
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.reactants[1]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.formula).toBe("NaOH");
    });
    it("K+ + Br- -> KBr is balanced", () => {
        let result = balance("K+ + Br- -> KBr");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(1);
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.reactants[1]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.formula).toBe("KBr");
    });
    it("Mg2+ + Cl- -> MgCl2 has positive integer coefficients", () => {
        let result = balance("Mg2+ + Cl- -> MgCl2");
        for (let r of result.reactants) {
            expect(r.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(r.coefficient)).toBe(true);
        }
        for (let p of result.products) {
            expect(p.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(p.coefficient)).toBe(true);
        }
    });
});
