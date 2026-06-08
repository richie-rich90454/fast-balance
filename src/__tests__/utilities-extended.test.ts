import { describe, it, expect } from "vitest";
import { gcd, lcm } from "../index";
import { stripStateSymbols } from "../index";

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

describe("stripStateSymbols comprehensive", () => {
  it("strips (s) solid state", () => {
    expect(stripStateSymbols("NaCl(s)")).toBe("NaCl");
  });
  it("strips (l) liquid state", () => {
    expect(stripStateSymbols("Br2(l)")).toBe("Br2");
  });
  it("strips (g) gas state", () => {
    expect(stripStateSymbols("H2(g)")).toBe("H2");
  });
  it("strips (aq) aqueous state", () => {
    expect(stripStateSymbols("NaCl(aq)")).toBe("NaCl");
  });
  it("strips (cr) crystalline state", () => {
    expect(stripStateSymbols("SiO2(cr)")).toBe("SiO2");
  });
  it("strips (am) amorphous state", () => {
    expect(stripStateSymbols("SiO2(am)")).toBe("SiO2");
  });
  it("strips (solid) full word", () => {
    expect(stripStateSymbols("Fe(solid)")).toBe("Fe");
  });
  it("strips (liquid) full word", () => {
    expect(stripStateSymbols("H2O(liquid)")).toBe("H2O");
  });
  it("strips (gas) full word", () => {
    expect(stripStateSymbols("O2(gas)")).toBe("O2");
  });
  it("strips (aqueous) full word", () => {
    expect(stripStateSymbols("HCl(aqueous)")).toBe("HCl");
  });
  it("strips multiple state symbols", () => {
    expect(stripStateSymbols("H2O(s)(l)")).toBe("H2O");
  });
  it("returns unchanged when no state symbols", () => {
    expect(stripStateSymbols("H2SO4")).toBe("H2SO4");
  });
  it("handles empty string", () => {
    expect(stripStateSymbols("")).toBe("");
  });
  it("does not strip non-state parentheses like (OH)", () => {
    expect(stripStateSymbols("Ca(OH)2")).toBe("Ca(OH)2");
  });
  it("does not strip (CN) which is not a state symbol", () => {
    expect(stripStateSymbols("[Fe(CN)6]")).toBe("[Fe(CN)6]");
  });
});

describe("gcd larger numbers and edge cases", () => {
  it("gcd of large numbers", () => {
    expect(gcd(1071, 462)).toBe(21);
  });
  it("gcd of powers of 2", () => {
    expect(gcd(64, 32)).toBe(32);
    expect(gcd(128, 64)).toBe(64);
  });
  it("gcd where one divides the other", () => {
    expect(gcd(12, 4)).toBe(4);
    expect(gcd(100, 25)).toBe(25);
  });
  it("gcd of Fibonacci numbers", () => {
    expect(gcd(21, 34)).toBe(1);
    expect(gcd(34, 55)).toBe(1);
  });
  it("gcd(1, 1) = 1", () => {
    expect(gcd(1, 1)).toBe(1);
  });
});

describe("lcm larger numbers and edge cases", () => {
  it("lcm of large numbers", () => {
    expect(lcm(21, 6)).toBe(42);
  });
  it("lcm where one divides the other", () => {
    expect(lcm(12, 4)).toBe(12);
    expect(lcm(100, 25)).toBe(100);
  });
  it("lcm of powers of 2", () => {
    expect(lcm(8, 16)).toBe(16);
    expect(lcm(32, 64)).toBe(64);
  });
  it("lcm(1, 1) = 1", () => {
    expect(lcm(1, 1)).toBe(1);
  });
  it("lcm of three numbers via chaining", () => {
    expect(lcm(lcm(4, 6), 5)).toBe(60);
  });
});

describe("gcd and lcm relationship", () => {
  it("gcd * lcm = a * b for coprime numbers", () => {
    expect(gcd(3, 7) * lcm(3, 7)).toBe(21);
  });
  it("gcd * lcm = a * b for numbers sharing factors", () => {
    expect(gcd(8, 12) * lcm(8, 12)).toBe(96);
  });
  it("gcd * lcm = a * b for one being multiple of other", () => {
    expect(gcd(4, 12) * lcm(4, 12)).toBe(48);
  });
  it("lcm(a,b) / gcd(a,b) = (a/gcd) * (b/gcd) when gcd > 0", () => {
    const a = 24, b = 36;
    const g = gcd(a, b);
    expect(lcm(a, b) / g).toBe((a / g) * (b / g));
  });
  it("if gcd(a,b) = 1 then lcm(a,b) = a*b", () => {
    expect(gcd(8, 9)).toBe(1);
    expect(lcm(8, 9)).toBe(72);
  });
});
