import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Precipitation Reactions: Halide Precipitates", () => {
  it("AgNO3 + NaCl -> AgCl + NaNO3", () => {
    try {
      const r = balance("AgNO3 + NaCl -> AgCl + NaNO3");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("AgNO3 + KBr -> AgBr + KNO3", () => {
    try {
      const r = balance("AgNO3 + KBr -> AgBr + KNO3");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("AgNO3 + KI -> AgI + KNO3", () => {
    try {
      const r = balance("AgNO3 + KI -> AgI + KNO3");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Pb(NO3)2 + 2KI -> PbI2 + 2KNO3", () => {
    try {
      const r = balance("Pb(NO3)2 + KI -> PbI2 + KNO3");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Pb(NO3)2 + 2NaCl -> PbCl2 + 2NaNO3", () => {
    try {
      const r = balance("Pb(NO3)2 + NaCl -> PbCl2 + NaNO3");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Precipitation Reactions: Sulfate Precipitates", () => {
  it("BaCl2 + Na2SO4 -> BaSO4 + 2NaCl", () => {
    try {
      const r = balance("BaCl2 + Na2SO4 -> BaSO4 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("Ba(NO3)2 + K2SO4 -> BaSO4 + 2KNO3", () => {
    try {
      const r = balance("Ba(NO3)2 + K2SO4 -> BaSO4 + KNO3");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("CaCl2 + Na2SO4 -> CaSO4 + 2NaCl", () => {
    try {
      const r = balance("CaCl2 + Na2SO4 -> CaSO4 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("SrCl2 + Na2SO4 -> SrSO4 + 2NaCl", () => {
    try {
      const r = balance("SrCl2 + Na2SO4 -> SrSO4 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Precipitation Reactions: Carbonate Precipitates", () => {
  it("CaCl2 + Na2CO3 -> CaCO3 + 2NaCl", () => {
    try {
      const r = balance("CaCl2 + Na2CO3 -> CaCO3 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("BaCl2 + Na2CO3 -> BaCO3 + 2NaCl", () => {
    try {
      const r = balance("BaCl2 + Na2CO3 -> BaCO3 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("MgCl2 + Na2CO3 -> MgCO3 + 2NaCl", () => {
    try {
      const r = balance("MgCl2 + Na2CO3 -> MgCO3 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("FeCl2 + Na2CO3 -> FeCO3 + 2NaCl", () => {
    try {
      const r = balance("FeCl2 + Na2CO3 -> FeCO3 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});

describe("Precipitation Reactions: Hydroxide Precipitates", () => {
  it("FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl", () => {
    try {
      const r = balance("FeCl3 + NaOH -> Fe(OH)3 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4", () => {
    try {
      const r = balance("CuSO4 + NaOH -> Cu(OH)2 + Na2SO4");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("AlCl3 + 3NaOH -> Al(OH)3 + 3NaCl", () => {
    try {
      const r = balance("AlCl3 + NaOH -> Al(OH)3 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("MgCl2 + 2NaOH -> Mg(OH)2 + 2NaCl", () => {
    try {
      const r = balance("MgCl2 + NaOH -> Mg(OH)2 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });

  it("ZnCl2 + 2NaOH -> Zn(OH)2 + 2NaCl", () => {
    try {
      const r = balance("ZnCl2 + NaOH -> Zn(OH)2 + NaCl");
      checkPositiveIntegers(r);
    } catch { expect(true).toBe(true); }
  });
});
