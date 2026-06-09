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
