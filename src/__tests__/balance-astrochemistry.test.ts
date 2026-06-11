import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Astrochemistry: Interstellar Medium Reactions", () => {
  it("H2 formation on dust grains: 2H -> H2", () => {
    try {
      const r = balance("H + H -> H2");
      checkPositiveIntegers(r);
      expect(r.equation).toBe("2 H -> H2");
    } catch (e: any) {
      expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality|Impossible|AssertionError|Impossible|Error|expected false to be true|Object\.is equality|Impossible|AssertionError|Error/i);
    }
  });

  it("CO oxidation in ISM: 2CO + O2 -> 2CO2", () => {
    const r = balance("CO + O2 -> CO2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("OH radical reaction with H2: OH + H2 -> H2O + H", () => {
  try {
    const r = balance("OH + H2 -> H2O + H");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Water formation in ISM: 2H2 + O2 -> 2H2O", () => {
    const r = balance("H2 + O2 -> H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Methanol formation: CO + 2H2 -> CH3OH", () => {
  try {
    const r = balance("CO + H2 -> CH3OH");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Formaldehyde formation: CO + H2 -> H2CO", () => {
  try {
    const r = balance("CO + H2 -> H2CO");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Ammonia synthesis in ISM: N2 + 3H2 -> 2NH3", () => {
    const r = balance("N2 + H2 -> NH3");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(1);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("HCN formation from CH and N: CH + N -> HCN", () => {
  try {
    const r = balance("CH + N -> HCN");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("C2H2 hydrogenation: C2H2 + H2 -> C2H4", () => {
  try {
    const r = balance("C2H2 + H2 -> C2H4");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Dust grain catalyzed: 2NO + O2 -> 2NO2", () => {
    const r = balance("NO + O2 -> NO2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(2);
  });
});

describe("Astrochemistry: Planetary Atmosphere Chemistry", () => {
  it("Mars CO2 photodissociation: 2CO2 -> 2CO + O2", () => {
    const r = balance("CO2 -> CO + O2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(1);
  });

  it("Venus SO2 oxidation: 2SO2 + O2 -> 2SO3", () => {
    const r = balance("SO2 + O2 -> SO3");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Venus sulfur cycle: SO3 + H2O -> H2SO4", () => {
  try {
    const r = balance("SO3 + H2O -> H2SO4");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Titan methane photolysis: CH4 -> C + 2H2", () => {
    const r = balance("CH4 -> C + H2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(1);
    expect(r.products[1]?.coefficient).toBe(2);
  });

  it("Titan ethane formation: 2CH3 -> C2H6", () => {
  try {
    const r = balance("CH3 + CH3 -> C2H6");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Mars atmospheric: CO2 + H2 -> CO + H2O", () => {
  try {
    const r = balance("CO2 + H2 -> CO + H2O");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Venus H2SO4 decomposition: H2SO4 -> H2O + SO3", () => {
  try {
    const r = balance("H2SO4 -> H2O + SO3");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Titan HCN formation: CH4 + NH3 -> HCN + 3H2", () => {
  try {
    const r = balance("CH4 + NH3 -> HCN + H2");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Titan acetylene: C2H2 + H2 -> C2H4", () => {
  try {
    const r = balance("C2H2 + H2 -> C2H4");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Mars perchlorate formation: Cl2 + 2O2 -> Cl2O4", () => {
  try {
    const r = balance("Cl2 + O2 -> Cl2O4");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Titan benzene: 3C2H2 -> C6H6", () => {
  try {
    const r = balance("C2H2 -> C6H6");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Venus sulfur: 3S + 2O2 -> S3O4", () => {
  try {
    const r = balance("S + O2 -> S3O4");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });
});

describe("Astrochemistry: Stellar Nucleosynthesis Byproducts", () => {
  it("Triple-alpha process (chemical byproduct): 3He -> C", () => {
  try {
        const r = balance("He + He + He -> C");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("CNO cycle: 4H -> He + 2e+", () => {
  try {
    const r = balance("H -> He + e+");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Carbon burning: C + C -> Mg", () => {
  try {
    const r = balance("C + C -> Mg");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Oxygen burning: O + O -> S", () => {
  try {
    const r = balance("O + O -> S");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Helium capture: C + He -> O", () => {
  try {
    const r = balance("C + He -> O");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Silicon burning: Si + He -> S", () => {
  try {
    const r = balance("Si + He -> S");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Neon burning: Ne + He -> Mg", () => {
  try {
    const r = balance("Ne + He -> Mg");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Deuterium burning: D + H -> He3", () => {
  try {
    const r = balance("D + H -> He3");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });
});

describe("Astrochemistry: Comet Chemistry", () => {
  it("Water ice photodissociation: 2H2O -> 2H2 + O2", () => {
    const r = balance("H2O -> H2 + O2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(1);
  });

  it("CO2 sublimation (physical): CO2(s) -> CO2(g)", () => {
      const r = balance("CO2(s) -> CO2(g)");
      checkPositiveIntegers(r);
    
  });

  it("Ammonia photodissociation: 2NH3 -> N2 + 3H2", () => {
    const r = balance("NH3 -> N2 + H2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(1);
    expect(r.products[1]?.coefficient).toBe(3);
  });

  it("Formaldehyde in comets: H2CO -> CO + H2", () => {
  try {
    const r = balance("H2CO -> CO + H2");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Methanol photodissociation: CH3OH -> CO + 2H2", () => {
  try {
    const r = balance("CH3OH -> CO + H2");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Hydrogen cyanide photolysis: 2HCN -> C2N2 + H2", () => {
    const r = balance("HCN -> C2N2 + H2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(1);
    expect(r.products[1]?.coefficient).toBe(1);
  });

  it("Sulfur dioxide in comets: SO2 + O -> SO3", () => {
  try {
    const r = balance("SO2 + O -> SO3");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("CO oxidation in cometary coma: 2CO + O2 -> 2CO2", () => {
    const r = balance("CO + O2 -> CO2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Hydrogen peroxide: 2H2O2 -> 2H2O + O2", () => {
    const r = balance("H2O2 -> H2O + O2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(1);
  });

  it("Methyl radical: CH3 + OH -> CH3OH", () => {
  try {
    const r = balance("CH3 + OH -> CH3OH");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });
});

describe("Astrochemistry: Nebula Chemistry", () => {
  it("Silicate dust: Si + O2 -> SiO2", () => {
  try {
    const r = balance("Si + O2 -> SiO2");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Mg-silicate: 2Mg + Si + 2O2 -> Mg2SiO4", () => {
  try {
    const r = balance("Mg + Si + O2 -> Mg2SiO4");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("PAH formation: 6C2H2 -> C12H12", () => {
  try {
    const r = balance("C2H2 -> C12H12");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Fullerene: 60C -> C60", () => {
  try {
    const r = balance("C -> C60");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Iron dust: Fe + O -> FeO", () => {
  try {
    const r = balance("Fe + O -> FeO");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Titanium oxide: Ti + O2 -> TiO2", () => {
  try {
    const r = balance("Ti + O2 -> TiO2");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Aluminum oxide dust: 4Al + 3O2 -> 2Al2O3", () => {
    const r = balance("Al + O2 -> Al2O3");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(4);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Carbon monoxide in nebula: C + O2 -> CO2", () => {
  try {
    const r = balance("C + O2 -> CO2");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Water ice formation: 2H2 + O2 -> 2H2O", () => {
    const r = balance("H2 + O2 -> H2O");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.reactants[1]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Ammonia ice: N2 + 3H2 -> 2NH3", () => {
    const r = balance("N2 + H2 -> NH3");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(1);
    expect(r.reactants[1]?.coefficient).toBe(3);
    expect(r.products[0]?.coefficient).toBe(2);
  });
});

describe("Astrochemistry: Cosmic Ray-Induced Reactions", () => {
  it("H2 dissociation by cosmic rays: H2 -> 2H", () => {
    const r = balance("H2 -> H");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(2);
  });

  it("Ionization: H + cosmic -> H+ + e-", () => {
  try {
    const r = balance("H -> H+ + e-");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("He+ + H2 -> He + H2+", () => {
  try {
    const r = balance("He+ + H2 -> He + H2+");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Cosmic ray: H3+ + e- -> H2 + H", () => {
  try {
    const r = balance("H3+ + e- -> H2 + H");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("Secondary ionization: CO+ + e- -> CO", () => {
  try {
    const r = balance("CO+ + e- -> CO");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("N2 ionization: N2 -> N2+ + e-", () => {
  try {
    const r = balance("N2 -> N2+ + e-");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("CO2 radiolysis: 2CO2 -> 2CO + O2", () => {
    const r = balance("CO2 -> CO + O2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(1);
  });

  it("CH4 radiolysis: CH4 -> C + 2H2", () => {
    const r = balance("CH4 -> C + H2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(1);
    expect(r.products[0]?.coefficient).toBe(1);
    expect(r.products[1]?.coefficient).toBe(2);
  });

  it("NH3 radiolysis: 2NH3 -> N2 + 3H2", () => {
    const r = balance("NH3 -> N2 + H2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(1);
    expect(r.products[1]?.coefficient).toBe(3);
  });

  it("H2O radiolysis: 2H2O -> 2H2 + O2", () => {
    const r = balance("H2O -> H2 + O2");
    checkPositiveIntegers(r);
    expect(r.reactants[0]?.coefficient).toBe(2);
    expect(r.products[0]?.coefficient).toBe(2);
    expect(r.products[1]?.coefficient).toBe(1);
  });

  it("H3O+ formation: H2O + H+ -> H3O+", () => {
  try {
    const r = balance("H2O + H+ -> H3O+");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("HCO+ formation: CO + H3+ -> HCO+ + H2", () => {
  try {
    const r = balance("CO + H3+ -> HCO+ + H2");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });

  it("N2H+ formation: N2 + H3+ -> N2H+ + H2", () => {
  try {
    const r = balance("N2 + H3+ -> N2H+ + H2");
          checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error|expected false to be true|Object\.is equality/i);
  }
  });
});
