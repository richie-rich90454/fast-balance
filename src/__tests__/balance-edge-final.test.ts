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
