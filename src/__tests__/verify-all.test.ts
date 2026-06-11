import { describe, it, expect } from "vitest";
import { balance } from "../index";
import { writeFileSync } from "fs";

describe("verify-all-targeted", () => {
    const equations: string[] = [
        "C2H4 + PdCl2 + H2O -> CH3CHO + Pd + 2HCl",
        "C2H4 + O2 -> CH3CHO",
        "C2H4 + H2O -> CH3CH2OH",
        "2C3H6 + O2 -> 2CH3COCH3",
        "C3H6 + H2O -> CH3CH(OH)CH3",
        "CH3OH + CO -> CH3COOH",
        "CH3I + CO + H2O -> CH3COOH + HI",
        "CH3I + CO -> CH3COI",
        "CH3I + CO + H2O -> CH3COOH + HI",
        "2NH3 + CO2 -> NH2CONH2 + H2O",
        "NH2CONH2 + H2O -> 2NH3 + CO2",
        "NH4NO3 + CO2 + 2NH3 -> NH2CONH2 + NH4NO3 + H2O",
        "2NH3 + CO2 -> NH2COONH4",
        "NH2COONH4 -> NH2CONH2 + H2O",
        "H2O(l) -> H2O(g)",
        "C6H12O6 + O2 -> CO2 + H2O",
        "CH4 + 2O2 -> CO2 + 2H2O",
        "C + O2 -> CO2",
        "C8H18 + O2 -> CO2 + H2O",
        "CO + 3H2 -> CH4 + H2O",
        "2CO + 4H2 -> C2H4 + 2H2O",
        "3CO + 7H2 -> C3H8 + 3H2O",
        "4CO + 9H2 -> C4H10 + 4H2O",
        "8CO + 17H2 -> C8H18 + 8H2O",
        "CH4 + H2O -> CO + 3H2",
        "C2H6 + 2H2O -> 2CO + 5H2",
        "C3H8 + 3H2O -> 3CO + 7H2",
        "C + H2O -> CO + H2",
        "C8H18 + 8H2O -> 8CO + 17H2",
        "CO + H2O -> CO2 + H2",
        "CO2 + H2 -> CO + H2O",
        "2HCl + O2 -> 2Cl2 + 2H2O",
        "4HCl + O2 -> 2Cl2 + 2H2O",
        "4HCl + O2 -> 2Cl2 + 2H2O",
        "2HCl + O2 -> Cl2 + H2O2",
        "4HCl + 5O2 -> 4ClO2 + 2H2O",
        "SO2 + NO2 -> SO3 + NO",
        "2NO + O2 -> 2NO2",
        "SO2 + H2O + NO2 -> H2SO4 + NO",
        "SO3 + H2O -> H2SO4",
        "2N2O -> 2N2 + O2",
        "2H2O2 -> 2H2O + O2",
        "2KMnO4 -> K2MnO4 + MnO2 + O2",
        "KClO3 -> KClO4 + KCl",
        "2Pb(NO3)2 -> 2PbO + 4NO2 + O2",
    ];

    const lines: string[] = [];
    for (const eq of equations) {
        try {
            const r = balance(eq);
            const all = [
                ...r.reactants.map(x => x.coefficient),
                ...r.products.map(x => x.coefficient),
            ];
            const ok = all.every(c => Number.isInteger(c) && c > 0);
            lines.push(`${ok ? "OK  " : "FAIL"}  ${eq}  =>  ${r.equation}`);
        } catch (e) {
            lines.push(`ERR  ${eq}  =>  ${(e as Error).message}`);
        }
    }
    writeFileSync("verify-all-results.txt", lines.join("\n"), "utf-8");
    it("writes results", () => {
        // Results file written successfully
      });
});
