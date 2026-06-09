import { describe, it, expect } from "vitest";
import { balance, parseFormula } from "../index";

describe("performance benchmarks", () => {
    it("balances H2 + O2 -> H2O in under 100ms", () => {
        let start = performance.now();
        let result = balance("H2 + O2 -> H2O");
        let duration = performance.now() - start;
        expect(duration).toBeLessThan(100);
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(2);
    });

    it("balances Fe + Cl2 -> FeCl3 in under 100ms", () => {
        let start = performance.now();
        let result = balance("Fe + Cl2 -> FeCl3");
        let duration = performance.now() - start;
        expect(duration).toBeLessThan(100);
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(2);
    });

    it("balances CH4 + O2 -> CO2 + H2O in under 100ms", () => {
        let start = performance.now();
        let result = balance("CH4 + O2 -> CO2 + H2O");
        let duration = performance.now() - start;
        expect(duration).toBeLessThan(100);
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(2);
    });

    it("balances 100 simple equations in under 1s", () => {
        let equations = [
            "H2 + O2 -> H2O",
            "N2 + H2 -> NH3",
            "Fe + O2 -> Fe2O3",
            "C + O2 -> CO2",
            "C + O2 -> CO",
            "KClO3 -> KCl + O2",
            "H2O -> H2 + O2",
            "Al + O2 -> Al2O3",
            "Zn + HCl -> ZnCl2 + H2",
            "Mg + HCl -> MgCl2 + H2"
        ];
        let start = performance.now();
        for (let i = 0; i < 100; i++) {
            let eq = equations[i % equations.length]!;
            let result = balance(eq);
            expect(result.reactants.length).toBeGreaterThan(0);
            expect(result.products.length).toBeGreaterThan(0);
        }
        let duration = performance.now() - start;
        expect(duration).toBeLessThan(1000);
    });

    it("balances C8H18 + O2 -> CO2 + H2O in under 100ms", () => {
        let start = performance.now();
        let result = balance("C8H18 + O2 -> CO2 + H2O");
        let duration = performance.now() - start;
        expect(duration).toBeLessThan(100);
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(25);
        expect(result.products[0]?.coefficient).toBe(16);
        expect(result.products[1]?.coefficient).toBe(18);
    });
});

describe("large matrix handling", () => {
    let fiveSpecies = "KClO3 + HCl -> KCl + Cl2 + H2O";
    let sixSpecies = "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O";
    let sevenSpecies = "KMnO4 + FeSO4 + H2SO4 -> K2SO4 + MnSO4 + Fe2(SO4)3 + H2O";

    it("balances a 5-species reaction", () => {
        let result = balance(fiveSpecies);
        expect(result.reactants.length + result.products.length).toBe(5);
        let allCoeffs = [...result.reactants, ...result.products].map(s => s.coefficient);
        for (let c of allCoeffs) {
            expect(c).toBeGreaterThan(0);
        }
    });

    it("balances a 6-species reaction", () => {
        let result = balance(sixSpecies);
        expect(result.reactants.length + result.products.length).toBe(6);
        let allCoeffs = [...result.reactants, ...result.products].map(s => s.coefficient);
        for (let c of allCoeffs) {
            expect(c).toBeGreaterThan(0);
        }
    });

    it("balances a 7-species reaction", () => {
        let result = balance(sevenSpecies);
        expect(result.reactants.length + result.products.length).toBe(7);
        let allCoeffs = [...result.reactants, ...result.products].map(s => s.coefficient);
        for (let c of allCoeffs) {
            expect(c).toBeGreaterThan(0);
        }
    });

    it("all large equations complete quickly", () => {
        let equations = [fiveSpecies, sixSpecies, sevenSpecies];
        for (let eq of equations) {
            let start = performance.now();
            balance(eq);
            let duration = performance.now() - start;
            expect(duration).toBeLessThan(100);
        }
    });

    it("all large equations produce positive integer coefficients", () => {
        let equations = [fiveSpecies, sixSpecies, sevenSpecies];
        for (let eq of equations) {
            let result = balance(eq);
            let all = [...result.reactants, ...result.products];
            for (let s of all) {
                expect(Number.isInteger(s.coefficient)).toBe(true);
                expect(s.coefficient).toBeGreaterThan(0);
            }
        }
    });
});

