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

describe("glass and ceramic formation", () => {
    it("balances Na2CO3 + SiO2 -> Na2SiO3 + CO2 (soda ash + silica)", () => {
        const result = balance("Na2CO3 + SiO2 -> Na2SiO3 + CO2");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    });

    it("balances CaCO3 + SiO2 -> CaSiO3 + CO2 (limestone + silica)", () => {
        const result = balance("CaCO3 + SiO2 -> CaSiO3 + CO2");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    });

    it("balances CaO + Al2O3 + SiO2 -> CaAl2Si2O8 (anorthite, positive check)", () => {
        const result = balance("CaO + Al2O3 + SiO2 -> CaAl2Si2O8");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 3Al2O3 + 2SiO2 -> Al6Si2O13 (mullite, positive check)", () => {
        const result = balance("3Al2O3 + 2SiO2 -> Al6Si2O13");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Al2O3 + SiO2 -> Al2SiO5 (kyanite/andaluiste/sillimanite, positive check)", () => {
        const result = balance("Al2O3 + SiO2 -> Al2SiO5");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2MgO + SiO2 -> Mg2SiO4 (forsterite, positive check)", () => {
        const result = balance("2MgO + SiO2 -> Mg2SiO4");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("cement and lime production", () => {
    it("balances CaCO3 -> CaO + CO2 (limestone calcination)", () => {
        const result = balance("CaCO3 -> CaO + CO2");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    });

    it("balances CaO + H2O -> Ca(OH)2 (slaking of lime)", () => {
        const result = balance("CaO + H2O -> Ca(OH)2");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1]);
    });

    it("balances Ca(OH)2 + CO2 -> CaCO3 + H2O (lime carbonation)", () => {
        const result = balance("Ca(OH)2 + CO2 -> CaCO3 + H2O");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    });

    it("balances 2CaO + SiO2 -> Ca2SiO4 (dicalcium silicate, positive check)", () => {
        const result = balance("2CaO + SiO2 -> Ca2SiO4");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 3CaO + SiO2 -> Ca3SiO5 (tricalcium silicate, positive check)", () => {
        const result = balance("3CaO + SiO2 -> Ca3SiO5");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances CaO + Al2O3 -> CaAl2O4 (calcium aluminate, positive check)", () => {
        const result = balance("CaO + Al2O3 -> CaAl2O4");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("metallurgy reactions", () => {
    it("balances Fe2O3 + CO -> Fe + CO2 (blast furnace reduction)", () => {
        const result = balance("Fe2O3 + CO -> Fe + CO2");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
        expect(result.products.map(p => p.coefficient)).toEqual([2, 3]);
    });

    it("balances Fe3O4 + CO -> Fe + CO2 (magnetite reduction, positive check)", () => {
        const result = balance("Fe3O4 + CO -> Fe + CO2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances ZnO + C -> Zn + CO (zinc smelting)", () => {
        const result = balance("ZnO + C -> Zn + CO");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    });

    it("balances Fe2O3 + C -> Fe + CO2 (carbothemic reduction, positive check)", () => {
        const result = balance("Fe2O3 + C -> Fe + CO2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances CuO + H2 -> Cu + H2O (copper oxide reduction)", () => {
        const result = balance("CuO + H2 -> Cu + H2O");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    });

    it("balances Cu2S + O2 -> Cu + SO2 (copper matte conversion, positive check)", () => {
        const result = balance("Cu2S + O2 -> Cu + SO2");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("petroleum refining reactions", () => {
    it("balances C12H26 -> C6H14 + C6H12 (dodecane cracking, positive check)", () => {
        const result = balance("C12H26 -> C6H14 + C6H12");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances C8H18 -> C4H10 + C4H8 (octane cracking, positive check)", () => {
        const result = balance("C8H18 -> C4H10 + C4H8");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances C2H4 + H2 -> C2H6 (ethylene hydrogenation)", () => {
        const result = balance("C2H4 + H2 -> C2H6");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1]);
    });

    it("balances C3H6 + H2 -> C3H8 (propylene hydrogenation)", () => {
        const result = balance("C3H6 + H2 -> C3H8");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1]);
    });

    it("balances C2H4 + H2O -> C2H5OH (ethanol hydration, positive check)", () => {
        const result = balance("C2H4 + H2O -> C2H5OH");
        expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
        expect(result.products.every(p => p.coefficient > 0)).toBe(true);
        const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances C2H6 -> C2H4 + H2 (ethane dehydrogenation/cracking)", () => {
        const result = balance("C2H6 -> C2H4 + H2");
        expect(result.reactants.map(r => r.coefficient)).toEqual([1]);
        expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
    });
});
