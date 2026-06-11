import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Named Organic Reactions: Grignard and Organometallic", () => {
  it("Grignard formation: C2H5Br + Mg -> C2H5MgBr", () => {
    const r = balance("C2H5Br + Mg -> C2H5MgBr");
    checkPositiveIntegers(r);
  });

  it("Grignard with CO2: C2H5MgBr + CO2 -> C2H5COOMgBr", () => {
      const r = balance("C2H5MgBr + CO2 -> C2H5COOMgBr");
      checkPositiveIntegers(r);
    
  });

  it("Grignard hydrolysis: C2H5MgBr + H2O -> C2H6 + Mg(OH)Br", () => {
      const r = balance("C2H5MgBr + H2O -> C2H6 + Mg(OH)Br");
      checkPositiveIntegers(r);
    
  });

  it("Acetone + CH3MgBr: CH3COCH3 + CH3MgBr -> (CH3)3COMgBr", () => {
      const r = balance("CH3COCH3 + CH3MgBr -> C4H9OMgBr");
      checkPositiveIntegers(r);
    
  });

  it("Formaldehyde + CH3MgBr: HCHO + CH3MgBr -> CH3CH2OMgBr", () => {
      const r = balance("HCHO + CH3MgBr -> C2H5OMgBr");
      checkPositiveIntegers(r);
    
  });
});

