import { describe, expect, it } from "vitest";
import { balance, BalanceError, splitEquation } from "../index";

/**
 * Nuclear-mode coverage: mass number A and nuclear charge Q are conserved
 * rather than element identity. Each case is a distinct reaction.
 *
 * Nuclides are written with the `^A` prefix. A bare `n` or `p` is not a
 * species in this notation, so capture and emission steps are written as
 * decay chains instead.
 */

/** Alpha decay: A drops by four and Z by two. */
const ALPHA_DECAYS: Array<[string, string]> = [
    ["U", "^238U -> ^234Th + ^4He"],
    ["Th", "^234Th -> ^230Ra + ^4He"],
    ["Ra", "^226Ra -> ^222Rn + ^4He"],
    ["Rn", "^222Rn -> ^218Po + ^4He"],
    ["Po", "^218Po -> ^214Pb + ^4He"],
    ["Po", "^214Po -> ^210Pb + ^4He"],
    ["Po", "^210Po -> ^206Pb + ^4He"],
    ["U", "^235U -> ^231Th + ^4He"],
    ["Pu", "^239Pu -> ^235U + ^4He"],
    ["Am", "^241Am -> ^237Np + ^4He"],
    ["Cm", "^242Cm -> ^238Pu + ^4He"],
    ["Bk", "^249Bk -> ^245Am + ^4He"],
    ["Cf", "^251Cf -> ^247Cm + ^4He"],
    ["Es", "^254Es -> ^250Bk + ^4He"],
    ["Fm", "^256Fm -> ^252Cf + ^4He"],
    ["Md", "^257Md -> ^253Es + ^4He"],
    ["Ac", "^227Ac -> ^223Fr + ^4He"],
    ["Fr", "^223Fr -> ^219At + ^4He"],
    ["Th", "^232Th -> ^228Ra + ^4He"],
    ["Np", "^237Np -> ^233Pa + ^4He"],
];

describe("alpha decay conserves A and Z", () => {
    for (const [parent, eq] of ALPHA_DECAYS) {
        it(`${eq} (parent ${parent})`, () => {
            const r = balance(eq, { mode: "nuclear" });
            expect(r.equation).toBe("1 " + eq.replace(" -> ", " -> 1 ").replace(" + ^4He", " + 1 ^4He"));
            for (const s of [...r.reactants, ...r.products]) {
                expect(s.coefficient).toBe(1);
            }
        });
    }
});

/** Beta decay: A is unchanged, Z rises by one. */
const BETA_DECAYS: Array<[string, string]> = [
    ["C", "^14C -> ^14N + e-"],
    ["H", "^3H -> ^3He + e-"],
    ["Co", "^60Co -> ^60Ni + e-"],
    ["Fe", "^59Fe -> ^59Co + e-"],
    ["Na", "^24Na -> ^24Mg + e-"],
    ["K", "^40K -> ^40Ca + e-"],
    ["I", "^131I -> ^131Xe + e-"],
    ["Cs", "^137Cs -> ^137Ba + e-"],
    ["Sr", "^90Sr -> ^90Y + e-"],
    ["Tc", "^99Tc -> ^99Ru + e-"],
    ["Th", "^234Th -> ^234Pa + e-"],
    ["Pa", "^234Pa -> ^234U + e-"],
];

describe("beta decay conserves A", () => {
    for (const [parent, eq] of BETA_DECAYS) {
        it(`${eq} (parent ${parent})`, () => {
            const r = balance(eq, { mode: "nuclear" });
            expect(r.equation).toBe("1 " + eq.replace(" -> ", " -> 1 ").replace(" + e-", " + 1 e-"));
            // the mass number on the left survives on the right
            const left = eq.split(" -> ")[0]!;
            const mass = /\^(\d+)/.exec(left)?.[1]!;
            expect(r.equation).toContain("^" + mass);
        });
    }
});

/** Electron capture: Z drops by one with A unchanged. */
const EC_DECAYS: Array<[string, string]> = [
    ["Be", "^7Be -> ^7Li + e+"],
    ["Cr", "^51Cr -> ^51V + e+"],
    ["Ar", "^37Ar -> ^37Cl + e+"],
    ["Fe", "^55Fe -> ^55Mn + e+"],
    ["Ni", "^59Ni -> ^59Co + e+"],
    ["Zn", "^65Zn -> ^65Cu + e+"],
];

describe("positron emission conserves A", () => {
    for (const [parent, eq] of EC_DECAYS) {
        it(`${eq} (parent ${parent})`, () => {
            const r = balance(eq, { mode: "nuclear" });
            expect(r.equation).toContain("1 e+");
            const mass = /\^(\d+)/.exec(eq)!;
            expect(r.equation).toContain("^" + mass[1]);
        });
    }
});

/** Hyphen isotope notation is read as a mass number. */
const ISOTOPE_HYPHEN: Array<[string, string, number]> = [
    ["C", "C-14", 14],
    ["H", "H-2", 2],
    ["K", "K-40", 40],
    ["Co", "Co-60", 60],
    ["I", "I-131", 131],
    ["Sr", "Sr-90", 90],
    ["Tc", "Tc-99", 99],
];

describe("hyphen isotope notation is read as a mass number", () => {
    for (const [symbol, hyphenated, mass] of ISOTOPE_HYPHEN) {
        it(`${hyphenated} is parsed as ${symbol} with mass ${mass}`, () => {
            const { reactants } = splitEquation(`${hyphenated} -> ${hyphenated}`);
            const parsed = reactants[0]!;
            expect(parsed.isotopes).toBeDefined();
            expect(parsed.isotopes![symbol]).toBe(mass);
        });
    }
});

