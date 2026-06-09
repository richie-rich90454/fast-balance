import {describe, it, expect} from "vitest";
import {balance} from "../index";

describe("sugar and carbohydrate tests", () => {
  it("balances glucose combustion: C6H12O6 + O2 -> CO2 + H2O", () => {
    const result = balance("C6H12O6 + O2 -> CO2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 6]);
    expect(result.products.map(p => p.coefficient)).toEqual([6, 6]);
  });

  it("balances sucrose combustion: C12H22O11 + O2 -> CO2 + H2O", () => {
    const result = balance("C12H22O11 + O2 -> CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances cellulose unit combustion: C6H10O5 + O2 -> CO2 + H2O", () => {
    const result = balance("C6H10O5 + O2 -> CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances methanol combustion: CH3OH + O2 -> CO2 + H2O", () => {
    const result = balance("CH3OH + O2 -> CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances ethanol combustion: C2H5OH + O2 -> CO2 + H2O", () => {
    const result = balance("C2H5OH + O2 -> CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("lipid and fatty acid tests", () => {
  it("balances stearic acid combustion: C18H36O2 + O2 -> CO2 + H2O", () => {
    const result = balance("C18H36O2 + O2 -> CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances palmitic acid combustion: C16H32O2 + O2 -> CO2 + H2O", () => {
    const result = balance("C16H32O2 + O2 -> CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances glycerol combustion: C3H8O3 + O2 -> CO2 + H2O", () => {
    const result = balance("C3H8O3 + O2 -> CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances oleic acid combustion: C18H34O2 + O2 -> CO2 + H2O", () => {
    const result = balance("C18H34O2 + O2 -> CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances arachidic acid combustion: C20H40O2 + O2 -> CO2 + H2O", () => {
    const result = balance("C20H40O2 + O2 -> CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});
