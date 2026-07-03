---
title: API Reference
---

# API Reference

## Table of Contents

- [balance()](#balance)
- [BalanceOptions](#balanceoptions)
- [BalanceResult](#balanceresult)
- [BalancedSpecies](#balancedspecies)
- [Examples](#examples)

## balance()

Balances a chemical equation provided as a character string.

### Signature

```typescript
function balance(input: string, options?: BalanceOptions): BalanceResult;
```

### Parameters

#### `input` (string, required)

The chemical equation to balance. Whitespace and leading integer coefficients are permitted. The equation must contain a valid arrow separator to distinguish reactants from products.

Accepted arrow tokens:
- `->` (hyphen greater-than)
- `→` (Unicode right arrow)
- `⇒` (Unicode double right arrow)
- `⇌` (Unicode equilibrium arrows)
- `<=>` (equilibrium notation)
- `<->` (reversible reaction notation)
- `-->` (long arrow)
- `=` (equals sign)

#### `options` (BalanceOptions, optional)

Configuration options for the balance operation. See [BalanceOptions](#balanceoptions) for detailed property descriptions.

### Returns

Returns a `BalanceResult` object containing the balanced coefficients and formatted equation string. See [BalanceResult](#balanceresult) for structure details.

### Throws

Throws an `Error` when:
- The equation string lacks a valid arrow separator
- The equation is unbalanceable (violates conservation laws)
- The formula syntax is invalid
- Either side of the equation is empty

## BalanceOptions

Configuration interface for the `balance()` function.

### Properties

#### `showOne` (boolean, optional)

- **Default**: `true`
- **Description**: When `true`, coefficients equal to unity (1) are rendered explicitly in the output `equation` string. When `false`, unit coefficients are omitted for cleaner output.
- **Example**:
  - With `showOne: true`: `"2 H2 + O2 -> 2 H2O"` (O2 has explicit 1)
  - With `showOne: false`: `"2 H2 + O2 -> 2 H2O"` (unit coefficient hidden)

#### `format` (string, optional)

- **Default**: `"text"`
- **Type**: `"text" | "html" | "latex"`
- **Description**: Selects the arrow representation format in the output `equation` property.
- **Values**:
  - `"text"`: Uses `->` as the arrow separator
  - `"html"`: Uses `&rarr;` HTML entity for the arrow
  - `"latex"`: Uses `\rightarrow` LaTeX command for the arrow

### Example

```typescript
const options: BalanceOptions = {
    showOne: false,
    format: 'html'
};
```

## BalanceResult

Result interface returned by the `balance()` function.

### Properties

#### `reactants` (BalancedSpecies[], required)

An array of `BalancedSpecies` objects representing the reactant side of the balanced equation. Each object contains the coefficient and formula for one reactant species.

#### `products` (BalancedSpecies[], required)

An array of `BalancedSpecies` objects representing the product side of the balanced equation. Each object contains the coefficient and formula for one product species.

#### `equation` (string, required)

A fully formatted balanced equation string. The format of the arrow separator depends on the `format` option. Coefficient visibility depends on the `showOne` option.

### Example

```typescript
const result: BalanceResult = balance('H2 + O2 -> H2O');
// result.equation: "2 H2 + 1 O2 -> 2 H2O"
// result.reactants: [{ coefficient: 2, formula: 'H2' }, { coefficient: 1, formula: 'O2' }]
// result.products: [{ coefficient: 2, formula: 'H2O' }]
```

## BalancedSpecies

Interface representing a single chemical species with its balanced coefficient.

### Properties

#### `coefficient` (number, required)

The stoichiometric coefficient for this species in the balanced equation. Always a positive integer after balancing.

#### `formula` (string, required)

The chemical formula of the species, with state symbols stripped and hydrate separators normalized. Leading coefficients from the input are not preserved.

### Example

```typescript
const species: BalancedSpecies = {
    coefficient: 2,
    formula: 'H2O'
};
```

## Examples

### Basic Usage (TypeScript)

```typescript
import { balance } from 'fast-balance';
const result = balance('H2 + O2 -> H2O');
console.log(result.equation); // "2 H2 + 1 O2 -> 2 H2O"
console.log(result.reactants[0].coefficient); // 2
console.log(result.reactants[0].formula); // "H2"
console.log(result.products[0].coefficient); // 2
console.log(result.products[0].formula); // "H2O"
```

### Basic Usage (JavaScript)

```javascript
const { balance } = require('fast-balance');
const result = balance('Fe + O2 -> Fe2O3');
console.log(result.equation); // "4 Fe + 3 O2 -> 2 Fe2O3"
```

### Using Options

```typescript
import { balance } from 'fast-balance';
// Hide unit coefficients, use HTML format
const result = balance('H2 + O2 -> H2O', {
    showOne: false,
    format: 'html'
});
console.log(result.equation); // "2 H2 + O2 &rarr; 2 H2O"
```

### LaTeX Output

```typescript
import { balance } from 'fast-balance';
const result = balance('CH4 + O2 -> CO2 + H2O', { format: 'latex' });
console.log(result.equation); // "1 CH4 + 2 O2 \rightarrow 1 CO2 + 2 H2O"
```

### Complex Ionic Equation

```typescript
import { balance } from 'fast-balance';
const result = balance('MnO4- + H+ + e- -> Mn2+ + H2O');
console.log(result.equation); // "1 MnO4- + 8 H+ + 5 e- -> 1 Mn2+ + 4 H2O"
```

### Nested Parentheses

```typescript
import { balance } from 'fast-balance';
const result = balance('Ca3(PO4)2 + SiO2 -> CaSiO3 + P4O10');
console.log(result.equation); // "2 Ca3(PO4)2 + 6 SiO2 -> 6 CaSiO3 + 1 P4O10"
```

### Bracket Notation

```typescript
import { balance } from 'fast-balance';
const result = balance('[Fe(CN)6]4- + H2O2 -> Fe3+ + CO2 + NO3- + H+');
// Returns balanced coefficients for the complex coordination compound
```

### Error Handling

```typescript
import { balance } from 'fast-balance';
try {
    // Missing arrow separator
    const result = balance('H2 + O2');
} catch (error) {
    console.error(error.message); // "Invalid equation: missing a valid arrow"
}
try {
    // Unbalanceable equation (violates conservation)
    const result = balance('H2 -> O2');
} catch (error) {
    console.error(error.message); // "Unbalanceable equation"
}
```

### Accessing Coefficients Programmatically

```typescript
import { balance } from 'fast-balance';
const result = balance('C2H6 + O2 -> CO2 + H2O');
// Iterate through reactants
result.reactants.forEach((species) => {
    console.log(`${species.coefficient} ${species.formula}`);
    // Output: "2 C2H6", "7 O2"
});
// Iterate through products
result.products.forEach((species) => {
    console.log(`${species.coefficient} ${species.formula}`);
    // Output: "4 CO2", "6 H2O"
});
```

### Redox Half-Reaction

```typescript
import { balance } from 'fast-balance';
// Reduction half-reaction
const reduction = balance('Cr2O7^2- + H+ + e- -> Cr3+ + H2O');
console.log(reduction.equation); // "1 Cr2O7^2- + 14 H+ + 6 e- -> 2 Cr3+ + 7 H2O"
```

### Hydrate Compounds

```typescript
import { balance } from 'fast-balance';
// Hydrate with dot separator
const result = balance('CuSO4·5H2O -> CuSO4 + H2O');
console.log(result.equation); // "1 CuSO4·5H2O -> 1 CuSO4 + 5 H2O"
```

### Input Coefficient Handling

```typescript
import { balance } from 'fast-balance';
// Leading coefficients in input are ignored
const result = balance('2 H2 + O2 -> 2 H2O');
// Still returns properly balanced result
console.log(result.equation); // "2 H2 + 1 O2 -> 2 H2O"
```

### State Symbols (Automatically Stripped)

```typescript
import { balance } from 'fast-balance';
// State symbols are ignored during balancing
const result = balance('H2(g) + O2(g) -> H2O(l)');
console.log(result.reactants[0].formula); // "H2"
console.log(result.products[0].formula); // "H2O"
```