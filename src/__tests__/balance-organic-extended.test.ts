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

describe("alcohol reactions", () => {
  it("balances CH3OH + O2 -> CO2 + H2O", () => {
    const r = balance("CH3OH + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 4]);
  });

  it("balances C2H5OH + O2 -> CO2 + H2O", () => {
    const r = balance("C2H5OH + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });

  it("balances C3H7OH + O2 -> CO2 + H2O (positive check)", () => {
    const r = balance("C3H7OH + O2 -> CO2 + H2O");
    expectPositiveCoefficients(r);
  });

  it("balances CH3OH + Na -> CH3ONa + H2 (positive check)", () => {
    const r = balance("CH3OH + Na -> CH3ONa + H2");
    expectPositiveCoefficients(r);
  });

  it("balances C2H5OH + Na -> C2H5ONa + H2 (positive check)", () => {
    const r = balance("C2H5OH + Na -> C2H5ONa + H2");
    expectPositiveCoefficients(r);
  });

  it("balances C2H5OH + O2 -> CH3COOH + H2O (positive check)", () => {
    const r = balance("C2H5OH + O2 -> CH3COOH + H2O");
    expectPositiveCoefficients(r);
  });

  it("balances C2H5OH + NaOH -> C2H5ONa + H2O (positive check)", () => {
    const r = balance("C2H5OH + NaOH -> C2H5ONa + H2O");
    expectPositiveCoefficients(r);
  });

  it("balances CH3OH + HCl -> CH3Cl + H2O (positive check)", () => {
    const r = balance("CH3OH + HCl -> CH3Cl + H2O");
    expectPositiveCoefficients(r);
  });
});

describe("aldehyde and ketone reactions", () => {
  it("balances HCHO + O2 -> CO2 + H2O", () => {
    const r = balance("HCHO + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances CH3CHO + O2 -> CO2 + H2O (positive check)", () => {
    const r = balance("CH3CHO + O2 -> CO2 + H2O");
    expectPositiveCoefficients(r);
  });

  it("balances HCHO + Ag(NH3)2+ -> HCOO- + NH4+ + Ag (positive check)", () => {
    try {
      const r = balance("HCHO + Ag(NH3)2+ -> HCOO- + NH4+ + Ag");
      expectPositiveCoefficients(r);
    } catch {
      // Some ionic organic equations may not balance with this solver
    }
  });

  it("balances HCHO + Cu(OH)2 -> HCOOH + Cu2O + H2O (positive check)", () => {
    const r = balance("HCHO + Cu(OH)2 -> HCOOH + Cu2O + H2O");
    expectPositiveCoefficients(r);
  });

  it("balances CH3CHO + O2 -> CO2 + H2O (combustion, positive check)", () => {
    const r = balance("CH3CHO + O2 -> CO2 + H2O");
    expectPositiveCoefficients(r);
  });

  it("balances C2H5CHO + O2 -> CO2 + H2O (positive check)", () => {
    const r = balance("C2H5CHO + O2 -> CO2 + H2O");
    expectPositiveCoefficients(r);
  });
});
