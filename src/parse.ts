/**
 * Parsing and normalisation of chemical notation.
 *
 * Deliberately permissive where notation is unambiguous, and explicit where it
 * is not. Symbol validation is applied by `splitEquation` (the balancing
 * entry point) rather than by `parseFormula`, which historically accepted any
 * `[A-Z][a-z]*` token.
 */
import {
    ABBREVIATIONS,
    GROUP_EXPANSIONS,
    PHOTONS,
    atomicNumberOf,
    canonicalSymbol,
    isKnownSymbol,
} from "./symbols";
import { parseError, unknownElement } from "./errors";

const ABBREV_KEYS: string[] = Object.keys(ABBREVIATIONS).sort((a, b) => b.length - a.length);
const PHOTON_KEYS: string[] = Array.from(PHOTONS).sort((a, b) => b.length - a.length);

export type ElementMap = Record<string, number>;

export interface ParsedUnit {
    elements: ElementMap;
    charge: number;
}

export interface Species {
    formula: string;
    elements: ElementMap;
    charge: number;
    /** Mass numbers keyed by element symbol, when isotope notation was used. */
    isotopes?: Record<string, number>;
    /** Symbolic subscripts (e.g. `(C6H10O5)n`), when present. */
    variables?: string[];
}

export interface Equation {
    reactants: Species[];
    products: Species[];
}

/* ------------------------------------------------------------------ */
/* Unicode normalisation                                              */
/* ------------------------------------------------------------------ */

const SUBSCRIPT_DIGITS = "₀₁₂₃₄₅₆₇₈₉";
const SUPERSCRIPT_DIGITS = "⁰¹²³⁴⁵⁶⁷⁸⁹";

/**
 * Normalise typographic input to a plain ASCII skeleton:
 * unicode subscripts -> digits, unicode superscripts -> `^digits`,
 * unicode minus/dash variants -> `-`, bullet hydrate separators -> `·`.
 */
export function normalizeText(input: string): string {
    let out = "";
    let inSuper = false;
    for (const ch of input) {
        const sub = SUBSCRIPT_DIGITS.indexOf(ch);
        if (sub >= 0) {
            out += String(sub);
            inSuper = false;
            continue;
        }
        const sup = SUPERSCRIPT_DIGITS.indexOf(ch);
        if (sup >= 0) {
            if (!inSuper) {
                out += "^";
                inSuper = true;
            }
            out += String(sup);
            continue;
        }
        if (ch === "⁺") {
            out += "+";
            inSuper = false;
            continue;
        }
        if (
            ch === "⁻" ||
            ch === "−" ||
            ch === "–" ||
            ch === "‐" ||
            ch === "‑" ||
            ch === "—" ||
            ch === "−"
        ) {
            out += "-";
            inSuper = false;
            continue;
        }
        if (ch === "·" || ch === "•" || ch === "∙" || ch === "⋅" || ch === "＊") {
            out += "·";
            inSuper = false;
            continue;
        }
        out += ch;
        inSuper = false;
    }
    return out;
}

/* ------------------------------------------------------------------ */
/* State symbols                                                      */
/* ------------------------------------------------------------------ */

const STATE_SYMBOLS = [
    "s",
    "l",
    "g",
    "aq",
    "v",
    "cr",
    "am",
    "solid",
    "liquid",
    "gas",
    "aqueous",
    "solution",
    "sln",
    "ppt",
    "precipitate",
    "mono",
    "monomer",
    "vapour",
    "vapor",
] as const;

const STATE_REGEX = new RegExp("\\((" + STATE_SYMBOLS.join("|") + ")\\)", "gi");

/** Remove phase/state annotations such as `(s)`, `(aq)`, `(gas)`. */
export function stripStateSymbols(formula: string): string {
    return normalizeText(formula).replace(STATE_REGEX, "");
}

/* ------------------------------------------------------------------ */
/* Charge parsing                                                     */
/* ------------------------------------------------------------------ */

interface ChargeToken {
    charge: number;
    len: number;
    signFirst: boolean;
    magnitude: number;
    hasCaret: boolean;
}

