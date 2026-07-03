---
title: Live Demo
---

# Live Demo

Try the interactive demo below. Enter a chemical equation and select the output format to see the balanced result.

<BalanceDemo />

## How it works

- Type or paste an unbalanced chemical equation into the input field.
- Choose the output format: plain text, HTML, or LaTeX.
- Toggle the "Show coefficients of 1" option to control unit coefficient display.
- The result updates as you type.
- Invalid or unbalanceable equations display a clear error message.

## Supported notation

| Notation | Example | Description |
|----------|---------|-------------|
| Arrow styles | `->`, `=`, `<=>`, `⇌` | Separates reactants and products |
| Ionic charges | `Fe2+`, `SO4^2-` | Superscript-style or caret notation |
| Electrons | `e-` | Used in redox half-reactions |
| Parentheses | `Ca3(PO4)2` | Groups atoms with a subscript |
| Brackets | `[Fe(CN)6]4-` | Preserved in coordination complexes |
| Hydrates | `CuSO4·5H2O` | Middle dot, asterisk, or bullet separator |
| State symbols | `(s)`, `(l)`, `(g)`, `(aq)` | Stripped during parsing |

## Example equations

### Simple reactions
- `H2 + O2 -> H2O`
- `Fe + O2 -> Fe2O3`
- `N2 + H2 -> NH3`

### Combustion reactions
- `CH4 + O2 -> CO2 + H2O`
- `C3H8 + O2 -> CO2 + H2O`
- `C2H5OH + O2 -> CO2 + H2O`

### Redox reactions
- `MnO4- + H+ + e- -> Mn2+ + H2O`
- `Cr2O7^2- + H+ + e- -> Cr3+ + H2O`
- `Fe2+ + MnO4- + H+ -> Fe3+ + Mn2+ + H2O`

### Ionic reactions
- `Ag+ + Cl- -> AgCl`
- `Ba2+ + SO4^2- -> BaSO4`
- `Pb2+ + 2I- -> PbI2`

### Complex reactions
- `Ca3(PO4)2 + SiO2 + C -> CaSiO3 + P4 + CO`
- `KMnO4 + H2SO4 + H2O2 -> MnSO4 + K2SO4 + O2 + H2O`
- `[Fe(CN)6]4- + H2O2 + H+ -> Fe3+ + CO2 + NO3- + H2O`
