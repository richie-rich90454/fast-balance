# fast‑balance

> An exact‑arithmetic stoichiometric equation balancer for JavaScript and TypeScript,  
> addressing conservation of mass and charge via rational nullspace computation  
> — free of floating‑point discrepancy.

[![npm version](https://img.shields.io/npm/v/fast-balance.svg)](https://www.npmjs.com/package/fast-balance)
[![license](https://img.shields.io/npm/l/fast-balance.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![ESM + CJS](https://img.shields.io/badge/ESM%2FCJS-dual-green)](#)

---

## Features

- **Universal stoichiometry** — resolves equations ranging from elementary syntheses (`H2 + O2 → H2O`) to multi‑species redox systems.
- **Complex chemical syntax** — nested parentheses `()` and brackets `[]` with subscripts, e.g., `Ca3(PO4)2`, `[Fe(CN)6]4-`.
- **Ionic charge accounting** — explicit charge annotations: `Fe2+`, `SO4^2−`, `MnO4−`, `O^2−`.
- **Electron handling** — recognizes `e−` (or bare `e`) for half‑reactions; allows `e+` for completeness.
- **Hydrate notation** — accepts dot `·`, middle dot, bullet `•`, and asterisk `*` as hydrate separators (e.g., `CuSO4·5H2O`).
- **State symbols (ignored)** — automatically strips `(s)`, `(l)`, `(g)`, `(aq)`, `(solid)`, `(liquid)`, `(gas)`, `(aqueous)`, `(cr)`, `(am)`.
- **Arrow‑style robustness** — normalizes `→`, `⇒`, `⇌`, `<=>`, `<->`, `-->`, `=` to the canonical `->` separator.
- **Rational arithmetic kernel** — solves the linear conservation system over the field ℚ to guarantee minimal integer coefficients without rounding artifacts.
- **Input‑coefficient indifference** — leading stoichiometric coefficients in the input string are discarded; feeding an already‑balanced equation causes no perturbation.
- **Compact bundle** — approximately 6 kB minified; zero runtime dependencies.

---

## Installation

```bash
npm install fast-balance
```

The package is distributed as a **dual ESM/CommonJS** module, employing Node.js conditional exports.  
It functions equally well with `import` and `require`, targeting Node.js ≥ 12.20, contemporary bundlers, and ES‑module‑capable browsers.

---

## Quick start

### ES module

```javascript
import { balance } from 'fast-balance';

const result = balance('H2 + O2 -> H2O');
console.log(result.equation); // "2 H2 + O2 -> 2 H2O"
```

### CommonJS

```javascript
const { balance } = require('fast-balance');

const result = balance('Fe2+ + Cl- -> FeCl2');
console.log(result.reactants[0].coefficient); // 1
```

### With options

```javascript
// Suppress unit coefficients, generate HTML formatted arrow
const result = balance('H2 + O2 -> H2O', { showOne: false, format: 'html' });
console.log(result.equation); // "2 H2 + O2 &rarr; 2 H2O"
```

---

## API

### `balance(input: string, options?: BalanceOptions): BalanceResult`

Balances a chemical equation provided as a character string.

#### `input` (string)

The equation to balance. Whitespace and leading integer coefficients are permitted.  
The accepted arrow tokens are: `->`, `→`, `⇒`, `⇌`, `<=>`, `<->`, `-->`, and `=`.

#### `options` (object, optional)

| Property  | Type                          | Default  | Description                                                          |
|-----------|-------------------------------|----------|----------------------------------------------------------------------|
| `showOne` | `boolean`                     | `true`   | When `true`, coefficients equal to unity are rendered explicitly.   |
| `format`  | `"text" \| "html" \| "latex"` | `"text"` | Selects the arrow representation in the `equation` property.        |

#### `BalanceResult`

```typescript
interface BalancedSpecies {
  coefficient: number;
  formula: string;
}

interface BalanceResult {
  reactants: BalancedSpecies[];
  products:  BalancedSpecies[];
  equation:  string;   // fully formatted balanced‑equation string
}
```

---

## Supported notation

| Feature                         | Examples                                               |
|---------------------------------|--------------------------------------------------------|
| Element symbols                 | `H`, `He`, `C`, `O`, `Fe`, `Uut`                      |
| Subscripts                      | `H2O`, `C6H12O6`                                      |
| Parenthetical/bracket grouping  | `Ca3(PO4)2`, `[Fe(CN)6]4−`, `Al2(SO4)3`              |
| Ionic charges                   | `Fe2+`, `Fe3+`, `SO4^2−`, `MnO4−`, `O^2−`            |
| Electrons                       | `e−` (or bare `e`), `e+`                              |
| Hydrate separators              | `CuSO4·5H2O`, `CuSO4*5H2O`, `CuSO4•5H2O`             |
| State symbols (eliminated)      | `H2O(l)`, `CO2(g)`, `NaCl(aq)`, `AgCl(s)`             |
| Arrow variants                  | `->`, `→`, `⇒`, `⇌`, `<=>`, `<->`, `-->`, `=`         |
| Leading coefficient (ignored)   | `2 H2 + O2 -> 2 H2O` is parsed correctly              |

---

## Algorithmic exposition

The library’s computational core proceeds through four stages:

1. **Lexical & syntactic analysis**  
   Each term (reactant or product) is decomposed into an *element‑count map* and a net ionic *charge*.
   Parentheses, brackets, hydrates, and charge suffixes are handled by a recursive‑descent parser.
   State symbols are stripped prior to decomposition.

2. **Construction of the conservation matrix**  
   For an equation with *n* species and *m* distinct elements, an *m*′ × *n* matrix is assembled,
   where *m*′ = *m* + (1 if any species carries a non‑zero charge).  
   Reactants contribute positive coefficients; products contribute negative ones.  
   Each row represents conservation of one element (or charge).

3. **Rational nullspace determination**  
   Gaussian elimination is performed over the field of rational numbers, using a custom `Fraction` class that stores
   numerator and denominator as reduced integers. This eliminates floating‑point drift entirely.  
   The algorithm locates a free variable, sets it to unity, and back‑substitutes to obtain a rational nullspace vector.

4. **Integer canonicalization**  
   The rational vector is scaled to the least common multiple of the denominators, producing a provisional set of integer coefficients.  
   These are then divided by their greatest common divisor and, if necessary, sign‑flipped so that positive coefficients predominate.

The entire process guarantees the smallest possible integer coefficients consistent with the conservation laws.

Because the linear system may possess multiple degrees of freedom (e.g., scaling an entire equation), the implementation selects the minimal solution in which the first free coefficient is set to one.

---

## Dual‑module distribution

The `package.json` conditions route `import` to the ESM bundle and `require` to the CJS bundle:

- `"main"` points to `dist/index.cjs` (CommonJS entry for legacy consumers).
- `"module"` points to `dist/index.js` (ESM entry for bundlers that prefer the `module` field).
- The `"exports"` map explicitly provides `"import"` and `"require"` conditions, with `"types"` listed first for TypeScript resolution.

This architecture ensures seamless interoperability across modern Node.js, older CommonJS codebases, and ESM‑only environments.

---

## TypeScript

Full type declarations are shipped (`dist/index.d.ts`).  
All exported interfaces — `BalanceOptions`, `BalanceResult`, `BalancedSpecies` — are exposed,
furnishing complete IntelliSense within compatible editors.

---

## License

MIT © [rjiang880](https://github.com/richie-rich90454/fast-balance)  
See the [LICENSE](LICENSE) file for full terms.