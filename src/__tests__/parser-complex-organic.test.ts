import { describe, it, expect } from "vitest";
import { parseFormula } from "../index";

describe("long-chain alkanes and alkenes", () => {
  it("C10H22 (decane) parses correctly", () => {
    const r = parseFormula("C10H22");
    expect(r.elements.C).toBe(10);
    expect(r.elements.H).toBe(22);
    expect(Object.keys(r.elements).length).toBe(2);
  });
  it("C12H26 (dodecane) parses correctly", () => {
    const r = parseFormula("C12H26");
    expect(r.elements.C).toBe(12);
    expect(r.elements.H).toBe(26);
  });
  it("C16H34 (hexadecane) parses correctly", () => {
    const r = parseFormula("C16H34");
    expect(r.elements.C).toBe(16);
    expect(r.elements.H).toBe(34);
  });
  it("C18H38 (octadecane) parses correctly", () => {
    const r = parseFormula("C18H38");
    expect(r.elements.C).toBe(18);
    expect(r.elements.H).toBe(38);
  });
  it("C20H42 (eicosane) parses correctly", () => {
    const r = parseFormula("C20H42");
    expect(r.elements.C).toBe(20);
    expect(r.elements.H).toBe(42);
  });
  it("C10H20 (decene) parses correctly", () => {
    const r = parseFormula("C10H20");
    expect(r.elements.C).toBe(10);
    expect(r.elements.H).toBe(20);
  });
  it("C18H36 (octadecene) parses correctly", () => {
    const r = parseFormula("C18H36");
    expect(r.elements.C).toBe(18);
    expect(r.elements.H).toBe(36);
  });
  it("C10H18 (decyne) parses correctly", () => {
    const r = parseFormula("C10H18");
    expect(r.elements.C).toBe(10);
    expect(r.elements.H).toBe(18);
  });
  it("C18H30 (linolenic acid hydrocarbon part) parses correctly", () => {
    const r = parseFormula("C18H30");
    expect(r.elements.C).toBe(18);
    expect(r.elements.H).toBe(30);
  });
});

