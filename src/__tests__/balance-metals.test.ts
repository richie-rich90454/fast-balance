import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("alkali metal synthesis", () => {
  it("balances 2Na + Cl2 -> 2NaCl", () => {
    const r = balance("Na + Cl2 -> NaCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances 2K + Br2 -> 2KBr", () => {
    const r = balance("K + Br2 -> KBr");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances 2Li + Cl2 -> 2LiCl", () => {
    const r = balance("Li + Cl2 -> LiCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances 2Li + H2 -> 2LiH", () => {
    const r = balance("Li + H2 -> LiH");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances 2Na + S -> Na2S", () => {
    const r = balance("Na + S -> Na2S");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances 2K + H2 -> 2KH", () => {
    const r = balance("K + H2 -> KH");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("alkali metal + water", () => {
  it("balances 2Na + 2H2O -> 2NaOH + H2", () => {
    const r = balance("Na + H2O -> NaOH + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances 2K + 2H2O -> 2KOH + H2", () => {
    const r = balance("K + H2O -> KOH + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances 2Li + 2H2O -> 2LiOH + H2", () => {
    const r = balance("Li + H2O -> LiOH + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances Ca + 2H2O -> Ca(OH)2 + H2", () => {
    const r = balance("Ca + H2O -> Ca(OH)2 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Ba + 2H2O -> Ba(OH)2 + H2", () => {
    const r = balance("Ba + H2O -> Ba(OH)2 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("alkaline earth metal reactions", () => {
  it("balances Ca + Cl2 -> CaCl2", () => {
    const r = balance("Ca + Cl2 -> CaCl2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Mg + Cl2 -> MgCl2", () => {
    const r = balance("Mg + Cl2 -> MgCl2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Sr + Cl2 -> SrCl2", () => {
    const r = balance("Sr + Cl2 -> SrCl2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Ba + Cl2 -> BaCl2", () => {
    const r = balance("Ba + Cl2 -> BaCl2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances 2Ca + O2 -> 2CaO", () => {
    const r = balance("Ca + O2 -> CaO");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances 2Ba + O2 -> 2BaO", () => {
    const r = balance("Ba + O2 -> BaO");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("metal + acid displacement", () => {
  it("balances Zn + 2HCl -> ZnCl2 + H2", () => {
    const r = balance("Zn + HCl -> ZnCl2 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Mg + 2HCl -> MgCl2 + H2", () => {
    const r = balance("Mg + HCl -> MgCl2 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Fe + 2HCl -> FeCl2 + H2", () => {
    const r = balance("Fe + HCl -> FeCl2 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances 2Al + 6HCl -> 2AlCl3 + 3H2", () => {
    const r = balance("Al + HCl -> AlCl3 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });
  it("balances Zn + H2SO4 -> ZnSO4 + H2", () => {
    const r = balance("Zn + H2SO4 -> ZnSO4 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Mg + H2SO4 -> MgSO4 + H2", () => {
    const r = balance("Mg + H2SO4 -> MgSO4 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Fe + H2SO4 -> FeSO4 + H2", () => {
    const r = balance("Fe + H2SO4 -> FeSO4 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("halogen displacement", () => {
  it("balances Cl2 + 2KI -> 2KCl + I2", () => {
    const r = balance("Cl2 + KI -> KCl + I2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances Cl2 + 2KBr -> 2KCl + Br2", () => {
    const r = balance("Cl2 + KBr -> KCl + Br2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances Br2 + 2KI -> 2KBr + I2", () => {
    const r = balance("Br2 + KI -> KBr + I2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances F2 + 2NaCl -> 2NaF + Cl2", () => {
    const r = balance("F2 + NaCl -> NaF + Cl2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
  it("balances Cl2 + 2NaBr -> 2NaCl + Br2", () => {
    const r = balance("Cl2 + NaBr -> NaCl + Br2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
});

describe("transition metal salt displacement", () => {
  it("balances Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag", () => {
    const r = balance("Cu + AgNO3 -> Cu(NO3)2 + Ag");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
  it("balances Zn + CuSO4 -> ZnSO4 + Cu", () => {
    const r = balance("Zn + CuSO4 -> ZnSO4 + Cu");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Fe + CuSO4 -> FeSO4 + Cu", () => {
    const r = balance("Fe + CuSO4 -> FeSO4 + Cu");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Mg + CuSO4 -> MgSO4 + Cu", () => {
    const r = balance("Mg + CuSO4 -> MgSO4 + Cu");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Zn + Pb(NO3)2 -> Zn(NO3)2 + Pb", () => {
    const r = balance("Zn + Pb(NO3)2 -> Zn(NO3)2 + Pb");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("metal oxide and hydroxide decomposition", () => {
  it("balances MgCO3 -> MgO + CO2", () => {
    const r = balance("MgCO3 -> MgO + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances ZnCO3 -> ZnO + CO2", () => {
    const r = balance("ZnCO3 -> ZnO + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances CuCO3 -> CuO + CO2", () => {
    const r = balance("CuCO3 -> CuO + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances 2Fe(OH)3 -> Fe2O3 + 3H2O", () => {
    const r = balance("Fe(OH)3 -> Fe2O3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
  it("balances Mg(OH)2 -> MgO + H2O", () => {
    const r = balance("Mg(OH)2 -> MgO + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances Ca(OH)2 -> CaO + H2O", () => {
    const r = balance("Ca(OH)2 -> CaO + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
  it("balances 2Al(OH)3 -> Al2O3 + 3H2O", () => {
    const r = balance("Al(OH)3 -> Al2O3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
});
