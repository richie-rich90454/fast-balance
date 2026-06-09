import {describe, it, expect} from "vitest";
import {balance} from "../index";

describe("thermite and industrial reactions", () => {
    it("balances the classic thermite reaction 2Al + Fe2O3 -> Al2O3 + 2Fe", () => {
        const result = balance("2Al + Fe2O3 -> Al2O3 + 2Fe");
        expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
    });

    it("balances 8Al + 3Fe3O4 -> 4Al2O3 + 9Fe (positive check)", () => {
        const result = balance("8Al + 3Fe3O4 -> 4Al2O3 + 9Fe");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2Al + Cr2O3 -> Al2O3 + 2Cr (positive check)", () => {
        const result = balance("2Al + Cr2O3 -> Al2O3 + 2Cr");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Si + 2FeO -> SiO2 + 2Fe (positive check)", () => {
        const result = balance("Si + 2FeO -> SiO2 + 2Fe");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2Mg + TiCl4 -> 2MgCl2 + Ti (Kroll process)", () => {
        const result = balance("2Mg + TiCl4 -> 2MgCl2 + Ti");
        expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
    });

    it("balances CaO + SiO2 -> CaSiO3 (calcium silicate formation)", () => {
        const result = balance("CaO + SiO2 -> CaSiO3");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1]);
    });

    it("balances 2CaO + SiO2 -> Ca2SiO4 (dicalcium silicate, positive check)", () => {
        const result = balance("2CaO + SiO2 -> Ca2SiO4");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Na2O + SiO2 -> Na2SiO3 (sodium silicate formation)", () => {
        const result = balance("Na2O + SiO2 -> Na2SiO3");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1]);
    });
});
