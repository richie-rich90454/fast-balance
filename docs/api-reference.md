# API Reference

All exports are available from the package root:

```ts
import {
  balance, balanceAll, isBalanced, verify, audit,
  analyzeReaction, classify, oxidationStates,
  parseFormula, parseWithoutMultiplier, splitEquation, stripStateSymbols,
  normalizeText, normalizeArrows,
  buildMatrix, solveSystem, fractionsToIntegers,
  Fraction, gcd, lcm, BalanceError,
} from 'fast-balance';
```

---

## `balance(input, options?)`

Balances a chemical equation and returns a `BalanceResult`.

```ts
function balance(input: string, options?: BalanceOptions): BalanceResult;
```

Throws a [`BalanceError`](#balanceerror) for invalid or unbalanceable input.

### Options

| Property       | Type                          | Default      | Description |
|----------------|-------------------------------|--------------|-------------|
| `showOne`      | `boolean`                     | `true`       | Render coefficients equal to 1. |
| `format`       | `"text" \| "html" \| "latex"` | `"text"`     | Arrow representation in `equation`. |
| `mode`         | `"chemical" \| "nuclear"`     | `"chemical"` | `nuclear` conserves mass number A and nuclear charge. |
| `autoComplete` | `boolean`                     | `false`      | Opt-in inference of omitted `H2O` / `H+` / `OH-` / `e-`. |
| `analyze`      | `boolean`                     | `false`      | Attach reaction classification and redox analysis. |

### `BalanceResult`

```ts
interface BalancedSpecies {
  coefficient: number;
  formula: string;
}

interface BalanceResult {
  reactants: BalancedSpecies[];
  products: BalancedSpecies[];
  equation: string;
  underdetermined?: boolean;   // present when >1 independent balance exists
  warnings?: string[];         // present only when non-empty
  analysis?: ReactionAnalysis; // present only when { analyze: true }
}
```

---

## `balanceAll(input, options?)`

Returns every independent balance. For a unique reaction this is a single
result; for underdetermined systems it includes the minimal balance plus one
solution per independent free direction.

```ts
balanceAll('C + O2 -> CO + CO2').map(r => r.equation);
// ["3 C + 2 O2 -> 2 CO + 1 CO2", "4 C + 3 O2 -> 2 CO + 2 CO2"]
```

## `isBalanced(input, options?)`

Returns `true` when the equation balances exactly (mass and charge), `false`
for any parse or balance failure. Never throws.

## `verify(input, options?)`

Alias for `balance` that makes the throwing contract explicit.

## `audit(input)`

Reports per-element and charge totals for each side without requiring the
equation to balance.

```ts
audit('H2 + O2 -> H2O');
// { elements: { H: { left: 2, right: 2, balanced: true },
//               O: { left: 2, right: 1, balanced: false } },
//   charge:   { left: 0, right: 0, balanced: true } }
```

---

## Analysis

### `analyzeReaction(reactants, products)`

Classifies a reaction and reports which elements are oxidised/reduced, using
conservative oxidation-state rules (only unambiguous assignments are reported).

```ts
interface ReactionAnalysis {
  type: string;          // e.g. "combustion", "synthesis", "acid-base"
  oxidized: string[];    // element symbols
  reduced: string[];     // element symbols
}
```

### `classify(reactants, products)`

Structural classification only: `combustion`, `decomposition`, `synthesis`,
`single-displacement`, `acid-base` or `metathesis`.

### `oxidationStates(species)`

Average oxidation state per element for a single parsed species. Elements whose
states cannot be determined unambiguously (e.g. both Fe and S in `Fe2(SO4)3`)
are omitted rather than guessed.

```ts
oxidationStates(splitEquation('MnO4- + H+ -> Mn2+').reactants[0]);
// { Mn: 7, O: -2 }
```

---

## Parsing

| Function | Description |
|---|---|
| `parseFormula(formula)` | `{ elements, charge }` for a formula string. |
| `parseWithoutMultiplier(str)` | Parses a formula body (no hydrate multiplier). |
| `splitEquation(input)` | `{ reactants, products }` of `Species`. |
| `stripStateSymbols(formula)` | Removes `(s)`, `(aq)`, `(gas)`, … |
| `normalizeText(input)` | Normalises unicode sub/superscripts and dashes. |
| `normalizeArrows(input)` | Normalises arrow variants and conditions. |

```ts
interface Species {
  formula: string;
  elements: Record<string, number>;
  charge: number;
  isotopes?: Record<string, number>;
  variables?: string[];
}
```

---

## Low-level solver

| Function | Description |
|---|---|
| `buildMatrix(reactants, products)` | Conservation matrix (`Fraction[][]`) + column count. |
| `solveSystem(matrix, cols)` | Rational nullspace vector (throws on full rank). |
| `fractionsToIntegers(fracs)` | Smallest integer vector (sign-normalised). |
| `gcd(a, b)` / `lcm(a, b)` | Integer helpers. |
| `Fraction` | Exact rational with `num`/`den` and arithmetic methods. |

---

## `BalanceError`

Errors thrown by `balance` are `BalanceError` instances with a stable `code`:

```ts
class BalanceError extends Error {
  code:
    | 'PARSE_ERROR'
    | 'UNKNOWN_ELEMENT'
    | 'AMBIGUOUS_CHARGE'
    | 'UNBALANCEABLE'
    | 'UNDERDETERMINED'
    | 'INVALID_ARGUMENT'
    | 'OVERFLOW';
}
```

```ts
import { balance, BalanceError } from 'fast-balance';

try {
  balance('Fe2+ + Cl- -> FeCl3');
} catch (e) {
  if (e instanceof BalanceError && e.code === 'UNBALANCEABLE') {
    // handle
  }
}
```

---

## Guarantees

- **Exactness** — the balancing path uses BigInt rational arithmetic; results
  never depend on floating point.
- **Conservation** — every returned result is re-verified for element and
  charge conservation before it is returned.
- **Minimality** — solutions are primitive integer vectors; in underdetermined
  systems the smallest positive solution is chosen when it can be found cheaply.
- **Linearity** — because the element set is bounded, matrix elimination is
  `O(m²·n)` with `m = O(1)`, i.e. linear in the number of species.
