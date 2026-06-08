import { describe, it, expect } from "vitest";
import { parseFormula } from "../index";

describe("single element parsing", () => {
  it("parses H as { H: 1, charge: 0 }", () => {
    const result = parseFormula("H");
    expect(result.elements).toEqual({ H: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses He as { He: 1, charge: 0 }", () => {
    const result = parseFormula("He");
    expect(result.elements).toEqual({ He: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses Li as { Li: 1, charge: 0 }", () => {
    const result = parseFormula("Li");
    expect(result.elements).toEqual({ Li: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses Be as { Be: 1, charge: 0 }", () => {
    const result = parseFormula("Be");
    expect(result.elements).toEqual({ Be: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses B as { B: 1, charge: 0 }", () => {
    const result = parseFormula("B");
    expect(result.elements).toEqual({ B: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses C as { C: 1, charge: 0 }", () => {
    const result = parseFormula("C");
    expect(result.elements).toEqual({ C: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses N as { N: 1, charge: 0 }", () => {
    const result = parseFormula("N");
    expect(result.elements).toEqual({ N: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses O as { O: 1, charge: 0 }", () => {
    const result = parseFormula("O");
    expect(result.elements).toEqual({ O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses F as { F: 1, charge: 0 }", () => {
    const result = parseFormula("F");
    expect(result.elements).toEqual({ F: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses Ne as { Ne: 1, charge: 0 }", () => {
    const result = parseFormula("Ne");
    expect(result.elements).toEqual({ Ne: 1 });
    expect(result.charge).toBe(0);
  });
});
