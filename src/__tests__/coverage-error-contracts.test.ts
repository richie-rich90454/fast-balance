import { describe, expect, it } from "vitest";
import { balance, BalanceError, isBalanced, splitEquation } from "../index";

/**
 * Error-contract coverage: every input below is distinct and must fail in
 * the documented way, with a stable code and a useful message.
 */

const PARSE_ERRORS: Array<[string, string]> = [
    ["", "empty input"],
    ["   ", "whitespace only"],
    ["H2O", "no arrow"],
    ["->", "arrow only"],
    ["H2O ->", "empty right side"],
    ["-> H2O", "empty left side"],
    ["H2O -> H2O -> H2O", "two arrows"],
    ["H2O --", "dash without arrow head"],
    ["H2O ~> H2O", "tilde arrow"],
    ["H2O =>> H2O", "malformed fat arrow"],
    ["$$$ -> H2O", "non-chemical left"],
    ["H2O -> $$$", "non-chemical right"],
    ["12345", "digits only"],
    ["(H2O -> H2", "unclosed parenthesis"],
    ["H2O) -> H2", "unopened parenthesis"],
    ["Ca(OH -> CaO", "unclosed group"],
    ["[Fe(CN)6 -> Fe", "unclosed bracket"],
    ["H2O + -> H2O", "trailing plus"],
    ["+ H2O -> H2O", "leading plus"],
    ["H2O + + H2 -> H2O", "double plus"],
    ["n", "bare neutron"],
    ["p", "bare proton"],
];

const UNKNOWN_ELEMENT_ERRORS: string[] = [
    "Zz9 + O2 -> ZzO",
    "Xx2 + O2 -> H2O",
    "Jq + O2 -> JqO",
    "Qq + O2 -> QqO",
];

const UNBALANCEABLE: string[] = [
    "H2O -> H2",
    "Fe -> Au",
    "H2O -> CH4",
    "CaCO3 -> Fe2O3",
    "Na -> Cl2",
    "MgO -> Al2O3",
    "CuSO4 -> NaNO3",
    "He -> H",
    "Ne -> He",
    "Ar -> Ne",
    "Kr -> Ar",
    "Xe -> Kr",
    "Rn -> Xe",
    "Og -> Rn",
    "Ts -> Og",
    "Lv -> Ts",
    "Mc -> Lv",
    "Fl -> Mc",
    "Nh -> Fl",
    "Cn -> Nh",
    "Rg -> Cn",
    "Db -> Rg",
    "Sg -> Db",
    "Bh -> Sg",
    "Hs -> Bh",
    "Mt -> Hs",
    "Ds -> Mt",
    // Obsolete symbols canonicalise to their modern spelling, so these are
    // pairs of distinct elements and cannot conserve each other.
    "Uun -> Rg",
    "Uuu -> Cn",
    "Uub -> Nh",
    "Uut -> Fl",
    "Uuq -> Mc",
    "Uup -> Lv",
    "Uuh -> Ts",
    "Uus -> Og",
    "Uuo -> Lv",
    "ATP -> ADP",
    "D + T -> H2",
    "FeS2 -> FeSO4",
    "N2 -> H2",
    "CO2 -> CO",
    "H2 -> He",
    "O2 -> F2",
    "N2 -> O2",
    "H2O -> H2O2",
    "CH4 -> CH3OH",
    "C6H6 -> C6H12",
    "NaCl -> NaBr",
    "CaCO3 -> CaCl2",
];

describe("parse failures carry the PARSE_ERROR code", () => {
    for (const [input, label] of PARSE_ERRORS) {
        it(`${label}: ${JSON.stringify(input)}`, () => {
            let err: unknown = null;
            try {
                balance(input);
            } catch (e) {
                err = e;
            }
            expect(err).toBeInstanceOf(BalanceError);
            expect((err as BalanceError).code).toBe("PARSE_ERROR");
            expect((err as BalanceError).message.length).toBeGreaterThan(0);
            expect(isBalanced(input)).toBe(false);
        });
    }
});

describe("unknown symbols carry the UNKNOWN_ELEMENT code", () => {
    for (const input of UNKNOWN_ELEMENT_ERRORS) {
        it(input, () => {
            let err: unknown = null;
            try {
                balance(input);
            } catch (e) {
                err = e;
            }
            expect(err).toBeInstanceOf(BalanceError);
            expect((err as BalanceError).code).toBe("UNKNOWN_ELEMENT");
            expect((err as BalanceError).message).toMatch(/unknown/i);
            expect(isBalanced(input)).toBe(false);
        });
    }
});

