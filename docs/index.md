---
layout: home
hero:
  name: "fast-balance"
  text: "Exact-arithmetic chemical equation balancer"
  tagline: "Balance chemical equations with integer-based rational arithmetic"
  image:
    src: /hero-chemistry.svg
    alt: fast-balance
  actions:
    - theme: brand
      text: "Get Started"
      link: /installation
    - theme: alt
      text: "Try Demo"
      link: /demo
---

<div class="features">
  <div class="feature-card">
    <img src="/icons/atom.svg" alt="" width="48" height="48" />
    <h3>Universal stoichiometry</h3>
    <p>Balances simple synthesis, combustion, redox, ionic, and industrial equations.</p>
  </div>
  <div class="feature-card">
    <img src="/icons/molecule.svg" alt="" width="48" height="48" />
    <h3>Complex syntax</h3>
    <p>Supports parentheses, brackets, ionic charges, hydrates, state symbols, and multiple arrow styles.</p>
  </div>
  <div class="feature-card">
    <img src="/icons/balance.svg" alt="" width="48" height="48" />
    <h3>Exact arithmetic</h3>
    <p>Uses integer rational arithmetic to eliminate floating-point errors and produce minimal coefficients.</p>
  </div>
  <div class="feature-card">
    <img src="/icons/code.svg" alt="" width="48" height="48" />
    <h3>Developer friendly</h3>
    <p>Single balance() API with typed results, ESM and CommonJS builds, and zero runtime dependencies.</p>
  </div>
</div>

## Quick example

Balance a simple equation in JavaScript or TypeScript:

```javascript
import { balance } from 'fast-balance';

const result = balance('H2 + O2 -> H2O');
console.log(result.equation);
// 2 H2 + 1 O2 -> 2 H2O
```

## Installation

```bash
npm install fast-balance
```

## Explore

- [Installation](/installation) — install and import the library
- [API Reference](/api-reference) — full API and type documentation
- [Notation](/notation) — supported chemical notation
- [Examples](/examples) — curated reaction examples
- [Live Demo](/demo) — try the balancer in the browser
