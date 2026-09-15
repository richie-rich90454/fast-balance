# Notation

`fast-balance` accepts a broad range of real-world chemical notation. Where a notation is genuinely ambiguous, it either follows the standard chemical convention or reports an explicit error — it never guesses silently.

---

## Equations and arrows

Reactants and products are separated by an arrow. A side is split on `" + "` (spaces around the plus). Supported arrows:

| Input                | Notes              |
| -------------------- | ------------------ |
| `->`                 | canonical          |
| `→` `⇒` `⇌` `↔` `⇋`  | unicode arrows     |
| `-->` `--->`         | dashed arrows      |
| `<=` `<->` `<=>` `=` | ASCII alternatives |

Reaction conditions next to the arrow are ignored:

```
->[cat]      [cat]->      -Δ->      --Δ-->      -> Δ
```

Gas and precipitate markers `↑` `↓` at the end of a species are ignored.

---

## Elements and grouping

```
H2O            subscripts
Ca3(PO4)2      nested parentheses
[Fe(CN)6]4-    square brackets (complex ions)
CuSO4·5H2O     hydrate separators · • * ∙
H2O(l)         state symbols: (s) (l) (g) (aq) (v) (cr) (am)
               (solid) (liquid) (gas) (aqueous) (solution) (sln)
               (ppt) (precipitate) (mono) (monomer) (vapour) (vapor)
```

Element symbols are validated against the periodic table; historical symbols (`Uut`, `Uus`, …) are accepted. Unknown symbols raise `UNKNOWN_ELEMENT`.

---

## Charges

| Form           | Example                       | Meaning                              |
| -------------- | ----------------------------- | ------------------------------------ |
| bare sign      | `Cl-`, `Na+`                  | ±1                                   |
| element + sign | `Fe2+`, `O2-`                 | monatomic ion (`O2-` = oxide O²⁻)    |
| caret          | `Fe^3+`, `SO4^2-`, `Mn^7+`    | explicit                             |
| braced         | `Fe^{3+}`, `SO4^{2-}`         | explicit                             |
| sign-first     | `Fe+2`, `SO4-2`               | explicit                             |
| square bracket | `[Fe(CN)6]4-`, `[Cu(NH3)4]2+` | complex-ion charge                   |
| parentheses    | `Al(OH)4-`, `(NH4)2SO4`       | `(OH)4` is a subscript, charge is ±1 |

Because `O2-` follows the long-standing convention of meaning oxide, the polyatomic interpretations require a caret:

```
O2^-     superoxide
O2^2-    peroxide
O^2-     oxide (explicit)
```

---

## Electronics and particles

```
e     e-     e+        electrons
n                      neutron
p                      proton
hv    hν     photon    light / heat tokens (carry no atoms)
Δ     delta
```

---

## Isotopes and nuclear mode

```
^238U     ^14C      ^{235}U
C-14      U-235     H-2
```

Isotope labels are preserved and used by `{ mode: 'nuclear' }`, which conserves mass number `A` and nuclear charge instead of element identity:

```ts
balance("^238U -> ^234Th + ^4He", { mode: "nuclear" }).equation;
// "^238U -> ^234Th + ^4He"
```

Nuclear mode requires isotope labels for nuclides; an unlabelled nuclide raises a clear `PARSE_ERROR` rather than guessing a mass number.

---

## Organic shorthand and abbreviations

Functional groups are expanded to explicit atoms:

```
Ph  → C6H5
Bn  → C7H7
Me  → CH3
Et  → C2H5
Bu  → C4H9
tBu → C4H9
```

Common biochemical abbreviations are expanded too:

```
NADP  NADPH  NAD  NADH  FAD  FADH2  ATP  ADP
```

---

## Placeholders

A fixed set of pseudo-elements is accepted (kept constant so the solver stays linear): `R`, `M`, `X`, `Q`, `Z` (generic group/metal/halogen), plus `D` and `T` for the hydrogen isotopes.

## Symbolic subscripts

Polymer/variable subscripts such as `(C6H10O5)n` are parsed; the variable is treated as `1` and a warning is emitted on the result rather than silently dropping the variable.

---

## Separator rule

A `+` separates species only when surrounded by spaces. This is intentional: without spaces `H2+O2` is ambiguous with a terminal charge (`H2+`). Inputs that omit the spaces raise an explicit `PARSE_ERROR` instead of misparsing.
