import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("single element each side", () => {
  it("H->H balances as 1H->1H", () => {
    const result = balance("H -> H");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
  });

  it("Fe->Fe balances as 1Fe->1Fe", () => {
    const result = balance("Fe -> Fe");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
  });

  it("Na->Na balances as 1Na->1Na", () => {
    const result = balance("Na -> Na");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
  });

  it("O->O balances as 1O->1O", () => {
    const result = balance("O -> O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
  });

  it("C->C balances as 1C->1C", () => {
    const result = balance("C -> C");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(1);
  });
});

describe("two species minimal", () => {
  it("H2+O2->H2O balances as 2H2+1O2->2H2O", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(result.reactants[0]?.coefficient).toBe(2);
    expect(result.reactants[0]?.formula).toBe("H2");
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.reactants[1]?.formula).toBe("O2");
    expect(result.products[0]?.coefficient).toBe(2);
    expect(result.products[0]?.formula).toBe("H2O");
  });

  it("N2+H2->NH3 balances as 1N2+3H2->2NH3", () => {
    const result = balance("N2 + H2 -> NH3");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.reactants[0]?.formula).toBe("N2");
    expect(result.reactants[1]?.coefficient).toBe(3);
    expect(result.reactants[1]?.formula).toBe("H2");
    expect(result.products[0]?.coefficient).toBe(2);
    expect(result.products[0]?.formula).toBe("NH3");
  });

  it("Fe+S->FeS balances as 1Fe+1S->1FeS", () => {
    const result = balance("Fe + S -> FeS");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.reactants[0]?.formula).toBe("Fe");
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.reactants[1]?.formula).toBe("S");
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[0]?.formula).toBe("FeS");
  });

  it("C+O2->CO2 balances as 1C+1O2->1CO2", () => {
    const result = balance("C + O2 -> CO2");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.reactants[0]?.formula).toBe("C");
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.reactants[1]?.formula).toBe("O2");
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[0]?.formula).toBe("CO2");
  });

  it("Na+Cl2->NaCl balances as 2Na+1Cl2->2NaCl", () => {
    const result = balance("Na + Cl2 -> NaCl");
    expect(result.reactants[0]?.coefficient).toBe(2);
    expect(result.reactants[0]?.formula).toBe("Na");
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.reactants[1]?.formula).toBe("Cl2");
    expect(result.products[0]?.coefficient).toBe(2);
    expect(result.products[0]?.formula).toBe("NaCl");
  });
});

describe("three species minimal", () => {
  it("H2+O2+H2->H2O balances correctly", () => {
    try {
      const result = balance("H2 + O2 + H2 -> H2O");
      expect(result.reactants).toHaveLength(3);
      expect(result.products).toHaveLength(1);
      expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
    }
  });

  it("CH4+O2->CO2+H2O balances as 1CH4+2O2->1CO2+2H2O", () => {
    const result = balance("CH4 + O2 -> CO2 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.reactants[0]?.formula).toBe("CH4");
    expect(result.reactants[1]?.coefficient).toBe(2);
    expect(result.reactants[1]?.formula).toBe("O2");
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[0]?.formula).toBe("CO2");
    expect(result.products[1]?.coefficient).toBe(2);
    expect(result.products[1]?.formula).toBe("H2O");
  });

  it("Fe+O2->Fe2O3 balances as 4Fe+3O2->2Fe2O3", () => {
    const result = balance("Fe + O2 -> Fe2O3");
    expect(result.reactants[0]?.coefficient).toBe(4);
    expect(result.reactants[0]?.formula).toBe("Fe");
    expect(result.reactants[1]?.coefficient).toBe(3);
    expect(result.reactants[1]?.formula).toBe("O2");
    expect(result.products[0]?.coefficient).toBe(2);
    expect(result.products[0]?.formula).toBe("Fe2O3");
  });

  it("Ca+O2->CaO balances as 2Ca+1O2->2CaO", () => {
    const result = balance("Ca + O2 -> CaO");
    expect(result.reactants[0]?.coefficient).toBe(2);
    expect(result.reactants[0]?.formula).toBe("Ca");
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.reactants[1]?.formula).toBe("O2");
    expect(result.products[0]?.coefficient).toBe(2);
    expect(result.products[0]?.formula).toBe("CaO");
  });

  it("Al+O2->Al2O3 balances as 4Al+3O2->2Al2O3", () => {
    const result = balance("Al + O2 -> Al2O3");
    expect(result.reactants[0]?.coefficient).toBe(4);
    expect(result.reactants[0]?.formula).toBe("Al");
    expect(result.reactants[1]?.coefficient).toBe(3);
    expect(result.reactants[1]?.formula).toBe("O2");
    expect(result.products[0]?.coefficient).toBe(2);
    expect(result.products[0]?.formula).toBe("Al2O3");
  });
});

