import { describe, it, expect } from "vitest";
import { balance } from "../index";
import { writeFileSync } from "fs";

describe("verify-bosch", () => {
    const equations: string[] = [
        "2NH3 + CO2 -> NH2CONH2 + H2O",
        "NH2CONH2 + H2O -> 2NH3 + CO2",
        "NH4NO3 + CO2 + 2NH3 -> NH2CONH2 + NH4NO3 + H2O",
        "NH4NO3 + CO2 + 2NH3 -> NH2CONH2 + H2O + NH4NO3",
        "NH4NO3 -> NH3 + HNO3",
        "2NH3 + CO2 -> NH2COONH4",
        "NH2COONH4 -> NH2CONH2 + H2O",
        "NH2COONH4 + H2O -> NH4HCO3 + NH3",
        "NH2COONH4 -> NH3 + NH3 + CO2",
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
    writeFileSync("verify-bosch-results.txt", lines.join("\n"), "utf-8");
    it("writes results", () => {
        // Results file written successfully
      });
});
