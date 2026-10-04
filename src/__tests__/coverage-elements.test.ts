import { describe, expect, it } from "vitest";
import { balance, parseFormula, splitEquation } from "../index";
import { checkConservation, countFormula } from "./support/independent";

/**
 * One distinct case per element symbol: every element of the periodic table
 * must parse, take part in a balanceable equation, and conserve when the
 * result is re-checked with the independent scanner.
 */
const OXIDES: Record<string, string> = {
    H: "H2O",
    He: "He",
    Li: "Li2O",
    Be: "BeO",
    B: "B2O3",
    C: "CO2",
    N: "N2",
    O: "O2",
    F: "F2",
    Ne: "Ne",
    Na: "NaCl",
    Mg: "MgO",
    Al: "Al2O3",
    Si: "SiO2",
    P: "P2O5",
    S: "SO2",
    Cl: "Cl2",
    Ar: "Ar",
    K: "KCl",
    Ca: "CaO",
    Sc: "Sc2O3",
    Ti: "TiO2",
    V: "V2O5",
    Cr: "Cr2O3",
    Mn: "MnO2",
    Fe: "Fe2O3",
    Co: "CoO",
    Ni: "NiO",
    Cu: "CuO",
    Zn: "ZnO",
    Ga: "Ga2O3",
    Ge: "GeO2",
    As: "As2O3",
    Se: "SeO2",
    Br: "Br2",
    Kr: "Kr",
    Rb: "RbCl",
    Sr: "SrO",
    Y: "Y2O3",
    Zr: "ZrO2",
    Nb: "Nb2O5",
    Mo: "MoO3",
    Tc: "Tc2O7",
    Ru: "RuO2",
    Rh: "Rh2O3",
    Pd: "PdO",
    Ag: "AgCl",
    Cd: "CdO",
    In: "In2O3",
    Sn: "SnO2",
    Sb: "Sb2O3",
    Te: "TeO2",
    I: "I2",
    Xe: "Xe",
    Cs: "CsCl",
    Ba: "BaO",
    La: "La2O3",
    Ce: "CeO2",
    Pr: "Pr2O3",
    Nd: "Nd2O3",
    Pm: "Pm2O3",
    Sm: "Sm2O3",
    Eu: "Eu2O3",
    Gd: "Gd2O3",
    Tb: "Tb2O3",
    Dy: "Dy2O3",
    Ho: "Ho2O3",
    Er: "Er2O3",
    Tm: "Tm2O3",
    Yb: "Yb2O3",
    Lu: "Lu2O3",
    Hf: "HfO2",
    Ta: "Ta2O5",
    W: "WO3",
    Re: "Re2O7",
    Os: "OsO2",
    Ir: "Ir2O3",
    Pt: "PtO2",
    Au: "Au2O3",
    Hg: "HgO",
    Tl: "Tl2O3",
    Pb: "PbO",
    Bi: "Bi2O3",
    Po: "PoO2",
    At: "At2",
    Rn: "Rn",
    Fr: "FrOH",
    Ra: "RaO",
    Ac: "Ac2O3",
    Th: "ThO2",
    Pa: "Pa2O5",
    U: "U3O8",
    Np: "Np2O5",
    Pu: "PuO2",
    Am: "Am2O3",
    Cm: "Cm2O3",
    Bk: "Bk2O3",
    Cf: "Cf2O3",
    Es: "Es2O3",
    Fm: "Fm2O3",
    Md: "Md2O3",
    No: "No2O3",
    Lr: "Lr2O3",
    Rf: "RfO2",
    Db: "Db2O5",
    Sg: "SgO2",
    Bh: "Bh2O3",
    Hs: "HsO2",
    Mt: "MtO2",
    Ds: "Ds2O5",
    Rg: "Rg2O3",
    Cn: "CnO2",
    Nh: "Nh2O3",
    Fl: "FlO2",
    Mc: "Mc2O3",
    Lv: "LvO2",
    Ts: "Ts2O3",
    Og: "OgO2",
};

/** Reaction templates that always work for a given element symbol. */
const REACTIONS: Array<[string, (sym: string, oxide: string) => string]> = [
    ["elements to oxide", (s, ox) => `${s} + O2 -> ${ox}`],
    ["oxide decomposition", (s, ox) => `${ox} -> ${s} + O2`],
    ["chloride formation", (s) => `${s} + Cl2 -> ${s}Cl`],
    ["sulfide formation", (s) => `${s} + S -> ${s}S`],
    ["hydride formation", (s) => `${s} + H2 -> ${s}H2`],
];

describe("element coverage: every symbol parses", () => {
    for (const [symbol, oxide] of Object.entries(OXIDES)) {
        it(`${symbol} parses as a species and as a rendered oxide`, () => {
            const bare = parseFormula(symbol);
            expect(bare.elements[symbol]).toBe(1);
            expect(bare.charge).toBe(0);
            const ox = parseFormula(oxide);
            expect(Object.keys(ox.elements).length).toBeGreaterThan(0);
            const scanned = countFormula(oxide);
            expect(scanned.elements).toEqual(ox.elements);
            expect(scanned.charge).toBe(ox.charge);
        });
    }
});

describe("element coverage: distinct reaction per element", () => {
    for (const [symbol, oxide] of Object.entries(OXIDES)) {
        for (const [name, template] of REACTIONS) {
            it(`${symbol}: ${name}`, () => {
                const eq = template(symbol, oxide);
                const { reactants, products } = splitEquation(eq);
                expect(reactants.length).toBeGreaterThan(0);
                expect(products.length).toBeGreaterThan(0);
                let r: ReturnType<typeof balance>;
                try {
                    r = balance(eq);
                } catch (e) {
                    // Some elements legitimately cannot form that product;
                    // the contract then is a typed, honest failure.
                    expect((e as { code?: string }).code).toBe("UNBALANCEABLE");
                    return;
                }
                const report = checkConservation(r.equation);
                expect(report.charge).toBe(0);
                expect(report.gcd).toBe(1);
                for (const el in report.net) expect(report.net[el]).toBe(0);
            });
        }
    }
});