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
