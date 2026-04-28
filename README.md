# fast-balance

> Blazing fast chemical equation balancer for JavaScript and TypeScript  
> Handles complex formulas, redox, charges, hydrates, and all common arrow styles – with zero floating‑point errors.

[![npm version](https://img.shields.io/npm/v/fast-balance.svg)](https://www.npmjs.com/package/fast-balance)
[![license](https://img.shields.io/npm/l/fast-balance.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

## Features

- **Simple to complex** – balances anything from `H2 + O2 -> H2O` to multi‑species redox reactions.
- **Nested groups** – parentheses `()` and brackets `[]` with subscripts, e.g. `Ca3(PO4)2`, `[Fe(CN)6]4-`.
- **Ions & charges** – `Fe2+`, `SO4^2-`, `MnO4-`, etc.
- **Electrons** – `e-` or `e` for redox half‑reactions.
- **Hydrates** – `CuSO4·5H2O` (dot, middle dot, bullet, asterisk).
- **State symbols** – `(s)`, `(l)`, `(g)`, `(aq)`, `(solid)`, `(liquid)`, `(gas)`, `(aqueous)`, `(cr)`, `(am)` are automatically stripped.
- **Arrow styles** – `->`, `→`, `⇒`, `⇌`, `<=>`, `<->`, `-->`, `=`.
- **Exact integer arithmetic** – uses rational numbers under the hood, so you always get the smallest whole‑number coefficients with no rounding errors.
- **Parses input** – leading coefficients (like `2 H2 + O2`) are ignored so you can feed in an already‑balanced equation without breaking it.
- **Tiny & fast** – ~6 kB minified, no dependencies.

## Installation

```bash
npm install fast-balance
```

> `fast-balance` is **ESM‑only**. It works with Node.js ≥12.20, modern bundlers, and browsers that support ES modules.

## Quick start

```javascript
import { balance } from 'fast-balance';

const result = balance('H2 + O2 -> H2O');
console.log(result.equation); // "2 H2 + O2 -> 2 H2O"
```

### With options

```javascript
// Hide "1" coefficients, output as HTML
const result = balance('Fe2+ + Cl- -> FeCl2', { showOne: false, format: 'html' });
console.log(result.equation); // "Fe2+ + 2 Cl- &rarr; FeCl2"
```

## API

### `balance(input: string, options?: BalanceOptions): BalanceResult`

Balances a chemical equation string.

#### `input` (string)

The equation string. Any spaces and leading coefficients are allowed.  
Supported arrow symbols: `->`, `→`, `⇒`, `⇌`, `<=>`, `<->`, `-->`, `=`.

#### `options` (object, optional)

| Option   | Type                     | Default  | Description                                             |
|----------|--------------------------|----------|---------------------------------------------------------|
| `showOne`| `boolean`                | `true`   | Whether to show the coefficient `1` (e.g. `"1 H2O"`)   |
| `format` | `"text" \| "html" \| "latex"` | `"text"` | Output style for the `equation` string                 |

#### `BalanceResult`

```typescript
{
  reactants: Array<{ coefficient: number; formula: string }>;
  products:  Array<{ coefficient: number; formula: string }>;
  equation:  string;   // formatted according to `options.format`
}
```

## Supported notation

| Feature                     | Examples                                        |
|-----------------------------|-------------------------------------------------|
| Elements                    | `H`, `He`, `C`, `O`, `Fe`, `Uut`               |
| Subscripts                  | `H2O`, `C6H12O6`                                 |
| Parentheses / brackets      | `Ca3(PO4)2`, `[Fe(CN)6]4-`, `Al2(SO4)3`        |
| Ionic charges               | `Fe2+`, `Fe3+`, `SO4^2-`, `MnO4-`, `O^2-`       |
| Electrons                   | `e-` or `e` (also `e+`)                         |
| Hydrate dots                | `CuSO4·5H2O`, `CuSO4*5H2O`, `CuSO4•5H2O`       |
| State symbols (ignored)     | `H2O(l)`, `CO2(g)`, `NaCl(aq)`, `AgCl(s)`       |
| Arrow variants              | `->`, `→`, `⇒`, `⇌`, `<=>`, `<->`, `-->`, `=`   |
| Leading coefficients (ign.) | `2 H2 + O2 -> 2 H2O` is parsed correctly        |

## How it works

1. **Parse** each chemical term into an element‑count map and a net charge.
2. **Build a linear system** based on the conservation of each element and charge.
3. **Solve** for the nullspace using exact rational (fraction) arithmetic – no floating‑point drift.
4. **Convert** the rational solution to the smallest possible integer coefficients.

If the equation has multiple degrees of freedom (e.g. a reaction that can be scaled arbitrarily), the algorithm picks the minimal integer solution.

## TypeScript

Full type definitions are included (`dist/index.d.ts`). You get auto‑completion for `BalanceOptions`, `BalanceResult`, etc.

## License

MIT © [rjiang880](https://github.com/richie-rich90454/fast-balance)  
See the [LICENSE](LICENSE) file for details.