import { describe, it, expect } from "vitest";
import { balance, parseFormula } from "../index";

describe("gas law related tests", () => {
  it("2H2 + O2 -> 2H2O mole ratio", () => {
    const r = balance("H2 + O2 -> H2O");
    expect(r.reactants.length).toBe(2);
    expect(r.products.length).toBe(1);
    // H2 coefficient should be 2, O2 should be 1, H2O should be 2
    expect(r.reactants[0].coefficient).toBe(2);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(2);
  });

  it("N2 + 3H2 -> 2NH3 mole ratio", () => {
    const r = balance("N2 + H2 -> NH3");
    expect(r.reactants.length).toBe(2);
    expect(r.products.length).toBe(1);
    // N2 coefficient should be 1, H2 should be 3, NH3 should be 2
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });

  it("CH4 + O2 -> CO2 + 2H2O positive check", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O");
    expect(r.reactants.length).toBe(2);
    expect(r.products.length).toBe(2);
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(2);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(2);
  });

  it("2C2H6 + 7O2 -> 4CO2 + 6H2O positive check", () => {
    const r = balance("C2H6 + O2 -> CO2 + H2O");
    expect(r.reactants.length).toBe(2);
    expect(r.products.length).toBe(2);
    expect(r.reactants[0].coefficient).toBe(2);
    expect(r.reactants[1].coefficient).toBe(7);
    expect(r.products[0].coefficient).toBe(4);
    expect(r.products[1].coefficient).toBe(6);
  });

  it("C3H8 + O2 -> CO2 + H2O positive check", () => {
    const r = balance("C3H8 + O2 -> CO2 + H2O");
    expect(r.reactants.length).toBe(2);
    expect(r.products.length).toBe(2);
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(5);
    expect(r.products[0].coefficient).toBe(3);
    expect(r.products[1].coefficient).toBe(4);
  });
});
