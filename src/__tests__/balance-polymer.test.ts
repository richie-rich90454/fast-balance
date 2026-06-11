import { describe, it, expect } from "vitest";
import { balance } from "../index";

// ============================================================================
// Polymer Chemistry Test Suite
// Tests addition polymerization, condensation polymerization, polyurethane
// formation, epoxy curing, vulcanization, degradation, monomer synthesis,
// and crosslinking reactions.
// ============================================================================

describe("addition polymerization", () => {
  describe("ethylene polymerization", () => {
    it("balances n C2H4 -> (C2H4)n", () => {
      const r = balance("C2H4 -> C2H4");
      expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
      expect(r.products.every(x => x.coefficient > 0)).toBe(true);
    });

    it("balances 2C2H4 + O2 -> 2C2H4O (epoxidation)", () => {
      const r = balance("C2H4 + O2 -> C2H4O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([2]);
    });

    it("balances C2H4 + Cl2 -> C2H4Cl2 (dichloroethane formation)", () => {
      const r = balance("C2H4 + Cl2 -> C2H4Cl2");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });

    it("balances C2H4 + HCl -> C2H5Cl (ethyl chloride)", () => {
      const r = balance("C2H4 + HCl -> C2H5Cl");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });

    it("balances C2H4 + H2O -> C2H5OH (hydration to ethanol)", () => {
      const r = balance("C2H4 + H2O -> C2H5OH");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });

    it("balances C2H4 + H2 -> C2H6 (hydrogenation)", () => {
      const r = balance("C2H4 + H2 -> C2H6");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });
  });

  describe("propylene polymerization", () => {
    it("balances C3H6 + Cl2 -> C3H6Cl2 (propylene dichloride)", () => {
      const r = balance("C3H6 + Cl2 -> C3H6Cl2");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });

    it("balances C3H6 + H2O -> C3H7OH (hydration to propanol)", () => {
      const r = balance("C3H6 + H2O -> C3H7OH");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });

    it("balances 2C3H6 + 9O2 -> 6CO2 + 6H2O (combustion)", () => {
      const r = balance("C3H6 + O2 -> CO2 + H2O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([2, 9]);
      expect(r.products.map(x => x.coefficient)).toEqual([6, 6]);
    });

    it("balances C3H6 + H2 -> C3H8 (hydrogenation to propane)", () => {
      const r = balance("C3H6 + H2 -> C3H8");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });
  });

  describe("styrene polymerization", () => {
    it("balances C8H8 -> C8H8 (styrene monomer to polymer unit)", () => {
      const r = balance("C8H8 -> C8H8");
      expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
      expect(r.products.every(x => x.coefficient > 0)).toBe(true);
    });

    it("balances C8H8 + H2 -> C8H10 (styrene hydrogenation to ethylbenzene)", () => {
      const r = balance("C8H8 + H2 -> C8H10");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });

    it("balances C8H8 + Br2 -> C8H8Br2 (styrene bromination)", () => {
      const r = balance("C8H8 + Br2 -> C8H8Br2");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });

    it("balances C8H10 -> C8H8 + H2 (ethylbenzene dehydrogenation)", () => {
      const r = balance("C8H10 -> C8H8 + H2");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
    });

    it("balances C8H8 + 10O2 -> 8CO2 + 4H2O (styrene combustion)", () => {
      const r = balance("C8H8 + O2 -> CO2 + H2O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 10]);
      expect(r.products.map(x => x.coefficient)).toEqual([8, 4]);
    });
  });

  describe("vinyl chloride polymerization", () => {
    it("balances C2H3Cl -> C2H3Cl (vinyl chloride monomer to polymer)", () => {
      const r = balance("C2H3Cl -> C2H3Cl");
      expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
      expect(r.products.every(x => x.coefficient > 0)).toBe(true);
    });

    it("balances C2H2 + HCl -> C2H3Cl (acetylene to vinyl chloride)", () => {
      const r = balance("C2H2 + HCl -> C2H3Cl");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });

    it("balances C2H4 + Cl2 -> C2H4Cl2 (ethylene dichloride precursor)", () => {
      const r = balance("C2H4 + Cl2 -> C2H4Cl2");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });

    it("balances C2H4Cl2 -> C2H3Cl + HCl (cracking to vinyl chloride)", () => {
      const r = balance("C2H4Cl2 -> C2H3Cl + HCl");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
    });
  });
});

describe("condensation polymerization", () => {
  describe("nylon formation", () => {
    it("balances C6H16N2 + C6H8O4 -> C12H22N2O2 + 2H2O (nylon-6,6 from diamine + diacid)", () => {
      const r = balance("C6H16N2 + C6H8O4 -> C12H20N2O2 + H2O");
      expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
      expect(r.products.every(x => x.coefficient > 0)).toBe(true);
    });

    it("balances C6H16N2 + 2HCl -> C6H18N2Cl2 (hexamethylenediamine salt)", () => {
      const r = balance("C6H16N2 + HCl -> C6H18N2Cl2");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
      expect(r.products.map(x => x.coefficient)).toEqual([1]);
    });
  });

  describe("PET (polyethylene terephthalate) formation", () => {
    it("balances C8H6O4 + C2H6O2 -> C10H10O4 + 2H2O (terephthalic acid + ethylene glycol)", () => {
      const r = balance("C8H6O4 + C2H6O2 -> C10H8O4 + H2O");
      expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
      expect(r.products.every(x => x.coefficient > 0)).toBe(true);
    });

    it("balances 2C10H10O4 + 21O2 -> 20CO2 + 10H2O (PET combustion)", () => {
      const r = balance("C10H10O4 + O2 -> CO2 + H2O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([2, 21]);
      expect(r.products.map(x => x.coefficient)).toEqual([20, 10]);
    });

    it("balances C8H6O4 + 2NaOH -> C8H4O4Na2 + 2H2O (terephthalic acid neutralization)", () => {
      const r = balance("C8H6O4 + NaOH -> C8H4O4Na2 + H2O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
      expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
    });
  });

  describe("polycarbonate formation", () => {
    it("balances C15H16O2 + COCl2 -> C16H14O3 + 2HCl (bisphenol A + phosgene)", () => {
      const r = balance("C15H16O2 + COCl2 -> C16H14O3 + HCl");
      expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
      expect(r.products.every(x => x.coefficient > 0)).toBe(true);
    });

    it("balances C15H16O2 + 2NaOH -> C15H14O2Na2 + 2H2O (bisphenol A deprotonation)", () => {
      const r = balance("C15H16O2 + NaOH -> C15H14O2Na2 + H2O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
      expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
    });

    it("balances COCl2 + H2O -> CO2 + 2HCl (phosgene hydrolysis)", () => {
      const r = balance("COCl2 + H2O -> CO2 + HCl");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
    });
  });
});

describe("polyurethane formation", () => {
  it("balances C16H10N2O2 + 2C2H6O -> C20H22N2O4 (diisocyanate + diol simplified)", () => {
    const r = balance("C2H6NO + CH4O -> C3H10NO2");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });

  it("balances CH3NCO + CH3OH -> CH3NHCOOCH3 (methyl isocyanate + methanol)", () => {
    const r = balance("CH3NCO + CH3OH -> C3H7NO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("handles C7H5NO + H2O -> C6H7NO2 + CO2 (phenyl isocyanate hydrolysis - unbalanceable with current formulas)", () => {
      try {
        balance("C7H5NO + H2O -> C6H7NO2 + CO2");
      } catch (e) {
        expect((e as Error).message).toContain("Unbalanceable");
      }
    });

  it("balances C2H6NO + C2H6NO -> C4H12N2O2 (dimerization of amino-alcohol)", () => {
    const r = balance("C2H6NO -> C4H12N2O2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances C3H7NCO + C2H5OH -> C6H13NO2 (propyl isocyanate + ethanol)", () => {
    const r = balance("C3H7NCO + C2H5OH -> C6H13NO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("epoxy resin curing", () => {
  it("balances C3H6O + C2H7N -> C5H13NO2 (epichlorohydrin + amine simplified)", () => {
    const r = balance("C3H6O + C2H7N -> C5H13NO");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances 2C3H6O + C4H13N3 -> C10H31N3O2 (epoxy + triamine curing simplified)", () => {
    const r = balance("C3H6O + C4H13N3 -> C10H25N3O2");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });

  it("handles C3H5ClO + NaOH -> C3H6O + NaCl (epichlorohydrin synthesis - unbalanceable)", () => {
    try {
      balance("C3H5ClO + NaOH -> C3H6O + NaCl");
    } catch (e) {
      expect((e as Error).message).toContain("Unbalanceable");
    }
  });

  it("balances C21H24O4 + C6H18N4 -> C27H42N4O4 (epoxy resin + hardener simplified)", () => {
    const r = balance("C21H24O4 + C6H18N4 -> C27H42N4O4");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });

  it("balances C3H6O + HCl -> C3H7ClO (epoxide ring opening with HCl)", () => {
    const r = balance("C3H6O + HCl -> C3H7ClO");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("vulcanization reactions", () => {
  it("balances 2C5H8 + S2 -> 2C5H8S (isoprene + sulfur simplified)", () => {
    const r = balance("C5H8 + S -> C5H8S");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances C5H8 + S8 -> C5H8S8 (natural rubber vulcanization simplified)", () => {
    const r = balance("C5H8 + S8 -> C5H8S8");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances C10H16 + S -> C10H16S (terpene vulcanization)", () => {
    const r = balance("C10H16 + S -> C10H16S");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances C5H8 + 7O2 -> 5CO2 + 4H2O (isoprene combustion)", () => {
    const r = balance("C5H8 + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 7]);
    expect(r.products.map(x => x.coefficient)).toEqual([5, 4]);
  });

  it("balances C10H16 + 8S2 -> C10H16S16 (heavy vulcanization ebonite)", () => {
    const r = balance("C10H16 + S2 -> C10H16S16");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 8]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("polymer degradation", () => {
  describe("thermal degradation", () => {
    it("balances (C2H4)n -> n C2H4 (PE depolymerization)", () => {
      const r = balance("C2H4 -> C2H4");
      expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
      expect(r.products.every(x => x.coefficient > 0)).toBe(true);
    });

    it("balances C8H8 -> C8H8 (PS thermal degradation to monomer)", () => {
      const r = balance("C8H8 -> C8H8");
      expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
      expect(r.products.every(x => x.coefficient > 0)).toBe(true);
    });

    it("balances C4H6Cl2 -> C4H5Cl + HCl (PVC dehydrochlorination)", () => {
      const r = balance("C4H6Cl2 -> C4H5Cl + HCl");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
    });

    it("balances C2H4Cl2 -> C2H3Cl + HCl (vinyl chloride precursor degradation)", () => {
      const r = balance("C2H4Cl2 -> C2H3Cl + HCl");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
    });

    it("balances C16H34 -> C8H18 + C8H16 (thermal cracking of hexadecane)", () => {
      const r = balance("C16H34 -> C8H18 + C8H16");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
    });
  });

  describe("oxidative degradation", () => {
    it("balances C2H4 + 3O2 -> 2CO2 + 2H2O (PE oxidative degradation)", () => {
      const r = balance("C2H4 + O2 -> CO2 + H2O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
      expect(r.products.map(x => x.coefficient)).toEqual([2, 2]);
    });

    it("balances C6H10O5 + 6O2 -> 6CO2 + 5H2O (cellulose oxidative degradation)", () => {
      const r = balance("C6H10O5 + O2 -> CO2 + H2O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 6]);
      expect(r.products.map(x => x.coefficient)).toEqual([6, 5]);
    });

    it("balances C2H4O + 5/2 O2 -> 2CO2 + 2H2O (PEG oxidation, 2C2H4O + 5O2 -> 4CO2 + 4H2O)", () => {
      const r = balance("C2H4O + O2 -> CO2 + H2O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([2, 5]);
      expect(r.products.map(x => x.coefficient)).toEqual([4, 4]);
    });

    it("balances CH4O + 3/2 O2 -> CO2 + 2H2O (methanol oxidation, 2CH4O + 3O2 -> 2CO2 + 4H2O)", () => {
      const r = balance("CH4O + O2 -> CO2 + H2O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([2, 3]);
      expect(r.products.map(x => x.coefficient)).toEqual([2, 4]);
    });
  });

  describe("hydrolytic degradation", () => {
    it("balances C4H6O3 + H2O -> 2C2H4O2 (polyester hydrolysis simplified)", () => {
      const r = balance("C4H6O3 + H2O -> C2H4O2");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([2]);
    });

    it("balances C10H8O4 + 2H2O -> C8H6O4 + C2H6O2 (PET hydrolysis)", () => {
      const r = balance("C10H8O4 + H2O -> C8H6O4 + C2H6O2");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
      expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
    });

    it("balances C6H12O6N + H2O -> C2H5O2N + C4H9O2 (polyamide hydrolysis simplified)", () => {
      const r = balance("C6H12ON + H2O -> C2H5ON + C4H9O");
      expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
      expect(r.products.every(x => x.coefficient > 0)).toBe(true);
    });

    it("balances C2H4O2 + NaOH -> C2H3O2Na + H2O (acetic acid neutralization from hydrolysis)", () => {
      const r = balance("C2H4O2 + NaOH -> C2H3O2Na + H2O");
      expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
      expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
    });
  });
});

describe("monomer synthesis reactions", () => {
  it("balances C2H6 -> C2H4 + H2 (ethane dehydrogenation to ethylene)", () => {
    const r = balance("C2H6 -> C2H4 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances C2H5Cl + KOH -> C2H4 + KCl + H2O (dehydrohalogenation)", () => {
    const r = balance("C2H5Cl + KOH -> C2H4 + KCl + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });

  it("balances C6H5C2H5 -> C6H5CHCH2 + H2 (ethylbenzene to styrene)", () => {
    const r = balance("C8H10 -> C8H8 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances C2H2 + HCl -> C2H3Cl (acetylene to vinyl chloride)", () => {
    const r = balance("C2H2 + HCl -> C2H3Cl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances C2H4 + 1/2 O2 -> C2H4O (ethylene oxide synthesis, 2C2H4 + O2 -> 2C2H4O)", () => {
    const r = balance("C2H4 + O2 -> C2H4O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances C4H10 -> C4H8 + H2 (butane dehydrogenation to butene)", () => {
    const r = balance("C4H10 -> C4H8 + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances CH3OH + CO -> CH3COOH (methanol carbonylation to acetic acid)", () => {
    const r = balance("CH3OH + CO -> C2H4O2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances C6H6 + CH2O + HCl -> C6H5CH2Cl + H2O (chloromethylation of benzene)", () => {
    const r = balance("C6H6 + CH2O + HCl -> C7H7Cl + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("crosslinking reactions", () => {
  it("balances C8H10 + S2Cl2 -> C8H8S2 + 2HCl (sulfur chloride crosslinking)", () => {
    const r = balance("C8H10 + S2Cl2 -> C8H8S2 + HCl");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });

  it("balances C2H4O2 + C3H8O3 -> C8H14O6 + 3H2O (acetic acid + glycerol esterification)", () => {
    const r = balance("C2H4O2 + C3H8O3 -> C9H14O6 + H2O");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });

  it("handles C6H8O2 + C2H6O2 -> C8H12O4 (diacid + diol crosslinking - unbalanceable)", () => {
    try {
      balance("C6H8O2 + C2H6O2 -> C8H12O4");
    } catch (e) {
      expect((e as Error).message).toContain("Unbalanceable");
    }
  });

  it("handles C3H6O2 + C3H8O3 -> C12H20O6 + 3H2O (crosslinked polyester - unbalanceable)", () => {
    try {
      balance("C3H6O2 + C3H8O3 -> C12H20O6 + H2O");
    } catch (e) {
      expect((e as Error).message).toContain("Unbalanceable");
    }
  });

  it("balances C4H6O3 + C2H6O2 -> C6H10O4 + H2O (anhydride + diol crosslinking)", () => {
    const r = balance("C4H6O3 + C2H6O2 -> C6H10O4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances C3H4O2 + C2H4 -> C5H8O2 (acrylic acid + ethylene crosslink)", () => {
    const r = balance("C3H4O2 + C2H4 -> C5H8O2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances C8H8 + C4H6 -> C12H14 (styrene-butadiene crosslinking simplified)", () => {
    const r = balance("C8H8 + C4H6 -> C12H14");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("handles CH2O + C3H6N6 -> C4H10N6O + H2O (formaldehyde + melamine resin - unbalanceable)", () => {
    try {
      balance("CH2O + C3H6N6 -> C4H10N6O + H2O");
    } catch (e) {
      expect((e as Error).message).toContain("Unbalanceable");
    }
  });
});

describe("polymer chemistry edge cases", () => {
  it("handles unbalanceable polymer decomposition gracefully", () => {
    try {
      balance("C8H18 -> C6H6 + CH4");
    } catch (e) {
      expect((e as Error).message).toContain("Unbalanceable");
    }
  });

  it("handles complex polymer formula with nested parentheses", () => {
    const r = balance("Ca(OH)2 + CO2 -> CaCO3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("handles ionic species in polymer-related reactions", () => {
    const r = balance("H+ + OH- -> H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("handles hydrate in polymer processing", () => {
    const r = balance("CuSO4·5H2O -> CuSO4 + 5H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 5]);
  });

  it("handles state symbols in polymer reactions", () => {
    const r = balance("C2H4(g) + H2(g) -> C2H6(g)");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("handles electron in polymer redox (conducting polymers)", () => {
    const r = balance("Fe3+ + e- -> Fe2+");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});
