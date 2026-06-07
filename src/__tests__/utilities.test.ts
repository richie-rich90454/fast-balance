import { describe, it, expect } from "vitest";
import { gcd } from "../index";

describe("gcd", () => {
  it("returns gcd of 12 and 8 as 4", () => {
    expect(gcd(12, 8)).toBe(4);
  });

  it("returns 1 for coprime numbers (7 and 13)", () => {
    expect(gcd(7, 13)).toBe(1);
  });

  it("returns the other number when one is 0 (gcd(0, 5) = 5)", () => {
    expect(gcd(0, 5)).toBe(5);
  });

  it("returns the other number when one is 0 (gcd(5, 0) = 5)", () => {
    expect(gcd(5, 0)).toBe(5);
  });

  it("returns the same number when both arguments are equal (gcd(6, 6) = 6)", () => {
    expect(gcd(6, 6)).toBe(6);
  });
});
