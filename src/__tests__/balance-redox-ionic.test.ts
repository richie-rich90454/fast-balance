import { describe, it, expect } from "vitest";
import { balance } from "../index";

function expectPositiveIntegers(result: ReturnType<typeof balance>) {
  expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
  expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  const all = [...result.reactants.map(r => r.coefficient), ...result.products.map(p => p.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("metal displacement reactions", () => {
  it("balances Zn + CuSO4 -> ZnSO4 + Cu", () => {
    const result = balance("Zn + CuSO4 -> ZnSO4 + Cu");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Fe + CuSO4 -> FeSO4 + Cu", () => {
    const result = balance("Fe + CuSO4 -> FeSO4 + Cu");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Zn + AgNO3 -> Zn(NO3)2 + Ag", () => {
    const result = balance("Zn + AgNO3 -> Zn(NO3)2 + Ag");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances Mg + CuSO4 -> MgSO4 + Cu", () => {
    const result = balance("Mg + CuSO4 -> MgSO4 + Cu");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Al + FeCl3 -> AlCl3 + Fe", () => {
    const result = balance("Al + FeCl3 -> AlCl3 + Fe");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Fe + Ni(NO3)2 -> Fe(NO3)2 + Ni", () => {
    const result = balance("Fe + Ni(NO3)2 -> Fe(NO3)2 + Ni");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Zn + Pb(NO3)2 -> Zn(NO3)2 + Pb", () => {
    const result = balance("Zn + Pb(NO3)2 -> Zn(NO3)2 + Pb");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Cu + AgNO3 -> Cu(NO3)2 + Ag", () => {
    const result = balance("Cu + AgNO3 -> Cu(NO3)2 + Ag");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });
});

describe("acid-metal reactions", () => {
  it("balances Zn + HCl -> ZnCl2 + H2", () => {
    const result = balance("Zn + HCl -> ZnCl2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Mg + HCl -> MgCl2 + H2", () => {
    const result = balance("Mg + HCl -> MgCl2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Fe + HCl -> FeCl2 + H2", () => {
    const result = balance("Fe + HCl -> FeCl2 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Al + HCl -> AlCl3 + H2 (positive check)", () => {
    const result = balance("Al + HCl -> AlCl3 + H2");
    expectPositiveIntegers(result);
  });

  it("balances Zn + H2SO4 -> ZnSO4 + H2", () => {
    const result = balance("Zn + H2SO4 -> ZnSO4 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Mg + H2SO4 -> MgSO4 + H2", () => {
    const result = balance("Mg + H2SO4 -> MgSO4 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Fe + H2SO4 -> FeSO4 + H2", () => {
    const result = balance("Fe + H2SO4 -> FeSO4 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances 2Al + 6HCl -> 2AlCl3 + 3H2", () => {
    const result = balance("Al + HCl -> AlCl3 + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 6]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 3]);
  });
});
