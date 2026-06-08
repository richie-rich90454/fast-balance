import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("halogen synthesis", () => {
  it("balances H2 + F2 -> 2HF", () => {
    const r = balance("H2 + F2 -> HF");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances H2 + Cl2 -> 2HCl", () => {
    const r = balance("H2 + Cl2 -> HCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances H2 + Br2 -> 2HBr", () => {
    const r = balance("H2 + Br2 -> HBr");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances H2 + I2 -> 2HI", () => {
    const r = balance("H2 + I2 -> HI");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances 2Na + F2 -> 2NaF", () => {
    const r = balance("Na + F2 -> NaF");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances 2K + I2 -> 2KI", () => {
    const r = balance("K + I2 -> KI");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});
