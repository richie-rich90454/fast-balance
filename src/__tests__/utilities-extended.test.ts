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

describe("lcm mathematical properties", () => {
  it("lcm is commutative: lcm(a,b) = lcm(b,a)", () => {
    expect(lcm(4, 6)).toBe(lcm(6, 4));
    expect(lcm(7, 13)).toBe(lcm(13, 7));
  });
  it("lcm(a, 1) = a", () => {
    expect(lcm(5, 1)).toBe(5);
    expect(lcm(1, 5)).toBe(5);
  });
  it("lcm(a, a) = a", () => {
    expect(lcm(6, 6)).toBe(6);
    expect(lcm(15, 15)).toBe(15);
  });
  it("lcm(a, 0) = 0", () => {
    expect(lcm(5, 0)).toBe(0);
    expect(lcm(0, 5)).toBe(0);
  });
  it("gcd(a,b) * lcm(a,b) = a * b for positive a,b", () => {
    expect(gcd(12, 8) * lcm(12, 8)).toBe(12 * 8);
    expect(gcd(7, 13) * lcm(7, 13)).toBe(7 * 13);
    expect(gcd(15, 25) * lcm(15, 25)).toBe(15 * 25);
  });
  it("lcm of prime numbers is their product", () => {
    expect(lcm(3, 5)).toBe(15);
    expect(lcm(7, 11)).toBe(77);
  });
  it("lcm is associative: lcm(lcm(a,b),c) = lcm(a,lcm(b,c))", () => {
    expect(lcm(lcm(2, 3), 4)).toBe(lcm(2, lcm(3, 4)));
  });
});