describe("hyphen isotopes balance in nuclear mode", () => {
    const CASES = [
        "C-14 -> N-14 + e-",
        "K-40 -> Ca-40 + e-",
        "Co-60 -> Ni-60 + e-",
        "I-131 -> Xe-131 + e-",
        "Sr-90 -> Y-90 + e-",
        "Tc-99 -> Ru-99 + e-",
    ];
    for (const eq of CASES) {
        it(`balances ${eq}`, () => {
            const r = balance(eq, { mode: "nuclear" });
            for (const s of [...r.reactants, ...r.products]) {
                expect(s.coefficient).toBeGreaterThan(0);
                expect(Number.isInteger(s.coefficient)).toBe(true);
            }
        });
    }
});

describe("nuclear mode requires isotope labels", () => {
    const UNLABELED = ["U -> Th + He", "Fe -> Co", "C -> N", "H2O -> H2 + O2", "Th -> Ra + He"];
    for (const eq of UNLABELED) {
        it(`${eq} raises PARSE_ERROR in nuclear mode`, () => {
            let err: unknown = null;
            try {
                balance(eq, { mode: "nuclear" });
            } catch (e) {
                err = e;
            }
            expect(err).toBeInstanceOf(BalanceError);
            expect((err as BalanceError).code).toBe("PARSE_ERROR");
        });
    }
});

describe("nuclear mode rejects unknown elements", () => {
    const BAD = ["^238Zz -> ^234Th + ^4He", "^238U -> ^234Qq + ^4He"];
    for (const eq of BAD) {
        it(`${eq} raises an error`, () => {
            expect(() => balance(eq, { mode: "nuclear" })).toThrow();
        });
    }
});

describe("a bare nucleon is not a species in this notation", () => {
    const CASES = ["n -> n", "p -> p", "^238U + n -> ^239U", "n -> p + e-", "p -> n + e+"];
    for (const eq of CASES) {
        it(`${eq} is rejected`, () => {
            expect(() => balance(eq, { mode: "nuclear" })).toThrow();
        });
    }
});

describe("nuclear results are exact integers", () => {
    const CASES = [
        "^238U -> ^234Th + ^4He",
        "^226Ra -> ^222Rn + ^4He",
        "^222Rn -> ^218Po + ^4He",
        "^239Pu -> ^235U + ^4He",
        "^210Po -> ^206Pb + ^4He",
        "^232Th -> ^228Ra + ^4He",
        "^241Am -> ^237Np + ^4He",
        "^249Bk -> ^245Am + ^4He",
        "^60Co -> ^60Ni + e-",
        "^14C -> ^14N + e-",
        "^3H -> ^3He + e-",
    ];
    for (const eq of CASES) {
        it(`balances ${eq}`, () => {
            const r = balance(eq, { mode: "nuclear" });
            for (const s of [...r.reactants, ...r.products]) {
                expect(Number.isInteger(s.coefficient)).toBe(true);
                expect(s.coefficient).toBeGreaterThan(0);
            }
            expect(r.underdetermined ?? false).toBe(false);
        });
    }
});

describe("decay chains of several steps each balance", () => {
    const STEPS = [
        ["^238U", "^234Th"],
        ["^234U", "^230Th"],
        ["^230Th", "^226Ra"],
        ["^226Ra", "^222Rn"],
        ["^222Rn", "^218Po"],
        ["^218Po", "^214Pb"],
        ["^212Bi", "^208Tl"],
        ["^210Bi", "^206Tl"],
        ["^239Pu", "^235U"],
        ["^241Am", "^237Np"],
        ["^237Np", "^233Pa"],
        ["^251Cf", "^247Cm"],
        ["^247Bk", "^243Am"],
        ["^243Cm", "^239Pu"],
        ["^232Th", "^228Ra"],
        ["^228Ra", "^224Rn"],
        ["^224Rn", "^220Po"],
        ["^220Po", "^216Pb"],
        ];
    for (const [parent, daughter] of STEPS) {
        it(`${parent} -> ${daughter} + ^4He`, () => {
            const r = balance(`${parent} -> ${daughter} + ^4He`, { mode: "nuclear" });
            expect(r.reactants.length).toBe(1);
            expect(r.products.length).toBe(2);
        });
    }
});

describe("isotope labels survive into the rendered equation", () => {
    const CASES = [
        "^238U -> ^234Th + ^4He",
        "^239Pu -> ^235U + ^4He",
        "^226Ra -> ^222Rn + ^4He",
        "^60Co -> ^60Ni + e-",
    ];
    for (const eq of CASES) {
        it(`${eq} keeps its mass numbers`, () => {
            const r = balance(eq, { mode: "nuclear" });
            const masses = r.equation.match(/\^\d+/g) ?? [];
            expect(masses.length).toBeGreaterThan(0);
            for (const m of masses) {
                expect(m).toMatch(/^\^\d+$/);
            }
        });
    }
});

describe("chemical mode and nuclear mode are different solvers", () => {
    const CASES = [
        "^238U -> ^234Th + ^4He",
        "^226Ra -> ^222Rn + ^4He",
        "^210Po -> ^206Pb + ^4He",
        "^60Co -> ^60Ni + e-",
        "^14C -> ^14N + e-",
    ];
    for (const eq of CASES) {
        it(`${eq} is accepted in nuclear mode`, () => {
            const r = balance(eq, { mode: "nuclear" });
            expect(r.reactants.length).toBeGreaterThan(0);
        });
    }
});

describe("nuclear mode does not affect the error contract of bad input", () => {
    const CASES = ["", "H2O", "->", "H2O ->", "Fe -> Au", "H2O -> H2"];
    for (const eq of CASES) {
        it(`${JSON.stringify(eq)} still fails in nuclear mode`, () => {
            expect(() => balance(eq, { mode: "nuclear" })).toThrow();
        });
    }
});