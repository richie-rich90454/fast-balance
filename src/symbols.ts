/**
 * Element and pseudo-element tables.
 *
 * The element table is what makes the conservation matrix have a constant
 * number of rows (m <= ~125), which in turn makes exact balancing O(n) in the
 * number of species.
 */

/** All 118 IUPAC element symbols. */
export const REAL_ELEMENTS: ReadonlySet<string> = new Set([
    "H", "He",
    "Li", "Be", "B", "C", "N", "O", "F", "Ne",
    "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar",
    "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn",
    "Ga", "Ge", "As", "Se", "Br", "Kr",
    "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd",
    "In", "Sn", "Sb", "Te", "I", "Xe",
    "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy",
    "Ho", "Er", "Tm", "Yb", "Lu",
    "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
    "Tl", "Pb", "Bi", "Po", "At", "Rn",
    "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf",
    "Es", "Fm", "Md", "No", "Lr",
    "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn",
    "Nh", "Fl", "Mc", "Lv", "Ts", "Og",
]);

/** Atomic numbers, used by nuclear mode and oxidation-state analysis. */
export const ATOMIC_NUMBER: Readonly<Record<string, number>> = {
    H: 1, He: 2,
    Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10,
    Na: 11, Mg: 12, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18,
    K: 19, Ca: 20, Sc: 21, Ti: 22, V: 23, Cr: 24, Mn: 25, Fe: 26, Co: 27,
    Ni: 28, Cu: 29, Zn: 30,
    Ga: 31, Ge: 32, As: 33, Se: 34, Br: 35, Kr: 36,
    Rb: 37, Sr: 38, Y: 39, Zr: 40, Nb: 41, Mo: 42, Tc: 43, Ru: 44, Rh: 45,
    Pd: 46, Ag: 47, Cd: 48,
    In: 49, Sn: 50, Sb: 51, Te: 52, I: 53, Xe: 54,
    Cs: 55, Ba: 56, La: 57, Ce: 58, Pr: 59, Nd: 60, Pm: 61, Sm: 62, Eu: 63,
    Gd: 64, Tb: 65, Dy: 66, Ho: 67, Er: 68, Tm: 69, Yb: 70, Lu: 71,
    Hf: 72, Ta: 73, W: 74, Re: 75, Os: 76, Ir: 77, Pt: 78, Au: 79, Hg: 80,
    Tl: 81, Pb: 82, Bi: 83, Po: 84, At: 85, Rn: 86,
    Fr: 87, Ra: 88, Ac: 89, Th: 90, Pa: 91, U: 92, Np: 93, Pu: 94, Am: 95,
    Cm: 96, Bk: 97, Cf: 98, Es: 99, Fm: 100, Md: 101, No: 102, Lr: 103,
    Rf: 104, Db: 105, Sg: 106, Bh: 107, Hs: 108, Mt: 109, Ds: 110, Rg: 111,
    Cn: 112, Nh: 113, Fl: 114, Mc: 115, Lv: 116, Ts: 117, Og: 118,
};

/**
 * Obsolete/former IUPAC symbols still found in older texts and test suites.
 * These are canonicalised to their modern equivalents before validation.
 */
export const OBSOLETE_ELEMENTS: Readonly<Record<string, string>> = {
    Uun: "Ds", Uuu: "Rg", Uub: "Cn",
    Uut: "Nh", Uuq: "Fl", Uup: "Mc", Uuh: "Lv", Uus: "Ts", Uuo: "Og",
};

/**
 * Pseudo-elements accepted on purpose. This is a *fixed* set, so it never
 * affects the O(n) bound of the solver.
 *  - D, T   : hydrogen isotopes (kept distinct from H for chemical balancing)
 *  - n      : neutron
 *  - p      : proton
 *  - R, M, X, Q, Z : generic placeholders (group, metal, halogen, ...)
 */
export const PSEUDO_ELEMENTS: ReadonlySet<string> = new Set([
    "D", "T", "n", "p", "R", "M", "X", "Q", "Z",
]);

/**
 * Elements whose elemental form is homonuclear diatomic. For these, a digit
 * immediately before a sign is a *subscript*, not a charge magnitude
 * (e.g. `O2-` is superoxide O2^-; oxide must be written `O^2-`).
 */
export const DIATOMIC_ELEMENTS: ReadonlySet<string> = new Set([
    "H", "N", "O", "F", "Cl", "Br", "I",
]);

/**
 * Organic shorthand fragments, expanded to explicit atoms before balancing.
 * The expansion keeps the conservation matrix over real elements only.
 */
export const GROUP_EXPANSIONS: Readonly<Record<string, string>> = {
    Ph: "C6H5",
    Bn: "C7H7",
    Me: "CH3",
    Et: "C2H5",
    Bu: "C4H9",
    tBu: "C4H9",
};

const ALLOWED: ReadonlySet<string> = new Set([
    ...REAL_ELEMENTS,
    ...PSEUDO_ELEMENTS,
]);

/**
 * Multi-letter biochemical abbreviations, expanded to explicit atoms so that
 * redox cofactors balance with correct hydrogen/oxygen accounting.
 */
export const ABBREVIATIONS: Readonly<Record<string, string>> = {
    NADPH: "C21H29N7O17P3",
    NADP: "C21H28N7O17P3",
    NADH: "C21H28N7O14P2",
    NAD: "C21H27N7O14P2",
    FADH2: "C27H35N9O15P2",
    FAD: "C27H33N9O15P2",
    ATP: "C10H16N5O13P3",
    ADP: "C10H15N5O10P2",
};

/** Light/heat tokens that carry no atoms (photochemical, thermal reactions). */
export const PHOTONS: ReadonlySet<string> = new Set([
    "hv", "hν", "photon", "light", "Δ", "delta",
]);

/** True when a symbol is a real element, obsolete alias, or allowed pseudo. */
export function isKnownSymbol(symbol: string): boolean {
    return ALLOWED.has(symbol) || symbol in OBSOLETE_ELEMENTS;
}

/** Canonicalise a symbol (obsolete aliases -> modern symbol). */
export function canonicalSymbol(symbol: string): string {
    return OBSOLETE_ELEMENTS[symbol] ?? symbol;
}

/** Atomic number for a symbol, or undefined for pseudo-elements. */
export function atomicNumberOf(symbol: string): number | undefined {
    return ATOMIC_NUMBER[canonicalSymbol(symbol)];
}
