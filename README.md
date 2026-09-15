# fast-balance

> Exact, fast stoichiometric equation balancing for JavaScript and TypeScript.  
> Conservation of mass and charge are solved with BigInt rational arithmetic —
> no floating-point discrepancy, ever.

[![npm version](https://img.shields.io/npm/v/fast-balance.svg)](https://www.npmjs.com/package/fast-balance)
[![license](https://img.shields.io/npm/l/fast-balance)](LICENSE)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![ESM + CJS](https://img.shields.io/badge/ESM%2FCJS-dual-green)](#)

---

## Features

- **Exact arithmetic** — the balancing kernel uses BigInt rationals, so results
  are always the smallest exact integer coefficients.
- **Linear-time core** — element symbols are validated against a fixed set, so
  elimination is `O(m²·n)` with `m = O(1)`: linear in the number of species.
- **Real chemistry** — nested `()`/`[]`, ionic charges, hydrates, state symbols,
  isotopes, nuclear mode, functional groups and common abbreviations.
- **Spectator species** — a species on both sides is balanced, not rejected
  (`C3H8 + O2 + N2 -> CO2 + H2O + N2`).
- **Underdetermined systems** — the minimal positive solution is returned and
  flagged; `balanceAll` returns every independent balance.
- **Honest errors** — typed `BalanceError` with stable codes; unknown elements,
  ambiguous input and unbalanceable equations are reported explicitly.
- **Zero runtime dependencies**, dual ESM/CommonJS build, TypeScript types.

---

## Installation

```bash
npm install fast-balance
```

Requires an environment with native `BigInt` (Node.js ≥ 12.20, all current
browsers, modern bundlers).

---

## Quick start

```javascript
import { balance } from 'fast-balance';

balance('H2 + O2 -> H2O').equation;
// "2 H2 + 1 O2 -> 2 H2O"

balance('MnO4- + H+ + e- -> Mn2+ + H2O').equation;
// "1 MnO4- + 8 H+ + 5 e- -> 1 Mn2+ + 4 H2O"

// spectator species
balance('C3H8 + O2 + N2 -> CO2 + H2O + N2').equation;
// "1 C3H8 + 5 O2 + 1 N2 -> 3 CO2 + 4 H2O + 1 N2"

// unicode input
balance('H₂ + O₂ -> H₂O').equation;
```

```javascript
const { balance } = require('fast-balance');
balance('Fe2+ + Cl- -> FeCl2').reactants[0].coefficient; // 1
```

---

## API

### `balance(input, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `showOne` | `boolean` | `true` | Render coefficients equal to 1. |
| `format` | `"text" \| "html" \| "latex"` | `"text"` | Arrow representation. |
| `mode` | `"chemical" \| "nuclear"` | `"chemical"` | `nuclear` conserves A and nuclear charge. |
| `autoComplete` | `boolean` | `false` | Opt-in inference of omitted `H2O`/`H+`/`OH-`/`e-`. |
| `analyze` | `boolean` | `false` | Attach classification and redox analysis. |

```ts
interface BalanceResult {
  reactants: BalancedSpecies[];
  products: BalancedSpecies[];
  equation: string;
  underdetermined?: boolean;
  warnings?: string[];
  analysis?: ReactionAnalysis;
}
```

### Other exports

- `balanceAll(input, options?)` — every independent balance.
- `isBalanced(input, options?)` — boolean check, never throws.
- `verify(input, options?)` — alias for `balance` with an explicit throwing contract.
- `audit(input)` — per-side element and charge totals.
- `analyzeReaction(reactants, products)`, `classify(reactants, products)`, `oxidationStates(species)`.
- `parseFormula`, `splitEquation`, `stripStateSymbols`, `normalizeText`, `normalizeArrows`.
- `buildMatrix`, `solveSystem`, `fractionsToIntegers`, `Fraction`, `gcd`, `lcm`.
- `BalanceError` with a stable `.code`.

Full documentation lives in [`docs/`](./docs) — its own npm package,
`fast-balance-docs`, with a dedicated VitePress site.

---

## Supported notation (summary)

| Feature | Examples |
|---|---|
| Subscripts / groups | `H2O`, `Ca3(PO4)2`, `[Fe(CN)6]4-` |
| Charges | `Fe2+`, `SO4^2-`, `Fe^{3+}`, `Fe+2`, `O2-` |
| Electrons / particles | `e`, `e-`, `e+`, `n`, `p`, `hv`, `hν`, `Δ` |
| Hydrates | `CuSO4·5H2O`, `CuSO4*5H2O`, `CuSO4•5H2O` |
| State symbols | `(s) (l) (g) (aq) (cr) (am) (solid) (gas) …` |
| Unicode | `H₂O`, `Fe²⁺`, `SO₄²⁻` |
| Isotopes / nuclear | `^238U`, `C-14`, `H-2` (with `mode: 'nuclear'`) |
| Functional groups | `Ph`, `Me`, `Et`, `Bu`, `tBu`, `Bn` |
| Abbreviations | `NADP`, `NADPH`, `NAD`, `NADH`, `FAD`, `FADH2`, `ATP`, `ADP` |
| Placeholders | `R`, `M`, `X`, `Q`, `Z`, `D`, `T` |
| Arrows / conditions | `->`, `→`, `⇌`, `<=>`, `=`, `--Δ-->`, `->[cat]` |

A `+` separates species only when surrounded by spaces; `H2+O2` is ambiguous
with a terminal charge and raises an explicit error rather than misparsing.
`O2-` follows the standard convention of meaning oxide; superoxide and peroxide
are written `O2^-` and `O2^2-`.

---

## Algorithm

1. **Parse** each species into an element-count map and net charge, normalising
   unicode, charges, hydrates, isotopes and groups.
2. **Build** the conservation matrix: one row per element (lexicographic) plus a
   charge row when needed; reactants positive, products negative.
3. **Reduce** the matrix to reduced row echelon form over exact BigInt rationals.
4. **Select** the smallest all-positive primitive integer solution; for
   underdetermined systems the free directions are searched in increasing order.
5. **Verify** element and charge conservation on the result before returning.

The element set is bounded, so step 3 is `O(m²·n)` with constant `m` — linear in
the number of species.

---

## Development

```bash
npm install
npm test          # full test suite (strict conformance + conservation fuzzer)
npm run build     # ESM + CJS + type declarations
```

Documentation lives in its own package:

```bash
cd docs
npm install
npm run dev
```

---

## License

MIT © [rjiang880](https://github.com/richie-rich90454/fast-balance)  
See the [LICENSE](LICENSE) file for full terms.
