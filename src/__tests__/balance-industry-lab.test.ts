import {describe, it, expect} from "vitest";
import {balance} from "../index";

describe("Organic lab reactions", () => {
    it("balances CH3COOH + C2H5OH -> CH3COOC2H5 + H2O", () => {
        const r = balance("CH3COOH + C2H5OH -> CH3COOC2H5 + H2O");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "CH3COOH")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "C2H5OH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "CH3COOC2H5")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "H2O")?.coefficient).toBe(1);
    });

    it("balances C6H5OH + NaOH -> C6H5ONa + H2O (positive check)", () => {
        const r = balance("C6H5OH + NaOH -> C6H5ONa + H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances C2H5Br + NaOH -> C2H5OH + NaBr", () => {
        const r = balance("C2H5Br + NaOH -> C2H5OH + NaBr");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "C2H5Br")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "NaOH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "C2H5OH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "NaBr")?.coefficient).toBe(1);
    });

    it("balances CH3Cl + NaOH -> CH3OH + NaCl", () => {
        const r = balance("CH3Cl + NaOH -> CH3OH + NaCl");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "CH3Cl")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "NaOH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "CH3OH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "NaCl")?.coefficient).toBe(1);
    });

    it("balances C2H5Cl + KOH -> C2H5OH + KCl", () => {
        const r = balance("C2H5Cl + KOH -> C2H5OH + KCl");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "C2H5Cl")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "KOH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "C2H5OH")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "KCl")?.coefficient).toBe(1);
    });
});

describe("Oxidation and reduction lab reactions", () => {
    it("balances CH3CH2OH + K2Cr2O7 + H2SO4 -> CH3COOH + K2SO4 + Cr2(SO4)3 + H2O (positive check)", () => {
        const r = balance("CH3CH2OH + K2Cr2O7 + H2SO4 -> CH3COOH + K2SO4 + Cr2(SO4)3 + H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances 2KMnO4 + 3H2SO4 + 5H2S -> K2SO4 + 2MnSO4 + 5S + 8H2O (positive check)", () => {
        const r = balance("2KMnO4 + 3H2SO4 + 5H2S -> K2SO4 + 2MnSO4 + 5S + 8H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Fe2+ + MnO4- -> Fe3+ + Mn2+ (positive check)", () => {
        const r = balance("Fe2+ + MnO4- -> Fe3+ + Mn2+");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Sn2+ + Fe3+ -> Sn4+ + Fe2+ (positive check)", () => {
        const r = balance("Sn2+ + Fe3+ -> Sn4+ + Fe2+");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Cu + Ag+ -> Cu2+ + Ag (positive check)", () => {
        const r = balance("Cu + Ag+ -> Cu2+ + Ag");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Combustion lab reactions", () => {
    it("balances C2H6O + O2 -> CO2 + H2O", () => {
        const r = balance("C2H6O + O2 -> CO2 + H2O");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "C2H6O")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "CO2")?.coefficient).toBe(2);
        expect(r.products.find(x => x.formula === "H2O")?.coefficient).toBe(3);
    });

    it("balances C3H8O + O2 -> CO2 + H2O", () => {
        const r = balance("C3H8O + O2 -> CO2 + H2O");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "C3H8O")?.coefficient).toBe(2);
        expect(r.products.find(x => x.formula === "CO2")?.coefficient).toBe(6);
        expect(r.products.find(x => x.formula === "H2O")?.coefficient).toBe(8);
    });

    it("balances C4H10O + O2 -> CO2 + H2O (positive check)", () => {
        const r = balance("C4H10O + O2 -> CO2 + H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances C7H8 + O2 -> CO2 + H2O", () => {
        const r = balance("C7H8 + O2 -> CO2 + H2O");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "C7H8")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "CO2")?.coefficient).toBe(7);
        expect(r.products.find(x => x.formula === "H2O")?.coefficient).toBe(4);
    });

    it("balances C10H8 + O2 -> CO2 + H2O (positive check)", () => {
        const r = balance("C10H8 + O2 -> CO2 + H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Electrochemistry lab reactions", () => {
    it("balances Zn + Cu2+ -> Zn2+ + Cu", () => {
        const r = balance("Zn + Cu2+ -> Zn2+ + Cu");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "Zn")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "Cu2+")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "Zn2+")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "Cu")?.coefficient).toBe(1);
    });

    it("balances Mg + Zn2+ -> Mg2+ + Zn", () => {
        const r = balance("Mg + Zn2+ -> Mg2+ + Zn");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "Mg")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "Zn2+")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "Mg2+")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "Zn")?.coefficient).toBe(1);
    });

    it("balances Fe + Cu2+ -> Fe2+ + Cu", () => {
        const r = balance("Fe + Cu2+ -> Fe2+ + Cu");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "Fe")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "Cu2+")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "Fe2+")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "Cu")?.coefficient).toBe(1);
    });

    it("balances Al + Ag+ -> Al3+ + Ag (positive check)", () => {
        const r = balance("Al + Ag+ -> Al3+ + Ag");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Ni + Cu2+ -> Ni2+ + Cu (positive check)", () => {
        const r = balance("Ni + Cu2+ -> Ni2+ + Cu");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Water treatment reactions", () => {
    it("balances Fe2+ + Cl2 -> Fe3+ + Cl- (positive check)", () => {
        const r = balance("Fe2+ + Cl2 -> Fe3+ + Cl-");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Mn2+ + Cl2 -> Mn4+ + Cl- (positive check)", () => {
        const r = balance("Mn2+ + Cl2 -> Mn4+ + Cl-");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Cl2 + H2O -> HCl + HClO", () => {
        const r = balance("Cl2 + H2O -> HCl + HClO");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "Cl2")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "H2O")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "HCl")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "HClO")?.coefficient).toBe(1);
    });

    it("balances SO2 + H2O -> H2SO3", () => {
        const r = balance("SO2 + H2O -> H2SO3");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "SO2")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "H2O")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "H2SO3")?.coefficient).toBe(1);
    });

    it("balances Ca(OH)2 + CO2 -> CaCO3 + H2O", () => {
        const r = balance("Ca(OH)2 + CO2 -> CaCO3 + H2O");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "Ca(OH)2")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "CO2")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "CaCO3")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "H2O")?.coefficient).toBe(1);
    });
});

