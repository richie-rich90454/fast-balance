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