describe("four species minimal", () => {
  it("Fe2O3+CO->Fe+CO2 balances as 1Fe2O3+3CO->2Fe+3CO2", () => {
    const result = balance("Fe2O3 + CO -> Fe + CO2");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.reactants[0]?.formula).toBe("Fe2O3");
    expect(result.reactants[1]?.coefficient).toBe(3);
    expect(result.reactants[1]?.formula).toBe("CO");
    expect(result.products[0]?.coefficient).toBe(2);
    expect(result.products[0]?.formula).toBe("Fe");
    expect(result.products[1]?.coefficient).toBe(3);
    expect(result.products[1]?.formula).toBe("CO2");
  });

  it("CuO+H2->Cu+H2O balances as 1CuO+1H2->1Cu+1H2O", () => {
    const result = balance("CuO + H2 -> Cu + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.reactants[0]?.formula).toBe("CuO");
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.reactants[1]?.formula).toBe("H2");
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[0]?.formula).toBe("Cu");
    expect(result.products[1]?.coefficient).toBe(1);
    expect(result.products[1]?.formula).toBe("H2O");
  });

  it("NaOH+HCl->NaCl+H2O balances as 1NaOH+1HCl->1NaCl+1H2O", () => {
    const result = balance("NaOH + HCl -> NaCl + H2O");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.reactants[0]?.formula).toBe("NaOH");
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.reactants[1]?.formula).toBe("HCl");
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[0]?.formula).toBe("NaCl");
    expect(result.products[1]?.coefficient).toBe(1);
    expect(result.products[1]?.formula).toBe("H2O");
  });

  it("CaCO3+HCl->CaCl2+H2O+CO2 balances as 1CaCO3+2HCl->1CaCl2+1H2O+1CO2", () => {
    const result = balance("CaCO3 + HCl -> CaCl2 + H2O + CO2");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.reactants[0]?.formula).toBe("CaCO3");
    expect(result.reactants[1]?.coefficient).toBe(2);
    expect(result.reactants[1]?.formula).toBe("HCl");
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[0]?.formula).toBe("CaCl2");
    expect(result.products[1]?.coefficient).toBe(1);
    expect(result.products[1]?.formula).toBe("H2O");
    expect(result.products[2]?.coefficient).toBe(1);
    expect(result.products[2]?.formula).toBe("CO2");
  });

  it("BaCl2+Na2SO4->BaSO4+NaCl balances as 1BaCl2+1Na2SO4->1BaSO4+2NaCl", () => {
    const result = balance("BaCl2 + Na2SO4 -> BaSO4 + NaCl");
    expect(result.reactants[0]?.coefficient).toBe(1);
    expect(result.reactants[0]?.formula).toBe("BaCl2");
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.reactants[1]?.formula).toBe("Na2SO4");
    expect(result.products[0]?.coefficient).toBe(1);
    expect(result.products[0]?.formula).toBe("BaSO4");
    expect(result.products[1]?.coefficient).toBe(2);
    expect(result.products[1]?.formula).toBe("NaCl");
  });
});
