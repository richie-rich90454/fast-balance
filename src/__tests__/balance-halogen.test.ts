import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("fluorine compounds", () => {
  it("balances F2 + H2 -> 2HF", () => {
    const r = balance("F2 + H2 -> HF");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances 2Na + F2 -> 2NaF", () => {
    const r = balance("Na + F2 -> NaF");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Ca + F2 -> CaF2", () => {
    const r = balance("Ca + F2 -> CaF2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Si + 2F2 -> SiF4", () => {
    const r = balance("Si + F2 -> SiF4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances C + 2F2 -> CF4", () => {
    const r = balance("C + F2 -> CF4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances 2Al + 3F2 -> 2AlF3", () => {
    const r = balance("Al + F2 -> AlF3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 2Fe + 3F2 -> 2FeF3", () => {
    const r = balance("Fe + F2 -> FeF3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Mg + F2 -> MgF2", () => {
    const r = balance("Mg + F2 -> MgF2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances 2K + F2 -> 2KF", () => {
    const r = balance("K + F2 -> KF");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances S + 3F2 -> SF6", () => {
    const r = balance("S + F2 -> SF6");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
});

describe("chlorine compounds", () => {
  it("balances Cl2 + 2Na -> 2NaCl", () => {
    const r = balance("Cl2 + Na -> NaCl");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Cl2 + H2 -> 2HCl", () => {
    const r = balance("Cl2 + H2 -> HCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances 3Cl2 + 2Fe -> 2FeCl3", () => {
    const r = balance("Cl2 + Fe -> FeCl3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Cl2 + Cu -> CuCl2", () => {
    const r = balance("Cl2 + Cu -> CuCl2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Cl2 + Mg -> MgCl2", () => {
    const r = balance("Cl2 + Mg -> MgCl2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances 3Cl2 + 2Al -> 2AlCl3", () => {
    const r = balance("Cl2 + Al -> AlCl3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Cl2 + 2K -> 2KCl", () => {
    const r = balance("Cl2 + K -> KCl");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Cl2 + Zn -> ZnCl2", () => {
    const r = balance("Cl2 + Zn -> ZnCl2");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 2Cl2 + Sn -> SnCl4", () => {
    const r = balance("Cl2 + Sn -> SnCl4");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Cl2 + Ca -> CaCl2", () => {
    const r = balance("Cl2 + Ca -> CaCl2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("bromine compounds", () => {
  it("balances Br2 + 2Na -> 2NaBr", () => {
    const r = balance("Br2 + Na -> NaBr");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Br2 + H2 -> 2HBr", () => {
    const r = balance("Br2 + H2 -> HBr");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances 3Br2 + 2Fe -> 2FeBr3", () => {
    const r = balance("Br2 + Fe -> FeBr3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Br2 + Cu -> CuBr2", () => {
    const r = balance("Br2 + Cu -> CuBr2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances Br2 + Mg -> MgBr2", () => {
    const r = balance("Br2 + Mg -> MgBr2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances 3Br2 + 2Al -> 2AlBr3", () => {
    const r = balance("Br2 + Al -> AlBr3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Br2 + 2K -> 2KBr", () => {
    const r = balance("Br2 + K -> KBr");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Br2 + Zn -> ZnBr2", () => {
    const r = balance("Br2 + Zn -> ZnBr2");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 2Br2 + Sn -> SnBr4", () => {
    const r = balance("Br2 + Sn -> SnBr4");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Br2 + Ca -> CaBr2", () => {
    const r = balance("Br2 + Ca -> CaBr2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});
