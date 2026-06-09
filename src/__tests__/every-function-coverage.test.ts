import { describe, it, expect } from "vitest";
import { gcd, lcm, stripStateSymbols } from "../index";

describe("gcd function exhaustive tests", () => {
  it("gcd(1, 1) returns 1", () => {
    expect(gcd(1, 1)).toBe(1);
  });

  it("gcd(2, 3) returns 1 (coprime numbers)", () => {
    expect(gcd(2, 3)).toBe(1);
  });

  it("gcd(12, 8) returns 4", () => {
    expect(gcd(12, 8)).toBe(4);
  });

  it("gcd(0, 5) returns 5 (zero and positive)", () => {
    expect(gcd(0, 5)).toBe(5);
  });

  it("gcd(100, 25) returns 25", () => {
    expect(gcd(100, 25)).toBe(25);
  });

  it("gcd(-12, 8) returns 4 (uses absolute value)", () => {
    expect(gcd(-12, 8)).toBe(4);
  });
});

describe("lcm function exhaustive tests", () => {
  it("lcm(4, 6) returns 12", () => {
    expect(lcm(4, 6)).toBe(12);
  });

  it("lcm(3, 5) returns 15 (coprime numbers)", () => {
    expect(lcm(3, 5)).toBe(15);
  });

  it("lcm(1, 1) returns 1", () => {
    expect(lcm(1, 1)).toBe(1);
  });

  it("lcm(0, 5) returns 0", () => {
    expect(lcm(0, 5)).toBe(0);
  });

  it("lcm(10, 15) returns 30", () => {
    expect(lcm(10, 15)).toBe(30);
  });
});

describe("stripStateSymbols function exhaustive tests", () => {
  it("stripStateSymbols('H2O(s)') returns 'H2O'", () => {
    expect(stripStateSymbols("H2O(s)")).toBe("H2O");
  });

  it("stripStateSymbols('H2O(g)') returns 'H2O'", () => {
    expect(stripStateSymbols("H2O(g)")).toBe("H2O");
  });

  it("stripStateSymbols('H2O(l)') returns 'H2O'", () => {
    expect(stripStateSymbols("H2O(l)")).toBe("H2O");
  });

  it("stripStateSymbols('H2O(aq)') returns 'H2O'", () => {
    expect(stripStateSymbols("H2O(aq)")).toBe("H2O");
  });

  it("stripStateSymbols('H2O') returns 'H2O' (no state symbol)", () => {
    expect(stripStateSymbols("H2O")).toBe("H2O");
  });

  it("stripStateSymbols('Fe2O3(s)') returns 'Fe2O3'", () => {
    expect(stripStateSymbols("Fe2O3(s)")).toBe("Fe2O3");
  });
});
