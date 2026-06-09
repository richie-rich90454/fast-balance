import { describe, it, expect } from "vitest";
import { parseFormula } from "../index";

describe("parseFormula element count accuracy", () => {
  it("H2O has H=2,O=1", () => {
    const result = parseFormula("H2O");
    expect(result.elements).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("CO2 has C=1,O=2", () => {
    const result = parseFormula("CO2");
    expect(result.elements).toEqual({ C: 1, O: 2 });
    expect(result.charge).toBe(0);
  });

  it("H2SO4 has H=2,S=1,O=4", () => {
    const result = parseFormula("H2SO4");
    expect(result.elements).toEqual({ H: 2, S: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("CaCO3 has Ca=1,C=1,O=3", () => {
    const result = parseFormula("CaCO3");
    expect(result.elements).toEqual({ Ca: 1, C: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("NaCl has Na=1,Cl=1", () => {
    const result = parseFormula("NaCl");
    expect(result.elements).toEqual({ Na: 1, Cl: 1 });
    expect(result.charge).toBe(0);
  });

  it("Fe2O3 has Fe=2,O=3", () => {
    const result = parseFormula("Fe2O3");
    expect(result.elements).toEqual({ Fe: 2, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("C6H12O6 has C=6,H=12,O=6", () => {
    const result = parseFormula("C6H12O6");
    expect(result.elements).toEqual({ C: 6, H: 12, O: 6 });
    expect(result.charge).toBe(0);
  });

  it("KMnO4 has K=1,Mn=1,O=4", () => {
    const result = parseFormula("KMnO4");
    expect(result.elements).toEqual({ K: 1, Mn: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("NaHCO3 has Na=1,H=1,C=1,O=3", () => {
    const result = parseFormula("NaHCO3");
    expect(result.elements).toEqual({ Na: 1, H: 1, C: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("NH4NO3 has N=2,H=4,O=3", () => {
    const result = parseFormula("NH4NO3");
    expect(result.elements).toEqual({ N: 2, H: 4, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("Al2(SO4)3 has Al=2,S=3,O=12", () => {
    const result = parseFormula("Al2(SO4)3");
    expect(result.elements).toEqual({ Al: 2, S: 3, O: 12 });
    expect(result.charge).toBe(0);
  });

  it("Ca(OH)2 has Ca=1,O=2,H=2", () => {
    const result = parseFormula("Ca(OH)2");
    expect(result.elements).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("Fe(NO3)3 has Fe=1,N=3,O=9", () => {
    const result = parseFormula("Fe(NO3)3");
    expect(result.elements).toEqual({ Fe: 1, N: 3, O: 9 });
    expect(result.charge).toBe(0);
  });

  it("MgCl2 has Mg=1,Cl=2", () => {
    const result = parseFormula("MgCl2");
    expect(result.elements).toEqual({ Mg: 1, Cl: 2 });
    expect(result.charge).toBe(0);
  });

  it("P2O5 has P=2,O=5", () => {
    const result = parseFormula("P2O5");
    expect(result.elements).toEqual({ P: 2, O: 5 });
    expect(result.charge).toBe(0);
  });

  it("H3PO4 has H=3,P=1,O=4", () => {
    const result = parseFormula("H3PO4");
    expect(result.elements).toEqual({ H: 3, P: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("Zn has Zn=1", () => {
    const result = parseFormula("Zn");
    expect(result.elements).toEqual({ Zn: 1 });
    expect(result.charge).toBe(0);
  });

  it("O2 has O=2", () => {
    const result = parseFormula("O2");
    expect(result.elements).toEqual({ O: 2 });
    expect(result.charge).toBe(0);
  });

  it("Na2SO4 has Na=2,S=1,O=4", () => {
    const result = parseFormula("Na2SO4");
    expect(result.elements).toEqual({ Na: 2, S: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("NH3 has N=1,H=3", () => {
    const result = parseFormula("NH3");
    expect(result.elements).toEqual({ N: 1, H: 3 });
    expect(result.charge).toBe(0);
  });

  it("AgNO3 has Ag=1,N=1,O=3", () => {
    const result = parseFormula("AgNO3");
    expect(result.elements).toEqual({ Ag: 1, N: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("CuSO4 has Cu=1,S=1,O=4", () => {
    const result = parseFormula("CuSO4");
    expect(result.elements).toEqual({ Cu: 1, S: 1, O: 4 });
    expect(result.charge).toBe(0);
  });

  it("HCl has H=1,Cl=1", () => {
    const result = parseFormula("HCl");
    expect(result.elements).toEqual({ H: 1, Cl: 1 });
    expect(result.charge).toBe(0);
  });

  it("CH4 has C=1,H=4", () => {
    const result = parseFormula("CH4");
    expect(result.elements).toEqual({ C: 1, H: 4 });
    expect(result.charge).toBe(0);
  });

  it("BaCl2 has Ba=1,Cl=2", () => {
    const result = parseFormula("BaCl2");
    expect(result.elements).toEqual({ Ba: 1, Cl: 2 });
    expect(result.charge).toBe(0);
  });

  it("K2Cr2O7 has K=2,Cr=2,O=7", () => {
    const result = parseFormula("K2Cr2O7");
    expect(result.elements).toEqual({ K: 2, Cr: 2, O: 7 });
    expect(result.charge).toBe(0);
  });

  it("Mg(OH)2 has Mg=1,O=2,H=2", () => {
    const result = parseFormula("Mg(OH)2");
    expect(result.elements).toEqual({ Mg: 1, O: 2, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("Al has Al=1", () => {
    const result = parseFormula("Al");
    expect(result.elements).toEqual({ Al: 1 });
    expect(result.charge).toBe(0);
  });

  it("H2O2 has H=2,O=2", () => {
    const result = parseFormula("H2O2");
    expect(result.elements).toEqual({ H: 2, O: 2 });
    expect(result.charge).toBe(0);
  });

  it("C2H6 has C=2,H=6", () => {
    const result = parseFormula("C2H6");
    expect(result.elements).toEqual({ C: 2, H: 6 });
    expect(result.charge).toBe(0);
  });

  it("Ba(OH)2 has Ba=1,O=2,H=2", () => {
    const result = parseFormula("Ba(OH)2");
    expect(result.elements).toEqual({ Ba: 1, O: 2, H: 2 });
    expect(result.charge).toBe(0);
  });

  it("FeCl3 has Fe=1,Cl=3", () => {
    const result = parseFormula("FeCl3");
    expect(result.elements).toEqual({ Fe: 1, Cl: 3 });
    expect(result.charge).toBe(0);
  });

  it("Na2O has Na=2,O=1", () => {
    const result = parseFormula("Na2O");
    expect(result.elements).toEqual({ Na: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("KClO3 has K=1,Cl=1,O=3", () => {
    const result = parseFormula("KClO3");
    expect(result.elements).toEqual({ K: 1, Cl: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("Ca3(PO4)2 has Ca=3,P=2,O=8", () => {
    const result = parseFormula("Ca3(PO4)2");
    expect(result.elements).toEqual({ Ca: 3, P: 2, O: 8 });
    expect(result.charge).toBe(0);
  });

  it("Na2S2O3 has Na=2,S=2,O=3", () => {
    const result = parseFormula("Na2S2O3");
    expect(result.elements).toEqual({ Na: 2, S: 2, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("Mg3N2 has Mg=3,N=2", () => {
    const result = parseFormula("Mg3N2");
    expect(result.elements).toEqual({ Mg: 3, N: 2 });
    expect(result.charge).toBe(0);
  });

  it("HNO3 has H=1,N=1,O=3", () => {
    const result = parseFormula("HNO3");
    expect(result.elements).toEqual({ H: 1, N: 1, O: 3 });
    expect(result.charge).toBe(0);
  });

  it("Cu(NO3)2 has Cu=1,N=2,O=6", () => {
    const result = parseFormula("Cu(NO3)2");
    expect(result.elements).toEqual({ Cu: 1, N: 2, O: 6 });
    expect(result.charge).toBe(0);
  });

  it("PbO2 has Pb=1,O=2", () => {
    const result = parseFormula("PbO2");
    expect(result.elements).toEqual({ Pb: 1, O: 2 });
    expect(result.charge).toBe(0);
  });
});
