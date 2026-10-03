# Installation

```bash
npm install fast-balance
```

The package ships dual ESM/CommonJS builds and TypeScript declarations, with **zero runtime dependencies**.

## Requirements

The exact arithmetic kernel uses `BigInt`, so the library targets ES2020 and requires an environment with native `BigInt` (Node.js ≥ 12.20, all current browsers, and modern bundlers).

## Legacy environments (ES3, no `BigInt`)

The `fast-balance/legacy` subpath ships an ES3 build with the **identical public API and identical results**:

```javascript
const { balance } = require("fast-balance/legacy");

balance("H2 + O2 -> H2O").equation;
// "2 H2 + 1 O2 -> 2 H2O"
```

For classic `<script>` pages use the UMD bundle, which exposes the same API as the `FastBalance` global:

```html
<script src="fast-balance.global.js"></script>
<script>
    FastBalance.balance("Fe2+ + Cl- -> FeCl2").equation;
</script>
```

How it works: the ES3 bundle runs native `BigInt` rationals when present and exact base-1e7 limb arithmetic otherwise, so pre-ES2020 engines (old browsers, legacy WebViews, IE-era script hosts) return byte-identical equations, error codes (`BalanceError.code`), and `underdetermined` flags. No API or behaviour differences exist between the modern and legacy builds; the legacy bundle is larger (~57 kB / 14 kB gzipped) because it carries its own exact arithmetic and runtime shims.

## ES modules

```javascript
import { balance } from "fast-balance";

console.log(balance("H2 + O2 -> H2O").equation);
// "2 H2 + 1 O2 -> 2 H2O"
```

## CommonJS

```javascript
const { balance } = require("fast-balance");

balance("Fe2+ + Cl- -> FeCl2").reactants[0].coefficient; // 1
```

## TypeScript

```ts
import { balance } from "fast-balance";
import type { BalanceOptions, BalanceResult } from "fast-balance";

const options: BalanceOptions = { showOne: false };
const result: BalanceResult = balance("H2 + O2 -> H2O", options);
```

All exported interfaces — `BalanceOptions`, `BalanceResult`, `BalancedSpecies`, `ReactionAnalysis`, `Species`, `BalanceErrorCode` — are available from the package root.

## Documentation site

The documentation lives in its own package under `docs/`, named `fast-balance-docs`:

```bash
cd docs
npm install
npm run dev      # local preview
npm run build    # production build
```
