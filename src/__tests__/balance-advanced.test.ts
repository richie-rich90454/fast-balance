import { describe, it, expect } from "vitest";
import { Fraction, balance, splitEquation, parseFormula, gcd } from "../index";

describe("fraction constructor edge cases", () => {
  it("new Fraction(0, 1) creates zero", () => {
    const f = new Fraction(0, 1);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("new Fraction(0, 2) normalizes to 0/1", () => {
    const f = new Fraction(0, 2);
    expect(f.num).toBe(0);
    expect(f.den).toBe(1);
  });

  it("new Fraction(1, 2) creates one half", () => {
    const f = new Fraction(1, 2);
    expect(f.num).toBe(1);
    expect(f.den).toBe(2);
  });

  it("new Fraction(-1, 2) creates negative one half", () => {
    const f = new Fraction(-1, 2);
    expect(f.num).toBe(-1);
    expect(f.den).toBe(2);
  });

  it("new Fraction(1, -2) normalizes to -1/2", () => {
    const f = new Fraction(1, -2);
    expect(f.num).toBe(-1);
    expect(f.den).toBe(2);
  });
});

describe("fraction arithmetic edge cases", () => {
  it("Fraction(1,2).add(Fraction(1,3)) = 5/6", () => {
    const result = new Fraction(1, 2).add(new Fraction(1, 3));
    expect(result.num).toBe(5);
    expect(result.den).toBe(6);
  });

  it("Fraction(1,2).sub(Fraction(1,3)) = 1/6", () => {
    const result = new Fraction(1, 2).sub(new Fraction(1, 3));
    expect(result.num).toBe(1);
    expect(result.den).toBe(6);
  });

  it("Fraction(1,2).mul(Fraction(2,3)) = 1/3", () => {
    const result = new Fraction(1, 2).mul(new Fraction(2, 3));
    expect(result.num).toBe(1);
    expect(result.den).toBe(3);
  });

  it("Fraction(1,2).div(Fraction(2,3)) = 3/4", () => {
    const result = new Fraction(1, 2).div(new Fraction(2, 3));
    expect(result.num).toBe(3);
    expect(result.den).toBe(4);
  });

  it("Fraction(0,1).add(Fraction(0,1)) = 0", () => {
    const result = new Fraction(0, 1).add(new Fraction(0, 1));
    expect(result.num).toBe(0);
    expect(result.den).toBe(1);
  });
});

describe("fraction identity and inverse", () => {
  it("Fraction.zero().add(x) = x", () => {
    const x = new Fraction(3, 7);
    const result = Fraction.zero().add(x);
    expect(result.equals(x)).toBe(true);
  });

  it("Fraction.one().mul(x) = x", () => {
    const x = new Fraction(5, 8);
    const result = Fraction.one().mul(x);
    expect(result.equals(x)).toBe(true);
  });

  it("x.add(x.neg()).isZero() = true", () => {
    const x = new Fraction(4, 9);
    expect(x.add(x.neg()).isZero()).toBe(true);
  });

  it("Fraction.zero().isZero() = true", () => {
    expect(Fraction.zero().isZero()).toBe(true);
  });

  it("Fraction.zero().equals(new Fraction(0)) = true", () => {
    expect(Fraction.zero().equals(new Fraction(0))).toBe(true);
  });
});

describe("balance with all output options", () => {
  it("balance with showOne: true shows coefficient 1", () => {
    const result = balance("H2 + O2 -> H2O", { showOne: true });
    expect(result.equation).toContain("1 H2");
    expect(result.reactants[0]?.coefficient).toBe(2);
    expect(result.reactants[1]?.coefficient).toBe(1);
    expect(result.products[0]?.coefficient).toBe(2);
  });

  it("balance with showOne: false omits coefficient 1", () => {
    const result = balance("H2 + O2 -> H2O", { showOne: false });
    expect(result.equation).not.toContain("1 ");
    expect(result.equation).toBe("2 H2 + O2 -> 2 H2O");
  });

  it("balance with format: text uses -> arrow", () => {
    const result = balance("H2 + O2 -> H2O", { format: "text" });
    expect(result.equation).toContain(" -> ");
  });

  it("balance with format: html uses &rarr; arrow", () => {
    const result = balance("H2 + O2 -> H2O", { format: "html" });
    expect(result.equation).toContain(" &rarr; ");
  });

  it("balance with format: latex uses \\rightarrow arrow", () => {
    const result = balance("H2 + O2 -> H2O", { format: "latex" });
    expect(result.equation).toContain(" \\rightarrow ");
  });
});

describe("balance coefficient properties", () => {
  const result = balance("H2 + O2 -> H2O");
  const allCoeffs = [...result.reactants, ...result.products].map(s => s.coefficient);

  it("all coefficients > 0 for H2+O2->H2O", () => {
    expect(allCoeffs.every(c => c > 0)).toBe(true);
  });

  it("all coefficients are integers for H2+O2->H2O", () => {
    expect(allCoeffs.every(c => Number.isInteger(c))).toBe(true);
  });

  it("GCD of coefficients = 1 for H2+O2->H2O", () => {
    const g = allCoeffs.reduce((acc, v) => gcd(Math.abs(v), acc), 0);
    expect(g).toBe(1);
  });

  it("sum of coefficients > 0 for H2+O2->H2O", () => {
    const sum = allCoeffs.reduce((a, b) => a + b, 0);
    expect(sum).toBeGreaterThan(0);
  });

  it("min coefficient >= 1 for H2+O2->H2O", () => {
    expect(Math.min(...allCoeffs)).toBeGreaterThanOrEqual(1);
  });
});

describe("balance multiple equation consistency", () => {
  it("balance H2+O2->H2O always returns same result", () => {
    const results = Array.from({ length: 5 }, () => balance("H2 + O2 -> H2O"));
    const first = results[0]!;
    for (const r of results) {
      expect(r.equation).toBe(first.equation);
      expect(r.reactants.map(s => s.coefficient)).toEqual(first.reactants.map(s => s.coefficient));
      expect(r.products.map(s => s.coefficient)).toEqual(first.products.map(s => s.coefficient));
    }
  });

  it("balance Fe+Cl2->FeCl3 always returns same result", () => {
    const results = Array.from({ length: 5 }, () => balance("Fe + Cl2 -> FeCl3"));
    const first = results[0]!;
    for (const r of results) {
      expect(r.equation).toBe(first.equation);
    }
  });

  it("balance N2+H2->NH3 always returns same result", () => {
    const results = Array.from({ length: 5 }, () => balance("N2 + H2 -> NH3"));
    const first = results[0]!;
    for (const r of results) {
      expect(r.equation).toBe(first.equation);
    }
  });

  it("balance CH4+O2->CO2+H2O always returns same result", () => {
    const results = Array.from({ length: 5 }, () => balance("CH4 + O2 -> CO2 + H2O"));
    const first = results[0]!;
    for (const r of results) {
      expect(r.equation).toBe(first.equation);
    }
  });

  it("balance Fe2O3+CO->Fe+CO2 always returns same result", () => {
    const results = Array.from({ length: 5 }, () => balance("Fe2O3 + CO -> Fe + CO2"));
    const first = results[0]!;
    for (const r of results) {
      expect(r.equation).toBe(first.equation);
    }
  });
});

describe("equation parsing roundtrip", () => {
  it("balance output equation can be parsed by splitEquation", () => {
    const result = balance("H2 + O2 -> H2O");
    const parsed = splitEquation(result.equation);
    expect(parsed.reactants.length).toBe(2);
    expect(parsed.products.length).toBe(1);
  });

  it("splitEquation output species can be balanced again", () => {
    const eq = splitEquation("H2 + O2 -> H2O");
    const reactantStr = eq.reactants.map(r => r.formula).join(" + ");
    const productStr = eq.products.map(p => p.formula).join(" + ");
    const result = balance(reactantStr + " -> " + productStr);
    expect(result.reactants.length).toBe(2);
    expect(result.products.length).toBe(1);
  });

  it("parseFormula of balanced formulas returns non-empty element maps", () => {
    const result = balance("H2 + O2 -> H2O");
    for (const species of [...result.reactants, ...result.products]) {
      const parsed = parseFormula(species.formula);
      expect(Object.keys(parsed.elements).length).toBeGreaterThan(0);
    }
  });

  it("balanced equations have same element counts on both sides", () => {
    const result = balance("CH4 + O2 -> CO2 + H2O");
    const leftElements: Record<string, number> = {};
    const rightElements: Record<string, number> = {};
    for (const r of result.reactants) {
      const parsed = parseFormula(r.formula);
      for (const [el, count] of Object.entries(parsed.elements)) {
        leftElements[el] = (leftElements[el] ?? 0) + count * r.coefficient;
      }
    }
    for (const p of result.products) {
      const parsed = parseFormula(p.formula);
      for (const [el, count] of Object.entries(parsed.elements)) {
        rightElements[el] = (rightElements[el] ?? 0) + count * p.coefficient;
      }
    }
    expect(leftElements).toEqual(rightElements);
  });

  it("balanced equations have same charge totals on both sides", () => {
    const result = balance("Fe2+ + 2 e- -> Fe");
    let leftCharge = 0;
    let rightCharge = 0;
    for (const r of result.reactants) {
      const parsed = parseFormula(r.formula);
      leftCharge += parsed.charge * r.coefficient;
    }
    for (const p of result.products) {
      const parsed = parseFormula(p.formula);
      rightCharge += parsed.charge * p.coefficient;
    }
    expect(leftCharge).toBe(rightCharge);
  });
});

describe("stress and limits", () => {
  it("balance 50 times quickly for H2+O2->H2O", () => {
    const start = Date.now();
    for (let i = 0; i < 50; i++) {
      const result = balance("H2 + O2 -> H2O");
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(2);
    }
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
  });

  it("balance C16H34+O2->CO2+H2O (large hydrocarbon combustion)", () => {
    const result = balance("C16H34 + O2 -> CO2 + H2O");
    expect(result.reactants[0]?.coefficient).toBe(2);
    expect(result.reactants[1]?.coefficient).toBe(49);
    expect(result.products[0]?.coefficient).toBe(32);
    expect(result.products[1]?.coefficient).toBe(34);
  });

  it("balance with complex nested parentheses", () => {
    const result = balance("Ca3(PO4)2 + H2SO4 -> Ca(H2PO4)2 + CaSO4");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balance with 6+ species", () => {
    const result = balance("KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O");
    expect([...result.reactants, ...result.products].length).toBeGreaterThanOrEqual(6);
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balance with charges and brackets", () => {
    const result = balance("MnO4- + H+ + e- -> Mn2+ + H2O");
    expect(result.reactants.length).toBe(3);
    expect(result.products.length).toBe(2);
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

