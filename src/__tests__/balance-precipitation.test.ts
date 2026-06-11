import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Precipitation Reactions: Halide Precipitates", () => {
  it("AgNO3 + NaCl -> AgCl + NaNO3", () => {const r = balance("AgNO3 + NaCl -> AgCl + NaNO3");
      checkPositiveIntegers(r);
  });

  it("AgNO3 + KBr -> AgBr + KNO3", () => {const r = balance("AgNO3 + KBr -> AgBr + KNO3");
      checkPositiveIntegers(r);
  });

  it("AgNO3 + KI -> AgI + KNO3", () => {const r = balance("AgNO3 + KI -> AgI + KNO3");
      checkPositiveIntegers(r);
  });

  it("Pb(NO3)2 + 2KI -> PbI2 + 2KNO3", () => {const r = balance("Pb(NO3)2 + KI -> PbI2 + KNO3");
      checkPositiveIntegers(r);
  });

  it("Pb(NO3)2 + 2NaCl -> PbCl2 + 2NaNO3", () => {const r = balance("Pb(NO3)2 + NaCl -> PbCl2 + NaNO3");
      checkPositiveIntegers(r);
  });
});

describe("Precipitation Reactions: Sulfate Precipitates", () => {
  it("BaCl2 + Na2SO4 -> BaSO4 + 2NaCl", () => {const r = balance("BaCl2 + Na2SO4 -> BaSO4 + NaCl");
      checkPositiveIntegers(r);
  });

  it("Ba(NO3)2 + K2SO4 -> BaSO4 + 2KNO3", () => {const r = balance("Ba(NO3)2 + K2SO4 -> BaSO4 + KNO3");
      checkPositiveIntegers(r);
  });

  it("CaCl2 + Na2SO4 -> CaSO4 + 2NaCl", () => {const r = balance("CaCl2 + Na2SO4 -> CaSO4 + NaCl");
      checkPositiveIntegers(r);
  });

  it("SrCl2 + Na2SO4 -> SrSO4 + 2NaCl", () => {const r = balance("SrCl2 + Na2SO4 -> SrSO4 + NaCl");
      checkPositiveIntegers(r);
  });
});

describe("Precipitation Reactions: Carbonate Precipitates", () => {
  it("CaCl2 + Na2CO3 -> CaCO3 + 2NaCl", () => {const r = balance("CaCl2 + Na2CO3 -> CaCO3 + NaCl");
      checkPositiveIntegers(r);
  });

  it("BaCl2 + Na2CO3 -> BaCO3 + 2NaCl", () => {const r = balance("BaCl2 + Na2CO3 -> BaCO3 + NaCl");
      checkPositiveIntegers(r);
  });

  it("MgCl2 + Na2CO3 -> MgCO3 + 2NaCl", () => {const r = balance("MgCl2 + Na2CO3 -> MgCO3 + NaCl");
      checkPositiveIntegers(r);
  });

  it("FeCl2 + Na2CO3 -> FeCO3 + 2NaCl", () => {const r = balance("FeCl2 + Na2CO3 -> FeCO3 + NaCl");
      checkPositiveIntegers(r);
  });
});

describe("Precipitation Reactions: Hydroxide Precipitates", () => {
  it("FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl", () => {const r = balance("FeCl3 + NaOH -> Fe(OH)3 + NaCl");
      checkPositiveIntegers(r);
  });

  it("CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4", () => {const r = balance("CuSO4 + NaOH -> Cu(OH)2 + Na2SO4");
      checkPositiveIntegers(r);
  });

  it("AlCl3 + 3NaOH -> Al(OH)3 + 3NaCl", () => {const r = balance("AlCl3 + NaOH -> Al(OH)3 + NaCl");
      checkPositiveIntegers(r);
  });

  it("MgCl2 + 2NaOH -> Mg(OH)2 + 2NaCl", () => {const r = balance("MgCl2 + NaOH -> Mg(OH)2 + NaCl");
      checkPositiveIntegers(r);
  });

  it("ZnCl2 + 2NaOH -> Zn(OH)2 + 2NaCl", () => {const r = balance("ZnCl2 + NaOH -> Zn(OH)2 + NaCl");
      checkPositiveIntegers(r);
  });
});