describe("complex nested formulas", () => {
    it("balances Ca3(PO4)2 + H2SO4 -> CaSO4 + H3PO4", () => {
        let result = balance("Ca3(PO4)2 + H2SO4 -> CaSO4 + H3PO4");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(3);
        expect(result.products[1]?.coefficient).toBe(2);
    });

    it("balances Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4", () => {
        let result = balance("Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(6);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.products[1]?.coefficient).toBe(3);
    });

    it("balances (NH4)2SO4 + NaOH -> NH3 + Na2SO4 + H2O", () => {
        let result = balance("(NH4)2SO4 + NaOH -> NH3 + Na2SO4 + H2O");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });

    it("balances K4[Fe(CN)6] + 3 H2SO4 -> 2 K2SO4 + FeSO4 + 6 HCN", () => {
        let result = balance("K4[Fe(CN)6] + 3 H2SO4 -> 2 K2SO4 + FeSO4 + 6 HCN");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });

    it("balances Fe4[Fe(CN)6]3 + NaOH -> Fe(OH)3 + Na4[Fe(CN)6]", () => {
        let result = balance("Fe4[Fe(CN)6]3 + NaOH -> Fe(OH)3 + Na4[Fe(CN)6]");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });
});

describe("common ion effect", () => {
    it("balances NaCl + AgNO3 -> AgCl + NaNO3", () => {
        let result = balance("NaCl + AgNO3 -> AgCl + NaNO3");
        for (let s of result.reactants) expect(s.coefficient).toBe(1);
        for (let s of result.products) expect(s.coefficient).toBe(1);
    });

    it("balances KBr + AgNO3 -> AgBr + KNO3", () => {
        let result = balance("KBr + AgNO3 -> AgBr + KNO3");
        for (let s of result.reactants) expect(s.coefficient).toBe(1);
        for (let s of result.products) expect(s.coefficient).toBe(1);
    });

    it("balances KI + AgNO3 -> AgI + KNO3", () => {
        let result = balance("KI + AgNO3 -> AgI + KNO3");
        for (let s of result.reactants) expect(s.coefficient).toBe(1);
        for (let s of result.products) expect(s.coefficient).toBe(1);
    });

    it("balances Na2SO4 + BaCl2 -> BaSO4 + NaCl", () => {
        let result = balance("Na2SO4 + BaCl2 -> BaSO4 + NaCl");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(2);
    });

    it("balances Na2CO3 + CaCl2 -> CaCO3 + NaCl", () => {
        let result = balance("Na2CO3 + CaCl2 -> CaCO3 + NaCl");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });
});

describe("thermal decomposition", () => {
    it("balances CaCO3 -> CaO + CO2", () => {
        let result = balance("CaCO3 -> CaO + CO2");
        for (let s of result.reactants) expect(s.coefficient).toBe(1);
        for (let s of result.products) expect(s.coefficient).toBe(1);
    });

    it("balances 2 KClO3 -> 2 KCl + 3 O2", () => {
        let result = balance("2 KClO3 -> 2 KCl + 3 O2");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.products[1]?.coefficient).toBe(3);
    });

    it("balances 2 NaNO3 -> 2 NaNO2 + O2", () => {
        let result = balance("2 NaNO3 -> 2 NaNO2 + O2");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.products[1]?.coefficient).toBe(1);
    });

    it("balances Cu(OH)2 -> CuO + H2O", () => {
        let result = balance("Cu(OH)2 -> CuO + H2O");
        for (let s of result.reactants) expect(s.coefficient).toBe(1);
        for (let s of result.products) expect(s.coefficient).toBe(1);
    });

    it("balances 2 Fe(OH)3 -> Fe2O3 + 3 H2O", () => {
        let result = balance("2 Fe(OH)3 -> Fe2O3 + 3 H2O");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(3);
    });
});

