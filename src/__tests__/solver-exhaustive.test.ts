import { describe, it, expect } from "vitest";
import { gcd } from "../index";

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