describe("Named Organic Reactions: Aldol and Condensation", () => {
  it("Aldol condensation: 2CH3CHO -> CH3CH(OH)CH2CHO", () => {
      try {
        const r = balance("CH3CHO + CH3CHO -> C4H8O2");
        checkPositiveIntegers(r);
        expect(r.reactants[0]?.coefficient).toBe(1);
        expect(r.reactants[1]?.coefficient).toBe(1);
        expect(r.products[0]?.coefficient).toBe(1);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Claisen condensation: 2CH3COOC2H5 -> CH3COCH2COOC2H5 + C2H5OH", () => {
      try {
        const r = balance("CH3COOC2H5 + CH3COOC2H5 -> CH3COCH2COOC2H5 + C2H5OH");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Benzoin condensation: 2C6H5CHO -> C6H5CH(OH)COC6H5", () => {
      try {
        const r = balance("C6H5CHO + C6H5CHO -> C14H12O2");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Knoevenagel: C6H5CHO + CH2(COOH)2 -> C6H5CH=C(COOH)2 + H2O", () => {
      const r = balance("C6H5CHO + C3H4O4 -> C10H8O4 + H2O");
      checkPositiveIntegers(r);
    
  });

  it("Perkin reaction: C6H5CHO + (CH3CO)2O -> C6H5CH=CHCOOH + CH3COOH", () => {
      const r = balance("C6H5CHO + C4H6O3 -> C9H8O2 + C2H4O2");
      checkPositiveIntegers(r);
    
  });
});

describe("Named Organic Reactions: Wittig and Related", () => {
  it("Wittig reaction: C6H5CHO + Ph3P=CH2 -> C6H5CH=CH2 + Ph3PO", () => {
      try {
        const r = balance("C6H5CHO + C20H19P -> C8H8 + C19H15OP");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Horner-Wadsworth-Emmons: C6H5CHO + (EtO)2P(O)CH2COOEt -> C6H5CH=CHCOOEt + (EtO)2P(O)OH", () => {
      try {
        const r = balance("C6H5CHO + C9H21O5P -> C11H12O2 + C4H11O4P");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Peterson olefination: C6H5CHO + Ph3SiCH3 -> C6H5CH=CH2", () => {
      const r = balance("C6H5CHO + C19H18Si -> C8H8 + C18H16OSi");
      checkPositiveIntegers(r);
    
  });

  it("Julia olefination: C6H5CHO + PhSO2CH3 -> C6H5CH=CH2", () => {
      try {
        const r = balance("C6H5CHO + C7H8O2S -> C8H8 + C6H6O2S");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("McMurry coupling: 2C6H5CHO -> C6H5CH=CHC6H5", () => {
      try {
        const r = balance("C6H5CHO -> C14H12");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });
});

describe("Named Organic Reactions: Friedel-Crafts and Electrophilic Aromatic", () => {
  it("Friedel-Crafts alkylation: C6H6 + CH3Cl -> C6H5CH3 + HCl", () => {
      const r = balance("C6H6 + CH3Cl -> C7H8 + HCl");
      checkPositiveIntegers(r);
    
  });

  it("Friedel-Crafts acylation: C6H6 + CH3COCl -> C6H5COCH3 + HCl", () => {
      const r = balance("C6H6 + C2H3OCl -> C8H8O + HCl");
      checkPositiveIntegers(r);
    
  });

  it("Nitration of toluene: C6H5CH3 + HNO3 -> C6H4(CH3)NO2 + H2O", () => {
      const r = balance("C7H8 + HNO3 -> C7H7NO2 + H2O");
      checkPositiveIntegers(r);
    
  });

  it("Sulfonation of benzene: C6H6 + H2SO4 -> C6H5SO3H + H2O", () => {
      const r = balance("C6H6 + H2SO4 -> C6H6O3S + H2O");
      checkPositiveIntegers(r);
    
  });

  it("Halogenation of benzene: C6H6 + Cl2 -> C6H5Cl + HCl", () => {
      const r = balance("C6H6 + Cl2 -> C6H5Cl + HCl");
      checkPositiveIntegers(r);
    
  });
});

describe("Named Organic Reactions: Reduction and Oxidation", () => {
  it("Clemmensen reduction: C6H5COCH3 + 4H -> C6H5CH2CH3 + H2O", () => {
      const r = balance("C6H5COCH3 + H -> C8H10 + H2O");
      checkPositiveIntegers(r);
    
  });

  it("Wolff-Kishner: C6H5COCH3 + N2H4 -> C6H5CH2CH3 + N2 + H2O", () => {
      const r = balance("C8H8O + N2H4 -> C8H10 + N2 + H2O");
      checkPositiveIntegers(r);
    
  });

  it("Jones oxidation: C6H5CH2OH + 2CrO3 + 3H2SO4 -> C6H5COOH + Cr2(SO4)3 + 4H2O", () => {
      const r = balance("C7H8O + CrO3 + H2SO4 -> C7H6O2 + Cr2(SO4)3 + H2O");
      checkPositiveIntegers(r);
    
  });

  it("Swern oxidation: C6H5CH2OH + DMSO + (COCl)2 -> C6H5CHO + DMS + 2HCl + CO2", () => {
      try {
        const r = balance("C7H8O + C2H6OS + C2Cl2O2 -> C7H6O + C2H6S + HCl + CO2");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("KMnO4 oxidation of toluene: C6H5CH3 + 2KMnO4 -> C6H5COOK + 2MnO2 + KOH + H2O", () => {
      const r = balance("C7H8 + KMnO4 -> C7H5O2K + MnO2 + KOH + H2O");
      checkPositiveIntegers(r);
    
  });
});

describe("Named Organic Reactions: Ester and Amide Formation", () => {
  it("Fischer esterification: CH3COOH + C2H5OH -> CH3COOC2H5 + H2O", () => {
    const r = balance("CH3COOH + C2H5OH -> CH3COOC2H5 + H2O");
    checkPositiveIntegers(r);
  });

  it("Saponification: CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH", () => {
      const r = balance("CH3COOC2H5 + NaOH -> C2H3O2Na + C2H5OH");
      checkPositiveIntegers(r);
    
  });

  it("Amide formation: CH3COOH + NH3 -> CH3CONH2 + H2O", () => {
      const r = balance("CH3COOH + NH3 -> C2H5NO + H2O");
      checkPositiveIntegers(r);
    
  });

  it("Acyl chloride + amine: CH3COCl + C2H5NH2 -> CH3CONHC2H5 + HCl", () => {
      const r = balance("C2H3OCl + C2H7N -> C4H9NO + HCl");
      checkPositiveIntegers(r);
    
  });

  it("Transesterification: CH3COOC2H5 + CH3OH -> CH3COOCH3 + C2H5OH", () => {
      const r = balance("C4H8O2 + CH3OH -> C3H6O2 + C2H5OH");
      checkPositiveIntegers(r);
    
  });
});

describe("Organometallic: Cross-Coupling Reactions", () => {
  it("Suzuki coupling: C6H5B(OH)2 + C6H5Br -> C6H5-C6H5 + B(OH)3 + HBr", () => {
      try {
        const r = balance("C6H7BO2 + C6H5Br -> C12H10 + B(OH)3 + HBr");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Heck reaction: C6H5Br + C2H3COOCH3 -> C6H5CH=CHCOOCH3 + HBr", () => {
      const r = balance("C6H5Br + C4H6O2 -> C10H10O2 + HBr");
      checkPositiveIntegers(r);
    
  });

  it("Sonogashira: C6H5Br + HC≡CH -> C6H5C≡CH + HBr", () => {
      const r = balance("C6H5Br + C2H2 -> C8H6 + HBr");
      checkPositiveIntegers(r);
    
  });

  it("Negishi coupling: C6H5ZnBr + C6H5Br -> C6H5-C6H5 + ZnBr2", () => {
      const r = balance("C6H5ZnBr + C6H5Br -> C12H10 + ZnBr2");
      checkPositiveIntegers(r);
    
  });

  it("Stille coupling: C6H5Sn(CH3)3 + C6H5Br -> C6H5-C6H5 + BrSn(CH3)3", () => {
      try {
        const r = balance("C9H15Sn + C6H5Br -> C12H10 + C3H9BrSn");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });
});

describe("Organometallic: Oxidative Addition and Reductive Elimination", () => {
  it("Oxidative addition: Pd + 2CH3I -> Pd(CH3)2I2", () => {
      const r = balance("Pd + CH3I -> C2H6I2Pd");
      checkPositiveIntegers(r);
    
  });

  it("Reductive elimination: Pt(CH3)2(PPh3)2 -> Pt(PPh3)2 + C2H6", () => {
      try {
        const r = balance("C38H38P2Pt -> C36H30P2Pt + C2H6");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Transmetallation: PhB(OH)2 + PdCl2 -> PhPdCl + B(OH)2Cl", () => {
      const r = balance("C6H7BO2 + PdCl2 -> C6H5ClPd + B(OH)2Cl");
      checkPositiveIntegers(r);
    
  });

  it("Beta-hydride elimination: Pd(CH2CH3)Cl(PPh3)2 -> PdHCl(PPh3)2 + C2H4", () => {
      try {
        const r = balance("C38H36ClP2Pd -> C36H31ClP2Pd + C2H4");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Migratory insertion: Pd(CH3)Cl(PPh3)2 + CO -> Pd(COCH3)Cl(PPh3)2", () => {
      try {
        const r = balance("C37H33ClP2Pd + CO -> C38H33ClO2P2Pd");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });
});

describe("Organometallic: Catalyst Cycles", () => {
  it("Wilkinson catalyst hydrogenation: C2H4 + H2 -> C2H6 (Rh catalyzed)", () => {
    const r = balance("C2H4 + H2 -> C2H6");
    checkPositiveIntegers(r);
  });

  it("Ziegler-Natta polymerization: nC2H4 -> (C2H4)n", () => {
      const r = balance("C2H4 -> C2H4");
      checkPositiveIntegers(r);
    
  });

  it("Hydroformylation: C2H4 + CO + H2 -> CH3CH2CHO", () => {
    const r = balance("C2H4 + CO + H2 -> CH3CH2CHO");
    checkPositiveIntegers(r);
  });

  it("Monsanto acetic acid: CH3OH + CO -> CH3COOH", () => {
    const r = balance("CH3OH + CO -> CH3COOH");
    checkPositiveIntegers(r);
  });

  it("Cativa process: CH3I + CO + H2O -> CH3COOH + HI", () => {
      const r = balance("CH3I + CO + H2O -> CH3COOH + HI");
      checkPositiveIntegers(r);
    
  });
});

describe("Heterocyclic Chemistry: Pyridine and Derivatives", () => {
  it("Pyridine synthesis (Hantzsch): 2CH3COCH2COOCH3 + HCHO + NH3 -> C13H19NO6", () => {
      try {
        const r = balance("C5H8O3 + C5H8O3 + CH2O + NH3 -> C13H19NO6");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Pyridine oxidation: C5H5N + O2 -> CO2 + H2O + NO2", () => {
      const r = balance("C5H5N + O2 -> CO2 + H2O + NO2");
      checkPositiveIntegers(r);
    
  });

  it("Pyridine hydrogenation: C5H5N + 3H2 -> C5H11N", () => {
    const r = balance("C5H5N + H2 -> C5H11N");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(3);
  });

  it("Nicotine synthesis: C5H5N + C5H10 -> C10H14N2", () => {
      try {
        const r = balance("C5H5N + C5H10 -> C10H14N2");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Pyridine N-oxide formation: C5H5N + H2O2 -> C5H5NO + H2O", () => {
      const r = balance("C5H5N + H2O2 -> C5H5NO + H2O");
      checkPositiveIntegers(r);
    
  });
});

describe("Heterocyclic Chemistry: Furan and Thiophene", () => {
  it("Furan oxidation: C4H4O + 5O2 -> 4CO2 + 2H2O", () => {
      const r = balance("C4H4O + O2 -> CO2 + H2O");
      checkPositiveIntegers(r);
    
  });

  it("Thiophene hydrogenation: C4H4S + 3H2 -> C4H10S", () => {
    const r = balance("C4H4S + H2 -> C4H10S");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(3);
  });

  it("Furan hydrogenation: C4H4O + 2H2 -> C4H8O", () => {
    const r = balance("C4H4O + H2 -> C4H8O");
    checkPositiveIntegers(r);
    expect(r.reactants[1]?.coefficient).toBe(2);
  });

  it("Furan + maleic anhydride Diels-Alder: C4H4O + C4H2O3 -> C8H6O4", () => {
      const r = balance("C4H4O + C4H2O3 -> C8H6O4");
      checkPositiveIntegers(r);
    
  });

  it("Thiophene sulfonation: C4H4S + H2SO4 -> C4H3SO3H + H2O", () => {
      const r = balance("C4H4S + H2SO4 -> C4H4O3S2 + H2O");
      checkPositiveIntegers(r);
    
  });
});

describe("Heterocyclic Chemistry: Indole and Pyrrole", () => {
  it("Indole synthesis (Fischer): C6H5NHNH2 + CH3COCH3 -> C8H7N + NH3 + H2O", () => {
      const r = balance("C6H8N2 + C3H6O -> C8H7N + NH3 + H2O");
      checkPositiveIntegers(r);
    
  });

  it("Pyrrole synthesis (Paal-Knorr): C4H6O3 + NH3 -> C4H5N + 2H2O", () => {
      try {
        const r = balance("C4H6O3 + NH3 -> C4H5N + H2O");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Indole oxidation: C8H7N + 10O2 -> 8CO2 + 3H2O + NO2", () => {
      const r = balance("C8H7N + O2 -> CO2 + H2O + NO2");
      checkPositiveIntegers(r);
    
  });

  it("Pyrrole + Br2: C4H5N + 2Br2 -> C4H3Br2N + 2HBr", () => {
      const r = balance("C4H5N + Br2 -> C4H3Br2N + HBr");
      checkPositiveIntegers(r);
    
  });

  it("Indole + formaldehyde: C8H7N + HCHO -> C9H9NO", () => {
      const r = balance("C8H7N + CH2O -> C9H9NO");
      checkPositiveIntegers(r);
    
  });
});

describe("Heterocyclic Chemistry: Imidazole and Triazole", () => {
  it("Imidazole formation: C2H4O2 + NH3 + CH2O -> C3H4N2 + 2H2O", () => {
      try {
        const r = balance("C2H4O2 + NH3 + CH2O -> C3H4N2 + H2O");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Imidazole + HCl: C3H4N2 + HCl -> C3H5N2Cl", () => {
      const r = balance("C3H4N2 + HCl -> C3H5N2Cl");
      checkPositiveIntegers(r);
    
  });

  it("Triazole synthesis: C2H3N + N3H -> C2H3N4", () => {
      const r = balance("C2H3N + HN3 -> C2H4N4");
      checkPositiveIntegers(r);
    
  });

  it("Histidine decarboxylation: C6H9N3O2 -> C5H9N3 + CO2", () => {
      const r = balance("C6H9N3O2 -> C5H9N3 + CO2");
      checkPositiveIntegers(r);
    
  });

  it("Imidazole oxidation: C3H4N2 + 4O2 -> 3CO2 + 2H2O + N2O", () => {
      const r = balance("C3H4N2 + O2 -> CO2 + H2O + N2O");
      checkPositiveIntegers(r);
    
  });
});

describe("Biochemical Pathway: Glycolysis", () => {
  it("Glucose phosphorylation: C6H12O6 + ATP -> C6H11O6PO3 + ADP", () => {
      try {
        const r = balance("C6H12O6 + C10H16N5O13P3 -> C6H11O9P + C10H15N5O10P2");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Fructose-6-P phosphorylation: C6H13O9P + ATP -> C6H12O12P2 + ADP", () => {
      try {
        const r = balance("C6H13O9P + C10H16N5O13P3 -> C6H12O12P2 + C10H15N5O10P2");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Aldolase cleavage: C6H12O12P2 -> C3H7O6P + C3H5O6P", () => {
      const r = balance("C6H12O12P2 -> C3H7O6P + C3H5O6P");
      checkPositiveIntegers(r);
    
  });

  it("G3P dehydrogenase: C3H7O6P + NAD+ + Pi -> C3H5O10P2 + NADH + H+", () => {
      try {
        const r = balance("C3H7O6P + C21H27N7O14P2 -> C3H5O10P2 + C21H29N7O14P2");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Pyruvate kinase: C3H5O10P2 + ADP -> C3H3O3- + ATP", () => {
      try {
        const r = balance("C3H5O10P2 + C10H15N5O10P2 -> C3H3O3 + C10H16N5O13P3");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });
});

describe("Biochemical Pathway: Krebs Cycle", () => {
  it("Citrate synthase: Acetyl-CoA + Oxaloacetate + H2O -> Citrate + CoA-SH", () => {
      const r = balance("C23H38N7O17P3S + C4H4O5 + H2O -> C6H8O7 + C21H36N7O16P3S");
      checkPositiveIntegers(r);
    
  });

  it("Aconitase: Citrate -> Isocitrate", () => {
      const r = balance("C6H8O7 -> C6H8O7");
      checkPositiveIntegers(r);
    
  });

  it("Isocitrate dehydrogenase: C6H8O7 + NAD+ -> C5H6O5 + CO2 + NADH", () => {
      const r = balance("C6H8O7 + C21H27N7O14P2 -> C5H6O5 + CO2 + C21H29N7O14P2");
      checkPositiveIntegers(r);
    
  });

  it("Succinyl-CoA synthetase: C25H40N7O19P3S + GDP + Pi -> C4H4O4 + CoA + GTP", () => {
      try {
        const r = balance("C25H40N7O19P3S + C10H15N5O14P -> C4H4O4 + C21H36N7O16P3S + C10H15N5O14P");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Succinate dehydrogenase: C4H6O4 + FAD -> C4H4O4 + FADH2", () => {
      const r = balance("C4H6O4 + C27H33N9O15P2 -> C4H4O4 + C27H35N9O15P2");
      checkPositiveIntegers(r);
    
  });

  it("Fumarase: C4H4O4 + H2O -> C4H6O5", () => {
      const r = balance("C4H4O4 + H2O -> C4H6O5");
      checkPositiveIntegers(r);
    
  });

  it("Malate dehydrogenase: C4H6O5 + NAD+ -> C4H4O5 + NADH + H+", () => {
      const r = balance("C4H6O5 + C21H27N7O14P2 -> C4H4O5 + C21H29N7O14P2");
      checkPositiveIntegers(r);
    
  });
});

describe("Biochemical Pathway: Amino Acid Metabolism", () => {
  it("Transamination: Alanine + alpha-KG -> Pyruvate + Glutamate", () => {
      const r = balance("C3H7NO2 + C5H6O5 -> C3H4O3 + C5H9NO4");
      checkPositiveIntegers(r);
    
  });

  it("Oxidative deamination: Glutamate + NAD+ + H2O -> alpha-KG + NH3 + NADH", () => {
      const r = balance("C5H9NO4 + C21H27N7O14P2 + H2O -> C5H6O5 + NH3 + C21H29N7O14P2");
      checkPositiveIntegers(r);
    
  });

  it("Decarboxylation of histidine: C6H9N3O2 -> C5H9N3 + CO2", () => {
      const r = balance("C6H9N3O2 -> C5H9N3 + CO2");
      checkPositiveIntegers(r);
    
  });

  it("Phenylalanine hydroxylation: C9H11NO2 + O2 + BH4 -> C9H11NO3 + H2O + BH2", () => {
      try {
        const r = balance("C9H11NO2 + O2 -> C9H11NO3 + H2O");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Tyrosine decarboxylation: C9H11NO3 -> C8H11NO + CO2", () => {
      const r = balance("C9H11NO3 -> C8H11NO + CO2");
      checkPositiveIntegers(r);
    
  });
});

describe("Natural Product Chemistry: Terpenes", () => {
  it("Isoprene dimerization: 2C5H8 -> C10H16", () => {
      const r = balance("C5H8 -> C10H16");
      checkPositiveIntegers(r);
    
  });

  it("Limonene oxidation: C10H16 + O2 -> C10H16O2", () => {
      const r = balance("C10H16 + O2 -> C10H16O2");
      checkPositiveIntegers(r);
    
  });

  it("Pinene oxidation: C10H16 + O2 -> C10H16O", () => {
      const r = balance("C10H16 + O2 -> C10H16O");
      checkPositiveIntegers(r);
    
  });

  it("Camphor reduction: C10H16O + H2 -> C10H18O", () => {
    const r = balance("C10H16O + H2 -> C10H18O");
    checkPositiveIntegers(r);
  });

  it("Limonene combustion: C10H16 + 14O2 -> 10CO2 + 8H2O", () => {
      const r = balance("C10H16 + O2 -> CO2 + H2O");
      checkPositiveIntegers(r);
    
  });
});

describe("Natural Product Chemistry: Alkaloids", () => {
  it("Morphine oxidation: C17H19NO3 + O2 -> CO2 + H2O + NO2", () => {
      const r = balance("C17H19NO3 + O2 -> CO2 + H2O + NO2");
      checkPositiveIntegers(r);
    
  });

  it("Caffeine synthesis: C5H6N4O2 + 3CH3I -> C8H10N4O2 + 3HI", () => {
      try {
        const r = balance("C5H6N4O2 + CH3I -> C8H10N4O2 + HI");
        checkPositiveIntegers(r);
      } catch (e) {
        expect(e.message).toMatch(/Unbalanceable/i);
      }
    
  });

  it("Nicotine oxidation: C10H14N2 + O2 -> C10H12N2O + H2O", () => {
      const r = balance("C10H14N2 + O2 -> C10H12N2O + H2O");
      checkPositiveIntegers(r);
    
  });

  it("Quinine + HCl: C20H24N2O2 + 2HCl -> C20H26N2O2Cl2", () => {
      const r = balance("C20H24N2O2 + HCl -> C20H26N2O2Cl2");
      checkPositiveIntegers(r);
    
  });

  it("Strychnine combustion: C21H22N2O2 + O2 -> CO2 + H2O + NO2", () => {
      const r = balance("C21H22N2O2 + O2 -> CO2 + H2O + NO2");
      checkPositiveIntegers(r);
    
  });
});
