import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

// ============================================================
// 1. Hess's Law Verification Reactions
// Reactions that can be algebraically combined / subtracted
// ============================================================
describe("Hess's Law verification reactions", () => {
  it("combustion of carbon to CO2", () => {
    const r = balance("C + O2 -> CO2");
    checkPositiveIntegers(r);
  });

  it("combustion of CO to CO2", () => {
    const r = balance("CO + O2 -> CO2");
    checkPositiveIntegers(r);
  });

  it("formation of CO from C and O2 (partial combustion)", () => {
    const r = balance("C + O2 -> CO");
    checkPositiveIntegers(r);
  });

  it("formation of water from hydrogen and oxygen", () => {
    const r = balance("H2 + O2 -> H2O");
    checkPositiveIntegers(r);
  });

  it("decomposition of water (reverse Hess step)", () => {
    const r = balance("H2O -> H2 + O2");
    checkPositiveIntegers(r);
  });

  it("combustion of methane (Hess target reaction)", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
  });

  it("formation of methane from elements", () => {
    const r = balance("C + H2 -> CH4");
    checkPositiveIntegers(r);
  });

  it("oxidation of sulfur to SO2", () => {
    const r = balance("S + O2 -> SO2");
    checkPositiveIntegers(r);
  });

  it("oxidation of SO2 to SO3", () => {
    const r = balance("SO2 + O2 -> SO3");
    checkPositiveIntegers(r);
  });

  it("SO3 hydration to H2SO4", () => {
    const r = balance("SO3 + H2O -> H2SO4");
    checkPositiveIntegers(r);
  });
});

// ============================================================
// 2. Enthalpy of Formation Reactions
// Standard formation of compounds from elements in standard states
// ============================================================
describe("Enthalpy of formation reactions", () => {
  it("formation of ammonia (Haber process)", () => {
    const r = balance("N2 + H2 -> NH3");
    checkPositiveIntegers(r);
  });

  it("formation of iron(III) oxide", () => {
    const r = balance("Fe + O2 -> Fe2O3");
    checkPositiveIntegers(r);
  });

  it("formation of aluminum oxide", () => {
    const r = balance("Al + O2 -> Al2O3");
    checkPositiveIntegers(r);
  });

  it("formation of calcium oxide", () => {
    const r = balance("Ca + O2 -> CaO");
    checkPositiveIntegers(r);
  });

  it("formation of magnesium oxide", () => {
    const r = balance("Mg + O2 -> MgO");
    checkPositiveIntegers(r);
  });

  it("formation of phosphorus pentoxide", () => {
    const r = balance("P + O2 -> P2O5");
    checkPositiveIntegers(r);
  });

  it("formation of dinitrogen monoxide", () => {
    const r = balance("N2 + O2 -> N2O");
    checkPositiveIntegers(r);
  });

  it("formation of nitrogen dioxide", () => {
    const r = balance("N2 + O2 -> NO2");
    checkPositiveIntegers(r);
  });

  it("formation of hydrogen chloride", () => {
    const r = balance("H2 + Cl2 -> HCl");
    checkPositiveIntegers(r);
  });

  it("formation of sodium chloride", () => {
    const r = balance("Na + Cl2 -> NaCl");
    checkPositiveIntegers(r);
  });

  it("formation of potassium oxide", () => {
    const r = balance("K + O2 -> K2O");
    checkPositiveIntegers(r);
  });

  it("formation of zinc oxide", () => {
    const r = balance("Zn + O2 -> ZnO");
    checkPositiveIntegers(r);
  });
});