describe("metal carbonyls", () => {
    it("balances Ni + CO -> Ni(CO)4", () => {
        let result = balance("Ni + CO -> Ni(CO)4");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(4);
        expect(result.products[0]?.coefficient).toBe(1);
    });

    it("balances Fe + CO -> Fe(CO)5", () => {
        let result = balance("Fe + CO -> Fe(CO)5");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });

    it("balances Mo + CO -> Mo(CO)6", () => {
        let result = balance("Mo + CO -> Mo(CO)6");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });

    it("balances W + CO -> W(CO)6", () => {
        let result = balance("W + CO -> W(CO)6");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });

    it("balances Co + CO -> Co2(CO)8", () => {
        let result = balance("Co + CO -> Co2(CO)8");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });
});

describe("Friedel-Crafts type reactions", () => {
    it("balances C6H6 + Cl2 -> C6H5Cl + HCl", () => {
        let result = balance("C6H6 + Cl2 -> C6H5Cl + HCl");
        for (let s of result.reactants) expect(s.coefficient).toBe(1);
        for (let s of result.products) expect(s.coefficient).toBe(1);
    });

    it("balances C6H6 + C2H4 -> C6H5C2H5", () => {
        let result = balance("C6H6 + C2H4 -> C6H5C2H5");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });

    it("balances C6H6 + HNO3 -> C6H5NO2 + H2O", () => {
        let result = balance("C6H6 + HNO3 -> C6H5NO2 + H2O");
        for (let s of result.reactants) expect(s.coefficient).toBe(1);
        for (let s of result.products) expect(s.coefficient).toBe(1);
    });

    it("balances C6H5Cl + HNO3 -> C6H4ClNO2 + H2O", () => {
        let result = balance("C6H5Cl + HNO3 -> C6H4ClNO2 + H2O");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });

    it("balances C6H5CH3 + HNO3 -> C6H4CH3NO2 + H2O", () => {
        let result = balance("C6H5CH3 + HNO3 -> C6H4CH3NO2 + H2O");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });
});

describe("sulfur dioxide reactions", () => {
    it("balances SO2 + H2O -> H2SO3", () => {
        let result = balance("SO2 + H2O -> H2SO3");
        for (let s of result.reactants) expect(s.coefficient).toBe(1);
        for (let s of result.products) expect(s.coefficient).toBe(1);
    });

    it("balances SO2 + NaOH -> NaHSO3", () => {
        let result = balance("SO2 + NaOH -> NaHSO3");
        for (let s of result.reactants) expect(s.coefficient).toBe(1);
        for (let s of result.products) expect(s.coefficient).toBe(1);
    });

    it("balances SO2 + NaOH -> Na2SO3", () => {
        let result = balance("SO2 + NaOH -> Na2SO3 + H2O");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
        expect(result.reactants[1]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(1);
    });

    it("balances SO2 + O2 -> SO3", () => {
        let result = balance("SO2 + O2 -> SO3");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(2);
    });

    it("balances SO2 + Cl2 -> SO2Cl2", () => {
        let result = balance("SO2 + Cl2 -> SO2Cl2");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });
});

describe("nitrogen dioxide reactions", () => {
    it("balances NO2 + H2O -> HNO3 + NO", () => {
        let result = balance("NO2 + H2O -> HNO3 + NO");
        expect(result.reactants[0]?.coefficient).toBe(3);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.products[1]?.coefficient).toBe(1);
    });

    it("balances 2 NO2 + H2O -> HNO3 + HNO2", () => {
        let result = balance("2 NO2 + H2O -> HNO3 + HNO2");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(1);
    });

    it("balances 4 NO2 + O2 + 2 H2O -> 4 HNO3", () => {
        let result = balance("4 NO2 + O2 + 2 H2O -> 4 HNO3");
        expect(result.reactants[0]?.coefficient).toBe(4);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.reactants[2]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(4);
    });

    it("balances NO2 + NaOH -> NaNO3 + NaNO2 + H2O", () => {
        let result = balance("NO2 + NaOH -> NaNO3 + NaNO2 + H2O");
        let all = [...result.reactants, ...result.products];
        for (let s of all) {
            expect(s.coefficient).toBeGreaterThan(0);
            expect(Number.isInteger(s.coefficient)).toBe(true);
        }
    });

    it("balances N2O4 -> 2 NO2", () => {
        let result = balance("N2O4 -> 2 NO2");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(2);
    });
});
