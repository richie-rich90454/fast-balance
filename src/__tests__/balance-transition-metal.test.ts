import { describe, it, expect } from "vitest";
import { balance } from "../index";

function expectPositiveCoefficients(result: ReturnType<typeof balance>) {
  expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
  expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  const all = [
    ...result.reactants.map(r => r.coefficient),
    ...result.products.map(p => p.coefficient),
  ];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("iron compound reactions", () => {
  it("balances 2Fe + 3Cl2 -> 2FeCl3", () => {
    const r = balance("Fe + Cl2 -> FeCl3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances Fe + S -> FeS", () => {
    const r = balance("Fe + S -> FeS");
    expectPositiveCoefficients(r);
  });

  it("balances Fe2O3 + 3CO -> 2Fe + 3CO2", () => {
    const r = balance("Fe2O3 + CO -> Fe + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });

  it("balances Fe + O2 -> Fe2O3", () => {
    const r = balance("Fe + O2 -> Fe2O3");
    expectPositiveCoefficients(r);
  });

  it("balances FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl", () => {
    const r = balance("FeCl3 + NaOH -> Fe(OH)3 + NaCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });

  it("balances Fe2O3 + 6HCl -> 2FeCl3 + 3H2O", () => {
    const r = balance("Fe2O3 + HCl -> FeCl3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });

  it("balances Fe + CuSO4 -> FeSO4 + Cu", () => {
    const r = balance("Fe + CuSO4 -> FeSO4 + Cu");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances FeS + O2 -> Fe2O3 + SO2", () => {
    const r = balance("FeS + O2 -> Fe2O3 + SO2");
    expectPositiveCoefficients(r);
  });
});

describe("copper compound reactions", () => {
  it("balances Cu + Cl2 -> CuCl2", () => {
    const r = balance("Cu + Cl2 -> CuCl2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances 2Cu + O2 -> 2CuO", () => {
    const r = balance("Cu + O2 -> CuO");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances CuO + H2 -> Cu + H2O", () => {
    const r = balance("CuO + H2 -> Cu + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag", () => {
    const r = balance("Cu + AgNO3 -> Cu(NO3)2 + Ag");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });

  it("balances Cu(OH)2 + 2HCl -> CuCl2 + 2H2O", () => {
    const r = balance("Cu(OH)2 + HCl -> CuCl2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });

  it("balances CuCO3 -> CuO + CO2", () => {
    const r = balance("CuCO3 -> CuO + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances Cu + S -> Cu2S", () => {
    const r = balance("Cu + S -> Cu2S");
    expectPositiveCoefficients(r);
  });

  it("balances CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4", () => {
    const r = balance("CuSO4 + NaOH -> Cu(OH)2 + Na2SO4");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("zinc compound reactions", () => {
  it("balances Zn + 2HCl -> ZnCl2 + H2", () => {
    const r = balance("Zn + HCl -> ZnCl2 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances 2Zn + O2 -> 2ZnO", () => {
    const r = balance("Zn + O2 -> ZnO");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances ZnO + 2HCl -> ZnCl2 + H2O", () => {
    const r = balance("ZnO + HCl -> ZnCl2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances Zn + CuSO4 -> ZnSO4 + Cu", () => {
    const r = balance("Zn + CuSO4 -> ZnSO4 + Cu");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances Zn + H2SO4 -> ZnSO4 + H2", () => {
    const r = balance("Zn + H2SO4 -> ZnSO4 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances Zn(OH)2 + 2HCl -> ZnCl2 + 2H2O", () => {
    const r = balance("Zn(OH)2 + HCl -> ZnCl2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
});

describe("aluminum compound reactions", () => {
  it("balances 2Al + 3Cl2 -> 2AlCl3", () => {
    const r = balance("Al + Cl2 -> AlCl3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances 4Al + 3O2 -> 2Al2O3", () => {
    const r = balance("Al + O2 -> Al2O3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([4, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances Al2O3 + 6HCl -> 2AlCl3 + 3H2O", () => {
    const r = balance("Al2O3 + HCl -> AlCl3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });

  it("balances Al(OH)3 + 3HCl -> AlCl3 + 3H2O", () => {
    const r = balance("Al(OH)3 + HCl -> AlCl3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });

  it("balances Al + HCl -> AlCl3 + H2", () => {
    const r = balance("Al + HCl -> AlCl3 + H2");
    expectPositiveCoefficients(r);
  });

  it("balances Al2(SO4)3 + 6NaOH -> 2Al(OH)3 + 3Na2SO4", () => {
    const r = balance("Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });
});
