# Installation

```bash
npm install fast-balance
```

The package ships dual ESM/CommonJS builds and TypeScript declarations, with **zero runtime dependencies**.

## Requirements

The exact arithmetic kernel uses `BigInt`, so the library targets ES2020 and requires an environment with native `BigInt` (Node.js ≥ 12.20, all current browsers, and modern bundlers).

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
