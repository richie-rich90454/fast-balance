import { describe, expect, it } from "vitest";
import { balance } from "../index";
import { checkConservation } from "./support/independent";

/**
 * Named industrial and laboratory processes, one distinct case each.
 * Every result is re-verified with the independent scanner.
 */

const PROCESSES: Array<[string, string]> = [
    ["Contact process: SO2 + O2 -> SO3", "SO2 + O2 -> SO3"],
    ["Contact process hydration: SO3 + H2O -> H2SO4", "SO3 + H2O -> H2SO4"],
    ["Ostwald step 1: NH3 + O2 -> NO + H2O", "NH3 + O2 -> NO + H2O"],
    ["Ostwald step 2: NO + O2 -> NO2", "NO + O2 -> NO2"],
    ["Ostwald step 3: NO2 + H2O + O2 -> HNO3", "NO2 + H2O + O2 -> HNO3"],
    ["Haber: N2 + H2 -> NH3", "N2 + H2 -> NH3"],
    ["Solvay carbonation: NaCl + NH3 + CO2 + H2O -> NaHCO3 + NH4Cl", "NaCl + NH3 + CO2 + H2O -> NaHCO3 + NH4Cl"],
    ["Solvay calcination: NaHCO3 -> Na2CO3 + CO2 + H2O", "2 NaHCO3 -> Na2CO3 + CO2 + H2O"],
    ["Chlor-alkali: NaCl + H2O -> NaOH + H2 + Cl2", "2 NaCl + 2 H2O -> 2 NaOH + H2 + Cl2"],
    ["Birkeland-Eyde: N2 + O2 -> NO", "N2 + O2 -> 2 NO"],
    ["Birkeland-Eyde absorption: NO + O2 -> NO2", "2 NO + O2 -> 2 NO2"],
    ["Lead chamber: SO2 + O2 -> SO3", "2 SO2 + O2 -> 2 SO3"],
    ["Wöhler: NH2CONH2 + H2O -> NH3 + CO2", "NH2CONH2 + H2O -> 2 NH3 + CO2"],
    ["Aniline: C6H6 + NH3 -> C6H5NH2 + H2", "C6H6 + NH3 -> C6H5NH2 + H2"],
    ["Phenyl isocyanate: C6H5NH2 + CO -> C6H5NCO + H2", "C6H5NH2 + CO -> C6H5NCO + H2"],
    ["Sabatier: CO2 + 4 H2 -> CH4 + 2 H2O", "CO2 + 4 H2 -> CH4 + 2 H2O"],
    ["Fischer-Tropsch: CO + 3 H2 -> CH4 + H2O", "CO + 3 H2 -> CH4 + H2O"],
    ["Methanol synthesis: CO + 2 H2 -> CH3OH", "CO + 2 H2 -> CH3OH"],
    ["Steam reforming: CH4 + H2O -> CO + 3 H2", "CH4 + H2O -> CO + 3 H2"],
    ["Water gas shift: CO + H2O -> CO2 + H2", "CO + H2O -> CO2 + H2"],
    ["Boudouard: C + CO2 -> 2 CO", "C + CO2 -> 2 CO"],
    ["Eldenhammar: BaSO4 + 4 C -> BaS + 4 CO", "BaSO4 + 4 C -> BaS + 4 CO"],
    ["Deville: Al2O3 + 3 C -> Al2O3 + 3 CO", "Al2O3 + 3 C -> 2 Al + 3 CO"],
    ["Thermit: Fe2O3 + 3 C -> Fe + 3 CO", "Fe2O3 + 3 C -> 2 Fe + 3 CO"],
    ["Gold extraction: 4 Au + 8 NaCN + O2 + 2 H2O -> 4 Na[Au(CN)2] + 4 NaOH", "4 Au + 8 NaCN + O2 + 2 H2O -> 4 NaAu(CN)2 + 4 NaOH"],
    ["Haber-Loschmidt catalyst prep: NH3 + HCl -> NH4Cl", "NH3 + HCl -> NH4Cl"],
    ["Sulfur burning: S + O2 -> SO2", "S + O2 -> SO2"],
    ["Sulfur oxidation: 2 SO2 + O2 -> 2 SO3", "2 SO2 + O2 -> 2 SO3"],
    ["Pyrite roasting: 4 FeS2 + 11 O2 -> 2 Fe2O3 + 8 SO2", "4 FeS2 + 11 O2 -> 2 Fe2O3 + 8 SO2"],
    ["Galena roasting: 2 PbS + 3 O2 -> 2 PbO + 2 SO2", "2 PbS + 3 O2 -> 2 PbO + 2 SO2"],
    ["Blast furnace: Fe2O3 + 3 CO -> 2 Fe + 3 CO2", "Fe2O3 + 3 CO -> 2 Fe + 3 CO2"],
    ["Blast furnace slag: CaCO3 -> CaO + CO2", "CaCO3 -> CaO + CO2"],
    ["Bessemer: Fe + O2 -> Fe2O3", "4 Fe + 3 O2 -> 2 Fe2O3"],
    ["Basic oxygen: Fe2O3 + CO -> Fe + CO2", "Fe2O3 + 3 CO -> 2 Fe + 3 CO2"],
    ["Cement kiln: CaCO3 -> CaO + CO2", "CaCO3 -> CaO + CO2"],
    ["Cement hydration: CaO + H2O -> Ca(OH)2", "CaO + H2O -> Ca(OH)2"],
    ["Cement hydration: Ca3SiO5 + H2O -> Ca(OH)2 + CaSiO3", "Ca3SiO5 + 6 H2O -> 3 Ca(OH)2 + CaSiO3 + 2 H2SiO3"],
    ["Lime kilning: CaCO3 + C -> CaO + 2 CO", "CaCO3 + C -> CaO + 2 CO"],
    ["Ammonia dissociation: 2 NH3 -> N2 + 3 H2", "2 NH3 -> N2 + 3 H2"],
    ["Nitric acid: 4 NH3 + 5 O2 -> 4 NO + 6 H2O", "4 NH3 + 5 O2 -> 4 NO + 6 H2O"],
    ["Catalytic converter: 2 NO + 2 CO -> N2 + 2 CO2", "2 NO + 2 CO -> N2 + 2 CO2"],
    ["Catalytic converter hydrocarbons: C3H8 + 5 O2 -> 3 CO2 + 4 H2O", "C3H8 + 5 O2 -> 3 CO2 + 4 H2O"],
    ["Scrubber: CaCO3 + SO2 -> CaSO3 + CO2", "CaCO3 + SO2 -> CaSO3 + CO2"],
    ["Flue gas desulfurization: CaCO3 + SO2 + O2 -> CaSO4 + CO2", "2 CaCO3 + 2 SO2 + O2 -> 2 CaSO4 + 2 CO2"],
    ["Zeolite synthesis: Na2O + SiO2 + Al2O3 + H2O -> NaAlSiO4 + H2O", "Na2O + SiO2 + Al2O3 -> 2 NaAlSiO4"],
    ["Glass making: Na2CO3 + SiO2 -> Na2SiO3 + CO2", "Na2CO3 + SiO2 -> Na2SiO3 + CO2"],
    ["Ceramic: ZrO2 + Y2O3 -> ZrO2", "3 ZrO2 + Y2O3 -> 2 Y2Zr2O7"],
    ["Titanium chloride process: TiO2 + 2 C + 2 Cl2 -> TiCl4 + 2 CO", "TiO2 + 2 C + 2 Cl2 -> TiCl4 + 2 CO"],
    ["Kroll: TiCl4 + 2 Mg -> Ti + 2 MgCl2", "TiCl4 + 2 Mg -> Ti + 2 MgCl2"],
    ["Hall-Héroult: 2 Al2O3 + 3 C -> 4 Al + 3 CO2", "2 Al2O3 + 3 C -> 4 Al + 3 CO2"],
    ["Copper smelting: Cu2S + O2 -> 2 Cu + SO2", "Cu2S + O2 -> 2 Cu + SO2"],
    ["Nickel matte: NiS -> Ni + S", "NiS -> Ni + S"],
    ["Lead smelting: PbS + PbO -> Pb + SO2", "2 PbS + 2 PbO -> 4 Pb + 2 SO2"],
    ["Zinc roasting: ZnS + O2 -> ZnO + SO2", "2 ZnS + 3 O2 -> 2 ZnO + 2 SO2"],
    ["Iron carbonyl: Fe + 5 CO -> Fe(CO)5", "Fe + 5 CO -> Fe(CO)5"],
    ["Nickel carbonyl: Ni + 4 CO -> Ni(CO)4", "Ni + 4 CO -> Ni(CO)4"],
    ["Silver nitrate: Ag + 2 HNO3 -> AgNO3 + NO2 + H2O", "Ag + 2 HNO3 -> AgNO3 + NO2 + H2O"],
    ["Copper nitrate: Cu + 4 HNO3 -> Cu(NO3)2 + 2 NO2 + 2 H2O", "Cu + 4 HNO3 -> Cu(NO3)2 + 2 NO2 + 2 H2O"],
    ["Aqua regia: Au + 4 HCl + 3 HNO3 -> HAuCl4 + 3 NO2 + 3 H2O", "Au + 4 HCl + 3 HNO3 -> HAuCl4 + 3 NO2 + 3 H2O"],
    ["Aqua regia: Pt + 6 HCl -> H2PtCl6 + H2", "Pt + 6 HCl -> H2PtCl6 + H2"],
    ["Brine electrolysis: 2 NaCl + 2 H2O -> 2 NaOH + H2 + Cl2", "2 NaCl + 2 H2O -> 2 NaOH + H2 + Cl2"],
    ["Copper refining: Cu -> Cu2+ + 2 e-", "Cu -> Cu2+ + 2 e-"],
    ["Copper deposition: Cu2+ + 2 e- -> Cu", "Cu2+ + 2 e- -> Cu"],
    ["Zinc plating: Zn2+ + 2 e- -> Zn", "Zn2+ + 2 e- -> Zn"],
    ["Nickel plating: Ni2+ + 2 e- -> Ni", "Ni2+ + 2 e- -> Ni"],
    ["Silver plating: Ag+ + e- -> Ag", "Ag+ + e- -> Ag"],
    ["Aluminum smelting: Al3+ + 3 e- -> Al", "Al3+ + 3 e- -> Al"],
    ["Magnesium: Mg2+ + 2 e- -> Mg", "Mg2+ + 2 e- -> Mg"],
    ["Titanium: Ti4+ + 4 e- -> Ti", "Ti4+ + 4 e- -> Ti"],
    ["Chromium: Cr6+ + 6 e- -> Cr", "Cr^6+ + 6 e- -> Cr"],
    ["Manganese: Mn7+ + 7 e- -> Mn", "Mn^7+ + 7 e- -> Mn"],
];

