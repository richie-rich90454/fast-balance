/**
 * Hand-written independent verification helpers.
 *
 * Nothing here calls the library. The scanner re-reads a rendered equation
 * string with its own tokenizer so that "conservation holds" is confirmed by
 * code that shares nothing with the solver, the parser or the formatter.
 */

/** Remove phase annotations such as `(s)` or `(aqueous)`. */
function stripStates(formula: string): string {
    return formula
        .replace(/\(aq\)/g, "")
        .replace(/\(s\)/g, "")
        .replace(/\(l\)/g, "")
        .replace(/\(g\)/g, "")
        .replace(/\(v\)/g, "")
        .replace(/\(cr\)/g, "")
        .replace(/\(am\)/g, "")
        .replace(/\(sln\)/g, "")
        .replace(/\(ppt\)/g, "")
        .replace(/\(solid\)/g, "")
        .replace(/\(liquid\)/g, "")
        .replace(/\(gas\)/g, "")
        .replace(/\(aqueous\)/g, "")
        .replace(/\(solution\)/g, "")
        .replace(/\(precipitate\)/g, "")
        .replace(/\(mono\)/g, "")
        .replace(/\(monomer\)/g, "")
        .replace(/\(vapour\)/g, "")
        .replace(/\(vapor\)/g, "");
}

export interface Counted {
    elements: Record<string, number>;
    charge: number;
}

/**
 * True when a species is one element plus an optional isotope prefix and an
 * optional charge, with nothing else in it. Only these may spell their charge
 * as digits-before-sign (`Fe2+`, `O2-`).
 */
function isMonatomic(body: string): boolean {
    return /^(?:\^\d+|\^\{\d+\})?[A-Z][a-z]?(?:\^?\{?\d*[+-]\}?)?\**$/.test(body);
}

/**
 * Count atoms and net charge of a formula written in the notation the library
 * renders: element symbols, optional digit subscripts, parenthesised groups
 * with an optional subscript, hydrate dots, and charge suffixes such as
 * `2+`, `^3+`, `4-`, `^-`, bare `+` / `-`, plus the `e`, `n` and `p` tokens.
 */
