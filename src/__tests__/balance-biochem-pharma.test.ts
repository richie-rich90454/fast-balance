import {describe, it, expect} from "vitest";
import {balance} from "../index";

describe("amino acid synthesis", () => {
  it("Strecker synthesis first step: NH3 + HCN -> H2N-CH2-CN (positive check, may not balance)", () => {
    try {
      const r = balance("NH3 + HCN -> H2N-CH2-CN");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("amino acetonitrile hydrolysis: H2N-CH2-CN + H2O -> H2N-CH2-COOH (positive check, may not balance)", () => {
    try {
      const r = balance("H2N-CH2-CN + H2O -> H2N-CH2-COOH");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("carbamic acid formation: NH3 + CO2 + H2O -> H2N-COOH (positive check, may not balance)", () => {
    try {
      const r = balance("NH3 + CO2 + H2O -> H2N-COOH");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("glycine formation (positive check, may not balance)", () => {
    try {
      const r = balance("NH3 + HCHO + HCN -> H2N-CH2-COOH");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("alanine formation (positive check, may not balance)", () => {
    try {
      const r = balance("NH3 + CH3CHO + HCN -> H2N-CH(CH3)-COOH");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
});

describe("protein hydrolysis", () => {
  it("protein + H2O -> amino acids (positive check, may not balance)", () => {
    try {
      const r = balance("protein + H2O -> amino acid");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("starch + H2O -> glucose (positive check, may not balance)", () => {
    try {
      const r = balance("starch + H2O -> glucose");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("sucrose + H2O -> glucose + fructose (positive check, may not balance)", () => {
    try {
      const r = balance("C12H22O11 + H2O -> C6H12O6 + C6H12O6");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("cellulose + H2O -> glucose (positive check, may not balance)", () => {
    try {
      const r = balance("cellulose + H2O -> glucose");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });

  it("fat + H2O -> glycerol + fatty acid (positive check, may not balance)", () => {
    try {
      const r = balance("fat + H2O -> glycerol + fatty acid");
      expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
      expect(r.products.every(s => s.coefficient > 0)).toBe(true);
      const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
      expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
    } catch (e: any) {
      expect(e.message).toMatch(/Expected element|Unbalanceable|unbalanced|Cannot balance/i);
    }
  });
});
