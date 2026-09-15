---
layout: home
hero:
    name: "fast-balance"
    text: "Exact chemical equation balancer"
    tagline: "Integer/rational arithmetic, redox, charges, hydrates, isotopes and nuclear mode — with no floating-point error."
    image:
        src: /hero-chemistry-light.svg
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
    <span class="fb-feature-icon" style="--fb-icon: url('/icons/atom.svg')" role="img" aria-label="Exact arithmetic"></span>
    <h3>Exact, never approximate</h3>
    <p>Conservation systems are solved with BigInt rational arithmetic, so coefficients are always the smallest exact integers.</p>
  </div>
  <div class="feature-card">
    <span class="fb-feature-icon" style="--fb-icon: url('/icons/molecule.svg')" role="img" aria-label="Chemical notation"></span>
    <h3>Real chemical notation</h3>
    <p>Nested ()/[], ionic charges, hydrates, unicode sub/superscripts, isotope and nuclear notation, functional groups.</p>
  </div>
  <div class="feature-card">
    <span class="fb-feature-icon" style="--fb-icon: url('/icons/balance.svg')" role="img" aria-label="Correctness"></span>
    <h3>Honest about ambiguity</h3>
    <p>Spectator species are handled, genuinely underdetermined systems report every independent balance, and unknown symbols are rejected with a clear code.</p>
  </div>
  <div class="feature-card">
    <span class="fb-feature-icon" style="--fb-icon: url('/icons/code.svg')" role="img" aria-label="Performance"></span>
    <h3>Linear-time core</h3>
    <p>The element set is validated and bounded, so balancing is O(n) in the number of species. Zero runtime dependencies.</p>
  </div>
</div>

## Why fast-balance

Most balancers compute a nullspace in floating point and round the result. That fails quietly on large or stiff systems. `fast-balance` solves the conservation system over **exact BigInt rationals** and re-verifies conservation before it returns anything.

|                               | fast-balance                    | Typical balancer               |
| ----------------------------- | ------------------------------- | ------------------------------ |
| Arithmetic                    | Exact BigInt rationals          | Floating point                 |
| Large systems                 | Exact at any size               | Silent rounding errors         |
| Duplicate / spectator species | Balanced                        | Often rejected                 |
| Underdetermined systems       | Minimal solution + `balanceAll` | Arbitrary or error             |
| Unknown symbols               | Typed `UNKNOWN_ELEMENT` error   | Silent misparse                |
| Complexity                    | `O(n)` in species               | `O(n³)`-ish dense Gauss–Jordan |

## Design guarantees

- **Every returned equation is re-checked** for element and charge conservation.
- **Coefficients are primitive positive integers** (divided by their GCD).
- **No silent guessing** — ambiguous or unsupported notation raises a typed error with a stable `.code`.
- **Deterministic** — the same input always returns the same result.

## A note on the palette

The site uses one flat colour drawn from **verdigris** — the green-teal patina that forms on weathered copper (basic copper carbonate and copper acetate). It is tuned separately for light and dark mode, with no gradients, glass or glow.

## Quick examples

```javascript
import { balance, balanceAll, isBalanced, audit } from "fast-balance";

balance("H2 + O2 -> H2O").equation;
// "2 H2 + 1 O2 -> 2 H2O"

// spectator species are handled, not rejected
balance("C3H8 + O2 + N2 -> CO2 + H2O + N2").equation;
// "1 C3H8 + 5 O2 + 1 N2 -> 3 CO2 + 4 H2O + 1 N2"

// underdetermined systems return the minimal balance and are flagged
balance("C + O2 -> CO + CO2");
// { underdetermined: true, equation: "3 C + 2 O2 -> 2 CO + 1 CO2" }

balanceAll("C + O2 -> CO + CO2").map((r) => r.equation);
// ["3 C + 2 O2 -> 2 CO + 1 CO2", "4 C + 3 O2 -> 2 CO + 2 CO2"]

// unicode input works
balance("H₂ + O₂ -> H₂O").equation;

// diagnostic helpers
isBalanced("H2 + O2 -> H2O"); // true
audit("H2 + O2 -> H2O"); // element/charge totals per side
```

## Installation

```bash
npm install fast-balance
```

## Explore

- [Installation](/installation) — install and import the library
- [API Reference](/api-reference) — full API, options and types
- [Notation](/notation) — supported chemical notation
- [Examples](/examples) — curated reaction examples
- [Live Demo](/demo) — try the balancer in the browser