describe("named industrial and laboratory processes", () => {
    for (const [label, eq] of PROCESSES) {
        it(`${label}`, () => {
            const r = balance(eq);
            const report = checkConservation(r.equation);
            expect(report.charge).toBe(0);
            expect(report.gcd).toBe(1);
            for (const el in report.net) expect(report.net[el]).toBe(0);
        });
    }
});

/** Hand-pinned results for the classic processes. */
const PINNED: Array<[string, string]> = [
    ["Haber: N2 + 3 H2 -> 2 NH3", "1 N2 + 3 H2 -> 2 NH3"],
    ["Contact: 2 SO2 + O2 -> 2 SO3", "2 SO2 + 1 O2 -> 2 SO3"],
    ["Steam reforming: CH4 + H2O -> CO + 3 H2", "1 CH4 + 1 H2O -> 1 CO + 3 H2"],
    ["Methanol: CO + 2 H2 -> CH3OH", "1 CO + 2 H2 -> 1 CH3OH"],
    ["Water gas shift: CO + H2O -> CO2 + H2", "1 CO + 1 H2O -> 1 CO2 + 1 H2"],
    ["Boudouard: C + CO2 -> 2 CO", "1 C + 1 CO2 -> 2 CO"],
    ["Thermit: Fe2O3 + 3 C -> 2 Fe + 3 CO", "1 Fe2O3 + 3 C -> 2 Fe + 3 CO"],
    ["Wöhler: NH2CONH2 + H2O -> 2 NH3 + CO2", "1 NH2CONH2 + 1 H2O -> 2 NH3 + 1 CO2"],
    ["Pyrite roasting: 4 FeS2 + 11 O2 -> 2 Fe2O3 + 8 SO2", "4 FeS2 + 11 O2 -> 2 Fe2O3 + 8 SO2"],
    ["Chlor-alkali: 2 NaCl + 2 H2O -> 2 NaOH + H2 + Cl2", "2 NaCl + 2 H2O -> 2 NaOH + 1 H2 + 1 Cl2"],
    ["Hall-Héroult: 2 Al2O3 + 3 C -> 4 Al + 3 CO2", "2 Al2O3 + 3 C -> 4 Al + 3 CO2"],
    ["Kroll: TiCl4 + 2 Mg -> Ti + 2 MgCl2", "1 TiCl4 + 2 Mg -> 1 Ti + 2 MgCl2"],
    ["Aqua regia: Au + 4 HCl + 3 HNO3 -> HAuCl4 + 3 NO2 + 3 H2O", "1 Au + 4 HCl + 3 HNO3 -> 1 HAuCl4 + 3 NO2 + 3 H2O"],
    ["Nickel carbonyl: Ni + 4 CO -> Ni(CO)4", "1 Ni + 4 CO -> 1 Ni(CO)4"],
    ["Iron carbonyl: Fe + 5 CO -> Fe(CO)5", "1 Fe + 5 CO -> 1 Fe(CO)5"],
    ["Glass: Na2CO3 + SiO2 -> Na2SiO3 + CO2", "1 Na2CO3 + 1 SiO2 -> 1 Na2SiO3 + 1 CO2"],
    ["Sabatier: CO2 + 4 H2 -> CH4 + 2 H2O", "1 CO2 + 4 H2 -> 1 CH4 + 2 H2O"],
    ["Fischer-Tropsch: CO + 3 H2 -> CH4 + H2O", "1 CO + 3 H2 -> 1 CH4 + 1 H2O"],
    ["Aniline: C6H6 + NH3 -> C6H5NH2 + H2", "1 C6H6 + 1 NH3 -> 1 C6H5NH2 + 1 H2"],
    ["Ammonia dissociation: 2 NH3 -> N2 + 3 H2", "2 NH3 -> 1 N2 + 3 H2"],
    ["Flue gas: 2 CaCO3 + 2 SO2 + O2 -> 2 CaSO4 + 2 CO2", "2 CaCO3 + 2 SO2 + 1 O2 -> 2 CaSO4 + 2 CO2"],
    ["Lead smelting: 2 PbS + 2 PbO -> 4 Pb + 2 SO2", "1 PbS + 2 PbO -> 3 Pb + 1 SO2"],
    ["Copper smelting: Cu2S + O2 -> 2 Cu + SO2", "1 Cu2S + 1 O2 -> 2 Cu + 1 SO2"],
    ["Zinc roasting: 2 ZnS + 3 O2 -> 2 ZnO + 2 SO2", "2 ZnS + 3 O2 -> 2 ZnO + 2 SO2"],
    ["Galena roasting: 2 PbS + 3 O2 -> 2 PbO + 2 SO2", "2 PbS + 3 O2 -> 2 PbO + 2 SO2"],
];

describe("hand-pinned industrial results", () => {
    for (const [label, expected] of PINNED) {
        it(`${label}`, () => {
            const eq = label.split(": ")[1]!;
            expect(balance(eq).equation).toBe(expected);
        });
    }
});