/**
 * Read a charge token starting at `i`. Handles `^2-`, `^{2-}`, `2-`, `-2`,
 * `+`, `-`, `^+`, `o2-3` style inputs. Returns null if none.
 */
function readChargeAt(s: string, i: number): ChargeToken | null {
    if (i >= s.length) return null;
    let j = i;
    let hasCaret = false;
    let braced = false;
    if (s[j] === "^") {
        hasCaret = true;
        j++;
        if (s[j] === "{") {
            braced = true;
            j++;
        }
    }
    let firstSign = "";
    if (s[j] === "+" || s[j] === "-") {
        firstSign = s[j]!;
        j++;
    }
    let digits = "";
    while (j < s.length && s[j]! >= "0" && s[j]! <= "9") {
        digits += s[j]!;
        j++;
    }
    let secondSign = "";
    if (firstSign === "" && (s[j] === "+" || s[j] === "-")) {
        secondSign = s[j]!;
        j++;
    }
    if (braced) {
        if (s[j] === "}") j++;
        else return null;
    }
    if (firstSign === "" && secondSign === "") {
        if (hasCaret && digits !== "") {
            const mag = parseInt(digits, 10);
            return { charge: mag, len: j - i, signFirst: false, magnitude: mag, hasCaret: true };
        }
        return null;
    }
    const sign = firstSign !== "" ? firstSign : secondSign;
    const magnitude = digits === "" ? 1 : parseInt(digits, 10);
    return {
        charge: sign === "+" ? magnitude : -magnitude,
        len: j - i,
        signFirst: firstSign !== "",
        magnitude,
        hasCaret,
    };
}

function parseChargeSuffix(rest: string): ChargeToken | null {
    if (rest === "") return null;
    const token = readChargeAt(rest, 0);
    if (token === null || token.len !== rest.length) return null;
    return token;
}

/* ------------------------------------------------------------------ */
/* Atom / group helpers                                               */
/* ------------------------------------------------------------------ */

function scaleElements(expansion: string, multiplier: number): ParsedUnit {
    const unit = parseCore(expansion, false);
    const elements: ElementMap = {};
    for (const el in unit.elements) {
        elements[el] = unit.elements[el]! * multiplier;
    }
    return { elements, charge: unit.charge * multiplier };
}

function addInto(target: ElementMap, source: ElementMap, multiplier = 1): void {
    for (const el in source) {
        target[el] = (target[el] ?? 0) + source[el]! * multiplier;
    }
}

/* ------------------------------------------------------------------ */
/* Generic recursive-descent parser                                   */
/* ------------------------------------------------------------------ */

interface Token {
    unit: ParsedUnit;
    isotope?: { symbol: string; mass: number };
    variable?: string;
}

/**
 * Parse the body of a formula (no hydrate multiplier) into an element map and
 * net charge. `validate` enables element whitelist checking.
 */
