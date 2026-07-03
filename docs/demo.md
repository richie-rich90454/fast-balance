---
title: Live Demo
---

# Live Demo

Try out the **fast-balance** library with this interactive demo! Enter any chemical equation and see it balanced instantly with your preferred format options.

## Features

- **Real-time balancing**: Results update as you type
- **Multiple output formats**: Text, HTML, or LaTeX
- **Flexible display**: Toggle coefficient visibility
- **Error handling**: Clear messages for invalid or unbalanceable equations
- **Example equations**: Quick access to common reactions

## Try It Out

<BalanceDemo />

## Supported Formats

The demo supports three output formats:

- **Text**: Plain text format with simple arrow (`->`)
- **HTML**: HTML format with arrow entity (`→`)
- **LaTeX**: LaTeX format with `\rightarrow` command

## Tips

1. Use `->` or `→` or `=` as the reaction arrow
2. Separate reactants and products with `+` (spaces around `+` required)
3. Charges can be written as `Fe2+`, `SO4^2-`, or `MnO4-`
4. Parentheses and brackets are supported: `Ca3(PO4)2`, `[Fe(CN)6]4-`
5. Hydrate notation works too: `CuSO4·5H2O`

## Example Equations

Here are some reactions you can try:

### Simple Reactions
- `H2 + O2 -> H2O` (Water synthesis)
- `Fe + O2 -> Fe2O3` (Iron oxidation)
- `N2 + H2 -> NH3` (Ammonia synthesis)

### Combustion Reactions
- `CH4 + O2 -> CO2 + H2O` (Methane combustion)
- `C3H8 + O2 -> CO2 + H2O` (Propane combustion)
- `C2H5OH + O2 -> CO2 + H2O` (Ethanol combustion)

### Redox Reactions
- `MnO4- + H+ + e- -> Mn2+ + H2O` (Permanganate reduction)
- `Cr2O7^2- + H+ + e- -> Cr3+ + H2O` (Dichromate reduction)
- `Fe2+ + MnO4- + H+ -> Fe3+ + Mn2+ + H2O` (Iron oxidation by permanganate)

### Complex Reactions
- `Ca3(PO4)2 + SiO2 + C -> CaSiO3 + P4 + CO` (Phosphorus production)
- `KMnO4 + H2SO4 + H2O2 -> MnSO4 + K2SO4 + O2 + H2O` (Potassium permanganate and hydrogen peroxide)
- `[Fe(CN)6]4- + H2O2 + H+ -> Fe3+ + CO2 + NO3- + H2O` (Complex ion reaction)

### Ionic Reactions
- `Ag+ + Cl- -> AgCl` (Silver chloride precipitation)
- `Ba2+ + SO4^2- -> BaSO4` (Barium sulfate precipitation)
- `Pb2+ + 2I- -> PbI2` (Lead iodide precipitation)