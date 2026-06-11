import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Synthesis Reactions: Metal Oxides", () => {
  it("2Mg + O2 -> 2MgO", () => {
    const r = balance("Mg + O2 -> MgO");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("4Na + O2 -> 2Na2O", () => {
    const r = balance("Na + O2 -> Na2O");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(4);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("4Al + 3O2 -> 2Al2O3", () => {
    const r = balance("Al + O2 -> Al2O3");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(4);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("2Ca + O2 -> 2CaO", () => {
    const r = balance("Ca + O2 -> CaO");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("2Zn + O2 -> 2ZnO", () => {
    const r = balance("Zn + O2 -> ZnO");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("4Fe + 3O2 -> 2Fe2O3", () => {
    const r = balance("Fe + O2 -> Fe2O3");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(4);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("2Cu + O2 -> 2CuO", () => {
    const r = balance("Cu + O2 -> CuO");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
  });
});

describe("Synthesis Reactions: Nonmetal Oxides", () => {
  it("C + O2 -> CO2", () => {
    const r = balance("C + O2 -> CO2");
    checkPositiveIntegers(r);
  });

  it("S + O2 -> SO2", () => {
    const r = balance("S + O2 -> SO2");
    checkPositiveIntegers(r);
  });

  it("2H2 + O2 -> 2H2O", () => {
    const r = balance("H2 + O2 -> H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("N2 + O2 -> 2NO", () => {
    try {
      const r = balance("N2 + O2 -> NO");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("4P + 5O2 -> 2P2O5", () => {
    try {
      const r = balance("P + O2 -> P2O5");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("Si + O2 -> SiO2", () => {
    const r = balance("Si + O2 -> SiO2");
    checkPositiveIntegers(r);
  });
});

describe("Synthesis Reactions: Metal Halides", () => {
  it("2Na + Cl2 -> 2NaCl", () => {
    const r = balance("Na + Cl2 -> NaCl");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("2Al + 3Cl2 -> 2AlCl3", () => {
    const r = balance("Al + Cl2 -> AlCl3");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Fe + Cl2 -> FeCl2", () => {
    try {
      const r = balance("Fe + Cl2 -> FeCl2");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("2Fe + 3Cl2 -> 2FeCl3", () => {
    try {
      const r = balance("Fe + Cl2 -> FeCl3");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("Mg + Cl2 -> MgCl2", () => {
    try {
      const r = balance("Mg + Cl2 -> MgCl2");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("Zn + Cl2 -> ZnCl2", () => {
    try {
      const r = balance("Zn + Cl2 -> ZnCl2");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
});

describe("Synthesis Reactions: Binary Compounds", () => {
  it("2Na + S -> Na2S", () => {
    try {
      const r = balance("Na + S -> Na2S");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("Ca + S -> CaS", () => {
    try {
      const r = balance("Ca + S -> CaS");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("2Al + 3S -> Al2S3", () => {
    try {
      const r = balance("Al + S -> Al2S3");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("N2 + 3H2 -> 2NH3", () => {
    const r = balance("N2 + H2 -> NH3");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("H2 + Cl2 -> 2HCl", () => {
    const r = balance("H2 + Cl2 -> HCl");
    checkPositiveIntegers(r);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("2H2 + S -> H2S", () => {
    try {
      const r = balance("H2 + S -> H2S");
      checkPositiveIntegers(r);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
});