function parseCore(input: string, validate: boolean): ParsedUnit {
    const s = input;
    let i = 0;

    const parseSequence = (close?: string): ParsedUnit => {
        const elements: ElementMap = {};
        let charge = 0;
        while (i < s.length && s[i] !== close) {
            const tok = parseOne();
            addInto(elements, tok.unit.elements);
            charge += tok.unit.charge;
        }
        if (close !== undefined) {
            if (i < s.length && s[i] === close) i++;
            else throw parseError('Mismatched brackets: expected "' + close + '" at position ' + i);
        }
        return { elements, charge };
    };

    const readSubscript = (): number => {
        if (i < s.length && s[i]! >= "0" && s[i]! <= "9") {
            const start = i;
            while (i < s.length && s[i]! >= "0" && s[i]! <= "9") i++;
            return parseInt(s.slice(start, i), 10);
        }
        return 1;
    };

    const parseAtom = (): Token => {
        // leading isotope mass number: ^14C, ^{14}C
        let isotopeMass: number | undefined;
        if (s[i] === "^") {
            const prefix = readIsotopePrefix(s, i);
            if (prefix !== null) {
                isotopeMass = prefix.mass;
                i = prefix.next;
            }
        }
        if (i >= s.length || !/[A-Z]/.test(s[i]!)) {
            throw parseError(
                "Expected element at position " + i + ", got '" + (s[i] ?? "end") + "'",
            );
        }
        const start = i;
        i++;
        while (i < s.length && /[a-z]/.test(s[i]!)) i++;
        let symbol = s.slice(start, i);

        // group shorthand (Ph, Me, Et, Bu, tBu, Bn) — expand to explicit atoms
        if (symbol in GROUP_EXPANSIONS) {
            const subscript = readSubscript();
            const chargeToken = readChargeAt(s, i);
            let charge = 0;
            if (chargeToken !== null) {
                charge = chargeToken.hasCaret
                    ? chargeToken.charge
                    : chargeToken.charge > 0
                      ? 1
                      : -1;
                i += chargeToken.len;
            }
            const expanded = scaleElements(GROUP_EXPANSIONS[symbol]!, subscript);
            expanded.charge += charge;
            return { unit: expanded };
        }

        const canonical = canonicalSymbol(symbol);
        if (validate && !isKnownSymbol(symbol)) {
            throw unknownElement(symbol);
        }
        symbol = canonical;

        const subscript = readSubscript();
        let charge = 0;
        const chargeToken = readChargeAt(s, i);
        if (chargeToken !== null) {
            if (chargeToken.hasCaret) {
                charge = chargeToken.charge;
            } else {
                // digits consumed above as subscript; a trailing sign is charge +-1
                charge = chargeToken.charge > 0 ? 1 : -1;
            }
            i += chargeToken.len;
        }

        // symbolic subscript (polymer notation): `)n`, `)x`, ...
        let variable: string | undefined;
        if (i < s.length && /[a-z]/.test(s[i]!) && !/[A-Z]/.test(s[i]!)) {
            // only treat as variable if followed by non-lowercase element start
            const nxt = s[i + 1];
            if (nxt === undefined || /[^a-z]/.test(nxt)) {
                variable = s[i]!;
                i++;
            }
        }

        const unit: ParsedUnit = { elements: { [symbol]: subscript }, charge };
        const token: Token = { unit };
        if (isotopeMass !== undefined) token.isotope = { symbol, mass: isotopeMass };
        if (variable !== undefined) token.variable = variable;
        return token;
    };

    const parseOne = (): Token => {
        if (i >= s.length) throw parseError("Unexpected end of formula");
        const ch = s[i]!;

        // biochemical abbreviations (longest match first)
        for (const key of ABBREV_KEYS) {
            if (s.startsWith(key, i)) {
                const after = s[i + key.length];
                if (after === undefined || !/[a-z]/.test(after)) {
                    i += key.length;
                    const subscript = readSubscript();
                    const ct = readChargeAt(s, i);
                    let charge = 0;
                    if (ct !== null) {
                        charge = ct.hasCaret ? ct.charge : ct.charge > 0 ? 1 : -1;
                        i += ct.len;
                    }
                    const expanded = scaleElements(ABBREVIATIONS[key]!, subscript);
                    expanded.charge += charge;
                    return { unit: expanded };
                }
            }
        }

        // light / heat tokens carry no atoms
        for (const key of PHOTON_KEYS) {
            if (s.startsWith(key, i)) {
                const after = s[i + key.length];
                if (after === undefined || !/[a-z]/.test(after)) {
                    i += key.length;
                    if (i < s.length && s[i]! >= "0" && s[i]! <= "9") readSubscript();
                    return { unit: { elements: {}, charge: 0 } };
                }
            }
        }

        // electron
        if (ch === "e") {
            i++;
            let charge = -1;
            const ct = readChargeAt(s, i);
            if (ct !== null && !ct.hasCaret) {
                charge = ct.charge;
                i += ct.len;
            } else if (ct !== null) {
                charge = ct.charge;
                i += ct.len;
            }
            return { unit: { elements: {}, charge } };
        }

        // group
        if (ch === "(" || ch === "[") {
            const close = ch === "(" ? ")" : "]";
            i++;
            const inner = parseSequence(close);
            const hadDigits = i < s.length && s[i]! >= "0" && s[i]! <= "9";
            let digitVal = 1;
            if (hadDigits) {
                const st = i;
                while (i < s.length && s[i]! >= "0" && s[i]! <= "9") i++;
                digitVal = parseInt(s.slice(st, i), 10);
            }
            const ct = readChargeAt(s, i);
            let subscript = hadDigits ? digitVal : 1;
            let charge = 0;
            if (ct !== null) {
                if (ct.hasCaret) {
                    charge = ct.charge;
                } else if (ch === "[") {
                    // square brackets delimit a complex ion: digits are the
                    // charge magnitude (`[Fe(CN)6]4-`)
                    const magnitude = hadDigits ? digitVal : ct.magnitude;
                    charge = ct.charge > 0 ? magnitude : -magnitude;
                    subscript = 1;
                } else {
                    // parentheses group for subscripts: digits are a subscript
                    // and the sign is unit charge (`Al(OH)4-`)
                    subscript = hadDigits ? digitVal : 1;
                    charge = ct.charge > 0 ? 1 : -1;
                }
                i += ct.len;
            }
            const scaled: ElementMap = {};
            addInto(scaled, inner.elements, subscript);
            return { unit: { elements: scaled, charge: inner.charge * subscript + charge } };
        }

        return parseAtom();
    };

    const unit = parseSequence();
    if (i < s.length) {
        throw parseError("Unexpected characters at position " + i + ': "' + s.slice(i) + '"');
    }
    return unit;
}