describe("amino acids", () => {
  it("glycine C2H5NO2 parses correctly", () => {
    const r = parseFormula("C2H5NO2");
    expect(r.elements.C).toBe(2);
    expect(r.elements.H).toBe(5);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("alanine C3H7NO2 parses correctly", () => {
    const r = parseFormula("C3H7NO2");
    expect(r.elements.C).toBe(3);
    expect(r.elements.H).toBe(7);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("valine C5H11NO2 parses correctly", () => {
    const r = parseFormula("C5H11NO2");
    expect(r.elements.C).toBe(5);
    expect(r.elements.H).toBe(11);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("leucine C6H13NO2 parses correctly", () => {
    const r = parseFormula("C6H13NO2");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(13);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("phenylalanine C9H11NO2 parses correctly", () => {
    const r = parseFormula("C9H11NO2");
    expect(r.elements.C).toBe(9);
    expect(r.elements.H).toBe(11);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("tryptophan C11H12N2O2 parses correctly", () => {
    const r = parseFormula("C11H12N2O2");
    expect(r.elements.C).toBe(11);
    expect(r.elements.H).toBe(12);
    expect(r.elements.N).toBe(2);
    expect(r.elements.O).toBe(2);
  });
  it("arginine C6H14N4O2 parses correctly", () => {
    const r = parseFormula("C6H14N4O2");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(14);
    expect(r.elements.N).toBe(4);
    expect(r.elements.O).toBe(2);
  });
  it("histidine C6H9N3O2 parses correctly", () => {
    const r = parseFormula("C6H9N3O2");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(9);
    expect(r.elements.N).toBe(3);
    expect(r.elements.O).toBe(2);
  });
});

describe("sugars and carbohydrates", () => {
  it("glucose C6H12O6 parses correctly", () => {
    const r = parseFormula("C6H12O6");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(12);
    expect(r.elements.O).toBe(6);
  });
  it("fructose C6H12O6 parses correctly", () => {
    const r = parseFormula("C6H12O6");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(12);
    expect(r.elements.O).toBe(6);
  });
  it("sucrose C12H22O11 parses correctly", () => {
    const r = parseFormula("C12H22O11");
    expect(r.elements.C).toBe(12);
    expect(r.elements.H).toBe(22);
    expect(r.elements.O).toBe(11);
  });
  it("ribose C5H10O5 parses correctly", () => {
    const r = parseFormula("C5H10O5");
    expect(r.elements.C).toBe(5);
    expect(r.elements.H).toBe(10);
    expect(r.elements.O).toBe(5);
  });
  it("deoxyribose C5H10O4 parses correctly", () => {
    const r = parseFormula("C5H10O4");
    expect(r.elements.C).toBe(5);
    expect(r.elements.H).toBe(10);
    expect(r.elements.O).toBe(4);
  });
  it("cellulose unit C6H10O5 parses correctly", () => {
    const r = parseFormula("C6H10O5");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(10);
    expect(r.elements.O).toBe(5);
  });
  it("maltose C12H22O11 parses correctly", () => {
    const r = parseFormula("C12H22O11");
    expect(r.elements.C).toBe(12);
    expect(r.elements.H).toBe(22);
    expect(r.elements.O).toBe(11);
  });
  it("starch unit C6H10O5 parses correctly", () => {
    const r = parseFormula("C6H10O5");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(10);
    expect(r.elements.O).toBe(5);
  });
});

describe("complex esters and amides", () => {
  it("ethyl acetate CH3COOC2H5 parses correctly", () => {
    const r = parseFormula("CH3COOC2H5");
    expect(r.elements.C).toBe(4);
    expect(r.elements.H).toBe(8);
    expect(r.elements.O).toBe(2);
  });
  it("methyl benzoate C6H5COOCH3 parses correctly", () => {
    const r = parseFormula("C6H5COOCH3");
    expect(r.elements.C).toBe(8);
    expect(r.elements.H).toBe(8);
    expect(r.elements.O).toBe(2);
  });
  it("dimethyl terephthalate C6H4(COOCH3)2 parses correctly", () => {
    const r = parseFormula("C6H4(COOCH3)2");
    expect(r.elements.C).toBe(10);
    expect(r.elements.H).toBe(10);
    expect(r.elements.O).toBe(4);
  });
  it("acetamide CH3CONH2 parses correctly", () => {
    const r = parseFormula("CH3CONH2");
    expect(r.elements.C).toBe(2);
    expect(r.elements.H).toBe(5);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(1);
  });
  it("N,N-dimethylformamide HCON(CH3)2 parses correctly", () => {
    const r = parseFormula("HCON(CH3)2");
    expect(r.elements.C).toBe(3);
    expect(r.elements.H).toBe(7);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(1);
  });
  it("benzamide C6H5CONH2 parses correctly", () => {
    const r = parseFormula("C6H5CONH2");
    expect(r.elements.C).toBe(7);
    expect(r.elements.H).toBe(7);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(1);
  });
  it("urea NH2CONH2 parses correctly", () => {
    const r = parseFormula("NH2CONH2");
    expect(r.elements.C).toBe(1);
    expect(r.elements.H).toBe(4);
    expect(r.elements.N).toBe(2);
    expect(r.elements.O).toBe(1);
  });
  it("caprolactam (C6H11NO) parses correctly", () => {
    const r = parseFormula("C6H11NO");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(11);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(1);
  });
});

describe("fatty acids", () => {
  it("palmitic acid C16H32O2 parses correctly", () => {
    const r = parseFormula("C16H32O2");
    expect(r.elements.C).toBe(16);
    expect(r.elements.H).toBe(32);
    expect(r.elements.O).toBe(2);
  });
  it("stearic acid C18H36O2 parses correctly", () => {
    const r = parseFormula("C18H36O2");
    expect(r.elements.C).toBe(18);
    expect(r.elements.H).toBe(36);
    expect(r.elements.O).toBe(2);
  });
  it("oleic acid C18H34O2 parses correctly", () => {
    const r = parseFormula("C18H34O2");
    expect(r.elements.C).toBe(18);
    expect(r.elements.H).toBe(34);
    expect(r.elements.O).toBe(2);
  });
  it("linoleic acid C18H32O2 parses correctly", () => {
    const r = parseFormula("C18H32O2");
    expect(r.elements.C).toBe(18);
    expect(r.elements.H).toBe(32);
    expect(r.elements.O).toBe(2);
  });
  it("arachidonic acid C20H32O2 parses correctly", () => {
    const r = parseFormula("C20H32O2");
    expect(r.elements.C).toBe(20);
    expect(r.elements.H).toBe(32);
    expect(r.elements.O).toBe(2);
  });
  it("butyric acid C4H8O2 parses correctly", () => {
    const r = parseFormula("C4H8O2");
    expect(r.elements.C).toBe(4);
    expect(r.elements.H).toBe(8);
    expect(r.elements.O).toBe(2);
  });
  it("lauric acid C12H24O2 parses correctly", () => {
    const r = parseFormula("C12H24O2");
    expect(r.elements.C).toBe(12);
    expect(r.elements.H).toBe(24);
    expect(r.elements.O).toBe(2);
  });
  it("myristic acid C14H28O2 parses correctly", () => {
    const r = parseFormula("C14H28O2");
    expect(r.elements.C).toBe(14);
    expect(r.elements.H).toBe(28);
    expect(r.elements.O).toBe(2);
  });
});

describe("steroid skeletons (simplified)", () => {
  it("cholesterol C27H46O parses correctly", () => {
    const r = parseFormula("C27H46O");
    expect(r.elements.C).toBe(27);
    expect(r.elements.H).toBe(46);
    expect(r.elements.O).toBe(1);
  });
  it("testosterone C19H28O2 parses correctly", () => {
    const r = parseFormula("C19H28O2");
    expect(r.elements.C).toBe(19);
    expect(r.elements.H).toBe(28);
    expect(r.elements.O).toBe(2);
  });
  it("estradiol C18H24O2 parses correctly", () => {
    const r = parseFormula("C18H24O2");
    expect(r.elements.C).toBe(18);
    expect(r.elements.H).toBe(24);
    expect(r.elements.O).toBe(2);
  });
  it("cortisol C21H30O5 parses correctly", () => {
    const r = parseFormula("C21H30O5");
    expect(r.elements.C).toBe(21);
    expect(r.elements.H).toBe(30);
    expect(r.elements.O).toBe(5);
  });
  it("progesterone C21H30O2 parses correctly", () => {
    const r = parseFormula("C21H30O2");
    expect(r.elements.C).toBe(21);
    expect(r.elements.H).toBe(30);
    expect(r.elements.O).toBe(2);
  });
  it("vitamin D3 C27H44O parses correctly", () => {
    const r = parseFormula("C27H44O");
    expect(r.elements.C).toBe(27);
    expect(r.elements.H).toBe(44);
    expect(r.elements.O).toBe(1);
  });
  it("corticosterone C21H30O4 parses correctly", () => {
    const r = parseFormula("C21H30O4");
    expect(r.elements.C).toBe(21);
    expect(r.elements.H).toBe(30);
    expect(r.elements.O).toBe(4);
  });
});

describe("vitamins and cofactors", () => {
  it("vitamin C (ascorbic acid) C6H8O6 parses correctly", () => {
    const r = parseFormula("C6H8O6");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(8);
    expect(r.elements.O).toBe(6);
  });
  it("niacin (vitamin B3) C6H5NO2 parses correctly", () => {
    const r = parseFormula("C6H5NO2");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(5);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(2);
  });
  it("pyridoxine (vitamin B6) C8H11NO3 parses correctly", () => {
    const r = parseFormula("C8H11NO3");
    expect(r.elements.C).toBe(8);
    expect(r.elements.H).toBe(11);
    expect(r.elements.N).toBe(1);
    expect(r.elements.O).toBe(3);
  });
  it("thiamine (vitamin B1) C12H17N4OS parses correctly", () => {
    const r = parseFormula("C12H17N4OS");
    expect(r.elements.C).toBe(12);
    expect(r.elements.H).toBe(17);
    expect(r.elements.N).toBe(4);
    expect(r.elements.O).toBe(1);
    expect(r.elements.S).toBe(1);
  });
  it("riboflavin (vitamin B2) C17H20N4O6 parses correctly", () => {
    const r = parseFormula("C17H20N4O6");
    expect(r.elements.C).toBe(17);
    expect(r.elements.H).toBe(20);
    expect(r.elements.N).toBe(4);
    expect(r.elements.O).toBe(6);
  });
  it("biotin (vitamin B7) C10H16N2O3S parses correctly", () => {
    const r = parseFormula("C10H16N2O3S");
    expect(r.elements.C).toBe(10);
    expect(r.elements.H).toBe(16);
    expect(r.elements.N).toBe(2);
    expect(r.elements.O).toBe(3);
    expect(r.elements.S).toBe(1);
  });
  it("folic acid C19H19N7O6 parses correctly", () => {
    const r = parseFormula("C19H19N7O6");
    expect(r.elements.C).toBe(19);
    expect(r.elements.H).toBe(19);
    expect(r.elements.N).toBe(7);
    expect(r.elements.O).toBe(6);
  });
});

describe("nucleotide bases", () => {
  it("adenine C5H5N5 parses correctly", () => {
    const r = parseFormula("C5H5N5");
    expect(r.elements.C).toBe(5);
    expect(r.elements.H).toBe(5);
    expect(r.elements.N).toBe(5);
  });
  it("guanine C5H5N5O parses correctly", () => {
    const r = parseFormula("C5H5N5O");
    expect(r.elements.C).toBe(5);
    expect(r.elements.H).toBe(5);
    expect(r.elements.N).toBe(5);
    expect(r.elements.O).toBe(1);
  });
  it("cytosine C4H5N3O parses correctly", () => {
    const r = parseFormula("C4H5N3O");
    expect(r.elements.C).toBe(4);
    expect(r.elements.H).toBe(5);
    expect(r.elements.N).toBe(3);
    expect(r.elements.O).toBe(1);
  });
  it("thymine C5H6N2O2 parses correctly", () => {
    const r = parseFormula("C5H6N2O2");
    expect(r.elements.C).toBe(5);
    expect(r.elements.H).toBe(6);
    expect(r.elements.N).toBe(2);
    expect(r.elements.O).toBe(2);
  });
  it("uracil C4H4N2O2 parses correctly", () => {
    const r = parseFormula("C4H4N2O2");
    expect(r.elements.C).toBe(4);
    expect(r.elements.H).toBe(4);
    expect(r.elements.N).toBe(2);
    expect(r.elements.O).toBe(2);
  });
});

describe("peptide fragments", () => {
  it("glycylglycine C4H8N2O3 parses correctly", () => {
    const r = parseFormula("C4H8N2O3");
    expect(r.elements.C).toBe(4);
    expect(r.elements.H).toBe(8);
    expect(r.elements.N).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("alanylalanine C6H12N2O3 parses correctly", () => {
    const r = parseFormula("C6H12N2O3");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(12);
    expect(r.elements.N).toBe(2);
    expect(r.elements.O).toBe(3);
  });
  it("triglycine C6H11N3O4 parses correctly", () => {
    const r = parseFormula("C6H11N3O4");
    expect(r.elements.C).toBe(6);
    expect(r.elements.H).toBe(11);
    expect(r.elements.N).toBe(3);
    expect(r.elements.O).toBe(4);
  });
  it("glutathione C10H17N3O6S parses correctly", () => {
    const r = parseFormula("C10H17N3O6S");
    expect(r.elements.C).toBe(10);
    expect(r.elements.H).toBe(17);
    expect(r.elements.N).toBe(3);
    expect(r.elements.O).toBe(6);
    expect(r.elements.S).toBe(1);
  });
  it("carnosine C9H14N4O3 parses correctly", () => {
    const r = parseFormula("C9H14N4O3");
    expect(r.elements.C).toBe(9);
    expect(r.elements.H).toBe(14);
    expect(r.elements.N).toBe(4);
    expect(r.elements.O).toBe(3);
  });
});
