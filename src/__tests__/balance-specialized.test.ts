import { describe, it, expect } from "vitest";
import { balance } from "../index";

function expectPositiveCoefficients(result: ReturnType<typeof balance>) {
  expect(result.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(result.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [
    ...result.reactants.map(x => x.coefficient),
    ...result.products.map(x => x.coefficient),
  ];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("coordination complex formation", () => {
  it("balances CuSO4 + 4NH3 -> [Cu(NH3)4]SO4", () => {
    const r = balance("CuSO4 + NH3 -> [Cu(NH3)4]SO4");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 4]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances AgCl + 2NH3 -> [Ag(NH3)2]Cl", () => {
    const r = balance("AgCl + NH3 -> [Ag(NH3)2]Cl");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances CoCl3 + 6NH3 -> [Co(NH3)6]Cl3", () => {
    const r = balance("CoCl3 + NH3 -> [Co(NH3)6]Cl3");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances FeCl3 + 6KCN -> K3[Fe(CN)6] + 3KCl", () => {
    const r = balance("FeCl3 + KCN -> K3[Fe(CN)6] + KCl");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });

  it("balances NiCl2 + 6NH3 -> [Ni(NH3)6]Cl2", () => {
    const r = balance("NiCl2 + NH3 -> [Ni(NH3)6]Cl2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("group 13 element oxidation", () => {
  it("balances 4B + 3O2 -> 2B2O3", () => {
    const r = balance("B + O2 -> B2O3");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([4, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances 4Al + 3O2 -> 2Al2O3", () => {
    const r = balance("Al + O2 -> Al2O3");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([4, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances 4Ga + 3O2 -> 2Ga2O3", () => {
    const r = balance("Ga + O2 -> Ga2O3");
    expectPositiveCoefficients(r);
  });

  it("balances 4In + 3O2 -> 2In2O3", () => {
    const r = balance("In + O2 -> In2O3");
    expectPositiveCoefficients(r);
  });

  it("balances 4Tl + 3O2 -> 2Tl2O3", () => {
    const r = balance("Tl + O2 -> Tl2O3");
    expectPositiveCoefficients(r);
  });
});

describe("group 14 element oxidation", () => {
  it("balances C + O2 -> CO2", () => {
    const r = balance("C + O2 -> CO2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances Si + O2 -> SiO2", () => {
    const r = balance("Si + O2 -> SiO2");
    expectPositiveCoefficients(r);
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances Ge + O2 -> GeO2", () => {
    const r = balance("Ge + O2 -> GeO2");
    expectPositiveCoefficients(r);
  });

  it("balances Sn + O2 -> SnO2", () => {
    const r = balance("Sn + O2 -> SnO2");
    expectPositiveCoefficients(r);
  });

  it("balances Pb + O2 -> PbO2", () => {
    const r = balance("Pb + O2 -> PbO2");
    expectPositiveCoefficients(r);
  });
});
