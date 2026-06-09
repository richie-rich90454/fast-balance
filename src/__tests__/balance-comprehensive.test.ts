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

describe("stoichiometry verification tests", () => {
  it("coefficients match expected ratios for H2+O2->H2O", () => {
    const r = balance("H2 + O2 -> H2O");
    // 2:1:2 ratio
    expect(r.reactants[0].coefficient * 2).toBe(r.products[0].coefficient * 2);
    expect(r.reactants[1].coefficient).toBe(1);
  });

  it("coefficients match expected ratios for N2+H2->NH3", () => {
    const r = balance("N2 + H2 -> NH3");
    // 1:3:2 ratio
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });

  it("coefficients match expected ratios for CH4+O2->CO2+H2O", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O");
    // 1:2:1:2 ratio
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(2);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(2);
  });

  it("coefficients match expected ratios for Fe+Cl2->FeCl3", () => {
    const r = balance("Fe + Cl2 -> FeCl3");
    // 2Fe + 3Cl2 -> 2FeCl3
    expect(r.reactants[0].coefficient).toBe(2);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });

  it("coefficients match expected ratios for Fe2O3+CO->Fe+CO2", () => {
    const r = balance("Fe2O3 + CO -> Fe + CO2");
    // Fe2O3 + 3CO -> 2Fe + 3CO2
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
    expect(r.products[1].coefficient).toBe(3);
  });
});

describe("charge balance tests", () => {
  it("Na+ + Cl- -> NaCl charge balanced", () => {
    const r = balance("Na+ + Cl- -> NaCl");
    // Verify charge: reactants = (+1) + (-1) = 0, products = 0
    let reactantCharge = 0;
    for (const sp of r.reactants) {
      const p = parseFormula(sp.formula);
      reactantCharge += p.charge * sp.coefficient;
    }
    let productCharge = 0;
    for (const sp of r.products) {
      const p = parseFormula(sp.formula);
      productCharge += p.charge * sp.coefficient;
    }
    expect(reactantCharge).toBe(productCharge);
  });

  it("Ag+ + Cl- -> AgCl charge balanced", () => {
    const r = balance("Ag+ + Cl- -> AgCl");
    let reactantCharge = 0;
    for (const sp of r.reactants) {
      const p = parseFormula(sp.formula);
      reactantCharge += p.charge * sp.coefficient;
    }
    let productCharge = 0;
    for (const sp of r.products) {
      const p = parseFormula(sp.formula);
      productCharge += p.charge * sp.coefficient;
    }
    expect(reactantCharge).toBe(productCharge);
  });

  it("2Na+ + SO4^2- -> Na2SO4 charge balanced", () => {
    const r = balance("Na+ + SO4^2- -> Na2SO4");
    // 2Na+ + SO4^2- -> Na2SO4
    expect(r.reactants[0].coefficient).toBe(2);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    let reactantCharge = 0;
    for (const sp of r.reactants) {
      const p = parseFormula(sp.formula);
      reactantCharge += p.charge * sp.coefficient;
    }
    let productCharge = 0;
    for (const sp of r.products) {
      const p = parseFormula(sp.formula);
      productCharge += p.charge * sp.coefficient;
    }
    expect(reactantCharge).toBe(productCharge);
  });

  it("Ca2+ + 2OH- -> Ca(OH)2 charge balanced", () => {
    const r = balance("Ca2+ + OH- -> Ca(OH)2");
    // Ca2+ + 2OH- -> Ca(OH)2
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(2);
    expect(r.products[0].coefficient).toBe(1);
    let reactantCharge = 0;
    for (const sp of r.reactants) {
      const p = parseFormula(sp.formula);
      reactantCharge += p.charge * sp.coefficient;
    }
    let productCharge = 0;
    for (const sp of r.products) {
      const p = parseFormula(sp.formula);
      productCharge += p.charge * sp.coefficient;
    }
    expect(reactantCharge).toBe(productCharge);
  });

  it("3Al3+ + 2PO4^3- -> AlPO4 charge balanced", () => {
    const r = balance("Al3+ + PO4^3- -> AlPO4");
    // Al3+ + PO4^3- -> AlPO4 (1:1 ratio since +3 and -3 cancel)
    let reactantCharge = 0;
    for (const sp of r.reactants) {
      const p = parseFormula(sp.formula);
      reactantCharge += p.charge * sp.coefficient;
    }
    let productCharge = 0;
    for (const sp of r.products) {
      const p = parseFormula(sp.formula);
      productCharge += p.charge * sp.coefficient;
    }
    expect(reactantCharge).toBe(productCharge);
  });
});

describe("hydration state tests", () => {
  it("CuSO4·5H2O -> CuSO4 + H2O", () => {
    const r = balance("CuSO4·5H2O -> CuSO4 + H2O");
    // CuSO4·5H2O -> CuSO4 + 5H2O
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(5);
  });

  it("Na2CO3·10H2O -> Na2CO3 + H2O", () => {
    const r = balance("Na2CO3·10H2O -> Na2CO3 + H2O");
    // Na2CO3·10H2O -> Na2CO3 + 10H2O
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(10);
  });

  it("MgSO4·7H2O -> MgSO4 + H2O", () => {
    const r = balance("MgSO4·7H2O -> MgSO4 + H2O");
    // MgSO4·7H2O -> MgSO4 + 7H2O
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(7);
  });

  it("BaCl2·2H2O -> BaCl2 + H2O", () => {
    const r = balance("BaCl2·2H2O -> BaCl2 + H2O");
    // BaCl2·2H2O -> BaCl2 + 2H2O
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(2);
  });

  it("CaCl2·6H2O -> CaCl2 + H2O", () => {
    const r = balance("CaCl2·6H2O -> CaCl2 + H2O");
    // CaCl2·6H2O -> CaCl2 + 6H2O
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(6);
  });
});

describe("electrolyte tests", () => {
  it("NaCl -> Na+ + Cl- positive check", () => {
    const r = balance("NaCl -> Na+ + Cl-");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("HCl -> H+ + Cl- positive check", () => {
    const r = balance("HCl -> H+ + Cl-");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("H2SO4 -> 2H+ + SO4^2- positive check", () => {
    const r = balance("H2SO4 -> H+ + SO4^2-");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(2);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("NaOH -> Na+ + OH- positive check", () => {
    const r = balance("NaOH -> Na+ + OH-");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(1);
  });

  it("CaCl2 -> Ca2+ + Cl- positive check", () => {
    const r = balance("CaCl2 -> Ca2+ + Cl-");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
    expect(r.products[1].coefficient).toBe(2);
  });
});
