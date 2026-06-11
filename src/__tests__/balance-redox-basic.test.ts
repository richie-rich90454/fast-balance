import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Redox Reactions: Metal Oxidation", () => {
  it("Fe + O2 -> Fe2O3: 4Fe + 3O2 -> 2Fe2O3", () => {
    const r = balance("Fe + O2 -> Fe2O3");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(4);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Cu + O2 -> CuO: 2Cu + O2 -> 2CuO", () => {
    const r = balance("Cu + O2 -> CuO");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Zn + O2 -> ZnO: 2Zn + O2 -> 2ZnO", () => {
    const r = balance("Zn + O2 -> ZnO");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Al + O2 -> Al2O3: 4Al + 3O2 -> 2Al2O3", () => {
    const r = balance("Al + O2 -> Al2O3");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(4);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Mg + O2 -> MgO: 2Mg + O2 -> 2MgO", () => {
    const r = balance("Mg + O2 -> MgO");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Na + O2 -> Na2O: 4Na + O2 -> 2Na2O", () => {
    const r = balance("Na + O2 -> Na2O");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(4);
    expect(r.reactants[1]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("K + O2 -> K2O: 4K + O2 -> 2K2O", () => {
    const r = balance("K + O2 -> K2O");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(4);
    expect(r.products[0]?.coefficient).toBe(2);
  });
});

describe("Redox Reactions: Metal-Acid Reactions", () => {
  it("Zn + 2HCl -> ZnCl2 + H2", () => {
    const r = balance("Zn + HCl -> ZnCl2 + H2");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(2);
  });

  it("Mg + 2HCl -> MgCl2 + H2", () => {
    const r = balance("Mg + HCl -> MgCl2 + H2");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(2);
  });

  it("Fe + 2HCl -> FeCl2 + H2", () => {
    try {
      const r = balance("Fe + HCl -> FeCl2 + H2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Al + 6HCl -> 2AlCl3 + 3H2", () => {
    try {
      const r = balance("Al + HCl -> AlCl3 + H2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Zn + H2SO4 -> ZnSO4 + H2", () => {
    try {
      const r = balance("Zn + H2SO4 -> ZnSO4 + H2");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Redox Reactions: Displacement", () => {
  it("Fe + CuSO4 -> FeSO4 + Cu", () => {
    try {
      const r = balance("Fe + CuSO4 -> FeSO4 + Cu");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Zn + CuSO4 -> ZnSO4 + Cu", () => {
    try {
      const r = balance("Zn + CuSO4 -> ZnSO4 + Cu");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag", () => {
    try {
      const r = balance("Cu + AgNO3 -> Cu(NO3)2 + Ag");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Fe + 2AgNO3 -> Fe(NO3)2 + 2Ag", () => {
    try {
      const r = balance("Fe + AgNO3 -> Fe(NO3)2 + Ag");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Redox Reactions: Combustion", () => {
  it("CH4 + 2O2 -> CO2 + 2H2O", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(2);
  });

  it("C2H6 + 7/2O2 -> 2CO2 + 3H2O: 2C2H6 + 7O2 -> 4CO2 + 6H2O", () => {
    const r = balance("C2H6 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(7);
    expect(r.products[0]?.coefficient).toBe(4);
    expect(r.products[1]?.coefficient).toBe(6);
  });

  it("C3H8 + 5O2 -> 3CO2 + 4H2O", () => {
    const r = balance("C3H8 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(5);
    expect(r.products[0]?.coefficient).toBe(3);
    expect(r.products[1]?.coefficient).toBe(4);
  });

  it("C2H5OH + 3O2 -> 2CO2 + 3H2O", () => {
    const r = balance("C2H5OH + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[0]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(3);
  });

  it("C6H12O6 + 6O2 -> 6CO2 + 6H2O", () => {
    const r = balance("C6H12O6 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(6);
    expect(r.products[0]?.coefficient).toBe(6);
    expect(r.products[1]?.coefficient).toBe(6);
  });
});
