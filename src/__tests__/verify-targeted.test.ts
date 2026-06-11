import { describe, it, expect } from "vitest";
import { balance } from "../index";
import { writeFileSync } from "fs";

describe("verify-targeted", () => {
    const equations: string[] = [
        "CH3OH + CO -> CH3COOH",
        "CH3OH + CO + CH3I -> CH3COOH + HI",
        "NH4NO3 + CO2 + 2NH3 -> NH2CONH2 + NH4NO3",
        "CH3I + CO -> CH3COI",
        "CH3I + CO + H2O -> CH3COOH + HI",
        "NH2COONH4 -> NH2CONH2 + H2O",
        "2NH3 + CO2 -> NH2COONH4",
        "2HCl + O2 -> Cl2 + H2O2",
        "HCl + O2 -> ClO2 + H2O",
        "SO2 + H2O + NO2 -> H2SO4 + NO",
    ];

    const lines: string[] = [];
    for (const eq of equations) {
        try {
            const r = balance(eq);
            lines.push(`${eq}  =>  ${r.equation}`);
        } catch (e) {
            lines.push(`${eq}  =>  ERROR: ${(e as Error).message}`);
        }
    }
    writeFileSync("verify-results.txt", lines.join("\n"), "utf-8");
    it("writes results", () => {
        expect(true).toBe(true);
    });
});
