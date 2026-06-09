import { balance, parseFormula } from "../index";

describe("rare earth element tests", () => {
  it("should balance La + O2 -> La2O3", () => {
    const r = balance("La + O2 -> La2O3");
    expect(r.reactants[0].coefficient).toBe(4);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });

  it("should balance Ce + O2 -> CeO2", () => {
    const r = balance("Ce + O2 -> CeO2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });

  it("should balance Nd + O2 -> Nd2O3", () => {
    const r = balance("Nd + O2 -> Nd2O3");
    expect(r.reactants[0].coefficient).toBe(4);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });

  it("should balance Pr + O2 -> Pr2O3", () => {
    const r = balance("Pr + O2 -> Pr2O3");
    expect(r.reactants[0].coefficient).toBe(4);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });

  it("should balance Eu + O2 -> Eu2O3", () => {
    const r = balance("Eu + O2 -> Eu2O3");
    expect(r.reactants[0].coefficient).toBe(4);
    expect(r.reactants[1].coefficient).toBe(3);
    expect(r.products[0].coefficient).toBe(2);
  });
});

describe("actinide tests", () => {
  it("should balance UO2 + O2 -> U3O8", () => {
    const r = balance("UO2 + O2 -> U3O8");
    expect(r.reactants[0].coefficient).toBe(3);
    expect(r.reactants[1].coefficient).toBe(2);
    expect(r.products[0].coefficient).toBe(1);
  });

  it("should balance Th + O2 -> ThO2", () => {
    const r = balance("Th + O2 -> ThO2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });

  it("should balance Pu + O2 -> PuO2", () => {
    const r = balance("Pu + O2 -> PuO2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });

  it("should balance U + O2 -> UO2", () => {
    const r = balance("U + O2 -> UO2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });

  it("should balance Np + O2 -> NpO2", () => {
    const r = balance("Np + O2 -> NpO2");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.reactants[1].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });
});

describe("phosphide tests", () => {});

describe("nitride tests", () => {});

describe("carbide tests", () => {});

describe("borohydride tests", () => {});

describe("organometallic tests", () => {});

describe("coordination compound tests", () => {});

describe("cluster compound tests", () => {});

describe("extreme complexity tests", () => {});
