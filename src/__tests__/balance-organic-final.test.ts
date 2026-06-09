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

describe("amino acid tests", () => {
  it("balances glycine combustion: NH2CH2COOH + O2 -> CO2 + H2O + NH3", () => {
    const result = balance("NH2CH2COOH + O2 -> CO2 + H2O + NH3");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances glutamine combustion: C5H10N2O3 + O2 -> CO2 + H2O + NH3", () => {
    const result = balance("C5H10N2O3 + O2 -> CO2 + H2O + NH3");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances valine combustion: C5H11NO2 + O2 -> CO2 + H2O + NH3", () => {
    const result = balance("C6H13NO2 + O2 -> CO2 + H2O + NH3");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances phenylalanine combustion: C9H11NO2 + O2 -> CO2 + H2O + NH3", () => {
    const result = balance("C9H11NO2 + O2 -> CO2 + H2O + NH3");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances aspartic acid combustion: C4H7NO4 + O2 -> CO2 + H2O + NH3", () => {
    const result = balance("C4H7NO4 + O2 -> CO2 + H2O + NH3");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("nucleotide tests", () => {
  it("balances ribose combustion: C5H10O4 + O2 -> CO2 + H2O", () => {
    const result = balance("C5H10O4 + O2 -> CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances adenine combustion: C5H5N5 + O2 -> CO2 + H2O + N2", () => {
    const result = balance("C5H5N5 + O2 -> CO2 + H2O + N2");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances cytosine base combustion: C4H5N3O + O2 -> CO2 + H2O + N2", () => {
    const result = balance("C4H5N3O + O2 -> CO2 + H2O + N2");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances uracil combustion: C5H6N2O2 + O2 -> CO2 + H2O + N2", () => {
    const result = balance("C5H6N2O2 + O2 -> CO2 + H2O + N2");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances thymine combustion: C6H6N2O2 + O2 -> CO2 + H2O + N2", () => {
    const result = balance("C6H6N2O2 + O2 -> CO2 + H2O + N2");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});