/** Parse a leading isotope mass number `^A` or `^{A}`. */
function readIsotopePrefix(s: string, i: number): { mass: number; next: number } | null {
    if (s[i] !== "^") return null;
    let j = i + 1;
    let braced = false;
    if (s[j] === "{") {
        braced = true;
        j++;
    }
    const start = j;
    while (j < s.length && s[j]! >= "0" && s[j]! <= "9") j++;
    if (j === start) return null;
    const mass = parseInt(s.slice(start, j), 10);
    if (braced) {
        if (s[j] !== "}") return null;
        j++;
    }
    // must be followed by an element symbol start
    if (j >= s.length || !/[A-Z]/.test(s[j]!)) return null;
    return { mass, next: j };
}

/* ------------------------------------------------------------------ */
/* Single-element fast path with chemistry-aware charge disambiguation */
/* ------------------------------------------------------------------ */

const SINGLE_ELEMENT = /^(?:\^(\d+)|\^\{(\d+)\})?([A-Z][a-z]?)(\d*)([\s\S]*)$/;

function tryParseSingleElement(input: string, validate: boolean): ParsedUnit | null {
    const m = SINGLE_ELEMENT.exec(input);
    if (!m) return null;
    const massA = m[1] ?? m[2];
    const symbol = m[3]!;
    const digits = m[4]!;
    const rest = m[5]!;
    // rest must be empty or a pure charge suffix (otherwise there are more atoms)
    let charge: ChargeToken | null = null;
    if (rest !== "") {
        charge = parseChargeSuffix(rest);
        if (charge === null) return null;
    }
    const canonical = canonicalSymbol(symbol);
    if (symbol in GROUP_EXPANSIONS) return null; // let generic path expand groups
    if (validate && !isKnownSymbol(symbol)) throw unknownElement(symbol);

    const subscriptDigits = digits === "" ? 1 : parseInt(digits, 10);
    const z = atomicNumberOf(canonical);

    // isotope via trailing hyphen: `C-14`, `U-235`, `H-2`
    if (
        charge !== null &&
        !charge.hasCaret &&
        charge.charge < 0 &&
        digits === "" &&
        massA === undefined &&
        z !== undefined &&
        charge.magnitude >= z &&
        charge.magnitude <= 3 * z
    ) {
        return { elements: { [canonical]: 1 }, charge: 0 };
    }

    if (charge === null) {
        return { elements: { [canonical]: subscriptDigits }, charge: 0 };
    }

    if (charge.hasCaret) {
        // explicit charge: digits are a subscript (`O2^-`, `O2^2-`)
        return { elements: { [canonical]: subscriptDigits }, charge: charge.charge };
    }

    // monatomic ion: the digits before the sign are the charge magnitude
    // (`Fe2+`, `O2-` -> oxide O^2-). Explicit `^` is required for polyatomic
    // ions such as superoxide `O2^-`.
    const magnitude = digits !== "" ? subscriptDigits : charge.magnitude;
    return { elements: { [canonical]: 1 }, charge: charge.charge > 0 ? magnitude : -magnitude };
}

