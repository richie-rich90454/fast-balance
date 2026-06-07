import { describe, it, expect } from "vitest";
import { gcd, lcm } from "../index";

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

describe("lcm", () => {
  it("returns lcm of 4 and 6 as 12", () => {
    expect(lcm(4, 6)).toBe(12);
  });

  it("returns product for coprime numbers (lcm(3, 7) = 21)", () => {
    expect(lcm(3, 7)).toBe(21);
  });

  it("returns 0 when one argument is 0 (lcm(0, 5) = 0)", () => {
    expect(lcm(0, 5)).toBe(0);
  });

  it("returns 0 when one argument is 0 (lcm(5, 0) = 0)", () => {
    expect(lcm(5, 0)).toBe(0);
  });

  it("returns the same number when both arguments are equal (lcm(6, 6) = 6)", () => {
    expect(lcm(6, 6)).toBe(6);
  });
});
