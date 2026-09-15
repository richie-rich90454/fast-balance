---
title: Live Demo
---

# Live Demo

Enter a chemical equation and choose the output format to see the balanced result.

<BalanceDemo />

## How it works

- Type or paste an unbalanced equation; the result updates as you type.
- Choose the output format: plain text, HTML, or LaTeX.
- Toggle "Show coefficient of 1" to control unit coefficient display.
- Spectator species (a species on both sides) are balanced, not rejected.
- Genuinely underdetermined systems return the minimal balance and set `underdetermined: true`.
- Invalid or unbalanceable input shows a clear error message.

## Supported notation

| Notation       | Example                             | Description                      |
| -------------- | ----------------------------------- | -------------------------------- |
| Arrows         | `->`, `→`, `⇌`, `<=>`, `=`, `-->`   | Separates reactants and products |
| Conditions     | `--Δ-->`, `->[cat]`                 | Ignored                          |
| Ionic charges  | `Fe2+`, `SO4^2-`, `Fe^{3+}`, `Fe+2` | Several charge spellings         |
| Complex charge | `[Fe(CN)6]4-`                       | Digits after `]` are the charge  |
| Electrons      | `e`, `e-`, `e+`                     | Redox half-reactions             |
| Parentheses    | `Ca3(PO4)2`                         | Groups atoms with a subscript    |
| Hydrates       | `CuSO4·5H2O`                        | `·`, `•`, `*` separators         |
| State symbols  | `(s)`, `(l)`, `(g)`, `(aq)`         | Stripped during parsing          |
| Unicode        | `H₂O`, `Fe²⁺`                       | Normalised automatically         |
| Isotopes       | `^238U`, `C-14`                     | Used by nuclear mode             |
| Groups         | `Ph`, `Me`, `Et`, `tBu`             | Expanded to atoms                |
| Abbreviations  | `NADP`, `NADPH`, `ATP`              | Expanded to atoms                |
| Particles      | `hv`, `hν`, `Δ`, `n`, `p`           | Photon/heat/nucleon tokens       |
| Placeholders   | `R`, `M`, `X`, `Q`, `Z`             | Generic group/metal/halogen      |

## Example equations

### Simple reactions

- `H2 + O2 -> H2O`
- `Fe + O2 -> Fe2O3`
- `N2 + H2 -> NH3`

### Combustion

- `CH4 + O2 -> CO2 + H2O`
- `C3H8 + O2 + N2 -> CO2 + H2O + N2` (air, with N2 spectator)

### Redox

- `MnO4- + H+ + e- -> Mn2+ + H2O`
- `Cr2O7^2- + H+ + e- -> Cr3+ + H2O`
- `Fe2+ + MnO4- + H+ -> Fe3+ + Mn2+ + H2O`

### Ionic

- `Ag+ + Cl- -> AgCl`
- `Ba2+ + SO4^2- -> BaSO4`
- `[Cu(NH3)4]2+ + Cl- -> [Cu(NH3)4]Cl2`

### Underdetermined

- `C + O2 -> CO + CO2`

### Unicode

- `H₂ + O₂ -> H₂O`
- `Fe²⁺ + Cl⁻ -> FeCl₂`

### Complex

- `Ca3(PO4)2 + SiO2 + C -> CaSiO3 + P4 + CO`
- `K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O`