/* ------------------------------------------------------------------ */
/* Public parser API                                                  */
/* ------------------------------------------------------------------ */

function parseBody(input: string, validate: boolean): ParsedUnit {
    const single = tryParseSingleElement(input, validate);
    if (single !== null) return single;
    return parseCore(input, validate);
}

/** Parse a formula body (already free of hydrate multipliers). */
export function parseWithoutMultiplier(str: string): ParsedUnit {
    return parseBody(normalizeText(str), false);
}

/**
 * Parse a formula into an element-count map and net charge. Handles hydrates,
 * nested brackets, charges, electrons, and isotope notation.
 */
export function parseFormula(formula: string): ParsedUnit {
    const raw = normalizeText(formula).replace(STATE_REGEX, "").trim();
    if (raw === "") return { elements: {}, charge: 0 };
    if (/^e-?$/.test(raw)) return { elements: {}, charge: -1 };
    if (/^e\+$/.test(raw)) return { elements: {}, charge: 1 };

    const parts = raw
        .split(/[·*]/u)
        .map((p) => p.trim())
        .filter(Boolean);
    const totalElements: ElementMap = {};
    let totalCharge = 0;
    for (const part of parts) {
        const match = /^(\d+)\s*(.*)$/.exec(part);
        let mult = 1;
        let rest = part;
        if (match) {
            mult = parseInt(match[1]!, 10);
            rest = match[2]!;
        }
        if (rest === "") continue;
        const inner = parseBody(rest, false);
        addInto(totalElements, inner.elements, mult);
        totalCharge += inner.charge * mult;
    }
    return { elements: totalElements, charge: totalCharge };
}

/* ------------------------------------------------------------------ */
/* Equation splitting                                                 */
/* ------------------------------------------------------------------ */

const ARROW_UNICODE = /[→⇒⇌↔⇋⇀⇁]|<=>|<->|--+>|=>|==/g;

/**
 * Normalise arrow spellings and drop reaction conditions written next to an
 * arrow (`--Δ-->`, `->[cat]`, `-[cat]->`, `-> Δ`).
 */
export function normalizeArrows(input: string): string {
    let s = normalizeText(input);
    s = s.replace(ARROW_UNICODE, "->");
    // reaction conditions written in brackets immediately after the arrow
    // (`->[cat]`, `[cat]->`). A whitespace-separated bracketed species is kept.
    s = s.replace(/->\[([^\]]*)\]/g, (whole: string, inner: string) =>
        /[()[\]]/.test(inner) ? whole : "->",
    );
    s = s.replace(/\[([^\]]*)\]->/g, (whole: string, inner: string) =>
        /[()[\]]/.test(inner) ? whole : "->",
    );
    // a dash-arrow carrying a short condition token, e.g. `-Δ->`, `-[cat]->`.
    // Parentheses/brackets/whitespace are excluded so charge suffixes such as
    // `Cl-(aq) ->` are never consumed.
    s = s.replace(/-{1,}[^\s()[\]]*[^\s()[\]]->/g, "->");
    s = s.replace(/=/g, "->");
    // a lone condition token between the arrow and the next species
    s = s.replace(/->\s*(?:Δ|delta|heat|hv|hν|light|catalyst|cat)\b/gi, "->");
    // collapse any residual dash/equals run that terminates in `>`
    s = s.replace(/[-=]{1,}>/g, "->");
    // gas / precipitate markers at end of a species
    s = s.replace(/[↑↓]/g, "");
    return s;
}

