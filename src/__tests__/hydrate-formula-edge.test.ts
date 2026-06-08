import { describe, it, expect } from "vitest";
import { balance, parseFormula } from "../index";

describe("hydrate decomposition", () => {
  it("balances CuSO4·5H2O -> CuSO4 + H2O", () => {
    const result = balance("CuSO4·5H2O -> CuSO4 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(5);
  });

  it("balances BaCl2·2H2O -> BaCl2 + H2O", () => {
    const result = balance("BaCl2·2H2O -> BaCl2 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(2);
  });

  it("balances Na2CO3·10H2O -> Na2CO3 + H2O", () => {
    const result = balance("Na2CO3·10H2O -> Na2CO3 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(10);
  });

  it("balances MgSO4·7H2O -> MgSO4 + H2O", () => {
    const result = balance("MgSO4·7H2O -> MgSO4 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(7);
  });

  it("balances CaCl2·2H2O -> CaCl2 + H2O", () => {
    const result = balance("CaCl2·2H2O -> CaCl2 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(2);
  });

  it("balances FeSO4·7H2O -> FeSO4 + H2O", () => {
    const result = balance("FeSO4·7H2O -> FeSO4 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(7);
  });

  it("balances CoCl2·6H2O -> CoCl2 + H2O", () => {
    const result = balance("CoCl2·6H2O -> CoCl2 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(6);
  });

  it("balances Na2S2O3·5H2O -> Na2S2O3 + H2O", () => {
    const result = balance("Na2S2O3·5H2O -> Na2S2O3 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(5);
  });
});

describe("hydrate with reagent", () => {
  it("balances CuSO4·5H2O + Fe -> FeSO4 + Cu + H2O", () => {
    const result = balance("CuSO4·5H2O + Fe -> FeSO4 + Cu + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances BaCl2·2H2O + Na2SO4 -> BaSO4 + NaCl + H2O", () => {
    const result = balance("BaCl2·2H2O + Na2SO4 -> BaSO4 + NaCl + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances Na2CO3·10H2O + HCl -> NaCl + H2O + CO2", () => {
    const result = balance("Na2CO3·10H2O + HCl -> NaCl + H2O + CO2");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances CaCl2·2H2O + Na2CO3 -> CaCO3 + NaCl + H2O", () => {
    const result = balance("CaCl2·2H2O + Na2CO3 -> CaCO3 + NaCl + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances MgSO4·7H2O + NaOH -> Mg(OH)2 + Na2SO4 + H2O", () => {
    const result = balance("MgSO4·7H2O + NaOH -> Mg(OH)2 + Na2SO4 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances CuSO4·5H2O + NaOH -> Cu(OH)2 + Na2SO4 + H2O", () => {
    const result = balance("CuSO4·5H2O + NaOH -> Cu(OH)2 + Na2SO4 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("asterisk hydrate notation", () => {
  it("balances Na2CO3*10H2O -> Na2CO3 + H2O", () => {
    const result = balance("Na2CO3*10H2O -> Na2CO3 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(10);
  });

  it("balances MgSO4*7H2O -> MgSO4 + H2O", () => {
    const result = balance("MgSO4*7H2O -> MgSO4 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(7);
  });

  it("balances BaCl2*2H2O -> BaCl2 + H2O", () => {
    const result = balance("BaCl2*2H2O -> BaCl2 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(2);
  });

  it("balances CuSO4*5H2O -> CuSO4 + H2O", () => {
    const result = balance("CuSO4*5H2O -> CuSO4 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(5);
  });

  it("balances CaCl2*2H2O -> CaCl2 + H2O", () => {
    const result = balance("CaCl2*2H2O -> CaCl2 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(2);
  });

  it("balances FeSO4*7H2O -> FeSO4 + H2O", () => {
    const result = balance("FeSO4*7H2O -> FeSO4 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(7);
  });
});

describe("bullet hydrate notation", () => {
  it("balances Na2CO3•10H2O -> Na2CO3 + H2O", () => {
    const result = balance("Na2CO3•10H2O -> Na2CO3 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(10);
  });

  it("balances MgSO4•7H2O -> MgSO4 + H2O", () => {
    const result = balance("MgSO4•7H2O -> MgSO4 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(7);
  });

  it("balances BaCl2•2H2O -> BaCl2 + H2O", () => {
    const result = balance("BaCl2•2H2O -> BaCl2 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(2);
  });

  it("balances CuSO4•5H2O -> CuSO4 + H2O", () => {
    const result = balance("CuSO4•5H2O -> CuSO4 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(5);
  });

  it("balances CaCl2•2H2O -> CaCl2 + H2O", () => {
    const result = balance("CaCl2•2H2O -> CaCl2 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(2);
  });

  it("balances CoCl2•6H2O -> CoCl2 + H2O", () => {
    const result = balance("CoCl2•6H2O -> CoCl2 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[1]?.coefficient).toBe(6);
  });
});

describe("mixed hydrate notation consistency", () => {
  it("parses CuSO4·5H2O and CuSO4*5H2O to same elements", () => {
    const dot = parseFormula("CuSO4·5H2O");
    const asterisk = parseFormula("CuSO4*5H2O");
    expect(dot.elements).toEqual(asterisk.elements);
    expect(dot.charge).toBe(asterisk.charge);
  });

  it("parses BaCl2·2H2O and BaCl2*2H2O to same elements", () => {
    const dot = parseFormula("BaCl2·2H2O");
    const asterisk = parseFormula("BaCl2*2H2O");
    expect(dot.elements).toEqual(asterisk.elements);
    expect(dot.charge).toBe(asterisk.charge);
  });

  it("parses Na2CO3·10H2O and Na2CO3•10H2O to same elements", () => {
    const dot = parseFormula("Na2CO3·10H2O");
    const bullet = parseFormula("Na2CO3•10H2O");
    expect(dot.elements).toEqual(bullet.elements);
    expect(dot.charge).toBe(bullet.charge);
  });

  it("balances hydrate with charge: [Cu(NH3)4]SO4·H2O", () => {
    const result = balance("[Cu(NH3)4]SO4·H2O -> [Cu(NH3)4]SO4 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances hydrate with brackets: [Co(NH3)6]Cl3·H2O", () => {
    const result = balance("[Co(NH3)6]Cl3·H2O -> [Co(NH3)6]Cl3 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances mixed hydrate: CuSO4·5H2O + BaCl2 -> BaSO4 + CuCl2 + H2O", () => {
    const result = balance("CuSO4·5H2O + BaCl2 -> BaSO4 + CuCl2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("formula with multiple group types", () => {
  it("balances Ca3(PO4)2 + H2SO4 -> CaSO4 + H3PO4", () => {
    const result = balance("Ca3(PO4)2 + H2SO4 -> CaSO4 + H3PO4");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([3, 2]);
  });

  it("balances Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4", () => {
    const result = balance("Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 6]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 3]);
  });

  it("balances (NH4)2SO4 + NaOH -> NH3 + Na2SO4 + H2O", () => {
    const result = balance("(NH4)2SO4 + NaOH -> NH3 + Na2SO4 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances Fe4[Fe(CN)6]3 + NaOH -> Fe(OH)3 + Na4[Fe(CN)6]", () => {
    const result = balance("Fe4[Fe(CN)6]3 + NaOH -> Fe(OH)3 + Na4[Fe(CN)6]");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances Mg3(PO4)2 + HCl -> MgCl2 + H3PO4", () => {
    const result = balance("Mg3(PO4)2 + HCl -> MgCl2 + H3PO4");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances Ca3(PO4)2 + SiO2 + C -> CaSiO3 + CO + P", () => {
    const result = balance("Ca3(PO4)2 + SiO2 + C -> CaSiO3 + CO + P");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances Ba3(PO4)2 + H2SO4 -> BaSO4 + H3PO4", () => {
    const result = balance("Ba3(PO4)2 + H2SO4 -> BaSO4 + H3PO4");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances Sr3(PO4)2 + H2SO4 -> SrSO4 + H3PO4", () => {
    const result = balance("Sr3(PO4)2 + H2SO4 -> SrSO4 + H3PO4");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("formula with consecutive groups", () => {
  it("balances (NH4)2Cr2O7 -> N2 + Cr2O3 + H2O", () => {
    const result = balance("(NH4)2Cr2O7 -> N2 + Cr2O3 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances (NH4)2C2O4 -> NH3 + CO + CO2 + H2O", () => {
    const result = balance("(NH4)2C2O4 -> NH3 + CO + CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances (NH4)2CO3 -> NH3 + H2O + CO2", () => {
    const result = balance("(NH4)2CO3 -> NH3 + H2O + CO2");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances (NH4)2S -> NH3 + H2S", () => {
    const result = balance("(NH4)2S -> NH3 + H2S");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances (NH4)2SO3 -> NH3 + H2O + SO2", () => {
    const result = balance("(NH4)2SO3 -> NH3 + H2O + SO2");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances (NH4)2SO4 + NaOH -> NH3 + Na2SO4 + H2O", () => {
    const result = balance("(NH4)2SO4 + NaOH -> NH3 + Na2SO4 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});