describe("Ore processing reactions", () => {
    it("balances ZnS + O2 -> ZnO + SO2 (positive check)", () => {
        const r = balance("ZnS + O2 -> ZnO + SO2");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances CuFeS2 + O2 -> Cu2S + FeS + SO2 (positive check)", () => {
        const r = balance("CuFeS2 + O2 -> Cu2S + FeS + SO2");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances PbS + O2 -> PbO + SO2 (positive check)", () => {
        const r = balance("PbS + O2 -> PbO + SO2");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances FeCr2O4 + O2 -> Fe2O3 + Cr2O3 (positive check)", () => {
        const r = balance("FeCr2O4 + O2 -> Fe2O3 + Cr2O3");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances MnO2 + C -> Mn + CO2 (positive check)", () => {
        const r = balance("MnO2 + C -> Mn + CO2");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});

describe("Pyrometallurgy reactions", () => {
    it("balances Fe2O3 + C -> Fe + CO2 (positive check)", () => {
        const r = balance("Fe2O3 + C -> Fe + CO2");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Fe3O4 + C -> Fe + CO2 (positive check)", () => {
        const r = balance("Fe3O4 + C -> Fe + CO2");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances FeO + C -> Fe + CO (positive check)", () => {
        const r = balance("FeO + C -> Fe + CO");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances SnO2 + C -> Sn + CO (positive check)", () => {
        const r = balance("SnO2 + C -> Sn + CO");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Cr2O3 + Al -> Cr + Al2O3", () => {
        const r = balance("Cr2O3 + Al -> Cr + Al2O3");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "Cr2O3")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "Al")?.coefficient).toBe(2);
        expect(r.products.find(x => x.formula === "Cr")?.coefficient).toBe(2);
        expect(r.products.find(x => x.formula === "Al2O3")?.coefficient).toBe(1);
    });
});

describe("Hydrometallurgy reactions", () => {
    it("balances Au + CN- + O2 -> Au(CN)2- + OH- (positive check)", () => {
        const r = balance("Au + CN- + O2 -> Au(CN)2- + OH-");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Ag + CN- + O2 -> Ag(CN)2- + OH- (positive check)", () => {
        const r = balance("Ag + CN- + O2 -> Ag(CN)2- + OH-");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Cu + H2SO4 + O2 -> CuSO4 + H2O (positive check)", () => {
        const r = balance("Cu + H2SO4 + O2 -> CuSO4 + H2O");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });

    it("balances Zn + H2SO4 -> ZnSO4 + H2", () => {
        const r = balance("Zn + H2SO4 -> ZnSO4 + H2");
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
        expect(r.reactants.find(x => x.formula === "Zn")?.coefficient).toBe(1);
        expect(r.reactants.find(x => x.formula === "H2SO4")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "ZnSO4")?.coefficient).toBe(1);
        expect(r.products.find(x => x.formula === "H2")?.coefficient).toBe(1);
    });

    it("balances Al + NaOH + H2O -> NaAlO2 + H2 (positive check)", () => {
        const r = balance("Al + NaOH + H2O -> NaAlO2 + H2");
        expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
        expect(r.products.every(s => s.coefficient > 0)).toBe(true);
        const all = [
            ...r.reactants.map(x => x.coefficient),
            ...r.products.map(x => x.coefficient),
        ];
        expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    });
});