function parseSpecies(term: string, validate: boolean): Species {
    const match = /^(\d+)\s*(.*)$/.exec(term);
    let formulaStr = term;
    if (match) formulaStr = match[2]!;
    const cleaned = stripStateSymbols(formulaStr).trim();
    const normalized = normalizeText(cleaned);

    // validate every element symbol used
    const parsed = parseSpeciesFull(normalized, validate);
    return parsed;
}

function parseSpeciesFull(normalized: string, validate: boolean): Species {
    const parts = normalized
        .split(/[·*]/u)
        .map((p) => p.trim())
        .filter(Boolean);
    const elements: ElementMap = {};
    const isotopes: Record<string, number> = {};
    const variables: string[] = [];
    let charge = 0;
    let hasIsotopes = false;

    for (const part of parts) {
        const m = /^(\d+)\s*(.*)$/.exec(part);
        let mult = 1;
        let rest = part;
        if (m) {
            mult = parseInt(m[1]!, 10);
            rest = m[2]!;
        }
        if (rest === "") continue;
        const unit = parseSpeciesUnit(rest, validate, isotopes, variables);
        if (Object.keys(unit.isotopes).length > 0) hasIsotopes = true;
        addInto(elements, unit.unit.elements, mult);
        for (const el in unit.isotopes) isotopes[el] = unit.isotopes[el]!;
        charge += unit.unit.charge * mult;
    }

    const species: Species = { formula: normalized, elements, charge };
    if (hasIsotopes) species.isotopes = isotopes;
    if (variables.length > 0) species.variables = variables;
    return species;
}

interface UnitResult {
    unit: ParsedUnit;
    isotopes: Record<string, number>;
}

function parseSpeciesUnit(
    input: string,
    validate: boolean,
    _outerIsotopes: Record<string, number>,
    variables: string[],
): UnitResult {
    // Reuse parseCore but also recover isotope/variable information by
    // re-scanning; parseCore handles validation.
    const single = tryParseSingleElement(input, validate);
    const isotopes: Record<string, number> = {};
    if (single !== null) {
        const m = SINGLE_ELEMENT.exec(input);
        if (m) {
            const massA = m[1] ?? m[2];
            const symbol = canonicalSymbol(m[3]!);
            if (massA !== undefined) isotopes[symbol] = parseInt(massA, 10);
            else if (m[4] === "" && m[5] !== "") {
                const ct = parseChargeSuffix(m[5] ?? "");
                const z = atomicNumberOf(symbol);
                if (
                    ct !== null &&
                    !ct.hasCaret &&
                    ct.charge < 0 &&
                    z !== undefined &&
                    ct.magnitude >= z &&
                    ct.magnitude <= 3 * z
                ) {
                    isotopes[symbol] = ct.magnitude;
                }
            }
        }
        return { unit: single, isotopes };
    }
    const unit = parseCore(input, validate);
    const varMatch = /[\(\)\]]\s*([a-z])\s*$/i.exec(input);
    if (varMatch && /[a-z]/.test(varMatch[1]!) && !/[A-Z]/.test(varMatch[1]!)) {
        variables.push(varMatch[1]!);
    }
    return { unit, isotopes };
}

/** Split an equation string into reactants and products. */
export function splitEquation(input: string): Equation {
    const cleaned = normalizeArrows(input);
    const parts = cleaned.split("->");
    if (parts.length !== 2) throw parseError("Invalid equation: missing a valid arrow");
    const leftStr = parts[0]!.trim();
    const rightStr = parts[1]!.trim();
    if (leftStr === "") throw parseError("Left side of equation is empty");
    if (rightStr === "") throw parseError("Right side of equation is empty");

    const parseSide = (side: string): Species[] => {
        const terms = side
            .split(/\s+\+\s+/)
            .map((t) => t.trim())
            .filter(Boolean);
        return terms.map((t) => parseSpecies(t, true));
    };

    const reactants = parseSide(leftStr);
    const products = parseSide(rightStr);
    if (reactants.length === 0) throw parseError("Left side of equation is empty");
    if (products.length === 0) throw parseError("Right side of equation is empty");
    return { reactants, products };
}