describe("unbalanceable systems carry the UNBALANCEABLE code", () => {
    for (const input of UNBALANCEABLE) {
        it(input, () => {
            let err: unknown = null;
            try {
                balance(input);
            } catch (e) {
                err = e;
            }
            expect(err).toBeInstanceOf(BalanceError);
            expect((err as BalanceError).code).toBe("UNBALANCEABLE");
            expect((err as BalanceError).message.length).toBeGreaterThan(0);
            expect(isBalanced(input)).toBe(false);
        });
    }
});

describe("every failure is a BalanceError with a documented code", () => {
    const ALLOWED = new Set([
        "PARSE_ERROR",
        "UNKNOWN_ELEMENT",
        "AMBIGUOUS_CHARGE",
        "UNBALANCEABLE",
        "UNDERDETERMINED",
        "INVALID_ARGUMENT",
        "OVERFLOW",
    ]);
    const ALL = [...PARSE_ERRORS.map((p) => p[0]), ...UNKNOWN_ELEMENT_ERRORS, ...UNBALANCEABLE];
    for (const input of ALL) {
        it(`${JSON.stringify(input)} uses a known code`, () => {
            let code: string | undefined;
            try {
                balance(input);
            } catch (e) {
                code = (e as BalanceError).code;
            }
            expect(code).toBeDefined();
            expect(ALLOWED.has(code!)).toBe(true);
        });
    }
});

describe("errors name BalanceError and carry a message", () => {
    const ALL = [...PARSE_ERRORS.map((p) => p[0]), ...UNKNOWN_ELEMENT_ERRORS, ...UNBALANCEABLE];
    for (const input of ALL) {
        it(`${JSON.stringify(input)} is a well-formed Error`, () => {
            let err: unknown = null;
            try {
                balance(input);
            } catch (e) {
                err = e;
            }
            expect(err).toBeInstanceOf(Error);
            const be = err as BalanceError;
            expect(be.name).toBe("BalanceError");
            expect(typeof be.message).toBe("string");
            expect(typeof be.stack).toBe("string");
        });
    }
});

describe("failures are deterministic", () => {
    const ALL = [...PARSE_ERRORS.map((p) => p[0]), ...UNKNOWN_ELEMENT_ERRORS, ...UNBALANCEABLE];
    for (const input of ALL) {
        it(`${JSON.stringify(input)} throws the same way every time`, () => {
            const messages: string[] = [];
            for (let i = 0; i < 3; i++) {
                try {
                    balance(input);
                    messages.push("no throw");
                } catch (e) {
                    messages.push(`${(e as BalanceError).code}:${(e as BalanceError).message}`);
                }
            }
            expect(messages[1]).toBe(messages[0]);
            expect(messages[2]).toBe(messages[0]);
        });
    }
});

describe("the failing side is reported by splitEquation when parsing gets that far", () => {
    const CASES: Array<[string, string]> = [
        ["-> H2O", "Left side of equation is empty"],
        ["H2O ->", "Right side of equation is empty"],
    ];
    for (const [input, message] of CASES) {
        it(`${JSON.stringify(input)} reports ${message}`, () => {
            expect(() => splitEquation(input)).toThrow(message);
        });
    }
});

describe("missing arrows are reported explicitly", () => {
    const CASES = ["H2O", "H2 + O2", "CH4 O2 CO2 H2O", "Fe", "NaCl", "CuSO4"];
    for (const input of CASES) {
        it(`${JSON.stringify(input)} reports a missing arrow`, () => {
            let err: unknown = null;
            try {
                balance(input);
            } catch (e) {
                err = e;
            }
            expect(err).toBeInstanceOf(BalanceError);
            expect((err as BalanceError).message).toMatch(/arrow/i);
        });
    }
});

describe("unknown-element messages quote the offending symbol", () => {
    for (const input of UNKNOWN_ELEMENT_ERRORS) {
        it(`${input} names the symbol`, () => {
            let message = "";
            try {
                balance(input);
            } catch (e) {
                message = (e as BalanceError).message;
            }
            const symbols = input.split(/[ +]+/)[0]!;
            expect(message).toContain(symbols.replace(/\d+/g, ""));
        });
    }
});

describe("no partial result leaks on failure", () => {
    const ALL = [...PARSE_ERRORS.map((p) => p[0]), ...UNKNOWN_ELEMENT_ERRORS, ...UNBALANCEABLE];
    for (const input of ALL) {
        it(`${JSON.stringify(input)} yields no result object`, () => {
            let result: unknown = "unset";
            try {
                result = balance(input);
            } catch {
                result = null;
            }
            expect(result).toBeNull();
        });
    }
});