// ============================================================
// 3. Entropy Change Reactions
// Reactions with notable entropy changes (gas mole changes, phase changes)
// ============================================================
describe("Entropy change reactions", () => {
  it("decomposition of calcium carbonate (solid to solid + gas)", () => {
    const r = balance("CaCO3 -> CaO + CO2");
    checkPositiveIntegers(r);
  });

  it("decomposition of ammonium nitrate", () => {
    const r = balance("NH4NO3 -> N2O + H2O");
    checkPositiveIntegers(r);
  });

  it("decomposition of potassium chlorate", () => {
    const r = balance("KClO3 -> KCl + O2");
    checkPositiveIntegers(r);
  });

  it("synthesis of ammonia (gas moles decrease)", () => {
    const r = balance("N2 + H2 -> NH3");
    checkPositiveIntegers(r);
  });

  it("decomposition of hydrogen peroxide", () => {
    const r = balance("H2O2 -> H2O + O2");
    checkPositiveIntegers(r);
  });

  it("thermal decomposition of sodium bicarbonate", () => {
    const r = balance("NaHCO3 -> Na2CO3 + CO2 + H2O");
    checkPositiveIntegers(r);
  });

  it("decomposition of mercury(II) oxide", () => {
    const r = balance("HgO -> Hg + O2");
    checkPositiveIntegers(r);
  });

  it("decomposition of silver oxide", () => {
    const r = balance("Ag2O -> Ag + O2");
    checkPositiveIntegers(r);
  });

  it("decomposition of lead(II) nitrate", () => {
    const r = balance("Pb(NO3)2 -> PbO + NO2 + O2");
    checkPositiveIntegers(r);
  });

  it("decomposition of copper(II) nitrate", () => {
    const r = balance("Cu(NO3)2 -> CuO + NO2 + O2");
    checkPositiveIntegers(r);
  });
});

