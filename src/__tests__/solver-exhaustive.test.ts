import { describe, it, expect } from "vitest";
import { gcd, lcm, stripStateSymbols } from "../index";

describe("gcd exhaustive", () => {
  it("returns gcd(12, 8) = 4", () => {
    expect(gcd(12, 8)).toBe(4);
  });

  it("returns gcd(0, 5) = 5", () => {
    expect(gcd(0, 5)).toBe(5);
  });

  it("returns gcd(5, 0) = 5", () => {
    expect(gcd(5, 0)).toBe(5);
  });

  it("returns gcd(0, 0) = 0", () => {
    expect(gcd(0, 0)).toBe(0);
  });

  it("returns gcd(1, 1) = 1", () => {
    expect(gcd(1, 1)).toBe(1);
  });

  it("returns gcd(100, 75) = 25", () => {
    expect(gcd(100, 75)).toBe(25);
  });

  it("returns gcd(17, 13) = 1 (coprime)", () => {
    expect(gcd(17, 13)).toBe(1);
  });

  it("returns gcd(-12, 8) = 4 (absolute value)", () => {
    expect(gcd(-12, 8)).toBe(4);
  });

  it("returns gcd(12, -8) = 4 (absolute value)", () => {
    expect(gcd(12, -8)).toBe(4);
  });

  it("returns gcd(7, 7) = 7", () => {
    expect(gcd(7, 7)).toBe(7);
  });
});

describe("lcm exhaustive", () => {
  it("returns lcm(4, 6) = 12", () => {
    expect(lcm(4, 6)).toBe(12);
  });

  it("returns lcm(3, 7) = 21", () => {
    expect(lcm(3, 7)).toBe(21);
  });

  it("returns lcm(1, 1) = 1", () => {
    expect(lcm(1, 1)).toBe(1);
  });

  it("returns lcm(0, 5) = 0", () => {
    expect(lcm(0, 5)).toBe(0);
  });

  it("returns lcm(5, 0) = 0", () => {
    expect(lcm(5, 0)).toBe(0);
  });

  it("returns lcm(12, 8) = 24", () => {
    expect(lcm(12, 8)).toBe(24);
  });

  it("returns lcm(100, 75) = 300", () => {
    expect(lcm(100, 75)).toBe(300);
  });

  it("returns lcm(1, 100) = 100", () => {
    expect(lcm(1, 100)).toBe(100);
  });
});

describe("stripStateSymbols exhaustive", () => {
  it("strips (s) from NaCl(s)", () => {
    expect(stripStateSymbols("NaCl(s)")).toBe("NaCl");
  });

  it("strips (l) from H2O(l)", () => {
    expect(stripStateSymbols("H2O(l)")).toBe("H2O");
  });

  it("strips (g) from CO2(g)", () => {
    expect(stripStateSymbols("CO2(g)")).toBe("CO2");
  });

  it("strips (aq) from Na+(aq)", () => {
    expect(stripStateSymbols("Na+(aq)")).toBe("Na+");
  });

  it("strips (aq) from Fe2+(aq)", () => {
    expect(stripStateSymbols("Fe2+(aq)")).toBe("Fe2+");
  });

  it("strips (aq) from Cl-(aq)", () => {
    expect(stripStateSymbols("Cl-(aq)")).toBe("Cl-");
  });

  it("strips (solid) from H2O(solid)", () => {
    expect(stripStateSymbols("H2O(solid)")).toBe("H2O");
  });

  it("strips (liquid) from H2O(liquid)", () => {
    expect(stripStateSymbols("H2O(liquid)")).toBe("H2O");
  });

  it("strips (gas) from H2O(gas)", () => {
    expect(stripStateSymbols("H2O(gas)")).toBe("H2O");
  });

  it("strips (cr) from NaCl(cr)", () => {
    expect(stripStateSymbols("NaCl(cr)")).toBe("NaCl");
  });

  it("strips (am) from NaCl(am)", () => {
    expect(stripStateSymbols("NaCl(am)")).toBe("NaCl");
  });

  it("strips (aqueous) from H2O(aqueous)", () => {
    expect(stripStateSymbols("H2O(aqueous)")).toBe("H2O");
  });
});
