/**
 * Element and pseudo-element tables.
 *
 * The element table is what makes the conservation matrix have a constant
 * number of rows (m <= ~125), which in turn makes exact balancing O(n) in the
 * number of species.
 */

/** All 118 IUPAC element symbols. */

const ELEMENTS: readonly string[] =
    "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(
        " ",
    );

export const REAL_ELEMENTS: ReadonlySet<string> = new Set(ELEMENTS);

export const ATOMIC_NUMBER: Readonly<Record<string, number>> = Object.fromEntries(
    ELEMENTS.map((symbol, index) => [symbol, index + 1]),
);

export const OBSOLETE_ELEMENTS: Readonly<Record<string, string>> = {
    Uun: "Ds",
    Uuu: "Rg",
    Uub: "Cn",
    Uut: "Nh",
    Uuq: "Fl",
    Uup: "Mc",
    Uuh: "Lv",
    Uus: "Ts",
    Uuo: "Og",
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
    "D",
    "T",
    "n",
    "p",
    "R",
    "M",
    "X",
    "Q",
    "Z",
]);

/**
 * Elements whose elemental form is homonuclear diatomic. For these, a digit
 * immediately before a sign is a *subscript*, not a charge magnitude
 * (e.g. `O2-` is superoxide O2^-; oxide must be written `O^2-`).
 */
export const DIATOMIC_ELEMENTS: ReadonlySet<string> = new Set([
    "H",
    "N",
    "O",
    "F",
    "Cl",
    "Br",
    "I",
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

const ALLOWED: ReadonlySet<string> = new Set([...REAL_ELEMENTS, ...PSEUDO_ELEMENTS]);

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
export const PHOTONS: ReadonlySet<string> = new Set(["hv", "hν", "photon", "light", "Δ", "delta"]);

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