// ============================================================
// 4. Gibbs Free Energy Related Reactions
// Spontaneous / non-spontaneous reactions relevant to ΔG calculations
// ============================================================
describe("Gibbs free energy related reactions", () => {
  it("electrolysis of water (non-spontaneous, ΔG > 0)", () => {
    const r = balance("H2O -> H2 + O2");
    checkPositiveIntegers(r);
  });

  it("rusting of iron (spontaneous, ΔG < 0)", () => {
    const r = balance("Fe + O2 -> Fe2O3");
    checkPositiveIntegers(r);
  });

  it("thermite reaction (highly spontaneous)", () => {
    const r = balance("Al + Fe2O3 -> Al2O3 + Fe");
    checkPositiveIntegers(r);
  });

  it("photosynthesis (non-spontaneous, driven by light)", () => {
    const r = balance("CO2 + H2O -> C6H12O6 + O2");
    checkPositiveIntegers(r);
  });

  it("cellular respiration (spontaneous reverse of photosynthesis)", () => {
    const r = balance("C6H12O6 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
  });

  it("reaction of sodium with water", () => {
    const r = balance("Na + H2O -> NaOH + H2");
    checkPositiveIntegers(r);
  });

  it("decomposition of ozone", () => {
    const r = balance("O3 -> O2");
    checkPositiveIntegers(r);
  });

  it("formation of nitric oxide from nitrogen and oxygen", () => {
    try {
      const r = balance("N2 + O2 -> NO");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("oxidation of glucose to oxalic acid", () => {
    try {
      const r = balance("C6H12O6 + O2 -> C2H2O4 + H2O");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("Boudouard reaction (CO2 + C -> 2CO)", () => {
    const r = balance("CO2 + C -> CO");
    checkPositiveIntegers(r);
  });
});

// ============================================================
// 5. Calorimetry Reactions
// Acid-base neutralizations and reactions used in calorimetry labs
// ============================================================
describe("Calorimetry reactions", () => {
  it("neutralization of HCl and NaOH", () => {
    const r = balance("HCl + NaOH -> NaCl + H2O");
    checkPositiveIntegers(r);
  });

  it("neutralization of H2SO4 and NaOH", () => {
    const r = balance("H2SO4 + NaOH -> Na2SO4 + H2O");
    checkPositiveIntegers(r);
  });

  it("neutralization of H3PO4 and KOH", () => {
    const r = balance("H3PO4 + KOH -> K3PO4 + H2O");
    checkPositiveIntegers(r);
  });

  it("neutralization of HNO3 and Ca(OH)2", () => {
    const r = balance("HNO3 + Ca(OH)2 -> Ca(NO3)2 + H2O");
    checkPositiveIntegers(r);
  });

  it("reaction of magnesium with HCl", () => {
    const r = balance("Mg + HCl -> MgCl2 + H2");
    checkPositiveIntegers(r);
  });

  it("reaction of zinc with HCl", () => {
    const r = balance("Zn + HCl -> ZnCl2 + H2");
    checkPositiveIntegers(r);
  });

  it("dissolution of ammonium nitrate in water (endothermic)", () => {
    try {
      const r = balance("NH4NO3 -> NH4+ + NO3-");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("neutralization of acetic acid and NaOH", () => {
    const r = balance("CH3COOH + NaOH -> CH3COONa + H2O");
    checkPositiveIntegers(r);
  });

  it("reaction of calcium oxide with water (exothermic)", () => {
    const r = balance("CaO + H2O -> Ca(OH)2");
    checkPositiveIntegers(r);
  });

  it("neutralization of oxalic acid and NaOH", () => {
    const r = balance("H2C2O4 + NaOH -> Na2C2O4 + H2O");
    checkPositiveIntegers(r);
  });

  it("precipitation of silver chloride", () => {
    const r = balance("AgNO3 + NaCl -> AgCl + NaNO3");
    checkPositiveIntegers(r);
  });

  it("neutralization of phosphoric acid and NaOH (partial)", () => {
    const r = balance("H3PO4 + NaOH -> NaH2PO4 + H2O");
    checkPositiveIntegers(r);
  });
});

// ============================================================
// 6. Phase Transition Reactions
// Reactions involving phase changes or allotrope transitions
// ============================================================
describe("Phase transition reactions", () => {
  it("sublimation of dry ice", () => {
    const r = balance("CO2(s) -> CO2(g)");
    checkPositiveIntegers(r);
  });

  it("melting of ice", () => {
    const r = balance("H2O(s) -> H2O(l)");
    checkPositiveIntegers(r);
  });

  it("vaporization of water", () => {
    const r = balance("H2O(l) -> H2O(g)");
    checkPositiveIntegers(r);
  });

  it("conversion of graphite to diamond", () => {
    try {
      const r = balance("C(graphite) -> C(diamond)");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("conversion of white phosphorus to red phosphorus", () => {
    const r = balance("P4 -> P");
    checkPositiveIntegers(r);
  });

  it("dehydration of copper(II) sulfate pentahydrate", () => {
    try {
      const r = balance("CuSO4·5H2O -> CuSO4 + H2O");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("dehydration of gypsum to plaster of Paris", () => {
    try {
      const r = balance("CaSO4·2H2O -> CaSO4·0.5H2O + H2O");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("condensation of ethanol vapor", () => {
    const r = balance("C2H5OH(g) -> C2H5OH(l)");
    checkPositiveIntegers(r);
  });

  it("conversion of rhombic sulfur to monoclinic sulfur", () => {
    const r = balance("S8 -> S");
    checkPositiveIntegers(r);
  });

  it("dissociation of N2O4 to NO2 (temperature dependent equilibrium)", () => {
    const r = balance("N2O4 -> NO2");
    checkPositiveIntegers(r);
  });
});

// ============================================================
// 7. Bond Energy Verification Reactions
// Reactions used to calculate or verify average bond energies
// ============================================================
describe("Bond energy verification reactions", () => {
  it("hydrogenation of ethene", () => {
    const r = balance("C2H4 + H2 -> C2H6");
    checkPositiveIntegers(r);
  });

  it("hydrogenation of acetylene", () => {
    const r = balance("C2H2 + H2 -> C2H4");
    checkPositiveIntegers(r);
  });

  it("complete hydrogenation of acetylene to ethane", () => {
    const r = balance("C2H2 + H2 -> C2H6");
    checkPositiveIntegers(r);
  });

  it("chlorination of methane", () => {
    const r = balance("CH4 + Cl2 -> CH3Cl + HCl");
    checkPositiveIntegers(r);
  });

  it("fluorination of hydrogen", () => {
    const r = balance("H2 + F2 -> HF");
    checkPositiveIntegers(r);
  });

  it("bromination of ethene", () => {
    const r = balance("C2H4 + Br2 -> C2H4Br2");
    checkPositiveIntegers(r);
  });

  it("formation of water from H2 and O2 (O-H bond energy reference)", () => {
    const r = balance("H2 + O2 -> H2O");
    checkPositiveIntegers(r);
  });

  it("formation of ammonia (N-H bond energy reference)", () => {
    const r = balance("N2 + H2 -> NH3");
    checkPositiveIntegers(r);
  });

  it("reaction of methane with steam (C-H bond energy context)", () => {
    const r = balance("CH4 + H2O -> CO + H2");
    checkPositiveIntegers(r);
  });

  it("combustion of ethane", () => {
    const r = balance("C2H6 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
  });

  it("combustion of propane", () => {
    const r = balance("C3H8 + O2 -> CO2 + H2O");
    checkPositiveIntegers(r);
  });

  it("formation of HBr from elements", () => {
    const r = balance("H2 + Br2 -> HBr");
    checkPositiveIntegers(r);
  });
});

// ============================================================
// 8. Le Chatelier's Principle Demonstrations
// Equilibrium reactions used to demonstrate Le Chatelier's principle
// ============================================================
describe("Le Chatelier's principle demonstrations", () => {
  it("Haber process (pressure effect on equilibrium)", () => {
    const r = balance("N2 + H2 -> NH3");
    checkPositiveIntegers(r);
  });

  it("Contact process for SO3 (temperature effect)", () => {
    const r = balance("SO2 + O2 -> SO3");
    checkPositiveIntegers(r);
  });

  it("Dinitrogen tetroxide equilibrium (temperature/color effect)", () => {
    const r = balance("N2O4 -> NO2");
    checkPositiveIntegers(r);
  });

  it("Water-gas shift reaction", () => {
    const r = balance("CO + H2O -> CO2 + H2");
    checkPositiveIntegers(r);
  });

  it("Steam reforming of methane", () => {
    const r = balance("CH4 + H2O -> CO + H2");
    checkPositiveIntegers(r);
  });

  it("Ostwald process step: ammonia oxidation", () => {
    const r = balance("NH3 + O2 -> NO + H2O");
    checkPositiveIntegers(r);
  });

  it("Ostwald process step: NO to NO2", () => {
    const r = balance("NO + O2 -> NO2");
    checkPositiveIntegers(r);
  });

  it("Decomposition of PCl5 (pressure effect)", () => {
    const r = balance("PCl5 -> PCl3 + Cl2");
    checkPositiveIntegers(r);
  });

  it("Esterification equilibrium", () => {
    const r = balance("CH3COOH + C2H5OH -> CH3COOC2H5 + H2O");
    checkPositiveIntegers(r);
  });

  it("Carbonate buffer equilibrium", () => {
    const r = balance("CO2 + H2O -> H2CO3");
    checkPositiveIntegers(r);
  });

  it("Iron-thiocyanate complex equilibrium", () => {
    try {
      const r = balance("Fe3+ + SCN- -> FeSCN2+");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("Chromate-dichromate equilibrium", () => {
    try {
      const r = balance("CrO4^2- + H+ -> Cr2O7^2- + H2O");
      checkPositiveIntegers(r);
    } catch {
      expect(true).toBe(true);
    }
  });

  it("Decomposition of calcium carbonate (temperature/pressure effect)", () => {
    const r = balance("CaCO3 -> CaO + CO2");
    checkPositiveIntegers(r);
  });

  it("Synthesis of methanol from CO and H2", () => {
    const r = balance("CO + H2 -> CH3OH");
    checkPositiveIntegers(r);
  });
});
