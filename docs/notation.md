---
title: Notation
---

# Notation

This document describes all supported chemical notation formats in fast-balance.

## Table of Contents

- [Element Symbols and Subscripts](#element-symbols-and-subscripts)
- [Parenthetical and Bracket Grouping](#parenthetical-and-bracket-grouping)
- [Ionic Charges](#ionic-charges)
- [Electrons](#electrons)
- [Hydrate Separators](#hydrate-separators)
- [State Symbols](#state-symbols)
- [Arrow Variants](#arrow-variants)
- [Leading Coefficients](#leading-coefficients)

## Element Symbols and Subscripts

### Element Symbols

fast-balance recognizes all standard chemical element symbols from the periodic table, including:
- Single-letter symbols: `H`, `O`, `N`, `C`, `S`, `P`, `K`, `W`, `U`, etc.
- Two-letter symbols: `He`, `Li`, `Be`, `Ne`, `Na`, `Mg`, `Al`, `Si`, `Cl`, `Ar`, `Fe`, `Cu`, `Zn`, `Ag`, `Au`, etc.
- Three-letter symbols (systematic names): `Uut`, `Uuq`, `Uup`, etc.

### Subscripts

Subscripts are written as plain numbers immediately following the element symbol or group.

**Examples**:
```
H2O          → Water (2 hydrogen atoms, 1 oxygen atom)
C6H12O6      → Glucose (6 carbon, 12 hydrogen, 6 oxygen)
CH3COOH      → Acetic acid (2 carbon, 4 hydrogen, 2 oxygen)
Fe2O3        → Iron(III) oxide (2 iron, 3 oxygen)
```

## Parenthetical and Bracket Grouping

### Parentheses `()`

Parentheses group multiple atoms that appear together in a formula, with a subscript applied to the entire group.

**Examples**:
```
Ca3(PO4)2    → Calcium phosphate
             → 3 calcium, 2 phosphate groups
             → Each PO4: 1 phosphorus, 4 oxygen
             → Total: Ca3P2O8

Al2(SO4)3    → Aluminum sulfate
             → 2 aluminum, 3 sulfate groups
             → Each SO4: 1 sulfur, 4 oxygen
             → Total: Al2S3O12

Mg(OH)2      → Magnesium hydroxide
             → 1 magnesium, 2 hydroxide groups
             → Each OH: 1 oxygen, 1 hydrogen
             → Total: MgO2H2
```

### Brackets `[]`

Brackets are commonly used for coordination compounds and complex ions. They function similarly to parentheses but are preserved in the output formula.

**Examples**:
```
[Fe(CN)6]4-  → Hexacyanoferrate(II) ion
             → 1 iron, 6 cyanide groups
             → Each CN: 1 carbon, 1 nitrogen
             → Charge: 4-

[Co(NH3)6]3+ → Hexaamminecobalt(III) ion
              → 1 cobalt, 6 ammonia ligands
              → Each NH3: 1 nitrogen, 3 hydrogen
              → Charge: 3+

[Cu(NH3)4]2+ → Tetraamminecopper(II) ion
              → 1 copper, 4 ammonia ligands
```

### Nested Grouping

Parentheses and brackets can be nested to represent complex structures.

**Examples**:
```
[Fe(CN)6]4-          → Iron surrounded by 6 CN groups
Ca3(PO4)2            → Calcium phosphate with PO4 groups
Al2(SO4)3            → Aluminum sulfate with SO4 groups
(NH4)2SO4            → Ammonium sulfate
```

## Ionic Charges

### Charge Notation

Ionic charges can be specified using superscript-style notation or inline notation.

#### Inline Notation

The charge symbol (+ or -) is placed immediately after the formula or subscript.

**Examples**:
```
Fe2+         → Iron(II) ion (charge: +2)
Fe3+         → Iron(III) ion (charge: +3)
Cl-          → Chloride ion (charge: -1)
O2-          → Oxide ion (charge: -2)
SO42-        → Sulfate ion (charge: -2)
MnO4-        → Permanganate ion (charge: -1)
```

#### Caret Notation

Use `^` followed by the charge magnitude and sign.

**Examples**:
```
Fe^2+        → Iron(II) ion (charge: +2)
SO4^2-       → Sulfate ion (charge: -2)
O^2-         → Oxide ion (charge: -2)
Cr2O7^2-     → Dichromate ion (charge: -2)
```

### Multiple Charge Formats

Both formats can be used interchangeably, and fast-balance will normalize them.

**Examples**:
```
Fe2+   ≡ Fe^2+    → Both represent iron(II) ion
SO42-  ≡ SO4^2-   → Both represent sulfate ion
MnO4-  ≡ MnO4^-   → Both represent permanganate ion
```

### Charge Position

Charges can appear:
- After an element: `Fe2+`, `O^2-`
- After a subscript: `SO42-`, `PO43-`
- After a group: `[Fe(CN)6]4-`, `(NH4)+`

**Examples in equations**:
```
Fe2+ + Cl- -> FeCl2
MnO4- + H+ + e- -> Mn2+ + H2O
SO42- + Ba2+ -> BaSO4
[Fe(CN)6]4- -> Fe2+ + CN-
```

## Electrons

### Electron Notation

Electrons are represented using `e-`, `e`, or `e+` (positron).

**Examples**:
```
e-           → Electron (charge: -1)
e            → Electron (charge: -1, implicit)
e+           → Positron (charge: +1)
```

### Half-Reactions

Electrons are commonly used in redox half-reactions.

**Reduction half-reaction**:
```
MnO4- + H+ + e- -> Mn2+ + H2O
Balanced: MnO4- + 8 H+ + 5 e- -> Mn2+ + 4 H2O
```

**Oxidation half-reaction**:
```
Fe2+ -> Fe3+ + e-
Balanced: Fe2+ -> Fe3+ + 1 e-
```

**Complete redox equation**:
```
MnO4- + Fe2+ + H+ -> Mn2+ + Fe3+ + H2O
Balanced: MnO4- + 5 Fe2+ + 8 H+ -> Mn2+ + 5 Fe3+ + 4 H2O
```

### Electron Examples

```
e- + Cl2 -> Cl-
Balanced: 2 e- + Cl2 -> 2 Cl-

Na -> Na+ + e-
Balanced: Na -> Na+ + 1 e-

Cu2+ + e- -> Cu+
Balanced: Cu2+ + 1 e- -> Cu+
```

## Hydrate Separators

### Supported Separators

Hydrates can be represented using any of the following separator characters:
- Middle dot: `·` (U+00B7)
- Asterisk: `*`
- Bullet: `•` (U+2022)

### Hydrate Examples

All three separators are equivalent and can be used interchangeably:

```
CuSO4·5H2O   → Copper(II) sulfate pentahydrate
CuSO4*5H2O   → Same compound, asterisk notation
CuSO4•5H2O   → Same compound, bullet notation

BaCl2·2H2O   → Barium chloride dihydrate
Na2CO3·10H2O → Sodium carbonate decahydrate
MgSO4*7H2O   → Magnesium sulfate heptahydrate
CaCl2•6H2O   → Calcium chloride hexahydrate
```

### Hydrate Decomposition

```
CuSO4·5H2O -> CuSO4 + H2O
Balanced: CuSO4·5H2O -> CuSO4 + 5 H2O

BaCl2·2H2O -> BaCl2 + H2O
Balanced: BaCl2·2H2O -> BaCl2 + 2 H2O
```

### Multiple Hydrate Units

```
Al2(SO4)3·18H2O -> Al2(SO4)3 + H2O
Balanced: Al2(SO4)3·18H2O -> Al2(SO4)3 + 18 H2O
```

## State Symbols

### Automatically Stripped Symbols

State symbols are automatically removed during parsing and do not affect balancing. The following state symbols are recognized and stripped:

**Abbreviated forms**:
- `(s)` → solid
- `(l)` → liquid
- `(g)` → gas
- `(aq)` → aqueous
- `(cr)` → crystalline
- `(am)` → amorphous

**Full word forms**:
- `(solid)`
- `(liquid)`
- `(gas)`
- `(aqueous)`

### Case Insensitivity

State symbols are case-insensitive and can be written in any case combination:
- `(s)`, `(S)`, `(S)`
- `(aq)`, `(AQ)`, `(Aq)`
- `(gas)`, `(GAS)`, `(Gas)`

### State Symbol Examples

```
H2(g) + O2(g) -> H2O(l)
Parsed as: H2 + O2 -> H2O
Balanced: 2 H2 + 1 O2 -> 2 H2O

NaCl(s) -> Na+(aq) + Cl-(aq)
Parsed as: NaCl -> Na+ + Cl-
Balanced: 1 NaCl -> 1 Na+ + 1 Cl-

CaCO3(s) -> CaO(s) + CO2(g)
Parsed as: CaCO3 -> CaO + CO2
Balanced: 1 CaCO3 -> 1 CaO + 1 CO2

AgNO3(aq) + NaCl(aq) -> AgCl(s) + NaNO3(aq)
Parsed as: AgNO3 + NaCl -> AgCl + NaNO3
Balanced: 1 AgNO3 + 1 NaCl -> 1 AgCl + 1 NaNO3
```

## Arrow Variants

### Supported Arrow Styles

fast-balance normalizes all of the following arrow variants to the canonical `->` separator:

| Arrow Style | Description | Unicode |
|-------------|-------------|---------|
| `->` | Hyphen greater-than | ASCII |
| `→` | Right arrow | U+2192 |
| `⇒` | Double right arrow | U+21D2 |
| `⇌` | Equilibrium arrows | U+21CC |
| `<=>` | Equilibrium notation | ASCII |
| `<->` | Reversible reaction | ASCII |
| `-->` | Long arrow | ASCII |
| `=` | Equals sign | ASCII |

### Arrow Examples

All of the following notations are equivalent:

```
H2 + O2 -> H2O
H2 + O2 → H2O
H2 + O2 ⇒ H2O
H2 + O2 ⇌ H2O
H2 + O2 <=> H2O
H2 + O2 <-> H2O
H2 + O2 --> H2O
H2 + O2 = H2O
```

All produce the same balanced result:
```
2 H2 + 1 O2 -> 2 H2O
```

### Equilibrium Reactions

For equilibrium reactions, use `⇌` or `<=>`:

```
N2 + H2 ⇌ NH3
Balanced: N2 + 3 H2 ⇌ 2 NH3

H2O ⇌ H+ + OH-
Balanced: H2O ⇌ 1 H+ + 1 OH-
```

## Leading Coefficients

### Coefficient Handling

Leading stoichiometric coefficients in the input string are automatically discarded before balancing. This means:
- Already-balanced equations are re-balanced correctly
- Partially-balanced equations are completed
- User-provided coefficients are ignored

### Examples

**Already balanced equation**:
```
Input:  2 H2 + 1 O2 -> 2 H2O
Parsed: H2 + O2 -> H2O
Output: 2 H2 + 1 O2 -> 2 H2O
```

**Partially balanced equation**:
```
Input:  2 H2 + O2 -> H2O
Parsed: H2 + O2 -> H2O
Output: 2 H2 + 1 O2 -> 2 H2O
```

**Incorrect coefficients**:
```
Input:  3 H2 + 2 O2 -> 5 H2O
Parsed: H2 + O2 -> H2O
Output: 2 H2 + 1 O2 -> 2 H2O
```

**Complex example**:
```
Input:  4 Fe + 3 O2 -> 2 Fe2O3
Parsed: Fe + O2 -> Fe2O3
Output: 4 Fe + 3 O2 -> 2 Fe2O3
```

### Why Discard Coefficients?

The library recalculates coefficients from scratch to ensure:
1. **Correctness**: User-provided coefficients may be incorrect
2. **Consistency**: Always produces the minimal integer coefficients
3. **Flexibility**: Accepts any input format without manual normalization

## Combined Notation Examples

### Complex Ionic Compound

```
[Fe(CN)6]4- + H2O2 + H+ -> Fe3+ + CO2 + NO3- + H2O
```

Parses correctly with:
- Bracket notation: `[Fe(CN)6]4-`
- Charge notation: `4-`, `3+`, `-`
- Multiple species on each side

### Hydrate with State Symbols

```
CuSO4·5H2O(s) -> CuSO4(s) + H2O(l)
```

Automatically strips:
- State symbols: `(s)`, `(l)`
- Recognizes hydrate separator: `·`

### Redox with Electrons

```
Cr2O7^2- + H+ + e- -> Cr3+ + H2O
```

Handles:
- Caret charge notation: `^2-`
- Electrons: `e-`
- Multiple charge formats: `^2-`, `3+`, `-`

### Coordination Compound

```
[Co(NH3)6]2+ + H2O2 -> Co3+ + NH3 + H2O
```

Recognizes:
- Bracket grouping: `[Co(NH3)6]`
- Charge on complex: `2+`
- Nested elements in ligands: `NH3`