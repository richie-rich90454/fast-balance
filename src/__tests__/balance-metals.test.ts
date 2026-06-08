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