export function countFormula(formula: string): Counted {
    const s = stripStates(formula);
    const elements: Record<string, number> = {};
    let charge = 0;
    let i = 0;

    const digitsFrom = (): string => {
        let out = "";
        while (i < s.length && s[i]! >= "0" && s[i]! <= "9") out += s[i++];
        return out;
    };

    while (i < s.length) {
        const ch = s[i]!;

        if (ch === "·" || ch === " ") {
            i++;
            continue;
        }

        // A leading digit run applies to the next unit, as in `CuSO4·5H2O`.
        if (ch >= "0" && ch <= "9") {
            const digits = digitsFrom();
            const mult = parseInt(digits, 10);
            const next = i < s.length ? s[i]! : "";
            if (next === "(" || next === "[") {
                const open = next;
                const close = open === "(" ? ")" : "]";
                let depth = 1;
                let j = i + 1;
                while (j < s.length && depth > 0) {
                    if (s[j] === open) depth++;
                    else if (s[j] === close) depth--;
                    if (depth > 0) j++;
                }
                const inner = countFormula(s.slice(i + 1, j));
                i = j + 1;
                const sub = digitsFrom();
                const innerMult = sub === "" ? mult : parseInt(sub, 10);
                for (const el in inner.elements) {
                    elements[el] = (elements[el] ?? 0) + inner.elements[el]! * innerMult;
                }
                charge += inner.charge * innerMult;
                continue;
            }
            const rest = countFormula(s.slice(i));
            for (const el in rest.elements) {
                elements[el] = (elements[el] ?? 0) + rest.elements[el]! * mult;
            }
            charge += rest.charge * mult;
            i = s.length;
            continue;
        }

        if (ch === "(" || ch === "[") {
            const open = ch;
            const close = ch === "(" ? ")" : "]";
            let depth = 1;
            let j = i + 1;
            while (j < s.length && depth > 0) {
                if (s[j] === open) depth++;
                else if (s[j] === close) depth--;
                if (depth > 0) j++;
            }
            const inner = countFormula(s.slice(i + 1, j));
            i = j + 1;
            let mult = 1;
            const digits = digitsFrom();
            if (digits !== "") mult = parseInt(digits, 10);
            // `[Fe(CN)6]4-`: digits after `]` are the charge magnitude.
            let bracketCharge = 0;
            if (open === "[" && digits !== "" && (s[i] === "+" || s[i] === "-")) {
                bracketCharge = s[i] === "+" ? mult : -mult;
                mult = 1;
                i++;
            }
            for (const el in inner.elements) {
                elements[el] = (elements[el] ?? 0) + inner.elements[el]! * mult;
            }
            charge += inner.charge * mult + bracketCharge;
            continue;
        }

        if (ch === "^") {
            i++;
            const braced = s[i] === "{";
            if (braced) i++;
            let digits = "";
            while (i < s.length && s[i]! >= "0" && s[i]! <= "9") digits += s[i++];
            const mag = digits === "" ? 1 : parseInt(digits, 10);
            if (braced) {
                // `^{3+}` / `^{2-}`: the sign comes before the closing brace
                if (s[i] === "+") charge += mag;
                else if (s[i] === "-") charge -= mag;
                else charge += mag;
                while (i < s.length && s[i] !== "}") i++;
                if (s[i] === "}") i++;
                continue;
            }
            if (s[i] === "+") {
                charge += mag;
                i++;
            } else if (s[i] === "-") {
                charge -= mag;
                i++;
            } else {
                charge += mag;
            }
            continue;
        }

        if (ch === "+") {
            // `Fe+` is a unit charge and `Fe+3` spells the magnitude after the
            // sign; digits only follow when they are the magnitude
            i++;
            const digits = digitsFrom();
            charge += digits === "" ? 1 : parseInt(digits, 10);
            continue;
        }

        if (ch === "-") {
            i++;
            const digits = digitsFrom();
            charge -= digits === "" ? 1 : parseInt(digits, 10);
            continue;
        }

        if (ch === "e") {
            // `e-`, `e+`, or a bare electron
            i++;
            if (s[i] === "-") {
                charge -= 1;
                i++;
            } else if (s[i] === "+") {
                charge += 1;
                i++;
            } else {
                charge -= 1;
            }
            continue;
        }

        if (ch === "n" || ch === "p") {
            i++;
            if (ch === "p") charge += 1;
            continue;
        }

        if (ch >= "A" && ch <= "Z") {
            let sym = ch;
            i++;
            while (i < s.length && s[i]! >= "a" && s[i]! <= "z") sym += s[i++];
            const digits = digitsFrom();
            // `Fe2+` / `O2-`: for a species that is a single element the digits
            // are the charge magnitude and there is exactly one atom. Inside a
            // polyatomic species the same spelling is a subscript followed by a
            // unit charge, which is the convention the library documents.
            if (digits !== "" && (s[i] === "+" || s[i] === "-") && isMonatomic(s)) {
                const sign = s[i] === "+" ? 1 : -1;
                i++;
                elements[sym] = (elements[sym] ?? 0) + 1;
                charge += sign * parseInt(digits, 10);
                continue;
            }
            if (digits !== "" && (s[i] === "+" || s[i] === "-")) {
                charge += s[i] === "+" ? 1 : -1;
                i++;
            }
            elements[sym] = (elements[sym] ?? 0) + (digits === "" ? 1 : parseInt(digits, 10));
            continue;
        }

        if (ch >= "a" && ch <= "z") {
            // lower-case lead is either a particle token or a symbolic
            // subscript that the library treats as 1
            i++;
            continue;
        }

        throw new Error("independent scanner cannot handle " + JSON.stringify(ch) + " in " + formula);
    }

    return { elements, charge };
}

export interface RenderedTerm {
    side: 1 | -1;
    coefficient: number;
    formula: string;
}

/** Split `2 H2 + 1 O2 -> 2 H2O` into coefficient/formula/side triples. */
export function splitRendered(equation: string): RenderedTerm[] {
    const parts = equation.split("->");
    if (parts.length !== 2) throw new Error("rendered equation has no arrow: " + equation);
    const out: RenderedTerm[] = [];
    for (const [raw, side] of [
        [parts[0]!, 1],
        [parts[1]!, -1],
    ] as Array<[string, 1 | -1]>) {
        for (const term of raw.trim().split(" + ")) {
            const m = /^(\d+)\s+(\S+)$/.exec(term);
            if (!m) throw new Error("cannot parse rendered term " + JSON.stringify(term));
            out.push({ side, coefficient: parseInt(m[1]!, 10), formula: m[2]! });
        }
    }
    return out;
}

export interface ConservationReport {
    /** Element -> net count across the arrow; all values must be zero. */
    net: Record<string, number>;
    /** Net charge; must be zero. */
    charge: number;
    /** GCD of all coefficients; a minimal balance is always 1. */
    gcd: number;
    /** Total sum of coefficients. */
    total: number;
}

/** Independently verify a rendered balanced equation. */
export function checkConservation(equation: string): ConservationReport {
    const terms = splitRendered(equation);
    const net: Record<string, number> = {};
    let charge = 0;
    let g = 0;
    let total = 0;
    for (const t of terms) {
        if (!Number.isInteger(t.coefficient) || t.coefficient <= 0) {
            throw new Error("coefficient is not a positive integer in: " + equation);
        }
        const c = countFormula(t.formula);
        for (const el in c.elements) net[el] = (net[el] ?? 0) + t.side * t.coefficient * c.elements[el]!;
        charge += t.side * t.coefficient * c.charge;
        g = gcdOf(g, t.coefficient);
        total += t.coefficient;
    }
    return { net, charge, gcd: g, total };
}

export function gcdOf(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
        const t = x % y;
        x = y;
        y = t;
    }
    return x;
}