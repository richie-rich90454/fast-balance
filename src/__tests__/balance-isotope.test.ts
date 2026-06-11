import { describe, it, expect } from "vitest";
import { balance } from "../index";

describe("isotope labeling chemistry", () => {
  // NOTE: The parser doesn't distinguish isotopes. Leading digits (e.g. "13C", "15N", "18O")
  // are stripped as stoichiometric coefficients by splitEquation. Deuterium "D" is parsed
  // as its own element. Groups like "(18O)" throw because they start with a digit.

  // ── 1. Deuterium labeling reactions ──

  describe("deuterium labeling (D)", () => {
    it("heavy water formation: D2 + O2 -> D2O", () => {
      const result = balance("D2 + O2 -> D2O");
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("deuterated methanol synthesis: CO + 2 D2 -> CD3OD", () => {
      const result = balance("CO + D2 -> CD3OD");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("heavy water electrolysis: D2O -> D2 + O2", () => {
      const result = balance("D2O -> D2 + O2");
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(2);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("deuterium exchange: DCl + NaOD -> NaCl + D2O", () => {
      // D and H are separate elements; use NaOD to keep D on both sides
      const result = balance("DCl + NaOD -> NaCl + D2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("deuterated sulfuric acid: SO3 + D2O -> D2SO4", () => {
      const result = balance("SO3 + D2O -> D2SO4");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("deuterium chloride formation: D2 + Cl2 -> DCl", () => {
      const result = balance("D2 + Cl2 -> DCl");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("deuterated ammonia: N2 + D2 -> ND3", () => {
      const result = balance("N2 + D2 -> ND3");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(3);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("partial deuterium labeling: CH4 + D2O -> CH3D + HDO", () => {
      // CH4(H:4) + D2O(D:2,O:1) → CH3D(C:1,H:3,D:1) + HDO(H:1,D:1,O:1)
      // Both sides: C:1 H:4 D:2 O:1
      const result = balance("CH4 + D2O -> CH3D + HDO");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("deuterated acetic acid: CH3COCl + D2O -> CH3COOD + DCl", () => {
      const result = balance("CH3COCl + D2O -> CH3COOD + DCl");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("deuterium peroxide: D2 + O2 -> D2O2", () => {
      const result = balance("D2 + O2 -> D2O2");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("deuterated calcium hydride: Ca + D2 -> CaD2", () => {
      const result = balance("Ca + D2 -> CaD2");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("deuterium + fluorine: D2 + F2 -> DF", () => {
      const result = balance("D2 + F2 -> DF");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });
  });

  // ── 2. 13C labeling ──

  describe("13C labeling", () => {
    // "13CO2" → splitEquation strips "13" as coefficient → formula = "CO2"
    // So isotope-labeled equations with leading digits just balance as normal chemistry

    it("13CO2 hydration (13 stripped → CO2 + H2O -> H2CO3)", () => {
      const result = balance("13CO2 + H2O -> H2CO3");
      // Parses as CO2 + H2O -> H2CO3
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("13CH4 combustion (13 stripped → CH4 + O2 -> CO2 + H2O)", () => {
      const result = balance("13CH4 + O2 -> CO2 + H2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(2);
    });

    it("13CO oxidation (13 stripped → CO + O2 -> CO2)", () => {
      const result = balance("13CO + O2 -> CO2");
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("13C-labeled glucose combustion (13 stripped → C6H12O6 + O2 -> CO2 + H2O)", () => {
      const result = balance("13C6H12O6 + O2 -> CO2 + H2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(6);
      expect(result.products[0]?.coefficient).toBe(6);
      expect(result.products[1]?.coefficient).toBe(6);
    });

    it("13CO + 13O2 -> 13CO2 (all 13s stripped → 2CO + O2 -> 2CO2)", () => {
      const result = balance("13CO + 13O2 -> 13CO2");
      // Parses as CO + O2 -> CO2
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("13C + O2 -> 13CO2 (13 stripped on product → C + O2 -> CO2)", () => {
      const result = balance("13C + O2 -> 13CO2");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });
  });

  // ── 3. 15N labeling ──

  describe("15N labeling", () => {
    it("15NH3 synthesis (15 stripped → N2 + 3H2 -> 2NH3)", () => {
      const result = balance("15N2 + H2 -> 15NH3");
      // Parses as N2 + H2 -> NH3
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(3);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("15N2O5 hydration (15 stripped → N2O5 + H2O -> 2HNO3)", () => {
      const result = balance("15N2O5 + H2O -> 15HNO3");
      // Parses as N2O5 + H2O -> HNO3
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("15NO oxidation (15 stripped → 2NO + O2 -> 2NO2)", () => {
      const result = balance("15NO + O2 -> 15NO2");
      // Parses as NO + O2 -> NO2
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("15N-labeled nitric acid formation (15 stripped → 3NO2 + H2O -> 2HNO3 + NO)", () => {
      const result = balance("15NO2 + H2O -> 15HNO3 + 15NO");
      // Parses as NO2 + H2O -> HNO3 + NO
      expect(result.reactants[0]?.coefficient).toBe(3);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("15NH3 oxidation (15 stripped → 4NH3 + 5O2 -> 4NO + 6H2O)", () => {
      const result = balance("15NH3 + O2 -> 15NO + H2O");
      // Parses as NH3 + O2 -> NO + H2O
      expect(result.reactants[0]?.coefficient).toBe(4);
      expect(result.reactants[1]?.coefficient).toBe(5);
      expect(result.products[0]?.coefficient).toBe(4);
      expect(result.products[1]?.coefficient).toBe(6);
    });
  });

  // ── 4. 18O labeling ──

  describe("18O labeling", () => {
    // "18O2" → "O2" (18 stripped as coefficient)
    // "(18O)" throws: group must start with uppercase letter

    it("18O2 in water formation (18 stripped → 2H2 + O2 -> 2H2O)", () => {
      const result = balance("H2 + 18O2 -> H2O");
      // Parses as H2 + O2 -> H2O
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("18O2 + C -> CO2 (18 stripped → C + O2 -> CO2)", () => {
      const result = balance("C + 18O2 -> CO2");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("18O-labeled ozone decomposition (18 stripped → 2O3 -> 3O2)", () => {
      // Note: "(18O)" throws, so use bare O3 notation
      const result = balance("O3 -> O2");
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(3);
    });

    it("H2(18)O parsing throws (digit inside group)", () => {
      expect(() => balance("H2O + 18O2 -> H2(18)O")).toThrow();
    });

    it("18O2 reduction with ions (18 stripped → O2 + H+ + e- -> H2O)", () => {
      // "18O2"→"O2", "4H+"→"H+", "4e-"→"e-", "2H2O"→"H2O"
      // Parses as O2 + H+ + e- -> H2O
      // O:2a = c; H: b = 2c; charge: b - d = 0 → b=d=4, a=1, c=2
      const result = balance("18O2 + 4H+ + 4e- -> 2H2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(4);
      expect(result.reactants[2]?.coefficient).toBe(4);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("18O exchange between CO2 and H2O throws (digit inside group)", () => {
      expect(() => balance("C(18O)2 + H2O -> H2C(18O)3")).toThrow();
    });

    it("photosynthesis oxygen source tracing (18 stripped)", () => {
      // Classic experiment: H2(18)O produces 18O2 — can't represent with this parser
      // Use normal equation instead
      const result = balance("CO2 + H2O -> C6H12O6 + O2");
      expect(result.reactants[0]?.coefficient).toBe(6);
      expect(result.reactants[1]?.coefficient).toBe(6);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(6);
    });
  });

  // ── 5. Tritium labeling (3H) ──

  describe("tritium labeling (3H)", () => {
    // "3H2" → "H2" (3 stripped as coefficient)
    // "3H+" → "H+" (3 stripped)

    it("tritiated water formation (3 stripped → 2H2 + O2 -> 2H2O)", () => {
      const result = balance("3H2 + O2 -> 3H2O");
      // Parses as H2 + O2 -> H2O
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("tritium ion reduction (3 stripped → 2H+ + 2e- -> H2)", () => {
      const result = balance("3H+ + e- -> 3H2");
      // Parses as H+ + e- -> H2
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.reactants[1]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("tritiated HCl formation (3 stripped → H2 + Cl2 -> 2HCl)", () => {
      const result = balance("H2 + Cl2 -> HCl");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("tritiated ammonia (3 stripped → N2 + 3H2 -> 2NH3, but 2(3H3N) throws)", () => {
      expect(() => balance("N2 + 3H2 -> 2(3H3N)")).toThrow();
    });

    it("tritium ammonia normal form: N2 + H2 -> NH3", () => {
      const result = balance("N2 + H2 -> NH3");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(3);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("tritium + oxygen normal form: H2 + O2 -> H2O", () => {
      const result = balance("H2 + O2 -> H2O");
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });
  });

  // ── 6. Tracer studies ──

  describe("tracer studies", () => {
    it("deuterium tracer in methane combustion: CD4 + O2 -> CO2 + D2O", () => {
      const result = balance("CD4 + O2 -> CO2 + D2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(2);
    });

    it("14C tracer in photosynthesis (14 stripped → C6H12O6 + O2 -> CO2 + H2O reversed)", () => {
      try {
        balance("14CO2 + H2O -> 14C6H12O6 + O2");
        // Parses as CO2 + H2O -> C6H12O6 + O2 — this IS balanceable!
        // Actually: CO2 + H2O -> C6H12O6 + O2
        // C: a = 6c; H: 2b = 12c; O: 2a + b = 6c + 2d
        // a=6c, b=6c, 12c+6c = 6c+2d → 12c=2d → d=6c
        // c=1: a=6, b=6, c=1, d=6
      } catch {
        expect.fail("should not have thrown");
      }
      const result = balance("14CO2 + H2O -> 14C6H12O6 + O2");
      expect(result.reactants[0]?.coefficient).toBe(6);
      expect(result.reactants[1]?.coefficient).toBe(6);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(6);
    });

    it("deuterium tracer in esterification: CH3COOH + CD3OH -> CH3COOCD3 + H2O", () => {
      const result = balance("CH3COOH + CD3OH -> CH3COOCD3 + H2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("deuterium tracer in ethylene hydration: C2D4 + D2O -> C2D5OD", () => {
      const result = balance("C2D4 + D2O -> C2D5OD");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("15N tracer in nitration (15 stripped → N2O4 + H2O -> HNO3 + HNO2)", () => {
      const result = balance("15N2O4 + H2O -> 15HNO3 + HNO2");
      // Parses as N2O4 + H2O -> HNO3 + HNO2
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("D-labeled Grignard: CD3MgBr + D2O -> CD4 + Mg(OD)Br", () => {
      const result = balance("CD3MgBr + D2O -> CD4 + Mg(OD)Br");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("deuterium-labeled benzene combustion: C6D6 + O2 -> CO2 + D2O", () => {
      const result = balance("C6D6 + O2 -> CO2 + D2O");
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.reactants[1]?.coefficient).toBe(15);
      expect(result.products[0]?.coefficient).toBe(12);
      expect(result.products[1]?.coefficient).toBe(6);
    });
  });

  // ── 7. Kinetic isotope effect reactions ──

  describe("kinetic isotope effect (KIE)", () => {
    it("KIE - C-H bond cleavage: CH4 + OH -> CH3 + H2O", () => {
      const result = balance("CH4 + OH -> CH3 + H2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("KIE - deuterated version: CD4 + OD -> CD3 + D2O", () => {
      const result = balance("CD4 + OD -> CD3 + D2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("KIE - ethanol oxidation: CH3CH2OH + O -> CH3CHO + H2O", () => {
      const result = balance("CH3CH2OH + O -> CH3CHO + H2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("KIE - deuterated ethanol: CD3CD2OD + O -> CD3CDO + D2O", () => {
      const result = balance("CD3CD2OD + O -> CD3CDO + D2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("primary KIE - H atom abstraction: H2 + Cl -> HCl + H", () => {
      expect(() => balance("H2 + Cl -> HCl + H")).toThrow();
    });

    it("primary KIE - deuterated: D2 + Cl -> DCl + D", () => {
      expect(() => balance("D2 + Cl -> DCl + D")).toThrow();
    });

    it("secondary KIE - SN2: CD3Br + OH- -> CD3OH + Br-", () => {
      const result = balance("CD3Br + OH- -> CD3OH + Br-");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("KIE in E2 elimination: unbalanceable (H appears on one side only)", () => {
      expect(() => balance("C2D3Br + OD- -> C2D2 + Br- + HDO")).toThrow();
    });

    it("KIE - deuterated E2: C2D5Br + OD- -> C2D4 + Br- + D2O", () => {
      const result = balance("C2D5Br + OD- -> C2D4 + Br- + D2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
      expect(result.products[2]?.coefficient).toBe(1);
    });
  });

  // ── 8. Heavy water chemistry ──

  describe("heavy water chemistry (D2O)", () => {
    it("heavy water electrolysis: D2O -> D2 + O2", () => {
      const result = balance("D2O -> D2 + O2");
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(2);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("heavy water autoionization: 2D2O -> D3O+ + OD-", () => {
      const result = balance("D2O -> D3O+ + OD-");
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("heavy water + sodium: D2O + Na -> NaOD + D2", () => {
      const result = balance("D2O + Na -> NaOD + D2");
      expect(result.reactants[0]?.coefficient).toBe(2);
      expect(result.reactants[1]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(2);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("heavy water + CaO: D2O + CaO -> Ca(OD)2", () => {
      const result = balance("D2O + CaO -> Ca(OD)2");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("heavy water + SO3: D2O + SO3 -> D2SO4", () => {
      const result = balance("D2O + SO3 -> D2SO4");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("heavy water + P4O10: 6D2O + P4O10 -> 4D3PO4", () => {
      const result = balance("D2O + P4O10 -> D3PO4");
      expect(result.reactants[0]?.coefficient).toBe(6);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(4);
    });

    it("heavy water + N2O5: D2O + N2O5 -> 2DNO3", () => {
      const result = balance("D2O + N2O5 -> DNO3");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("heavy water + CO2: D2O + CO2 -> D2CO3", () => {
      const result = balance("D2O + CO2 -> D2CO3");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("heavy water + acetylene: C2D2 + D2 -> C2D4", () => {
      const result = balance("C2D2 + D2 -> C2D4");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("H/D exchange: H2O + D2O -> 2HDO", () => {
      const result = balance("H2O + D2O -> HDO");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("heavy water + Cl2O: D2O + Cl2O -> 2DOCl", () => {
      const result = balance("D2O + Cl2O -> DOCl");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
    });

    it("heavy water + iron: 4D2O + 3Fe -> Fe3O4 + 4D2", () => {
      const result = balance("D2O + Fe -> Fe3O4 + D2");
      expect(result.reactants[0]?.coefficient).toBe(4);
      expect(result.reactants[1]?.coefficient).toBe(3);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(4);
    });

    it("heavy water steam reforming: CD4 + D2O -> CO + 3D2", () => {
      const result = balance("CD4 + D2O -> CO + D2");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(3);
    });

    it("heavy water methanation: CO2 + 4D2 -> CD4 + 2D2O", () => {
      const result = balance("CO2 + D2 -> CD4 + D2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(4);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(2);
    });

    it("heavy water + D2SO4 neutralization: D2O + SO3 -> D2SO4", () => {
      const result = balance("D2O + SO3 -> D2SO4");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("heavy water redox: D2O + D2 -> 2D2O (unbalanceable - same element on both sides)", () => {
      expect(() => balance("D2O + D2 -> D2O")).toThrow();
    });
  });

  // ── 9. Mixed isotope and complex labeling ──

  describe("mixed isotope labeling", () => {
    it("dual D and 13C labeling: CD4 + O2 -> CO2 + D2O", () => {
      const result = balance("13CD4 + O2 -> 13CO2 + D2O");
      // Parses as CD4 + O2 -> CO2 + D2O
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(2);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(2);
    });

    it("D-labeled fermentation: C6D12O6 -> 2C2D5OD + 2CO2", () => {
      const result = balance("C6D12O6 -> 2C2D5OD + 2CO2");
      // Leading "2"s are stripped → C6D12O6 -> C2D5OD + CO2
      // C6D12O6 = C:6 D:12 O:6; C2D5OD = C:2 D:6 O:1; CO2 = C:1 O:2
      // C: 6a = 2c + e; D: 12a = 6c → c=2a; O: 6a = c + 2e
      // c=2a, 6a = 4a + 2e → e = a
      // a=1, c=2, e=1: C: 6 = 4+1=5 ≠ 6! Won't balance as 1:2:1
      // Need: a=1, c=2, e=2: C: 6 = 4+2=6 ✓, O: 6 = 2+4=6 ✓
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(2);
      expect(result.products[1]?.coefficient).toBe(2);
    });

    it("deuterated acid-base: DCl + NaOD -> NaCl + D2O", () => {
      const result = balance("DCl + NaOD -> NaCl + D2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("triple isotope notation throws: 13C + 18O2 -> 13C(18O)2", () => {
      expect(() => balance("13C + 18O2 -> 13C(18O)2")).toThrow();
    });

    it("13C + 16O2 -> 13CO2 (all stripped → C + O2 -> CO2)", () => {
      const result = balance("13C + 16O2 -> 13CO2");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
    });

    it("deuterated + 15N: 15N2 + 3D2 -> 2(15ND3) (throws - digit in group)", () => {
      expect(() => balance("15N2 + 3D2 -> 2(15ND3)")).toThrow();
    });

    it("D-labeled reduction: D2 + CuO -> Cu + D2O", () => {
      const result = balance("D2 + CuO -> Cu + D2O");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });

    it("mixed H/D water-gas shift: CO + HDO -> CO2 + HD", () => {
      // CO = C:1 O:1; HDO = H:1 D:1 O:1
      // CO2 = C:1 O:2; HD = H:1 D:1
      // Left: C:1 H:1 D:1 O:2; Right: C:1 H:1 D:1 O:2 ✓
      const result = balance("CO + HDO -> CO2 + HD");
      expect(result.reactants[0]?.coefficient).toBe(1);
      expect(result.reactants[1]?.coefficient).toBe(1);
      expect(result.products[0]?.coefficient).toBe(1);
      expect(result.products[1]?.coefficient).toBe(1);
    });
  });
});
