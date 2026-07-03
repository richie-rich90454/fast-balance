---
layout: home
hero:
  name: "fast-balance"
  text: "Chemical Equation Balancer"
  tagline: "Blazing fast chemical equation balancer"
  actions:
    - theme: brand
      text: "Get Started"
      link: /api-reference
    - theme: alt
      text: "View on GitHub"
      link: https://github.com/richie-rich90454/fast-balance
features:
  - title: "Universal Stoichiometry"
    details: "Handles any chemical equation from simple to complex redox reactions, ionic equations, and hydrates"
  - title: "Complex Syntax Support"
    details: "Supports all arrow styles, ionic charges, hydrates, and complex organic formulas with intuitive syntax"
  - title: "Exact Arithmetic"
    details: "Uses integer-based rational arithmetic to avoid floating-point errors and ensure mathematically correct results"
  - title: "Zero Dependencies"
    details: "Lightweight library with no external dependencies, perfect for educational and production use"
---

## Installation

Install fast-balance using npm:

```bash
npm install fast-balance
```

## Quick Example

Balance a simple chemical equation:

```javascript
import { balance } from 'fast-balance';
const result = balance('H2 + O2 -> H2O');
console.log(result.equation);
// Output: 2H2 + O2 -> 2H2O
```

The library automatically finds the smallest integer coefficients that balance the equation while conserving mass and charge.