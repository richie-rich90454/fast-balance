import { describe, it, expect } from "vitest";
import { gcd, lcm } from "../index";

describe("gcd mathematical properties", () => {
  it("gcd is commutative: gcd(a,b) = gcd(b,a)", () => {
    expect(gcd(12, 8)).toBe(gcd(8, 12));
    expect(gcd(17, 5)).toBe(gcd(5, 17));
  });
  it("gcd(a, 1) = 1 for any a", () => {
    expect(gcd(7, 1)).toBe(1);
    expect(gcd(100, 1)).toBe(1);
    expect(gcd(1, 7)).toBe(1);
  });
  it("gcd(a, a) = a", () => {
    expect(gcd(5, 5)).toBe(5);
    expect(gcd(12, 12)).toBe(12);
  });
  it("gcd(a, 0) = a", () => {
    expect(gcd(7, 0)).toBe(7);
    expect(gcd(0, 7)).toBe(7);
  });
  it("gcd is associative: gcd(gcd(a,b),c) = gcd(a,gcd(b,c))", () => {
    expect(gcd(gcd(12, 8), 6)).toBe(gcd(12, gcd(8, 6)));
  });
  it("gcd of consecutive numbers is 1", () => {
    expect(gcd(14, 15)).toBe(1);
    expect(gcd(99, 100)).toBe(1);
  });
  it("gcd with prime numbers", () => {
    expect(gcd(13, 17)).toBe(1);
    expect(gcd(7, 14)).toBe(7);
    expect(gcd(11, 33)).toBe(11);
  });
});
