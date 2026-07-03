---
layout: home
hero:
  name: "fast-balance"
  text: "Chemical Equation Balancer"
  tagline: "Precision stoichiometry for modern chemistry"
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

## Quick Start

Install fast-balance using npm:

```bash
npm install fast-balance
```

Balance a simple equation:

```javascript
import { balance } from 'fast-balance';

const result = balance('H2 + O2 -> H2O');
console.log(result.equation);
// Output: 2H2 + O2 -> 2H2O
```

## Why fast-balance?

- **Precision**: Integer-based rational arithmetic ensures mathematically exact results with no floating-point errors.
- **Universal**: Handles any valid chemical equation including redox reactions, ionic equations, and hydrates.
- **Flexible Syntax**: Supports all arrow styles (`->`, `→`, `=`), ionic charges, and complex organic formulas.
- **Zero Dependencies**: Lightweight and self-contained, suitable for educational tools, production apps, and embedded systems.

## Supported Syntax

| Feature | Example | Description |
|---------|---------|-------------|
| Standard equations | `H2 + O2 -> H2O` | Basic chemical equations |
| Redox reactions | `Fe + CuSO4 -> FeSO4 + Cu` | Oxidation-reduction |
| Ionic equations | `Ag+ + Cl- -> AgCl` | With ionic charges |
| Hydrates | `CuSO4·5H2O` | Hydrate notation |
| Multiple arrows | `A <=> B`, `A <- B` | Different reaction types |
| Organic compounds | `CH3CH2OH` | Complex formulas |

## Explore More

- [API Reference](/api-reference) for complete function and type documentation
- [Examples](/examples) for real-world use cases
- [Interactive Demo](/demo) to try the balancer in your browser
- [Source Code on GitHub](https://github.com/richie-rich90454/fast-balance)
