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

describe("element with subscript", () => {
  it("parses H2 as { H: 2, charge: 0 }", () => {
    const result = parseFormula("H2");
    expect(result.elements).toEqual({ H: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses O2 as { O: 2, charge: 0 }", () => {
    const result = parseFormula("O2");
    expect(result.elements).toEqual({ O: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses N2 as { N: 2, charge: 0 }", () => {
    const result = parseFormula("N2");
    expect(result.elements).toEqual({ N: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses Cl2 as { Cl: 2, charge: 0 }", () => {
    const result = parseFormula("Cl2");
    expect(result.elements).toEqual({ Cl: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses F2 as { F: 2, charge: 0 }", () => {
    const result = parseFormula("F2");
    expect(result.elements).toEqual({ F: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses Br2 as { Br: 2, charge: 0 }", () => {
    const result = parseFormula("Br2");
    expect(result.elements).toEqual({ Br: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses I2 as { I: 2, charge: 0 }", () => {
    const result = parseFormula("I2");
    expect(result.elements).toEqual({ I: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses H2O as { H: 2, O: 1, charge: 0 }", () => {
    const result = parseFormula("H2O");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses CO2 as { C: 1, O: 2, charge: 0 }", () => {
    const result = parseFormula("CO2");
    expect(result.elements).toEqual({ C: 1, O: 2 });
    expect(result.charge).toBe(0);
  });

  it("parses NH3 as { N: 1, H: 3, charge: 0 }", () => {
    const result = parseFormula("NH3");
    expect(result.elements).toEqual({ N: 1, H: 3 });
    expect(result.charge).toBe(0);
  });
});

describe("polyatomic ion parsing", () => {
  it("parses OH- as { O: 1, H: 1, charge: -1 }", () => {
    const result = parseFormula("OH-");
    expect(result.elements).toEqual({ O: 1, H: 1 });
    expect(result.charge).toBe(-1);
  });

  it("parses NH4+ as { N: 1, H: 4, charge: 1 }", () => {
    const result = parseFormula("NH4+");
    expect(result.elements).toEqual({ N: 1, H: 4 });
    expect(result.charge).toBe(1);
  });

  it("parses NO3- as { N: 1, O: 3, charge: -1 }", () => {
    const result = parseFormula("NO3-");
    expect(result.elements).toEqual({ N: 1, O: 3 });
    expect(result.charge).toBe(-1);
  });

  it("parses SO4^2- as { S: 1, O: 4, charge: -2 }", () => {
    const result = parseFormula("SO4^2-");
    expect(result.elements).toEqual({ S: 1, O: 4 });
    expect(result.charge).toBe(-2);
  });

  it("parses CO3^2- as { C: 1, O: 3, charge: -2 }", () => {
    const result = parseFormula("CO3^2-");
    expect(result.elements).toEqual({ C: 1, O: 3 });
    expect(result.charge).toBe(-2);
  });

  it("parses PO4^3- as { P: 1, O: 4, charge: -3 }", () => {
    const result = parseFormula("PO4^3-");
    expect(result.elements).toEqual({ P: 1, O: 4 });
    expect(result.charge).toBe(-3);
  });

  it("parses ClO3- as { Cl: 1, O: 3, charge: -1 }", () => {
    const result = parseFormula("ClO3-");
    expect(result.elements).toEqual({ Cl: 1, O: 3 });
    expect(result.charge).toBe(-1);
  });

  it("parses ClO4- as { Cl: 1, O: 4, charge: -1 }", () => {
    const result = parseFormula("ClO4-");
    expect(result.elements).toEqual({ Cl: 1, O: 4 });
    expect(result.charge).toBe(-1);
  });

  it("parses MnO4- as { Mn: 1, O: 4, charge: -1 }", () => {
    const result = parseFormula("MnO4-");
    expect(result.elements).toEqual({ Mn: 1, O: 4 });
    expect(result.charge).toBe(-1);
  });

  it("parses Cr2O7^2- as { Cr: 2, O: 7, charge: -2 }", () => {
    const result = parseFormula("Cr2O7^2-");
    expect(result.elements).toEqual({ Cr: 2, O: 7 });
    expect(result.charge).toBe(-2);
  });
});
