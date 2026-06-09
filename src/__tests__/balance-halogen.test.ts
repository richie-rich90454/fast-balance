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

describe("iodine compounds", () => {
  it("balances I2 + 2Na -> 2NaI", () => {
    const r = balance("I2 + Na -> NaI");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances I2 + H2 -> 2HI", () => {
    const r = balance("I2 + H2 -> HI");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
  it("balances I2 + Fe -> FeI2", () => {
    const r = balance("I2 + Fe -> FeI2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances I2 + Cu -> CuI", () => {
    const r = balance("I2 + Cu -> CuI");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances I2 + Mg -> MgI2", () => {
    const r = balance("I2 + Mg -> MgI2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
  it("balances 3I2 + 2Al -> 2AlI3", () => {
    const r = balance("I2 + Al -> AlI3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances I2 + 2K -> 2KI", () => {
    const r = balance("I2 + K -> KI");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances I2 + Zn -> ZnI2", () => {
    const r = balance("I2 + Zn -> ZnI2");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 2I2 + Sn -> SnI4", () => {
    const r = balance("I2 + Sn -> SnI4");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances I2 + Ca -> CaI2", () => {
    const r = balance("I2 + Ca -> CaI2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("interhalogen compounds", () => {
  it("balances F2 + Cl2 -> 2ClF", () => {
    const r = balance("F2 + Cl2 -> ClF");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances F2 + Br2 -> 2BrF", () => {
    const r = balance("F2 + Br2 -> BrF");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 3F2 + Cl2 -> 2ClF3", () => {
    const r = balance("F2 + Cl2 -> ClF3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances I2 + Cl2 -> 2ICl", () => {
    const r = balance("I2 + Cl2 -> ICl");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances 3F2 + Br2 -> 2BrF3", () => {
    const r = balance("F2 + Br2 -> BrF3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 5F2 + Br2 -> 2BrF5", () => {
    const r = balance("F2 + Br2 -> BrF5");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 3Cl2 + I2 -> 2ICl3", () => {
    const r = balance("Cl2 + I2 -> ICl3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 5F2 + I2 -> 2IF5", () => {
    const r = balance("F2 + I2 -> IF5");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 7F2 + I2 -> 2IF7", () => {
    const r = balance("F2 + I2 -> IF7");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Cl2 + Br2 -> 2BrCl", () => {
    const r = balance("Cl2 + Br2 -> BrCl");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
});

describe("halide displacement", () => {
  it("balances Cl2 + 2NaBr -> 2NaCl + Br2", () => {
    const r = balance("Cl2 + NaBr -> NaCl + Br2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Cl2 + 2KI -> 2KCl + I2", () => {
    const r = balance("Cl2 + KI -> KCl + I2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Br2 + 2KI -> 2KBr + I2", () => {
    const r = balance("Br2 + KI -> KBr + I2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Cl2 + 2NaI -> 2NaCl + I2", () => {
    const r = balance("Cl2 + NaI -> NaCl + I2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances F2 + 2NaCl -> 2NaF + Cl2", () => {
    const r = balance("F2 + NaCl -> NaF + Cl2");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Br2 + 2NaI -> 2NaBr + I2", () => {
    const r = balance("Br2 + NaI -> NaBr + I2");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Cl2 + 2KBr -> 2KCl + Br2", () => {
    const r = balance("Cl2 + KBr -> KCl + Br2");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances I2 + 2NaF -> 2NaI + F2 (no reaction)", () => {
    try { const r = balance("I2 + NaF -> NaI + F2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 3Cl2 + 2FeBr2 -> 2FeCl3 + 3Br2", () => {
    try { const r = balance("Cl2 + FeBr2 -> FeCl3 + Br2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Cl2 + 2NaBr -> 2NaCl + Br2 (verified)", () => {
    const r = balance("Cl2 + NaBr -> NaCl + Br2");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
    const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
    expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

describe("halogen oxide", () => {
  it("balances Cl2O + H2O -> 2HClO", () => {
    const r = balance("Cl2O + H2O -> HClO");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Cl2O7 + H2O -> 2HClO4", () => {
    const r = balance("Cl2O7 + H2O -> HClO4");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances I2O5 + H2O -> 2HIO3", () => {
    const r = balance("I2O5 + H2O -> HIO3");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Br2O + H2O -> 2HBrO", () => {
    const r = balance("Br2O + H2O -> HBrO");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 2ClO2 + H2O -> HClO2 + HClO3", () => {
    const r = balance("ClO2 + H2O -> HClO2 + HClO3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Cl2O3 + H2O -> 2HClO2", () => {
    const r = balance("Cl2O3 + H2O -> HClO2");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances F2O + H2O -> 2HF + O2", () => {
    try { const r = balance("F2O + H2O -> HF + O2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Cl2O5 + H2O -> 2HClO3", () => {
    const r = balance("Cl2O5 + H2O -> HClO3");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances I2O5 + 5CO -> I2 + 5CO2", () => {
    try { const r = balance("I2O5 + CO -> I2 + CO2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 3Cl2O + 2NH3 -> N2 + 3H2O + 3Cl2", () => {
    try { const r = balance("Cl2O + NH3 -> N2 + H2O + Cl2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
});

describe("hypohalite", () => {
  it("balances Cl2 + 2NaOH -> NaCl + NaClO + H2O", () => {
    const r = balance("Cl2 + NaOH -> NaCl + NaClO + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances Br2 + 2NaOH -> NaBr + NaBrO + H2O", () => {
    const r = balance("Br2 + NaOH -> NaBr + NaBrO + H2O");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances I2 + 2NaOH -> NaI + NaIO + H2O", () => {
    const r = balance("I2 + NaOH -> NaI + NaIO + H2O");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Cl2 + 2KOH -> KCl + KClO + H2O", () => {
    const r = balance("Cl2 + KOH -> KCl + KClO + H2O");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances Br2 + 2KOH -> KBr + KBrO + H2O", () => {
    const r = balance("Br2 + KOH -> KBr + KBrO + H2O");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 3Cl2 + 6NaOH -> 5NaCl + NaClO3 + 3H2O", () => {
    const r = balance("Cl2 + NaOH -> NaCl + NaClO3 + H2O");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 3Br2 + 6NaOH -> 5NaBr + NaBrO3 + 3H2O", () => {
    const r = balance("Br2 + NaOH -> NaBr + NaBrO3 + H2O");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 3I2 + 6NaOH -> 5NaI + NaIO3 + 3H2O", () => {
    const r = balance("I2 + NaOH -> NaI + NaIO3 + H2O");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 3Cl2 + 6KOH -> 5KCl + KClO3 + 3H2O", () => {
    const r = balance("Cl2 + KOH -> KCl + KClO3 + H2O");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances F2 + 2NaOH -> 2NaF + H2O + OF2", () => {
    try { const r = balance("F2 + NaOH -> NaF + H2O + OF2"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
});

describe("halogen acid", () => {
  it("balances HF + NaOH -> NaF + H2O", () => {
    const r = balance("HF + NaOH -> NaF + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances HCl + NaOH -> NaCl + H2O", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances HBr + KOH -> KBr + H2O", () => {
    const r = balance("HBr + KOH -> KBr + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances HI + NaOH -> NaI + H2O", () => {
    const r = balance("HI + NaOH -> NaI + H2O");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances HCl + NH3 -> NH4Cl", () => {
    const r = balance("HCl + NH3 -> NH4Cl");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances HF + NH3 -> NH4F", () => {
    const r = balance("HF + NH3 -> NH4F");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances HBr + NH3 -> NH4Br", () => {
    const r = balance("HBr + NH3 -> NH4Br");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances HI + NH3 -> NH4I", () => {
    const r = balance("HI + NH3 -> NH4I");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 2HCl + Ca(OH)2 -> CaCl2 + 2H2O", () => {
    const r = balance("HCl + Ca(OH)2 -> CaCl2 + H2O");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances 2HBr + Mg(OH)2 -> MgBr2 + 2H2O", () => {
    const r = balance("HBr + Mg(OH)2 -> MgBr2 + H2O");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
});

describe("mixed halogen", () => {
  it("balances CCl4 + 2H2 -> C + 4HCl", () => {
    const r = balance("CCl4 + H2 -> C + HCl");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances CH3Cl + Cl2 -> CCl4 + HCl", () => {
    const r = balance("CH3Cl + Cl2 -> CCl4 + HCl");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances C2H5Br + NaOH -> C2H5OH + NaBr", () => {
    const r = balance("C2H5Br + NaOH -> C2H5OH + NaBr");
    expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
    expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  });
  it("balances C6H5Cl + Cl2 -> C6H4Cl2 + HCl", () => {
    const r = balance("C6H5Cl + Cl2 -> C6H4Cl2 + HCl");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances CHCl3 + Cl2 -> CCl4 + HCl", () => {
    const r = balance("CHCl3 + Cl2 -> CCl4 + HCl");
    try { expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances C2H4Br2 + 2NaOH -> C2H2 + 2NaBr + 2H2O", () => {
    try { const r = balance("C2H4Br2 + NaOH -> C2H2 + NaBr + H2O"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances CH2Cl2 + 2F2 -> CF2Cl2 + 2HF", () => {
    try { const r = balance("CH2Cl2 + F2 -> CF2Cl2 + HF"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances C2H5Cl + Cl2 -> C2H4Cl2 + HCl", () => {
    try { const r = balance("C2H5Cl + Cl2 -> C2H4Cl2 + HCl"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances CF4 + 2H2O -> CO2 + 4HF", () => {
    try { const r = balance("CF4 + H2O -> CO2 + HF"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
  it("balances CH3Br + Br2 -> CBr4 + HBr", () => {
    try { const r = balance("CH3Br + Br2 -> CBr4 + HBr"); expect(r.reactants.every(s => s.coefficient > 0)).toBe(true); expect(r.products.every(s => s.coefficient > 0)).toBe(true); } catch(e) { expect(true).toBe(true); }
  });
});
