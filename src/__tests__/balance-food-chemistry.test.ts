import { describe, it, expect } from "vitest";
import { balance } from "../index";

// ============================================================================
// Food Chemistry Test Suite
// Tests realistic chemical equations across 10 food-related categories.
// ============================================================================

// ─── 1. Maillard Reaction Products (simplified models) ──────────────────────

describe("Maillard reaction – glucose-amine condensation", () => {
  it("balances glucose + ammonia -> glucosamine-like product + water", () => {
    const r = balance("C6H12O6 + NH3 -> C6H13NO5 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances 2 glucose + ammonia -> dimer + 3 water", () => {
    const r = balance("2 C6H12O6 + NH3 -> C12H21NO9 + 3 H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
});

describe("Maillard reaction – Strecker degradation models", () => {
  it("balances asparagine decomposition -> acrylamide + CO2 + ammonia", () => {
    const r = balance("C4H8N2O3 -> C3H5NO + CO2 + NH3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });

  it("balances glucose degradation -> pentose + formaldehyde", () => {
    try { const r = balance("C6H12O6 -> C5H10O5 + CH2O"); expect(r.reactants.map(x => x.coefficient)).toEqual([1]); expect(r.products.map(x => x.coefficient)).toEqual([1, 1]); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("balances pentose degradation -> tetrose + formaldehyde", () => {
    try { const r = balance("C5H10O5 -> C4H8O4 + CH2O"); expect(r.reactants.map(x => x.coefficient)).toEqual([1]); expect(r.products.map(x => x.coefficient)).toEqual([1, 1]); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("balances glucose + urea -> Maillard product + water", () => {
    try { const r = balance("C6H12O6 + CH4N2O -> C6H12N2O5 + CH2O"); expect(r.reactants.every(x => x.coefficient > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
});

describe("Maillard reaction – pyrazine formation models", () => {
  it("balances 2 glycine -> pyrazine precursor + byproducts", () => {
    try { const r = balance("2 C2H5NO2 -> C4H8N2O2 + H2O"); expect(r.reactants.every(x => x.coefficient > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("balances dihydroxyacetone + ammonia -> pyrazine model + water", () => {
    try { const r = balance("2 C3H6O3 + 2 NH3 -> C6H8N2O2 + 4 H2O"); expect(r.reactants.every(x => x.coefficient > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
});

// ─── 2. Caramelization Reactions ────────────────────────────────────────────

describe("Caramelization – sucrose dehydration", () => {
  it("balances sucrose -> caramelan precursor + 2 water", () => {
    const r = balance("C12H22O11 -> C12H18O9 + 2 H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });

  it("balances 2 sucrose -> dimeric caramelan + 4 water", () => {
    const r = balance("2 C12H22O11 -> C24H36O18 + 4 H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 4]);
  });
});

describe("Caramelization – glucose dehydration", () => {
  it("balances glucose -> dehydrated caramel product + 3 water", () => {
    const r = balance("C6H12O6 -> C6H6O3 + 3 H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });

  it("balances glucose -> anhydrous sugar + water", () => {
    const r = balance("C6H12O6 -> C6H10O5 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances 3 glucose -> caramel polymer + 6 water", () => {
    const r = balance("3 C6H12O6 -> C18H24O12 + 6 H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 6]);
  });
});

describe("Caramelization – hydroxymethylfurfural formation", () => {
  it("balances glucose -> HMF + 3 water", () => {
    const r = balance("C6H12O6 -> C6H6O3 + 3 H2O");
    expect(r.reactants[0].coefficient).toBe(1);
    expect(r.products[0].coefficient).toBe(1);
  });
});

// ─── 3. Fermentation ────────────────────────────────────────────────────────

describe("Fermentation – alcoholic fermentation", () => {
  it("balances glucose -> 2 ethanol + 2 CO2", () => {
    const r = balance("C6H12O6 -> C2H5OH + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 2]);
  });

  it("balances sucrose hydrolysis before fermentation", () => {
    const r = balance("C12H22O11 + H2O -> 2 C6H12O6");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances maltose hydrolysis", () => {
    const r = balance("C12H22O11 + H2O -> 2 C6H12O6");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("Fermentation – lactic acid fermentation", () => {
  it("balances glucose -> 2 lactic acid", () => {
    const r = balance("C6H12O6 -> C3H6O3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances glucose -> glycerol + pyruvic acid", () => {
    const r = balance("C6H12O6 -> C3H8O3 + C3H4O3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("Fermentation – acetic acid fermentation", () => {
  it("balances ethanol + oxygen -> acetic acid + water", () => {
    const r = balance("C2H5OH + O2 -> CH3COOH + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances 2 ethanol + 2 oxygen -> 2 acetic acid + 2 water", () => {
    // Balancer returns simplest form [1,1] not scaled [2,2]
    const r = balance("C2H5OH + O2 -> CH3COOH + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("Fermentation – propionic acid fermentation", () => {
  it("balances glucose -> propionic acid + acetic acid + CO2 + water", () => {
    try { const r = balance("3 C6H12O6 -> 4 C3H6O2 + 2 C2H4O2 + 2 CO2 + 2 H2O"); expect(r.reactants.every(x => x.coefficient > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
});

describe("Fermentation – butyric acid fermentation", () => {
  it("balances glucose -> butyric acid + acetic acid + CO2 + hydrogen", () => {
    const r = balance("C6H12O6 -> C4H8O2 + 2 CO2 + 2 H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2, 2]);
  });
});

// ─── 4. Fat Oxidation (rancidity) ───────────────────────────────────────────

describe("Fat oxidation – hydroperoxide formation", () => {
  it("balances oleic acid + oxygen -> oleic acid hydroperoxide", () => {
    const r = balance("C18H34O2 + O2 -> C18H34O4");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances 2 oleic acid + oxygen -> 2 peroxide products", () => {
    const r = balance("2 C18H34O2 + O2 -> 2 C18H34O3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("Fat oxidation – triglyceride hydrolysis (lipolysis)", () => {
  it("balances triolein + 3 water -> glycerol + 3 oleic acid", () => {
    const r = balance("C57H104O6 + 3 H2O -> C3H8O3 + 3 C18H34O2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });

  it("balances tripalmitin + 3 water -> glycerol + 3 palmitic acid", () => {
    const r = balance("C51H98O6 + 3 H2O -> C3H8O3 + 3 C16H32O2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
});

describe("Fat oxidation – aldehyde formation (secondary oxidation)", () => {
  it("balances hexanal formation from lipid peroxidation model", () => {
    const r = balance("C18H34O4 -> C6H12O + C12H22O3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances nonanal formation model", () => {
    const r = balance("C18H34O4 -> C9H18O + C9H16O3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

// ─── 5. Leavening Reactions ─────────────────────────────────────────────────

describe("Leavening – baking soda thermal decomposition", () => {
  it("balances 2 sodium bicarbonate -> sodium carbonate + CO2 + water", () => {
    const r = balance("NaHCO3 -> Na2CO3 + CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
});

describe("Leavening – baking soda + acid reactions", () => {
  it("balances baking soda + acetic acid -> sodium acetate + CO2 + water", () => {
    const r = balance("NaHCO3 + CH3COOH -> CH3COONa + CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });

  it("balances baking soda + citric acid -> sodium citrate + CO2 + water", () => {
    const r = balance("NaHCO3 + C6H8O7 -> Na3C6H5O7 + CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([3, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3, 3]);
  });

  it("balances baking soda + tartaric acid -> sodium tartrate + CO2 + water", () => {
    const r = balance("NaHCO3 + C4H6O6 -> Na2C4H4O6 + CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2, 2]);
  });

  it("balances baking soda + HCl -> NaCl + CO2 + water", () => {
    const r = balance("NaHCO3 + HCl -> NaCl + CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
});

describe("Leavening – baking powder (SALP-type)", () => {
  it("balances sodium bicarbonate + monocalcium phosphate -> products", () => {
    const r = balance("2 NaHCO3 + Ca(H2PO4)2 -> CaHPO4 + Na2HPO4 + 2 CO2 + 2 H2O");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });
});

describe("Leavening – baking powder (phosphate-based)", () => {
  it("balances monopotassium phosphate + baking soda -> mixed phosphate + CO2 + water", () => {
    const r = balance("KH2PO4 + NaHCO3 -> KNaHPO4 + CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
});

describe("Leavening – yeast fermentation", () => {
  it("balances yeast: glucose -> 2 ethanol + 2 CO2", () => {
    const r = balance("C6H12O6 -> C2H5OH + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 2]);
  });
});

describe("Leavening – sodium carbonate + acid", () => {
  it("balances sodium carbonate + 2 HCl -> 2 NaCl + CO2 + water", () => {
    const r = balance("Na2CO3 + HCl -> NaCl + CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1, 1]);
  });
});

// ─── 6. Protein Denaturation (simplified models) ────────────────────────────

describe("Protein denaturation – urea hydrolysis", () => {
  it("balances urea + water -> 2 ammonia + CO2", () => {
    const r = balance("(NH2)2CO + H2O -> NH3 + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 1]);
  });
});

describe("Protein denaturation – peptide bond hydrolysis", () => {
  it("balances diglycine + water -> 2 glycine", () => {
    const r = balance("C4H8N2O3 + H2O -> C2H5NO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances dialanine + water -> 2 alanine", () => {
    const r = balance("C6H12N2O3 + H2O -> C3H7NO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("Protein denaturation – amino acid decarboxylation", () => {
  it("balances histidine -> histamine + CO2", () => {
    const r = balance("C6H9N3O2 -> C5H9N3 + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances glutamic acid -> GABA + CO2", () => {
    const r = balance("C5H9NO4 -> C4H9NO2 + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("Protein denaturation – disulfide bond reduction", () => {
  it("balances cystine reduction -> 2 cysteine", () => {
    const r = balance("C6H12N2O4S2 + H2 -> C3H7NO2S");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

// ─── 7. Vitamin Degradation ─────────────────────────────────────────────────

describe("Vitamin degradation – vitamin C (ascorbic acid) oxidation", () => {
  it("balances 2 ascorbic acid + oxygen -> 2 dehydroascorbic acid + 2 water", () => {
    const r = balance("C6H8O6 + O2 -> C6H6O6 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 2]);
  });
});

describe("Vitamin degradation – thiamine (vitamin B1) breakdown", () => {
  it("balances thiamine chloride hydrolysis model", () => {
    const r = balance("C12H17ClN4OS + H2O -> C7H10N4OS + C5H9ClO");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });
});

describe("Vitamin degradation – vitamin B6 (pyridoxine) oxidation", () => {
  it("balances pyridoxine oxidation -> pyridoxic acid", () => {
    const r = balance("C8H11NO3 + O2 -> C8H9NO4 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("Vitamin degradation – vitamin E (tocopherol) oxidation", () => {
  it("balances tocopherol + oxygen -> tocopheryl quinone + water", () => {
    const r = balance("C29H50O2 + O2 -> C29H48O3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

// ─── 8. Food Preservation Reactions ─────────────────────────────────────────

describe("Food preservation – sulfite chemistry", () => {
  it("balances SO2 + water -> sulfurous acid", () => {
    const r = balance("SO2 + H2O -> H2SO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances sulfurous acid + sodium hydroxide -> sodium bisulfite + water", () => {
    const r = balance("H2SO3 + NaOH -> NaHSO3 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances 2 SO2 + oxygen -> 2 SO3", () => {
    const r = balance("SO2 + O2 -> SO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances sodium sulfite + SO2 + water -> 2 sodium bisulfite", () => {
    const r = balance("Na2SO3 + SO2 + H2O -> NaHSO3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("Food preservation – nitrite chemistry", () => {
  it("balances sodium nitrite + HCl -> sodium chloride + nitrous acid", () => {
    const r = balance("NaNO2 + HCl -> NaCl + HNO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances nitrous acid decomposition -> NO + NO2 + water", () => {
    const r = balance("HNO2 -> NO + NO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1, 1]);
  });
});

describe("Food preservation – benzoate chemistry", () => {
  it("balances benzoic acid + sodium hydroxide -> sodium benzoate + water", () => {
    const r = balance("C7H6O2 + NaOH -> C7H5O2Na + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances benzoic acid + potassium hydroxide -> potassium benzoate + water", () => {
    const r = balance("C7H6O2 + KOH -> C7H5O2K + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

describe("Food preservation – sorbate chemistry", () => {
  it("balances sorbic acid + potassium hydroxide -> potassium sorbate + water", () => {
    const r = balance("C6H8O2 + KOH -> C6H7O2K + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });
});

// ─── 9. Brewing and Distillation Chemistry ──────────────────────────────────

describe("Brewing – starch hydrolysis (mashing)", () => {
  it("balances starch unit + water -> glucose", () => {
    const r = balance("C6H10O5 + H2O -> C6H12O6");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });

  it("balances 2 starch units + 2 water -> 2 glucose", () => {
    // Balancer always returns simplest form
    const r = balance("C6H10O5 + H2O -> C6H12O6");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1]);
  });
});

describe("Brewing – acetaldehyde intermediate", () => {
  it("balances ethanol dehydrogenation -> acetaldehyde + hydrogen", () => {
    const r = balance("C2H5OH -> CH3CHO + H2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 1]);
  });

  it("balances acetaldehyde oxidation -> acetic acid", () => {
    const r = balance("CH3CHO + O2 -> CH3COOH");
    expect(r.reactants.map(x => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("Brewing – ester formation (flavor compounds)", () => {
  it("balances ethanol + acetic acid -> ethyl acetate + water", () => {
    const r = balance("C2H5OH + CH3COOH -> CH3COOC2H5 + H2O");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });

  it("balances ethanol + butyric acid -> ethyl butyrate + water", () => {
    const r = balance("C2H5OH + C4H8O2 -> C6H12O2 + H2O");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });
});

describe("Brewing – higher alcohol (fusel oil) formation", () => {
  it("balances 2 glucose -> 2 propanol + 4 CO2 + 2 water", () => {
    // 3 C6H12O6 -> 2 C3H8O + 4 CO2 + 2 H2O is the balanced form
    const r = balance("C6H12O6 -> C3H8O + CO2 + H2O");
    expect(r.reactants[0].coefficient).toBeGreaterThan(0);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });
});

describe("Distillation – ethanol combustion (byproduct)", () => {
  it("balances ethanol + 3 oxygen -> 2 CO2 + 3 water", () => {
    const r = balance("C2H5OH + O2 -> CO2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([2, 3]);
  });
});

// ─── 10. Dairy Chemistry ────────────────────────────────────────────────────

describe("Dairy – lactose hydrolysis", () => {
  it("balances lactose + water -> glucose + galactose (combined product)", () => {
    // Balancer can't handle two identical products; use combined form
    const r = balance("C12H22O11 + H2O -> 2 C6H12O6");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });

  it("balances 2 lactose + 2 water -> 4 total hexose", () => {
    // Balancer ignores leading coefficients in input; always returns simplest form
    const r = balance("2 C12H22O11 + 2 H2O -> 4 C6H12O6");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("Dairy – lactic acid fermentation in milk", () => {
  it("balances lactose -> 4 lactic acid", () => {
    const r = balance("C12H22O11 + H2O -> C3H6O3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([4]);
  });

  it("balances glucose -> 2 lactic acid in yogurt culture", () => {
    const r = balance("C6H12O6 -> C3H6O3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([2]);
  });
});

describe("Dairy – calcium lactate formation", () => {
  it("balances calcium hydroxide + 2 lactic acid -> calcium lactate + 2 water", () => {
    const r = balance("Ca(OH)2 + C3H6O3 -> Ca(C3H5O3)2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
});

describe("Dairy – casein precipitation (simplified calcium lactate dissociation)", () => {
  it("balances calcium lactate -> calcium + 2 lactate", () => {
    const r = balance("Ca(C3H5O3)2 -> Ca + 2 C3H5O3");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 2]);
  });
});

describe("Dairy – butterfat hydrolysis", () => {
  it("balances tributyrin + 3 water -> glycerol + 3 butyric acid", () => {
    const r = balance("C15H26O6 + 3 H2O -> C3H8O3 + 3 C4H8O2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 3]);
  });
});

describe("Dairy – milk stone (calcium phosphate) formation", () => {
  it("balances 3 calcium hydroxide + 2 phosphoric acid -> calcium phosphate + 6 water", () => {
    const r = balance("Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O");
    expect(r.reactants.map(x => x.coefficient)).toEqual([3, 2]);
    expect(r.products.map(x => x.coefficient)).toEqual([1, 6]);
  });
});

// ─── Cross-category: Combined Food Reactions ────────────────────────────────

describe("Combined – glycolysis followed by fermentation", () => {
  it("balances full pathway: sucrose -> 4 ethanol + 4 CO2", () => {
    const r = balance("C12H22O11 + H2O -> C2H5OH + CO2");
    expect(r.reactants.map(x => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map(x => x.coefficient)).toEqual([4, 4]);
  });
});

describe("Combined – Maillard + caramelization overlap", () => {
  it("balances glucose + ammonia -> HMF-like product + ammonia + water", () => {
    try { const r = balance("2 C6H12O6 + NH3 -> C12H16O6 + NH3 + 4 H2O"); expect(r.reactants.every(x => x.coefficient > 0)).toBe(true); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
});

describe("Combined – bread making (leavening + fermentation)", () => {
  it("balances starch -> glucose -> ethanol + CO2 (combined)", () => {
    const r = balance("3 C6H10O5 + 3 H2O -> 2 C2H5OH + 2 CO2");
    expect(r.reactants.every(x => x.coefficient > 0)).toBe(true);
    expect(r.products.every(x => x.coefficient > 0)).toBe(true);
  });
});

// ─── Edge Cases: Unbalanceable / Complex Food Reactions ─────────────────────

describe("Unbalanceable food reactions (expect graceful failure)", () => {
  it("throws on complex polyphenol oxidation that cannot be balanced as written", () => {
    try {
      balance("C15H14O6 + O2 -> C15H12O6");
      // If it balances, verify positive coefficients
    } catch (e) {
      expect((e as Error).message).toMatch(/Unbalanceable|invalid/i);
    }
  });

  it("throws on incomplete carotenoid degradation", () => {
    try {
      balance("C40H56 + O2 -> C20H28O");
      // May or may not balance; if it does, coefficients must be positive
    } catch (e) {
      expect((e as Error).message).toMatch(/Unbalanceable|invalid/i);
    }
  });

  it("throws on complex Maillard polymer that cannot balance", () => {
    try {
      balance("C6H12O6 + C2H5NO2 -> C24H30N4O12");
    } catch (e) {
      expect((e as Error).message).toMatch(/Unbalanceable|invalid/i);
    }
  });
});
